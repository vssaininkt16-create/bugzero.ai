'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock, Shield, Building2, Users,
  CheckCircle, ArrowRight, Send, Globe, MessageSquare,
  Calendar, Linkedin, Twitter
} from 'lucide-react';
import TrustBadges from '@/components/TrustBadges';
import SectionWrapper from '@/components/SectionWrapper';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'contact@bugzero.solutions', link: 'mailto:contact@bugzero.solutions' },
  { icon: Phone, label: 'Phone', value: '+91-XXXXX-XXXXX', link: 'tel:+91XXXXXXXXXX' },
  { icon: MapPin, label: 'Location', value: 'India', link: null },
  { icon: Clock, label: 'Response Time', value: 'Within 2 Hours', link: null },
];

const serviceOptions = [
  'Web Application VAPT',
  'API Security Testing',
  'Network Security Assessment',
  'Cloud Security Audit',
  'Mobile App Security',
  'Bug Bounty Management',
  'Security Code Review',
  'Database Security',
  'Compliance Consulting',
  'Cybersecurity Training',
  'Other',
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'contact_page' }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="relative">
      {/* ─── HERO ─── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] radial-glow-blue" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-sm font-medium mb-6"
          >
            <MessageSquare className="w-4 h-4" />
            Get in Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white mb-6"
          >
            Contact <span className="gradient-text">BugZero</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 max-w-2xl mx-auto"
          >
            Ready to secure your organization? Our security experts respond within 2 hours.
          </motion.p>
        </div>
      </section>

      <TrustBadges />

      {/* ─── CONTACT FORM + INFO ─── */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left - Contact Info */}
            <motion.div {...fadeUp} className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-white font-heading mb-6">Let&apos;s Talk Security</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Whether you need a security assessment, have questions about our services,
                or want to discuss a partnership, we&apos;re here to help.
              </p>

              <div className="space-y-4 mb-8">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-cyber-blue" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">{info.label}</div>
                      {info.link ? (
                        <a href={info.link} className="text-sm text-gray-200 hover:text-cyber-blue transition-colors">
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-200">{info.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Government Inquiries */}
              <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="cyber-card rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-cyber-saffron" />
                  <h3 className="text-base font-semibold text-white font-heading">For Government Inquiries</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  For government department security audits, compliance requirements, and official partnerships.
                </p>
                <a href="mailto:government@bugzero.solutions" className="text-sm text-cyber-saffron hover:underline">
                  government@bugzero.solutions
                </a>
              </motion.div>

              {/* Book Consultation */}
              <motion.div {...fadeUp} transition={{ delay: 0.4 }} className="mt-6">
                <a
                  href="https://calendly.com/bugzero-solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full justify-center text-sm py-3"
                >
                  <Calendar className="w-4 h-4" />
                  Book Free 30-min Consultation
                </a>
              </motion.div>

              {/* Social */}
              <div className="flex items-center gap-3 mt-6">
                {[Linkedin, Twitter, Globe].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-cyber-card border border-cyber-border flex items-center justify-center text-gray-400 hover:text-cyber-blue hover:border-cyber-blue/30 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="lg:col-span-3">
              <div className="cyber-card rounded-xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white font-heading mb-6">Request a Security Assessment</h3>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <CheckCircle className="w-20 h-20 text-cyber-green mx-auto mb-6" />
                    <h4 className="text-2xl font-bold text-white mb-3">Thank You!</h4>
                    <p className="text-gray-400 mb-6">
                      Your request has been received. Our security experts will get back to you within 2 hours.
                    </p>
                    <Link href="/services" className="btn-secondary inline-flex">
                      Explore Our Services <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-cyber-bg border border-cyber-border text-white placeholder-gray-600 focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-colors text-sm"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-cyber-bg border border-cyber-border text-white placeholder-gray-600 focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-colors text-sm"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-cyber-bg border border-cyber-border text-white placeholder-gray-600 focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-colors text-sm"
                          placeholder="+91-XXXXX-XXXXX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1.5">Company Name</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-cyber-bg border border-cyber-border text-white placeholder-gray-600 focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-colors text-sm"
                          placeholder="Your Company"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Service Required</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-cyber-bg border border-cyber-border text-white focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-colors text-sm appearance-none"
                      >
                        <option value="">Select a service...</option>
                        {serviceOptions.map((s, i) => (
                          <option key={i} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Message *</label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-cyber-bg border border-cyber-border text-white placeholder-gray-600 focus:border-cyber-blue focus:ring-1 focus:ring-cyber-blue outline-none transition-colors text-sm resize-none"
                        placeholder="Tell us about your security requirements, website URL, and any specific concerns..."
                      />
                    </div>

                    {error && (
                      <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <>
                          Send Request
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting, you agree to our privacy policy. We respond within 2 hours.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ─── MAP SECTION ─── */}
      <SectionWrapper>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            {...fadeUp}
            className="relative rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 via-cyber-purple/20 to-cyber-green/20" />
            <div className="absolute inset-[1px] rounded-2xl bg-cyber-bg/80 backdrop-blur-xl" />
            <div className="relative z-10 p-8 sm:p-12">
              <Shield className="w-12 h-12 text-cyber-blue mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white font-heading mb-3">
                Serving Clients Across India
              </h2>
              <p className="text-gray-400 mb-6">
                With remote-first operations, we serve clients across 15+ states in India and growing.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata'].map((city, i) => (
                  <span key={i} className="trust-badge badge-blue">
                    <MapPin className="w-3 h-3" />
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
