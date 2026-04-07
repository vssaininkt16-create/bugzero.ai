'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Shield, ShieldCheck, Lock, Eye, Bug, Server, Cloud, Globe,
  ChevronRight, ArrowRight, Award, CheckCircle, Users, Target,
  Zap, TrendingUp, Building2, Heart, Star, Quote, Flag
} from 'lucide-react';
import MatrixRain from '@/components/MatrixRain';
import SecurityScanPopup from '@/components/SecurityScanPopup';
import TrustBadges from '@/components/TrustBadges';
import AnimatedCounter from '@/components/AnimatedCounter';
import SectionWrapper from '@/components/SectionWrapper';
import TrustedLogoStrip from '@/components/TrustedLogoStrip';
import SkillsSection from '@/components/SkillsSection';

function TypingEffect({ texts, speed = 80, pause = 2000 }) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout;

    if (!isDeleting && charIndex < currentText.length) {
      timeout = setTimeout(() => setCharIndex(charIndex + 1), speed);
    } else if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(charIndex - 1), speed / 2);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }

    setDisplayText(currentText.substring(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

  return (
    <span>
      {displayText}
      <span className="typing-cursor" />
    </span>
  );
}

function FloatingShield() {
  return (
    <motion.div
      animate={{ y: [-10, 10, -10], rotateY: [0, 10, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
    >
      <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 relative">
        <div className="absolute inset-0 rounded-full bg-cyber-blue/10 animate-pulse" />
        <div className="absolute inset-2 rounded-full bg-cyber-blue/5 border border-cyber-blue/20" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyber-blue/20 to-cyber-purple/20 border border-cyber-blue/30 flex items-center justify-center">
          <ShieldCheck className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-cyber-blue drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
        </div>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyber-blue"
            animate={{ rotate: 360 }}
            transition={{ duration: 4 + i * 2, repeat: Infinity, ease: 'linear' }}
            style={{ top: '50%', left: '50%', transformOrigin: `${40 + i * 15}px 0px` }}
          />
        ))}
      </div>
    </motion.div>
  );
}

const stats = [
  { target: 500, suffix: '+', label: 'Security Audits Completed', icon: ShieldCheck },
  { target: 50, suffix: '+', label: 'Enterprise Clients Protected', icon: Building2 },
  { target: 100, suffix: 'Cr+', prefix: '₹', label: 'Assets Secured', icon: Lock },
  { target: 0, suffix: '', label: 'Data Breaches in Protected Systems', icon: Shield },
  { target: 24, suffix: '/7', label: 'SOC Coverage', icon: Eye },
  { target: 95, suffix: '%', label: 'Client Retention Rate', icon: Heart },
];

const whyChoose = [
  {
    icon: Zap,
    title: "India's Fastest Growing Cybersecurity Startup",
    desc: 'Recognized by DPIIT and backed by cutting-edge security research, we are scaling at 200% YoY.',
    color: 'text-cyber-blue',
    bg: 'bg-cyber-blue/10',
    border: 'border-cyber-blue/20',
  },
  {
    icon: Users,
    title: 'Certified Ethical Hackers',
    desc: 'Our team holds CEH, OSCP, CISSP, and AWS Security Specialty certifications.',
    color: 'text-cyber-purple',
    bg: 'bg-cyber-purple/10',
    border: 'border-cyber-purple/20',
  },
  {
    icon: Building2,
    title: 'Serving Critical Sectors',
    desc: 'Protecting government, BFSI, healthcare, fintech, and enterprise organizations.',
    color: 'text-cyber-green',
    bg: 'bg-cyber-green/10',
    border: 'border-cyber-green/20',
  },
  {
    icon: Flag,
    title: 'Made in India - For Digital India',
    desc: "Supporting the PM's Digital India Mission with indigenous cybersecurity capabilities.",
    color: 'text-cyber-saffron',
    bg: 'bg-cyber-saffron/10',
    border: 'border-cyber-saffron/20',
  },
];

const govAlignment = [
  { title: 'National Cybersecurity Policy 2020', desc: "Fully aligned with India's national cybersecurity framework and guidelines.", icon: Shield },
  { title: "PM's Digital India Vision", desc: 'Supporting the vision of a digitally empowered and secure India.', icon: Globe },
  { title: 'Cyber Surakshit Bharat Initiative', desc: "Active partner in MeitY's initiative to build a robust cybersecurity ecosystem.", icon: ShieldCheck },
  { title: 'DPIIT Recognized Startup', desc: 'Officially recognized under the Startup India initiative by the Government of India.', icon: Award },
];

const testimonials = [
  { name: 'Rajesh Kumar', role: 'CTO, FinSecure Banking', text: "BugZero's VAPT assessment uncovered critical vulnerabilities that our previous vendor completely missed. Their team's expertise in banking security is unmatched.", rating: 5 },
  { name: 'Dr. Priya Sharma', role: 'CISO, MedTech Healthcare', text: "The thoroughness and professionalism of BugZero's security audit gave us complete confidence in our patient data protection. Truly government-grade security.", rating: 5 },
  { name: 'Amit Patel', role: 'CEO, CloudFirst Technologies', text: 'From cloud security assessment to ongoing SOC monitoring, BugZero has been our trusted security partner. Their 24/7 response team is exceptional.', rating: 5 },
  { name: 'Sneha Reddy', role: 'VP Engineering, PaySafe Fintech', text: 'BugZero helped us achieve PCI DSS compliance in record time. Their expertise in fintech security is exactly what the Indian startup ecosystem needs.', rating: 5 },
];

const clientSectors = [
  'Banking & Finance', 'Healthcare', 'Government', 'Fintech',
  'E-Commerce', 'Insurance', 'Telecom', 'Education',
];

export default function HomePageClient() {
  return (
    <div className="relative overflow-hidden">
      <SecurityScanPopup />
      <MatrixRain />

      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] radial-glow-blue" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] radial-glow-purple" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-blue/10 border border-cyber-blue/20 text-cyber-blue text-sm font-medium mb-6"
              >
                <Shield className="w-4 h-4" />
                DPIIT Recognized Startup | ISO 27001
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-white leading-tight mb-6">
                <TypingEffect
                  texts={["Securing India's Digital Future", 'Zero Vulnerabilities, Zero Compromises', 'Your Cyber Defense Partner']}
                  speed={70}
                  pause={2500}
                />
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                <span className="text-white font-semibold">BugZero Cyber Solutions</span> — India&apos;s Most Trusted
                Cybersecurity Startup. Elite VAPT, penetration testing, and compliance services for enterprises and government.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/contact" className="btn-primary text-base px-8 py-4 justify-center">
                  Request Free Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/services" className="btn-secondary text-base px-8 py-4 justify-center">
                  Explore Services <ChevronRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {['DPIIT', 'ISO 27001', 'OWASP', 'NASSCOM', 'MeitY Partner'].map((badge, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-400 font-medium"
                  >
                    {badge}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden lg:flex justify-center items-center"
            >
              <FloatingShield />
            </motion.div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* ─── STATS ─── */}
      <SectionWrapper className="radial-glow-purple">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyber-blue text-sm font-semibold tracking-wider uppercase">Our Impact</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-2">Numbers That Speak for Themselves</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, i) => (
              <AnimatedCounter key={i} target={stat.target} suffix={stat.suffix} prefix={stat.prefix || ''} label={stat.label} icon={stat.icon} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── WHY CHOOSE US ─── */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyber-green text-sm font-semibold tracking-wider uppercase">Why BugZero</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-2">Why Organizations Trust Us</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              We combine cutting-edge technology with certified expertise to deliver unmatched cybersecurity protection.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="cyber-card rounded-xl p-6">
                <div className={`w-12 h-12 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white font-heading mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── SKILLS ─── */}
      <SkillsSection />

      {/* ─── GOVERNMENT ALIGNMENT ─── */}
      <SectionWrapper className="bg-gradient-to-b from-transparent via-cyber-purple/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyber-saffron text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2">
              <Flag className="w-4 h-4" /> Government Alignment
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-2">
              Aligned with India&apos;s Cybersecurity Vision
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {govAlignment.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="cyber-card rounded-xl p-6 flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-cyber-saffron/10 border border-cyber-saffron/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-cyber-saffron" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white font-heading mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── CLIENT SECTORS ─── */}
      <SectionWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyber-blue text-sm font-semibold tracking-wider uppercase">Industries We Serve</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-2">Trusted Across Critical Sectors</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {clientSectors.map((sector, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="cyber-card rounded-xl p-5 text-center group">
                <Building2 className="w-8 h-8 text-cyber-blue/60 mx-auto mb-3 group-hover:text-cyber-blue transition-colors" />
                <span className="text-sm font-medium text-gray-300">{sector}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ─── TESTIMONIALS ─── */}
      <SectionWrapper className="bg-gradient-to-b from-transparent via-cyber-blue/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-cyber-blue text-sm font-semibold tracking-wider uppercase">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-2">What Our Clients Say</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="cyber-card rounded-xl p-6">
                <Quote className="w-8 h-8 text-cyber-blue/30 mb-4" />
                <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <TrustedLogoStrip />

      {/* ─── CTA ─── */}
      <SectionWrapper>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 via-cyber-purple/20 to-cyber-green/20" />
            <div className="absolute inset-0 grid-bg" />
            <div className="absolute inset-[1px] rounded-2xl bg-cyber-bg/80 backdrop-blur-xl" />
            <div className="relative z-10 p-8 sm:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
                Ready to Secure Your Organization?
              </h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Get a free security assessment and discover how BugZero can protect your digital assets.
                Our experts respond within 2 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-primary text-base px-8 py-4 justify-center">
                  Request Free Assessment <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/services" className="btn-secondary text-base px-8 py-4 justify-center">
                  Explore Services <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
}
