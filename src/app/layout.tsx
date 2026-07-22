import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/layout/SmoothScroll';
import JsonLd from '@/components/layout/JsonLd';
import ClientProviders from './ClientProviders';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ark-design.vercel.app'),
  title: {
    default: 'ARK — Abdul Rehman | AI Web Designer & Creative Frontend Engineer',
    template: '%s | ARK — Abdul Rehman',
  },
  description:
    'Abdul Rehman is an AI-native web designer and creative frontend engineer building conversion-focused websites, SaaS products, and digital experiences for startups and ambitious brands worldwide.',
  keywords: [
    'AI web designer',
    'web designer Pakistan',
    'Next.js developer',
    'SaaS design',
    'creative frontend engineer',
    'Abdul Rehman',
    'ARK design',
    'AI automation',
    'Three.js developer',
    'Framer Motion',
    'portfolio',
    'UI UX designer',
    'startup web design',
  ],
  authors: [{ name: 'Abdul Rehman', url: 'https://ark-design.vercel.app' }],
  creator: 'Abdul Rehman',
  publisher: 'ARK',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ark-design.vercel.app',
    siteName: 'ARK — Abdul Rehman',
    title: 'ARK — Abdul Rehman | AI Web Designer',
    description: 'AI-powered web design that converts visitors into clients. Startups, SaaS, and luxury brands.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ARK — Abdul Rehman | AI Web Designer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARK — Abdul Rehman | AI Web Designer',
    description: 'AI-powered web design that converts visitors into clients. Startups, SaaS, and luxury brands.',
    images: ['/og-image.jpg'],
    creator: '@abdulrehman',
  },
  alternates: { canonical: 'https://ark-design.vercel.app' },
};

export const viewport: Viewport = {
  themeColor: '#050508',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        <JsonLd />
      </head>
      <body className="bg-[#050508] text-white antialiased overflow-x-hidden">
        <SmoothScroll>
          <ClientProviders>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </ClientProviders>
        </SmoothScroll>
      </body>
    </html>
  );
}
