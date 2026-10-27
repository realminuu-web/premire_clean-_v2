import { ServiceDetail } from '@/types';
import { siteConfig } from '@/config/site';

export const INITIAL_REVIEWS = siteConfig.reviews;

export const INSTAGRAM_POSTS = siteConfig.instagram.posts;

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'home-cleaning',
    category: 'home',
    title: '홈클리닝 (Home Cleaning)',
    description: '가장 소중한 안식처를 호텔 스위트룸처럼. 미세먼지, 분진가루, 숨은 세균까지 박멸하는 주거 전문 올인원 솔루션',
    highlights: ['입주 / 이사 청소', '거주 대청소 & 부분 특수케어', '친환경 피톤치드 살균 서비스', '창틀·등기구·배수구 완전 분해 세척'],
    features: [
      '신축 아파트 벽면 도배풀, 시멘트 가루, 새집증후군 유발 물질 제거',
      '주방 상·하부장 선반, 걸레받이, 후드 필터 기름때 고온 스팀 박멸',
      '화장실 배수구, 환풍기 트랩 탈거 세척 및 타일 줄눈 물때 스케일링',
      '방충망, 창틀 4면 틈새 먼지, 유리창 얼룩 클리닝 (외창 제외)',
      '천장 조명 커버 탈거 먼지 제거 및 스위치, 콘센트 미세 세척'
    ],
    badge: '인기 서비스',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'commercial-cleaning',
    category: 'commercial',
    title: '사업장 클리닝 (Commercial Cleaning)',
    description: '기업의 브랜드 가치와 임직원의 생산성을 극대화하는 프리미엄 오피스 & 상업 시설 전문 클리닝',
    highlights: ['사무실 정기 청소 & 주 1~5회 케어', '상가·카페 준공 및 오픈 전 대청소', '바닥 박리 및 고광택 왁스 코팅', '유리창·외벽·시스템 에어컨 세척'],
    features: [
      '업무에 지장 없는 심야/새벽/주말 맞춤 스케줄링 진행',
      '데스크탑 주변 먼지, 회의실 유리 파티션 지문 및 유막 제거',
      '대형 탕비실 싱크대 소독, 공용 공간 쓰레기 분리배출 관리',
      '고출력 폴리셔 바닥 때 세척 및 고경도 친환경 수지 왁스 시공',
      '세금계산서 100% 발행 및 월별 작업 보고서 리포트 제공'
    ],
    badge: '기업 고객 만족도 1위',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
];
