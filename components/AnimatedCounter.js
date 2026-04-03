'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedCounter({ target, suffix = '', prefix = '', label, icon: Icon, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (target === 0) {
      setCount(0);
      return;
    }

    let start = 0;
    const end = target;
    const increment = Math.max(1, Math.floor(end / 60));
    const stepTime = Math.max(16, (duration * 1000) / (end / increment));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center group"
    >
      {Icon && (
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-cyber-blue/10 border border-cyber-blue/20 flex items-center justify-center group-hover:bg-cyber-blue/20 transition-colors">
          <Icon className="w-6 h-6 text-cyber-blue" />
        </div>
      )}
      <div className="text-3xl sm:text-4xl font-bold font-heading text-white mb-1">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-cyber-muted">{label}</div>
    </motion.div>
  );
}
