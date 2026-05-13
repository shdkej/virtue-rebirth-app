# 디자인 시스템 노트

> 모바일 웹앱 `virtue-rebirth-app`이 `/home/ubuntu/dev/pt` (purplemux) 디자인 시스템에서 차용한 요소를 기록합니다. purplemux 원본은 수정하지 않습니다.

## 차용한 것

| 요소 | 출처 | 적용 위치 |
|------|------|-----------|
| OKLCH 색 토큰 9채널 (`--ui-blue` … `--ui-red`) | `pt/src/styles/globals.css` | `src/styles/globals.css` |
| `--brand: var(--ui-purple)` | 동일 | 메인 CTA, 활성 탭, 채점 결과 강조 |
| `--positive: var(--ui-teal)` | 동일 | 누적 덕력 / 환생 진행도 / 저장 버튼 |
| `--ui-amber` | 동일 | AI 채점 점수의 따뜻한 강조 색 |
| Pretendard Variable 한국어 폰트 | `pt/public/fonts/PretendardVariable.woff2` | 동일 woff2 파일을 `public/fonts/`에 복사 |
| Tailwind v4 `@theme inline` 토큰 패턴 | 동일 | `--color-brand`, `--color-positive` 등 |
| 라이트/다크 대응 토큰 (`.dark` 셀렉터) | 동일 | 동일하나 MVP에서는 토글 UI만 |

## 적용 톤

- **브랜드 컬러**: `--ui-purple` 단일. 메인 CTA "오늘 덕 쌓기" 버튼과 "AI 채점" 버튼에만 사용.
- **포지티브**: `--ui-teal`은 누적/진행/달성 컨텍스트 — 채점 점수의 +N 칩, 진행 바, 저장 버튼.
- **앰버**: AI 채점 결과의 큰 숫자 — 따뜻한 라벨 효과.
- **타이포**: Pretendard. 숫자는 `tabular-nums`로 점프 방지.
- **모서리**: `--radius: 0.875rem`. 카드는 `rounded-2xl` 기준 — 모바일에서 부드러운 인상.
- **그림자**: 단일 헤어라인 (`shadow-[0_1px_0_color-mix(...)]`). 무거운 drop-shadow는 피함.
- **모션**: 채점 결과 카드에 `animate-virtue-pop` (420ms, ease-out-back 풍). 과도한 confetti는 지양.

## 차용하지 않은 것 / 단순화

- shadcn/ui 풀 설치는 보류 — 카드/프로그레스/탭만 직접 작성해 의존성 최소화.
- `next-themes`, `sonner`, `vaul` 등은 MVP 범위 밖.
- 차트(`recharts`), 마크다운, 코드 하이라이트는 본 앱과 무관.

## 레이아웃 규칙

- 컨테이너: `max-w-md mx-auto min-h-dvh`. 데스크톱에서도 폰 모양의 한 칼럼.
- 본문 패딩: `px-5 pt-6`, 카드 간 `gap-4`.
- 하단 탭: `sticky bottom-0` + `pb-[env(safe-area-inset-bottom)]`. iOS 홈 인디케이터 영역 대응.
- 한 손 도달 영역: CTA는 화면 중앙~하단 근처.

## 후속 작업

- 다크 모드 실제 적용 (현재는 토글 UI만).
- shadcn/ui base-nova `Button`/`Drawer`로 채점 흐름 교체.
- 사진 업로드를 vaul Drawer 안으로 옮겨 모달 UX로 통일.
- AI 채점 API 연결 시 zod 스키마로 JSON 강제.
