'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from '@/components/cursor/CustomCursor';
import Loader from '@/components/layout/Loader';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Grain from '@/components/ui/Grain';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return (
    <>
      <CustomCursor />
      <Grain opacity={0.03} />
      <ScrollProgress />
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      <div
        style={{
          visibility: loading ? 'hidden' : 'visible',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        {children}
      </div>
    </>
  );
}
