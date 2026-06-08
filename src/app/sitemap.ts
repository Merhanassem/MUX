import { MetadataRoute } from 'next';
import { projects } from '@/lib/data/projects';

const BASE_URL = 'https://merhan.design';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: BASE_URL,            lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${BASE_URL}/work`,  lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.7 },
  ];

  const caseStudyRoutes = projects
    .filter(p => p.coverImage)
    .map(p => ({
      url: `${BASE_URL}/work/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...caseStudyRoutes];
}
