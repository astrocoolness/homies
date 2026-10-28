-- Clique × Supabase — run once in the Supabase SQL editor for the project
-- that backs the Homies app (the same project SUPABASE_URL points at).
-- Safe to re-run: every statement is idempotent.
--
-- What this creates:
-- 1. public.clique_profiles — the Homies → Flyspace sync RECEIVER table for
--    the §9 publishing contract (src/lib/integrations/flyspace-profile.ts).
--    Idempotency is enforced by the unique idempotency_key; stale updates
--    are rejected by the version check the receiver applies.
-- 2. public.clique_photos — metadata for cloud-backed profile photos
--    (bytes live in Storage / R2; this table is the index).
-- Row Level Security is ENABLED with no public policies: the app reaches
-- these tables only through server functions using the service role key,
-- which bypasses RLS. Do not add anon policies without a reviewed design.

create table if not exists public.clique_profiles (
  external_id text primary key,
  slug text not null,
  payload jsonb not null,
  version timestamptz not null,
  idempotency_key text not null unique,
  received_at timestamptz not null default now()
);
create index if not exists clique_profiles_slug on public.clique_profiles (slug);

create table if not exists public.clique_photos (
  id text primary key,
  user_id text not null,
  slot text not null default 'profile',
  backend text not null check (backend in ('r2', 'supabase')),
  object_ref text not null,
  content_type text not null,
  size_bytes integer not null,
  created_at timestamptz not null default now(),
  unique (user_id, slot, object_ref)
);
create index if not exists clique_photos_user on public.clique_photos (user_id);

alter table public.clique_profiles enable row level security;
alter table public.clique_photos enable row level security;

-- Storage bucket for Clique photos uploaded through Supabase (the homie
-- cloud sync already uses 'homie-files'; Clique photos uploaded via the
-- Supabase fallback live there under clique/ — this bucket is for a
-- future dedicated-bucket migration and for Flyspace's original uploader).
insert into storage.buckets (id, name, public)
values ('clique-photos', 'clique-photos', true)
on conflict (id) do nothing;
