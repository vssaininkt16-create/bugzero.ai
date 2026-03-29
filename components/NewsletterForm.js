'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe');
      }
    } catch {
      setStatus('error');
      setMessage('Network error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 text-cyber-green text-sm">
        <CheckCircle className="w-4 h-4" />
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-cyber-card border border-cyber-border text-white text-sm placeholder-gray-500 focus:border-cyber-blue outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-4 py-2.5 rounded-lg bg-cyber-blue text-cyber-bg text-sm font-semibold hover:shadow-lg hover:shadow-cyber-blue/20 transition-all disabled:opacity-50 shrink-0"
      >
        {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
      </button>
    </form>
  );
}
