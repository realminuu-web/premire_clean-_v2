import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = siteConfig.seo.siteUrl.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
