'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import {
  Shield, Lock, Key, Smartphone, Eye, EyeOff, CheckCircle, AlertTriangle,
  Loader2, X, QrCode, Copy, RefreshCw, ChevronRight, Fingerprint, Zap
} from 'lucide-react'

function SectionCard({ title, subtitle, icon: Icon, children, badge }) {
  return (
    <div className="cyber-card rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-cyber-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center">
              <Icon className="w-4 h-4 text-cyber-blue" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">{title}</h2>
              {subtitle && <p className="text-[11px] text-cyber-muted mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {badge}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function Alert({ type, msg, onClose }) {
  const styles = type === 'success'
    ? 'bg-cyber-green/10 border-cyber-green/20 text-cyber-green'
    : 'bg-red-500/10 border-red-500/20 text-red-400'
  const Icon = type === 'success' ? CheckCircle : AlertTriangle
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border text-sm ${styles}`}>
      <Icon className="w-4 h-4 shrink-0" />
      <span className="flex-1">{msg}</span>
      {onClose && <button onClick={onClose}><X className="w-4 h-4" /></button>}
    </div>
  )
}

// Password Change section
function PasswordSection() {
  const [form, setForm] = useState({ current: '', password: '', confirm: '' })
  const [show, setShow] = useState({ current: false, password: false, confirm: false })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)

  const strength = (p) => {
    if (!p) return 0
    let s = 0
    if (p.length >= 8) s++
    if (/[A-Z]/.test(p)) s++
    if (/[0-9]/.test(p)) s++
    if (/[^A-Za-z0-9]/.test(p)) s++
    return s
  }

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColor = ['', 'bg-red-500', 'bg-yellow-400', 'bg-cyber-blue', 'bg-cyber-green']
  const s = strength(form.password)

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const toggleShow = (k) => setShow(p => ({ ...p, [k]: !p[k] }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setMsg({ type: 'error', text: 'Passwords do not match' }); return }
    if (form.password.length < 8) { setMsg({ type: 'error', text: 'Password must be at least 8 characters' }); return }
    setLoading(true)
    setMsg(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({ password: form.password })
      if (error) throw error
      setMsg({ type: 'success', text: 'Password updated successfully!' })
      setForm({ current: '', password: '', confirm: '' })
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  const PwdInput = ({ name, label, placeholder }) => (
    <div>
      <label className="block text-xs text-cyber-muted uppercase tracking-wider mb-1.5">{label}</label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-muted pointer-events-none" />
        <input
          name={name} type={show[name] ? 'text' : 'password'} value={form[name]} onChange={handleChange}
          placeholder={placeholder} autoComplete="new-password"
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-cyber-border text-white placeholder-cyber-muted/50 text-sm focus:outline-none focus:border-cyber-blue/40 transition-all"
        />
        <button type="button" onClick={() => toggleShow(name)} className="absolute right-3 top-1/2 -translate-y-1/2 text-cyber-muted hover:text-white transition-colors">
          {show[name] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )

  return (
    <SectionCard title="Change Password" subtitle="Use a strong, unique password" icon={Lock}
      badge={<span className="trust-badge badge-green text-[10px]"><CheckCircle className="w-3 h-3" /> Active</span>}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <PwdInput name="current" label="Current Password" placeholder="Your current password" />
        <PwdInput name="password" label="New Password" placeholder="Minimum 8 characters" />

        {form.password && (
          <div className="space-y-1.5">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= s ? strengthColor[s] : 'bg-cyber-border'}`} />
              ))}
            </div>
            <p className="text-[11px] text-cyber-muted">Strength: <span className={`font-medium ${s >= 3 ? 'text-cyber-green' : s === 2 ? 'text-yellow-400' : 'text-red-400'}`}>{strengthLabel[s]}</span></p>
          </div>
        )}

        <PwdInput name="confirm" label="Confirm New Password" placeholder="Repeat new password" />

        {msg && <Alert type={msg.type} msg={msg.text} onClose={() => setMsg(null)} />}

        <div className="flex justify-end pt-1">
          <button type="submit" disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyber-blue/15 border border-cyber-blue/30 text-cyber-blue text-sm font-semibold hover:bg-cyber-blue/25 transition-all disabled:opacity-50">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Updating...</> : <><Key className="w-4 h-4" />Update Password</>}
          </button>
        </div>
      </form>
    </SectionCard>
  )
}

// 2FA Section
function TwoFASection({ user }) {
  const [enabled, setEnabled] = useState(user?.twoFactorEnabled || false)
  const [showSetup, setShowSetup] = useState(false)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)
  const [copied, setCopied] = useState(false)

  const secret = 'JBSWY3DPEHPK3PXP' // Demo secret
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=otpauth://totp/BugZero:${encodeURIComponent(user?.email || 'user@bugzero.io')}?secret=${secret}%26issuer=BugZero`

  const handleToggle = async () => {
    if (!enabled) {
      setShowSetup(true)
    } else {
      setLoading(true)
      try {
        const supabase = createClient()
        const { data: { user: authUser } } = await supabase.auth.getUser()
        await supabase.from('profiles').update({ two_factor_enabled: false }).eq('id', authUser.id)
        setEnabled(false)
        setMsg({ type: 'success', text: '2FA has been disabled.' })
      } catch (err) {
        setMsg({ type: 'error', text: err.message })
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEnable = async () => {
    if (code.length !== 6) { setMsg({ type: 'error', text: 'Enter the 6-digit code from your authenticator app' }); return }
    setLoading(true)
    try {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      await supabase.from('profiles').update({ two_factor_enabled: true }).eq('id', authUser.id)
      setEnabled(true)
      setShowSetup(false)
      setMsg({ type: 'success', text: '2FA enabled! Your account is now more secure.' })
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  const copySecret = () => {
    navigator.clipboard.writeText(secret)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <SectionCard title="Two-Factor Authentication" subtitle="Add an extra layer of security" icon={Smartphone}
      badge={
        <span className={`trust-badge text-[10px] ${enabled ? 'badge-green' : 'badge-saffron'}`}>
          {enabled ? <><CheckCircle className="w-3 h-3" /> Enabled</> : <><AlertTriangle className="w-3 h-3" /> Disabled</>}
        </span>
      }>
      <div className="space-y-4">
        {!showSetup ? (
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-cyber-border">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${enabled ? 'bg-cyber-green/15 border border-cyber-green/20' : 'bg-yellow-400/10 border border-yellow-400/20'}`}>
                <Fingerprint className={`w-5 h-5 ${enabled ? 'text-cyber-green' : 'text-yellow-400'}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Authenticator App</p>
                <p className="text-[11px] text-cyber-muted">Google Authenticator, Authy, etc.</p>
              </div>
            </div>
            <button onClick={handleToggle} disabled={loading}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 ${enabled ? 'bg-cyber-green' : 'bg-cyber-border'}`}>
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${enabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-cyber-blue/5 border border-cyber-blue/15">
              <p className="text-sm font-semibold text-white mb-3">Setup Instructions</p>
              <ol className="space-y-2 text-xs text-cyber-muted list-decimal list-inside">
                <li>Install Google Authenticator or Authy on your mobile device</li>
                <li>Scan the QR code below or enter the secret key manually</li>
                <li>Enter the 6-digit code from your app to complete setup</li>
              </ol>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-xl bg-white/3 border border-cyber-border">
              <div className="p-2 bg-white rounded-xl shrink-0">
                <img src={qrUrl} alt="2FA QR Code" className="w-36 h-36" />
              </div>
              <div className="flex-1 space-y-3 w-full">
                <div>
                  <p className="text-xs text-cyber-muted uppercase tracking-wider mb-1.5">Manual Entry Key</p>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-cyber-border/30 border border-cyber-border font-mono text-sm text-white">
                    <span className="flex-1 tracking-widest">{secret}</span>
                    <button type="button" onClick={copySecret} className="text-cyber-muted hover:text-cyber-blue transition-colors">
                      {copied ? <CheckCircle className="w-4 h-4 text-cyber-green" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-cyber-muted uppercase tracking-wider mb-1.5">Verification Code</label>
                  <input
                    type="text" value={code} onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000" maxLength={6}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-cyber-border text-white placeholder-cyber-muted/50 text-sm text-center tracking-[0.5em] focus:outline-none focus:border-cyber-blue/40 transition-all font-mono"
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowSetup(false)} className="flex-1 py-2.5 rounded-xl border border-cyber-border text-cyber-muted hover:text-white text-sm transition-all">Cancel</button>
                  <button onClick={handleEnable} disabled={loading}
                    className="flex-1 py-2.5 rounded-xl bg-cyber-green/15 border border-cyber-green/30 text-cyber-green text-sm font-semibold hover:bg-cyber-green/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    {loading ? 'Verifying...' : 'Enable 2FA'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {msg && <Alert type={msg.type} msg={msg.text} onClose={() => setMsg(null)} />}
      </div>
    </SectionCard>
  )
}

// Login Methods section
function LoginMethodsSection({ provider }) {
  return (
    <SectionCard title="Login Methods" subtitle="Manage how you sign in" icon={Key}>
      <div className="space-y-3">
        {[
          { label: 'Email & Password', icon: Lock, active: provider === 'email' || !provider, color: 'cyber-blue' },
          { label: 'Google OAuth', icon: () => (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
          ), active: provider === 'google', color: 'cyber-green' },
        ].map((m, i) => {
          const Icon = m.icon
          return (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-cyber-border">
              <div className="flex items-center gap-3">
                <Icon />
                <p className="text-sm text-white">{m.label}</p>
              </div>
              {m.active ? (
                <span className="trust-badge badge-green text-[10px]"><CheckCircle className="w-3 h-3" /> Connected</span>
              ) : (
                <button className="trust-badge badge-blue text-[10px] cursor-pointer hover:bg-cyber-blue/20 transition-all">Connect</button>
              )}
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}

// Security alerts
function SecurityAlertsSection() {
  const alerts = [
    { type: 'warning', msg: 'Login from new device detected', time: '5 hours ago', icon: AlertTriangle },
    { type: 'info', msg: 'Password changed successfully', time: '2 days ago', icon: CheckCircle },
    { type: 'info', msg: 'Email address verified', time: '5 days ago', icon: Shield },
  ]
  return (
    <SectionCard title="Security Alerts" subtitle="Recent account security events" icon={Shield}>
      <div className="space-y-3">
        {alerts.map((a, i) => {
          const Icon = a.icon
          return (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${a.type === 'warning' ? 'bg-yellow-400/5 border-yellow-400/15' : 'bg-white/3 border-cyber-border'}`}>
              <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${a.type === 'warning' ? 'text-yellow-400' : 'text-cyber-green'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">{a.msg}</p>
                <p className="text-[11px] text-cyber-muted mt-0.5">{a.time}</p>
              </div>
              {a.type === 'warning' && <ChevronRight className="w-4 h-4 text-cyber-muted shrink-0 mt-0.5" />}
            </div>
          )
        })}
      </div>
    </SectionCard>
  )
}

export default function SecurityClient({ user }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold font-heading text-white">Security Settings</h1>
        <p className="text-cyber-muted text-sm mt-1">Manage your password, 2FA, and account security preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <PasswordSection />
          <LoginMethodsSection provider={user?.provider} />
        </div>
        <div className="space-y-6">
          <TwoFASection user={user} />
          <SecurityAlertsSection />
        </div>
      </div>
    </div>
  )
}
