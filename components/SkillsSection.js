'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck, Bug, Award, Globe, Server, Cloud, Eye, Lock,
} from 'lucide-react';
import SectionWrapper from '@/components/SectionWrapper';

const skills = [
  {
    icon: ShieldCheck,
    title: 'Cybersecurity',
    desc: 'End-to-end protection strategies covering threat detection, incident response, and risk management.',
    color: 'text-cyber-blue',
    bg: 'bg-cyber-blue/10',
    border: 'border-cyber-blue/20',
    accentFrom: '#00d4ff',
    glow: 'rgba(0,212,255,0.18)',
  },
  {
    icon: Bug,
    title: 'VAPT',
    desc: 'Vulnerability Assessment & Penetration Testing to uncover and remediate critical security gaps.',
    color: 'text-cyber-green',
    bg: 'bg-cyber-green/10',
    border: 'border-cyber-green/20',
    accentFrom: '#10b981',
    glow: 'rgba(16,185,129,0.18)',
  },
  {
    icon: Award,
    title: 'Bug Bounty',
    desc: 'Managed bug bounty programs connecting organizations with elite ethical hackers worldwide.',
    color: 'text-cyber-saffron',
    bg: 'bg-cyber-saffron/10',
    border: 'border-cyber-saffron/20',
    accentFrom: '#ff6b00',
    glow: 'rgba(255,107,0,0.18)',
  },
  {
    icon: Globe,
    title: 'Web App Security',
    desc: 'Comprehensive OWASP-aligned assessments securing web applications against modern attack vectors.',
    color: 'text-cyber-purple',
    bg: 'bg-cyber-purple/10',
    border: 'border-cyber-purple/20',
    accentFrom: '#7c3aed',
    glow: 'rgba(124,58,237,0.18)',
  },
  {
    icon: Server,
    title: 'API Security',
    desc: 'Rigorous API testing and hardening to prevent unauthorized access, injection, and data leakage.',
    color: 'text-cyber-blue',
    bg: 'bg-cyber-blue/10',
    border: 'border-cyber-blue/20',
    accentFrom: '#00d4ff',
    glow: 'rgba(0,212,255,0.18)',
  },
  {
    icon: Cloud,
    title: 'Cloud Security',
    desc: 'Multi-cloud security assessments for AWS, Azure, and GCP ensuring compliance and resilience.',
    color: 'text-cyber-purple',
    bg: 'bg-cyber-purple/10',
    border: 'border-cyber-purple/20',
    accentFrom: '#7c3aed',
    glow: 'rgba(124,58,237,0.18)',
  },
  {
    icon: Eye,
    title: 'Security Audits',
    desc: 'In-depth compliance audits for ISO 27001, SOC 2, PCI DSS, HIPAA, and RBI guidelines.',
    color: 'text-cyber-green',
    bg: 'bg-cyber-green/10',
    border: 'border-cyber-green/20',
    accentFrom: '#10b981',
    glow: 'rgba(16,185,129,0.18)',
  },
  {
    icon: Lock,
    title: 'Secure Development',
    desc: 'Integrating security into the SDLC with code reviews, threat modeling, and DevSecOps practices.',
    color: 'text-cyber-saffron',
    bg: 'bg-cyber-saffron/10',
    border: 'border-cyber-saffron/20',
    accentFrom: '#ff6b00',
    glow: 'rgba(255,107,0,0.18)',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function SkillsSection() {
  return (
    <SectionWrapper id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-cyber-blue text-sm font-semibold tracking-wider uppercase">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mt-2">
            Core Skills &amp; Capabilities
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
            From vulnerability discovery to compliance consulting, our certified team delivers
            precision-grade security across every layer of your digital infrastructure.
          </p>
        </motion.div>

        {/* ── Skills Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="group relative cyber-card rounded-xl p-6 overflow-hidden"
            >
              {/* Colored top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, ${skill.accentFrom}, transparent)`,
                }}
              />

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${skill.bg} border ${skill.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <skill.icon className={`w-6 h-6 ${skill.color}`} />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-white font-heading mb-2 group-hover:text-cyber-blue transition-colors duration-300">
                {skill.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {skill.desc}
              </p>

              {/* Bottom radial glow on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 100%, ${skill.glow} 0%, transparent 75%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
