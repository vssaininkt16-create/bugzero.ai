import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

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

const SUPABASE_URL = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const SUPABASE_ANON_KEY =
  envVars['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY'] ||
  envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
const SUPABASE_SERVICE_ROLE_KEY = envVars['SUPABASE_SERVICE_ROLE_KEY'];

const result = {
  connection_status: 'FAILED',
  env_check: 'OK',
  database_access: 'BLOCKED',
  error_message: '',
  fix_suggestions: [],
};

// Step 1: Env check
if (!SUPABASE_URL || SUPABASE_URL.includes('your-project-ref')) {
  result.env_check = 'MISSING';
  result.error_message = 'NEXT_PUBLIC_SUPABASE_URL is missing or is still the placeholder value.';
  result.fix_suggestions.push('Set NEXT_PUBLIC_SUPABASE_URL in .env.local to your real Supabase project URL.');
}
if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY.includes('your-anon-key')) {
  result.env_check = 'MISSING';
  result.error_message += ' NEXT_PUBLIC_SUPABASE_ANON_KEY (or PUBLISHABLE_DEFAULT_KEY) is missing or is still the placeholder value.';
  result.fix_suggestions.push('Set NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to your real Supabase anon key.');
}
const serviceKeyPresent = SUPABASE_SERVICE_ROLE_KEY && !SUPABASE_SERVICE_ROLE_KEY.includes('your-service-role');

if (result.env_check === 'MISSING') {
  console.log('\nSupabase connection failed ❌\n');
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

console.log(`\nSUPABASE_URL        : ${SUPABASE_URL}`);
console.log(`ANON_KEY (first 20) : ${SUPABASE_ANON_KEY.slice(0, 20)}...`);
console.log(`SERVICE_ROLE_KEY    : ${serviceKeyPresent ? 'present ✅' : 'missing ⚠️'}`);

// Step 2: Query — use service role key if available (RLS blocks anon on vapt_scans)
const activeKey = serviceKeyPresent ? SUPABASE_SERVICE_ROLE_KEY : SUPABASE_ANON_KEY;
console.log(`\nUsing key type: ${serviceKeyPresent ? 'service_role' : 'anon'}`);
const supabase = createClient(SUPABASE_URL, activeKey);

try {
  const { data, error } = await supabase.from('vapt_scans').select('*').limit(1);

  if (error) {
    result.error_message = error.message;

    if (error.code === '42P01' || error.code === 'PGRST205') {
      result.database_access = 'BLOCKED';
      result.fix_suggestions.push('Table "vapt_scans" does not exist in the database. The migration has NOT been applied yet.');
      result.fix_suggestions.push('Fix: Open Supabase Dashboard → SQL Editor → paste and run supabase/migrations/20240103000000_create_vapt_tables.sql');
    } else if (error.code === 'PGRST301' || error.message?.includes('RLS') || error.message?.includes('policy')) {
      result.database_access = 'BLOCKED';
      result.fix_suggestions.push('RLS is blocking access. Set SUPABASE_SERVICE_ROLE_KEY in .env.local so the backend uses the service role key.');
    } else if (error.message?.includes('fetch') || error.message?.includes('network') || error.message?.includes('ENOTFOUND')) {
      result.fix_suggestions.push('Network error: verify NEXT_PUBLIC_SUPABASE_URL is correct and you have internet access.');
    } else if (error.message?.includes('Invalid API key') || error.code === 'invalid_api_key') {
      result.fix_suggestions.push('The API key is invalid. Copy it again from Supabase Dashboard → Project Settings → API.');
    } else {
      result.fix_suggestions.push(`Supabase error code: ${error.code} — ${error.message}`);
    }

    console.log('\nSupabase connection failed ❌\n');
  } else {
    result.connection_status = 'SUCCESS';
    result.database_access = 'WORKING';
    result.error_message = '';
    console.log('\nSupabase is connected successfully ✅\n');
    if (data?.length > 0) {
      console.log('Sample row from "vapt_scans":', JSON.stringify(data[0], null, 2));
    } else {
      console.log('Query succeeded — "vapt_scans" table exists but has 0 rows yet.');
    }
  }
} catch (err) {
  result.error_message = err.message;
  result.fix_suggestions.push('Unexpected JS error. Check that @supabase/supabase-js is installed (npm install).');
  console.log('\nSupabase connection failed ❌\n');
}

console.log('\n--- Diagnostic Report ---');
console.log(JSON.stringify(result, null, 2));
