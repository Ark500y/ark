'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function GlowCard({
  children,
  className,
  glowColor = 'rgba(59,130,246,0.15)',
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    glow.style.background = `radial-gradient(300px circle at ${x}px ${y}px, ${glowColor}, transparent 60%)`;
  }, [glowColor]);

  const handleMouseLeave = useCallback(() => {
    const glow = glowRef.current;
    if (!glow) return;
    glow.style.background = 'transparent';
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cn('relative overflow-hidden group', className)}
    >
      {/* Reactive glow overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-all duration-300 z-10"
        style={{ background: 'transparent' }}
      />
      {children}
    </motion.div>
  );
}
