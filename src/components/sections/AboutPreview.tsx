'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function AboutPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const highlights = [
    { label: 'Based in', value: 'Pakistan 🇵🇰' },
    { label: 'Working', value: 'Globally' },
    { label: 'Timezone', value: 'PKT (UTC+5)' },
    { label: 'Response', value: '< 24 hours' },
  ];

  return (
    <section ref={ref} className="relative section-padding overflow-hidden bg-[#080b1a]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Abdul Rehman — AI Web Designer"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b1a]/60 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-5 border border-white/8"
            >
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((h) => (
                  <div key={h.label}>
                    <div className="text-xs text-white/30 mb-0.5">{h.label}</div>
                    <div className="text-sm font-medium text-white">{h.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Glow */}
            <div className="absolute -inset-8 rounded-full bg-blue-600/5 blur-[60px] pointer-events-none" />
          </motion.div>

          {/* Text side */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-4"
            >
              About Me
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2rem,4vw,3.5rem)] font-display font-bold tracking-[-0.04em] text-white leading-tight mb-8"
            >
              Design at the
              <br />
              <span className="text-gradient">intersection of art</span>
              <br />
              and engineering
            </motion.h2>

            <div className="space-y-5">
              {[
                "I'm Abdul Rehman — an AI-native web designer and creative frontend engineer building out of Pakistan. For 4 years I've been obsessing over the gap between how things look and how they perform.",
                "Most designers don't code. Most developers don't design. I do both at a high level — which means your project never gets lost in translation between a Figma file and a GitHub repo.",
                "Every project starts with a single question: what would make this business meaningfully more successful? The answer drives every design decision, every animation, every line of code.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white/50 leading-relaxed text-base"
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                href="/about"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-medium text-white/60 hover:text-white hover:border-white/20 transition-all duration-300 group"
              >
                Read my story
                <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
              >
                Work with me
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
