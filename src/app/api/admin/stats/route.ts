import { denyUnlessAdmin } from '@/lib/auth';
import { readEvents } from '@/lib/store';

const SECTION_NAMES: Record<string, string> = {
  hero: '첫 화면',
  services: '서비스',
  products: '상품 카드',
  areas: '서비스 지역',
  proof: '증명 자료',
  trust: '안심 보증',
  process: '비포·애프터',
  about: '시공 원칙',
  team: '팀 소개',
  reviews: '시공 후기',
  instagram: '인스타그램',
  contact: '견적 신청',
  faq: '자주 묻는 질문',
};

function seoulDay(iso: string) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(new Date(iso));
}

/** 최근 N일 통계 (기본 30일) */
export async function GET(request: Request) {
  const denied = await denyUnlessAdmin();
  if (denied) return denied;

  const days = Math.min(365, Math.max(1, Number(new URL(request.url).searchParams.get('days')) || 30));
  const since = new Date(Date.now() - days * 86400_000);
  const events = await readEvents(since);

  const count = (type: string) => events.filter((e) => e.type === type).length;

  // 날짜별 방문자·견적 신청 (빈 날도 0으로 채움)
  const daily = new Map<string, { views: number; quotes: number }>();
  for (let i = days - 1; i >= 0; i--) {
    daily.set(seoulDay(new Date(Date.now() - i * 86400_000).toISOString()), { views: 0, quotes: 0 });
  }
  for (const e of events) {
    const d = daily.get(seoulDay(e.createdAt));
    if (!d) continue;
    if (e.type === 'view') d.views++;
    if (e.type === 'submit_quote') d.quotes++;
  }

  const sections = new Map<string, number>();
  const quoteTypes = new Map<string, number>();
  for (const e of events) {
    if (e.type === 'section_view' && e.label) sections.set(e.label, (sections.get(e.label) ?? 0) + 1);
    if (e.type === 'submit_quote') {
      const name = e.label === 'commercial' ? '사업장' : e.label === 'home' ? '홈클리닝' : '기타';
      quoteTypes.set(name, (quoteTypes.get(name) ?? 0) + 1);
    }
  }

  const views = count('view');
  const quotes = count('submit_quote');
  return Response.json({
    days,
    totals: {
      views,
      quotes,
      quoteRate: views ? Math.round((quotes / views) * 1000) / 10 : 0,
      phoneClicks: count('click_phone'),
      kakaoClicks: count('click_kakao'),
      quoteClicks: count('click_quote'),
    },
    daily: [...daily.entries()].map(([day, v]) => ({ day, ...v })),
    sections: [...sections.entries()]
      .map(([id, n]) => ({ name: SECTION_NAMES[id] ?? id, count: n }))
      .sort((a, b) => b.count - a.count),
    quoteTypes: [...quoteTypes.entries()].map(([name, n]) => ({ name, count: n })),
  });
}
