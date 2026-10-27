# HANDOVER — 프리미어 클린 (압축본 기반 버전)

마지막 갱신: 2026-10-28

## 작업 위치

- **폴더:** `C:\Users\dlwhd\Downloads\premier-clean-original\premier-clean-main`
  - 사장님이 준 `premier-clean-main.zip`을 풀어 둔 곳이고, 지금 이 폴더에서 작업한다.
  - `Downloads\homepage`는 예전에 따로 만든 다른 버전이므로 손대지 않는다.
- **GitHub:** https://github.com/realminuu-web/premire_clean-_v2 (main)
- **미리보기:** `.claude/launch.json` 은 homepage 폴더에 있다.
  - `premier-original`: 이 폴더의 개발 서버. 3005가 막혀 있으면 3006·3007에 뜬다.
  - `mockups`: 시안 HTML용 정적 서버. 주소는 `localhost:3010`, 파일은 `Downloads\homepage\.superpowers\brainstorm\original-edit\`
- **Supabase:** 프로젝트 `premier-clean`
  - id `dibogvstbntkltkqdbnv`, 도쿄 리전
  - 테이블 `site_kv`, `site_events`와 버킷 `site-images`가 있다.
  - `bokbi` 프로젝트는 다른 사업이다. **절대 건드리지 않는다.**
  - `.env.local`에 Supabase 키와 관리자 비밀번호가 있다. 사장님이 직접 넣었고, 이 파일은 git에 올라가지 않는다.

## 지금 상태

- **main = origin/main (`d2d3a5a`)**: 아래 작업이 모두 GitHub에 올라가 있다.
  - 풀스크린 첫 화면, Z자 배치, 카운트업, 약한 패럴랙스
  - 관리자 페이지 `/admin`: 시공 후기(전·후 사진), 통계, 문구 수정(모든 글자 + 📍 위치 설명), 검색 노출, 섹션 순서·숨기기
  - SEO와 AI 검색: JSON-LD, robots(AI 로봇 허용), sitemap, `/llms.txt`, 관리자에서 바꾸는 OG 썸네일
  - 팀 소개 섹션, 연한 토스 블루 견적 칸, 떠다니는 견적 버튼
  - 영어 꼬리표와 반짝이 아이콘 제거, 여백과 제목 통일(`SectionHeading`), 제목 페이드인
- **브랜치 `preview-footer` (`b825b07`, push 안 함)**: FAQ 아래 상담 상자는 진한 토스 블루, 푸터는 연한 토스 블루로 바꿨다.
  - 사장님에게 보여 줬지만 아직 "main 반영하고 올릴까요?" 답을 못 받았다.

## 새 섹션 작업 — 아래 1~5 모두 구현 완료, main 반영과 push 끝 (2026-10-28)

- 사장님 승인으로 `preview-sections`를 main에 합치고 GitHub에 올렸다.
- 기본값 문구를 바꿀 때는 `src/config/copyUpdates.ts`에 예전 값을 적는다. 그러면 `buildContent()`가 사장님이 손대지 않은 칸만 새 문구로 바꾼다.
- 없는 상세 주소는 404 화면에 noindex가 붙는다. 다만 스트리밍 때문에 상태 코드는 200이다.
- 휴대폰에서 상품 카드는 옆으로 넘기는 한 줄이다.

### 아래는 원래 작업 지시 (참고용)

"2·3·4·5 섹션 만들고 관리자 페이지에서도 조절할 수 있게. 글과 사진은 임의로."

1. **상품 카드 섹션 `products`**
   - 상품 7개: 입주, 이사, 거주, 사무실 정기, 상가·매장, 건물 계단·공용부, 준공·인테리어 후
   - 카드 내용: 이름, 요약, 사진, 가격(○○만 원~ / 기준), 소요 시간, 인원, 포함, 불포함
   - 카드를 누르면 상세 페이지로 간다.
2. **서비스 지역 섹션 `areas`**
   - 지역 묶음(서울 / 경기) + 구·시 목록 + "목록에 없는 지역도 상담" 안내
   - 이 목록을 SEO 지역의 단일 출처로 삼는다. 즉 `seo.areas`를 없애고 `seo.ts`와 관리자 SeoPanel을 이 목록에서 읽도록 바꾼다.
3. **증명 자료 섹션 `proof`**: 카드 3~4장. 각 카드는 라벨, 제목, 설명, 사진(선택), 링크로 구성한다.
   - 사업자 정보 조회 (공정위 `https://www.ftc.go.kr/bizCommPop.do?wrkr_no=사업자번호숫자`)
   - 보험 가입증명서 사진
   - 네이버 플레이스 후기 링크
4. **서비스별 상세 페이지 `/services/[slug]`** (검색 노출용)
   - `products` 데이터로 만든다.
   - Next 16 + cacheComponents 규칙:
     - `generateStaticParams`는 1개 이상을 돌려줘야 한다. 기본 상품 slug들을 돌려준다.
     - partialPrefetching이 켜져 있으므로 `params`는 `<Suspense>` 안에서 await 한다.
     - 없는 slug는 `notFound()`로 처리한다. `dynamicParams` export는 쓰지 않는다.
     - 근거 문서: `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md` §generateStaticParams
   - 페이지별 metadata와 JSON-LD Service를 넣고, sitemap과 llms.txt에도 추가한다.
   - Header에 `solid` 같은 prop을 둔다. 서브 페이지에는 첫 화면이 없어서 투명 헤더를 쓰면 안 된다.
   - `scrollToId`는 대상이 없을 때 `/#id`로 이동해야 한다. 서브 페이지 메뉴용이다.
5. **꾸밈말 정리와 작은 글씨 키우기**
   - 사이트 전체의 `text-[10px]`·`text-[11px]`를 `text-xs` 이상으로 올린다. 관리자 화면은 제외한다.
   - 기본 문구에서 "최상위·장인·명품·완벽" 같은 꾸밈말을 담백하게 바꾼다.
   - **주의:** 사장님이 관리자에서 한 번 저장해서 Supabase `site_kv.content`에 전체 내용이 들어가 있다. 기본값만 바꾸면 화면에는 반영되지 않는다. 저장된 값이 예전 기본값과 같은 칸만 새 문구로 바꾸는 방식을 쓴다.

**새 섹션마다 해야 할 것**
- `src/types/index.ts`: `SectionId`와 데이터 타입
- `src/config/site.ts`: 기본 내용, `sectionOrder`, `visibility`
- `src/app/page.tsx`: `SECTION_COMPONENTS`
- `src/config/editorSchema.ts`: 관리자 칸과 📍 위치 설명, `SECTION_LABELS`
- `src/app/api/admin/stats/route.ts`: `SECTION_NAMES`
- 저장된 섹션 순서에 새 섹션이 없으면 `buildContent()`(lib/content.ts)가 자동으로 끼워 넣는다.

## 사장님 작업 방식 (꼭 지킬 것)

- 모든 답은 한국어로 쉽게 쓴다. wrap_up 상자의 질문과 버튼도 한국어로 쓴다.
- 보여 주거나 승인받을 때는 반드시 시안을 함께 보여 준다.
  - 사장님이 "일단 만들어봐"라고 하면 바로 만들고, 실제 화면을 시안으로 보여 준다.
- main 반영과 GitHub push는 매번 따로 물어본다. 시안은 `preview-*` 브랜치에서 만든다.
- **다시 꺼내지 말 것.** 아래는 사장님이 마지막에 관리자 페이지로 직접 한다.
  - 견적 이메일·카톡 연결
  - 목업 숫자(건수·만족도·평점·보험 금액)
  - 실제 사진 교체
  - 그러니 모든 글·사진·숫자를 관리자에서 고칠 수 있게만 만들면 된다.
- "4대 안심 보증" 섹션을 지울지, 숨길지, 그대로 둘지 아직 답을 못 받았다. 지금은 그대로 둔다.

## 주의 (지난 실수)

- PowerShell에서 바꿀 짝이 하나뿐인 `@(@(a,b))`를 쓰면 배열이 평탄화되어 글자 단위로 치환된다. 이 때문에 파일이 깨진 적이 있다. 수정은 Edit 도구를 쓴다.
- `[IO.File]` API는 PowerShell 현재 위치가 아니라 .NET 현재 폴더를 기준으로 상대 경로를 푼다. 그래서 상대 경로를 쓰면 파일을 비운다. 항상 절대 경로를 쓴다.
- 개발 중 `'use cache'` 내용은 Supabase를 직접 SQL로 바꾸면 갱신되지 않는다. 그럴 때는 개발 서버를 재시작한다.

## 검증 방법

- `npx eslint src --quiet`, `npx tsc --noEmit`
- 브라우저: 홈페이지(`/`), `/admin`(사장님 비밀번호로 로그인된 상태일 수 있음), `/robots.txt`, `/llms.txt`, `/opengraph-image`
