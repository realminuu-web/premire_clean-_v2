import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, '');
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
