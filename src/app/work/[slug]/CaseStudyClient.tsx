'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { Project } from '@/types';
import { projects } from '@/data';
import { FiArrowLeft, FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';

export default function CaseStudyClient({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const nextProject = projects.find((p) => p.id !== project.id && p.featured) || projects[0];

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Hero */}
      <div ref={heroRef} className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 scale-110">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/60 via-[#050508]/30 to-[#050508]" />

        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        >
          {/* Back */}
          <Link
            href="/work"
            className="absolute top-32 left-4 sm:left-8 flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
          >
            <FiArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            All Work
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-white/10 backdrop-blur-sm text-white/70 border border-white/10">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-[clamp(3rem,8vw,7rem)] font-display font-bold tracking-[-0.04em] leading-none text-white mb-3">
              {project.title}
            </h1>
            <p className="text-xl text-white/50">{project.subtitle}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Meta bar */}
      <div className="border-y border-white/5 bg-[#080b1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-8">
            {[
              { label: 'Year', value: project.year },
              { label: 'Duration', value: project.duration },
              { label: 'Category', value: project.category.toUpperCase() },
              ...(project.liveUrl ? [{ label: 'Live Site', value: 'View Project', href: project.liveUrl }] : []),
            ].map(({ label, value, href }) => (
              <div key={label}>
                <div className="text-xs font-mono text-white/25 tracking-[0.2em] uppercase mb-1">{label}</div>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    {value} <FiExternalLink size={11} />
                  </a>
                ) : (
                  <div className="text-sm font-medium text-white">{value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          {/* Content */}
          <div className="lg:col-span-2 space-y-20">
            {/* Overview */}
            <Section title="Overview">
              <p className="text-white/60 text-lg leading-relaxed">{project.description}</p>
            </Section>

            {/* Challenge */}
            <Section title="The Challenge">
              <p className="text-white/60 text-lg leading-relaxed">{project.challenge}</p>
            </Section>

            {/* Solution */}
            <Section title="The Solution">
              <p className="text-white/60 text-lg leading-relaxed">{project.solution}</p>
            </Section>

            {/* Images */}
            {project.images.length > 1 && (
              <Section title="Process & Design">
                <div className="space-y-4">
                  {project.images.slice(1).map((img, i) => (
                    <div key={i} className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                      <Image
                        src={img}
                        alt={`${project.title} — screenshot ${i + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* Results */}
            <Section title="Results">
              <ul className="space-y-4">
                {project.results.map((result, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-4 p-5 rounded-xl bg-green-500/5 border border-green-500/15"
                  >
                    <span className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    </span>
                    <span className="text-white/70 leading-relaxed">{result}</span>
                  </motion.li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Metrics */}
            {project.metrics && (
              <SideCard title="Key Metrics">
                <div className="space-y-5">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="flex items-end justify-between">
                      <div>
                        <div className="text-xs text-white/30 mb-1">{m.label}</div>
                        <div className="text-2xl font-display font-bold text-white">
                          {m.value}
                          {m.change && (
                            <span className="text-green-400 text-sm ml-1.5">{m.change}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SideCard>
            )}

            {/* Technologies */}
            <SideCard title="Technologies">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/8 text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </SideCard>

            {/* Links */}
            {(project.liveUrl || project.githubUrl) && (
              <SideCard title="Links">
                <div className="space-y-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-sm text-white/60 hover:text-white hover:border-white/15 transition-all"
                    >
                      <FiExternalLink size={14} /> Live Project
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-sm text-white/60 hover:text-white hover:border-white/15 transition-all"
                    >
                      <FiGithub size={14} /> Source Code
                    </a>
                  )}
                </div>
              </SideCard>
            )}

            {/* CTA */}
            <div className="p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5">
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                Want results like this for your project?
              </p>
              <Link
                href="/contact"
                className="block w-full text-center px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Next project */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-xs font-mono text-white/25 tracking-[0.2em] uppercase mb-6">Next Project</p>
          <Link href={`/work/${nextProject.slug}`} className="group block">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl sm:text-5xl font-display font-bold text-white/50 group-hover:text-white tracking-[-0.03em] transition-colors duration-300">
                  {nextProject.title}
                </h2>
                <p className="text-white/30 mt-2">{nextProject.subtitle}</p>
              </div>
              <div className="w-14 h-14 rounded-full border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-all group-hover:bg-white/5">
                <FiArrowRight size={20} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <h2 className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-6">{title}</h2>
      {children}
    </motion.div>
  );
}

function SideCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl border border-white/8 bg-white/[0.02]">
      <h3 className="text-xs font-mono text-white/25 tracking-[0.2em] uppercase mb-5">{title}</h3>
      {children}
    </div>
  );
}
