import { getContent } from '@/lib/content';
import { llmsText } from '@/lib/seo';

// AI 검색(ChatGPT·Claude·Perplexity 등)이 읽기 쉬운 회사 요약. 관리자 페이지에서 고친 내용이 그대로 반영됩니다.
export async function GET() {
  const body = llmsText(await getContent());
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
