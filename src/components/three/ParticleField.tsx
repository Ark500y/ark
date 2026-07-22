'use client';

import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const c = Math.random();
      if (c < 0.4) {
        col[i * 3] = 0.23; col[i * 3 + 1] = 0.51; col[i * 3 + 2] = 0.96;
      } else if (c < 0.7) {
        col[i * 3] = 0.49; col[i * 3 + 1] = 0.23; col[i * 3 + 2] = 0.93;
      } else {
        col[i * 3] = 0.02; col[i * 3 + 1] = 0.71; col[i * 3 + 2] = 0.83;
      }
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.025;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

interface ParticleFieldProps {
  className?: string;
  count?: number;
}

export default function ParticleField({ className = '', count = 800 }: ParticleFieldProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
          style={{ background: 'transparent' }}
        >
          <Particles count={count} />
        </Canvas>
      </Suspense>
    </div>
  );
}
