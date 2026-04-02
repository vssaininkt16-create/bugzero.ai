import { readFileSync } from 'fs';

// Parse .env.local manually
let envVars = {};
try {
  const raw = readFileSync('.env.local', 'utf8');
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
    envVars[key] = val;
  }
} catch (e) {
  console.error('Could not read .env.local:', e.message);
  process.exit(1);
}

// Prefer DIRECT_URL (bypasses pgBouncer), fall back to DATABASE_URL
// Also handle bare connection string lines (no KEY= prefix)
const bareConnString = (() => {
  try {
    const raw = readFileSync('.env.local', 'utf8');
    for (const line of raw.split('\n')) {
      const t = line.trim();
      if (t.startsWith('postgresql://') || t.startsWith('postgres://')) return t;
    }
  } catch {}
  return null;
})();

const connectionString =
  envVars['DIRECT_URL'] ||
  envVars['DATABASE_URL'] ||
  envVars['POSTGRES_URL'] ||
  envVars['SUPABASE_DB_URL'] ||
  bareConnString;

if (!connectionString) {
  console.error('\n❌ No database connection string found.');
  console.error('Add one of these to .env.local:');
  console.error('  DATABASE_URL=postgresql://postgres:[password]@db.apqgmiloriefrascvltu.supabase.co:5432/postgres');
  console.error('\nFind your database password at:');
  console.error('  Supabase Dashboard → Project Settings → Database → Connection string');
  process.exit(1);
}

console.log('\nConnecting to database...');

let pg;
try {
  pg = await import('pg');
} catch {
  console.error('❌ pg module not found. Installing...');
  process.exit(2);
}

const { default: { Client } } = pg;

// Manually parse connection string to handle passwords with special chars (@ [] etc.)
// Format: postgresql://user:password@host:port/db
// The password may contain @ so we find the LAST @ before the host
function parseConnString(cs) {
  const withoutScheme = cs.replace(/^(postgresql|postgres):\/\//, '');
  const lastAt = withoutScheme.lastIndexOf('@');
  const userPass = withoutScheme.slice(0, lastAt);
  const hostPart = withoutScheme.slice(lastAt + 1);
  const colonIdx = userPass.indexOf(':');
  const user = userPass.slice(0, colonIdx);
  // Strip surrounding [] if Supabase dashboard added them as placeholder brackets
  let password = userPass.slice(colonIdx + 1).replace(/^\[|\]$/g, '');
  const [hostPort, database] = hostPart.split('/');
  const [host, port] = hostPort.split(':');
  return { user, password, host, port: parseInt(port) || 5432, database: database || 'postgres' };
}

const connConfig = parseConnString(connectionString);
console.log(`Host: ${connConfig.host}, User: ${connConfig.user}, DB: ${connConfig.database}`);
const client = new Client({ ...connConfig, ssl: { rejectUnauthorized: false } });

const SQL = `
create extension if not exists "pgcrypto";

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

create index if not exists vapt_orders_email_idx         on public.vapt_orders(email);
create index if not exists vapt_orders_access_token_idx  on public.vapt_orders(access_token);
create index if not exists vapt_orders_payment_id_idx    on public.vapt_orders(razorpay_payment_id);
create index if not exists vapt_scans_order_id_idx       on public.vapt_scans(order_id);
create index if not exists vapt_scans_status_idx         on public.vapt_scans(status);

alter table public.vapt_orders enable row level security;
alter table public.vapt_scans  enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'vapt_orders'
    and policyname = 'Service role full access on vapt_orders'
  ) then
    create policy "Service role full access on vapt_orders"
      on public.vapt_orders for all to service_role using (true) with check (true);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'vapt_scans'
    and policyname = 'Service role full access on vapt_scans'
  ) then
    create policy "Service role full access on vapt_scans"
      on public.vapt_scans for all to service_role using (true) with check (true);
  end if;
end $$;
`;

try {
  await client.connect();
  console.log('Connected ✅');
  await client.query(SQL);
  console.log('\nMigration applied successfully ✅');
  console.log('Tables created: vapt_orders, vapt_scans');
  await client.end();
} catch (err) {
  console.error('\n❌ Migration failed:', err.message);
  await client.end().catch(() => {});
  process.exit(1);
}
