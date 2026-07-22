import type { Metadata } from 'next';
import AboutPageClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About — Abdul Rehman',
  description:
    'The story behind ARK. How Abdul Rehman became an AI-native web designer at the intersection of design, code, and creative technology.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
