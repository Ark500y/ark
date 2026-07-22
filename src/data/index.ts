import type {
  Project,
  Testimonial,
  Service,
  Skill,
  Stat,
  TimelineItem,
  ProcessStep,
  NavItem,
  SocialLink,
  ClientLogo,
} from '@/types';

// ─── Navigation ──────────────────────────────────────────────────────────────
export const navItems: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/contact' },
];

// ─── Social Links ─────────────────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/abdulrehman', icon: 'github' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/abdulrehman', icon: 'linkedin' },
  { platform: 'Instagram', url: 'https://instagram.com/abdulrehman', icon: 'instagram' },
  { platform: 'Behance', url: 'https://behance.net/abdulrehman', icon: 'behance' },
  { platform: 'Dribbble', url: 'https://dribbble.com/abdulrehman', icon: 'dribbble' },
  { platform: 'X', url: 'https://x.com/abdulrehman', icon: 'x' },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects: Project[] = [
  {
    id: '1',
    slug: 'nexus-ai-platform',
    title: 'Nexus AI',
    subtitle: 'Enterprise AI Command Center',
    category: 'ai',
    tags: ['AI', 'SaaS', 'Dashboard', 'React'],
    description:
      'A unified AI orchestration platform allowing enterprises to deploy, monitor, and optimize multiple AI models from a single command center. Built for scale with real-time analytics.',
    challenge:
      'Enterprise teams were juggling 6–8 disparate AI tools with no unified visibility. Decision-makers had no way to compare ROI across models or departments.',
    solution:
      'Designed an intelligent dashboard that aggregates all AI interactions, surfaces cost-per-insight metrics, and visualizes model performance through animated data layers.',
    results: [
      '47% reduction in AI operational overhead',
      '3× faster model deployment cycles',
      '89% user adoption rate within first month',
      '$2.1M in cost savings identified in Q1',
    ],
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    ],
    technologies: ['Next.js', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind', 'OpenAI API'],
    liveUrl: '#',
    year: '2024',
    duration: '8 weeks',
    metrics: [
      { label: 'Performance Score', value: '98', change: '+23' },
      { label: 'Load Time', value: '0.8s', change: '-1.4s' },
      { label: 'Conversion', value: '12.4%', change: '+6.2%' },
    ],
    featured: true,
  },
  {
    id: '2',
    slug: 'lumina-ecommerce',
    title: 'Lumina',
    subtitle: 'Luxury E-Commerce Experience',
    category: 'ecommerce',
    tags: ['E-Commerce', 'Luxury', 'Animation', 'Next.js'],
    description:
      'A high-end fashion e-commerce platform built for a Dubai-based luxury label. Features cinematic product reveals, AR try-on integration, and a curated editorial aesthetic.',
    challenge:
      'The brand\'s premium positioning was undermined by a generic Shopify template that loaded slowly and felt mass-market. Cart abandonment stood at 74%.',
    solution:
      'Rebuilt from scratch with full 3D product viewers, editorial scroll storytelling, and a frictionless one-click checkout that mirrors the in-store luxury experience.',
    results: [
      '68% reduction in cart abandonment',
      '4.2× increase in average order value',
      '2.1s average load time on 3G',
      '220% increase in mobile conversions',
    ],
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',
    ],
    technologies: ['Next.js', 'Shopify', 'Three.js', 'GSAP', 'Framer Motion', 'Stripe'],
    liveUrl: '#',
    year: '2024',
    duration: '10 weeks',
    metrics: [
      { label: 'Lighthouse Score', value: '97' },
      { label: 'Revenue Lift', value: '+340%' },
      { label: 'Bounce Rate', value: '-58%' },
    ],
    featured: true,
  },
  {
    id: '3',
    slug: 'orbit-saas',
    title: 'Orbit',
    subtitle: 'SaaS Analytics Platform',
    category: 'saas',
    tags: ['SaaS', 'Analytics', 'B2B', 'Dashboard'],
    description:
      'A real-time analytics platform for D2C brands. Pulls from 20+ data sources and surfaces actionable growth levers through intelligent pattern recognition and natural language querying.',
    challenge:
      'Marketing teams spent 40% of their week manually pulling reports from multiple platforms. Insights arrived too late to influence live campaigns.',
    solution:
      'Built a unified data hub with AI-powered anomaly detection, automated weekly digests, and a conversational interface that lets non-technical users query complex data in plain English.',
    results: [
      '40% reclaimed analytics time weekly',
      '3.8× faster insight-to-action cycle',
      '11% average ROAS improvement from AI suggestions',
      'NPS of 71 after 90 days',
    ],
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    ],
    technologies: ['React', 'TypeScript', 'D3.js', 'PostgreSQL', 'FastAPI', 'OpenAI'],
    liveUrl: '#',
    year: '2024',
    duration: '12 weeks',
    metrics: [
      { label: 'Data Sources', value: '20+' },
      { label: 'Query Speed', value: '<200ms' },
      { label: 'User Satisfaction', value: '4.9★' },
    ],
    featured: true,
  },
  {
    id: '4',
    slug: 'helix-branding',
    title: 'Helix',
    subtitle: 'Biotech Brand Identity & Web',
    category: 'branding',
    tags: ['Branding', 'Landing Page', 'Biotech', 'Motion'],
    description:
      'Complete brand identity and interactive marketing site for a Series A biotech startup. The design language bridges scientific precision with human warmth.',
    challenge:
      'Helix needed to attract both institutional investors and patient advocacy groups — two audiences with very different visual expectations and trust signals.',
    solution:
      'Created a dual-narrative design system: data-rich for the science community, empathetic and accessible for patient communities. A single site that speaks two languages simultaneously.',
    results: [
      '$40M Series A closed 3 weeks after launch',
      '68K organic site visits in month one',
      'Featured in TechCrunch design section',
      '92% investor deck request rate',
    ],
    coverImage: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=1200&q=80',
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80',
    ],
    technologies: ['Next.js', 'Framer Motion', 'GSAP', 'Three.js', 'Figma'],
    year: '2023',
    duration: '6 weeks',
    metrics: [
      { label: 'Series A Raised', value: '$40M' },
      { label: 'Month 1 Traffic', value: '68K' },
      { label: 'Press Features', value: '14' },
    ],
    featured: false,
  },
  {
    id: '5',
    slug: 'verse-restaurant',
    title: 'Verse',
    subtitle: 'Fine Dining Digital Experience',
    category: 'landing',
    tags: ['Restaurant', 'Luxury', 'Booking', 'Motion'],
    description:
      'A digital-first presence for a Michelin-starred restaurant in Lahore. The site recreates the deliberate pace and sensory detail of the dining experience itself.',
    challenge:
      'The physical experience was extraordinary, but digital presence was non-existent. Reservations were managed through Instagram DMs.',
    solution:
      'Built a sensory web experience with ambient sound design, slow-cinema cinematography, and an integrated reservation system that creates the same anticipation as a great meal.',
    results: [
      'Fully booked 8 weeks in advance since launch',
      '89% reservation completion rate',
      '4.1× increase in private event inquiries',
      'TripAdvisor #1 ranking in Lahore',
    ],
    coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80',
    ],
    technologies: ['Next.js', 'GSAP', 'Framer Motion', 'Sanity CMS', 'Stripe'],
    liveUrl: '#',
    year: '2024',
    duration: '5 weeks',
    metrics: [
      { label: 'Reservations', value: '8wk wait' },
      { label: 'Event Revenue', value: '+410%' },
      { label: 'Bounce Rate', value: '18%' },
    ],
    featured: false,
  },
  {
    id: '6',
    slug: 'pulse-health',
    title: 'Pulse Health',
    subtitle: 'Telehealth Platform Redesign',
    category: 'saas',
    tags: ['Healthcare', 'SaaS', 'Redesign', 'UX'],
    description:
      'End-to-end redesign of a telehealth platform serving 50,000+ patients. Reduced cognitive load while maintaining medical-grade compliance requirements.',
    challenge:
      'Elderly patients had a 62% task failure rate in the existing interface. WCAG compliance was absent, and doctors reported losing 22 minutes per shift to UI friction.',
    solution:
      'Designed a plain-language interface with progressive disclosure, AI-assisted form completion, and a new appointment flow that reduced steps from 12 to 4.',
    results: [
      'Task failure rate dropped from 62% to 8%',
      '22-minute physician time savings per shift',
      'WCAG 2.1 AAA compliant',
      '4.8★ patient satisfaction score',
    ],
    coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    ],
    technologies: ['React', 'TypeScript', 'Figma', 'Storybook', 'Jest', 'Playwright'],
    year: '2023',
    duration: '14 weeks',
    metrics: [
      { label: 'Task Success', value: '92%', change: '+54%' },
      { label: 'CSAT', value: '4.8★' },
      { label: 'Error Rate', value: '-87%' },
    ],
    featured: false,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'Nexus AI',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    content:
      "Abdul delivered something that genuinely shocked our board. Not just beautiful — strategically engineered to convert. We closed our Series B two weeks after launch using the site as the primary investor asset.",
    rating: 5,
    projectType: 'AI Platform',
  },
  {
    id: '2',
    name: 'James Okafor',
    role: 'Founder',
    company: 'Lumina Fashion',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    content:
      'Hiring Abdul was the single best investment we made this year. Cart abandonment dropped by 68% in 30 days. The animations tell our brand story better than any ad campaign ever did.',
    rating: 5,
    projectType: 'E-Commerce',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'CPO',
    company: 'Orbit Analytics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    content:
      'We have worked with agencies that charged 10× as much and delivered a fraction of this quality. Abdul understands that design is a growth lever, not a decoration.',
    rating: 5,
    projectType: 'SaaS Platform',
  },
  {
    id: '4',
    name: 'Tom Eriksen',
    role: 'CTO',
    company: 'Helix Bio',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    content:
      'The site helped us close our $40M round. Investors commented on it unprompted in every meeting. That is not something you can put a number on — but we did: it moved the deal.',
    rating: 5,
    projectType: 'Biotech Branding',
  },
  {
    id: '5',
    name: 'Layla Al-Hassan',
    role: 'GM',
    company: 'Verse Restaurant',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&q=80',
    content:
      "We haven't had an empty table since the site launched. The online experience now matches what we've built in the dining room. Guests mention the website in reviews.",
    rating: 5,
    projectType: 'Restaurant Digital',
  },
  {
    id: '6',
    name: 'Marcus Webb',
    role: 'Head of Design',
    company: 'Pulse Health',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    content:
      'Abdul rewired how 50,000 patients interact with their healthcare. The WCAG compliance alone was worth it, but the business outcomes made it transformational.',
    rating: 5,
    projectType: 'Healthcare UX',
  },
];

// ─── Services ─────────────────────────────────────────────────────────────────
export const services: Service[] = [
  {
    id: 'web-design',
    icon: '✦',
    title: 'AI Web Design',
    description:
      'Conversion-engineered websites that look like they were built by a world-class agency. Every pixel has a purpose, every interaction a reason.',
    features: [
      'Custom design system',
      'Framer / Next.js build',
      'Animation & micro-interactions',
      'Mobile-first responsive',
      'CMS integration',
      'SEO foundation',
    ],
  },
  {
    id: 'saas-design',
    icon: '◈',
    title: 'SaaS Product Design',
    description:
      'Product interfaces that accelerate activation, reduce churn, and turn users into advocates. Research-grounded, metric-obsessed.',
    features: [
      'UX research & user flows',
      'Design system & component library',
      'Dashboard & data visualization',
      'Onboarding optimization',
      'A/B test frameworks',
      'Accessibility (WCAG 2.1 AA)',
    ],
    popular: true,
  },
  {
    id: 'ai-automation',
    icon: '⬡',
    title: 'AI Automation',
    description:
      'Custom AI workflows that eliminate manual work, surface insights faster, and compound your team\'s output without adding headcount.',
    features: [
      'GPT-4 / Claude integration',
      'Workflow automation (n8n, Zapier)',
      'RAG pipeline design',
      'AI chatbot & agents',
      'Custom model fine-tuning',
      'Analytics & monitoring',
    ],
  },
  {
    id: 'branding',
    icon: '◎',
    title: 'Brand Identity',
    description:
      'Visual identities that command attention and hold it. From logo to motion, every element engineered to be instantly recognizable.',
    features: [
      'Logo & wordmark design',
      'Typography & color system',
      'Motion identity',
      'Brand guidelines',
      'Social media kit',
      'Presentation templates',
    ],
  },
  {
    id: 'frontend',
    icon: '◇',
    title: 'Creative Frontend',
    description:
      'High-performance frontend engineering with WebGL, 3D, and physics-based interactions that make your product impossible to forget.',
    features: [
      'Three.js / WebGL experiences',
      'GSAP & Framer Motion',
      'React / Next.js architecture',
      'Performance optimization',
      'Lighthouse 95+ scores',
      'Core Web Vitals',
    ],
  },
  {
    id: 'strategy',
    icon: '△',
    title: 'Growth Strategy',
    description:
      'Full-funnel digital strategy: CRO, SEO, and content architecture aligned to your growth targets, not just aesthetics.',
    features: [
      'Conversion rate optimization',
      'SEO architecture',
      'Content strategy',
      'Analytics & attribution',
      'Funnel analysis',
      'Competitive positioning',
    ],
  },
];

// ─── Skills ───────────────────────────────────────────────────────────────────
export const skills: Skill[] = [
  // Design
  { name: 'Figma', category: 'design', level: 98 },
  { name: 'UI/UX Design', category: 'design', level: 96 },
  { name: 'Motion Design', category: 'design', level: 90 },
  { name: 'Brand Identity', category: 'design', level: 88 },
  // Frontend
  { name: 'React / Next.js', category: 'frontend', level: 97 },
  { name: 'TypeScript', category: 'frontend', level: 93 },
  { name: 'Tailwind CSS', category: 'frontend', level: 98 },
  { name: 'Framer Motion', category: 'frontend', level: 95 },
  { name: 'GSAP', category: 'frontend', level: 92 },
  // 3D
  { name: 'Three.js', category: '3d', level: 88 },
  { name: 'React Three Fiber', category: '3d', level: 87 },
  { name: 'WebGL / Shaders', category: '3d', level: 78 },
  // AI
  { name: 'OpenAI / GPT-4', category: 'ai', level: 90 },
  { name: 'LangChain', category: 'ai', level: 82 },
  { name: 'AI Automation', category: 'ai', level: 88 },
  // Tools
  { name: 'Vercel', category: 'tools', level: 95 },
  { name: 'Git / GitHub', category: 'tools', level: 94 },
  { name: 'Performance Opt.', category: 'tools', level: 91 },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
export const stats: Stat[] = [
  { value: '47', suffix: '+', label: 'Projects Delivered', description: 'Across 12 industries' },
  { value: '98', suffix: '%', label: 'Client Retention', description: 'They always come back' },
  { value: '3.2', suffix: '×', label: 'Avg. Revenue Lift', description: 'Measured after 90 days' },
  { value: '4', suffix: '', label: 'Years Experience', description: 'Building at the frontier' },
];

// ─── Timeline ─────────────────────────────────────────────────────────────────
export const timeline: TimelineItem[] = [
  {
    year: '2024',
    title: 'AI-Native Design Era',
    description:
      'Pioneered the integration of AI generation, automation, and creative frontend engineering into a single, holistic service offering. First designer in Pakistan to win Awwwards Honorable Mention.',
    tags: ['AI Integration', 'Awwwards', 'Scale'],
  },
  {
    year: '2023',
    title: 'Going Independent',
    description:
      'Left agency life to build ARK: a solo creative practice that moves faster, thinks deeper, and builds better. First year closed at $180K in revenue.',
    tags: ['Freelance', 'ARK Brand', 'Scale'],
  },
  {
    year: '2022',
    title: 'Senior Designer at Creative Agency',
    description:
      'Led design for 12 enterprise clients including a Fortune 500 healthcare network. Introduced Three.js and GSAP animations to the agency tech stack.',
    tags: ['Agency', 'Leadership', '3D'],
  },
  {
    year: '2021',
    title: 'Frontend Engineering Deep Dive',
    description:
      'Obsessively studied advanced React patterns, WebGL, and performance engineering. Built 20+ personal projects to master the intersection of design and code.',
    tags: ['Learning', 'React', 'WebGL'],
  },
  {
    year: '2020',
    title: 'First Paying Clients',
    description:
      'Landed first 5 clients through Upwork and Behance. Discovered that the gap between "looks good" and "performs well" was where real value lived.',
    tags: ['Client Work', 'Freelance', 'Growth'],
  },
];

// ─── Process ──────────────────────────────────────────────────────────────────
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We excavate the brief. Goals, constraints, competition, audience — and what winning actually looks like for your business.',
    duration: '1–2 days',
    deliverables: ['Scope document', 'Competitor analysis', 'Success metrics'],
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'Architecture before aesthetics. We map the user journey, define information hierarchy, and plan every conversion moment.',
    duration: '2–3 days',
    deliverables: ['User flow diagrams', 'Sitemap', 'Content framework'],
  },
  {
    number: '03',
    title: 'Design',
    description:
      'High-fidelity Figma designs that explore bold directions, then converge on the version that serves your goals best.',
    duration: '5–10 days',
    deliverables: ['Design system', 'Full page designs', 'Animation specs'],
  },
  {
    number: '04',
    title: 'Build',
    description:
      'Pixel-perfect development in Next.js. Every animation frame, every interaction state, every responsive breakpoint considered.',
    duration: '7–21 days',
    deliverables: ['Production codebase', 'CMS setup', 'Testing report'],
  },
  {
    number: '05',
    title: 'Launch',
    description:
      'Performance auditing, SEO configuration, analytics setup, and a clean handoff so you own everything that was built.',
    duration: '2–3 days',
    deliverables: ['Live deployment', 'SEO audit', 'Analytics dashboard', 'Training session'],
  },
];

// ─── Client Logos ─────────────────────────────────────────────────────────────
export const clientLogos: ClientLogo[] = [
  { name: 'Nexus AI', logo: '/images/clients/nexus.svg' },
  { name: 'Lumina', logo: '/images/clients/lumina.svg' },
  { name: 'Orbit', logo: '/images/clients/orbit.svg' },
  { name: 'Helix Bio', logo: '/images/clients/helix.svg' },
  { name: 'Verse', logo: '/images/clients/verse.svg' },
  { name: 'Pulse Health', logo: '/images/clients/pulse.svg' },
];

// ─── Contact Info ─────────────────────────────────────────────────────────────
export const contactInfo = {
  whatsapp: '+923141495630',
  phone: '+923141495630',
  email: 'ark303777@gmail.com',
};
