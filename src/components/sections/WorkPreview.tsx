'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { projects } from '@/data';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';

const featured = projects.filter((p) => p.featured);

export default function WorkPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section ref={ref} className="relative section-padding overflow-hidden bg-[#050508]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-4"
            >
              Selected Work
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold tracking-[-0.04em] text-white leading-tight"
            >
              Projects that
              <br />
              <span className="text-gradient">moved the needle</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              href="/work"
              className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-colors group"
            >
              All projects
              <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Featured projects */}
        <div className="space-y-6">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="group"
            >
              <Link href={`/work/${project.slug}`}>
                <div
                  className={`relative rounded-3xl overflow-hidden border transition-all duration-500 ${
                    hovered === project.id
                      ? 'border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.6)]'
                      : 'border-white/5'
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/7] overflow-hidden">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        hovered === project.id ? 'scale-[1.04]' : 'scale-100'
                      }`}
                      sizes="(max-width: 768px) 100vw, 90vw"
                    />
                    {/* Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        hovered === project.id ? 'opacity-40' : 'opacity-70'
                      }`}
                      style={{
                        background:
                          'linear-gradient(to right, rgba(5,5,8,0.9) 0%, rgba(5,5,8,0.3) 60%, transparent 100%)',
                      }}
                    />
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex items-end p-8 sm:p-12">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between w-full gap-6">
                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 text-xs font-mono rounded-full bg-white/10 text-white/60 border border-white/10 backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-[-0.03em] mb-1">
                          {project.title}
                        </h3>
                        <p className="text-white/50 text-sm">{project.subtitle}</p>
                      </div>

                      {/* Results */}
                      <div className="flex flex-wrap gap-4 sm:gap-6 shrink-0">
                        {project.metrics?.slice(0, 2).map((m) => (
                          <div key={m.label} className="text-right">
                            <div className="text-xl font-display font-bold text-white">
                              {m.value}
                              {m.change && (
                                <span className="text-green-400 text-sm ml-1">{m.change}</span>
                              )}
                            </div>
                            <div className="text-xs text-white/40">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* View case study button */}
                  <motion.div
                    animate={{
                      opacity: hovered === project.id ? 1 : 0,
                      scale: hovered === project.id ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white text-sm font-medium"
                  >
                    <FiExternalLink size={14} />
                    Case Study
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* All work link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/work"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.02] text-white/60 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-sm font-medium group"
          >
            View all {projects.length} projects
            <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
