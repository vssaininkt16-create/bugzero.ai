'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Scan, Globe, Zap, Lock } from 'lucide-react';

const STORAGE_KEY = 'bz_scan_popup_shown';

export default function SecurityScanPopup() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleScan = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setIsScanning(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
    const target = url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`;
    setTimeout(() => {
      setIsOpen(false);
      router.push(`/free-security-scan?url=${encodeURIComponent(target)}`);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(2, 8, 23, 0.85)', backdropFilter: 'blur(6px)' }}
          onClick={handleBackdropClick}
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
          >
            {/* Glow border wrapper */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-cyber-blue via-cyber-purple to-cyber-blue opacity-60" />

            {/* Card */}
            <div className="relative rounded-2xl bg-[#07111f] overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-blue" />

              {/* Grid bg overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,212,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.4) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />

              {/* Radial glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-40 bg-cyber-blue/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 p-6 sm:p-8">
                {/* Close button */}
                <button
                  onClick={handleClose}
                  aria-label="Close popup"
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-cyber-blue drop-shadow-[0_0_8px_rgba(0,212,255,0.7)]" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-cyber-blue uppercase mb-0.5">
                      <Zap className="w-3 h-3" /> Free · No Credit Card
                    </span>
                    <h2
                      id="popup-title"
                      className="text-xl sm:text-2xl font-bold font-heading leading-tight"
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 60%, #00d4ff 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      Free Website Security Scan
                    </h2>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Get your website&apos;s{' '}
                  <span className="text-white font-medium">security score in seconds</span>. Our AI-powered scanner
                  checks for common vulnerabilities, exposed endpoints, and misconfigurations.
                </p>

                {/* Trust pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {[
                    { icon: Lock, label: 'SSL / TLS Check' },
                    { icon: Globe, label: 'Header Analysis' },
                    { icon: Scan, label: 'CVE Lookup' },
                  ].map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-xs font-medium"
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </span>
                  ))}
                </div>

                {!scanned ? (
                  <form onSubmit={handleScan} className="space-y-3">
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://yourwebsite.com"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 outline-none transition-all duration-200 focus:border-cyber-blue/50 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(0,212,255,0.12)]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isScanning}
                      className="w-full relative overflow-hidden rounded-xl py-3 px-6 text-sm font-semibold text-white transition-all duration-200 disabled:opacity-70"
                      style={{
                        background: isScanning
                          ? 'linear-gradient(135deg, #0a1628, #0a1628)'
                          : 'linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)',
                        boxShadow: isScanning ? 'none' : '0 0 20px rgba(0,212,255,0.25)',
                      }}
                    >
                      {isScanning ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-cyber-blue/30 border-t-cyber-blue animate-spin" />
                          Scanning…
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Scan className="w-4 h-4" />
                          Scan Now
                        </span>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-xl bg-cyber-green/10 border border-cyber-green/25 p-4 text-center"
                  >
                    <div className="text-cyber-green text-2xl font-bold mb-1">✓ Scan Initiated</div>
                    <p className="text-gray-400 text-sm">
                      Our team will send the full report to your inbox within{' '}
                      <span className="text-white font-medium">2 hours</span>.
                    </p>
                  </motion.div>
                )}

                <p className="text-center text-gray-600 text-xs mt-4">
                  By scanning you agree to our{' '}
                  <a href="/terms-of-service" className="text-gray-500 hover:text-cyber-blue underline underline-offset-2 transition-colors">
                    Terms
                  </a>
                  . We never store your data.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
