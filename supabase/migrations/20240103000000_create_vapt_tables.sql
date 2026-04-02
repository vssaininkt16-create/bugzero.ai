-- VAPT (Vulnerability Assessment & Penetration Testing) Tables
create extension if not exists "pgcrypto";

-- vapt_orders: tracks purchases and access tokens
create table if not exists public.vapt_orders (
  id                   uuid        primary key default gen_random_uuid(),
  email                text        not null,
  name                 text        not null default 'Customer',
  razorpay_order_id    text,
  razorpay_payment_id  text,
  razorpay_signature   text,
  amount               integer     not null default 99900,
  currency             text        not null default 'INR',
  status               text        not null default 'created',
  access_token         text        unique default encode(gen_random_bytes(32), 'hex'),
  scans_used           integer     not null default 0,
  scans_allowed        integer     not null default 1,
  created_at           timestamptz not null default now(),
  expires_at           timestamptz not null default (now() + interval '30 days')
);

-- vapt_scans: tracks individual scan jobs
create table if not exists public.vapt_scans (
  id              uuid        primary key default gen_random_uuid(),
  order_id        uuid        references public.vapt_orders(id) on delete cascade,
  target_url      text        not null,
  status          text        not null default 'pending',
  scan_type       text        not null default 'basic',
  zap_spider_id   text,
  zap_active_id   text,
  results         jsonb,
  vulnerabilities jsonb,
  risk_summary    jsonb,
  score           integer,
  grade           text,
  error_message   text,
  started_at      timestamptz,
  completed_at    timestamptz,
  created_at      timestamptz not null default now()
);

-- Indexes
create index if not exists vapt_orders_email_idx          on public.vapt_orders(email);
create index if not exists vapt_orders_access_token_idx   on public.vapt_orders(access_token);
create index if not exists vapt_orders_payment_id_idx     on public.vapt_orders(razorpay_payment_id);
create index if not exists vapt_scans_order_id_idx        on public.vapt_scans(order_id);
create index if not exists vapt_scans_status_idx          on public.vapt_scans(status);

-- Row Level Security
alter table public.vapt_orders enable row level security;
alter table public.vapt_scans  enable row level security;

-- Only service_role (backend) can access these tables
create policy "Service role full access on vapt_orders"
  on public.vapt_orders for all to service_role using (true) with check (true);

create policy "Service role full access on vapt_scans"
  on public.vapt_scans for all to service_role using (true) with check (true);
