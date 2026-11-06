-- 프리미어 클린 관리자 페이지용 Neon(Postgres) 테이블
-- 다시 실행해도 안전합니다 (이미 있으면 건너뜀).

-- 1. 고친 글(문구)과 후기를 보관하는 표
create table if not exists site_kv (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2. 방문·버튼 누름·견적 신청 통계
create table if not exists site_events (
  id bigserial primary key,
  type text not null,
  label text,
  created_at timestamptz not null default now()
);
create index if not exists site_events_created_at_idx on site_events (created_at);
