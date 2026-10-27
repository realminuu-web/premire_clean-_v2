import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import MobileStickyBar from '@/components/MobileStickyBar';
import SiteTracker from '@/components/SiteTracker';
import ProductDetail from '@/components/ProductDetail';
import { ContentProvider } from '@/components/ContentProvider';
import { defaultContent } from '@/config/site';
import { getContent, getPublicReviews } from '@/lib/content';
import { productStructuredData, siteUrl } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

// 기본 상품 주소는 미리 만들어 둡니다. 관리자가 새로 만든 상품 주소는 처음 열릴 때 만들어집니다.
export function generateStaticParams() {
  return defaultContent().products.items.map((p) => ({ slug: p.slug }));
}

async function findProduct(slug: string) {
  const content = await getContent();
  return { content, product: content.products.items.find((p) => p.slug === slug) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { content, product } = await findProduct(slug);
  if (!product) notFound();

  const title = `${product.name} | ${content.brand.name}`;
  const description = `${product.summary} ${product.price}${product.priceBasis ? ` (${product.priceBasis})` : ''}, ${product.duration}, ${product.crew}.`;
  return {
    title,
    description,
    alternates: { canonical: `/services/${product.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl(content)}/services/${product.slug}`,
      images: product.image ? [product.image] : undefined,
    },
  };
}

async function Detail({ params }: Props) {
  const { slug } = await params;
  const [{ content, product }, reviews] = await Promise.all([findProduct(slug), getPublicReviews()]);
  if (!product) notFound();

  const url = siteUrl(content);
  const jsonLd = [
    productStructuredData(content, product),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: content.brand.name, item: url },
        { '@type': 'ListItem', position: 2, name: product.name, item: `${url}/services/${product.slug}` },
      ],
    },
  ];

  return (
    <ContentProvider content={content} reviews={reviews}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="relative flex min-h-screen flex-col bg-white pb-28 text-slate-900 md:pb-0">
        <Header solid />
        <main className="flex-1">
          <ProductDetail content={content} product={product} />
        </main>
        <Footer />
        <FloatingActions />
        <MobileStickyBar />
        <SiteTracker sectionIds={[]} />
      </div>
    </ContentProvider>
  );
}

export default function ServicePage({ params }: Props) {
  // partialPrefetching 이 켜져 있어서 params 는 Suspense 안에서 읽습니다
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <Detail params={params} />
    </Suspense>
  );
}
