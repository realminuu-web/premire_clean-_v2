import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * 저장소. 관리자 페이지에서 고친 글, 올린 후기, 방문 통계를 보관합니다.
 *
 * - SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY 가 있으면 Supabase(온라인 저장소)를 씁니다.
 *   실제 홈페이지(배포)에서는 반드시 이 방식이어야 모든 손님에게 같은 내용이 보입니다.
 * - 없으면 이 컴퓨터의 `.data/` 폴더와 `public/uploads/` 폴더에 저장합니다 (개발·미리보기용).
 *
 * 필요한 Supabase 테이블과 사진 보관함은 supabase/setup.sql 에 있습니다.
 */

export type SiteEvent = { type: string; label?: string; createdAt: string };

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const BUCKET = 'site-images';

let client: SupabaseClient | null = null;
function supabase(): SupabaseClient | null {
  if (!SUPABASE_URL || !SERVICE_KEY) return null;
  client ??= createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
  return client;
}

export function storageMode(): 'supabase' | 'local' {
  return supabase() ? 'supabase' : 'local';
}

const DATA_DIR = path.join(process.cwd(), '.data');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

function safeKey(key: string) {
  return key.replace(/[^a-z0-9_-]/gi, '_');
}

export async function readKV<T>(key: string): Promise<T | null> {
  const db = supabase();
  if (db) {
    const { data, error } = await db.from('site_kv').select('value').eq('key', key).maybeSingle();
    if (error) throw new Error(`저장소 읽기 실패: ${error.message}`);
    return (data?.value as T) ?? null;
  }
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, `${safeKey(key)}.json`), 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeKV<T>(key: string, value: T | null): Promise<void> {
  const db = supabase();
  if (db) {
    const { error } =
      value === null
        ? await db.from('site_kv').delete().eq('key', key)
        : await db.from('site_kv').upsert({ key, value, updated_at: new Date().toISOString() });
    if (error) throw new Error(`저장소 쓰기 실패: ${error.message}`);
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, `${safeKey(key)}.json`);
  if (value === null) {
    await fs.rm(file, { force: true });
    return;
  }
  await fs.writeFile(file, JSON.stringify(value, null, 2), 'utf8');
}

const IMAGE_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

/** 사진 1장을 저장하고, 홈페이지에서 쓸 주소를 돌려줍니다. */
export async function saveImage(file: File): Promise<string> {
  const ext = IMAGE_TYPES[file.type];
  if (!ext) throw new Error('JPG, PNG, WEBP 사진만 올릴 수 있습니다.');
  if (file.size > 8 * 1024 * 1024) throw new Error('사진 한 장은 8MB 이하여야 합니다.');
  const name = `${new Date().toISOString().slice(0, 10)}-${randomUUID()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const db = supabase();
  if (db) {
    const { error } = await db.storage.from(BUCKET).upload(name, bytes, { contentType: file.type });
    if (error) throw new Error(`사진 저장 실패: ${error.message}`);
    return db.storage.from(BUCKET).getPublicUrl(name).data.publicUrl;
  }
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), bytes);
  return `/uploads/${name}`;
}

export async function recordEvent(type: string, label?: string): Promise<void> {
  const db = supabase();
  if (db) {
    await db.from('site_events').insert({ type, label: label ?? null });
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  const line = JSON.stringify({ type, label, createdAt: new Date().toISOString() } satisfies SiteEvent);
  await fs.appendFile(path.join(DATA_DIR, 'events.jsonl'), `${line}\n`, 'utf8');
}

export async function readEvents(since: Date): Promise<SiteEvent[]> {
  const db = supabase();
  if (db) {
    const { data, error } = await db
      .from('site_events')
      .select('type, label, created_at')
      .gte('created_at', since.toISOString())
      .limit(100000);
    if (error) throw new Error(`통계 읽기 실패: ${error.message}`);
    return (data ?? []).map((r) => ({ type: r.type, label: r.label ?? undefined, createdAt: r.created_at }));
  }
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, 'events.jsonl'), 'utf8');
    return raw
      .split('\n')
      .filter(Boolean)
      .map((l) => JSON.parse(l) as SiteEvent)
      .filter((e) => new Date(e.createdAt) >= since);
  } catch {
    return [];
  }
}
