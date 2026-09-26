-- Custom Homies, their character sheets, and saved room loops.
-- Applied to the RVA.guru Supabase project. Service role only (no public policies).

create table if not exists public.homie_keepers (
  id text primary key,
  created_at timestamptz not null default now(),
  constraint homie_keepers_id check (id ~ '^k[a-f0-9]{32}$')
);

create table if not exists public.custom_homies (
  id text primary key,
  keeper_id text not null references public.homie_keepers (id) on delete cascade,
  name text not null,
  stage text not null,
  profile jsonb not null,
  portrait_path text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint custom_homies_id check (id ~ '^c[a-z0-9]{4,16}$')
);

create index if not exists custom_homies_keeper on public.custom_homies (keeper_id);

create table if not exists public.homie_reels (
  id text primary key,
  homie_id text not null references public.custom_homies (id) on delete cascade,
  keeper_id text not null references public.homie_keepers (id) on delete cascade,
  caption text not null,
  mime text not null,
  storage_path text not null,
  created_at timestamptz not null default now(),
  constraint homie_reels_id check (id ~ '^r[a-z0-9]{4,24}$')
);

create index if not exists homie_reels_homie on public.homie_reels (homie_id);

alter table public.homie_keepers enable row level security;
alter table public.custom_homies enable row level security;
alter table public.homie_reels enable row level security;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'homie-files',
  'homie-files',
  true,
  2500000,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4']
)
on conflict (id) do nothing;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects' and policyname = 'homie files are public to read'
  ) then
    create policy "homie files are public to read"
      on storage.objects for select
      to public
      using (bucket_id = 'homie-files');
  end if;
end $$;
