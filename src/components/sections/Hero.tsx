'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { FiArrowRight, FiPlay } from 'react-icons/fi';

/* ── 3D Scene ──────────────────────────────────────────────── */
function FloatingSphere({
  position, color, speed, distort, scale,
}: {
  position: [number, number, number];
  color: string; speed: number; distort: number; scale: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.3;
    ref.current.rotation.x = t * 0.1;
    ref.current.rotation.z = t * 0.05;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <Sphere args={[1, 48, 48]}>
        <MeshDistortMaterial
          color={color} attach="material" distort={distort}
          speed={2} roughness={0.1} metalness={0.6} transparent opacity={0.85}
        />
      </Sphere>
    </mesh>
  );
}

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const count = 1000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    const c = Math.random();
    if (c < 0.33) { colors[i*3]=0.23; colors[i*3+1]=0.51; colors[i*3+2]=0.96; }
    else if (c < 0.66) { colors[i*3]=0.49; colors[i*3+1]=0.23; colors[i*3+2]=0.93; }
    else { colors[i*3]=0.02; colors[i*3+1]=0.71; colors[i*3+2]=0.83; }
  }
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function Scene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouseX * 0.5 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-mouseY * 0.3 - groupRef.current.rotation.x) * 0.05;
  });
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="#7c3aed" />
      <pointLight position={[0, 0, 8]} intensity={0.5} color="#06b6d4" />
      <group ref={groupRef}>
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
          <FloatingSphere position={[2.2, 0, 0]} color="#3b82f6" speed={0.8} distort={0.4} scale={1.4} />
        </Float>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <FloatingSphere position={[-2, 0.5, -1]} color="#7c3aed" speed={1.2} distort={0.6} scale={0.9} />
        </Float>
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
          <FloatingSphere position={[0, -1.5, 0.5]} color="#06b6d4" speed={0.6} distort={0.3} scale={0.6} />
        </Float>
      </group>
      <StarField />
      <Stars radius={50} depth={50} count={500} factor={2} saturation={0.8} fade speed={0.5} />
    </>
  );
}

/* ── Hero ──────────────────────────────────────────────────── */
const WORDS = ['Designer.', 'Developer.', 'Builder.'];

function AnimatedStat({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-xl sm:text-2xl font-display font-bold text-white">
        {value}<span className="text-blue-400">{suffix}</span>
      </div>
      <div className="text-xs text-white/40 mt-0.5">{label}</div>
    </div>
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [rawMouse, setRawMouse] = useState({ x: 0, y: 0 });
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const bgX = useTransform(springX, [-1, 1], ['-3%', '3%']);
  const bgY = useTransform(springY, [-1, 1], ['-3%', '3%']);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x); mouseY.set(y); setRawMouse({ x, y });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const t = setInterval(() => setWordIndex((p) => (p + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#050508]">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]}
            performance={{ min: 0.5 }} style={{ background: 'transparent' }}>
            <Scene mouseX={rawMouse.x} mouseY={rawMouse.y} />
          </Canvas>
        </Suspense>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/40 via-transparent to-[#050508]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-transparent to-[#050508]/70" />
        <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 opacity-40" aria-hidden>
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-600/8 blur-[100px]" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-wider">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Available for projects
            </span>
          </motion.div>

          {/* Name */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3rem,9vw,8rem)] font-display font-bold tracking-[-0.04em] leading-[0.92] text-white"
            >
              Abdul Rehman
            </motion.h1>
          </div>

          {/* Rotating descriptor */}
          <div className="mb-8 h-[clamp(2rem,5.5vw,5rem)] overflow-hidden flex items-center gap-3">
            <motion.span
              initial={{ y: '100%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(1.6rem,4.5vw,4rem)] font-display font-bold tracking-[-0.04em] text-white/20"
            >
              AI Web
            </motion.span>
            <div className="relative h-[clamp(2rem,5.5vw,5rem)] overflow-hidden">
              {WORDS.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ y: '100%' }}
                  animate={{ y: wordIndex === i ? '0%' : wordIndex > i ? '-100%' : '100%' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 flex items-center h-full text-[clamp(1.6rem,4.5vw,4rem)] font-display font-bold tracking-[-0.04em] text-gradient"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-white/40 max-w-xl leading-relaxed mb-12 font-light"
          >
            I design and build websites that look expensive, load fast, and convert visitors into clients.
            For startups, SaaS, and ambitious brands.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/work"
              data-cursor="View"
              className="group flex items-center gap-3 px-7 py-4 rounded-2xl font-semibold text-white text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-lg"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #7c3aed)' }}
            >
              See My Work
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <FiArrowRight size={12} />
              </span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 px-7 py-4 rounded-2xl font-medium text-white/70 text-base border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <FiPlay size={14} />
              Start a Project
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
      >
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-10 border-t border-white/5">
          <AnimatedStat value="47" suffix="+" label="Projects" />
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <AnimatedStat value="98" suffix="%" label="Retention" />
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <AnimatedStat value="3.2" suffix="×" label="Revenue Lift" />
          <div className="w-px h-8 bg-white/10 hidden sm:block" />
          <AnimatedStat value="4" suffix="yrs" label="Experience" />
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 right-8 z-10 hidden sm:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-white/20 tracking-[0.3em] uppercase rotate-90 origin-center mb-2">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
