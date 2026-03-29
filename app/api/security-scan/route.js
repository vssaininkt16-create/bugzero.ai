import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ScanResult from '@/lib/models/ScanResult';
import Lead from '@/lib/models/Lead';
import dns from 'dns';
import { promisify } from 'util';

const resolveTxt = promisify(dns.resolveTxt);

async function checkSSL(url) {
  try {
    const httpsUrl = url.startsWith('https://') ? url : `https://${url.replace(/^http:\/\//, '')}`;
    const res = await fetch(httpsUrl, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(8000) });
    return { pass: true, details: 'SSL certificate is valid and HTTPS is working.', score: 15 };
  } catch (e) {
    return { pass: false, details: 'SSL certificate is missing or invalid. HTTPS not properly configured.', score: 0, recommendation: 'Install a valid SSL certificate. Free options: Let\'s Encrypt, Cloudflare.' };
  }
}

async function checkHeaders(url) {
  const results = {};
  let totalScore = 0;
  try {
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;
    const res = await fetch(targetUrl, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(8000) });
    const headers = Object.fromEntries(res.headers.entries());

    const checks = [
      { name: 'x-frame-options', label: 'X-Frame-Options', points: 10, rec: 'Add X-Frame-Options: DENY to prevent clickjacking.' },
      { name: 'x-content-type-options', label: 'X-Content-Type-Options', points: 10, rec: 'Add X-Content-Type-Options: nosniff to prevent MIME sniffing.' },
      { name: 'strict-transport-security', label: 'Strict-Transport-Security (HSTS)', points: 15, rec: 'Enable HSTS to enforce HTTPS connections.' },
      { name: 'content-security-policy', label: 'Content-Security-Policy', points: 15, rec: 'Implement CSP to prevent XSS and data injection attacks.' },
      { name: 'x-xss-protection', label: 'X-XSS-Protection', points: 5, rec: 'Add X-XSS-Protection header for legacy browser support.' },
      { name: 'referrer-policy', label: 'Referrer-Policy', points: 5, rec: 'Add Referrer-Policy to control referrer information leakage.' },
      { name: 'permissions-policy', label: 'Permissions-Policy', points: 5, rec: 'Add Permissions-Policy to restrict browser features.' },
    ];

    for (const check of checks) {
      const hasHeader = !!headers[check.name];
      results[check.name] = {
        label: check.label,
        pass: hasHeader,
        value: headers[check.name] || 'Not set',
        score: hasHeader ? check.points : 0,
        recommendation: hasHeader ? null : check.rec,
      };
      if (hasHeader) totalScore += check.points;
    }

    // Technology detection
    const server = headers['server'] || 'Unknown';
    const poweredBy = headers['x-powered-by'] || 'Not disclosed';
    results['_tech'] = { server, poweredBy, infoLeak: !!headers['x-powered-by'] };
    if (headers['x-powered-by']) {
      results['x-powered-by-leak'] = {
        label: 'Server Technology Disclosure',
        pass: false,
        value: poweredBy,
        score: 0,
        recommendation: 'Remove X-Powered-By header to hide server technology.',
      };
    } else {
      totalScore += 5;
    }
  } catch (e) {
    results['_error'] = 'Could not fetch headers: ' + e.message;
  }
  return { results, score: totalScore };
}

async function checkDNS(domain) {
  const clean = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').replace(/^www\./, '');
  let score = 0;
  const results = {};

  try {
    const txtRecords = await resolveTxt(clean);
    const flat = txtRecords.map(r => r.join(''));
    const hasSPF = flat.some(r => r.includes('v=spf1'));
    results.spf = { pass: hasSPF, details: hasSPF ? 'SPF record found' : 'No SPF record', score: hasSPF ? 5 : 0, recommendation: hasSPF ? null : 'Add an SPF record to prevent email spoofing.' };
    if (hasSPF) score += 5;
  } catch {
    results.spf = { pass: false, details: 'Could not check SPF', score: 0 };
  }

  try {
    const dmarcRecords = await resolveTxt('_dmarc.' + clean);
    const flat = dmarcRecords.map(r => r.join(''));
    const hasDMARC = flat.some(r => r.includes('v=DMARC1'));
    results.dmarc = { pass: hasDMARC, details: hasDMARC ? 'DMARC record found' : 'No DMARC record', score: hasDMARC ? 5 : 0, recommendation: hasDMARC ? null : 'Add a DMARC record to protect against email fraud.' };
    if (hasDMARC) score += 5;
  } catch {
    results.dmarc = { pass: false, details: 'Could not check DMARC', score: 0 };
  }

  return { results, score };
}

export async function POST(request) {
  try {
    const body = await request.json();
    let { url, email, name, company } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    url = url.trim().replace(/\/+$/, '');
    if (!url.includes('.')) {
      return NextResponse.json({ error: 'Please enter a valid domain or URL' }, { status: 400 });
    }

    // Run all checks
    const [ssl, headers, dnsCheck] = await Promise.all([
      checkSSL(url),
      checkHeaders(url),
      checkDNS(url),
    ]);

    const totalScore = Math.min(100, ssl.score + headers.score + dnsCheck.score);
    let grade = 'D';
    if (totalScore >= 90) grade = 'A';
    else if (totalScore >= 70) grade = 'B';
    else if (totalScore >= 50) grade = 'C';

    const scanResult = {
      url,
      score: totalScore,
      grade,
      checks: {
        ssl,
        headers: headers.results,
        dns: dnsCheck.results,
        headersScore: headers.score,
        dnsScore: dnsCheck.score,
      },
    };

    // Save to DB
    await connectDB();
    const saved = await ScanResult.create({ ...scanResult, email: email || '', name: name || '', company: company || '' });

    // If email provided, save as HOT lead
    if (email) {
      await Lead.findOneAndUpdate(
        { email },
        {
          $setOnInsert: {
            name: name || 'Security Scan User',
            email,
            company: company || '',
            source: 'security_scanner',
            priority: 'hot',
            message: `Scanned: ${url} - Score: ${totalScore}/100 (${grade})`,
          },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({ success: true, data: { ...scanResult, id: saved._id } });
  } catch (error) {
    console.error('POST /api/security-scan error:', error);
    return NextResponse.json({ error: 'Scan failed. Please check the URL and try again.' }, { status: 500 });
  }
}
