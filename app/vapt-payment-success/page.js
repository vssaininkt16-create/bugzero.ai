'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Loader2, Shield, ArrowRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState('verifying'); // verifying | success | error
  const [error, setError] = useState('');

  useEffect(() => {
    const razorpay_payment_id = searchParams.get('razorpay_payment_id');
    const razorpay_payment_link_id = searchParams.get('razorpay_payment_link_id');
    const razorpay_payment_link_reference_id = searchParams.get('razorpay_payment_link_reference_id');
    const razorpay_payment_link_status = searchParams.get('razorpay_payment_link_status');
    const razorpay_signature = searchParams.get('razorpay_signature');

    if (!razorpay_payment_id) {
      const token = localStorage.getItem('vapt_access_token');
      if (token) {
        router.push('/vapt-dashboard');
      } else {
        setStatus('error');
        setError('No payment information found.');
      }
      return;
    }

    async function verify() {
      try {
        const res = await fetch('/api/vapt/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_payment_id,
            razorpay_payment_link_id,
            razorpay_payment_link_reference_id,
            razorpay_payment_link_status,
            razorpay_signature,
          }),
        });
        const data = await res.json();
        if (data.access_token) {
          localStorage.setItem('vapt_access_token', data.access_token);
          setStatus('success');
          setTimeout(() => router.push('/vapt-dashboard'), 2500);
        } else {
          throw new Error(data.error || 'Verification failed');
        }
      } catch (err) {
        setStatus('error');
        setError(err.message);
      }
    }

    verify();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-cyber-bg grid-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full cyber-card rounded-2xl p-8 text-center"
      >
        {status === 'verifying' && (
          <>
            <Loader2 className="w-12 h-12 text-cyber-blue animate-spin mx-auto mb-4" />
            <h1 className="text-xl font-bold text-white mb-2">Verifying Payment…</h1>
            <p className="text-gray-400 text-sm">Please wait while we confirm your payment.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-cyber-green mx-auto mb-4" />
            <h1 className="text-xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-gray-400 text-sm mb-6">
              Your VAPT access has been activated. Redirecting to dashboard…
            </p>
            <Link href="/vapt-dashboard" className="btn-primary text-sm justify-center w-full">
              Go to Dashboard <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-white mb-2">Verification Issue</h1>
            <p className="text-gray-400 text-sm mb-2">{error}</p>
            <p className="text-xs text-gray-500 mb-6">
              If you completed payment, contact{' '}
              <a href="mailto:contact@bugzero.solutions" className="text-cyber-blue hover:underline">
                contact@bugzero.solutions
              </a>
            </p>
            <Link href="/vapt-basic-999" className="btn-secondary text-sm justify-center w-full">
              Back to VAPT Page
            </Link>
          </>
        )}

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Shield className="w-3 h-3" />
          BugZero Cyber Solutions · DPIIT Recognized
        </div>
      </motion.div>
    </div>
  );
}

export default function VaptPaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cyber-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyber-blue animate-spin" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
