// ─── Navigation ────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// ─── Project / Work ─────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  coverImage: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  duration: string;
  metrics?: ProjectMetric[];
  featured: boolean;
}

export type ProjectCategory =
  | 'all'
  | 'saas'
  | 'ai'
  | 'ecommerce'
  | 'branding'
  | 'landing'
  | 'mobile';

export interface ProjectMetric {
  label: string;
  value: string;
  change?: string;
}

// ─── Testimonials ───────────────────────────────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  projectType?: string;
}

// ─── Services ───────────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  price?: string;
  popular?: boolean;
}

// ─── Skills ─────────────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 0-100
  icon?: string;
}

export type SkillCategory =
  | 'design'
  | 'frontend'
  | 'backend'
  | 'ai'
  | 'tools'
  | '3d';

// ─── Stats ──────────────────────────────────────────────────────────────────────
export interface Stat {
  value: string;
  suffix?: string;
  label: string;
  description?: string;
}

// ─── Experience / Timeline ──────────────────────────────────────────────────────
export interface TimelineItem {
  year: string;
  title: string;
  company?: string;
  description: string;
  tags?: string[];
}

// ─── Process Steps ──────────────────────────────────────────────────────────────
export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  duration?: string;
  deliverables?: string[];
}

// ─── Contact ─────────────────────────────────────────────────────────────────────
export interface ContactInfo {
  whatsapp: string;
  phone: string;
  email: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// ─── Form ────────────────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
}

// ─── Cursor ──────────────────────────────────────────────────────────────────────
export interface CursorState {
  x: number;
  y: number;
  isHovering: boolean;
  isClicking: boolean;
  text?: string;
  variant?: 'default' | 'text' | 'image' | 'video' | 'link' | 'drag';
}

// ─── Page Meta ───────────────────────────────────────────────────────────────────
export interface PageMeta {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}

// ─── Client Logos ────────────────────────────────────────────────────────────────
export interface ClientLogo {
  name: string;
  logo: string;
  url?: string;
}
