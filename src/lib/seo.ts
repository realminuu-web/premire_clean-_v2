import type { SiteContent } from '@/config/site';
import type { ProductItem } from '@/types';

export function siteUrl(content: SiteContent) {
  return (content.seo.siteUrl || 'https://premierclean.co.kr').replace(/\/$/, '');
}

/** 서비스 지역 섹션 목록 → ["서울 강남구", "경기 성남시", …] (검색엔진·AI용 지역의 단일 출처) */
export function serviceAreas(content: SiteContent): string[] {
  return content.areas.groups.flatMap((g) => g.districts.map((d) => `${g.name} ${d}`.trim()));
}

/** 기본 태그 + "강남구 입주청소" 같은 지역 조합 태그 */
export function allKeywords(content: SiteContent): string[] {
  const districts = content.areas.groups.flatMap((g) => g.districts);
  const combos = districts.flatMap((d) => content.seo.areaKeywordServices.map((service) => `${d} ${service}`));
  return [...new Set([...content.seo.keywords, ...combos])];
}

/** 상세 페이지 하나의 검색엔진·AI용 서비스 정보 */
export function productStructuredData(content: SiteContent, product: ProductItem) {
  const url = siteUrl(content);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}/services/${product.slug}#service`,
    name: product.name,
    description: `${product.summary} ${product.detail}`.trim(),
    url: `${url}/services/${product.slug}`,
    image: product.image || undefined,
    serviceType: product.name,
    provider: { '@id': `${url}/#business`, '@type': 'LocalBusiness', name: content.brand.name, telephone: content.contact.phone },
    areaServed: serviceAreas(content).map((name) => ({ '@type': 'AdministrativeArea', name })),
    offers: {
      '@type': 'Offer',
      description: [product.price, product.priceBasis].filter(Boolean).join(' · '),
      priceCurrency: 'KRW',
    },
  };
}

/** 검색엔진·AI가 읽는 업체 정보 (schema.org JSON-LD) */
export function structuredData(content: SiteContent) {
  const url = siteUrl(content);
  const { brand, contact, company, seo, faqList, products } = content;
  const areas = serviceAreas(content);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
        '@id': `${url}/#business`,
        name: brand.name,
        alternateName: brand.englishName,
        url,
        description: seo.aiSummary || seo.description,
        telephone: contact.phone,
        email: contact.email,
        image: content.hero.backgroundImage,
        address: {
          '@type': 'PostalAddress',
          streetAddress: company.address,
          addressLocality: company.addressLocality,
          addressRegion: company.addressRegion,
          addressCountry: 'KR',
        },
        areaServed: areas.map((name) => ({ '@type': 'AdministrativeArea', name })),
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: contact.opens,
          closes: contact.closes,
        },
        knowsAbout: seo.keywords,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: '청소 서비스',
          itemListElement: products.items.map((p) => ({
            '@type': 'Offer',
            description: [p.price, p.priceBasis].filter(Boolean).join(' · '),
            itemOffered: {
              '@type': 'Service',
              '@id': `${url}/services/${p.slug}#service`,
              name: p.name,
              description: p.summary,
              url: `${url}/services/${p.slug}`,
              areaServed: areas.join(', '),
              provider: { '@id': `${url}/#business` },
            },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name: brand.name,
        inLanguage: 'ko-KR',
        publisher: { '@id': `${url}/#business` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}/#faq`,
        mainEntity: faqList.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  };
}

/** AI 검색용 요약 파일 (llms.txt) 내용 */
export function llmsText(content: SiteContent): string {
  const url = siteUrl(content);
  const { brand, contact, company, seo, faqList, trustBadges, products } = content;
  const lines = [
    `# ${brand.name} (${brand.englishName})`,
    '',
    `> ${seo.aiSummary}`,
    '',
    '## 기본 정보',
    `- 업종: 청소 전문 업체 (입주청소, 이사청소, 거주청소, 사무실·상가·건물 청소, 준공 청소)`,
    `- 전화: ${contact.phone}`,
    `- 상담 시간: ${contact.operatingHours}`,
    `- 이메일: ${contact.email}`,
    `- 주소: ${company.address}`,
    `- 상호: ${company.corporateName} (사업자등록번호 ${company.businessNumber})`,
    `- 서비스 지역: ${serviceAreas(content).join(', ')}`,
    `- 견적 신청: ${url}/#contact`,
    '',
    '## 서비스',
    ...products.items.flatMap((p) => [
      `### ${p.name}`,
      `${url}/services/${p.slug}`,
      p.summary,
      `- 가격: ${p.price}${p.priceBasis ? ` (${p.priceBasis})` : ''}`,
      `- 소요 시간: ${p.duration} · 인원: ${p.crew}`,
      `- 포함: ${p.includes.join(', ')}`,
      `- 불포함: ${p.excludes.join(', ')}`,
      '',
    ]),
    '## 약속',
    ...trustBadges.map((b) => `- ${b.title}: ${b.description}`),
    '',
    '## 자주 묻는 질문',
    ...faqList.flatMap((f) => [`### ${f.question}`, f.answer, '']),
  ];
  return lines.join('\n');
}
