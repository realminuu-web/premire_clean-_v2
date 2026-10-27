import type { SiteContent } from '@/config/site';
import { structuredData } from '@/lib/seo';

/** 검색엔진·AI가 읽는 업체 정보 (화면에는 보이지 않습니다) */
export default function StructuredData({ content }: { content: SiteContent }) {
  const json = JSON.stringify(structuredData(content)).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
