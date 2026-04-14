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
  },
  {
    icon: Bug,
    title: 'VAPT',
    desc: 'Vulnerability Assessment & Penetration Testing to uncover and remediate critical security gaps.',
  },
  {
    icon: Award,
    title: 'Bug Bounty',
    desc: 'Managed bug bounty programs connecting organizations with elite ethical hackers worldwide.',
  },
  {
    icon: Globe,
    title: 'Web App Security',
    desc: 'Comprehensive OWASP-aligned assessments securing web applications against modern attack vectors.',
  },
  {
    icon: Server,
    title: 'API Security',
    desc: 'Rigorous API testing and hardening to prevent unauthorized access, injection, and data leakage.',
  },
  {
    icon: Cloud,
    title: 'Cloud Security',
    desc: 'Multi-cloud security assessments for AWS, Azure, and GCP ensuring compliance and resilience.',
  },
  {
    icon: Eye,
    title: 'Security Audits',
    desc: 'In-depth compliance audits for ISO 27001, SOC 2, PCI DSS, HIPAA, and RBI guidelines.',
  },
  {
    icon: Lock,
    title: 'Secure Development',
    desc: 'Integrating security into the SDLC with code reviews, threat modeling, and DevSecOps practices.',
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
    <SectionWrapper id="skills" className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">
            Our Expertise
          </span>
          <h2 className="text-3xl lg:text-5xl font-semibold font-heading text-gray-900 mt-2">
            Core Skills &amp; Capabilities
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base leading-relaxed">
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
              className="group relative bg-white border border-gray-200 rounded-xl p-6 overflow-hidden hover:shadow-md hover:border-gray-300 transition"
            >
              {/* Colored top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                <skill.icon className="w-6 h-6 text-red-600" />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 font-heading mb-2 group-hover:text-red-600 transition-colors duration-300">
                {skill.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {skill.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
