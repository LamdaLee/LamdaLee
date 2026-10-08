-- Shaula MVP: auth-backed learn progress & submissions
-- Apply in Supabase SQL editor or via supabase db push

create extension if not exists "pgcrypto";

create table if not exists public.learn_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  unit_slug text not null,
  step text not null check (step in ('problem', 'explore', 'decide', 'reflect', 'completed')),
  selected_option_id text,
  is_correct boolean,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, unit_slug)
);

create table if not exists public.learn_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  unit_slug text not null,
  selected_option_id text not null,
  is_correct boolean,
  created_at timestamptz not null default now()
);

create index if not exists learn_progress_user_idx on public.learn_progress (user_id);
create index if not exists learn_submissions_unit_idx on public.learn_submissions (unit_slug);

alter table public.learn_progress enable row level security;
alter table public.learn_submissions enable row level security;

create policy "Users read own progress"
  on public.learn_progress for select
  using (auth.uid() = user_id);

create policy "Users upsert own progress"
  on public.learn_progress for insert
  with check (auth.uid() = user_id);

create policy "Users update own progress"
  on public.learn_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users read own submissions"
  on public.learn_submissions for select
  using (auth.uid() = user_id);

create policy "Users insert own submissions"
  on public.learn_submissions for insert
  with check (auth.uid() = user_id);
