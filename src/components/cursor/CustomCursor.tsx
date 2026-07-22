'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringSpringConfig = { damping: 20, stiffness: 150, mass: 0.8 };

  const dotX = useSpring(mouseX, springConfig);
  const dotY = useSpring(mouseY, springConfig);
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!visible) setVisible(true);
  }, [mouseX, mouseY, visible]);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);
  const handleMouseLeave = useCallback(() => setVisible(false), []);
  const handleMouseEnter = useCallback(() => setVisible(true), []);

  useEffect(() => {
    // Check for hover targets
    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.matches('a, button, [data-cursor], input, textarea, select, label, [role="button"]') ||
        target.closest('a, button, [data-cursor], [role="button"]');

      if (isInteractive) {
        setIsHovering(true);
        const cursorEl = (isInteractive as HTMLElement)?.dataset?.cursor;
        if (cursorEl) setCursorText(cursorEl);
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', handleHoverStart, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleHoverStart);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  // Hide on touch devices
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch('ontouchstart' in window);
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={cursorRef}
        style={{
          left: dotX,
          top: dotY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: isClicking ? 6 : isHovering ? 10 : 8,
          height: isClicking ? 6 : isHovering ? 10 : 8,
          backgroundColor: isHovering ? '#a855f7' : '#3b82f6',
        }}
        transition={{ duration: 0.15 }}
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
      />

      {/* Ring */}
      <motion.div
        ref={ringRef}
        style={{
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: isClicking ? 24 : isHovering ? 60 : 36,
          height: isClicking ? 24 : isHovering ? 60 : 36,
          borderColor: isHovering ? 'rgba(168, 85, 247, 0.7)' : 'rgba(59, 130, 246, 0.6)',
          backgroundColor: isHovering
            ? 'rgba(168, 85, 247, 0.08)'
            : 'transparent',
        }}
        transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
        className="fixed pointer-events-none z-[9998] rounded-full border"
      >
        {/* Cursor text */}
        {cursorText && isHovering && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center text-[9px] font-medium text-white font-display tracking-widest uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
