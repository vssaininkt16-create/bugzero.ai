'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Zap, CheckCircle, ArrowRight, Lock, FileText,
  Globe, AlertTriangle, Star, ChevronRight, Loader2
} from 'lucide-react';
import Link from 'next/link';

const features = [
  { icon: Globe, label: 'SSL/TLS Check', desc: 'HTTPS enforcement & certificate validity' },
  { icon: Shield, label: 'Security Headers', desc: 'CSP, HSTS, X-Frame-Options & more' },
  { icon: AlertTriangle, label: 'DNS Security', desc: 'SPF, DMARC email spoofing detection' },
  { icon: FileText, label: 'PDF Report', desc: 'Professional VAPT report delivered instantly' },
];

const included = [
  'OWASP-based automated vulnerability scan',
  'SSL/TLS certificate analysis',
  '7 security header checks',
  'DNS SPF & DMARC verification',
  'Technology stack disclosure check',
  'Security grade (A–D) with risk score',
  'Detailed PDF report with remediation steps',
  '1 target URL included',
];

export default function VaptLandingClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handlePayment(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const orderRes = await fetch('/api/vapt/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      const orderData = await orderRes.json();

      if (!orderRes.ok || orderData.error) {
        if (orderData.fallback_url) {
          window.location.href = orderData.fallback_url;
          return;
        }
        throw new Error(orderData.error || 'Failed to create order');
      }

      if (typeof window.Razorpay === 'undefined') {
        await new Promise((resolve, reject) => {
          const existing = document.querySelector('script[src*="checkout.razorpay.com"]');
          if (existing) { resolve(); return; }
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load payment gateway. Please disable any ad-blocker or try a different browser.'));
          document.body.appendChild(script);
        });
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'BugZero Cyber Solutions',
        description: 'VAPT Basic – Automated Security Scan',
        order_id: orderData.order_id,
        prefill: { name, email },
        theme: { color: '#DC2626' },
        handler: async function (response) {
          try {
            const verifyRes = await fetch('/api/vapt/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                name,
                email,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.access_token) {
              localStorage.setItem('vapt_access_token', verifyData.access_token);
              window.location.href = '/vapt-dashboard';
            } else {
              setError('Payment verified but access token not received. Contact support.');
            }
          } catch {
            setError('Payment verification failed. Contact contact@bugzero.solutions');
          }
          setLoading(false);
        },
        modal: { ondismiss: () => setLoading(false) },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Instant Automated Security Scan
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-heading text-gray-900 mb-4">
              VAPT Report for just{' '}
              <span className="text-red-600">₹999</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Get a professional OWASP-aligned vulnerability scan report in minutes. Identify security risks, get a grade, and download your PDF report instantly.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Features */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((f, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition">
                    <f.icon className="w-6 h-6 text-red-600 mb-2" />
                    <div className="text-sm font-semibold text-gray-900">{f.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{f.desc}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  What's included
                </h3>
                <ul className="space-y-2">
                  {included.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-600">
                <Lock className="w-3.5 h-3.5 text-red-600" />
                Secured by Razorpay · SSL encrypted · DPIIT Recognized
              </div>
            </motion.div>

            {/* Payment Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-8 relative overflow-hidden shadow-sm">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-50 border border-red-100 mb-3">
                    <Shield className="w-7 h-7 text-red-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">₹999</div>
                  <div className="text-sm text-gray-500 mt-1">One-time · Instant delivery</div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">500+ scans done</span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">Your Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5 font-medium">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-600 text-white w-full py-4 rounded-lg text-base font-semibold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowedcursor-not-allowed inline-flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        Pay ₹999 & Start Scan
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>

                <p className="mt-4 text-center text-xs text-gray-700">
                  By proceeding you agree to our{' '}
                  <Link href="/terms-of-service" className="text-red-600 hover:underline">Terms</Link>
                  {' '}and{' '}
                  <Link href="/privacy-policy" className="text-red-600 hover:underline">Privacy Policy</Link>.
                </p>
              </div>

              <div className="mt-4 text-center">
                <Link href="/contact" className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center justify-center gap-1">
                  Need a full manual VAPT? <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
