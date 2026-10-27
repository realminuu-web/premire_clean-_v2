-- 프리미어 클린 관리자 페이지용 Supabase 설정
-- Supabase 대시보드 > SQL Editor 에 이 내용을 붙여넣고 [Run] 을 한 번 누르면 됩니다.

-- 1. 고친 글(문구)과 후기를 보관하는 표
create table if not exists public.site_kv (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2. 방문·버튼 누름·견적 신청 통계
create table if not exists public.site_events (
  id bigserial primary key,
  type text not null,
  label text,
  created_at timestamptz not null default now()
);
create index if not exists site_events_created_at_idx on public.site_events (created_at);

-- 두 표는 홈페이지 서버(service role 키)만 읽고 씁니다. 다른 접근은 모두 막습니다.
alter table public.site_kv enable row level security;
alter table public.site_events enable row level security;

-- 3. 후기·첫 화면 사진 보관함 (누구나 사진을 볼 수 있게 공개)
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;
