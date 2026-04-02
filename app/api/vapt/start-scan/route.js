export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

const PRIVATE_IP = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[01])\./,
  /^192\.168\./,
  /^::1$/,
  /^0\.0\.0\.0$/,
  /\.local$/i,
  /\.internal$/i,
];

async function runBuiltInScan(targetUrl) {
  const domain = new URL(targetUrl).hostname;
  const vulnerabilities = [];
  const checks = {};

  // --- SSL / HTTPS ---
  let sslPassed = false;
  try {
    await fetch(targetUrl, { method: 'HEAD', signal: AbortSignal.timeout(6000) });
    sslPassed = targetUrl.startsWith('https');
  } catch {}
  checks.ssl = {
    name: 'SSL/TLS Certificate',
    pass: sslPassed,
    risk: sslPassed ? 'Informational' : 'High',
    details: sslPassed ? 'HTTPS is enforced' : 'HTTP connection — no SSL/TLS detected',
    recommendation: sslPassed ? null : "Install a valid SSL certificate (Let's Encrypt is free)",
  };
  if (!sslPassed) {
    vulnerabilities.push({ name: 'Missing HTTPS/SSL', risk: 'High', description: 'The website does not enforce HTTPS, exposing data in transit.', recommendation: "Enable HTTPS with a valid SSL certificate.", cwe: 'CWE-319' });
  }

  // --- Security Headers ---
  try {
    const res = await fetch(targetUrl, { signal: AbortSignal.timeout(8000) });
    const h = res.headers;

    const headerDefs = [
      { key: 'x-frame-options',          label: 'X-Frame-Options',         risk: 'Medium', rec: 'Add X-Frame-Options: DENY to prevent clickjacking.', cwe: 'CWE-1021' },
      { key: 'x-content-type-options',   label: 'X-Content-Type-Options',  risk: 'Low',    rec: 'Add X-Content-Type-Options: nosniff to prevent MIME sniffing.', cwe: 'CWE-16' },
      { key: 'strict-transport-security',label: 'HSTS',                    risk: 'Medium', rec: 'Add Strict-Transport-Security header to enforce HTTPS.', cwe: 'CWE-319' },
      { key: 'content-security-policy',  label: 'Content-Security-Policy', risk: 'High',   rec: 'Implement a Content Security Policy to prevent XSS and injection.', cwe: 'CWE-80' },
      { key: 'referrer-policy',          label: 'Referrer-Policy',         risk: 'Low',    rec: 'Add Referrer-Policy to limit referrer information leakage.', cwe: 'CWE-200' },
      { key: 'permissions-policy',       label: 'Permissions-Policy',      risk: 'Low',    rec: 'Add Permissions-Policy to restrict browser feature access.', cwe: 'CWE-16' },
      { key: 'x-xss-protection',         label: 'X-XSS-Protection',        risk: 'Low',    rec: 'Add X-XSS-Protection: 1; mode=block for legacy browsers.', cwe: 'CWE-80' },
    ];

    for (const hd of headerDefs) {
      const val = h.get(hd.key);
      checks[hd.key.replace(/-/g, '_')] = {
        name: hd.label,
        pass: !!val,
        risk: val ? 'Informational' : hd.risk,
        value: val || 'Not set',
        recommendation: val ? null : hd.rec,
      };
      if (!val) {
        vulnerabilities.push({ name: `Missing ${hd.label}`, risk: hd.risk, description: `The security header "${hd.label}" is absent.`, recommendation: hd.rec, cwe: hd.cwe });
      }
    }

    const poweredBy = h.get('x-powered-by');
    if (poweredBy) {
      checks.x_powered_by = { name: 'Server Tech Disclosure', pass: false, risk: 'Low', value: poweredBy, recommendation: 'Remove X-Powered-By header to hide technology stack.' };
      vulnerabilities.push({ name: 'Technology Stack Disclosure', risk: 'Low', description: `X-Powered-By exposes server technology: ${poweredBy}`, recommendation: 'Remove X-Powered-By header.', cwe: 'CWE-200' });
    }

    const server = h.get('server');
    if (server && /apache|nginx|iis|lighttpd/i.test(server)) {
      checks.server_banner = { name: 'Server Banner', pass: false, risk: 'Low', value: server, recommendation: 'Remove or obfuscate the Server header.' };
      vulnerabilities.push({ name: 'Server Version Disclosure', risk: 'Low', description: `Server header reveals: ${server}`, recommendation: 'Configure the server to omit version info.', cwe: 'CWE-200' });
    }
  } catch (e) {
    checks.headers_fetch = { name: 'HTTP Headers Fetch', pass: false, risk: 'High', details: 'Could not retrieve headers — target may be unreachable.', recommendation: 'Verify the URL is publicly accessible.' };
  }

  // --- DNS: SPF & DMARC ---
  try {
    const { promises: dns } = await import('dns');
    const clean = domain.replace(/^www\./, '');

    try {
      const txt = await dns.resolveTxt(clean);
      const flat = txt.map(r => r.join(''));
      const hasSPF = flat.some(r => r.startsWith('v=spf1'));
      checks.spf = { name: 'SPF Record', pass: hasSPF, risk: hasSPF ? 'Informational' : 'Medium', details: hasSPF ? 'SPF record present' : 'No SPF record found', recommendation: hasSPF ? null : 'Add an SPF TXT record to prevent email spoofing.' };
      if (!hasSPF) vulnerabilities.push({ name: 'Missing SPF Record', risk: 'Medium', description: 'No SPF record found in DNS — email spoofing is possible.', recommendation: 'Add an SPF record to your DNS zone.', cwe: 'CWE-290' });
    } catch {}

    try {
      const dmarc = await dns.resolveTxt('_dmarc.' + clean);
      const flat = dmarc.map(r => r.join(''));
      const hasDMARC = flat.some(r => r.includes('v=DMARC1'));
      checks.dmarc = { name: 'DMARC Record', pass: hasDMARC, risk: hasDMARC ? 'Informational' : 'Medium', details: hasDMARC ? 'DMARC policy present' : 'No DMARC policy found', recommendation: hasDMARC ? null : 'Add a DMARC policy to your DNS.' };
      if (!hasDMARC) vulnerabilities.push({ name: 'Missing DMARC Record', risk: 'Medium', description: 'No DMARC policy — phishing emails can appear to come from your domain.', recommendation: 'Publish a DMARC TXT record at _dmarc.<domain>.', cwe: 'CWE-290' });
    } catch {}
  } catch {}

  const counts = { High: 0, Medium: 0, Low: 0, Informational: 0 };
  vulnerabilities.forEach(v => { counts[v.risk] = (counts[v.risk] || 0) + 1; });
  const score = Math.max(0, 100 - counts.High * 20 - counts.Medium * 10 - counts.Low * 5);
  const grade = score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D';

  return { checks, vulnerabilities, risk_summary: counts, score, grade };
}

export async function POST(request) {
  try {
    const { access_token, target_url, authorized } = await request.json();

    if (!access_token || !target_url) {
      return NextResponse.json({ error: 'access_token and target_url are required' }, { status: 400 });
    }

    if (!authorized) {
      return NextResponse.json({ error: 'You must confirm you are authorized to scan this target' }, { status: 400 });
    }

    const normalizedUrl = target_url.startsWith('http') ? target_url : `https://${target_url}`;
    try { new URL(normalizedUrl); } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    const hostname = new URL(normalizedUrl).hostname;
    if (PRIVATE_IP.some(p => p.test(hostname))) {
      return NextResponse.json({ error: 'Scanning private/internal addresses is not permitted' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: order, error: orderErr } = await supabase
      .from('vapt_orders')
      .select('id, status, scans_used, scans_allowed, expires_at')
      .eq('access_token', access_token)
      .eq('status', 'paid')
      .maybeSingle();

    if (orderErr || !order) {
      return NextResponse.json({ error: 'Invalid or expired access token. Please complete payment first.' }, { status: 401 });
    }
    if (new Date(order.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Your VAPT package has expired' }, { status: 403 });
    }
    if (order.scans_used >= order.scans_allowed) {
      return NextResponse.json({ error: 'Scan limit reached for this package' }, { status: 403 });
    }

    const { data: scan, error: scanErr } = await supabase
      .from('vapt_scans')
      .insert({ order_id: order.id, target_url: normalizedUrl, status: 'running', started_at: new Date().toISOString() })
      .select('id')
      .single();

    if (scanErr) throw scanErr;

    await supabase.from('vapt_orders').update({ scans_used: order.scans_used + 1 }).eq('id', order.id);

    const zapUrl = process.env.ZAP_API_URL;
    const zapKey = process.env.ZAP_API_KEY;

    if (zapUrl && zapKey) {
      try {
        const spiderRes = await fetch(
          `${zapUrl}/JSON/spider/action/scan/?apikey=${zapKey}&url=${encodeURIComponent(normalizedUrl)}&maxChildren=5`,
          { signal: AbortSignal.timeout(10000) }
        );
        const spiderData = await spiderRes.json();
        await supabase.from('vapt_scans').update({ zap_spider_id: spiderData.scan, status: 'running' }).eq('id', scan.id);
        return NextResponse.json({ success: true, scan_id: scan.id, status: 'running', mode: 'zap' });
      } catch (zapErr) {
        console.warn('ZAP unavailable, falling back to built-in scan:', zapErr.message);
      }
    }

    const results = await runBuiltInScan(normalizedUrl);

    await supabase.from('vapt_scans').update({
      status: 'completed',
      results: results.checks,
      vulnerabilities: results.vulnerabilities,
      risk_summary: results.risk_summary,
      score: results.score,
      grade: results.grade,
      completed_at: new Date().toISOString(),
    }).eq('id', scan.id);

    return NextResponse.json({
      success: true,
      scan_id: scan.id,
      status: 'completed',
      risk_summary: results.risk_summary,
      vulnerabilities: results.vulnerabilities,
      score: results.score,
      grade: results.grade,
    });
  } catch (error) {
    console.error('Start scan error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
