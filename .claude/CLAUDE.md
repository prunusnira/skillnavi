# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 참고하는 가이드입니다.

## 1. 프로젝트 개요

Skill Navigator (skillnavi)는 코나미의 GITADORA 시리즈용 비영리 오픈소스 스킬 관리자입니다. pnpm workspaces와 Turborepo 기반 모노레포이며 TypeScript로 작성되었습니다. 메인 서비스는 Next.js 15 (App Router), 별도의 데이터 업데이터 앱은 Vite + React 19 기반입니다.

패키지 매니저는 corepack으로 `pnpm@11.8.0`을 핀(`package.json`의 `packageManager` 필드). 의존성 해석은 pnpm 기본 엄격 모드이며 `.npmrc`에서 Prisma 계열 패키지만 `public-hoist-pattern`으로 호이스트. 내부 패키지(`@skillnavi/*`) 참조는 `workspace:*` 프로토콜 사용.

지원 로케일: `ko`, `ja`, `en` (정의 위치: `apps/service/feature/env/data/Language.ts`).

## 2. 명령어

루트 (Turborepo):

- `pnpm dev` - 모든 워크스페이스를 dev 모드로 실행
- `pnpm build` - 모든 워크스페이스 빌드
- `pnpm lint` - 모든 워크스페이스 린트
- `pnpm install` - 의존성 설치
- 워크스페이스별 실행: `pnpm --filter @skillnavi/service <script>` 또는 루트 재귀: `pnpm -r run <script>`

Service (`apps/service`):

- `pnpm dev` - Next.js dev 서버, Turbopack 사용, 포트 3000, `.env.dev`
- `pnpm build:dev` / `pnpm build` - 각각 `.env.dev` / `.env.prd` 기준 빌드
- `pnpm start:dev` / `pnpm start` - `next start`, 각각 `.env.dev` / `.env.prd`
- `pnpm lint` - `next lint`
- `pnpm test` / `pnpm test:watch` / `pnpm test:coverage` - Vitest (jsdom + React Testing Library)
- `./build.sh dev|prd` - 대상 `.env.*` 파일을 `.env`로 복사 후 빌드 스크립트 실행 (CI/배포, 내부에서 `pnpm build:dev`/`pnpm build` 호출)
- 프로덕션은 PM2로 구동 (`ecosystem.config.js`, cluster 모드, 인스턴스 2개, 포트 3000)

Updater (`apps/updater`): `pnpm dev`, `pnpm build` (Vite), `pnpm test`.

공통 UI (`packages/ui`):

- `pnpm build` - `tsc -b` 후 Vite 라이브러리 빌드, 산출물 `dist/`
- `pnpm storybook` - Storybook dev 서버 (포트 6006)
- `pnpm build-storybook` - Storybook 정적 빌드 (산출물 `storybook-static/`)
- `pnpm test` - Vitest + @storybook/addon-vitest (Playwright chromium)

Prisma: `prisma` CLI는 `apps/service`에서 사용. 스키마 위치 `apps/service/prisma/schema.prisma` (MySQL). 스키마 변경 시 `pnpm --filter @skillnavi/service exec prisma generate`, 필요에 따라 `prisma migrate` 또는 `db push`. pnpm의 엄격한 node_modules에서 Prisma Client가 보이도록 루트 `.npmrc`에 `public-hoist-pattern[]=*prisma*` 설정되어 있음.

## 3. 환경 설정

`apps/service`는 `env-cmd`로 `.env.dev` 또는 `.env.prd`를 불러옵니다. 두 파일 모두 git에 커밋되지 않습니다. `NEXT_PUBLIC_URL_IMG`, `NEXT_PUBLIC_URL_ALBUM`, `NEXT_PUBLIC_URL_PUBLICEP`, `NEXT_PUBLIC_URL_DISCORD`, `DATABASE_URL`은 이 파일들에서 가져옵니다. 자세한 내용은 `apps/service/url/url.ts` 참고. Next.js 빌드 ID는 빌드 시점에 `nanoid()`로 생성됩니다 (`next.config.js`).

## 4. 모노레포 구조

- `apps/service` - 메인 Next.js 앱 (App Router, 서버 및 클라이언트 컴포넌트). 경로 별칭 `@/*`는 이 폴더 루트에서 해석됩니다 (예: `@/feature/...`, `@/common/...`, `@/lib/...`).
- `apps/updater` - Vite/React SPA. 외부 소스를 크롤링하여 service의 API로 업로드.
- `packages/data` - UI가 아닌 공통 로직 (cookie, fetchExtended, log, profile, skill, version).
- `packages/ui` - 공통 표현형 컴포넌트 (현재 `ButtonRounded`, `ButtonStandard`, `Select`). `@skillnavi/ui`로 import하며 service의 `transpilePackages`에 등록.
- `packages/tsconfig` - 공유 `tsconfig` 베이스 (`base.json`, `for-next.json`, `for-react.json`, `for-library.json`).

상세 디렉터리:

```
apps/service/
  app/          - Next.js App Router 페이지 (라우트 단위)
  common/       - 공용 기능 구현체
  feature/      - 페이지/모듈 단위 조합 컴포넌트
  i18n/         - 언어 번역
  lib/          - DB, 스크린샷, fetcher, 토큰 관리 등
  prisma/       - ORM 스키마
  public/       - 일반 접근 데이터
  types/        - 타입 데이터
  url/          - URL 경로 모음

apps/updater/src/
  crawl/        - 크롤링 관련 로직
  feature/      - 모듈 단위 조합 컴포넌트
  function/     - 공용 데이터
  lib/          - 공용 모듈
  text/         - 텍스트 번역

packages/data/      - 공용 데이터
packages/tsconfig/  - 공용 TypeScript config
packages/ui/        - 공용 UI 컴포넌트
```

## 5. Service 앱 규칙

### 라우팅

App Router + i18n. 사용자 대상 페이지는 `app/[lang]/(common)/...` 아래에 있으며 단일 레이아웃 공유 (`feature/header`, `feature/footer`, `UserAuthWrapper`, `Theme`, `LogPageView`). API 라우트는 `app/api/...` 아래에 있습니다. 라우팅 설정은 `i18n/routing.ts`에 있으며, `Link`, `useRouter`, `usePathname`, `redirect`는 로케일 prefix가 자동 처리되도록 `@/i18n/routing`에서 재내보내는 것을 사용. 클라이언트 URL 헬퍼는 `url/url.ts`, API 엔드포인트 상수는 `url/api.ts`.

`middleware.ts`는 `next-intl` 미들웨어와 `next-auth`의 `withAuth`를 조합합니다. 미들웨어 상단의 `publicPagesExact`, `publicPages` 배열이 인증 없이 접근 가능한 경로를 정의합니다. 새 공개 경로 추가 시 auth 콜백을 특수 케이스로 처리하지 말고 이 배열들을 업데이트하세요.

### 기능(Feature) 폴더

도메인 로직 대부분은 `feature/<name>/` 아래에 역할별 서브폴더와 함께 묶여 있습니다 - 일반적으로 `api` (라우트 핸들러 또는 fetcher), `data` (타입, 상수, 매퍼), `component` (React), 필요에 따라 `atom` (Jotai) 또는 `db` (Prisma 쿼리). 예: `feature/music`, `feature/skill`, `feature/profile`, `feature/auth`. 공통 UI 프리미티브는 `common/`.

### 데이터 레이어

Prisma 클라이언트는 `lib/db/prisma.ts`에서 싱글턴으로 내보내집니다. `SkillList`에 계산된 `skill` 필드 (`level * rate`)가 추가되어 있으므로, `skillList` 조회 시 `skill`을 직접 요청할 수 있습니다. 인증은 `next-auth` (v4), 세션 접근은 `feature/auth/wrapper/UserAuthWrapper`와 `lib/session` 헬퍼를 통해 사용.

### 상태 관리

- 컴포넌트 로컬 상태는 `useState`
- 전역 클라이언트 상태는 Jotai atom. Jotai가 오버스펙인 경우 ContextAPI 사용 (리렌더 최적화를 위해 `children` 패턴 지향)
- 서버 상태는 TanStack Query (`useQuery`, `useInfiniteQuery`, `useMutation`)

### 스타일

Tailwind CSS v4 (`@tailwindcss/postcss`)가 기본. 클래스 병합은 `lib/cn.ts` (`clsx` + `tailwind-merge`). 일부 컴포넌트는 CSS Modules (`.module.css`, SCSS 아님)를 병용. 인라인 스타일은 지양.

포맷팅은 Prettier 기준 - **싱글쿼트, 4스페이스 들여쓰기, trailing comma, `singleAttributePerLine`, `multilineArraysWrapThreshold: 1`** (`.prettierrc.json`). 코드 편집 시 이 스타일을 맞추세요.

### 컴포넌트 작성

- App Router 사용 (`pages/` 디렉터리 방식 금지)
- 서버 컴포넌트 기본, 클라이언트 상태/이벤트 필요 시에만 `'use client'` 추가

## 6. 응답 방식

- 응답 언어는 항상 한국어
- 불필요한 요약, 마무리 문장 금지 ("이렇게 수정했습니다" 류 제거)
- 이모지 사용 금지 (명시적 요청 시 예외)
- 마크다운 테이블은 꼭 필요한 경우에만 사용, 목록으로 대체 가능하면 목록 사용
- 특수문자(유니코드 장식 문자, 박스 드로잉 등) 사용 금지 - 토큰 낭비
- 물결표는 일반 물결표 `~` (U+007E)만 사용, wave dash `～` (U+301C) 금지

## 7. 코드 작성 규칙

### 기본 원칙

- 주석은 WHY가 비명백한 경우에만 한 줄 작성, 그 외 금지
- 추상화는 요청된 범위를 초과하지 않는다 (미래 요구사항을 위한 설계 금지)
- 에러 핸들링은 실제로 발생 가능한 경우에만 추가
- 사용하지 않는 코드, 변수, import 남기지 않기

### 파일 작업

- 파일 수정 전 반드시 Read로 전체 내용 확인
- 파일 경로는 find/grep으로 실제 존재 확인 후 사용 (추정 경로 금지)
- 새 파일 생성 전 유사 기능 파일이 이미 있는지 탐색
- 관련 없는 파일 절대 수정 금지

### TypeScript

- `any` 사용 금지 (`unknown` + 타입 가드 또는 정확한 타입 사용)
- `as` 타입 단언 최소화, 불가피한 경우 주석으로 이유 명시
- `interface`보다 `type` 선호 (확장이 필요한 경우 `interface` 사용)

## 8. 애매한 상황에서의 행동 원칙

구현 시작 전 반드시 사용자에게 확인한다.

**확인이 필요한 경우**

- 디자인 링크 없이 UI 구현 방향이 두 가지 이상으로 갈리는 경우
- 기존 컴포넌트 수정 vs 신규 컴포넌트 생성 판단이 불명확한 경우
- API 연동 방식 (BFF 경유 vs 직접 호출) 판단이 불명확한 경우
- 삭제/덮어쓰기 등 되돌리기 어려운 작업 전
- 코드에서 예상과 다른 구현 방식 발견 시 (추정으로 넘어가지 않는다)

**확인 없이 진행해도 되는 경우**

- 코드베이스에 동일 패턴이 명확히 존재하는 경우
- 티켓 설명과 디자인이 모두 있어 판단이 명확한 경우
- 버그 수정이 원인과 해결책이 명확한 경우

## 9. Git 규칙

- 커밋은 명시적으로 요청받은 경우에만 생성
- 커밋 메시지 형식: `[{티켓ID}] {작업 요약}` (예: `[NAVI-5621] 찜 해제 시 리스트 유지 처리`), 긴급 수정은 `[HOTFIX] {작업 요약}`
- 브랜치명 형식: `{티켓ID}` (예: `NAVI-5621`)
- force push 금지 (명시적 요청 시에도 main/master는 절대 금지)
- `--no-verify` 금지
- PR 템플릿 (`.github/pull_request_template.md`)은 `연결 이슈` 줄이 필요. `[NAVI-X]` 참조를 적으세요.

## 10. 권장 설정

### settings.local.json 유용한 권한 허용

자주 쓰는 읽기 전용 명령은 `permissions.allow`에 추가해두면 매번 승인 불필요:

```json
{
  "permissions": {
    "allow": [
      "Bash(find:*)",
      "Bash(grep:*)",
      "Bash(ls:*)",
      "Bash(cat:*)",
      "Bash(git log:*)",
      "Bash(git diff:*)",
      "Bash(git status:*)"
    ]
  }
}
```

### 유용한 훅 패턴

- PostToolUse Write: 파일 저장 후 브라우저 자동 열기 (현재 `draft-chrome-prompt.sh` 적용 중)
- PreToolUse Bash: 위험한 명령 실행 전 경고

### 메모리 시스템

`.claude/memory/` 디렉터리에 대화 간 유지할 정보 저장 가능:

- `user_*.md` - 사용자 선호도, 역할
- `feedback_*.md` - 작업 방식 피드백
- `project_*.md` - 프로젝트 맥락

### 슬래시 커맨드

`.claude/commands/`의 `.md` 파일이 `/명령어`로 실행됨:

- `/issue {티켓ID 또는 URL}` - GitHub Issue(`NAVI-X` 또는 숫자) 또는 Notion(URL/UUID)에서 티켓을 분석해 `.claude/drafts/{티켓ID}.html` draft HTML 생성. GitHub은 `gh` CLI 우선 사용. 항목: 티켓 요약, 구현 범위, 구현 단계 체크리스트, 리스크/확인 포인트, 후속 작업(테스트/스토리 자동 작성)
- `/impl {티켓ID}` - draft HTML 기반 실제 코드 구현. 완료 후 `.claude/skill/`의 vitest, storybook 템플릿을 참고해 테스트와 스토리 작성
- `/tunnel` - 로컬 빌드 후 cloudflared 터널 URL 생성

### 템플릿 폴더

`.claude/skill/`에 vitest, storybook 템플릿을 둔다. `/issue`, `/impl`에서 테스트/스토리 자동 작성 시 이 폴더의 파일을 참고한다. 폴더가 비어 있으면 자동 작성을 건너뛰고 사용자에게 먼저 세팅하라고 안내한다.

`.claude/drafts/`에 `/issue`가 생성한 draft HTML이 티켓별로 저장된다.
