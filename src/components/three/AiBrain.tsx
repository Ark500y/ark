'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Torus } from '@react-three/drei';
import * as THREE from 'three';

function OrbitingRing({ radius, speed, color, rotAxis }: {
  radius: number; speed: number; color: string; rotAxis: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.x = rotAxis[0] * t;
    ref.current.rotation.y = rotAxis[1] * t;
    ref.current.rotation.z = rotAxis[2] * t;
  });
  return (
    <mesh ref={ref}>
      <Torus args={[radius, 0.012, 8, 80]}>
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </Torus>
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#3b82f6" />
      <pointLight position={[-5, -5, 3]} intensity={0.8} color="#7c3aed" />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.6}>
        <Sphere args={[0.9, 48, 48]}>
          <MeshDistortMaterial color="#3b82f6" distort={0.5} speed={2.5}
            roughness={0.05} metalness={0.7} transparent opacity={0.9} />
        </Sphere>
      </Float>
      <OrbitingRing radius={1.5} speed={0.3} color="#3b82f6" rotAxis={[1, 0, 0]} />
      <OrbitingRing radius={1.8} speed={0.2} color="#7c3aed" rotAxis={[0, 1, 0.3]} />
      <OrbitingRing radius={1.3} speed={0.5} color="#06b6d4" rotAxis={[0.5, 0.5, 0]} />
    </>
  );
}

export default function AiBrain({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={null}>
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]}
          performance={{ min: 0.5 }} style={{ background: 'transparent' }}>
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
