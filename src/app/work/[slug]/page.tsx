import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { projects } from '@/data';
import CaseStudyClient from './CaseStudyClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.subtitle}`,
    description: project.description,
    openGraph: {
      images: [project.coverImage],
    },
  };
}

export default function CaseStudyPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();
  return <CaseStudyClient project={project} />;
}
