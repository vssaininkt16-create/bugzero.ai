'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, ShieldCheck, ShieldAlert, Globe, Lock, Search, ArrowRight,
  CheckCircle, XCircle, AlertTriangle, Loader2, Mail, BarChart3,
  Server, Eye, FileText, ChevronRight, Download
} from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';
import SectionWrapper from '@/components/SectionWrapper';
import Link from 'next/link';

function ScoreGauge({ score, grade }) {
  const color = grade === 'A' ? '#10b981' : grade === 'B' ? '#eab308' : grade === 'C' ? '#f97316' : '#ef4444';
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-52 h-52 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
        <circle cx="90" cy="90" r="80" stroke="#1e293b" strokeWidth="10" fill="none" />
        <motion.circle
          cx="90" cy="90" r="80" stroke={color} strokeWidth="10" fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-5xl font-bold font-heading"
          style={{ color }}
        >
          {score}
        </motion.span>
        <span className="text-sm text-gray-400">out of 100</span>
        <span className="text-2xl font-bold mt-1" style={{ color }}>Grade {grade}</span>
      </div>
    </div>
  );
}

function CheckItem({ check, label }) {
  if (!check) return null;
  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg border ${check.pass ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
      {check.pass ? (
        <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
      ) : (
        <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
      )}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">{label || check.label}</span>
          <span className={`text-xs font-bold ${check.pass ? 'text-green-400' : 'text-red-400'}`}>
            {check.pass ? `+${check.score}pts` : '0pts'}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{check.pass ? (check.value || check.details) : (check.recommendation || check.details)}</p>
      </div>
    </div>
  );
}

export default function SecurityScanPage() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', company: '' });
  const [emailSaved, setEmailSaved] = useState(false);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setScanning(true);
    setResult(null);
    setError('');
    setShowEmailForm(false);
    setEmailSaved(false);

    try {
      const res = await fetch('/api/security-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.data);
      } else {
        setError(data.error || 'Scan failed');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setScanning(false);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/security-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, ...emailForm }),
      });
      setEmailSaved(true);
    } catch {
      // silent fail
    }
  };

  const headerChecks = result ? Object.entries(result.checks?.headers || {}).filter(([k]) => !k.startsWith('_')) : [];

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] radial-glow-blue" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-sm font-medium mb-6">
            <Search className="w-4 h-4" /> Free Security Assessment Tool
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6">
            Free Website <span className="gradient-text">Security Scan</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Get your website&apos;s security score in seconds. Our scanner checks SSL, security headers,
            DNS configuration, and more.
          </motion.p>

          {/* Scan Form */}
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            onSubmit={handleScan} className="max-w-xl mx-auto">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website URL (e.g., example.com)"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-cyber-card border border-cyber-border text-white text-base placeholder-gray-500 focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none"
                  disabled={scanning}
                />
              </div>
              <button
                type="submit"
                disabled={scanning || !url.trim()}
                className="btn-primary px-6 py-4 text-base disabled:opacity-50 shrink-0"
              >
                {scanning ? <><Loader2 className="w-5 h-5 animate-spin" /> Scanning...</> : <>Scan Now <Search className="w-5 h-5" /></>}
              </button>
            </div>
          </motion.form>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mt-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3 max-w-xl mx-auto">
              <AlertTriangle className="w-4 h-4 inline mr-1" /> {error}
            </motion.p>
          )}
        </div>
      </section>

      {/* Scanning Animation */}
      <AnimatePresence>
        {scanning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto px-4 py-12 text-center">
            <div className="cyber-card rounded-2xl p-12">
              <Loader2 className="w-16 h-16 text-cyber-blue animate-spin mx-auto mb-6" />
              <h3 className="text-xl font-bold text-white mb-2">Scanning {url}...</h3>
              <p className="text-gray-400 text-sm">Checking SSL, security headers, DNS configuration...</p>
              <div className="mt-6 space-y-2 text-left max-w-xs mx-auto">
                {['SSL Certificate', 'HTTP Security Headers', 'DNS Records', 'Technology Detection'].map((c, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.5 }}
                    className="flex items-center gap-2 text-sm text-gray-300">
                    <Loader2 className="w-3 h-3 text-cyber-blue animate-spin" /> {c}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !scanning && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 pb-20">
            {/* Score Card */}
            <div className="cyber-card rounded-2xl p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white font-heading mb-2">Security Report for</h2>
                <p className="text-cyber-blue font-mono">{result.url}</p>
              </div>
              <ScoreGauge score={result.score} grade={result.grade} />
            </div>

            {/* Detailed Results */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* SSL Check */}
              <div className="cyber-card rounded-xl p-5">
                <h3 className="text-base font-bold text-white font-heading mb-3 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyber-blue" /> SSL Certificate
                </h3>
                <CheckItem check={result.checks?.ssl} label="HTTPS / SSL" />
              </div>

              {/* DNS Checks */}
              <div className="cyber-card rounded-xl p-5">
                <h3 className="text-base font-bold text-white font-heading mb-3 flex items-center gap-2">
                  <Server className="w-4 h-4 text-cyber-purple" /> DNS Security
                </h3>
                <div className="space-y-2">
                  <CheckItem check={result.checks?.dns?.spf} label="SPF Record" />
                  <CheckItem check={result.checks?.dns?.dmarc} label="DMARC Record" />
                </div>
              </div>

              {/* Security Headers */}
              <div className="cyber-card rounded-xl p-5 md:col-span-2">
                <h3 className="text-base font-bold text-white font-heading mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyber-green" /> HTTP Security Headers
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {headerChecks.map(([key, check]) => (
                    <CheckItem key={key} check={check} />
                  ))}
                </div>
              </div>

              {/* Technology */}
              {result.checks?.headers?._tech && (
                <div className="cyber-card rounded-xl p-5 md:col-span-2">
                  <h3 className="text-base font-bold text-white font-heading mb-3 flex items-center gap-2">
                    <Eye className="w-4 h-4 text-cyber-saffron" /> Technology Detection
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-400">Server:</span> <span className="text-white ml-2">{result.checks.headers._tech.server}</span></div>
                    <div><span className="text-gray-400">X-Powered-By:</span> <span className="text-white ml-2">{result.checks.headers._tech.poweredBy}</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Section */}
            <div className="mt-8 cyber-card rounded-2xl p-8 text-center">
              <ShieldAlert className="w-12 h-12 text-cyber-blue mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white font-heading mb-2">
                Want a Full Professional VAPT Report?
              </h3>
              <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                Our scan covers basic checks. A full VAPT assessment covers OWASP Top 10,
                business logic, authentication, and 100+ vulnerability checks.
              </p>

              {!showEmailForm && !emailSaved && (
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button onClick={() => setShowEmailForm(true)} className="btn-secondary">
                    <Mail className="w-4 h-4" /> Email Me Full Report
                  </button>
                  <Link href="/contact" className="btn-primary">
                    Get Professional VAPT <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {showEmailForm && !emailSaved && (
                <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto space-y-3 mt-4">
                  <input type="text" placeholder="Your Name" value={emailForm.name}
                    onChange={e => setEmailForm({...emailForm, name: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg bg-cyber-card border border-cyber-border text-white text-sm focus:border-cyber-blue outline-none" />
                  <input type="email" required placeholder="Email *" value={emailForm.email}
                    onChange={e => setEmailForm({...emailForm, email: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg bg-cyber-card border border-cyber-border text-white text-sm focus:border-cyber-blue outline-none" />
                  <input type="text" placeholder="Company Name" value={emailForm.company}
                    onChange={e => setEmailForm({...emailForm, company: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg bg-cyber-card border border-cyber-border text-white text-sm focus:border-cyber-blue outline-none" />
                  <button type="submit" className="btn-primary w-full justify-center py-3">
                    Send Report <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {emailSaved && (
                <div className="flex items-center justify-center gap-2 text-cyber-green">
                  <CheckCircle className="w-5 h-5" />
                  <span>Report will be sent to your email shortly!</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Section */}
      {!result && !scanning && (
        <SectionWrapper>
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { icon: Lock, title: 'SSL & HTTPS', desc: 'Checks if your site has a valid SSL certificate and enforces HTTPS.' },
                { icon: ShieldCheck, title: 'Security Headers', desc: 'Analyzes 7 critical HTTP security headers for protection.' },
                { icon: Server, title: 'DNS Security', desc: 'Verifies SPF and DMARC records to prevent email spoofing.' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="cyber-card rounded-xl p-6 text-center">
                  <item.icon className="w-10 h-10 text-cyber-blue mx-auto mb-3" />
                  <h3 className="text-base font-bold text-white font-heading mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      )}

      <TrustBadges />
    </div>
  );
}
