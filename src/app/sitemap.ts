import { MetadataRoute } from 'next';
import { getContent } from '@/lib/content';
import { siteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = siteUrl(await getContent());
  return [
    { url, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${url}/llms.txt`, changeFrequency: 'weekly', priority: 0.3 },
  ];
}
