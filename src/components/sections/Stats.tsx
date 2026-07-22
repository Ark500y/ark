'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '@/data';

function Counter({ value, suffix }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const isFloat = value.includes('.');

  useEffect(() => {
    if (!inView) return;
    const target = parseFloat(value);
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      setDisplay(isFloat ? current.toFixed(1) : Math.round(current).toString());
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value, isFloat]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#080b1a]" />

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-3xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group bg-[#080b1a] hover:bg-[#0d1120] transition-colors duration-300 p-10 lg:p-12"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06), transparent 70%)' }}
              />

              <div className="relative z-10">
                <div className="text-[clamp(2.5rem,5vw,4.5rem)] font-display font-bold tracking-[-0.04em] leading-none text-white mb-3">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-medium text-white/70 mb-1">{stat.label}</div>
                {stat.description && (
                  <div className="text-xs text-white/30">{stat.description}</div>
                )}
              </div>

              {/* Accent dot */}
              <div className="absolute top-8 right-8 w-1.5 h-1.5 rounded-full bg-blue-400/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
