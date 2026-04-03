'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Shield, Lock, Eye, EyeOff, Loader2, CheckCircle, AlertTriangle } from 'lucide-react'

function ResetForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [show, setShow] = useState({ password: false, confirm: false })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const [validSession, setValidSession] = useState(false)

  useEffect(() => {
    // Supabase handles hash-based token automatically
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setValidSession(true)
    })
  }, [])

  const strength = (p) => {
    if (!p) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  }

  const s = strength(form.password)
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-400', 'bg-cyber-blue', 'bg-cyber-green']

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error: err } = await supabase.auth.updateUser({ password: form.password })
      if (err) throw err
      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch (err) {
      setError(err.message || 'Failed to reset password. The link may have expired.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 radial-glow-blue" />
      <div className="absolute top-1/3 -left-32 w-64 h-64 bg-cyber-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-cyber-purple/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyber-blue/10 border border-cyber-blue/20 mb-4">
            <Shield className="w-8 h-8 text-cyber-blue" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">
            Reset <span className="gradient-text-blue">Password</span>
          </h1>
          <p className="text-cyber-muted mt-2 text-sm">Create a new strong password for your account</p>
        </div>

        <div className="cyber-card rounded-2xl p-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent" />

          {success ? (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-cyber-green" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading mb-2">Password Reset!</h3>
              <p className="text-sm text-cyber-muted">Your password has been updated successfully.</p>
              <p className="text-xs text-cyber-muted/60 mt-2">Redirecting to sign in...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-cyber-muted uppercase tracking-wider mb-1.5">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted pointer-events-none" />
                  <input
                    type={show.password ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Minimum 8 characters" autoComplete="new-password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-cyber-border text-white placeholder-cyber-muted/60 text-sm focus:outline-none focus:border-cyber-blue/40 transition-all"
                  />
                  <button type="button" onClick={() => setShow(p => ({ ...p, password: !p.password }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-muted hover:text-white transition-colors">
                    {show.password ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= s ? strengthColor[s] : 'bg-cyber-border'}`} />
                      ))}
                    </div>
                    <p className="text-[11px] text-cyber-muted">Strength: <span className={`font-medium ${s >= 3 ? 'text-cyber-green' : s === 2 ? 'text-yellow-400' : 'text-red-400'}`}>{strengthLabel[s]}</span></p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs text-cyber-muted uppercase tracking-wider mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted pointer-events-none" />
                  <input
                    type={show.confirm ? 'text' : 'password'}
                    value={form.confirm}
                    onChange={e => setForm(prev => ({ ...prev, confirm: e.target.value }))}
                    placeholder="Repeat new password" autoComplete="new-password"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-cyber-border text-white placeholder-cyber-muted/60 text-sm focus:outline-none focus:border-cyber-blue/40 transition-all"
                  />
                  <button type="button" onClick={() => setShow(p => ({ ...p, confirm: !p.confirm }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-muted hover:text-white transition-colors">
                    {show.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.confirm && form.password !== form.confirm && (
                  <p className="text-[11px] text-red-400 mt-1">Passwords don't match</p>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertTriangle className="w-4 h-4 shrink-0" />{error}
                </div>
              )}

              <button type="submit" disabled={loading || !form.password || !form.confirm}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-cyber-blue/20 border border-cyber-blue/30 text-cyber-blue font-semibold text-sm hover:bg-cyber-blue/30 hover:border-cyber-blue/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]">
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Updating...</> : 'Update Password'}
              </button>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/login" className="text-sm text-cyber-muted hover:text-cyber-blue transition-colors">
            ← Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetForm />
    </Suspense>
  )
}
