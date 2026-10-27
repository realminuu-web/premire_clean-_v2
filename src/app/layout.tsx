import type { Metadata } from 'next';
import './globals.css';
import { getContent } from '@/lib/content';
import { allKeywords, siteUrl } from '@/lib/seo';

// 검색 결과 제목·설명·태그는 관리자 페이지 [검색 노출]에서 고칩니다.
export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const { seo, brand } = content;
  const url = siteUrl(content);

  return {
    metadataBase: new URL(url),
    title: seo.title,
    description: seo.description,
    keywords: allKeywords(content),
    authors: [{ name: brand.name }],
    creator: brand.name,
    publisher: brand.name,
    formatDetection: { email: false, address: true, telephone: true },
    alternates: { canonical: '/' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url,
      siteName: brand.name,
      locale: 'ko_KR',
      type: 'website',
      // 썸네일 사진은 app/opengraph-image.tsx 가 만듭니다 (관리자에서 올린 사진이 있으면 그 사진)
    },
    twitter: { card: 'summary_large_image', title: seo.title, description: seo.description },
    verification: {
      google: seo.googleVerification || undefined,
      other: seo.naverVerification ? { 'naver-site-verification': seo.naverVerification } : {},
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="AI용 회사 요약" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
