import type { SiteContent } from '@/config/site';

export function siteUrl(content: SiteContent) {
  return (content.seo.siteUrl || 'https://premierclean.co.kr').replace(/\/$/, '');
}

/** "서울 강남구" → "강남구" 처럼 지역 태그에 쓸 짧은 이름 */
function shortArea(area: string) {
  const parts = area.trim().split(/\s+/);
  return parts[parts.length - 1] ?? area;
}

/** 기본 태그 + "강남구 입주청소" 같은 지역 조합 태그 */
export function allKeywords(content: SiteContent): string[] {
  const combos = content.seo.areas.flatMap((area) =>
    content.seo.areaKeywordServices.map((service) => `${shortArea(area)} ${service}`),
  );
  return [...new Set([...content.seo.keywords, ...combos])];
}

/** 검색엔진·AI가 읽는 업체 정보 (schema.org JSON-LD) */
export function structuredData(content: SiteContent) {
  const url = siteUrl(content);
  const { brand, contact, company, seo, services, faqList } = content;
  const serviceList = [services.home, services.commercial];

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
        areaServed: seo.areas.map((name) => ({ '@type': 'AdministrativeArea', name })),
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
          itemListElement: serviceList.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.title,
              description: s.description,
              serviceType: s.highlights.join(', '),
              areaServed: seo.areas.join(', '),
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
  const { brand, contact, company, seo, services, faqList, trustBadges } = content;
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
    `- 서비스 지역: ${seo.areas.join(', ')}`,
    `- 견적 신청: ${url}/#contact`,
    '',
    '## 서비스',
    ...[services.home, services.commercial].flatMap((s) => [
      `### ${s.title}`,
      s.description,
      ...s.highlights.map((h) => `- ${h}`),
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
