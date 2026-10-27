# 🧹 프리미어 클린 (Premier Clean)

> **"눈에 보이지 않는 곳까지 완벽하게, 프리미어 클린이 기준을 만듭니다."**  
> 100% 한국인 직영 마스터팀 프리미엄 청소 전문 업체 공식 반응형 웹사이트

---

## ✨ 핵심 기능 (Features)

- **One-page 스크롤 반응형 디자인**: 모바일 최우선(Mobile-first) 설계 및 세련된 White & Cobalt Blue 컬러 테마.
- **인터랙티브 비포 & 애프터 비교 슬라이더**: 마우스/터치 드래그로 시공 전후를 직관적으로 비교할 수 있는 분할 뷰.
- **Framer Motion 자동 롤링 후기 캐러셀**: 고객 실시간 검증 후기 및 별점 자동 슬라이드.
- **경량 관리자 후기 등록 (Light-weight Admin)**: 비밀번호(`0000`) 검증 모달을 통한 시공 후기 등록 및 실시간 피드 반영.
- **실시간 견적 & 상담 신청 폼**: 주거(입주/이사/거주) 및 사업장(사무실/상가) 맞춤 견적 신청 및 EmailJS 연동 지원.
- **100% 무료보장 A/S 안내**: 시공 후 3일 이내 무상 재방문 케어 정책 명시.
- **펄스 카카오톡 1:1 상담 플로팅 버튼**: 항상 화면 우측 하단에 고정된 원클릭 상담 연결.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router) + [React](https://react.dev/) 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database & Storage**: [Supabase](https://supabase.com/) (하이브리드 로컬 폴백 지원)
- **Email Service**: [EmailJS](https://www.emailjs.com/) (시뮬레이션 모드 지원)

---

## 🚀 빠른 시작 (Getting Started)

### 1. 패키지 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.example` 파일을 복사하여 `.env.local`을 생성하고 필요한 키를 입력합니다 (기본값으로도 바로 동작합니다):
```bash
cp .env.example .env.local
```

### 3. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인합니다.

### 4. 프로덕션 빌드
```bash
npm run build
npm run start
```

---

## 📝 라이선스 (License)

Copyright © 2026 Premier Clean. All rights reserved.
