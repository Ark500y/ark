'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi';
import { SiBehance, SiDribbble } from 'react-icons/si';
import { navItems, contactInfo } from '@/data';

const socialLinks = [
  { icon: FiGithub, href: 'https://github.com/abdulrehman', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/abdulrehman', label: 'LinkedIn' },
  { icon: FiInstagram, href: 'https://instagram.com/abdulrehman', label: 'Instagram' },
  { icon: SiBehance, href: 'https://behance.net/abdulrehman', label: 'Behance' },
  { icon: SiDribbble, href: 'https://dribbble.com/abdulrehman', label: 'Dribbble' },
  { icon: FiTwitter, href: 'https://x.com/abdulrehman', label: 'X (Twitter)' },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="relative border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#080b1a] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/3 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Big CTA Section */}
        <div className="py-20 lg:py-28 border-b border-white/5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-xs font-mono text-blue-400/60 tracking-[0.3em] uppercase mb-4">
              Available for projects
            </p>
            <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-display font-bold tracking-[-0.04em] leading-none mb-8">
              <span className="text-white">Let&apos;s build</span>
              <br />
              <span className="text-gradient">something great.</span>
            </h2>
            <p className="text-white/40 text-lg mb-10 max-w-md mx-auto">
              Have a project in mind? I&apos;d love to hear about it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all duration-300 hover:shadow-glow-lg hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
              >
                Start a Project
              </Link>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-medium text-white/60 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
              >
                <FiMail size={16} />
                {contactInfo.email}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Main Footer Grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="font-display font-bold text-3xl tracking-[-0.04em] text-gradient mb-4">
              ARK
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              AI-powered web design that converts visitors into clients. Based in Pakistan, working globally.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xs font-mono text-white/30 tracking-[0.2em] uppercase mb-5">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xs font-mono text-white/30 tracking-[0.2em] uppercase mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {['AI Web Design', 'SaaS Product Design', 'AI Automation', 'Brand Identity', 'Creative Frontend', 'Growth Strategy'].map(
                (service) => (
                  <li key={service}>
                    <Link
                      href="/#services"
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      {service}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xs font-mono text-white/30 tracking-[0.2em] uppercase mb-5">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                >
                  WhatsApp: {contactInfo.phone}
                </a>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-2 text-xs font-mono text-green-400/70">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  Available for projects
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20 font-mono">
            © {new Date().getFullYear()} ARK — Abdul Rehman. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Designed & built with obsession in Pakistan 🇵🇰
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-white/30 hover:text-white transition-colors duration-200 group"
            aria-label="Scroll to top"
          >
            Back to top
            <span className="w-6 h-6 flex items-center justify-center rounded-full border border-white/10 group-hover:border-white/30 transition-all">
              <FiArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
