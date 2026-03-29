'use client';

import { motion } from 'framer-motion';

export default function SectionWrapper({ children, className = '', id = '' }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`py-16 sm:py-20 lg:py-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}
