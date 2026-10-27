/**
 * 관리자 페이지 [문구 수정] 칸 목록.
 * 각 칸이 홈페이지 어디에 보이는 글자인지(loc)를 함께 적어 둡니다.
 * path 는 site.ts 안의 위치입니다 (예: 'hero.title').
 */

export type FieldKind = 'text' | 'textarea' | 'image' | 'lines';

export type Field = {
  path: string;
  label: string;
  loc: string;
  kind?: FieldKind;
};

export type ItemsField = {
  kind: 'items';
  path: string;
  label: string;
  loc: string;
  itemName: string; // "보증 1", "질문 2" 처럼 붙는 이름
  fields: Field[]; // 각 항목 안의 칸 (path 는 항목 기준)
  addable?: boolean;
  template?: Record<string, unknown>;
};

export type EditorGroup = {
  id: string;
  title: string;
  anchor: string; // 홈페이지에서 보기 (#services 등)
  note?: string;
  items: (Field | ItemsField)[];
};

const svc = (key: 'home' | 'commercial', name: string): Field[] => [
  { path: `services.${key}.image`, label: `${name} 사진`, loc: `📍 ${name} 칸 맨 위 큰 사진`, kind: 'image' },
  { path: `services.${key}.badge`, label: `${name} 사진 위 꼬리표`, loc: `📍 ${name} 사진 왼쪽 위 파란 둥근 글자` },
  { path: `services.${key}.eyebrow`, label: `${name} 사진 아래 작은 영문`, loc: `📍 ${name} 사진 왼쪽 아래, 제목 바로 위 하늘색 작은 글자` },
  { path: `services.${key}.title`, label: `${name} 제목`, loc: `📍 ${name} 사진 왼쪽 아래 흰 큰 글씨` },
  { path: `services.${key}.description`, label: `${name} 설명`, loc: `📍 ${name} 사진 바로 아래 회색 문단`, kind: 'textarea' },
  { path: `services.${key}.highlights`, label: `${name} 케어 영역 (한 줄에 하나)`, loc: `📍 "주요 케어 영역" 아래 파란 둥근 칩들`, kind: 'lines' },
  { path: `services.${key}.features`, label: `${name} 체크포인트 (한 줄에 하나)`, loc: `📍 "시공 핵심 체크포인트" 아래 ✓ 목록`, kind: 'lines' },
  { path: `services.${key}.footerNote`, label: `${name} 아래쪽 작은 안내`, loc: `📍 ${name} 칸 맨 아래 왼쪽 회색 글자 (컴퓨터 화면)` },
  { path: `services.${key}.cta`, label: `${name} 견적 버튼`, loc: `📍 ${name} 칸 맨 아래 오른쪽 버튼 (컴퓨터 화면)` },
];

export const editorGroups: EditorGroup[] = [
  {
    id: 'header',
    title: '맨 위 메뉴 줄',
    anchor: '#hero',
    items: [
      { path: 'header.logoMain', label: '로고 글자 (앞)', loc: '📍 화면 맨 왼쪽 위, 파란 아이콘 옆 큰 글자의 앞부분 (예: PREMIER)' },
      { path: 'header.logoAccent', label: '로고 글자 (뒤, 파란색)', loc: '📍 로고 글자 뒷부분, 파란색으로 보이는 부분 (예: CLEAN)' },
      { path: 'header.logoSub', label: '로고 아래 작은 설명', loc: '📍 로고 글자 바로 밑 작은 글씨 (컴퓨터·태블릿 화면에서만 보임)' },
      {
        kind: 'items',
        path: 'header.nav',
        label: '메뉴 이름',
        loc: '📍 컴퓨터 화면 맨 위 가운데 메뉴, 휴대폰은 ☰ 버튼을 누르면 나오는 목록',
        itemName: '메뉴',
        fields: [{ path: 'name', label: '메뉴 이름', loc: '' }],
      },
      { path: 'header.phoneSuffix', label: '전화번호 옆 설명', loc: '📍 컴퓨터 화면 오른쪽 위 전화번호 뒤 괄호 글자' },
      { path: 'header.desktopCta', label: '오른쪽 위 견적 버튼 (컴퓨터)', loc: '📍 컴퓨터 화면 오른쪽 위 파란 버튼' },
      { path: 'header.mobileCta', label: '오른쪽 위 견적 버튼 (휴대폰)', loc: '📍 휴대폰 화면 오른쪽 위 ☰ 옆 작은 버튼' },
      { path: 'header.mobileNotice', label: '휴대폰 메뉴 맨 위 안내', loc: '📍 휴대폰에서 ☰ 를 누르면 맨 위에 나오는 파란 띠 글자' },
      { path: 'header.mobilePhonePrefix', label: '휴대폰 메뉴 전화 버튼 앞 글자', loc: '📍 휴대폰 ☰ 메뉴 아래쪽 흰 전화 버튼 (뒤에 전화번호가 붙음)' },
      { path: 'header.mobileQuote', label: '휴대폰 메뉴 견적 버튼', loc: '📍 휴대폰 ☰ 메뉴 맨 아래 파란 버튼' },
    ],
  },
  {
    id: 'hero',
    title: '첫 화면',
    anchor: '#hero',
    items: [
      { path: 'hero.backgroundImage', label: '첫 화면 사진', loc: '📍 홈페이지를 열면 화면을 가득 채우는 사진. 가로로 넓은 사진이 좋습니다', kind: 'image' },
      { path: 'hero.title', label: '큰 제목 (슬로건)', loc: '📍 첫 화면 왼쪽 아래 가장 큰 흰 글씨. 쉼표(,) 뒤에서 줄이 바뀝니다', kind: 'textarea' },
      { path: 'hero.highlight', label: '제목 안 파란 강조 글자', loc: '📍 큰 제목 안에서 하늘색으로 칠할 글자. 제목에 들어 있는 글자 그대로 적으세요' },
      { path: 'hero.primaryCta', label: '파란 버튼 글자', loc: '📍 큰 제목 아래 왼쪽 파란 버튼 (누르면 견적 신청 칸으로 이동)' },
      { path: 'hero.secondaryCta', label: '흰 테두리 버튼 글자', loc: '📍 파란 버튼 오른쪽 버튼 (누르면 시공 후기로 이동)' },
      { path: 'hero.countLabel', label: '누적 시공 설명', loc: '📍 컴퓨터: 오른쪽 아래 큰 숫자 위 / 휴대폰: 제목 아래 숫자 앞' },
      { path: 'hero.completedCleanCount', label: '누적 시공 건수', loc: '📍 컴퓨터: 오른쪽 아래 큰 숫자 / 휴대폰: 제목 아래 숫자 (쉼표 포함해 적으세요. 예: 12,840)' },
      { path: 'hero.countUnit', label: '건수 단위', loc: '📍 누적 시공 숫자 바로 뒤 작은 글자 (예: 건)' },
    ],
  },
  {
    id: 'services',
    title: '서비스 소개',
    anchor: '#services',
    items: [
      { path: 'services.title1', label: '제목 첫 줄', loc: '📍 서비스 섹션 맨 위 큰 검은 글씨' },
      { path: 'services.title2', label: '제목 둘째 줄 (파란색)', loc: '📍 서비스 섹션 맨 위 큰 파란 글씨' },
      { path: 'services.description', label: '제목 아래 설명', loc: '📍 서비스 섹션 제목 아래 회색 문단', kind: 'textarea' },
      { path: 'services.tabHome', label: '휴대폰 탭: 홈클리닝', loc: '📍 휴대폰 화면 서비스 제목 아래 왼쪽 탭 버튼' },
      { path: 'services.tabCommercial', label: '휴대폰 탭: 사업장', loc: '📍 휴대폰 화면 서비스 제목 아래 오른쪽 탭 버튼' },
      { path: 'services.areasLabel', label: '"주요 케어 영역" 제목', loc: '📍 각 서비스 칸 안, 둥근 칩들 바로 위 작은 제목' },
      { path: 'services.checkLabel', label: '"시공 핵심 체크포인트" 제목', loc: '📍 각 서비스 칸 안, ✓ 목록 바로 위 작은 제목' },
      { path: 'services.mobileNote', label: '휴대폰 칸 아래 안내', loc: '📍 휴대폰 화면 서비스 칸 맨 아래 버튼 위 작은 글자' },
      { path: 'services.mobileCta', label: '휴대폰 칸 아래 버튼', loc: '📍 휴대폰 화면 서비스 칸 맨 아래 파란 버튼' },
      ...svc('home', '홈클리닝'),
      ...svc('commercial', '사업장 클리닝'),
    ],
  },
  {
    id: 'trust',
    title: '4대 안심 보증',
    anchor: '#trust',
    items: [
      { path: 'trust.title', label: '보증 띠 제목', loc: '📍 안심 보증 띠 맨 왼쪽 위 굵은 글씨 (방패 아이콘 옆)' },
      { path: 'trust.subtitle', label: '보증 띠 설명', loc: '📍 보증 띠 제목 오른쪽 회색 글자 (컴퓨터 화면에서만 보임)' },
      { path: 'trust.seal', label: '초록 인증 표시', loc: '📍 보증 띠 오른쪽 위 초록색 둥근 글자' },
      {
        kind: 'items',
        path: 'trustBadges',
        label: '보증 4가지',
        loc: '📍 보증 띠 아래 네 칸 (컴퓨터는 가로 한 줄, 휴대폰은 위아래로)',
        itemName: '보증',
        fields: [
          { path: 'badge', label: '파란 꼬리표', loc: '칸 맨 위 작은 파란 상자 글자' },
          { path: 'title', label: '제목', loc: '꼬리표 옆 굵은 글씨' },
          { path: 'subtitle', label: '파란 한 줄', loc: '제목 아래 파란 글씨' },
          { path: 'description', label: '설명', loc: '맨 아래 회색 글씨 (컴퓨터·태블릿에서만 보임)', kind: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'process',
    title: '구역별 비포 · 애프터',
    anchor: '#process',
    items: [
      { path: 'process.title1', label: '제목 첫 줄', loc: '📍 섹션 맨 위 큰 검은 글씨' },
      { path: 'process.title2', label: '제목 둘째 줄 (파란색)', loc: '📍 섹션 맨 위 큰 파란 글씨' },
      { path: 'process.description', label: '제목 아래 설명', loc: '📍 제목 아래 회색 문단', kind: 'textarea' },
      { path: 'process.beforeButton', label: '"시공 전" 버튼', loc: '📍 사진 위 오른쪽 세 버튼 중 첫째' },
      { path: 'process.afterButton', label: '"시공 후" 버튼', loc: '📍 사진 위 오른쪽 세 버튼 중 둘째' },
      { path: 'process.splitButton', label: '"반반 비교" 버튼', loc: '📍 사진 위 오른쪽 세 버튼 중 셋째' },
      { path: 'process.beforeLabel', label: '시공 전 사진 위 표시', loc: '📍 "시공 전"을 누르면 사진 왼쪽 위에 뜨는 검은 상자 글자' },
      { path: 'process.afterLabel', label: '시공 후 사진 위 표시', loc: '📍 "시공 후"를 누르면 사진 오른쪽 위에 뜨는 파란 상자 글자' },
      { path: 'process.hint', label: '사진 아래 안내', loc: '📍 사진 맨 아래 가운데 검은 반투명 글자' },
      { path: 'process.directNote', label: '버튼 옆 작은 안내', loc: '📍 사진 아래 오른쪽, 견적 버튼 왼쪽 작은 글자 (컴퓨터 화면)' },
      { path: 'process.cta', label: '견적 버튼', loc: '📍 사진 아래 오른쪽 파란 버튼' },
      {
        kind: 'items',
        path: 'cleaningManualZones',
        label: '구역 5곳',
        loc: '📍 제목 아래 구역 버튼(주방·욕실…)을 누르면 바뀌는 사진과 설명',
        itemName: '구역',
        fields: [
          { path: 'title', label: '구역 제목', loc: '사진 아래 굵은 제목. "&" 앞부분은 구역 버튼 이름으로도 쓰입니다' },
          { path: 'summary', label: '구역 설명', loc: '구역 제목 아래 회색 글씨', kind: 'textarea' },
          { path: 'tag', label: '파란 꼬리표', loc: '사진 위 왼쪽 파란 둥근 글자' },
          { path: 'zone', label: '영문 구역 이름', loc: '파란 꼬리표 옆 회색 글자 (예: KITCHEN ZONE)' },
          { path: 'beforeImage', label: '시공 전 사진', loc: '"시공 전"을 누르면 보이는 사진', kind: 'image' },
          { path: 'afterImage', label: '시공 후 사진', loc: '처음 보이는 사진 ("시공 후")', kind: 'image' },
        ],
      },
    ],
  },
  {
    id: 'about',
    title: '4대 시공 원칙',
    anchor: '#about',
    items: [
      { path: 'about.title1', label: '제목 앞부분', loc: '📍 섹션 큰 제목의 검은 부분' },
      { path: 'about.title2', label: '제목 뒷부분 (파란색)', loc: '📍 섹션 큰 제목의 파란 부분' },
      { path: 'about.description', label: '제목 아래 설명', loc: '📍 제목 아래 회색 문단', kind: 'textarea' },
      {
        kind: 'items',
        path: 'coreValues',
        label: '원칙 4가지',
        loc: '📍 컴퓨터: 가로 네 칸 / 휴대폰: 버튼을 눌러 바꿔 보는 칸',
        itemName: '원칙',
        fields: [
          { path: 'badge', label: '작은 꼬리표', loc: '칸 오른쪽 위 둥근 글자 (휴대폰은 위쪽 버튼 이름)' },
          { path: 'title', label: '제목', loc: '칸 안 굵은 제목' },
          { path: 'subtitle', label: '파란 한 줄', loc: '제목 아래 파란 글씨' },
          { path: 'description', label: '설명', loc: '파란 한 줄 아래 회색 문단', kind: 'textarea' },
          { path: 'highlight', label: '맨 아래 ✓ 글자', loc: '칸 맨 아래 초록 체크 옆 글자' },
        ],
      },
    ],
  },
  {
    id: 'reviews',
    title: '시공 후기 (제목·안내 글자)',
    anchor: '#reviews',
    note: '후기 내용과 사진은 왼쪽 [시공 후기] 메뉴에서 올립니다. 여기는 후기 칸 주변 글자입니다.',
    items: [
      { path: 'reviewsSection.title1', label: '제목 앞부분', loc: '📍 섹션 큰 제목의 검은 부분' },
      { path: 'reviewsSection.title2', label: '제목 뒷부분 (파란색)', loc: '📍 섹션 큰 제목의 파란 부분' },
      { path: 'reviewsSection.description', label: '제목 아래 설명', loc: '📍 제목 아래 회색 문단', kind: 'textarea' },
      { path: 'reviewsSection.ratingText', label: '별점 띠 글자', loc: '📍 설명 아래 노란 별 다섯 개 옆 글자. 비워 두면 별점 띠가 사라집니다' },
      { path: 'reviewsSection.carouselBadge', label: '후기 상자 맨 위 꼬리표', loc: '📍 후기 상자 왼쪽 위 파란 둥근 글자 (뒤에 "최신 N건"이 붙음)' },
      { path: 'reviewsSection.carouselTitle', label: '후기 상자 제목', loc: '📍 후기 상자 맨 위 굵은 제목' },
      { path: 'reviewsSection.photoBadge', label: '사진 한 장일 때 표시', loc: '📍 사진을 한 장만 올린 후기의 사진 왼쪽 위 파란 작은 상자' },
      { path: 'reviewsSection.beforeTag', label: '"청소 전" 표시', loc: '📍 전·후 사진을 둘 다 올린 후기에서, 처음 보이는 사진 왼쪽 위 검은 상자' },
      { path: 'reviewsSection.afterTag', label: '"청소 후" 표시', loc: '📍 2.5초 뒤 사진이 바뀌면 오른쪽 위에 뜨는 파란 상자' },
      { path: 'reviewsSection.photoEyebrow', label: '사진 아래 영문 (컴퓨터)', loc: '📍 컴퓨터 화면 후기 사진 왼쪽 아래 하늘색 글자' },
      { path: 'reviewsSection.verifiedBadge', label: '고객 이름 옆 초록 표시', loc: '📍 고객 이름 바로 옆 초록 둥근 글자' },
      { path: 'reviewsSection.pauseHint', label: '맨 아래 안내', loc: '📍 후기 상자 맨 아래 왼쪽 회색 글자' },
      { path: 'reviewsSection.noPhoto', label: '사진 없을 때 글자', loc: '📍 사진 없는 후기의 사진 자리 (컴퓨터 화면)' },
    ],
  },
  {
    id: 'contact',
    title: '견적 신청 칸',
    anchor: '#contact',
    items: [
      { path: 'contactSection.title1', label: '제목 앞부분', loc: '📍 섹션 큰 흰 글씨' },
      { path: 'contactSection.title2', label: '제목 뒷부분 (하늘색)', loc: '📍 섹션 큰 하늘색 글씨' },
      { path: 'contact.formSubtitle', label: '제목 아래 설명', loc: '📍 제목 아래 회색 문단', kind: 'textarea' },
      { path: 'contactSection.centerLabel', label: '왼쪽 상자 작은 제목', loc: '📍 왼쪽 위 상자 맨 위 하늘색 작은 글자' },
      { path: 'contactSection.phoneTitle', label: '왼쪽 상자 제목', loc: '📍 왼쪽 위 상자, 전화번호 바로 위 굵은 글씨' },
      { path: 'contactSection.hoursPrefix', label: '상담 시간 앞 글자', loc: '📍 왼쪽 위 상자 시계 아이콘 옆 (뒤에 상담 시간이 붙음)' },
      { path: 'contactSection.smsNote', label: '문자 상담 안내', loc: '📍 왼쪽 위 상자 전화 아이콘 옆' },
      { path: 'contactSection.asNote', label: 'A/S 안내', loc: '📍 왼쪽 위 상자 방패 아이콘 옆' },
      { path: 'contactSection.stepsTitle', label: '진행 순서 제목', loc: '📍 왼쪽 아래 상자 맨 위 굵은 글씨' },
      {
        kind: 'items',
        path: 'contactSection.steps',
        label: '진행 순서 3단계',
        loc: '📍 왼쪽 아래 상자 1·2·3 번호 목록',
        itemName: '단계',
        fields: [
          { path: 'title', label: '단계 이름', loc: '번호 옆 흰 굵은 글씨' },
          { path: 'description', label: '단계 설명', loc: '단계 이름 아래 회색 글씨' },
        ],
      },
      { path: 'contactSection.typeLabel', label: '서비스 유형 질문', loc: '📍 오른쪽 흰 상자 맨 위 질문' },
      { path: 'contactSection.typeHome', label: '홈클리닝 선택 버튼', loc: '📍 서비스 유형 질문 아래 왼쪽 버튼' },
      { path: 'contactSection.typeCommercial', label: '사업장 선택 버튼', loc: '📍 서비스 유형 질문 아래 오른쪽 버튼' },
      { path: 'contactSection.sizeLabel', label: '평수 질문', loc: '📍 오른쪽 흰 상자 둘째 질문' },
      { path: 'contactSection.sizes', label: '평수 버튼들 (한 줄에 하나)', loc: '📍 평수 질문 아래 버튼들', kind: 'lines' },
      { path: 'contactSection.nameLabel', label: '이름 칸 제목', loc: '📍 이름 입력 칸 위 글자' },
      { path: 'contactSection.namePlaceholder', label: '이름 칸 예시', loc: '📍 이름 입력 칸 안 흐린 예시 글자' },
      { path: 'contactSection.phoneLabel', label: '연락처 칸 제목', loc: '📍 연락처 입력 칸 위 글자' },
      { path: 'contactSection.phonePlaceholder', label: '연락처 칸 예시', loc: '📍 연락처 입력 칸 안 흐린 예시 글자' },
      { path: 'contactSection.dateLabel', label: '날짜 칸 제목', loc: '📍 날짜 입력 칸 위 글자' },
      { path: 'contactSection.messageLabel', label: '문의 내용 칸 제목', loc: '📍 큰 입력 칸 위 글자' },
      { path: 'contactSection.messagePlaceholder', label: '문의 내용 칸 예시', loc: '📍 큰 입력 칸 안 흐린 예시 글자', kind: 'textarea' },
      { path: 'contactSection.submit', label: '보내기 버튼', loc: '📍 오른쪽 흰 상자 맨 아래 큰 파란 버튼' },
      { path: 'contactSection.submitting', label: '보내는 중 글자', loc: '📍 보내기 버튼을 누른 직후 잠깐 바뀌는 글자' },
      { path: 'contactSection.footnote', label: '맨 아래 작은 안내', loc: '📍 보내기 버튼 아래 회색 작은 글자' },
      { path: 'contactSection.errorName', label: '이름 빠졌을 때 안내', loc: '📍 이름 없이 보내기를 누르면 버튼 위에 뜨는 노란 안내' },
      { path: 'contactSection.errorPhone', label: '번호 틀렸을 때 안내', loc: '📍 연락처가 이상하면 버튼 위에 뜨는 노란 안내' },
    ],
  },
  {
    id: 'faq',
    title: '자주 묻는 질문',
    anchor: '#faq',
    items: [
      { path: 'faqSection.title1', label: '제목 첫 줄', loc: '📍 섹션 큰 검은 글씨' },
      { path: 'faqSection.title2', label: '제목 둘째 줄 (파란색)', loc: '📍 섹션 큰 파란 글씨' },
      { path: 'faqSection.description', label: '제목 아래 설명', loc: '📍 제목 아래 회색 문단', kind: 'textarea' },
      {
        kind: 'items',
        path: 'faqList',
        label: '질문과 답',
        loc: '📍 누르면 펼쳐지는 질문 목록. 검색엔진·AI 답변에도 이 내용이 그대로 쓰입니다',
        itemName: '질문',
        addable: true,
        template: { id: '', category: '기타', question: '새 질문', answer: '답을 적어 주세요.' },
        fields: [
          { path: 'category', label: '분류 꼬리표', loc: '질문 앞 파란 작은 상자 (예: 견적/요금)' },
          { path: 'question', label: '질문', loc: '굵은 질문 글씨' },
          { path: 'answer', label: '답', loc: '질문을 누르면 펼쳐지는 글', kind: 'textarea' },
        ],
      },
      { path: 'faqSection.helpEyebrow', label: '아래 상담 상자 꼬리표', loc: '📍 질문 목록 아래 검은 상자 맨 위 하늘색 글자' },
      { path: 'faqSection.helpTitle', label: '아래 상담 상자 제목', loc: '📍 검은 상자 굵은 흰 글씨' },
      { path: 'faqSection.helpDescription', label: '아래 상담 상자 설명', loc: '📍 검은 상자 회색 글씨' },
      { path: 'faqSection.kakaoButton', label: '카톡 버튼 글자', loc: '📍 검은 상자 오른쪽 노란 버튼' },
    ],
  },
  {
    id: 'footer',
    title: '맨 아래 회사 정보',
    anchor: '#faq',
    items: [
      { path: 'footer.description', label: '회사 소개 문단', loc: '📍 맨 아래 검은 영역 왼쪽, 로고 아래 회색 문단', kind: 'textarea' },
      { path: 'company.insuranceNotice', label: '초록 보험 안내', loc: '📍 회사 소개 문단 아래 초록 글자' },
      { path: 'footer.quickTitle', label: '바로가기 제목', loc: '📍 맨 아래 가운데 열 제목' },
      {
        kind: 'items',
        path: 'footer.quickLinks',
        label: '바로가기 링크',
        loc: '📍 바로가기 제목 아래 목록',
        itemName: '링크',
        fields: [{ path: 'name', label: '링크 이름', loc: '' }],
      },
      { path: 'footer.contactTitle', label: '고객센터 제목', loc: '📍 맨 아래 오른쪽 열 제목' },
      { path: 'company.address', label: '주소', loc: '📍 맨 아래 오른쪽 열 위치 아이콘 옆. 검색엔진에도 이 주소가 쓰입니다' },
      { path: 'company.corporateName', label: '상호', loc: '📍 맨 아래 가장 작은 줄 맨 앞' },
      { path: 'company.ceo', label: '대표자', loc: '📍 맨 아래 작은 줄 "대표자:" 뒤' },
      { path: 'company.businessNumber', label: '사업자등록번호', loc: '📍 맨 아래 작은 줄 "사업자등록번호:" 뒤' },
      { path: 'company.telecomSalesNumber', label: '통신판매업신고번호', loc: '📍 맨 아래 작은 줄 "통신판매업신고:" 뒤' },
      { path: 'company.privacyOfficer', label: '개인정보보호책임자', loc: '📍 맨 아래 작은 둘째 줄' },
      { path: 'company.trainingCenter', label: '직영 교육원', loc: '📍 맨 아래 작은 둘째 줄 "직영 교육원:" 뒤' },
      { path: 'footer.copyright', label: '저작권 글자', loc: '📍 맨 아래 오른쪽 가장 작은 글자' },
    ],
  },
  {
    id: 'contactInfo',
    title: '전화번호 · 카톡 · 아래 고정 버튼',
    anchor: '#contact',
    note: '전화번호를 바꾸면 메뉴 줄, 견적 칸, 맨 아래, 휴대폰 고정 버튼까지 한꺼번에 바뀝니다.',
    items: [
      { path: 'contact.phone', label: '대표 전화번호 (보이는 글자)', loc: '📍 메뉴 줄 오른쪽, 견적 칸 왼쪽 큰 번호, 맨 아래 회사 정보' },
      { path: 'contact.phoneTel', label: '전화 걸기 주소', loc: '📍 전화 버튼을 누르면 걸리는 번호. 앞에 tel: 을 꼭 붙이세요 (예: tel:1800-0000)' },
      { path: 'contact.operatingHours', label: '상담 시간 (보이는 글자)', loc: '📍 견적 칸 왼쪽 상자, 맨 아래 회사 정보' },
      { path: 'contact.opens', label: '영업 시작 시각 (검색엔진용)', loc: '📍 화면에는 안 보이고 네이버·구글에 알려 주는 시각. 24시간 표기 (예: 08:00)' },
      { path: 'contact.closes', label: '영업 종료 시각 (검색엔진용)', loc: '📍 화면에는 안 보임. 24시간 표기 (예: 21:00)' },
      { path: 'contact.email', label: '이메일', loc: '📍 맨 아래 회사 정보 오른쪽 열' },
      { path: 'contact.kakaoChatUrl', label: '카카오톡 상담 주소', loc: '📍 노란 카톡 버튼을 누르면 열리는 주소 (예: https://open.kakao.com/o/…)' },
      { path: 'mobileBar.phone', label: '휴대폰 아래 전화 버튼', loc: '📍 휴대폰 화면 맨 아래 고정 버튼 세 개 중 왼쪽' },
      { path: 'mobileBar.kakao', label: '휴대폰 아래 카톡 버튼', loc: '📍 휴대폰 화면 맨 아래 고정 버튼 세 개 중 가운데 (노란색)' },
      { path: 'mobileBar.quote', label: '휴대폰 아래 견적 버튼', loc: '📍 휴대폰 화면 맨 아래 고정 버튼 세 개 중 오른쪽 (파란색)' },
      { path: 'mobileBar.kakaoTooltip', label: '컴퓨터 카톡 버튼 말풍선', loc: '📍 컴퓨터 화면 오른쪽 아래 노란 동그라미에 마우스를 올리면 뜨는 글자' },
    ],
  },
  {
    id: 'instagram',
    title: '인스타그램 (지금 숨김)',
    anchor: '#instagram',
    note: '인스타그램 섹션은 지금 숨김 상태입니다. [섹션 순서·숨기기]에서 켜면 보입니다.',
    items: [
      { path: 'instagram.title1', label: '제목 첫 줄', loc: '📍 인스타그램 섹션 큰 검은 글씨' },
      { path: 'instagram.title2', label: '제목 둘째 줄 (파란색)', loc: '📍 인스타그램 섹션 큰 파란 글씨' },
      { path: 'instagram.description', label: '설명', loc: '📍 제목 아래 회색 문단', kind: 'textarea' },
      { path: 'contact.instagramUrl', label: '인스타그램 주소', loc: '📍 "인스타그램 바로가기" 버튼을 누르면 열리는 주소' },
      { path: 'contact.instagramHandle', label: '인스타그램 아이디', loc: '📍 인스타그램 칸 맨 위 계정 이름' },
    ],
  },
];

export const SECTION_LABELS: Record<string, string> = {
  hero: '첫 화면',
  services: '서비스 소개',
  trustBadges: '4대 안심 보증',
  process: '구역별 비포·애프터',
  about: '4대 시공 원칙',
  reviews: '시공 후기',
  instagram: '인스타그램',
  contact: '견적 신청',
  faq: '자주 묻는 질문',
};

/** 'a.b.0.c' 같은 위치로 값을 읽고 씁니다 */
export function getAt(obj: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((cur, key) => (cur == null ? cur : (cur as Record<string, unknown>)[key]), obj);
}

export function setAt<T>(obj: T, path: string, value: unknown): T {
  const keys = path.split('.');
  const clone = structuredClone(obj) as Record<string, unknown>;
  let cur: Record<string, unknown> = clone;
  keys.slice(0, -1).forEach((k) => {
    cur = cur[k] as Record<string, unknown>;
  });
  cur[keys[keys.length - 1]] = value;
  return clone as T;
}
