# ARK — Abdul Rehman | AI Web Designer Portfolio

A world-class portfolio website built to compete for Awwwards, CSS Design Awards, FWA, and Godly.

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion + GSAP |
| 3D | Three.js + React Three Fiber + Drei |
| Smooth Scroll | Lenis |
| Icons | Lucide + React Icons |
| Deployment | Vercel |

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
open http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Homepage
│   ├── ClientProviders.tsx # Cursor + Loader
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   └── work/               # Portfolio
│       └── [slug]/         # Case study pages
├── components/
│   ├── cursor/             # Custom cursor
│   ├── layout/             # Navbar, Footer, Loader, Lenis
│   └── sections/           # Hero, Services, Work, Stats…
├── data/                   # All site content
├── hooks/                  # Custom React hooks
├── lib/                    # Utils + animation variants
├── styles/                 # Global CSS
└── types/                  # TypeScript types
public/
├── fonts/                  # Local font files (optional)
├── images/                 # Static images
└── robots.txt
```

## 🎨 Customization Guide

### Change Personal Info
Edit `src/data/index.ts`:
- `contactInfo` — email, phone, WhatsApp
- `socialLinks` — your actual social URLs
- `stats` — update numbers
- `timeline` — your real career history

### Add a Project
In `src/data/index.ts`, add to the `projects` array:
```ts
{
  id: '7',
  slug: 'your-project-slug',
  title: 'Project Name',
  subtitle: 'Short descriptor',
  category: 'saas', // 'ai' | 'saas' | 'ecommerce' | 'branding' | 'landing'
  tags: ['Tag1', 'Tag2'],
  description: '...',
  challenge: '...',
  solution: '...',
  results: ['Result 1', 'Result 2'],
  coverImage: 'https://images.unsplash.com/...',
  images: ['...'],
  technologies: ['Next.js', 'TypeScript'],
  year: '2025',
  duration: '6 weeks',
  featured: false,
}
```

### Change Colors
In `tailwind.config.ts`, update the `ark` color palette:
```ts
ark: {
  blue: { electric: '#YOUR_COLOR' },
  purple: { DEFAULT: '#YOUR_COLOR' },
  // ...
}
```

Also update CSS variables in `src/styles/globals.css`.

### Replace Images
All Unsplash images are via URL. Replace with your own:
1. Place images in `public/images/`
2. Update paths in `src/data/index.ts`
3. Or use a CDN/Cloudinary URL

### Update SEO
Edit `src/app/layout.tsx`:
- Update `metadata.metadataBase` to your domain
- Update OG title, description, images
- Update canonical URLs

### Update JSON-LD
Edit `src/components/layout/JsonLd.tsx` with your real:
- Name, job title, location
- Social profile URLs
- Service descriptions

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Manual Build
```bash
npm run build
npm run start
```

## 📊 Performance

Target Lighthouse scores:
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

Optimization features:
- Next.js Image optimization (WebP/AVIF)
- Dynamic imports with Suspense
- React Server Components where appropriate
- Lenis smooth scroll (doesn't block main thread)
- Three.js canvas with performance hints
- Font display swap
- Preloaded critical assets

## ♿ Accessibility

- Full keyboard navigation
- ARIA labels on interactive elements
- Reduced motion support (`prefers-reduced-motion`)
- Skip to main content
- WCAG 2.1 AA color contrast
- Semantic HTML structure

## 🔧 Available Scripts

```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

## 📧 Contact Configuration

Update `src/data/index.ts`:
```ts
export const contactInfo = {
  whatsapp: '+923141495630',   // Include country code
  phone: '+923141495630',
  email: 'ark303777@gmail.com',
};
```

The contact form currently simulates submission. To wire it up:
1. Create `src/app/api/contact/route.ts`
2. Use Resend, SendGrid, or EmailJS
3. Update the `handleSubmit` function in `ContactClient.tsx`

## 🌐 Domain Setup

1. Deploy to Vercel
2. Add your custom domain in Vercel dashboard
3. Update `metadataBase` in `layout.tsx`
4. Update sitemap URLs in `sitemap.ts`
5. Update JSON-LD URLs in `JsonLd.tsx`

---

Built with obsession by Abdul Rehman 🇵🇰
