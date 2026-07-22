'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { services } from '@/data';
import { cn } from '@/lib/utils';

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      ref={ref}
      id="services"
      className="relative section-padding overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#080b1a] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-100 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-4"
          >
            What I Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold tracking-[-0.04em] leading-tight text-white mb-6"
          >
            Services that
            <br />
            <span className="text-gradient">drive results</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/40 text-lg leading-relaxed"
          >
            Not decorative websites. Strategic digital assets engineered to grow your business.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                'relative group p-8 rounded-3xl border transition-all duration-500 cursor-default overflow-hidden',
                hoveredId === service.id
                  ? 'border-blue-500/30 bg-[#0d1529]'
                  : 'border-white/5 bg-white/[0.02]',
                service.popular && 'ring-1 ring-blue-500/20'
              )}
            >
              {/* Popular badge */}
              {service.popular && (
                <div className="absolute top-6 right-6">
                  <span className="badge">Most Popular</span>
                </div>
              )}

              {/* Hover glow */}
              <motion.div
                animate={{ opacity: hoveredId === service.id ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 20%, rgba(59,130,246,0.08), transparent 70%)',
                }}
              />

              {/* Icon */}
              <div className="text-3xl mb-6 text-gradient font-display">{service.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-display font-semibold text-white mb-3 tracking-[-0.02em]">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-white/40 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2.5">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400/60 flex-shrink-0" />
                    <span className="text-sm text-white/50 leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Bottom CTA line */}
              <motion.div
                animate={{
                  opacity: hoveredId === service.id ? 1 : 0,
                  y: hoveredId === service.id ? 0 : 8,
                }}
                transition={{ duration: 0.3 }}
                className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between"
              >
                <span className="text-xs text-white/30">Enquire about this</span>
                <a
                  href="/contact"
                  className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Get started →
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 text-center"
        >
          <p className="text-white/30 text-sm mb-4">
            Every project is scoped individually. No templates. No cookie-cutter deliverables.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white underline-animate transition-colors"
          >
            Discuss your project →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
