import type { Metadata } from 'next';
import './globals.css';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.brand.name }],
  creator: siteConfig.brand.name,
  publisher: siteConfig.brand.name,
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.siteUrl,
    siteName: siteConfig.brand.name,
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
  verification: {
    google: siteConfig.seo.googleVerification || undefined,
    other: siteConfig.seo.naverVerification
      ? { 'naver-site-verification': siteConfig.seo.naverVerification }
      : {},
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 구글 및 네이버 검색엔진이 공식 인식하는 JSON-LD 구조화 데이터 (Schema.org)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: siteConfig.brand.name,
    alternateName: siteConfig.brand.englishName,
    url: siteConfig.seo.siteUrl,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    priceRange: '₩₩',
    description: siteConfig.brand.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.company.address,
      addressLocality: 'Seoul',
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '37.5000',
      longitude: '127.0365',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '08:00',
      closes: '21:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.98',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '12840',
    },
  };

  return (
    <html lang="ko" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* Schema.org JSON-LD 구조화 데이터 스크립트 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
