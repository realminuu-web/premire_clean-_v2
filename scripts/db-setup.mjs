// Neon 에 db/schema.sql 테이블을 만듭니다 (다시 실행해도 안전).
// 실행: node --env-file=.env.local scripts/db-setup.mjs
import { readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';

const url = process.env.DATABASE_URL;
if (!url) throw new Error('DATABASE_URL 이 없습니다 (.env.local 확인).');
const sql = neon(url);

const text = await readFile(new URL('../db/schema.sql', import.meta.url), 'utf8');
const statements = text
  .split('\n')
  .filter((l) => !l.trim().startsWith('--'))
  .join('\n')
  .split(';')
  .map((s) => s.trim())
  .filter(Boolean);

for (const s of statements) await sql.query(s);

const tables = await sql`
  select table_name from information_schema.tables
  where table_schema = 'public' and table_name in ('site_kv', 'site_events')
  order by table_name`;
console.log('테이블:', tables.map((t) => t.table_name).join(', '));
