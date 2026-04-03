'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Settings, Bell, Globe, Moon, Eye, Trash2, CheckCircle, AlertTriangle, Loader2, X, Save, ChevronRight, Shield } from 'lucide-react'

function Toggle({ checked, onChange }) {
  return (
    <button type="button" onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${checked ? 'bg-cyber-blue' : 'bg-cyber-border'}`}>
      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${checked ? 'left-6' : 'left-1'}`} />
    </button>
  )
}

function SettingRow({ label, desc, checked, onChange }) {
  return (
    <div className="flex items-start justify-between py-3.5 border-b border-cyber-border/50 last:border-0">
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-sm text-white font-medium">{label}</p>
        {desc && <p className="text-[11px] text-cyber-muted mt-0.5">{desc}</p>}
      </div>
      <Toggle checked={checked} onChange={() => onChange(!checked)} />
    </div>
  )
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="cyber-card rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-cyber-border flex items-center gap-2">
        <Icon className="w-4 h-4 text-cyber-blue" />
        <h2 className="text-sm font-semibold text-white">{title}</h2>
      </div>
      <div className="px-6 py-2">{children}</div>
    </div>
  )
}

export default function SettingsClient({ user }) {
  const [prefs, setPrefs] = useState({
    marketing_emails: false,
    product_updates: true,
    security_alerts: true,
    login_notifications: true,
    session_timeout: true,
    two_factor_required: user?.twoFactorEnabled || false,
    public_profile: true,
    show_online_status: true,
  })
  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('Asia/Kolkata')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')

  const toggle = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }))

  const handleSave = async () => {
    setSaving(true)
    setMsg(null)
    try {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      await supabase.from('profiles').update({
        preferences: prefs,
        language,
        timezone,
        updated_at: new Date().toISOString()
      }).eq('id', authUser.id)
      setMsg({ type: 'success', text: 'Settings saved successfully!' })
      setTimeout(() => setMsg(null), 4000)
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Account Settings</h1>
          <p className="text-cyber-muted text-sm mt-1">Manage preferences, privacy, and account controls</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyber-blue/15 border border-cyber-blue/30 text-cyber-blue text-sm font-semibold hover:bg-cyber-blue/25 transition-all disabled:opacity-50">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save All</>}
        </button>
      </div>

      {msg && (
        <div className={`flex items-center gap-3 p-3 rounded-xl border text-sm ${msg.type === 'success' ? 'bg-cyber-green/10 border-cyber-green/20 text-cyber-green' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {msg.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
          {msg.text}
          <button onClick={() => setMsg(null)} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preferences */}
        <div className="space-y-6">
          <SectionCard title="Email Notifications" icon={Bell}>
            <SettingRow label="Security Alerts" desc="Login attempts, password changes" checked={prefs.security_alerts} onChange={v => setPrefs(p => ({ ...p, security_alerts: v }))} />
            <SettingRow label="Login Notifications" desc="Alert when a new device signs in" checked={prefs.login_notifications} onChange={v => setPrefs(p => ({ ...p, login_notifications: v }))} />
            <SettingRow label="Product Updates" desc="New features and announcements" checked={prefs.product_updates} onChange={v => setPrefs(p => ({ ...p, product_updates: v }))} />
            <SettingRow label="Marketing Emails" desc="Offers, tips, and resources" checked={prefs.marketing_emails} onChange={v => setPrefs(p => ({ ...p, marketing_emails: v }))} />
          </SectionCard>

          <SectionCard title="Regional Settings" icon={Globe}>
            <div className="py-3.5 space-y-4">
              <div>
                <label className="block text-xs text-cyber-muted uppercase tracking-wider mb-1.5">Language</label>
                <select value={language} onChange={e => setLanguage(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-cyber-border text-white text-sm focus:outline-none focus:border-cyber-blue/40 transition-all">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-cyber-muted uppercase tracking-wider mb-1.5">Timezone</label>
                <select value={timezone} onChange={e => setTimezone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-cyber-border text-white text-sm focus:outline-none focus:border-cyber-blue/40 transition-all">
                  <option value="Asia/Kolkata">India (IST, UTC+5:30)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">US Eastern (UTC-5)</option>
                  <option value="Europe/London">London (UTC+0)</option>
                </select>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Privacy & Security prefs */}
        <div className="space-y-6">
          <SectionCard title="Privacy" icon={Eye}>
            <SettingRow label="Public Profile" desc="Allow others to view your profile" checked={prefs.public_profile} onChange={v => setPrefs(p => ({ ...p, public_profile: v }))} />
            <SettingRow label="Show Online Status" desc="Let others see when you're online" checked={prefs.show_online_status} onChange={v => setPrefs(p => ({ ...p, show_online_status: v }))} />
          </SectionCard>

          <SectionCard title="Security Preferences" icon={Shield}>
            <SettingRow label="Require 2FA" desc="Force 2FA on every login" checked={prefs.two_factor_required} onChange={v => setPrefs(p => ({ ...p, two_factor_required: v }))} />
            <SettingRow label="Auto Session Timeout" desc="Log out after 30 minutes of inactivity" checked={prefs.session_timeout} onChange={v => setPrefs(p => ({ ...p, session_timeout: v }))} />
          </SectionCard>

          {/* Danger zone */}
          <div className="cyber-card rounded-2xl overflow-hidden border-red-500/20">
            <div className="px-6 py-4 border-b border-red-500/20 flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-red-400" />
              <h2 className="text-sm font-semibold text-red-400">Danger Zone</h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-cyber-muted mb-4">These actions are irreversible. Please proceed with caution.</p>
              <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/15">
                <div>
                  <p className="text-sm font-semibold text-white">Delete Account</p>
                  <p className="text-[11px] text-cyber-muted mt-0.5">Permanently delete your account and all data</p>
                </div>
                <button onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/20 transition-all">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center px-4">
          <div className="bg-[#0a1628] border border-red-500/30 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 mx-auto mb-4">
              <Trash2 className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white text-center font-heading mb-1">Delete Account</h3>
            <p className="text-sm text-cyber-muted text-center mb-5">This will permanently delete your account and all associated data. This action cannot be undone.</p>
            <div className="mb-4">
              <label className="block text-xs text-cyber-muted uppercase tracking-wider mb-1.5">Type <span className="text-red-400 font-mono">DELETE</span> to confirm</label>
              <input type="text" value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)}
                placeholder="DELETE" className="w-full px-4 py-2.5 rounded-xl bg-red-500/5 border border-red-500/20 text-white text-sm focus:outline-none focus:border-red-500/40 transition-all text-center tracking-wider" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setShowDeleteModal(false); setDeleteConfirm('') }}
                className="flex-1 py-2.5 rounded-xl border border-cyber-border text-cyber-muted hover:text-white text-sm transition-all">Cancel</button>
              <button disabled={deleteConfirm !== 'DELETE'}
                className="flex-1 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-semibold hover:bg-red-500/25 transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
