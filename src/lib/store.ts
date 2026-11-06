import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { put } from '@vercel/blob';

/**
 * 저장소. 관리자 페이지에서 고친 글, 올린 후기, 방문 통계, 사진을 보관합니다.
 *
 * - DATABASE_URL 이 있으면 Neon(Postgres)에 글·후기·통계를 저장합니다.
 * - BLOB_READ_WRITE_TOKEN 이 있으면 사진을 Vercel Blob 에 저장합니다.
 *   실제 홈페이지(배포)에서는 반드시 두 값이 다 있어야 모든 손님에게 같은 내용이 보입니다.
 * - 없으면 이 컴퓨터의 `.data/` 폴더와 `public/uploads/` 폴더에 저장합니다 (개발·미리보기용).
 *
 * 필요한 Neon 테이블은 db/schema.sql 에 있습니다.
 */

export type SiteEvent = { type: string; label?: string; createdAt: string };

const DATABASE_URL = process.env.DATABASE_URL || '';
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN || '';

let client: NeonQueryFunction<false, false> | null = null;
function db(): NeonQueryFunction<false, false> | null {
  if (!DATABASE_URL) return null;
  client ??= neon(DATABASE_URL);
  return client;
}

export function storageMode(): 'online' | 'local' {
  return db() && BLOB_TOKEN ? 'online' : 'local';
}

const DATA_DIR = path.join(process.cwd(), '.data');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

function safeKey(key: string) {
  return key.replace(/[^a-z0-9_-]/gi, '_');
}

export async function readKV<T>(key: string): Promise<T | null> {
  const sql = db();
  if (sql) {
    try {
      const rows = await sql`select value from site_kv where key = ${key}`;
      return (rows[0]?.value as T) ?? null;
    } catch (e) {
      throw new Error(`저장소 읽기 실패: ${e instanceof Error ? e.message : e}`);
    }
  }
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, `${safeKey(key)}.json`), 'utf8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function writeKV<T>(key: string, value: T | null): Promise<void> {
  const sql = db();
  if (sql) {
    try {
      if (value === null) {
        await sql`delete from site_kv where key = ${key}`;
      } else {
        await sql`
          insert into site_kv (key, value, updated_at)
          values (${key}, ${JSON.stringify(value)}::jsonb, now())
          on conflict (key) do update set value = excluded.value, updated_at = excluded.updated_at`;
      }
    } catch (e) {
      throw new Error(`저장소 쓰기 실패: ${e instanceof Error ? e.message : e}`);
    }
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
  // Vercel 서버가 받는 요청 크기 한도(4.5MB)보다 조금 작게 막습니다
  if (file.size > 4 * 1024 * 1024) throw new Error('사진 한 장은 4MB 이하여야 합니다.');
  const name = `${new Date().toISOString().slice(0, 10)}-${randomUUID()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  if (BLOB_TOKEN) {
    try {
      const blob = await put(`site-images/${name}`, bytes, {
        access: 'public',
        contentType: file.type,
        token: BLOB_TOKEN,
      });
      return blob.url;
    } catch (e) {
      throw new Error(`사진 저장 실패: ${e instanceof Error ? e.message : e}`);
    }
  }
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), bytes);
  return `/uploads/${name}`;
}

export async function recordEvent(type: string, label?: string): Promise<void> {
  const sql = db();
  if (sql) {
    await sql`insert into site_events (type, label) values (${type}, ${label ?? null})`;
    return;
  }
  await fs.mkdir(DATA_DIR, { recursive: true });
  const line = JSON.stringify({ type, label, createdAt: new Date().toISOString() } satisfies SiteEvent);
  await fs.appendFile(path.join(DATA_DIR, 'events.jsonl'), `${line}\n`, 'utf8');
}

export async function readEvents(since: Date): Promise<SiteEvent[]> {
  const sql = db();
  if (sql) {
    try {
      const rows = await sql`
        select type, label, created_at from site_events
        where created_at >= ${since.toISOString()}
        order by created_at
        limit 100000`;
      return rows.map((r) => ({
        type: String(r.type),
        label: r.label ?? undefined,
        createdAt: new Date(r.created_at).toISOString(),
      }));
    } catch (e) {
      throw new Error(`통계 읽기 실패: ${e instanceof Error ? e.message : e}`);
    }
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
