// Supabase(premier-clean) → Neon 으로 글·후기(site_kv)와 통계(site_events)를 옮기고,
// 사진(site-images 보관함)은 .data/supabase-images/ 에 내려받아 둡니다 (나중에 Vercel Blob 으로 올림).
// 다시 실행해도 안전합니다 (같은 key·id 는 덮어쓰거나 건너뜀).
// 실행: node --env-file=.env.local scripts/migrate-from-supabase.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';

const SB_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const DB_URL = process.env.DATABASE_URL || '';
if (!SB_URL || !SB_KEY) throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 가 없습니다.');
if (!DB_URL) throw new Error('DATABASE_URL 이 없습니다.');

const sql = neon(DB_URL);
const headers = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` };
const BUCKET = 'site-images';
const IMAGE_DIR = new URL('../.data/supabase-images/', import.meta.url);

async function sb(path, init = {}) {
  const res = await fetch(`${SB_URL}${path}`, { ...init, headers: { ...headers, ...init.headers } });
  if (!res.ok) throw new Error(`Supabase ${path} → ${res.status} ${await res.text()}`);
  return res;
}

// 1. site_kv
const kvRows = await (await sb('/rest/v1/site_kv?select=key,value,updated_at&order=key')).json();
for (const r of kvRows) {
  await sql`
    insert into site_kv (key, value, updated_at)
    values (${r.key}, ${JSON.stringify(r.value)}::jsonb, ${r.updated_at})
    on conflict (key) do update set value = excluded.value, updated_at = excluded.updated_at`;
}

// 2. site_events (1000건씩)
const events = [];
for (let from = 0; ; from += 1000) {
  const page = await (
    await sb(`/rest/v1/site_events?select=id,type,label,created_at&order=id`, {
      headers: { Range: `${from}-${from + 999}`, 'Range-Unit': 'items' },
    })
  ).json();
  events.push(...page);
  if (page.length < 1000) break;
}
for (let i = 0; i < events.length; i += 500) {
  const chunk = events.slice(i, i + 500);
  const params = [];
  const values = chunk.map((e, j) => {
    params.push(e.id, e.type, e.label, e.created_at);
    return `($${j * 4 + 1}, $${j * 4 + 2}, $${j * 4 + 3}, $${j * 4 + 4})`;
  });
  await sql.query(
    `insert into site_events (id, type, label, created_at) values ${values.join(',')} on conflict (id) do nothing`,
    params,
  );
}
// 새 기록이 옮긴 id 다음 번호부터 붙도록
await sql`select setval(pg_get_serial_sequence('site_events', 'id'), greatest((select coalesce(max(id), 0) from site_events), 1))`;

// 3. 건수·내용 확인
const [neonKv] = await sql`select count(*)::int as n from site_kv`;
const [neonEv] = await sql`select count(*)::int as n from site_events`;
const neonKvRows = await sql`select key, value from site_kv`;
const kvMismatch = kvRows
  .filter((r) => {
    const n = neonKvRows.find((x) => x.key === r.key);
    return !n || JSON.stringify(n.value) !== JSON.stringify(r.value);
  })
  .map((r) => r.key);
const typeCount = (list) =>
  list.reduce((m, e) => ((m[e.type] = (m[e.type] ?? 0) + 1), m), /** @type {Record<string, number>} */ ({}));
const neonTypes = Object.fromEntries(
  (await sql`select type, count(*)::int as n from site_events group by type`).map((r) => [r.type, r.n]),
);

// 4. 사진 내려받기
await mkdir(IMAGE_DIR, { recursive: true });
const objects = await (
  await sb(`/storage/v1/object/list/${BUCKET}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prefix: '', limit: 1000, offset: 0 }),
  })
).json();
const files = objects.filter((o) => o.id); // 폴더 제외
const manifest = [];
for (const f of files) {
  const publicUrl = `${SB_URL}/storage/v1/object/public/${BUCKET}/${f.name}`;
  const res = await fetch(publicUrl);
  if (!res.ok) throw new Error(`사진 내려받기 실패 ${f.name} → ${res.status}`);
  const bytes = Buffer.from(await res.arrayBuffer());
  await writeFile(new URL(f.name, IMAGE_DIR), bytes);
  manifest.push({ name: f.name, oldUrl: publicUrl, contentType: res.headers.get('content-type'), size: bytes.length });
}
await writeFile(new URL('manifest.json', IMAGE_DIR), JSON.stringify(manifest, null, 2));

// 저장된 글·후기 안에서 쓰이는 Supabase 사진 주소가 모두 내려받아졌는지
const referenced = [...new Set(JSON.stringify(kvRows).match(new RegExp(`${SB_URL}/storage/v1/object/public/${BUCKET}/[^"\\\\]+`, 'g')) ?? [])];
const missing = referenced.filter((u) => !manifest.some((m) => m.oldUrl === u));

console.log(
  JSON.stringify(
    {
      site_kv: { supabase: kvRows.length, neon: neonKv.n, keys: kvRows.map((r) => r.key), contentMismatch: kvMismatch },
      site_events: { supabase: events.length, neon: neonEv.n, supabaseByType: typeCount(events), neonByType: neonTypes },
      images: { inBucket: files.length, downloaded: manifest.length, referencedInContent: referenced.length, missing },
    },
    null,
    2,
  ),
);
