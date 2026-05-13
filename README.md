# virtue-rebirth-app

> 덕 쌓기 · 환생 — 모바일 웹앱 MVP

평범한 일상 선행을 사진으로 기록하면 AI가 `덕력`을 채점하고, 누적된 덕력에 따라 다음 생의 **환생종**이 진화하는 가벼운 라이프 게임. 드라마 *Brush Up Life* 컨셉에서 영감.

## 빠른 시작

```bash
pnpm install
pnpm dev      # http://localhost:8030
```

요구사항: Node 22+, pnpm.

## 스택

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + OKLCH 토큰
- lucide-react 아이콘
- 로컬/mock 데이터만 (외부 API/DB 없음)

## 메뉴 (5개, 하단 탭)

1. **덕력** (`/`) — 누적 덕력 + 환생종 + 최근 덕행
2. **덕 쌓기** (`/add`) — 사진 업로드 + 메모 + mock AI 채점
3. **덕행록** (`/deeds`) — 일자별 타임라인
4. **환생도감** (`/dex`) — 종 단계별 컬렉션
5. **나** (`/me`) — 톤/캡/테마/내보내기

## 디자인 시스템

`/home/ubuntu/dev/pt` (purplemux)의 OKLCH 토큰과 Pretendard 폰트를 차용했어요. 상세는 [`docs/design-system-notes.md`](./docs/design-system-notes.md).

## 다음 단계

- 진짜 AI 채점 API 연결 (Claude Sonnet 4.6 vision)
- 영속화 (SQLite + Tailscale 또는 Supabase)
- 다크 모드 실제 적용
- shadcn/ui base-nova 컴포넌트 도입
