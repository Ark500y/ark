export default function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://ark-design.vercel.app/#person',
        name: 'Abdul Rehman',
        url: 'https://ark-design.vercel.app',
        jobTitle: 'AI Web Designer & Creative Frontend Engineer',
        email: 'ark303777@gmail.com',
        telephone: '+923141495630',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'PK',
          addressRegion: 'Punjab',
        },
        sameAs: [
          'https://github.com/abdulrehman',
          'https://linkedin.com/in/abdulrehman',
          'https://behance.net/abdulrehman',
          'https://dribbble.com/abdulrehman',
        ],
        knowsAbout: [
          'Web Design',
          'AI Web Development',
          'React',
          'Next.js',
          'Three.js',
          'Framer Motion',
          'GSAP',
          'SaaS Design',
          'UI/UX Design',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://ark-design.vercel.app/#website',
        url: 'https://ark-design.vercel.app',
        name: 'ARK — Abdul Rehman',
        description: 'AI-powered web design that converts visitors into clients.',
        publisher: { '@id': 'https://ark-design.vercel.app/#person' },
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://ark-design.vercel.app/#service',
        name: 'ARK Design Studio',
        url: 'https://ark-design.vercel.app',
        description:
          'AI-native web design and creative frontend engineering for startups, SaaS, and ambitious brands.',
        provider: { '@id': 'https://ark-design.vercel.app/#person' },
        areaServed: 'Worldwide',
        serviceType: ['Web Design', 'UI/UX Design', 'Frontend Development', 'AI Automation', 'Brand Identity'],
        priceRange: '$$',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
