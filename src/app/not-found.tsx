'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050508] flex flex-col items-center justify-center px-4 text-center">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <div className="text-[clamp(6rem,20vw,16rem)] font-display font-bold tracking-[-0.06em] leading-none text-gradient mb-6">
          404
        </div>
        <h1 className="text-2xl font-display font-bold text-white mb-4">Page not found</h1>
        <p className="text-white/40 mb-10 max-w-sm">
          Looks like this page wandered off into the void. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="px-7 py-3.5 rounded-2xl text-sm font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
          >
            Go Home
          </Link>
          <Link
            href="/work"
            className="px-7 py-3.5 rounded-2xl text-sm font-medium text-white/60 border border-white/10 hover:text-white hover:border-white/20 transition-all"
          >
            See My Work
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
