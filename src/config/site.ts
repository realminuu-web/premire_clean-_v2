import {
  TrustBadgeItem,
  CoreValueItem,
  CleaningManualZone,
  FaqItem,
  ReviewItem,
  InstagramPost,
  SectionId,
} from '@/types';

/**
 * =========================================================================
 * 🌟 [프리미어 클린] 중앙 통합 설정 파일 (Site Configuration)
 * =========================================================================
 * 💡 관리자 안내:
 * 개발을 전혀 모르셔도 괜찮습니다!
 * 전화번호, 사진 링크, 카카오톡/인스타 주소, 사업자 정보, 안심 보증 문구,
 * 4대 약속, 청소 공정 내용, 인스타그램 사진 개수, 관리자 비밀번호 등
 * 홈페이지의 모든 것을 이 파일 하나에서 따옴표(' ') 안의 글자나 숫자만 바꾸시면 됩니다.
 */

export const siteConfig = {
  // -----------------------------------------------------------------------
  // 0. 📑 홈페이지 섹션 배치 순서 (원하는 순서대로 줄만 바꾸면 즉시 화면에 반영!)
  // 사용 가능한 섹션 ID:
  // - 'hero'        : 메인 상단 배너 & 실적 통계
  // - 'services'    : 홈클리닝 & 상업공간 50:50 듀얼 마스터 케어
  // - 'trustBadges' : 4대 안심 보증 배지 (KB 5억 보험 / 후불제 / 3일 A/S)
  // - 'process'     : 구역별 비포·애프터(Before & After) 시공 갤러리
  // - 'about'       : 브랜드 핵심 가치 및 100% 직영 원칙
  // - 'reviews'     : 실제 고객 검수 후기 (리뷰 캐러셀)
  // - 'instagram'   : 공식 인스타그램 현장 스토리 피드
  // - 'contact'     : 1:1 맞춤 견적 신청 폼
  // - 'faq'         : 자주 묻는 질문 (FAQ 아코디언)
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
  // 2. 고객센터 및 연락처 정보 (전화번호/카톡 바꿀 때 여기서 수정!)
  // -----------------------------------------------------------------------
  contact: {
    phone: '1800-0000',                                                               // 대표 전화번호 (화면 표시용)
    phoneTel: 'tel:1800-0000',                                                        // 전화 걸기 링크
    operatingHours: '매일 08:00 ~ 21:00 (연중무휴)',
    email: 'contact@premierclean.co.kr',
    kakaoChatUrl: process.env.NEXT_PUBLIC_KAKAO_CHAT_URL || 'https://open.kakao.com', // 카카오톡 1:1 상담 링크
    instagramUrl: 'https://instagram.com',                                            // 공식 인스타그램 링크
    instagramHandle: 'premierclean_official',                                         // 인스타그램 계정 아이디
    formSubtitle: '원하시는 공간과 일정에 맞춰 최적의 맞춤 견적을 1분 만에 신속히 1:1 안내해 드립니다.', // 견적 폼 서브타이틀
  },

  // -----------------------------------------------------------------------
  // 3. 회사 및 사업자 등록 정보 (웹사이트 맨 아래 Footer에 표시)
  // -----------------------------------------------------------------------
  company: {
    corporateName: '(주)프리미어클린마스터',
    ceo: '김대표',
    businessNumber: '123-85-67890',
    telecomSalesNumber: '2026-서울강남-0123호',
    address: '서울특별시 강남구 테헤란로 152 강남파이낸스센터 18층',
    trainingCenter: '경기 용인시 기흥구 기술연수원',
    privacyOfficer: '최관리',
    insuranceNotice: 'KB손해보험 영업배상책임보험 5억 원 가입 공식 인증 업체',
  },

  // -----------------------------------------------------------------------
  // 3-1. 🌐 검색엔진 최적화(SEO), 카톡 썸네일 및 도메인 설정
  // 💡 관리자 안내: 도메인 구매 후 'siteUrl'만 변경하시고,
  // 네이버/구글 서치콘솔에서 받은 인증키를 아래 'naverVerification'에 넣으시면 끝납니다!
  // -----------------------------------------------------------------------
  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://premierclean.co.kr', // 대표 도메인 주소
    title: '프리미어 클린 (Premier Clean) | 100% 직영 프리미엄 청소 전문',
    description: '눈에 보이지 않는 곳까지 완벽하게, 프리미어 클린이 기준을 만듭니다. KB손해보험 5억 보증, 100% 한국인 직영팀, 전액 후불제, 3일 이내 무상 A/S 입주·이사·사무실 청소 전문.',
    keywords: [
      '프리미어클린',
      '입주청소',
      '이사청소',
      '사무실청소',
      '상가청소',
      '아파트입주청소',
      '오피스텔청소',
      '친환경청소',
      '피톤치드',
      '입주청소업체',
      '이사청소업체',
      '청소전문업체',
    ],
    // 네이버 서치어드바이저 & 구글 서치콘솔 소유권 확인 태그
    naverVerification: '',  // 예: 'naver1234567890abcdef' 입력 시 자동 적용
    googleVerification: '', // 예: 'google1234567890abcdef' 입력 시 자동 적용
  },

  // -----------------------------------------------------------------------
  // 4. 메인 화면 상단(Hero) 배경 사진 및 실적 수치
  // -----------------------------------------------------------------------
  hero: {
    backgroundImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85',
    completedCleanCount: '12,840',     // 지금까지 진행한 청소 건수
    ratingScore: '4.98',              // 고객 만족도 평점 (5.0 만점)
    satisfactionRate: '99%',           // 만족도 퍼센트
    activeTeamsToday: '24',            // 오늘 출동 중인 직영팀 수
  },

  // -----------------------------------------------------------------------
  // 5. 🛡️ 고객 보호 4대 안심 보증 서약 (Trust Badges / 공식 보증 바)
  // (사기·바가지·파손·A/S 불이행 등 고객의 불안 요소를 법적·금전적으로 100% 차단합니다)
  // -----------------------------------------------------------------------
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
  // 6. ✨ 프리미어 클린이 타협하지 않는 4대 장인 시공 원칙 (About 섹션)
  // (일반 청소와 차별화되는 사람·세제·탈거공정·실시간 소통의 4대 기술 기준)
  // -----------------------------------------------------------------------
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
  // 7. 🧼 구역별 정밀 공정 매뉴얼 + 비포 & 애프터(Before & After) 슬라이더 통합
  // (각 구역의 시공 전/후 사진과 탈거 부위, 멸균 기술을 한곳에서 수정합니다!)
  // -----------------------------------------------------------------------
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
  // 8. 📸 인스타그램 섹션 설정 (1개~6개 조절 & 다이렉트 링크 & 큐레이션)
  // -----------------------------------------------------------------------
  // 💡 [개발 & 마케팅 전문가 분석: 인스타 API 연동 vs 직접 선별 등록 비교]
  // 1) 공식 API 연동 방식:
  //    - 인스타그램(메타) 공식 API는 60일마다 보안 토큰이 만료되어 주기적으로 사이트가 멈추거나 사진이 엑박으로 깨집니다.
  //    - 직원이 점심 먹은 사진, 잡담 스토리 등을 올리면 홈페이지 메인에 여과 없이 노출되는 치명적 문제가 있습니다.
  // 2) 직접 선별 등록 방식 (현재 적용된 최고 효율 방식):
  //    - 사장님이 가장 자랑하고 싶은 최고 품질의 시공 화보(비포/애프터)만 딱 골라서 메인에 진열합니다.
  //    - 사진 클릭 시 고객이 해당 실제 인스타그램 게시물로 1초 만에 바로 넘어가며, 오류 발생률 0%를 자랑합니다.
  //    - 좋아요/댓글 수도 사장님이 원하는 숫자로 입력 가능하여 고객 신뢰도와 마케팅 효과가 극대화됩니다!
  instagram: {
    // 💡 [사진 노출 개수 조절]: 
    // - 1: 대표 사진 1장만 화보형으로 큼직하고 웅장하게 강조 (강력 추천!)
    // - 2, 3, 4, 6: 원하는 숫자만큼 나란히 격자(Grid)로 정돈되어 표시됩니다.
    instagramMaxPosts: 1,

    // 인스타그램 사진 및 캡션 목록 (위에서 설정한 개수만큼 메인에 순서대로 노출됩니다)
    posts: [
      {
        id: 1,
        // 사진 링크 (인터넷 이미지 주소나 업로드한 사진 주소)
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
        // 사진 클릭 시 이동할 실제 인스타그램 게시물 주소 (비워두면 대표 인스타 프로필로 이동)
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
  // 9. ⭐ 실제 고객 시공 후기 캐러셀 데이터
  // -----------------------------------------------------------------------
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
  // 10. ❓ 자주 묻는 질문 (FAQ 아코디언 데이터)
  // -----------------------------------------------------------------------
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
  // 11. 🔑 관리자 비밀번호 및 외부 연동 설정
  // -----------------------------------------------------------------------
  integrations: {
    // 💡 [관리자 비밀번호]: 햄버거 메뉴나 푸터의 [관리자 모드]를 누르고
    // 후기를 등록할 때 입력하는 비밀번호입니다. 원하는 비밀번호로 변경하세요! (기본: '0000')
    adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '0000',

    // Supabase DB 연동 (후기 저장소)
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    },

    // EmailJS 연동 (고객 견적 신청 시 사장님 이메일 알림 푸시)
    emailjs: {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
    },
  },
};
