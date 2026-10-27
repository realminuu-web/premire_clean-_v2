import { MetadataRoute } from 'next';
import { getContent } from '@/lib/content';
import { siteUrl } from '@/lib/seo';

// 일반 검색(네이버·구글·다음)과 AI 검색(ChatGPT·Claude·Perplexity·구글 AI) 로봇이
// 홈페이지를 읽을 수 있게 허용합니다. 관리자 페이지와 내부 주소는 막습니다.
const AI_AND_SEARCH_BOTS = [
  'Googlebot',
  'Google-Extended',
  'Bingbot',
  'Yeti', // 네이버
  'Daumoa', // 다음
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot',
  'Applebot-Extended',
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const url = siteUrl(await getContent());
  const disallow = ['/api/', '/admin'];
  return {
    rules: [
      ...AI_AND_SEARCH_BOTS.map((userAgent) => ({ userAgent, allow: '/', disallow })),
      { userAgent: '*', allow: '/', disallow },
    ],
    sitemap: `${url}/sitemap.xml`,
    host: url,
  };
}
