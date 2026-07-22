'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { projects } from '@/data';
import type { ProjectCategory } from '@/types';
import { FiArrowRight } from 'react-icons/fi';

const categories: { label: string; value: ProjectCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'AI & SaaS', value: 'ai' },
  { label: 'E-Commerce', value: 'ecommerce' },
  { label: 'Branding', value: 'branding' },
  { label: 'Landing Pages', value: 'landing' },
  { label: 'SaaS', value: 'saas' },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      layout
      className="group"
    >
      <Link href={`/work/${project.slug}`} className="block">
        <div className="relative rounded-2xl overflow-hidden border border-white/5 group-hover:border-white/15 transition-all duration-500 bg-white/[0.02] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-[#050508]/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-white/40 border border-white/5">
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-display font-bold text-white tracking-[-0.02em] mb-1 group-hover:text-gradient transition-all">
              {project.title}
            </h3>
            <p className="text-sm text-white/40 mb-4 line-clamp-2">{project.description}</p>

            {/* Metrics */}
            {project.metrics && (
              <div className="flex gap-4 pt-4 border-t border-white/5">
                {project.metrics.slice(0, 2).map((m) => (
                  <div key={m.label}>
                    <div className="text-base font-display font-bold text-white">
                      {m.value}
                      {m.change && <span className="text-green-400 text-xs ml-1">{m.change}</span>}
                    </div>
                    <div className="text-xs text-white/30">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Hover arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center"
          >
            <FiArrowRight size={14} className="text-white" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function WorkClient() {
  const [active, setActive] = useState<ProjectCategory>('all');
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  const filtered = active === 'all'
    ? projects
    : projects.filter((p) => p.category === active || (active === 'ai' && p.category === 'saas'));

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Hero header */}
      <div ref={headerRef} className="pt-40 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-4"
        >
          Selected Work
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(3rem,8vw,7rem)] font-display font-bold tracking-[-0.04em] leading-none text-white mb-6"
        >
          Every project
          <br />
          <span className="text-gradient">tells a story.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-white/40 max-w-xl"
        >
          {projects.length} projects. Real challenges. Measurable outcomes. Here&apos;s what we built together.
        </motion.p>
      </div>

      {/* Filter tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                active === cat.value
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/70 border border-white/8 bg-white/[0.02] hover:border-white/14'
              }`}
            >
              {active === cat.value && (
                <motion.div
                  layoutId="filter-active"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/30">No projects in this category yet.</div>
        )}
      </div>
    </div>
  );
}
