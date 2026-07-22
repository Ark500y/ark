'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { testimonials } from '@/data';
import { FiStar } from 'react-icons/fi';

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-80 sm:w-96 p-7 rounded-3xl border border-white/8 bg-white/[0.02] hover:border-white/14 hover:bg-white/[0.04] transition-all duration-400 cursor-default mx-3">
      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <FiStar key={i} size={13} className="text-blue-400 fill-blue-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-white/70 text-sm leading-relaxed mb-6">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-5 border-t border-white/5">
        <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
            sizes="36px"
          />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white truncate">{testimonial.name}</div>
          <div className="text-xs text-white/35 truncate">
            {testimonial.role}, {testimonial.company}
          </div>
        </div>
        {testimonial.projectType && (
          <span className="ml-auto text-xs font-mono text-blue-400/50 shrink-0">
            {testimonial.projectType}
          </span>
        )}
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex"
        animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
        style={{ willChange: 'transform' }}
      >
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3);

  return (
    <section ref={ref} className="relative section-padding overflow-hidden bg-[#080b1a]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #080b1a, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #080b1a, transparent)' }} />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-4"
          >
            Client Stories
          </motion.p>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold tracking-[-0.04em] text-white leading-tight"
            >
              Results that
              <br />
              <span className="text-gradient">speak for themselves</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2 shrink-0"
            >
              <div className="flex">
                {testimonials.slice(0, 4).map((t, i) => (
                  <div
                    key={t.id}
                    className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-[#080b1a]"
                    style={{ marginLeft: i > 0 ? '-8px' : 0, zIndex: i }}
                  >
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="32px" />
                  </div>
                ))}
              </div>
              <div className="ml-2">
                <div className="text-sm font-semibold text-white">{testimonials.length}+ reviews</div>
                <div className="text-xs text-white/35">5.0 average rating</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Marquee rows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse />
        </motion.div>
      </div>
    </section>
  );
}
