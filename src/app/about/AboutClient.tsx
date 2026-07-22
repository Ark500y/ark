'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { timeline, skills } from '@/data';
import type { SkillCategory } from '@/types';

const skillCategories: { id: SkillCategory; label: string }[] = [
  { id: 'design', label: 'Design' },
  { id: 'frontend', label: 'Frontend' },
  { id: '3d', label: '3D & WebGL' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'tools', label: 'Tools' },
];

function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/60">{name}</span>
        <span className="text-xs font-mono text-white/25">{level}%</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, #3b82f6, #7c3aed)' }}
        />
      </div>
    </div>
  );
}

export default function AboutPageClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Hero */}
      <div ref={heroRef} className="pt-40 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-4"
            >
              The Story
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,6vw,5.5rem)] font-display font-bold tracking-[-0.04em] leading-none text-white mb-8"
            >
              Hi, I&apos;m
              <br />
              <span className="text-gradient">Abdul Rehman.</span>
            </motion.h1>
            <div className="space-y-4">
              {[
                "I'm an AI-native web designer and creative frontend engineer based in Pakistan, working with startups, SaaS companies, and ambitious brands across the globe.",
                "What makes me different: I design and build. No handoffs, no translation loss, no finger-pointing. From the first Figma frame to the last merge request — it's all me.",
                "In 4 years I've shipped 47+ projects, helped raise millions in funding, and turned struggling e-commerce stores into category leaders. The secret is obsessing over the gap between how something looks and how it performs.",
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="text-white/50 leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 flex gap-4"
            >
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
              >
                Work with me
              </Link>
              <Link
                href="/work"
                className="px-6 py-3 rounded-xl text-sm font-medium text-white/60 border border-white/10 hover:text-white hover:border-white/20 transition-all"
              >
                See my work
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isHeroInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Abdul Rehman"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/40 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
              className="absolute -bottom-4 -left-4 glass border border-white/8 rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <div>
                  <div className="text-xs font-semibold text-white">Available</div>
                  <div className="text-xs text-white/40">Taking new projects</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Timeline */}
      <TimelineSection />

      {/* Skills */}
      <SkillsSection />

      {/* Philosophy */}
      <PhilosophySection />
    </div>
  );
}

function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 bg-[#080b1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-4"
        >
          Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2rem,4vw,3.5rem)] font-display font-bold tracking-[-0.04em] text-white mb-16"
        >
          How I got here
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-white/5" />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Dot */}
                <div className="absolute left-2 sm:left-3.5 top-1.5 w-3 h-3 rounded-full border-2 border-blue-500 bg-[#080b1a]" />

                <div className="text-xs font-mono text-blue-400/60 tracking-[0.2em] uppercase mb-2">
                  {item.year}
                </div>
                <h3 className="text-xl font-display font-bold text-white tracking-[-0.02em] mb-3">
                  {item.title}
                </h3>
                <p className="text-white/50 leading-relaxed mb-4">{item.description}</p>
                {item.tags && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-full bg-white/5 border border-white/8 text-white/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 bg-[#050508] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-4"
        >
          Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2rem,4vw,3.5rem)] font-display font-bold tracking-[-0.04em] text-white mb-16"
        >
          The full stack
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillCategories.map((cat, ci) => {
            const catSkills = skills.filter((s) => s.category === cat.id);
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: ci * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="text-xs font-mono text-white/25 tracking-[0.2em] uppercase mb-6">
                  {cat.label}
                </h3>
                <div className="space-y-4">
                  {catSkills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      delay={ci * 0.1 + si * 0.05}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const principles = [
    {
      title: 'Design is strategy',
      body: "A beautiful site that doesn't convert is a liability. Every visual decision is filtered through one question: does this move the business forward?",
    },
    {
      title: 'Speed is a feature',
      body: 'A 100ms delay costs 1% in conversions. I treat performance as a first-class design concern, not an afterthought.',
    },
    {
      title: 'Code is craft',
      body: 'Clean, maintainable code is not optional. It compounds. The projects I built 3 years ago still run on Vercel without touching them.',
    },
    {
      title: 'AI amplifies, not replaces',
      body: "I use AI to ship faster and think deeper — never as a substitute for taste, judgment, or genuine craft.",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#080b1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-4"
        >
          Philosophy
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2rem,4vw,3.5rem)] font-display font-bold tracking-[-0.04em] text-white mb-16"
        >
          What I believe
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-300"
            >
              <div className="text-sm font-mono text-blue-400/50 mb-3">0{i + 1}</div>
              <h3 className="text-xl font-display font-semibold text-white mb-3 tracking-[-0.02em]">
                {p.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/30 mb-6">Ready to build something that actually works?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white hover:-translate-y-0.5 transition-all duration-300 hover:shadow-glow-lg"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
          >
            Let&apos;s talk
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
