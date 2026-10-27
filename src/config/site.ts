import {
  TrustBadgeItem,
  CoreValueItem,
  CleaningManualZone,
  FaqItem,
  ReviewItem,
  InstagramPost,
  SectionId,
  ServiceDetail,
} from '@/types';

/**
 * =========================================================================
 * 🌟 [프리미어 클린] 홈페이지 기본 글자·사진 (Site Content 기본값)
 * =========================================================================
 * 💡 관리자 안내:
 * 홈페이지 글자는 이제 관리자 페이지(주소 /admin)의 [문구 수정]에서 고치시면 됩니다.
 * 이 파일은 "처음 기본값"입니다. 관리자 페이지에서 저장한 내용이 이 기본값보다 우선합니다.
 * 관리자 페이지의 [문구 수정] > [기본값으로 되돌리기]를 누르면 이 파일 내용으로 돌아갑니다.
 *
 * 비밀번호, 저장소(Supabase) 연결, 이메일 연동 같은 비밀 값은 이 파일이 아니라
 * .env.local 파일(또는 호스팅 서비스의 환경 변수)에 넣습니다. 자세한 건 ADMIN_GUIDE.md 참고.
 */

export const siteConfig = {
  // -----------------------------------------------------------------------
  // 0. 📑 섹션 배치 순서 & 보이기/숨기기
  // 'hero' 첫 화면 · 'services' 서비스 · 'trustBadges' 안심 보증 · 'process' 구역별 비포·애프터
  // 'about' 시공 원칙 · 'reviews' 시공 후기 · 'instagram' 인스타그램 · 'contact' 견적 신청 · 'faq' 자주 묻는 질문
  // -----------------------------------------------------------------------
  sectionOrder: [
    'hero',
    'services',
    'trustBadges',
    'process',
    'about',
    'reviews',
    'instagram',
    'contact',
    'faq',
  ] as SectionId[],

  // false 로 두면 그 섹션은 홈페이지에서 숨겨지고 아래 섹션이 올라옵니다.
  visibility: {
    hero: true,
    services: true,
    trustBadges: true,
    process: true,
    about: true,
    reviews: true,
    instagram: false, // 인스타 연동 전까지 숨김
    contact: true,
    faq: true,
  } as Record<SectionId, boolean>,

  // -----------------------------------------------------------------------
  // 1. 기본 브랜드 정보
  // -----------------------------------------------------------------------
  brand: {
    name: '프리미어 클린',
    englishName: 'PREMIER CLEAN',
    slogan: '주거부터 비즈니스 공간까지, 프리미어 클린이 기준을 만듭니다.',
    subSlogan: '머무는 사람의 호흡까지 생각합니다. 청소는 단순 노동이 아닌 정밀한 기술입니다.',
    description: '100% 한국인 직영 마스터팀 · 전문가용 안심 스팀 장비 · 고객만족도 99% · 100% 무료 A/S 보장',
  },

  // -----------------------------------------------------------------------
  // 2. 고객센터 및 연락처 정보
  // -----------------------------------------------------------------------
  contact: {
    phone: '1800-0000',
    phoneTel: 'tel:1800-0000',
    operatingHours: '매일 08:00 ~ 21:00 (연중무휴)',
    opens: '08:00', // 검색엔진용 영업 시작 시각 (24시간 표기)
    closes: '21:00', // 검색엔진용 영업 종료 시각
    email: 'contact@premierclean.co.kr',
    kakaoChatUrl: 'https://open.kakao.com',
    instagramUrl: 'https://instagram.com',
    instagramHandle: 'premierclean_official',
    formSubtitle: '원하시는 공간과 일정에 맞춰 최적의 맞춤 견적을 1분 만에 신속히 1:1 안내해 드립니다.',
  },

  // -----------------------------------------------------------------------
  // 3. 회사 및 사업자 등록 정보 (맨 아래 회사 정보)
  // -----------------------------------------------------------------------
  company: {
    corporateName: '(주)프리미어클린마스터',
    ceo: '김대표',
    businessNumber: '123-85-67890',
    telecomSalesNumber: '2026-서울강남-0123호',
    address: '서울특별시 강남구 테헤란로 152 강남파이낸스센터 18층',
    addressRegion: '서울특별시', // 검색엔진용 시·도
    addressLocality: '강남구', // 검색엔진용 구·시
    trainingCenter: '경기 용인시 기흥구 기술연수원',
    privacyOfficer: '최관리',
    insuranceNotice: 'KB손해보험 영업배상책임보험 5억 원 가입 공식 인증 업체',
  },

  // -----------------------------------------------------------------------
  // 3-1. 🌐 검색 노출 (네이버·구글 검색 + ChatGPT·Perplexity 같은 AI 검색)
  // -----------------------------------------------------------------------
  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://premierclean.co.kr',
    title: '입주청소·이사청소·사무실청소 | 프리미어 클린',
    description:
      '서울·경기 입주청소, 이사청소, 거주청소, 사무실·상가·건물 청소 전문. 100% 직영 팀이 서랍 안쪽과 창틀 레일까지 청소하고, 견적서 금액 그대로 진행합니다.',
    // AI 검색이 인용하기 좋은 한 문단 회사 소개 (llms.txt 와 구조화 데이터에 쓰입니다)
    aiSummary:
      '프리미어 클린은 서울과 경기 지역에서 입주청소, 이사청소, 거주 중 대청소, 사무실 정기청소, 상가·매장 청소, 건물 공용부 청소, 준공·인테리어 후 청소를 하는 청소 전문 업체입니다. 본사 직영 팀이 직접 작업하고, 서랍·후드 필터·창틀 레일처럼 잘 보이지 않는 곳까지 분리해 닦습니다. 견적은 평수와 공간 상태를 기준으로 정하며, 견적서에 적은 금액 외 현장 추가금을 받지 않습니다.',
    // 서비스 지역 (검색엔진·AI에 "어디서 일하는지" 알려 줍니다)
    areas: [
      '서울 강남구', '서울 서초구', '서울 송파구', '서울 강동구', '서울 마포구', '서울 용산구',
      '서울 성동구', '서울 광진구', '서울 영등포구', '서울 양천구', '서울 강서구', '서울 노원구',
      '경기 성남시', '경기 용인시', '경기 하남시', '경기 수원시', '경기 고양시', '경기 남양주시',
      '경기 화성시', '경기 안양시', '경기 부천시', '경기 광명시', '경기 과천시', '경기 구리시',
    ],
    // 지역 조합 태그에 쓰는 대표 서비스 (예: "강남구 입주청소")
    areaKeywordServices: ['입주청소', '이사청소', '사무실청소'],
    keywords: [
      '프리미어클린', '청소업체', '입주청소', '이사청소', '거주청소', '신축 입주청소', '아파트 입주청소',
      '오피스텔 청소', '원룸 청소', '사무실 청소', '사무실 정기청소', '상가 청소', '매장 청소',
      '건물 청소', '빌딩 청소', '계단 청소', '공용부 청소', '준공 청소', '인테리어 후 청소',
      '새집증후군', '피톤치드 시공', '친환경 청소', '후드 청소', '화장실 청소', '줄눈 청소',
      '입주청소 체크리스트', '입주청소 업체 추천', '이사청소 업체 추천',
    ],
    ogImage: '', // 비워 두면 자동으로 만든 썸네일을 씁니다
    naverVerification: '',
    googleVerification: '',
  },

  // -----------------------------------------------------------------------
  // 4. 첫 화면 (화면 가득한 사진 + 슬로건 + 버튼 2개 + 누적 시공)
  // -----------------------------------------------------------------------
  hero: {
    backgroundImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    title: '주거부터 비즈니스까지, 프리미어 클린이 기준을 만듭니다.', // 쉼표(,) 뒤에서 줄이 바뀝니다
    highlight: '프리미어 클린', // 제목 안에서 파란색으로 강조할 글자
    primaryCta: '1분 만에 맞춤 견적 받기',
    secondaryCta: '비포 & 애프터 후기',
    countLabel: '지금까지 진행한 누적 시공',
    completedCleanCount: '12,840',
    countUnit: '건',
  },

  // -----------------------------------------------------------------------
  // 5. 서비스 소개 (홈클리닝 / 사업장 클리닝)
  // -----------------------------------------------------------------------
  services: {
    title1: '주거와 비즈니스,',
    title2: '모든 공간의 최상위 클리닝',
    description: '프리미어 클린은 프리미엄 주거 홈클리닝과 오피스·상가 상업공간 관리를 동등한 100% 직영 마스터 공정으로 완성합니다.',
    tabHome: '홈클리닝',
    tabCommercial: '사업장 클리닝',
    areasLabel: '주요 케어 영역',
    checkLabel: '시공 핵심 체크포인트',
    mobileNote: '공간 상태에 따른 맞춤 상담을 제공합니다',
    mobileCta: '맞춤 견적 상담 받기',
    home: {
      id: 'home-cleaning',
      category: 'home',
      eyebrow: 'HOME CLEANING',
      badge: '주거 전문 마스터',
      title: '홈클리닝 (Home Cleaning)',
      description: '가장 소중한 안식처를 호텔 스위트룸처럼. 미세먼지, 분진가루, 숨은 세균까지 박멸하는 주거 전문 올인원 솔루션',
      highlights: ['입주 / 이사 청소', '거주 대청소 & 부분 특수케어', '친환경 피톤치드 살균 서비스', '창틀·등기구·배수구 완전 분해 세척'],
      features: [
        '신축 아파트 벽면 도배풀, 시멘트 가루, 새집증후군 유발 물질 제거',
        '주방 상·하부장 선반, 걸레받이, 후드 필터 기름때 고온 스팀 박멸',
        '화장실 배수구, 환풍기 트랩 탈거 세척 및 타일 줄눈 물때 스케일링',
        '방충망, 창틀 4면 틈새 먼지, 유리창 얼룩 클리닝 (외창 제외)',
        '천장 조명 커버 탈거 먼지 제거 및 스위치, 콘센트 미세 세척',
      ],
      footerNote: '공간 면적 및 상태 맞춤 산출',
      cta: '홈클리닝 견적 신청',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    } as ServiceDetail,
    commercial: {
      id: 'commercial-cleaning',
      category: 'commercial',
      eyebrow: 'COMMERCIAL CLEANING',
      badge: '비즈니스 전문 마스터',
      title: '사업장 클리닝 (Commercial Cleaning)',
      description: '기업의 브랜드 가치와 임직원의 생산성을 극대화하는 프리미엄 오피스 & 상업 시설 전문 클리닝',
      highlights: ['사무실 정기 청소 & 주 1~5회 케어', '상가·카페 준공 및 오픈 전 대청소', '바닥 박리 및 고광택 왁스 코팅', '유리창·외벽·시스템 에어컨 세척'],
      features: [
        '업무에 지장 없는 심야/새벽/주말 맞춤 스케줄링 진행',
        '데스크탑 주변 먼지, 회의실 유리 파티션 지문 및 유막 제거',
        '대형 탕비실 싱크대 소독, 공용 공간 쓰레기 분리배출 관리',
        '고출력 폴리셔 바닥 때 세척 및 고경도 친환경 수지 왁스 시공',
        '세금계산서 100% 발행 및 월별 작업 보고서 리포트 제공',
      ],
      footerNote: '세금계산서 100% · 정기 관리',
      cta: '사업장 견적 신청',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    } as ServiceDetail,
  },

  // -----------------------------------------------------------------------
  // 6. 🛡️ 4대 안심 보증
  // -----------------------------------------------------------------------
  trust: {
    title: '프리미어 클린 4대 고객 안심 보증 서약제',
    subtitle: '파손·선금·A/S·추가금 우려를 법적·금전적으로 100% 사전 차단합니다',
    seal: '본사 직영 공식 보증',
  },
  trustBadges: [
    {
      id: 'insurance',
      badge: 'KB손해보험',
      title: '영업배상책임 5억 원 가입',
      subtitle: '시공 중 파손 시 100% 전액 보상',
      description: '작업 중 발생할 수 있는 가전·가구 파손, 마루 스크래치 사고에 대비해 KB손해보험 5억 원 영업배상책임보험에 정식 가입되어 있습니다.',
      iconName: 'ShieldCheck',
    },
    {
      id: 'postpay',
      badge: '선입금 0원',
      title: '100% 검수 후 안심 후불제',
      subtitle: '직접 눈으로 확인하시기 전까진 결제받지 않습니다',
      description: '선금을 과도하게 요구하거나 예약금을 강요하지 않습니다. 고객님이 현장에 직접 방문하여 1:1 동행 검수를 마친 후 만족하셨을 때 결제합니다.',
      iconName: 'HandCoins',
    },
    {
      id: 'warranty',
      badge: '끝까지 책임',
      title: '3일 이내 100% 무상 A/S',
      subtitle: '미흡한 곳 발견 시 무상 재방문 케어',
      description: '입주 후 미처 발견하지 못했던 미흡한 부분이 있다면 청소 완료일 기준 3일 이내 신청 시 담당 팀장이 즉시 무상 재방문 케어합니다.',
      iconName: 'RotateCcw',
    },
    {
      id: 'zero-extra',
      badge: '투명 정찰제',
      title: '식사비·수고비 일체 요구 0원',
      subtitle: '견적서 금액 외 부당 추가금 1원도 금지',
      description: '현장에서 기사 식대나 음료수, 부당한 추가 작업비를 절대 요구하지 않습니다. 사전에 확정된 견적 금액 그대로 정직하게 시공합니다.',
      iconName: 'Receipt',
    },
  ] as TrustBadgeItem[],

  // -----------------------------------------------------------------------
  // 7. ✨ 4대 시공 원칙
  // -----------------------------------------------------------------------
  about: {
    eyebrow: 'CRAFTSMANSHIP & CORE STANDARDS',
    title1: '프리미어 클린이 타협하지 않는',
    title2: '4가지 시공 원칙',
    description: '보이는 곳만 닦아서는 프리미어가 아닙니다. 기술과 원칙이 만드는 차이를 경험해 보세요.',
  },
  coreValues: [
    {
      id: 'direct-team',
      badge: '직영 100%',
      title: '100% 한국인 직영 마스터팀',
      subtitle: '하도급·외주 프리랜서 제로',
      description: '외주 용역이나 일용직 인력에 하청을 주지 않습니다. 본사 정규 아카데미 교육을 이수한 베테랑 한국인 정규 크루가 직접 현장을 책임집니다.',
      highlight: '본사 정규직 크루 100% 책임 시공',
      gradient: 'from-blue-600 to-indigo-600',
      border: 'border-blue-100 hover:border-blue-300',
      iconName: 'Users2',
    },
    {
      id: 'eco-equipment',
      badge: '친환경 케어',
      title: '독일 명품 장비 & 친환경 세제',
      subtitle: '영유아·반려동물 안심 케어 (락스 독성 0%)',
      description: '저가 독성 락스나 유독성화학약품을 일체 배제합니다. 독일 키엘(Kiehl) 친환경 생분해 세제와 카처 150℃ 고온 스팀으로 유해 세균을 멸균합니다.',
      highlight: '친환경 인증 세제 & 150℃ 고온 스팀',
      gradient: 'from-emerald-600 to-teal-600',
      border: 'border-emerald-100 hover:border-emerald-300',
      iconName: 'Leaf',
    },
    {
      id: 'full-disassembly',
      badge: '완전 탈거',
      title: '전 구역 100% 완전 분리 탈거',
      subtitle: '보이지 않는 숨은 공사 분진 완전 박멸',
      description: '눈에 보이는 곳만 닦는 수박 겉핥기 청소는 거부합니다. 싱크대 걸레받이, 전등갓, 수납장 서랍, 배수구, 환풍기까지 100% 탈거하여 미세 분진을 흡입합니다.',
      highlight: '서랍·전등·배수구·환풍기 100% 탈거 세척',
      gradient: 'from-indigo-600 to-sky-600',
      border: 'border-indigo-100 hover:border-indigo-300',
      iconName: 'Layers',
    },
    {
      id: 'live-briefing',
      badge: '실시간 소통',
      title: '1:1 실시간 현장 소통 & 동행 검수',
      subtitle: '청소 전·중·후 실시간 사진 전송 및 마감 브리핑',
      description: '작업 시작부터 각 구역별 청소 진행 상황을 카카오톡 실시간 사진으로 투명하게 공유해 드립니다. 시공 완료 후 1:1 동행 검수를 통해 고객 만족 시에만 퇴장합니다.',
      highlight: '실시간 사진 전송 & 1:1 동행 검수',
      gradient: 'from-purple-600 to-blue-600',
      border: 'border-purple-100 hover:border-purple-300',
      iconName: 'Camera',
    },
  ] as CoreValueItem[],

  // -----------------------------------------------------------------------
  // 8. 🧼 구역별 비포 & 애프터
  // -----------------------------------------------------------------------
  process: {
    eyebrow: 'BEFORE & AFTER SHOWCASE',
    title1: '결과로 증명하는',
    title2: '구역별 비포 & 애프터',
    description: '보이지 않는 구석과 찌든 때까지 복원하는 프리미어 클린의 실제 시공 전·후 현장입니다.',
    beforeButton: '시공 전 (BEFORE)',
    afterButton: '시공 후 (AFTER)',
    splitButton: '반반 비교',
    beforeLabel: 'BEFORE (시공 전 오염 상태)',
    afterLabel: 'AFTER (정밀 멸균 시공 완료)',
    hint: '상단 버튼을 눌러 시공 전/후를 비교해 보세요',
    directNote: '100% 직영팀 직접 시공',
    cta: '이 구역 맞춤 견적 문의',
  },
  cleaningManualZones: [
    {
      id: 'kitchen',
      zone: 'KITCHEN ZONE',
      title: '주방 딥클리닝 & 150℃ 고온 스팀',
      summary: '기름때와 탄화물을 완전 분해 세척하여 새 주방처럼 복원합니다.',
      beforeImage: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=80',
      afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      disassemblyTargets: ['렌지후드 금속 필터망', '가스레인지 화구 및 삼발이', '싱크대 하부 걸레받이(가림판)', '칼꽂이 및 배수구 트랩'],
      specialMethods: ['150℃ 산업용 고온 스팀 분사 멸균', '친환경 생분해 오븐/기름때 연마제', '싱크볼 물때 스케일링 및 수전 살균'],
      tag: '기름때·탄자국 박멸',
    },
    {
      id: 'bathroom',
      zone: 'BATHROOM ZONE',
      title: '욕실 멸균 케어 & 나노 유막 코팅',
      summary: '물때, 요석, 곰팡이 포자까지 뿌리 뽑는 위생 멸균 프로세스',
      beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      afterImage: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1200&q=80',
      disassemblyTargets: ['환풍기 겉커버 및 내부 모터팬', '바닥·세면대 배수구 유가 트랩', '샤워부스 물막이 패킹', '욕조 및 좌변기 틈새 커버'],
      specialMethods: ['고압 멸균 스팀 및 곰팡이 전용 박멸제', '수전/거울 미세 스크래치 없는 유막 제거', '타일 줄눈 스케일링 및 항균 피톤치드 코팅'],
      tag: '물때·곰팡이 0%',
    },
    {
      id: 'window',
      zone: 'WINDOW ZONE',
      title: '창호·샤시 4면 틈새 흙먼지 복원',
      summary: '외부 매연과 결로 찌든 때로 까맣게 변한 새시를 새집처럼 복원합니다.',
      beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      afterImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
      disassemblyTargets: ['창틀 레일 4면 틈새 완전 세척', '방충망 표면 고압 분진 제거', '실리콘 곰팡이 및 결로 자국'],
      specialMethods: ['샤시 레일 전용 틈새 고압 스팀 브러시', '친환경 유리 세정 유막 제거제', '풍지판 및 방충망 먼지 집진'],
      tag: '창틀 흙먼지 완벽 제거',
    },
    {
      id: 'storage',
      zone: 'STORAGE & LIGHT ZONE',
      title: '수납장 100% 완전 탈거 & 조명 커버',
      summary: '서랍 안쪽 보이지 않는 시멘트 가루와 톱밥 분진까지 완전 흡입합니다.',
      beforeImage: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
      afterImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      disassemblyTargets: ['붙박이장·신발장 모든 서랍 레일 탈거', '천장 조명 등기구 커버 탈거', '에어컨 필터망 분리', '콘센트 및 스위치 플레이트'],
      specialMethods: ['서랍 안쪽 시멘트/톱밥 분진 집진', '등기구 내부 날파리/미세먼지 제거', '친환경 천연 원목 케어제 도포'],
      tag: '서랍장 100% 완전 분리',
    },
    {
      id: 'floor-air',
      zone: 'FLOOR & AIR ZONE',
      title: '친환경 바닥 습식 세척 & 피톤치드 훈증',
      summary: '공사 잔여물을 제거하고 천연 피톤치드로 맑은 숲속 공기를 채웁니다.',
      beforeImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
      afterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      disassemblyTargets: ['걸레받이 상단 몰딩 도배풀 제거', '문틀 상하부 미세 분진', '바닥 모서리 실리콘 찌든때'],
      specialMethods: ['중성 친환경 바닥 습식 클리닝', '헤파필터 집진기를 통한 미세먼지 배출', '천연 편백 피톤치드 공간 훈증 서비스'],
      tag: '피톤치드 공간 멸균',
    },
  ] as CleaningManualZone[],

  // -----------------------------------------------------------------------
  // 9. 📸 인스타그램 (지금은 숨김 — visibility.instagram)
  // -----------------------------------------------------------------------
  instagram: {
    title1: '생생한 현장 실사,',
    title2: '공식 인스타그램 피드',
    description: '매일 업데이트되는 프리미어 클린 직영 마스터팀의 리얼 시공 과정과 비포&애프터 스토리를 만나보세요.',
    instagramMaxPosts: 1,
    posts: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        postUrl: 'https://www.instagram.com/premier_clean_official/',
        likes: 342,
        comments: 28,
        caption: '오늘도 반포자이 45평 입주청소 완료✨ 채광 들어오는 거실이 반짝입니다. #프리미어클린 #입주청소 #직영마스터',
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
        postUrl: 'https://www.instagram.com/premier_clean_official/',
        likes: 289,
        comments: 15,
        caption: '기름때 가득했던 주방 후드가 새것처럼 복원된 순간! 전문가용 고온 스팀의 위력🔥 #주방청소 #스팀세척',
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80',
        postUrl: 'https://www.instagram.com/premier_clean_official/',
        likes: 412,
        comments: 31,
        caption: '호텔 욕실처럼 뽀송뽀송하게🫧 물때 0% 도전 성공! #욕실청소 #줄눈케어 #피톤치드',
      },
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        postUrl: 'https://www.instagram.com/premier_clean_official/',
        likes: 198,
        comments: 12,
        caption: '판교 테크노밸리 공유오피스 정기관리 현장. 바닥 광택이 살아나니 업무 환경이 확 달라지네요🏢 #오피스청소',
      },
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
        postUrl: 'https://www.instagram.com/premier_clean_official/',
        likes: 256,
        comments: 19,
        caption: '창틀 흙먼지 한 톨 남기지 않는 꼼꼼함! 100% 한국인 직영팀의 자부심입니다💪 #청소전문가',
      },
      {
        id: 6,
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
        postUrl: 'https://www.instagram.com/premier_clean_official/',
        likes: 387,
        comments: 24,
        caption: '고객님의 새 출발을 응원하는 마음으로. 오늘도 정성을 다해 닦아냅니다🙏 #프리미어클린 #고객만족',
      },
    ] as InstagramPost[],
  },

  // -----------------------------------------------------------------------
  // 10. ⭐ 시공 후기 섹션 글자 (후기 내용 자체는 관리자 페이지 [시공 후기]에서 올립니다)
  // -----------------------------------------------------------------------
  reviewsSection: {
    eyebrow: 'REAL VERIFIED CUSTOMER REVIEWS',
    title1: '결과로 증명하는',
    title2: '실제 고객 시공 후기',
    description: '100% 한국인 직영 마스터팀이 현장에서 직접 시공하고 고객님과 동행 검수를 마친 실제 후기입니다.',
    ratingText: '고객 평점 4.98 / 5.0 만점 기준',
    carouselBadge: '실시간 고객 검증 평가',
    carouselTitle: '고객님들이 직접 증명하는 프리미어 클린의 품격',
    photoBadge: '시공 후 현장 실사',
    photoEyebrow: 'ACTUAL WORK AFTER',
    verifiedBadge: '직영 검수 완료',
    pauseHint: '마우스를 올리거나 터치하면 자동 넘김이 일시 정지됩니다',
    noPhoto: '현장 실사 사진',
  },
  // 관리자 페이지에서 후기를 하나도 올리지 않았을 때 대신 보이는 예시 후기
  reviews: [
    {
      id: 'rev-1',
      author: '김*현 고객님',
      location: '서울 서초구 반포자이 (34평)',
      serviceType: '신축 입주청소',
      rating: 5,
      content: '싱크대 하부장 걸레받이 안쪽이랑 등기구까지 탈거해서 공사 분진 싹 닦아주신 거 보고 감동했습니다. 피톤치드 향도 너무 산뜻해요!',
      date: '2026.10.12',
      beforeImage: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
      verified: true,
    },
    {
      id: 'rev-2',
      author: '이*진 대표님',
      location: '성남 분당구 IT벤처사무실 (65평)',
      serviceType: '사업장 정기/오픈청소',
      rating: 5,
      content: '사무실 이전하고 바닥 타일 왁스코팅 의뢰드렸는데 출근하자마자 새 건물 온 것 같다고 직원들이 너무 좋아하네요. 냄새도 전혀 없습니다.',
      date: '2026.10.08',
      beforeImage: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      verified: true,
    },
    {
      id: 'rev-3',
      author: '박*서 고객님',
      location: '경기 하남시 미사강변 (28평)',
      serviceType: '이사 청소 & 곰팡이 케어',
      rating: 5,
      content: '화장실 줄눈 물때와 베란다 결로 곰팡이가 심했는데 새집처럼 하얗게 복원되었습니다. 한국인 팀장님이 꼼꼼히 설명해주셔서 안심이었습니다.',
      date: '2026.09.29',
      beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80',
      verified: true,
    },
    {
      id: 'rev-4',
      author: '정*우 고객님',
      location: '인천 연수구 송도더샵 (45평)',
      serviceType: '프리미엄 입주 마스터케어',
      rating: 5,
      content: '전문가용 고온 스팀 장비로 멸균해주시고 수납장 하나하나 탈거 청소해주시는 모습에 프리미엄 가치를 제대로 느꼈습니다.',
      date: '2026.09.18',
      beforeImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
      verified: true,
    },
  ] as ReviewItem[],

  // -----------------------------------------------------------------------
  // 11. 📝 견적 신청 칸
  // -----------------------------------------------------------------------
  contactSection: {
    eyebrow: 'FAST QUOTE & CONSULTATION',
    title1: '1:1 무료 맞춤 견적 및',
    title2: '작업 요청',
    centerLabel: '고객 상담 센터',
    phoneTitle: '전화 직통 상담',
    hoursPrefix: '상담 시간:',
    smsNote: '문자 상담 및 야간 접수 가능 (순차 회신)',
    asNote: '100% 무료 A/S 보장 (3일 이내 무상 재방문)',
    stepsTitle: '견적 및 시공 진행 순서',
    steps: [
      { title: '온라인 견적 접수', description: '폼 작성 후 30분 내 유선/카톡 전문 상담' },
      { title: '예약 확정 및 배정', description: '지역별 100% 한국인 직영 마스터팀 배정' },
      { title: '시공 및 현장 동행 검수', description: '전문가용 안심 장비 시공 후 고객 직접 확인' },
    ],
    typeLabel: '서비스 유형 선택',
    typeHome: '홈클리닝 (입주/이사/거주)',
    typeCommercial: '사업장 (사무실/상가)',
    sizeLabel: '공간 면적 / 평수',
    sizes: ['원룸/투룸 (15평 이하)', '20평형대 (20~29평)', '30평형대 (30~39평)', '40평형대 이상 (40평~)', '사무실 / 상업 매장'],
    nameLabel: '고객명 / 업체명',
    namePlaceholder: '홍길동',
    phoneLabel: '연락처',
    phonePlaceholder: '010-1234-5678',
    dateLabel: '희망 시공 일자 (선택)',
    messageLabel: '문의 내용 및 요청사항',
    messagePlaceholder: '상세 위치(아파트명 또는 상가 위치), 특이사항(곰팡이, 스티커 제거, 인테리어 분진 등)을 적어주시면 더욱 정밀한 견적이 가능합니다.',
    submit: '1분 만에 안심 맞춤 견적 신청하기',
    submitting: '견적 요청 전송 중...',
    footnote: '※ 100% A/S 보장을 위해 청소일 기준 3일 이내 계약 범위 촬영 사진이 필요합니다.',
    errorName: '고객명(또는 업체명)을 입력해 주세요.',
    errorPhone: '올바른 연락처 번호(9~11자리 숫자)를 입력해 주세요. 예: 010-1234-5678',
  },

  // -----------------------------------------------------------------------
  // 12. ❓ 자주 묻는 질문
  // -----------------------------------------------------------------------
  faqSection: {
    eyebrow: 'FREQUENTLY ASKED QUESTIONS',
    title1: '자주 묻는 질문,',
    title2: '속 시원하게 답해 드립니다',
    description: '청소 업체를 선택하실 때 가장 불안하고 궁금해하시는 질문들을 모았습니다. 투명하고 정직하게 안내해 드립니다.',
    helpEyebrow: '실시간 1:1 상담 안내',
    helpTitle: '더 궁금한 점이 있으신가요?',
    helpDescription: '전문 상담 매니저가 공간 상황에 맞춰 친절하고 정직하게 1분 내로 답변드립니다.',
    kakaoButton: '카톡 1:1 상담',
  },
  faqList: [
    {
      id: 'faq-1',
      category: '견적/요금',
      question: '청소 당일 현장에서 임의로 추가 요금이 발생할 수 있나요?',
      answer: '프리미어 클린은 정직한 정찰제 상담을 원칙으로 합니다. 고객님과의 사전 상담 시 안내해 드린 범위를 벗어나 일방적으로 추가 요금을 요구하지 않습니다. 단, 사전 고지되지 않은 복층 다락방, 비확장 베란다 다수, 심각한 결로 곰팡이나 시트지 제거 등 특수 케어가 필요한 경우 반드시 고객님께 상태를 보여드리고 사전 동의를 구한 후에만 합리적으로 협의하여 진행합니다.',
    },
    {
      id: 'faq-2',
      category: '안심/보상',
      question: '작업 중에 혹시 기물 파손이나 스크래치가 생기면 어떻게 보상되나요?',
      answer: '프리미어 클린은 KB손해보험 영업배상책임보험 5억 원에 정식 가입되어 있습니다. 만에 하나 시공 과정에서 시설물이나 자재에 문제가 발생할 경우 본사 전담 매니저가 즉시 보험 접수 및 원상복구 처리를 신속하고 책임 있게 진행해 드립니다.',
    },
    {
      id: 'faq-3',
      category: '검수/결제',
      question: '결제는 선불인가요? 만족하지 못했을 때는 어떻게 하나요?',
      answer: '과도한 선금을 요구하지 않습니다. 청소가 완료되기 약 30분~1시간 전에 고객님께 연락을 드리며, 현장에서 팀장과 함께 체크리스트를 보며 1:1 동행 검수를 진행합니다. 모든 공간의 청결 상태를 직접 확인하시고 100% 만족하셨을 때 후불로 결제하시면 됩니다.',
    },
    {
      id: 'faq-4',
      category: '시공/소요시간',
      question: '청소하는 동안 제가 계속 현장에 지켜보고 있어야 하나요?',
      answer: '청소 내내 현장에 머무르실 필요가 전혀 없습니다. 작업 시작 시 전달하실 특이사항만 공유해 주시면 되며, 청소가 끝날 무렵 팀장이 사전 연락을 드리니 종료 시 최종 동행 검수에만 참석해 주시면 됩니다. 원하시는 경우 작업 중간 주요 탈거 부위 사진을 메신저로 전송해 드립니다.',
    },
    {
      id: 'faq-5',
      category: '시공/소요시간',
      question: '기사님들 식사비나 음료수를 따로 챙겨드려야 하나요?',
      answer: '절대 챙겨주실 필요가 없습니다! 프리미어 클린은 본사 정규 직영팀으로 운영되며 식사비나 간식, 수고비 명목의 일체 금품을 요구하거나 받지 않는 엄격한 본사 윤리 규정을 준수합니다. 마음만 감사히 받겠습니다.',
    },
    {
      id: 'faq-6',
      category: '안심/보상',
      question: '검수 후 뒤늦게 미흡한 부분을 발견하면 A/S가 가능한가요?',
      answer: '네, 100% 가능합니다. 이사 짐이 들어오거나 거주하시면서 미처 발견하지 못했던 미흡한 곳이 있다면 청소 완료일 기준 3일 이내에 연락해 주시면 전담 팀장이 신속히 무상 재방문하여 깔끔하게 재케어해 드립니다.',
    },
  ] as FaqItem[],

  // -----------------------------------------------------------------------
  // 13. 맨 위 메뉴 줄
  // -----------------------------------------------------------------------
  header: {
    logoMain: 'PREMIER',
    logoAccent: 'CLEAN',
    logoSub: '프리미어 클린 · 직영 마스터케어',
    nav: [
      { name: '회사소개', href: '#about' },
      { name: '구역별 정밀공정', href: '#process' },
      { name: '서비스 안내', href: '#services' },
      { name: '작업 후기', href: '#reviews' },
      { name: '자주 묻는 질문', href: '#faq' },
      { name: '무료 견적문의', href: '#contact' },
    ],
    phoneSuffix: '(상담 직통)',
    desktopCta: '무료 견적 받기',
    mobileCta: '견적문의',
    mobileNotice: '100% 한국인 직영팀 · 100% 무료 A/S 보장',
    mobilePhonePrefix: '전화 상담',
    mobileQuote: '빠른 무료 견적 신청하기',
  },

  // -----------------------------------------------------------------------
  // 14. 맨 아래 회사 정보
  // -----------------------------------------------------------------------
  footer: {
    description: '프리미어 클린은 100% 한국인 직영 마스터팀으로 운영되는 프리미엄 청소 전문 기업입니다. 타협 없는 시공과 공인된 친환경 기술로 새로운 주거·업무 환경의 기준을 만듭니다.',
    quickTitle: '바로가기',
    quickLinks: [
      { name: '회사소개 및 핵심가치', href: '#about' },
      { name: '구역별 완전 탈거공정', href: '#process' },
      { name: '홈클리닝 & 사업장 서비스', href: '#services' },
      { name: '비포 & 애프터 작업후기', href: '#reviews' },
      { name: '자주 묻는 질문 (FAQ)', href: '#faq' },
      { name: '1:1 맞춤 견적 신청', href: '#contact' },
    ],
    contactTitle: '고객센터 & 상담 문의',
    copyright: '© 2026 PREMIER CLEAN. All rights reserved.',
  },

  // -----------------------------------------------------------------------
  // 15. 휴대폰 아래 고정 버튼 & 컴퓨터 화면 카톡 버튼
  // -----------------------------------------------------------------------
  mobileBar: {
    phone: '전화 상담',
    kakao: '카톡 1:1',
    quote: '견적 신청',
    kakaoTooltip: '실시간 1:1 카톡 상담',
  },

  // -----------------------------------------------------------------------
  // 16. 외부 연동 (이메일 알림 — 맨 마지막에 연결 예정)
  // -----------------------------------------------------------------------
  integrations: {
    emailjs: {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
    },
  },
};

export type SiteContent = Omit<typeof siteConfig, 'integrations'>;

/** 관리자 페이지가 저장·수정하는 부분 (integrations 는 비밀 값이라 제외) */
export function defaultContent(): SiteContent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { integrations, ...content } = siteConfig;
  return structuredClone(content);
}
