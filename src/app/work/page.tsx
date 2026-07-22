import type { Metadata } from 'next';
import WorkClient from './WorkClient';

export const metadata: Metadata = {
  title: 'Work — Selected Projects',
  description:
    'A curated selection of web design, SaaS products, AI platforms, and digital experiences built by Abdul Rehman. Real outcomes, real metrics.',
};

export default function WorkPage() {
  return <WorkClient />;
}
