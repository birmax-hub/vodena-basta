-- Lead capture table
create extension if not exists "pgcrypto";

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

-- RLS and anon insert policy for public site submissions
alter table public.contact_messages enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where polname = 'allow_insert_contact_messages_anon'
      and tablename = 'contact_messages'
  ) then
    create policy allow_insert_contact_messages_anon
      on public.contact_messages
      for insert
      to anon
      with check (true);
  end if;
end $$;

create index if not exists idx_contact_messages_created_at
  on public.contact_messages (created_at desc);

