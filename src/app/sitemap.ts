import { MetadataRoute } from 'next';
import { getContent } from '@/lib/content';
import { siteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const url = siteUrl(content);
  return [
    { url, changeFrequency: 'weekly', priority: 1.0 },
    ...content.products.items.map((p) => ({
      url: `${url}/services/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    { url: `${url}/llms.txt`, changeFrequency: 'weekly', priority: 0.3 },
  ];
}
