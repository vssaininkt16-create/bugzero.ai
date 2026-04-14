'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, CheckCircle, Clock, ArrowRight, Loader2 } from 'lucide-react';

export default function BookingWidget({ buttonText = 'Book Free Consultation', buttonClass = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', date: '', time: '', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.data);
      } else {
        setError(data.error || 'Failed to book. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  const serviceOptions = [
    'Web Application VAPT', 'API Security Testing', 'Network Security', 'Cloud Security Audit',
    'Mobile App Security', 'Compliance Consulting', 'General Consultation', 'Other',
  ];

  // Get min date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <>
      <button
        onClick={() => { setIsOpen(true); setSuccess(null); setError(''); }}
        className={buttonClass || 'btn-secondary text-sm'}
      >
        <Calendar className="w-4 h-4" />
        {buttonText}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 font-heading">Book Free Consultation</h3>
                  <p className="text-xs text-gray-500">30-minute security consultation with our experts</p>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {success ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h4>
                    <p className="text-gray-500 mb-4">Your booking ID: <span className="text-red-600 font-mono">{success.bookingId}</span></p>
                    <p className="text-sm text-gray-400">Check your email for confirmation details.</p>
                    <button onClick={() => setIsOpen(false)} className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all mt-6 inline-flex items-center gap-2">
                      Done <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Name *</label>
                        <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Email *</label>
                        <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                          className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none" placeholder="email@company.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Phone</label>
                        <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                          className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none" placeholder="+91-XXXXX" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Company</label>
                        <input type="text" value={form.company} onChange={e => setForm({...form, company: e.target.value})}
                          className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none" placeholder="Company name" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Service Interested In</label>
                      <select value={form.service} onChange={e => setForm({...form, service: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none appearance-none">
                        <option value="">Select a service...</option>
                        {serviceOptions.map((s,i) => <option key={i} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Preferred Date *</label>
                        <input type="date" required min={minDate} value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                          className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Preferred Time *</label>
                        <select required value={form.time} onChange={e => setForm({...form, time: e.target.value})}
                          className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none appearance-none">
                          <option value="">Select time...</option>
                          {timeSlots.map((t,i) => <option key={i} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Brief Requirement</label>
                      <textarea rows={2} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                        className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 text-sm focus:border-red-600 outline-none resize-none" placeholder="Tell us briefly..." />
                    </div>
                    {error && <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-lg p-2">{error}</p>}
                    <button type="submit" disabled={loading} className="bg-red-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2">
                      {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Booking...</> : <>Book Consultation <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
