'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Shield, Mail, ArrowLeft, Loader2, CheckCircle, AlertTriangle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) { setError('Please enter your email address'); return }
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (err) throw err
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 " />
      <div className="absolute inset-0 " />
      <div className="absolute top-1/3 -left-32 w-64 h-64 bg-red-50 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-red-50 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 border border-red-200 mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">
            Forgot <span className="text-red-600-blue">Password?</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent" />

          {!success ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com" autoComplete="email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-cyber-muted/60 text-sm focus:outline-none focus:border-red-200 transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertTriangle className="w-4 h-4 shrink-0" />{error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 hover:border-red-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowedcursor-not-allowed hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]">
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : 'Send Reset Link'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200/50 text-center">
                <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to Sign In
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-heading mb-2">Check Your Email</h3>
              <p className="text-sm text-gray-500 mb-1">We sent a reset link to:</p>
              <p className="text-sm text-red-600 font-medium">{email}</p>
              <p className="text-xs text-gray-500 mt-3">The link expires in 1 hour. Check your spam folder if you don't see it.</p>
              <button onClick={() => { setSuccess(false); setEmail('') }}
                className="mt-6 text-xs text-gray-500 hover:text-red-600 transition-colors">
                Use a different email
              </button>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-red-600 transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
