import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact — Start a Project',
  description:
    "Ready to build something remarkable? Let's talk about your project, timeline, and goals. Abdul Rehman responds within 24 hours.",
};

export default function ContactPage() {
  return <ContactClient />;
}
