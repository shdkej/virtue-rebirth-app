# virtue-rebirth-app

> 덕 쌓기 · 환생 — 모바일 웹앱 MVP

평범한 일상 선행을 사진으로 기록하면 AI가 `덕력`을 채점하고, 누적된 덕력에 따라 다음 생의 **환생종**이 진화하는 가벼운 라이프 게임. 드라마 *Brush Up Life* 컨셉에서 영감.

## 빠른 시작

```bash
pnpm install
pnpm dev      # http://localhost:8030
```

요구사항: Node 22+, pnpm.

다른 명령:

```bash
pnpm typecheck   # tsc --noEmit
pnpm lint        # next lint
pnpm build       # 정적 prerender
pnpm start       # 프로덕션 서버 (build 후)
```

## 스택

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + OKLCH 토큰 + Pretendard Variable
- lucide-react 아이콘
- 로컬/mock 데이터만 (외부 API/DB 없음, 외부 의존 무추가)

## 메뉴 (5개, 하단 탭)

1. **덕력** (`/`) — 누적 덕력 + 환생종 + 최근 덕행 미리보기
2. **덕 쌓기** (`/add`) — 사진 + 메모 + mock AI 채점 → 저장
3. **덕행록** (`/deeds`) — 일자별 타임라인 (오늘/어제/N일 전)
4. **환생도감** (`/dex`) — 종 단계별 컬렉션, 잠긴 단계 티저
5. **나** (`/me`) — 말투(soft/casual) / 일일 30덕 상한 / 테마 / 데이터 내보내기

## 데이터 & 상태

- `src/lib/store.ts` — `useSyncExternalStore` 기반 localStorage 영속 상태.
  - 키: `virtue.rebirth.v1`, `virtue.tone.v1`, `virtue.dailycap.v1`, `virtue.theme.v1`
  - 첫 로드 시 `MOCK_DEEDS` 14건이 시드됨.
- `src/lib/judge.ts` — 메모 키워드 라우팅 + 톤(soft/casual) 별 채점 결과 풀 (≥ 50건). 점수 분포는 0~5 중 2~3 가중치 중심.
- `src/lib/species.ts` — 11단계 (돌→천계의 무언가). 단계마다 `trait`/`evolutionLine`/`nextHint`.
- 저장 시 직전 누적 → 새 누적 사이에 종 임계치 통과하면 LevelUpSheet 모달이 표시됨.

## 인터랙션 디테일

- 덕력 숫자는 `AnimatedNumber`로 카운트업.
- AI 채점 카드는 `animate-virtue-pop` (420ms ease-out-back).
- 환생 진화 시 바텀 시트 + sparkle-rise 키프레임 ✨.
- 토스트는 페이지 어디서나 `showToast(msg)`로 호출 (no external lib).
- 일일 30덕 상한 도달 시 저장 차단 + "오늘은 충분히 쌓았어요. 내일 또 봐요." 토스트.
- 재채점은 한 사이클에 3회까지.
- 테마는 layout `<head>` 인라인 스크립트로 hydration 전에 적용 → 플래시 없음.

## 디자인 시스템

`/home/ubuntu/dev/pt` (purplemux)의 OKLCH 토큰과 Pretendard 폰트를 차용했어요. 상세는 [`docs/design-system-notes.md`](./docs/design-system-notes.md).

한국어 카피 기준은 [`docs/copy-spec.md`](./docs/copy-spec.md) — 도덕적 칭찬/설교/격언 금지, 사실 묘사 + 가벼운 농담 1줄.

## 폴더 구조

```
src/
├── app/                    # 5 라우트 (App Router)
├── components/             # 카드/시트/토스트/숫자/태그/엠티스테이트/스파클글로우 등
├── lib/                    # store · judge · species · greeting · format · mock-data · cn
└── styles/globals.css      # OKLCH 토큰 + 커스텀 키프레임
```

## 다음 단계

- 진짜 AI 채점 API 연결 (Claude Sonnet 4.6 vision, zod로 JSON 강제)
- 사진 영속화 (Supabase Storage / Cloudflare R2)
- shadcn/ui base-nova 컴포넌트 도입 (Drawer로 업로드 모달 교체)
- 배포 도메인 결정 (`virtue.oracle.shdkej.com` 후보)
- 친구 공유 / 도전 과제 / 푸시 (MVP 이후)
