'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import {
  Shield, Download, AlertTriangle, CheckCircle, XCircle,
  AlertCircle, Info, Loader2, ArrowLeft, Globe, Calendar,
  FileText, Lock
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const RISK_COLORS = {
  High: { text: 'text-red-600', bg: 'bg-red-400/10', border: 'border-red-400/30', hex: '#f87171' },
  Medium: { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30', hex: '#facc15' },
  Low: { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30', hex: '#60a5fa' },
  Informational: { text: 'text-gray-600', bg: 'bg-gray-400/10', border: 'border-gray-400/30', hex: '#9ca3af' },
};

const RISK_ICONS = { High: XCircle, Medium: AlertTriangle, Low: AlertCircle, Informational: Info };

function RiskBadge({ risk }) {
  const c = RISK_COLORS[risk] || RISK_COLORS.Informational;
  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border ${c.text} ${c.bg} ${c.border}`}>
      {risk}
    </span>
  );
}

async function generatePDF(scanData) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const W = 210, M = 15, CW = W - M * 2;

  const addPage = () => { doc.addPage(); return M; };
  let y = M;

  function checkY(needed = 20) {
    if (y + needed > 280) y = addPage();
  }

  doc.setFillColor(2, 8, 23);
  doc.rect(0, 0, W, 297, 'F');

  doc.setFillColor(0, 26, 43);
  doc.rect(0, 0, W, 60, 'F');

  doc.setTextColor(0, 212, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('VAPT SECURITY REPORT', M, 25);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('BugZero Cyber Solutions · Automated Assessment', M, 33);
  doc.text(`Target: ${scanData.target_url}`, M, 40);
  doc.text(`Date: ${new Date(scanData.completed_at || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}`, M, 47);
  doc.text(`Report ID: ${scanData.scan_id || 'N/A'}`, M, 54);

  y = 75;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Executive Summary', M, y);
  y += 8;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  const summary = doc.splitTextToSize(
    `This automated security assessment was performed on ${scanData.target_url} using BugZero's OWASP-aligned scanning engine. The scan evaluated SSL/TLS configuration, HTTP security headers, DNS security records, and common web vulnerabilities.`,
    CW
  );
  doc.text(summary, M, y);
  y += summary.length * 5 + 8;

  const grade = scanData.grade || 'D';
  const score = scanData.score ?? 0;
  const gradeColors = { A: [16, 185, 129], B: [0, 212, 255], C: [245, 158, 11], D: [239, 68, 68] };
  const [gr, gg, gb] = gradeColors[grade] || gradeColors.D;

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(M, y, CW, 28, 3, 3, 'F');
  doc.setFillColor(gr, gg, gb);
  doc.roundedRect(M + 4, y + 4, 20, 20, 2, 2, 'F');
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(2, 8, 23);
  doc.text(grade, M + 9, y + 17);

  doc.setFontSize(11);
  doc.setTextColor(255, 255, 255);
  doc.text(`Security Score: ${score}/100`, M + 28, y + 12);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(score >= 80 ? 'Good security posture' : score >= 60 ? 'Moderate risk — improvements recommended' : 'High risk — immediate action required', M + 28, y + 20);
  y += 38;

  const rs = scanData.risk_summary || {};
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Risk Summary', M, y);
  y += 7;

  const riskOrder = ['High', 'Medium', 'Low', 'Informational'];
  const boxW = (CW - 9) / 4;
  riskOrder.forEach((r, i) => {
    const [rr, rg, rb] = r === 'High' ? [239, 68, 68] : r === 'Medium' ? [245, 158, 11] : r === 'Low' ? [96, 165, 250] : [156, 163, 175];
    const bx = M + i * (boxW + 3);
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(bx, y, boxW, 18, 2, 2, 'F');
    doc.setFillColor(rr, rg, rb);
    doc.roundedRect(bx, y, boxW, 3, 0, 0, 'F');
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(rr, rg, rb);
    doc.text(String(rs[r] || 0), bx + boxW / 2, y + 12, { align: 'center' });
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(r, bx + boxW / 2, y + 17, { align: 'center' });
  });
  y += 28;

  if (scanData.vulnerabilities && scanData.vulnerabilities.length > 0) {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    checkY(20);
    doc.text('Vulnerability Findings', M, y);
    y += 8;

    scanData.vulnerabilities.forEach((v, idx) => {
      const [rr, rg, rb] = v.risk === 'High' ? [239, 68, 68] : v.risk === 'Medium' ? [245, 158, 11] : v.risk === 'Low' ? [96, 165, 250] : [156, 163, 175];
      const descLines = doc.splitTextToSize(v.description || '', CW - 8);
      const recLines = v.recommendation ? doc.splitTextToSize(`Fix: ${v.recommendation}`, CW - 8) : [];
      const boxH = 10 + descLines.length * 4.5 + (recLines.length ? recLines.length * 4.5 + 2 : 0);

      checkY(boxH + 4);
      doc.setFillColor(15, 23, 42);
      doc.roundedRect(M, y, CW, boxH, 2, 2, 'F');
      doc.setFillColor(rr, rg, rb);
      doc.roundedRect(M, y, 3, boxH, 1, 1, 'F');

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(`${idx + 1}. ${v.name}`, M + 6, y + 6);

      doc.setFillColor(rr, rg, rb);
      doc.setTextColor(rr, rg, rb);
      doc.setFontSize(7);
      doc.text(v.risk, M + CW - 4, y + 6, { align: 'right' });

      doc.setTextColor(148, 163, 184);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.text(descLines, M + 6, y + 12);
      let fy = y + 12 + descLines.length * 4.5;

      if (recLines.length) {
        doc.setTextColor(16, 185, 129);
        doc.text(recLines, M + 6, fy + 2);
      }
      y += boxH + 4;
    });
  }

  y += 6;
  checkY(25);
  doc.setFillColor(0, 26, 43);
  doc.rect(0, 272, W, 25, 'F');
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text('This report was generated automatically by BugZero Cyber Solutions. For manual penetration testing, contact support@bugzero.solutions', W / 2, 279, { align: 'center' });
  doc.text('⚠ This report is confidential and intended solely for the authorized recipient.', W / 2, 285, { align: 'center' });
  doc.text(`Generated: ${new Date().toLocaleString('en-IN')}`, W / 2, 291, { align: 'center' });

  const domain = new URL(scanData.target_url).hostname.replace(/\./g, '_');
  doc.save(`BugZero_VAPT_${domain}_${new Date().toISOString().slice(0, 10)}.pdf`);
}

function VaptReportContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const scanId = params.scanId;
  const accessToken = searchParams.get('access_token') || (typeof window !== 'undefined' && localStorage.getItem('vapt_access_token')) || '';

  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    if (!scanId || !accessToken) { setError('Missing scan ID or access token.'); setLoading(false); return; }
    fetch(`/api/vapt/scan-status/${scanId}?access_token=${accessToken}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setScan(data);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, [scanId, accessToken]);

  async function handleDownloadPDF() {
    if (!scan) return;
    setPdfLoading(true);
    try {
      await generatePDF({ ...scan, scan_id: scanId });
    } catch (e) {
      alert('PDF generation failed: ' + e.message);
    } finally {
      setPdfLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-gray-200 shadow-sm rounded-2xl p-8 text-center">
          <Lock className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-500 text-sm mb-6">{error}</p>
          <Link href="/vapt-dashboard" className="btn-secondary text-sm">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const vulns = scan.vulnerabilities || [];
  const rs = scan.risk_summary || {};
  const grade = scan.grade || 'D';
  const score = scan.score ?? 0;
  const gradeColor = { A: 'text-green-600', B: 'text-red-600', C: 'text-yellow-400', D: 'text-red-600' }[grade] || 'text-red-600';

  return (
    <div className="min-h-screen bg-white ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href={`/vapt-dashboard`} className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <button
            onClick={handleDownloadPDF}
            disabled={pdfLoading}
            className="btn-primary text-sm disabled:opacity-60"
          >
            {pdfLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {pdfLoading ? 'Generating…' : 'Download PDF'}
          </button>
        </div>

        {/* Report Header Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-red-600" />
                <span className="text-xs text-red-600 font-semibold uppercase tracking-wider">VAPT Security Report</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-1 break-all">{scan.target_url}</h1>
              <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{scan.completed_at ? new Date(scan.completed_at).toLocaleString('en-IN') : 'Recent'}</span>
                <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" />Report ID: {scanId?.slice(0, 8)}…</span>
                <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />Automated VAPT</span>
              </div>
            </div>
            <div className="text-center">
              <div className={`text-5xl font-black ${gradeColor}`}>{grade}</div>
              <div className="text-sm text-gray-500">{score}/100</div>
              <div className="text-xs text-gray-500 mt-0.5">Security Score</div>
            </div>
          </div>
        </motion.div>

        {/* Risk Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {['High', 'Medium', 'Low', 'Informational'].map(risk => {
            const c = RISK_COLORS[risk];
            const Icon = RISK_ICONS[risk];
            return (
              <motion.div key={risk} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`rounded-xl border p-4 text-center ${c.bg} ${c.border}`}>
                <Icon className={`w-5 h-5 mx-auto mb-1 ${c.text}`} />
                <div className={`text-3xl font-bold ${c.text}`}>{rs[risk] || 0}</div>
                <div className={`text-xs ${c.text} opacity-80`}>{risk}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-white border border-gray-200 shadow-sm rounded-xl p-4 mb-6 border-yellow-400/20 bg-yellow-400/5">
          <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-900">
            This is an <strong>automated scan report</strong>. It covers OWASP surface-level checks and may not detect all vulnerabilities. For a full manual VAPT with CERT-In compliance, <a href="/contact" className="underline">contact our team</a>.
          </p>
        </div>

        {/* Findings */}
        <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          Vulnerability Findings ({vulns.length})
        </h2>

        {vulns.length === 0 ? (
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No Vulnerabilities Found</h3>
            <p className="text-gray-500 text-sm">Your application passed all automated security checks.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {vulns.map((v, i) => {
              const c = RISK_COLORS[v.risk] || RISK_COLORS.Informational;
              const Icon = RISK_ICONS[v.risk] || Info;
              return (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden">
                  <div className={`h-1 w-full ${v.risk === 'High' ? 'bg-red-400' : v.risk === 'Medium' ? 'bg-yellow-400' : v.risk === 'Low' ? 'bg-blue-400' : 'bg-gray-400'}`} />
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className={`shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center ${c.bg} ${c.border}`}>
                        <Icon className={`w-4 h-4 ${c.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="font-semibold text-gray-900 text-sm">{v.name}</span>
                          <RiskBadge risk={v.risk} />
                          {v.cwe && <span className="text-xs text-gray-500 font-mono">{v.cwe}</span>}
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{v.description}</p>
                        {v.url && (
                          <p className="text-xs text-gray-500 mb-2 font-mono truncate">URL: {v.url}</p>
                        )}
                        {v.evidence && (
                          <div className="bg-white rounded-lg px-3 py-2 mb-3 font-mono text-xs text-gray-600 truncate">
                            {v.evidence}
                          </div>
                        )}
                        {v.recommendation && (
                          <div className="flex items-start gap-2 text-xs text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                            <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <span>{v.recommendation}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-10 pt-8 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500 mb-4">
            Generated by BugZero Cyber Solutions · DPIIT Recognized · Automated VAPT
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button onClick={handleDownloadPDF} disabled={pdfLoading} className="btn-primary text-sm disabled:opacity-60">
              {pdfLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {pdfLoading ? 'Generating…' : 'Download PDF Report'}
            </button>
            <Link href="/contact" className="btn-secondary text-sm">
              Request Manual VAPT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VaptReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
      </div>
    }>
      <VaptReportContent />
    </Suspense>
  );
}
