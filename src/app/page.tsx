import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import WorkPreview from '@/components/sections/WorkPreview';
import Services from '@/components/sections/Services';
import Stats from '@/components/sections/Stats';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import AboutPreview from '@/components/sections/AboutPreview';

export const metadata: Metadata = {
  title: 'ARK — Abdul Rehman | AI Web Designer & Creative Frontend Engineer',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <WorkPreview />
      <Services />
      <AboutPreview />
      <Process />
      <Testimonials />
    </>
  );
}
