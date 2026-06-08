-- ─── Leads table ─────────────────────────────────────────────────────────────
create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  company     text,
  topic       text,
  budget      text,
  message     text not null,
  status      text not null default 'new' check (status in ('new','replied','closed')),
  notes       text,
  ip_hash     text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_updated_at
  before update on leads
  for each row execute function update_updated_at();

-- Indexes
create index if not exists leads_status_idx    on leads(status);
create index if not exists leads_created_at_idx on leads(created_at desc);
create index if not exists leads_email_idx      on leads(email);

-- RLS: disable public access — only service role can read/write
alter table leads enable row level security;
create policy "service_role_only" on leads
  using (false) with check (false);
