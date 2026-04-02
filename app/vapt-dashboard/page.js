'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield, Zap, CheckCircle, Loader2, AlertTriangle, Lock,
  Globe, ArrowRight, LogOut, FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VaptDashboardPage() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState('');
  const [scanId, setScanId] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('vapt_access_token');
    if (!token) {
      router.push('/vapt-basic-999');
      return;
    }
    setAccessToken(token);
  }, [router]);

  async function handleScan(e) {
    e.preventDefault();
    if (!authorized) {
      setError('You must confirm you are authorized to scan this target.');
      return;
    }
    if (!targetUrl.trim()) {
      setError('Please enter a target URL.');
      return;
    }
    setError('');
    setScanning(true);
    setScanResult(null);

    try {
      const res = await fetch('/api/vapt/start-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_token: accessToken,
          target_url: targetUrl,
          authorized: true,
        }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Scan failed');
      }

      setScanId(data.scan_id);

      if (data.status === 'completed') {
        setScanResult(data);
        setScanning(false);
      } else {
        pollScanStatus(data.scan_id);
      }
    } catch (err) {
      setError(err.message);
      setScanning(false);
    }
  }

  async function pollScanStatus(id) {
    const maxAttempts = 30;
    let attempts = 0;

    const poll = async () => {
      if (attempts >= maxAttempts) {
        setError('Scan timed out. Please try again.');
        setScanning(false);
        return;
      }
      attempts++;

      try {
        const res = await fetch(`/api/vapt/scan-status/${id}?access_token=${accessToken}`);
        const data = await res.json();

        if (data.status === 'completed') {
          setScanResult(data);
          setScanning(false);
        } else if (data.status === 'failed') {
          setError(data.error_message || 'Scan failed');
          setScanning(false);
        } else {
          setTimeout(poll, 3000);
        }
      } catch {
        setTimeout(poll, 3000);
      }
    };

    setTimeout(poll, 2000);
  }

  function handleLogout() {
    localStorage.removeItem('vapt_access_token');
    router.push('/vapt-basic-999');
  }

  const gradeColor = {
    A: 'text-cyber-green',
    B: 'text-cyber-blue',
    C: 'text-yellow-400',
    D: 'text-red-400',
  };

  if (!accessToken) {
    return (
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyber-blue animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-bg grid-bg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyber-blue" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white font-heading">VAPT Dashboard</h1>
              <p className="text-xs text-cyber-muted">BugZero Automated Scanner</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>

        {/* Scan Form */}
        {!scanResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="cyber-card rounded-2xl p-8 mb-6"
          >
            <h2 className="text-base font-semibold text-white mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyber-blue" />
              Start Your Security Scan
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Enter the URL of the website you own or have explicit permission to test.
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleScan} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5 font-medium">Target URL</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    placeholder="https://yourwebsite.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-cyber-border text-white placeholder-gray-500 text-sm focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-all"
                  />
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={authorized}
                  onChange={(e) => setAuthorized(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-cyber-border accent-cyber-blue"
                />
                <span className="text-xs text-gray-400 leading-relaxed">
                  I confirm that I own this website or have explicit written permission from the owner to perform security testing on it. Unauthorized scanning is illegal.
                </span>
              </label>

              <button
                type="submit"
                disabled={scanning || !authorized}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {scanning ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Scanning…
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Start VAPT Scan
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {scanning && (
              <div className="mt-6 p-4 rounded-xl bg-cyber-blue/5 border border-cyber-blue/20">
                <div className="flex items-center gap-2 text-cyber-blue text-sm mb-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Scanning in progress…
                </div>
                <p className="text-xs text-gray-400">
                  Checking SSL/TLS, security headers, DNS records, and more. This usually takes 10–30 seconds.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Results */}
        {scanResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Summary Card */}
            <div className="cyber-card rounded-2xl p-6">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-cyber-green" />
                    <span className="text-sm font-semibold text-white">Scan Complete</span>
                  </div>
                  <p className="text-xs text-gray-400 break-all">{targetUrl}</p>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-black ${gradeColor[scanResult.grade] || 'text-red-400'}`}>
                    {scanResult.grade}
                  </div>
                  <div className="text-xs text-gray-400">{scanResult.score}/100</div>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mb-4">
                {['High', 'Medium', 'Low', 'Informational'].map((risk) => {
                  const colors = {
                    High: 'text-red-400 bg-red-400/10 border-red-400/30',
                    Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
                    Low: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
                    Informational: 'text-gray-400 bg-gray-400/10 border-gray-400/30',
                  };
                  return (
                    <div key={risk} className={`rounded-xl border p-3 text-center ${colors[risk]}`}>
                      <div className="text-2xl font-bold">{scanResult.risk_summary?.[risk] || 0}</div>
                      <div className="text-[10px] mt-0.5 opacity-80">{risk}</div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href={`/vapt-report/${scanId}?access_token=${accessToken}`}
                  className="btn-primary text-sm"
                >
                  <FileText className="w-4 h-4" />
                  View Full Report & Download PDF
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => { setScanResult(null); setTargetUrl(''); setAuthorized(false); }}
                  className="btn-secondary text-sm"
                >
                  Scan Another URL
                </button>
              </div>
            </div>

            {/* Quick findings preview */}
            {(scanResult.vulnerabilities?.length > 0) && (
              <div className="cyber-card rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  Top Findings Preview
                </h3>
                <div className="space-y-2">
                  {scanResult.vulnerabilities.slice(0, 4).map((v, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        v.risk === 'High' ? 'bg-red-400/10 text-red-400' :
                        v.risk === 'Medium' ? 'bg-yellow-400/10 text-yellow-400' :
                        'bg-blue-400/10 text-blue-400'
                      }`}>{v.risk}</span>
                      <span className="text-sm text-gray-300">{v.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  +{Math.max(0, (scanResult.vulnerabilities?.length || 0) - 4)} more in full report
                </p>
              </div>
            )}
          </motion.div>
        )}

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <Lock className="w-3 h-3" />
            Secured by BugZero Cyber Solutions · DPIIT Recognized
          </div>
        </div>
      </div>
    </div>
  );
}
