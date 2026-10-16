import type { MetadataRoute } from 'next';
import { devices } from '@/data/hardware';
import { models } from '@/data/models';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/models'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/hardware'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
  ];

  const modelPages: MetadataRoute.Sitemap = models.map((model) => ({
    url: absoluteUrl(`/models/${model.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const devicePages: MetadataRoute.Sitemap = devices.map((device) => ({
    url: absoluteUrl(`/hardware/${device.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...modelPages, ...devicePages];
}
