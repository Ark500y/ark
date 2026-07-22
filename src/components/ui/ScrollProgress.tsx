'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[9997]"
      aria-hidden
      role="presentation"
    >
      <div
        className="h-full w-full"
        style={{ background: 'linear-gradient(90deg, #3b82f6, #7c3aed, #06b6d4)' }}
      />
    </motion.div>
  );
}
