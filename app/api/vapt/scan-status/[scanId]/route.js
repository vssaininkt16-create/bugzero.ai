export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(request, { params }) {
  try {
    const { scanId } = params;
    const { searchParams } = new URL(request.url);
    const access_token = searchParams.get('access_token');

    if (!scanId || !access_token) {
      return NextResponse.json({ error: 'scanId and access_token are required' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: scan, error } = await supabase
      .from('vapt_scans')
      .select('*, vapt_orders!inner(access_token)')
      .eq('id', scanId)
      .eq('vapt_orders.access_token', access_token)
      .maybeSingle();

    if (error || !scan) {
      return NextResponse.json({ error: 'Scan not found or access denied' }, { status: 404 });
    }

    if (scan.status === 'running' && scan.zap_spider_id) {
      const zapUrl = process.env.ZAP_API_URL;
      const zapKey = process.env.ZAP_API_KEY;

      if (zapUrl && zapKey) {
        try {
          if (!scan.zap_active_id) {
            const spiderStatus = await fetch(
              `${zapUrl}/JSON/spider/view/status/?apikey=${zapKey}&scanId=${scan.zap_spider_id}`,
              { signal: AbortSignal.timeout(5000) }
            ).then(r => r.json());

            if (parseInt(spiderStatus.status) >= 100) {
              const activeRes = await fetch(
                `${zapUrl}/JSON/ascan/action/scan/?apikey=${zapKey}&url=${encodeURIComponent(scan.target_url)}&recurse=true`,
                { signal: AbortSignal.timeout(5000) }
              ).then(r => r.json());

              await supabase.from('vapt_scans')
                .update({ zap_active_id: activeRes.scan })
                .eq('id', scanId);

              return NextResponse.json({ scan_id: scanId, status: 'running', progress: 30, message: 'Active scan started...' });
            }
            return NextResponse.json({ scan_id: scanId, status: 'running', progress: Math.min(25, Math.floor(parseInt(spiderStatus.status) / 4)), message: 'Crawling target...' });
          }

          const activeStatus = await fetch(
            `${zapUrl}/JSON/ascan/view/status/?apikey=${zapKey}&scanId=${scan.zap_active_id}`,
            { signal: AbortSignal.timeout(5000) }
          ).then(r => r.json());

          const progress = parseInt(activeStatus.status);

          if (progress >= 100) {
            const alertsRes = await fetch(
              `${zapUrl}/JSON/core/view/alerts/?apikey=${zapKey}&baseurl=${encodeURIComponent(scan.target_url)}`,
              { signal: AbortSignal.timeout(5000) }
            ).then(r => r.json());

            const alerts = alertsRes.alerts || [];
            const vulnerabilities = alerts.map(a => ({
              name: a.name,
              risk: a.risk,
              description: a.description,
              recommendation: a.solution,
              url: a.url,
              cwe: a.cweid ? `CWE-${a.cweid}` : undefined,
              evidence: a.evidence,
            }));

            const counts = { High: 0, Medium: 0, Low: 0, Informational: 0 };
            vulnerabilities.forEach(v => { counts[v.risk] = (counts[v.risk] || 0) + 1; });
            const score = Math.max(0, 100 - counts.High * 20 - counts.Medium * 10 - counts.Low * 5);
            const grade = score >= 80 ? 'A' : score >= 60 ? 'B' : score >= 40 ? 'C' : 'D';

            await supabase.from('vapt_scans').update({
              status: 'completed',
              vulnerabilities,
              risk_summary: counts,
              score,
              grade,
              completed_at: new Date().toISOString(),
            }).eq('id', scanId);

            return NextResponse.json({ scan_id: scanId, status: 'completed', risk_summary: counts, score, grade });
          }

          return NextResponse.json({ scan_id: scanId, status: 'running', progress: 30 + Math.floor(progress * 0.7), message: 'Scanning for vulnerabilities...' });
        } catch (zapErr) {
          console.warn('ZAP status check failed:', zapErr.message);
        }
      }
    }

    const { vapt_orders: _orders, ...cleanScan } = scan;

    return NextResponse.json({
      scan_id: scanId,
      status: cleanScan.status,
      target_url: cleanScan.target_url,
      score: cleanScan.score,
      grade: cleanScan.grade,
      risk_summary: cleanScan.risk_summary,
      vulnerabilities: cleanScan.vulnerabilities,
      results: cleanScan.results,
      completed_at: cleanScan.completed_at,
      error_message: cleanScan.error_message,
    });
  } catch (error) {
    console.error('Scan status error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
