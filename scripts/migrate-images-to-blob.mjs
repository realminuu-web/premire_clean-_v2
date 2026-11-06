// .data/supabase-images/ 에 내려받아 둔 사진을 Vercel Blob 에 올리고,
// Neon site_kv(글·후기) 안의 옛 Supabase 사진 주소를 새 Blob 주소로 바꿉니다.
// 먼저 scripts/migrate-from-supabase.mjs 를 실행해 사진을 내려받아 두어야 합니다.
// 실행: node --env-file=.env.local scripts/migrate-images-to-blob.mjs          (미리보기: 바꿀 내용만 출력)
//       node --env-file=.env.local scripts/migrate-images-to-blob.mjs --apply  (실제로 올리고 주소 바꾸기)
import { readFile } from 'node:fs/promises';
import { list, put } from '@vercel/blob';
import { neon } from '@neondatabase/serverless';

const APPLY = process.argv.includes('--apply');
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN || '';
const DB_URL = process.env.DATABASE_URL || '';
if (!TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN 이 없습니다 (Vercel 에서 Blob 을 만든 뒤 .env.local 에 넣어 주세요).');
if (!DB_URL) throw new Error('DATABASE_URL 이 없습니다.');

const sql = neon(DB_URL);
const IMAGE_DIR = new URL('../.data/supabase-images/', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('manifest.json', IMAGE_DIR), 'utf8'));

// 0. 토큰이 실제로 되는지 (읽기만 함)
const existing = await list({ prefix: 'site-images/', limit: 100, token: TOKEN });
console.log(`Blob 연결 확인: site-images/ 아래 지금 ${existing.blobs.length}개`);

/** JSON 안에서 값이 text 를 포함하는 위치(예: reviews.0.afterImage)를 찾습니다 */
function findPaths(value, text, prefix = '') {
  if (typeof value === 'string') return value.includes(text) ? [prefix] : [];
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => findPaths(v, text, prefix ? `${prefix}.${k}` : k));
  }
  return [];
}

// 1. 사진 올리기 (같은 이름이면 덮어써서 다시 실행해도 안전)
const map = new Map(); // 옛 주소 → 새 주소
for (const m of manifest) {
  if (!APPLY) {
    map.set(m.oldUrl, `(Blob)/site-images/${m.name}`);
    continue;
  }
  const bytes = await readFile(new URL(m.name, IMAGE_DIR));
  const blob = await put(`site-images/${m.name}`, bytes, {
    access: 'public',
    contentType: m.contentType || undefined,
    addRandomSuffix: false,
    allowOverwrite: true,
    token: TOKEN,
  });
  map.set(m.oldUrl, blob.url);
}

// 2. 글·후기 안의 주소 바꾸기
const rows = await sql`select key, value from site_kv`;
let replaced = 0;
for (const r of rows) {
  let text = JSON.stringify(r.value);
  let n = 0;
  for (const [oldUrl, newUrl] of map) {
    const parts = text.split(oldUrl);
    n += parts.length - 1;
    text = parts.join(newUrl);
  }
  if (n === 0) continue;
  replaced += n;
  console.log(`${r.key}: 사진 주소 ${n}곳`);
  for (const [oldUrl, newUrl] of map) {
    for (const p of findPaths(r.value, oldUrl)) {
      console.log(`  ${r.key}.${p}\n    전: …${oldUrl.slice(oldUrl.indexOf('/site-images/'))}\n    후: ${newUrl}`);
    }
  }
  if (APPLY) await sql`update site_kv set value = ${text}::jsonb, updated_at = now() where key = ${r.key}`;
}

// 3. 남은 Supabase 주소 확인
const left = (await sql`select key, value::text as v from site_kv`).filter((r) => r.v.includes('supabase.co/storage'));

console.log(
  JSON.stringify(
    {
      mode: APPLY ? '실제 적용' : '미리보기 (--apply 로 실제 적용)',
      images: manifest.length,
      uploaded: APPLY ? map.size : 0,
      urlsReplaced: replaced,
      keysStillWithSupabaseUrls: APPLY ? left.map((r) => r.key) : '(적용 후 확인)',
    },
    null,
    2,
  ),
);
