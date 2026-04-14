'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Shield, Loader2, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState('signin')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', fullName: '' })
  const [emailUnconfirmed, setEmailUnconfirmed] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  useEffect(() => {
    if (searchParams.get('error') === 'auth_failed') {
      setError('Authentication failed. Please try again.')
    }
  }, [searchParams])

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const switchTab = (t) => {
    setTab(t)
    setError(null)
    setSuccess(null)
    setEmailUnconfirmed(false)
  }

  const handleResendConfirmation = async () => {
    setResendLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: form.email,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) throw error
      setSuccess('Confirmation email resent! Please check your inbox.')
      setEmailUnconfirmed(false)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setResendLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) {
        setError(error.message)
        setLoading(false)
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  const handleEmailAuth = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError(null)
    setSuccess(null)
    const supabase = createClient()
    try {
      if (tab === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })
        if (error) {
          if (error.message.toLowerCase().includes('email not confirmed')) {
            setEmailUnconfirmed(true)
            setError('Your email is not confirmed yet. Please check your inbox.')
          } else {
            throw error
          }
          return
        }
        router.push('/portal/dashboard')
        router.refresh()
      } else {
        if (!form.fullName.trim()) throw new Error('Please enter your full name.')
        if (form.password.length < 8) throw new Error('Password must be at least 8 characters.')
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: { full_name: form.fullName },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        setSuccess('Account created! Check your email to confirm your account.')
        setForm({ email: '', password: '', fullName: '' })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 " />
      <div className="absolute inset-0 " />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-red-50 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-red-50 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-50 border border-red-200 mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">
            Welcome to <span className="text-red-600-blue">BugZero</span>
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            Sign in to access your security dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent" />

          {/* Tabs */}
          <div className="flex rounded-xl bg-gray-50 border border-gray-200 p-1 mb-6">
            {['signin', 'signup'].map((t) => (
              <button
                key={t}
                onClick={() => switchTab(t)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  tab === t
                    ? 'bg-red-50 text-red-600 border border-red-200'
                    : 'text-gray-500 hover:text-red-600'
                }`}
              >
                {t === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
              {emailUnconfirmed && (
                <button
                  onClick={handleResendConfirmation}
                  disabled={resendLoading}
                  className="mt-2 flex items-center justify-center gap-2 w-full py-2 rounded-lg
                             bg-red-500/10 border border-red-500/30 text-red-300
                             hover:bg-red-500/20 transition-all duration-200 text-xs font-medium
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowedcursor-not-allowed"
                >
                  {resendLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
                  {resendLoading ? 'Sending...' : 'Resend confirmation email'}
                </button>
              )}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm text-center">
              {success}
            </div>
          )}

          {/* Email / Password form */}
          <form onSubmit={handleEmailAuth} className="space-y-3">
            {tab === 'signup' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={handleChange}
                  autoComplete="name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200
                             text-gray-900 placeholder-cyber-muted/60 text-sm
                             focus:outline-none focus:border-red-200 transition-all duration-200"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200
                           text-gray-900 placeholder-cyber-muted/60 text-sm
                           focus:outline-none focus:border-red-200 transition-all duration-200"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={tab === 'signup' ? 'Password (min. 8 characters)' : 'Password'}
                value={form.password}
                onChange={handleChange}
                autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-50 border border-gray-200
                           text-gray-900 placeholder-cyber-muted/60 text-sm
                           focus:outline-none focus:border-red-200 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {tab === 'signin' && (
              <div className="flex justify-end">
                <a href="/forgot-password" className="text-xs text-gray-500 hover:text-red-600 transition-colors">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                         bg-red-50 border border-red-200 text-red-600 font-medium text-sm
                         hover:bg-red-50 hover:border-red-200
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowedcursor-not-allowed
                         hover:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {tab === 'signup' ? 'Creating account...' : 'Signing in...'}
                </>
              ) : (
                tab === 'signup' ? 'Create Account' : 'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-cyber-border" />
            <span className="text-xs text-gray-500 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-cyber-border" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl
                       bg-gray-50 border border-gray-200 hover:border-red-200
                       hover: transition-all duration-300
                       text-gray-900 font-medium text-sm
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowedcursor-not-allowed
                       hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="mt-5 text-center text-xs text-gray-500/60">
            Your data is encrypted end-to-end. We never share your information with third parties.
          </p>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-sm text-gray-500 hover:text-red-600 transition-colors">
            &larr; Back to home
          </a>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
