'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import {
  User, Mail, Phone, MapPin, Globe, Briefcase, FileText, Camera, Loader2,
  CheckCircle, AlertTriangle, Shield, Save, X
} from 'lucide-react'

function InfoCard({ children, title, icon: Icon }) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2">
        <Icon className="w-4 h-4 text-red-600" />
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function InputField({ label, name, type = 'text', value, onChange, icon: Icon, placeholder, required }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />}
        <input
          name={name} type={type} value={value} onChange={onChange} placeholder={placeholder}
          required={required}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-cyber-muted/50 text-sm focus:outline-none focus:border-red-200 focus:bg-gray-50 transition-all duration-200`}
        />
      </div>
    </div>
  )
}

export default function ProfileClient({ user }) {
  const [form, setForm] = useState({
    full_name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    website: user?.website || '',
    company: user?.company || '',
    bio: user?.bio || '',
  })
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [avatar, setAvatar] = useState(user?.avatar || null)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const fileRef = useRef(null)

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { setError('Image must be under 2MB'); return }
    setAvatarUploading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      const ext = file.name.split('.').pop()
      const path = `avatars/${authUser.id}.${ext}`
      const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from('avatars').getPublicUrl(path)
      const url = data.publicUrl + `?t=${Date.now()}`
      await supabase.from('profiles').update({ avatar_url: url }).eq('id', authUser.id)
      setAvatar(url)
      setSuccess('Avatar updated!')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err.message || 'Failed to upload avatar')
    } finally {
      setAvatarUploading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(null)
    try {
      const supabase = createClient()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: form.full_name,
          phone: form.phone,
          location: form.location,
          website: form.website,
          company: form.company,
          bio: form.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', authUser.id)
      if (profileError) throw profileError
      setSuccess('Profile updated successfully!')
      setTimeout(() => setSuccess(null), 4000)
    } catch (err) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const initials = (form.full_name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold font-heading text-gray-900">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal information and public profile</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Avatar section */}
        <InfoCard title="Profile Picture" icon={Camera}>
          <div className="flex items-center gap-6">
            <div className="relative shrink-0">
              {avatar ? (
                <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-2xl border-2 border-red-200 object-cover shadow-[0_0_30px_rgba(0,212,255,0.15)]" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-red-50 to-gray-50 border-2 border-red-200 flex items-center justify-center shadow-[0_0_30px_rgba(0,212,255,0.15)]">
                  <span className="text-2xl font-bold text-red-600 font-heading">{initials}</span>
                </div>
              )}
              {avatarUploading && (
                <div className="absolute inset-0 rounded-2xl bg-black/60 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-red-600 animate-spin" />
                </div>
              )}
            </div>
            <div>
              <button type="button" onClick={() => fileRef.current?.click()}
                disabled={avatarUploading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                <Camera className="w-4 h-4" />
                {avatarUploading ? 'Uploading...' : 'Upload Photo'}
              </button>
              <p className="text-xs text-gray-500 mt-2">JPG, PNG or WebP. Max 2MB.</p>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
            </div>
          </div>
        </InfoCard>

        {/* Personal info */}
        <InfoCard title="Personal Information" icon={User}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label="Full Name" name="full_name" value={form.full_name} onChange={handleChange} icon={User} placeholder="Your full name" required />
            <InputField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} icon={Mail} placeholder="email@example.com" />
            <InputField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} icon={Phone} placeholder="+91 98765 43210" />
            <InputField label="Location" name="location" value={form.location} onChange={handleChange} icon={MapPin} placeholder="City, Country" />
            <InputField label="Website" name="website" type="url" value={form.website} onChange={handleChange} icon={Globe} placeholder="https://yourwebsite.com" />
            <InputField label="Company / Organization" name="company" value={form.company} onChange={handleChange} icon={Briefcase} placeholder="Company name" />
          </div>
          <div className="mt-4">
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5">Bio</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              <textarea
                name="bio" value={form.bio} onChange={handleChange} rows={3} placeholder="Tell us a bit about yourself..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-cyber-muted/50 text-sm focus:outline-none focus:border-red-200 transition-all duration-200 resize-none"
              />
            </div>
          </div>
        </InfoCard>

        {/* Account meta */}
        <InfoCard title="Account Info" icon={Shield}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Role</p>
              <span className={`trust-badge ${user?.role === 'admin' ? 'badge-purple' : 'badge-blue'} capitalize`}>{user?.role || 'user'}</span>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Auth Provider</p>
              <span className="trust-badge badge-blue capitalize">{user?.provider || 'email'}</span>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Member Since</p>
              <p className="text-sm text-gray-900 font-medium">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : 'N/A'}
              </p>
            </div>
          </div>
        </InfoCard>

        {/* Alerts */}
        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />{error}
            <button type="button" onClick={() => setError(null)} className="ml-auto"><X className="w-4 h-4" /></button>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-600 text-sm">
            <CheckCircle className="w-4 h-4 shrink-0" />{success}
          </div>
        )}

        <div className="flex justify-end">
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : <><Save className="w-4 h-4" />Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  )
}
