/**
 * 기본 문구를 바꿀 때의 "예전 기본값" 목록.
 *
 * 관리자가 한 번 저장하면 모든 칸이 저장소에 들어가서, site.ts 기본값만 바꿔서는 화면이 그대로입니다.
 * 그래서 저장된 값이 여기 적힌 예전 기본값과 똑같은 칸(= 사장님이 손대지 않은 칸)만
 * 새 기본값으로 바꿔 보여 줍니다. 사장님이 직접 고친 칸은 그대로 둡니다.
 */
export const OLD_DEFAULTS: { path: string; old: unknown }[] = [
  // 2026-10-28 꾸밈말 정리
  { path: 'services.title2', old: '모든 공간의 최상위 클리닝' },
  {
    path: 'services.description',
    old: '프리미어 클린은 프리미엄 주거 홈클리닝과 오피스·상가 상업공간 관리를 동등한 100% 직영 마스터 공정으로 완성합니다.',
  },
  { path: 'services.home.badge', old: '주거 전문 마스터' },
  {
    path: 'services.home.description',
    old: '가장 소중한 안식처를 호텔 스위트룸처럼. 미세먼지, 분진가루, 숨은 세균까지 박멸하는 주거 전문 올인원 솔루션',
  },
  {
    path: 'services.home.features',
    old: [
      '신축 아파트 벽면 도배풀, 시멘트 가루, 새집증후군 유발 물질 제거',
      '주방 상·하부장 선반, 걸레받이, 후드 필터 기름때 고온 스팀 박멸',
      '화장실 배수구, 환풍기 트랩 탈거 세척 및 타일 줄눈 물때 스케일링',
      '방충망, 창틀 4면 틈새 먼지, 유리창 얼룩 클리닝 (외창 제외)',
      '천장 조명 커버 탈거 먼지 제거 및 스위치, 콘센트 미세 세척',
    ],
  },
  { path: 'services.commercial.badge', old: '비즈니스 전문 마스터' },
  {
    path: 'services.commercial.description',
    old: '기업의 브랜드 가치와 임직원의 생산성을 극대화하는 프리미엄 오피스 & 상업 시설 전문 클리닝',
  },
  { path: 'trust.subtitle', old: '파손·선금·A/S·추가금 우려를 법적·금전적으로 100% 사전 차단합니다' },
  { path: 'about.description', old: '보이는 곳만 닦아서는 프리미어가 아닙니다. 기술과 원칙이 만드는 차이를 경험해 보세요.' },
  { path: 'coreValues.1.title', old: '독일 명품 장비 & 친환경 세제' },
  { path: 'coreValues.2.subtitle', old: '보이지 않는 숨은 공사 분진 완전 박멸' },
  {
    path: 'coreValues.2.description',
    old: '눈에 보이는 곳만 닦는 수박 겉핥기 청소는 거부합니다. 싱크대 걸레받이, 전등갓, 수납장 서랍, 배수구, 환풍기까지 100% 탈거하여 미세 분진을 흡입합니다.',
  },
  { path: 'process.afterLabel', old: 'AFTER (정밀 멸균 시공 완료)' },
  { path: 'cleaningManualZones.0.tag', old: '기름때·탄자국 박멸' },
  { path: 'cleaningManualZones.2.tag', old: '창틀 흙먼지 완벽 제거' },
  { path: 'reviewsSection.carouselTitle', old: '고객님들이 직접 증명하는 프리미어 클린의 품격' },
  {
    path: 'contact.formSubtitle',
    old: '원하시는 공간과 일정에 맞춰 최적의 맞춤 견적을 1분 만에 신속히 1:1 안내해 드립니다.',
  },
  {
    path: 'footer.description',
    old: '프리미어 클린은 100% 한국인 직영 마스터팀으로 운영되는 프리미엄 청소 전문 기업입니다. 타협 없는 시공과 공인된 친환경 기술로 새로운 주거·업무 환경의 기준을 만듭니다.',
  },
];
