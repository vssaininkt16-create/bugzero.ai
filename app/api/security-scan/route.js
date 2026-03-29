export async function POST(request) {
  const { url } = await request.json();

  try {
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;
    const domain = new URL(targetUrl).hostname;

    // SSL Check
    let sslCheck;
    try {
      await fetch(targetUrl, { method: 'HEAD' });
      sslCheck = {
        pass: targetUrl.startsWith('https'),
        score: targetUrl.startsWith('https') ? 15 : 0,
        details: targetUrl.startsWith('https')
          ? 'SSL certificate is valid and HTTPS is working.'
          : 'No SSL/HTTPS found.',
        recommendation: targetUrl.startsWith('https')
          ? null
          : "Install a valid SSL certificate. Free options: Let's Encrypt, Cloudflare.",
      };
    } catch {
      sslCheck = {
        pass: false,
        score: 0,
        details: 'Could not verify SSL.',
        recommendation: "Install a valid SSL certificate. Free options: Let's Encrypt, Cloudflare.",
      };
    }

    // Security Headers Check
    const headerResults = {};
    let headersScore = 0;
    try {
      const res = await fetch(targetUrl);
      const headers = res.headers;

      const securityHeaders = [
        { name: 'x-frame-options', label: 'X-Frame-Options', points: 10, rec: 'Add X-Frame-Options: DENY to prevent clickjacking.' },
        { name: 'x-content-type-options', label: 'X-Content-Type-Options', points: 10, rec: 'Add X-Content-Type-Options: nosniff to prevent MIME sniffing.' },
        { name: 'strict-transport-security', label: 'Strict-Transport-Security (HSTS)', points: 15, rec: 'Enable HSTS to enforce HTTPS connections.' },
        { name: 'content-security-policy', label: 'Content-Security-Policy', points: 15, rec: 'Implement CSP to prevent XSS and data injection attacks.' },
        { name: 'x-xss-protection', label: 'X-XSS-Protection', points: 5, rec: 'Add X-XSS-Protection header for legacy browser support.' },
        { name: 'referrer-policy', label: 'Referrer-Policy', points: 5, rec: 'Add Referrer-Policy to control referrer information leakage.' },
        { name: 'permissions-policy', label: 'Permissions-Policy', points: 5, rec: 'Add Permissions-Policy to restrict browser features.' },
      ];

      for (const h of securityHeaders) {
        const value = headers.get(h.name);
        headerResults[h.name] = {
          label: h.label,
          pass: !!value,
          value: value || 'Not set',
          score: value ? h.points : 0,
          recommendation: value ? null : h.rec,
        };
        if (value) headersScore += h.points;
      }

      const server = headers.get('server') || 'Unknown';
      const poweredBy = headers.get('x-powered-by') || 'Not disclosed';
      headerResults['_tech'] = { server, poweredBy, infoLeak: !!headers.get('x-powered-by') };
      if (!headers.get('x-powered-by')) {
        headersScore += 5;
      } else {
        headerResults['x-powered-by-leak'] = {
          label: 'Server Technology Disclosure',
          pass: false,
          value: poweredBy,
          score: 0,
          recommendation: 'Remove X-Powered-By header to hide server technology.',
        };
      }
    } catch {
      headerResults['_error'] = 'Could not fetch headers';
    }

    // DNS Check
    const dnsResults = {};
    let dnsScore = 0;
    try {
      const { promises: dnsPromises } = await import('dns');
      const clean = domain.replace(/^www\./, '');

      try {
        const txtRecords = await dnsPromises.resolveTxt(clean);
        const flat = txtRecords.map(r => r.join(''));
        const hasSPF = flat.some(r => r.includes('v=spf1'));
        dnsResults.spf = { pass: hasSPF, details: hasSPF ? 'SPF record found' : 'No SPF record', score: hasSPF ? 5 : 0, recommendation: hasSPF ? null : 'Add an SPF record to prevent email spoofing.' };
        if (hasSPF) dnsScore += 5;
      } catch {
        dnsResults.spf = { pass: false, details: 'Could not check SPF', score: 0 };
      }

      try {
        const dmarcRecords = await dnsPromises.resolveTxt('_dmarc.' + clean);
        const flat = dmarcRecords.map(r => r.join(''));
        const hasDMARC = flat.some(r => r.includes('v=DMARC1'));
        dnsResults.dmarc = { pass: hasDMARC, details: hasDMARC ? 'DMARC record found' : 'No DMARC record', score: hasDMARC ? 5 : 0, recommendation: hasDMARC ? null : 'Add a DMARC record to protect against email fraud.' };
        if (hasDMARC) dnsScore += 5;
      } catch {
        dnsResults.dmarc = { pass: false, details: 'Could not check DMARC', score: 0 };
      }
    } catch {
      dnsResults.spf = { pass: false, details: 'DNS check unavailable', score: 0 };
      dnsResults.dmarc = { pass: false, details: 'DNS check unavailable', score: 0 };
    }

    const totalScore = Math.min(100, sslCheck.score + headersScore + dnsScore);
    let grade = 'D';
    if (totalScore >= 90) grade = 'A';
    else if (totalScore >= 70) grade = 'B';
    else if (totalScore >= 50) grade = 'C';

    return Response.json({
      success: true,
      data: {
        url: targetUrl,
        domain,
        score: totalScore,
        grade,
        checks: {
          ssl: sslCheck,
          headers: headerResults,
          dns: dnsResults,
        },
        scannedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, error: 'Scan failed: ' + error.message },
      { status: 500 }
    );
  }
}
