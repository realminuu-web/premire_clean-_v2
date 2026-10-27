# HANDOVER — 프리미어 클린 (압축본 기반 버전)

마지막 갱신: 2026-10-28

## 작업 위치

- **폴더:** `C:\Users\dlwhd\Downloads\premier-clean-original\premier-clean-main`
  - 사장님이 준 `premier-clean-main.zip`을 풀어 둔 곳이고, 지금 이 폴더에서 작업한다.
  - `Downloads\homepage`는 예전에 따로 만든 다른 버전이므로 손대지 않는다.
- **GitHub:** https://github.com/realminuu-web/premire_clean-_v2 (main)
- **미리보기:** `.claude/launch.json` 은 homepage 폴더에 있다.
  - `premier-original`: 이 폴더의 개발 서버. 3005가 막혀 있으면 3006·3007에 뜬다.
  - **`homepage-dev`(3002)는 예전 homepage 버전이다.** 미리보기 창이 3002를 띄우고 있으면 사장님이 "만든 게 없어졌다"고 느낀다. 화면이 이상하면 먼저 미리보기 주소를 확인한다.
  - 앱이 미리보기 서버를 끌 때가 있다. 그러면 `premier-original`을 다시 켠다.
  - `mockups`: 시안 HTML용 정적 서버. 주소는 `localhost:3010`, 파일은 `Downloads\homepage\.superpowers\brainstorm\original-edit\`
- **Supabase:** 프로젝트 `premier-clean`
  - id `dibogvstbntkltkqdbnv`, 도쿄 리전
  - 테이블 `site_kv`, `site_events`와 버킷 `site-images`가 있다.
  - `bokbi` 프로젝트는 다른 사업이다. **절대 건드리지 않는다.**
  - `.env.local`에 Supabase 키와 관리자 비밀번호가 있다. 사장님이 직접 넣었고, 이 파일은 git에 올라가지 않는다.

## 지금 상태 (main = origin/main, 남은 브랜치 작업 없음)

모두 GitHub에 올라가 있다.

- 풀스크린 첫 화면, Z자 배치, 카운트업, 약한 패럴랙스
- 관리자 페이지 `/admin`: 시공 후기(전·후 사진), 통계, 문구 수정(모든 글자 + 📍 위치 설명), 검색 노출, 섹션 순서·숨기기
- SEO와 AI 검색: JSON-LD, robots(AI 로봇 허용), sitemap, `/llms.txt`, 관리자에서 바꾸는 OG 썸네일
- 팀 소개 섹션, 연한 토스 블루 견적 칸, 떠다니는 견적 버튼
- 여백과 제목 통일(`SectionHeading`), 제목 페이드인
- FAQ 아래 상담 상자는 진한 토스 블루, 푸터는 연한 토스 블루
- **2026-10-28 추가**
  - **상품 카드 `products`** (7개): 사진, 가격·기준, 시간, 인원, 포함·불포함을 보여 준다. 휴대폰에서는 옆으로 넘기는 한 줄이고, 마지막 칸은 맞춤 견적 문의다.
  - **상세 페이지 `/services/[slug]`**: 페이지별 metadata, JSON-LD Service·Breadcrumb를 넣었고 sitemap과 llms.txt에도 들어간다. Header는 `solid` prop을 쓴다.
  - **서비스 지역 `areas`**: 서울·경기 묶음이다. 이 목록이 SEO 지역의 단일 출처다(`seo.areas`는 없앴다). SeoPanel은 지역을 보여 주기만 한다.
  - **증명 자료 `proof`** (4장): 링크에 `{사업자번호}`를 넣으면 회사 사업자번호 숫자로 바뀐다.
  - **꾸밈말 정리**: `src/config/copyUpdates.ts`에 예전 기본값을 적어 둔다. `buildContent()`가 사장님이 손대지 않은 칸만 새 문구로 바꾼다. 기본 문구를 또 바꿀 때도 이 파일에 예전 값을 추가한다.
  - 사이트 전체(관리자 제외)에서 9~11px 글씨를 없앴다. 최소 `text-xs`다.
  - 상세 주소(slug)는 저장할 때 자동으로 정리한다(영문 소문자·숫자·`-`만 남기고, 겹치면 `-2`를 붙인다). `buildContent()`에서 한다.
  - 서브 페이지에서 `/#id`로 들어오면 Header가 그 섹션으로 스크롤한다. 대상이 없을 때 `scrollToId`는 `/#id`로 이동한다.

## 검증 결과 (2026-10-28)

- `tsc`, `eslint`(경고 0), `next build` 통과 (23 페이지)
- 운영 빌드로 브라우저에서 확인했다: 섹션 동작, 견적 폼 검증, 상세 페이지 7개, 메뉴·위치 표시·견적 버튼 이동, robots·sitemap·llms·OG, 관리자 API 무로그인 401, 관리자 각 화면.
- **테스트할 때 주의:** 미리보기 창이 숨겨져 있으면 requestAnimationFrame이 멈춘다. 그러면 상세 페이지(Suspense)의 hydration이 끝나지 않아 버튼이 안 눌리는 것처럼 보인다. 스크린샷을 한 번 찍으면 풀린다. 버그가 아니다.
- 없는 상세 주소는 404 화면에 noindex가 붙는다. 다만 스트리밍 때문에 상태 코드는 200이다.
- 테스트 중 Supabase `site_events`에 방문 몇 건과 견적 버튼 클릭 2건이 기록됐다. 지울지는 사장님 선택이다(아직 안 물어봄).

## 남은 일 후보 (사장님이 정할 것)

- `/api/track`에 횟수 제한이 없다. 반복해서 보내면 통계를 부풀릴 수 있다.
- 로그인 잠금은 서버 메모리에만 있다. 서버가 여러 대면 덜 확실하다.

## 사장님 작업 방식 (꼭 지킬 것)

- 모든 답은 한국어로 쉽게 쓴다. wrap_up 상자의 질문과 버튼도 한국어로 쓴다.
- 보여 주거나 승인받을 때는 반드시 시안을 함께 보여 준다.
  - 사장님이 "일단 만들어봐"라고 하면 바로 만들고, 실제 화면을 시안으로 보여 준다.
- main 반영과 GitHub push는 매번 따로 물어본다. 시안은 `preview-*` 브랜치에서 만든다.
- **다시 꺼내지 말 것.** 아래는 사장님이 마지막에 관리자 페이지로 직접 한다.
  - 견적 이메일·카톡 연결
  - 목업 숫자(건수·만족도·평점·보험 금액, 상품 가격·시간·인원)
  - 실제 사진 교체
  - 섹션 숨기기("4대 안심 보증" 포함). 사장님 말: "섹션은 내가 끌께 필요하면"
  - 그러니 모든 글·사진·숫자를 관리자에서 고칠 수 있게만 만들면 된다.

## 새 섹션을 만들 때 고칠 곳

- `src/types/index.ts`: `SectionId`와 데이터 타입
- `src/config/site.ts`: 기본 내용, `sectionOrder`, `visibility`
- `src/app/page.tsx`: `SECTION_COMPONENTS`
- `src/config/editorSchema.ts`: 관리자 칸과 📍 위치 설명, `SECTION_LABELS`
- `src/app/api/admin/stats/route.ts`: `SECTION_NAMES`
- 저장된 섹션 순서에 새 섹션이 없으면 `buildContent()`(lib/content.ts)가 기본 순서에서 바로 앞 섹션 뒤에 자동으로 끼워 넣는다.

## Next 16 규칙 (이 프로젝트 설정: cacheComponents + partialPrefetching)

- `generateStaticParams`는 1개 이상을 돌려줘야 한다. 동적 `params`는 `<Suspense>` 안에서 await 한다.
- 없는 slug는 `notFound()`로 처리한다. `dynamicParams` export는 쓰지 않는다.
- 근거 문서: `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`

## 주의 (지난 실수)

- PowerShell에서 바꿀 짝이 하나뿐인 `@(@(a,b))`를 쓰면 배열이 평탄화되어 글자 단위로 치환된다. 이 때문에 파일이 깨진 적이 있다. 수정은 Edit 도구를 쓴다.
- `[IO.File]` API는 PowerShell 현재 위치가 아니라 .NET 현재 폴더를 기준으로 상대 경로를 푼다. 그래서 상대 경로를 쓰면 파일을 비운다. 항상 절대 경로를 쓴다.
- 개발 중 `'use cache'` 내용은 Supabase를 직접 SQL로 바꾸거나 데이터 모양을 바꾸면 갱신되지 않는다. 그럴 때는 개발 서버를 재시작한다.

## 검증 방법

- `npx eslint src --quiet`, `npx tsc --noEmit`, `npx next build`
- 브라우저: 홈페이지(`/`), `/services/move-in`, `/admin`(사장님 비밀번호로 로그인된 상태일 수 있음), `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/opengraph-image`
- 견적 폼을 실제로 보내면 통계에 가짜 견적이 남는다. 검증만 할 때는 보내지 않는다.
