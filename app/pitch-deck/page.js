'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Shield, ShieldCheck, Target, TrendingUp,
  Users, Building2, BarChart3, Award, Globe, Calendar, ArrowRight,
  Zap, BookOpen, Server, Briefcase, IndianRupee, Rocket, Download,
  AlertTriangle, Lock, CheckCircle, Mail, Phone, Flag
} from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'BugZero Cyber Solutions',
    subtitle: 'Securing India\'s Digital Future',
    type: 'cover',
    content: {
      tagline: 'India\'s Most Trusted Cybersecurity Startup',
      badges: ['DPIIT Recognized', 'ISO 27001', 'NASSCOM Member'],
      desc: 'Comprehensive cybersecurity services for enterprises and government organizations.',
    },
  },
  {
    id: 2,
    title: 'The Problem',
    subtitle: 'India\'s Cybersecurity Crisis',
    type: 'problem',
    content: {
      stats: [
        { value: '₹1.25L Cr', label: 'Annual cybercrime losses in India' },
        { value: '74%', label: 'Companies face cyber attacks yearly' },
        { value: '3%', label: 'SMEs with proper security' },
        { value: '1M+', label: 'Cybersecurity professional shortage' },
      ],
      quote: 'India loses more to cybercrime than the GDP of several small nations combined.',
    },
  },
  {
    id: 3,
    title: 'Our Solution',
    subtitle: 'End-to-End Cybersecurity Platform',
    type: 'solution',
    content: {
      items: [
        { icon: ShieldCheck, title: 'VAPT & Security Testing', desc: 'Web, API, Network, Cloud, Mobile' },
        { icon: Zap, title: 'AI-Powered Scanning', desc: 'Automated vulnerability detection' },
        { icon: Server, title: 'SOC Monitoring', desc: '24/7 security operations center' },
        { icon: BookOpen, title: 'Training Programs', desc: 'Building India\'s cyber workforce' },
      ],
    },
  },
  {
    id: 4,
    title: 'Market Opportunity',
    subtitle: '₹35,000 Crore Cybersecurity Market',
    type: 'market',
    content: {
      tam: { value: '₹35,000 Cr', label: 'TAM - India Market by 2027' },
      sam: { value: '₹8,000 Cr', label: 'SAM - SME + Govt Segment' },
      som: { value: '₹500 Cr', label: 'SOM - 5-Year Target' },
    },
  },
  {
    id: 5,
    title: 'Products & Services',
    subtitle: '10 Specialized Security Offerings',
    type: 'services',
    content: {
      services: [
        'Web Application VAPT', 'API Security Testing', 'Network Security',
        'Cloud Security Audit', 'Mobile App Security', 'Bug Bounty Management',
        'Security Code Review', 'Database Security', 'Compliance Consulting',
        'Cybersecurity Training',
      ],
    },
  },
  {
    id: 6,
    title: 'Business Model',
    subtitle: 'Diversified Revenue Streams',
    type: 'business',
    content: {
      streams: [
        { label: 'Project Revenue (VAPT)', pct: 45, color: 'bg-red-600' },
        { label: 'SaaS Subscriptions', pct: 30, color: 'bg-red-50' },
        { label: 'Training & Certification', pct: 15, color: 'bg-green-50' },
        { label: 'Government Contracts', pct: 10, color: 'bg-orange-50' },
      ],
      pricing: 'Starting from ₹20,000 per assessment to enterprise annual contracts',
    },
  },
  {
    id: 7,
    title: 'Traction & Milestones',
    subtitle: 'Proven Results',
    type: 'traction',
    content: {
      metrics: [
        { value: '500+', label: 'Security Audits' },
        { value: '50+', label: 'Enterprise Clients' },
        { value: '15+', label: 'States Covered' },
        { value: '200%', label: 'YoY Growth' },
        { value: '95%', label: 'Retention Rate' },
        { value: '10,000+', label: 'Vulns Found' },
      ],
    },
  },
  {
    id: 8,
    title: 'Team & Credentials',
    subtitle: 'Certified Security Experts',
    type: 'team',
    content: {
      certs: ['CEH - Certified Ethical Hacker', 'OSCP - Offensive Security', 'CISSP - Security Professional', 'AWS Security Specialty'],
      teamSize: '10+ certified professionals',
      experience: '50+ combined years in cybersecurity',
    },
  },
  {
    id: 9,
    title: 'Financial Projections',
    subtitle: '3-Year Growth Roadmap',
    type: 'financial',
    content: {
      years: [
        { year: 'Year 1', revenue: '₹50L', clients: '75+', team: '15' },
        { year: 'Year 2', revenue: '₹2Cr', clients: '200+', team: '30' },
        { year: 'Year 3', revenue: '₹5Cr', clients: '500+', team: '50' },
      ],
    },
  },
  {
    id: 10,
    title: 'Fund Ask',
    subtitle: '₹1 Crore Seed Funding',
    type: 'funding',
    content: {
      allocation: [
        { label: 'Product Development', pct: 40, amount: '₹40L' },
        { label: 'Team Expansion', pct: 25, amount: '₹25L' },
        { label: 'Marketing & BD', pct: 20, amount: '₹20L' },
        { label: 'Infrastructure', pct: 15, amount: '₹15L' },
      ],
    },
  },
  {
    id: 11,
    title: 'Government Alignment',
    subtitle: 'Supporting India\'s Digital Mission',
    type: 'government',
    content: {
      policies: [
        'Aligned with National Cybersecurity Policy 2020',
        'Supporting PM\'s Digital India Vision',
        'Cyber Surakshit Bharat Partner',
        'DPIIT Recognized Startup',
        'Eligible for SISFS, MeitY Hub, NASSCOM grants',
      ],
    },
  },
  {
    id: 12,
    title: 'Let\'s Build a Safer India Together',
    subtitle: 'Contact & Next Steps',
    type: 'cta',
    content: {
      email: 'invest@bugzero.solutions',
      phone: '+91-XXXXX-XXXXX',
      website: 'bugzero.solutions',
      calendly: 'https://calendly.com/bugzero-solutions',
    },
  },
];

function SlideContent({ slide }) {
  switch (slide.type) {
    case 'cover':
      return (
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-red-50 to-gray-50 border border-red-200 flex items-center justify-center"
          >
            <Shield className="w-12 h-12 text-red-600" />
          </motion.div>
          <p className="text-xl text-gray-700 mb-8">{slide.content.tagline}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {slide.content.badges.map((b, i) => (
              <span key={i} className="trust-badge badge-blue">{b}</span>
            ))}
          </div>
          <p className="text-gray-700 mt-8 max-w-lg mx-auto">{slide.content.desc}</p>
        </div>
      );
    case 'problem':
      return (
        <div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {slide.content.stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-red-400 font-heading">{s.value}</div>
                <div className="text-xs text-gray-600 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 text-center">
            <AlertTriangle className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-gray-700 italic">&ldquo;{slide.content.quote}&rdquo;</p>
          </div>
        </div>
      );
    case 'solution':
      return (
        <div className="grid grid-cols-2 gap-4">
          {slide.content.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-4"
            >
              <item.icon className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
              <p className="text-xs text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      );
    case 'market':
      return (
        <div className="space-y-4">
          {[slide.content.tam, slide.content.sam, slide.content.som].map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 flex items-center gap-4"
            >
              <div className={`text-2xl font-bold font-heading ${
                i === 0 ? 'text-red-600' : i === 1 ? 'text-red-700' : 'text-green-600'
              }`}>
                {m.value}
              </div>
              <div className="text-sm text-gray-700">{m.label}</div>
            </motion.div>
          ))}
        </div>
      );
    case 'services':
      return (
        <div className="grid grid-cols-2 gap-2">
          {slide.content.services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 text-sm text-gray-700 py-1"
            >
              <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
              {s}
            </motion.div>
          ))}
        </div>
      );
    case 'business':
      return (
        <div>
          <div className="space-y-3 mb-6">
            {slide.content.streams.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{s.label}</span>
                  <span className="text-gray-900 font-bold">{s.pct}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white border border-gray-200 shadow-sm border border-gray-200 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    className={`h-full rounded-full ${s.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-gray-700 text-center">{slide.content.pricing}</p>
        </div>
      );
    case 'traction':
      return (
        <div className="grid grid-cols-3 gap-3">
          {slide.content.metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-3 text-center"
            >
              <div className="text-xl font-bold text-red-600 font-heading">{m.value}</div>
              <div className="text-[10px] text-gray-600 mt-1">{m.label}</div>
            </motion.div>
          ))}
        </div>
      );
    case 'team':
      return (
        <div>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {slide.content.certs.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <Award className="w-4 h-4 text-red-600 shrink-0" />
                {c}
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 text-center">
              <Users className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">{slide.content.teamSize}</div>
            </div>
            <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="text-sm font-bold text-gray-900">{slide.content.experience}</div>
            </div>
          </div>
        </div>
      );
    case 'financial':
      return (
        <div className="space-y-3">
          {slide.content.years.map((y, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white border border-gray-200 shadow-sm rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-red-600">{y.year}</span>
                <span className="text-lg font-bold text-gray-900 font-heading">{y.revenue}</span>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-gray-600">
                <span>{y.clients} clients</span>
                <span>{y.team} team members</span>
              </div>
            </motion.div>
          ))}
        </div>
      );
    case 'funding':
      return (
        <div>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-red-600 font-heading">₹1 Crore</div>
            <div className="text-sm text-gray-600">Seed Funding Ask</div>
          </div>
          <div className="space-y-3">
            {slide.content.allocation.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-center justify-between text-sm bg-white border border-gray-200 shadow-sm rounded-lg p-3"
              >
                <span className="text-gray-700">{a.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-900 font-bold">{a.amount}</span>
                  <span className="text-xs text-gray-500">({a.pct}%)</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );
    case 'government':
      return (
        <div className="space-y-3">
          {slide.content.policies.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 bg-white border border-gray-200 shadow-sm rounded-xl p-4"
            >
              <Flag className="w-5 h-5 text-red-600 shrink-0" />
              <span className="text-sm text-gray-700">{p}</span>
            </motion.div>
          ))}
        </div>
      );
    case 'cta':
      return (
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-red-600" /> {slide.content.email}
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <Phone className="w-4 h-4 text-red-600" /> {slide.content.phone}
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700">
              <Globe className="w-4 h-4 text-red-600" /> {slide.content.website}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <a
              href={slide.content.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center"
            >
              <Calendar className="w-4 h-4" /> Schedule Meeting
            </a>
            <Link href="/contact" className="btn-secondary justify-center">
              <Mail className="w-4 h-4" /> Contact Us
            </Link>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goTo = (index) => {
    if (index >= 0 && index < slides.length) setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 " />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px]  " />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-red-600" />
            <span className="font-bold font-heading text-gray-900">Bug<span className="text-red-600">Zero</span></span>
            <span className="text-xs text-gray-500 ml-2">Pitch Deck</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://calendly.com/bugzero-solutions"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs px-4 py-2"
            >
              <Calendar className="w-3.5 h-3.5" /> Request Meeting
            </a>
          </div>
        </div>

        {/* Slide */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden" style={{ minHeight: '500px' }}>
          {/* Slide header bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-gray-100">
            <span className="text-xs text-gray-500">Slide {currentSlide + 1} of {slides.length}</span>
            {/* Progress bar */}
            <div className="flex-1 mx-4 h-1 bg-white border border-gray-200 shadow-sm rounded-full overflow-hidden">
              <div
                className="h-full bg-red-600 rounded-full transition-all duration-500"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500">{slide.type}</span>
          </div>

          {/* Slide content */}
          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold font-heading text-gray-900 mb-2">{slide.title}</h2>
                  <p className="text-lg text-gray-700">{slide.subtitle}</p>
                </div>
                <div className="max-w-xl mx-auto">
                  <SlideContent slide={slide} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => goTo(currentSlide - 1)}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowedcursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>

          {/* Slide indicators */}
          <div className="hidden sm:flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentSlide ? 'bg-red-600 w-6' : 'bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(currentSlide + 1)}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowedcursor-not-allowed transition-all"
          >
            Next <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide thumbnails */}
        <div className="mt-6 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`p-2 rounded-lg text-center transition-all ${
                i === currentSlide
                  ? 'bg-red-50 border border-red-200'
                  : 'bg-white border border-gray-200 shadow-sm border border-gray-200 hover:border-red-200'
              }`}
            >
              <span className={`text-[10px] font-medium ${i === currentSlide ? 'text-red-600' : 'text-gray-500'}`}>
                {i + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
