---
description: 현재 브랜치 변경사항을 정리해서 PR 생성. 사용법: /pr [target_branch] [--from origin_branch]
argument-hint: [target_branch] [--from origin_branch]
---

# /pr

입력: `$ARGUMENTS`

## 목적

현재 브랜치(또는 지정 브랜치)의 변경사항을 분석해 GitHub PR을 자동 생성한다. 이슈 내용까지 요약해서 반영한다.

## 인자 파싱

`$ARGUMENTS`에서 아래 값을 추출한다:

- `target_branch`: 위치 인자 (지정하지 않으면 `main`)
- `--from {브랜치}`: 원본 브랜치. 지정하지 않으면 현재 브랜치 (`git rev-parse --abbrev-ref HEAD`)

예시:
- `/pr` → target=main, from=현재 브랜치
- `/pr develop` → target=develop, from=현재 브랜치
- `/pr main --from NAVI-100` → target=main, from=NAVI-100

## 1단계: 사전 검증

아래 조건 중 하나라도 해당하면 중단하고 사실을 알린다.

1. **target_branch와 origin_branch가 같은 경우** - 동작하지 않음
2. **origin_branch가 target_branch인 경우** (예: 현재 브랜치가 main) - 동작하지 않음
3. **미커밋 변경사항이 있는 경우** - `git status --porcelain`이 비어있지 않으면 "커밋되지 않은 변경사항이 있습니다. 먼저 커밋하거나 stash하세요." 경고 후 사용자 확인 요청
4. **`gh` 미인증** - `gh auth status` 실패 시 인증 안내 후 대기

`gh`는 항상 프로젝트 루트에서 실행한다.

## 2단계: 변경사항 수집

병렬로 아래 명령을 실행한다:

- `git log {target_branch}..{origin_branch} --pretty=format:'%h %s' --no-merges` - 커밋 목록
- `git diff {target_branch}...{origin_branch} --stat` - 파일별 변경 통계
- `git diff {target_branch}...{origin_branch} --name-status` - 파일 생성/수정/삭제 분류
- `git diff {target_branch}...{origin_branch}` - 전체 diff (필요 시 범위 좁혀서 읽기)
- `gh repo view --json owner,name -q '.owner.login + "/" + .name'` - 리포지토리 식별자

origin_branch가 remote에 없으면 `git push -u origin {origin_branch}`를 먼저 실행할지 사용자에게 확인한다 (CLAUDE.md 8번 원칙 - 되돌리기 어려운 작업).

## 3단계: 이슈 추적

origin_branch에서 티켓 ID를 추출한다. 일반적으로 브랜치명 자체가 `{NAVI-숫자}` 형식.

- 브랜치명이 `NAVI-\d+` 패턴이면 해당 티켓 조회
- 커밋 메시지에서 `[NAVI-\d+]` 패턴을 추가로 검색해서 교차 검증
- 티켓 발견 시 `gh issue view {숫자} --repo prunusnira/skillnavi-nextjs --json number,title,body` 로 본문 조회

조회된 이슈 본문을 1~3문장으로 요약한다. 이슈 본문이 모호하면 "이슈 본문 확인 필요"로 표기 (CLAUDE.md 8번 원칙).

이슈를 찾지 못한 경우 PR 본문에서 연결 이슈 섹션을 생략하거나 "연결 이슈 없음"으로 표기.

## 4단계: PR 본문 작성

기존 PR 포맷(아래 템플릿)을 준수한다. 한국어로 작성.

```markdown
### 작업 내용

- {변경 내용 항목별 bullet. "무엇을, 왜"를 한 줄로. 3~7개 권장}

---

### 연결 이슈

- [{티켓ID}] #{이슈번호}

---

### 비고

- etc
```

### 작업 내용 작성 규칙

- 파일 단위가 아니라 **기능/변경 단위**로 묶는다 (예: "Toggle 컴포넌트 테스트 추가" - 파일 3개가 한 bullet)
- diff에서 파악한 핵심 변경만. 단순 import 정리, 포맷 변경은 묶어서 한 줄로
- 새로 추가된 의존성, 환경 설정 변경, 호환성 영향은 반드시 명시
- 이슈에서 요구한 사항과 실제 구현을 매핑 (이슈가 있을 때)

### 비고 섹션

아래 항목이 해당하면 기록, 아니면 `etc`로 유지:

- breaking change 여부
- 후속 티켓 필요 여부 (예: "페이지 컴포넌트 테스트는 별도 티켓에서 진행")
- 리뷰어가 특별히 봐야 할 부분
- 설정 마이그레이션 필요 (`pnpm install` 재실행 등)

## 5단계: PR 제목 작성

형식: `[{브랜치명}] {변경 내용 요약}`

- 브랜치명은 origin_branch 그대로 (예: `NAVI-99`)
- 요약은 20~40자, 핵심 변경 1개를 대표 명사로
- 예: `[NAVI-99] 공통 컴포넌트 vitest 테스트코드 추가`
- 여러 변경이 균등하면 더 포괄적인 상위 개념으로 (예: "스킬 페이지 개선" ← 랭크 표시 + 푸터 추가)

## 6단계: 품질 게이트 (권장)

PR 생성 전 아래를 실행해서 실패하면 사용자에게 알리고 진행 여부 확인:

1. `pnpm --filter @skillnavi/service lint` - 린트 통과
2. `pnpm --filter @skillnavi/service test` - 테스트 통과

실패해도 강제는하지 않고, "테스트가 실패했습니다. PR 생성을 계속할까요?" 정도로 확인.

## 7단계: PR 생성

```bash
gh pr create \
  --base {target_branch} \
  --head {origin_branch} \
  --title "{제목}" \
  --body "$(cat <<'EOF'
{PR 본문}
EOF
)"
```

`--draft` 플래그는 사용자가 명시하지 않는 한 붙이지 않는다.

## 8단계: 보고

PR 생성 후 아래만 짧게 출력:

- PR URL (`gh`가 반환하는 URL)
- PR 번호
- 변경 파일 수 (신규 N / 수정 M / 삭제 K)
- 커밋 수

전체 본문을 다시 출력하지 않는다 (CLAUDE.md 6번 원칙).

## 유의사항

- force push, push, 브랜치 삭제 등 되돌리기 어려운 작업은 사전 확인 필수 (CLAUDE.md "Executing actions with care")
- 이슈 본문 요약 시 추정하지 않는다 (CLAUDE.md 7번 원칙)
- diff가 매우 큰 경우 통계와 name-status로 먼저 전체를 파악한 뒤 주요 파일만 선별적으로 읽는다
- 브랜치명에서 티켓 ID를 추출할 수 없으면 커밋 메시지 최신 것에서 추출 시도. 둘 다 실패하면 연결 이슈 없이 진행
