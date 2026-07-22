'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const interval = 16;
    const steps = duration / interval;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      // Ease the progress curve
      const t = current / steps;
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setProgress(Math.min(Math.round(eased * 100), 100));

      if (current >= steps) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          setIsDone(true);
          setTimeout(onComplete, 900);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const letters = ['A', 'R', 'K'];

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.9, ease: [0.87, 0, 0.13, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050508] overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[80px]" />
          </div>

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />

          {/* Logo letters */}
          <div className="relative z-10 flex gap-3 mb-12">
            {letters.map((letter, i) => (
              <motion.div
                key={letter}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative"
              >
                <span
                  className="text-[5rem] sm:text-[7rem] font-display font-bold tracking-[-0.04em] text-transparent"
                  style={{
                    WebkitTextStroke: '1px rgba(59,130,246,0.4)',
                  }}
                >
                  {letter}
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.6 }}
                  className="absolute inset-0 text-[5rem] sm:text-[7rem] font-display font-bold tracking-[-0.04em] text-transparent"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    clipPath: `inset(${100 - progress}% 0 0 0)`,
                    transition: 'clip-path 0.08s linear',
                  }}
                >
                  {letter}
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-48 sm:w-64 h-[1px] bg-white/10 rounded-full overflow-hidden"
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3b82f6, #7c3aed)',
                transition: 'width 0.05s linear',
              }}
            />
          </motion.div>

          {/* Progress number */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="relative z-10 mt-4 font-mono text-xs text-white/30 tracking-[0.2em]"
          >
            {String(progress).padStart(3, '0')}
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute bottom-10 text-xs font-mono text-white/20 tracking-[0.3em] uppercase"
          >
            Abdul Rehman — AI Web Designer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
