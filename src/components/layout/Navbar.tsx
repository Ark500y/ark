'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { navItems } from '@/data';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 80], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 30);
      setIsHidden(currentY > lastScrollY.current && currentY > 100);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      <motion.header
        style={{ opacity: navOpacity }}
        animate={{ y: isHidden && !menuOpen ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 py-4 transition-all duration-300 ${
          isScrolled ? 'pt-3 pb-3' : 'pt-5 pb-5'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500 ${
            isScrolled
              ? 'glass border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="relative z-10 group" aria-label="ARK Home">
            <motion.div
              className="font-display font-bold text-2xl tracking-[-0.04em]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-gradient">ARK</span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" role="navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 group ${
                  isActive(item.href)
                    ? 'text-white'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {isActive(item.href) && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-white/5 border border-white/8"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white relative overflow-hidden group"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
            >
              <span className="relative z-10">Start a Project</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}
              />
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="w-5 h-[1.5px] bg-white rounded-full origin-center transition-all"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="w-5 h-[1.5px] bg-white rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="w-5 h-[1.5px] bg-white rounded-full origin-center transition-all"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 glass-strong flex flex-col"
          >
            {/* Glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />
              <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px]" />
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 pt-24 pb-16 relative z-10">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block text-5xl font-display font-bold tracking-[-0.03em] py-2 transition-all duration-300 hover:text-gradient ${
                        isActive(item.href) ? 'text-gradient' : 'text-white/60'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-12"
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-base font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
                >
                  Start a Project →
                </Link>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-12 pt-8 border-t border-white/5"
              >
                <p className="text-xs font-mono text-white/30 tracking-[0.2em] uppercase mb-3">
                  Get in touch
                </p>
                <a
                  href="mailto:ark303777@gmail.com"
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  ark303777@gmail.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
