export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  serviceType: string;
  rating: number;
  content: string;
  date: string;
  beforeImage: string;
  afterImage: string;
  verified?: boolean;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  serviceType: 'home' | 'commercial';
  spaceSize: string;
  serviceDate: string;
  message: string;
}

export interface ServiceDetail {
  id: string;
  category: 'home' | 'commercial';
  eyebrow: string;
  badge: string;
  title: string;
  description: string;
  highlights: string[];
  features: string[];
  footerNote: string;
  cta: string;
  image: string;
}

export interface TeamMember {
  id: string;
  photo: string;
  role: string;
  name: string;
  career: string;
  intro: string;
}

/** 관리자가 올린 시공 후기 (published=false 면 홈페이지에서 숨김) */
export interface StoredReview extends ReviewItem {
  published: boolean;
  createdAt: string;
}

export interface TrustBadgeItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'ShieldCheck' | 'CreditCard' | 'RotateCcw' | 'Coffee' | 'Receipt' | 'HandCoins' | 'CircleOff' | 'BadgePercent';
}

export interface CoreValueItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  gradient: string;
  border: string;
  iconName: 'Users2' | 'ThumbsUp' | 'Leaf' | 'RotateCcw' | 'Layers' | 'Camera' | 'Sparkles' | 'ShieldCheck';
}

export interface CleaningManualZone {
  id: string;
  zone: string;
  title: string;
  summary: string;
  disassemblyTargets: string[]; // 100% 완전 탈거 부위 목록
  specialMethods: string[];     // 특수 공정 및 장비
  beforeImage: string;          // 시공 전 사진
  afterImage: string;           // 시공 후 사진
  tag: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ReceiptReviewItem {
  id: string;
  customerName: string;
  location: string;
  spaceType: string;
  date: string;
  checklistSummary: string[];
  reviewComment: string;
  rating: number;
  receiptVerified: boolean;
  actualPhotoUrl: string;
}

export interface InstagramPost {
  id: number;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  postUrl?: string;
}

/** 상품 카드 1장 (카드를 누르면 /services/[slug] 상세 페이지로 갑니다) */
export interface ProductItem {
  id: string;
  slug: string; // 상세 페이지 주소 (영문 소문자와 - 만)
  name: string;
  summary: string;
  image: string;
  price: string; // 예: 25만 원~
  priceBasis: string; // 예: 20평 기준
  duration: string;
  crew: string;
  includes: string[];
  excludes: string[];
  detail: string; // 상세 페이지 본문
  recommendFor: string[]; // 상세 페이지 "이런 분께 맞아요"
}

/** 서비스 지역 묶음 (예: 서울 + 구 목록) */
export interface AreaGroup {
  id: string;
  name: string;
  districts: string[];
}

/** 증명 자료 카드 1장 */
export interface ProofItem {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string; // 비워 두면 사진 칸 없음
  linkLabel: string;
  href: string; // {사업자번호} 를 넣으면 회사 사업자번호 숫자로 바뀝니다
}

export type SectionId =
  | 'hero'
  | 'trustBadges'
  | 'about'
  | 'team'
  | 'process'
  | 'services'
  | 'products'
  | 'areas'
  | 'proof'
  | 'reviews'
  | 'instagram'
  | 'faq'
  | 'contact';

