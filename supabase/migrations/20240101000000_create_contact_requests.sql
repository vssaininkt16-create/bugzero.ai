-- Create contact_requests table
create extension if not exists "pgcrypto";

create table if not exists public.contact_requests (
  id          uuid primary key default gen_random_uuid(),
  full_name   text not null,
  email       text not null,
  phone       text,
  company     text,
  service     text,
  message     text not null,
  status      text not null default 'pending',
  user_id     uuid references auth.users(id) on delete set null,
  source      text,
  created_at  timestamptz not null default now()
);

-- Index for faster lookups
create index if not exists contact_requests_email_idx on public.contact_requests(email);
create index if not exists contact_requests_status_idx on public.contact_requests(status);
create index if not exists contact_requests_created_at_idx on public.contact_requests(created_at desc);

-- Enable Row Level Security
alter table public.contact_requests enable row level security;

-- Allow anonymous inserts (public form submissions)
create policy "Anyone can submit contact requests"
  on public.contact_requests
  for insert
  to anon, authenticated
  with check (true);

-- Only authenticated admins can read
create policy "Service role can read all contact requests"
  on public.contact_requests
  for select
  to service_role
  using (true);
