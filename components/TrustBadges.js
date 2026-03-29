'use client';

import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle, Flag, Globe } from 'lucide-react';

const badges = [
  { label: 'DPIIT Recognized Startup', icon: Award, variant: 'badge-saffron' },
  { label: 'ISO 27001 Compliant', icon: CheckCircle, variant: 'badge-green' },
  { label: 'Made in India', icon: Flag, variant: 'badge-saffron' },
  { label: 'Aligned with Digital India', icon: Globe, variant: 'badge-blue' },
  { label: 'Cyber Surakshit Bharat Partner', icon: Shield, variant: 'badge-purple' },
  { label: 'NASSCOM Member', icon: Award, variant: 'badge-blue' },
  { label: 'OWASP Member', icon: Shield, variant: 'badge-green' },
];

export default function TrustBadges({ compact = false }) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        {badges.slice(0, 5).map((badge, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`trust-badge ${badge.variant}`}
          >
            <badge.icon className="w-3 h-3" />
            {badge.label}
          </motion.span>
        ))}
      </div>
    );
  }

  return (
    <section className="py-8 border-y border-cyber-border bg-cyber-bg/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {badges.map((badge, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`trust-badge ${badge.variant}`}
            >
              <badge.icon className="w-3.5 h-3.5" />
              {badge.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
