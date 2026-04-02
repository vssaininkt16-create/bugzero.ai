-- Leads table (replaces MongoDB Lead model)
create table if not exists public.leads (
  id          uuid        primary key default gen_random_uuid(),
  name        text        not null,
  email       text        not null,
  phone       text        not null default '',
  company     text        not null default '',
  website     text        not null default '',
  message     text        not null default '',
  service     text        not null default '',
  budget      text        not null default '',
  source      text        not null default 'contact_form',
  status      text        not null default 'new',
  priority    text        not null default 'warm',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists leads_email_idx      on public.leads(email);
create index if not exists leads_status_idx     on public.leads(status);
create index if not exists leads_priority_idx   on public.leads(priority);
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_source_idx     on public.leads(source);
create index if not exists leads_service_idx    on public.leads(service);

alter table public.leads enable row level security;

create policy "Service role full access on leads"
  on public.leads for all to service_role using (true) with check (true);

-- Auto-update updated_at
create or replace function public.leads_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists leads_updated_at on public.leads;
create trigger leads_updated_at
  before update on public.leads
  for each row execute procedure public.leads_set_updated_at();


-- Bookings table (replaces MongoDB Booking model)
create table if not exists public.bookings (
  id          uuid        primary key default gen_random_uuid(),
  booking_id  text        not null default ('BZ-BOOK-' || upper(to_hex(extract(epoch from now())::bigint))),
  name        text        not null,
  email       text        not null,
  phone       text        not null default '',
  company     text        not null default '',
  service     text        not null default '',
  date        text        not null,
  time        text        not null,
  message     text        not null default '',
  status      text        not null default 'pending',
  zoom_link   text        not null default '',
  created_at  timestamptz not null default now()
);

create index if not exists bookings_email_idx      on public.bookings(email);
create index if not exists bookings_status_idx     on public.bookings(status);
create index if not exists bookings_created_at_idx on public.bookings(created_at desc);

alter table public.bookings enable row level security;

create policy "Service role full access on bookings"
  on public.bookings for all to service_role using (true) with check (true);


-- Subscribers table (replaces MongoDB Subscriber model)
create table if not exists public.subscribers (
  id          uuid        primary key default gen_random_uuid(),
  email       text        not null unique,
  name        text        not null default '',
  is_active   boolean     not null default true,
  source      text        not null default 'footer',
  created_at  timestamptz not null default now()
);

create index if not exists subscribers_email_idx  on public.subscribers(email);
create index if not exists subscribers_active_idx on public.subscribers(is_active);

alter table public.subscribers enable row level security;

create policy "Service role full access on subscribers"
  on public.subscribers for all to service_role using (true) with check (true);
