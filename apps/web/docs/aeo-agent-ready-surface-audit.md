---
작성일: 2026-05-26
Intent: marketing-18
Mode: 내부 감사 L1 (+ L2 agent-approved push)
Status: draft
Owner: Marketer (Planner/Developer/Operator 관점 포함)
---

# Virtue AEO / Agent-ready 공개 표면 감사표

## 0. 목적 + 전제

### 목적

GeekNews GN#354의 AEO(Agentic Engine Optimization) · Agent-ready · GEO · AAO 묶음은, 검색 *결과 순위*에서 **AI 답변 엔진과 브라우징/코딩 에이전트가 제품을 찾고(discover) · 읽고(parse) · 요약하고(summarize) · 선택할(select) 수 있는 구조**로 초점이 옮겨가고 있음을 보여준다. Virtue는 아직 **prelaunch / low-signal**이므로, 지금 할 일은 외부 노출을 키우는 게 아니라 **현재 공개 표면이 AI/에이전트에게 어떤 제품으로 읽히는지**를 감사하고, 바로 가능한 내부 문서 작업과 사용자 승인이 필요한 공개 변경을 **분리**하는 것이다.

본 문서는 다음 한 장을 만든다.

- AEO/Agent-ready를 5축 렌즈로 고정한다(§1): 발견 가능성 · 파싱 용이성 · 토큰 효율성 · 기능/가치 시그널링 · 접근 제어.
- Intent 성공기준이 지정한 **8개 공개 표면 항목**을 한 표로 점검하고, 각 항목을 `이미 충분함 / 내부 문서 필요 / 공개 변경 필요 / 승인 필요`로 분류한다(§2, 문서의 심장).
- 가장 큰 구조적 발견(클라이언트 렌더 셸 = 에이전트 비가시)을 코드 근거로 짚는다(§3).
- AI/에이전트가 Virtue를 어떻게 요약해야 하는지 **내부 후보 스니펫**(무엇을/누가/언제/왜 다른가)을 초안한다(§4, 앱·공개 미반영).
- 지금 L1으로 가능한 것과 공개 변경/승인 필요 경계를 명시한다(§5).

### 전제 못박기

1. **변경 0건.** 본 Intent(marketing-18)는 robots/sitemap/metadata/layout/head/llms.txt/공개 페이지/소스 코드/배포/시크릿/권한/애널리틱스 스키마를 **단 하나도 바꾸지 않는다.** `apps/web/docs/` 아래 본 문서 1개만 추가한다. 본 문서의 "공개 변경 필요"·"승인 필요" 행은 모두 **제안(proposal)**이며, 어떤 것도 *이미 적용했다는 주장이 아니다*.
2. **prelaunch이므로 외부 노출 최적화를 하지 않는다.** AEO를 "더 많이 노출되자"로 쓰지 않는다. 오히려 prelaunch에서는 **접근 제어(노출을 의도적으로 닫아두기)**도 정당한 결론일 수 있다(§1-⑤, §2-③). 본 감사는 "지금 노출을 키운다"가 아니라 "AI/에이전트가 Virtue를 *어떤 문제의 해법으로* 요약할 수 있는가"를 먼저 정의한다.
3. **선행 문서를 AEO 렌즈로 재합성할 뿐, 복제·반박하지 않는다.** `first-session-jtbd-matrix`의 J1~J4 정의, `competitive-alternatives-positioning-brief`의 경쟁 대안·차별 속성, `three-screen-value-path-audit`의 화면 경로를 그대로 계승해 "에이전트가 읽을 설명면" 한 축만 더한다(§6 충돌 점검).
4. **출처 링크는 배경 참고로만 쓴다.** Addy Osmani(Agentic Engine Optimization), isitagentready.com(agent-ready 체크리스트), a16z(GEO over SEO), Search Engine Land(AAO)는 외부 호출 없이 개념 배경으로만 인용한다. Infinity `research-08`(GEO/LLMO 체크리스트)의 결론 — *Virtue는 public explainer/canonical 선행, llms.txt는 보조* — 을 계승한다.

### workflow-master 처리

- target repo(`virtue-rebirth-app`)에 `.agent/workflows/workflow-master.md` · `WORKFLOW-MASTER.md` **모두 부재**(`find` 무매치, `.claude/`에는 `settings.local.json`·`skills`만). 부재를 기록하고, 선행 Virtue 문서 Intent(marketing-16/17)와 동일하게 **Planner/Developer/Marketer/Operator 4역할 관점 병렬 합성** 규율로 진행한다.

## 1. AEO / Agent-ready 5축 렌즈 정의

출처 노트(`2026-05-26-aeo-agent-ready-research.md`)의 핵심 축을 감사 기준으로 고정한다. 사람이 보는 화면과 **기계가 소비하는 표면**은 다르다는 전제에서 출발한다.

| 축 | 질문 | Virtue 적용 시 의미 |
|---|---|---|
| ① 발견 가능성 (Discoverability) | 에이전트/봇이 이 제품의 존재와 경계를 알 수 있는가? | robots/sitemap/canonical로 무엇이 공개면인지 신호하는가. prelaunch면 "아직 없음"도 신호다. |
| ② 파싱 용이성 (Parseability) | 초기 HTML/구조화 데이터만으로 제품 설명을 읽을 수 있는가? | SSR/정적 텍스트·JSON-LD 없이 클라이언트 렌더면 봇은 빈 셸만 본다(§3). |
| ③ 토큰 효율성 (Token efficiency) | 핵심 요약을 적은 토큰으로 줄 수 있는가? | Markdown/llms.txt 같은 저토큰 요약면 후보. |
| ④ 기능/가치 시그널링 (Capability/Value signaling) | "무엇을 하는가 · 누가 · 언제 · 왜 다른가"가 명시돼 있는가? | 내부엔 충분(JTBD·경쟁 대안 문서), 기계 판독 표면엔 부재. |
| ⑤ 접근 제어 (Access control) | AI 봇 규칙·API/인증 경계가 의도적으로 설정돼 있는가? | prelaunch는 *닫아두기*가 기본값일 수 있음. 현재는 규칙 부재 = 의도 없는 기본 개방. |

> 읽는 법: ①②③은 "에이전트가 읽을 수 있는가"의 기계 표면, ④는 "읽고 나서 무엇으로 요약하는가"의 내용, ⑤는 "애초에 읽게 둘 것인가"의 경계다. prelaunch Virtue의 정답은 ④를 내부에서 먼저 고정하고, ①②③⑤는 **승인 전까지 제안 상태로 둔다**.

## 2. 공개 표면 감사표 (문서의 심장)

각 행은 Intent 성공기준이 지정한 8개 항목. 컬럼은 `항목 | 현재 상태(코드/파일 근거) | AEO 렌즈 평가 | 분류 | 지금 할 수 있는 것 / 경계`. 모든 "현재 상태"는 repo read-only 근거이며, 분류의 4값은 `이미 충분함 / 내부 문서 필요 / 공개 변경 필요 / 승인 필요`다.

| # | 항목 | 현재 상태 (근거) | AEO 렌즈 평가 | 분류 | 지금 할 수 있는 것 / 경계 |
|---|---|---|---|---|---|
| 1 | **Public homepage** (`/`) | `src/app/page.tsx`가 **`"use client"`** 대시보드. 덕력·환생종·최근 덕행 모두 localStorage 스토어(`lib/store.ts`)에서 클라이언트 렌더. 초기 서버 HTML 본문엔 제품 설명 텍스트가 없음(§3). | ②파싱 **취약** — 봇/답변엔진은 빈 셸 + `<title>`/`<meta description>`만 본다. ④시그널링 본문 부재. | **공개 변경 필요** | 정적/SSR 요약 블록 또는 봇 대상 설명면은 **코드 변경**이라 본 Intent 범위 밖(proposal-only). 적용엔 배포까지 필요 → **승인 필요** 동반. prelaunch라 선행조건은 §4 정본 설명면 확정. |
| 2 | **Canonical product explainer** | 공개 정본 설명 페이지(`/about` 등) **부재**. `README.md`(repo 내부)·`apps/web/docs/*`만 존재(비공개). | ①발견·④시그널링 공개면 부재. 단 내부 근거(JTBD·경쟁 대안)는 풍부. | **내부 문서 필요** | 정본 설명면(무엇/누가/언제/왜 다른가)을 **내부에서 먼저 확정**하는 것이 L1 가능 작업 → 본 §4가 후보 제공. 공개 게시는 별도(공개 변경 필요). |
| 3 | **robots.txt** | **부재.** `app/robots.ts`·`public/robots.txt` 없음. (`find` 무매치) | ⑤접근 제어 **무설정** = 의도 없는 기본 개방. ①봇이 공개 경계를 알 신호 없음. | **공개 변경 필요** | prelaunch 안전 기본값은 오히려 `noindex`/AI 봇 disallow일 수 있음(§1-⑤). robots 추가는 공개 파일 변경 + 배포 → **승인 필요**. 본 Intent로는 권고만. |
| 4 | **sitemap** | **부재.** `app/sitemap.ts` 없음. | ①발견 보조 신호 부재. prelaunch·소수 라우트라 우선순위 낮음. | **공개 변경 필요** | 라우트가 5개(`/`,`/add`,`/deeds`,`/dex`,`/me`)뿐이고 대부분 개인 데이터 화면이라 sitemap 가치 낮음. 추가 시 공개 변경 + 배포 → **승인 필요**. 저우선 권고. |
| 5 | **Structured metadata** | `layout.tsx`에 `title`("덕 쌓기 · 환생")·`description`("오늘 1덕만 쌓아볼까요? — Brush Up Life에서 영감받은 모바일 라이프 게임")·`viewport`/`themeColor`만. **OpenGraph·Twitter card·JSON-LD(schema.org)·canonical URL·manifest 모두 부재.** `<html lang="ko">`. | ②③④ 부분 — `description` 한 줄이 유일한 기계 판독 요약. 구조화 데이터(예: `SoftwareApplication`) 없음. | **공개 변경 필요** | OG/Twitter/JSON-LD/canonical은 `layout.tsx`(=metadata/head) **코드 변경**이라 본 Intent 금지선. *무엇을 넣을지*의 내용 정의는 내부 선행(§4). 적용엔 배포 → **승인 필요**. |
| 6 | **Markdown / llms.txt candidate** | **부재.** `public/llms.txt` 없음. `public/`엔 `fonts/`만. | ③토큰 효율 면 후보 자리. research-08: explainer 선행, llms.txt는 보조. | **내부 문서 필요** | llms.txt **후보 초안**(저토큰 요약)은 L1 내부 작성 가능 → §4 스니펫이 1차 재료. 단 `public/llms.txt`로 **게시하는 행위는 공개 변경 필요**(본 Intent 금지). |
| 7 | **Agent answer snippet** | 공개·내부 모두 정형 스니펫 **부재.** 단 근거(차별 속성)는 `competitive-alternatives-positioning-brief.md`에 정리됨. | ④시그널링 핵심. "AI가 Virtue를 한 문단으로 어떻게 요약할까"의 정답 부재. | **내부 문서 필요** | §4가 무엇/누가/언제/왜 다른가 **내부 후보 스니펫** 제공(앱·공개 미반영, copy-spec 대조 포함). 공개 노출 승격은 별도 카피 검수 + 승인 필요. |
| 8 | **Capability/Value signaling (내부 정의)** | 내부 포지셔닝 기반이 **이미 풍부** — `first-session-jtbd-matrix`(J1~J4), `competitive-alternatives-positioning-brief`(경쟁 대안 5축), `minimum-viable-audience-brief`, `first-impression-positioning-snapshot` 등 7+ 문서. | ④ 내부 정의는 충분. 부족한 건 *기계 판독 표면화*뿐(=행 1·5로 위임). | **이미 충분함** | 내부 기능/가치 정의는 추가 문서 없이 충분. 본 §4는 그 정의를 *에이전트 요약 형태로 압축*만 함. 표면화(공개)는 행 1·5의 공개 변경 필요로 분리. |

> 4분류 요약: **이미 충분함** = 항목 8(내부 정의) · **내부 문서 필요** = 항목 2·6·7(L1 즉시 가능, 본 문서가 1차 산출) · **공개 변경 필요** = 항목 1·3·4·5(코드/공개 파일 변경, proposal-only) · **승인 필요** = 항목 1·3·4·5의 *배포·게시* 단계(공개 변경이 실제 적용되려면 배포가 필요하므로 모두 승인 게이트를 동반). 즉 prelaunch에서 *지금 손댈 곳*은 내부 문서(2·6·7)뿐이고, 기계 표면(1·3·4·5)은 전부 승인 뒤로 미룬다.

## 3. 핵심 발견 — 클라이언트 렌더 셸 = 에이전트 비가시

가장 큰 구조적 사실 하나를 코드 근거로 못박는다. **현재 공개 표면은 사람 브라우저엔 정상이지만, 봇/답변엔진에겐 사실상 빈 화면이다.**

| 사실 | 코드 근거 |
|---|---|
| 모든 앱 페이지가 클라이언트 컴포넌트 | `"use client"`가 `app/page.tsx`·`add/page.tsx`·`deeds/page.tsx`·`dex/page.tsx`·`me/page.tsx`·`error.tsx` 전부에 선언 (`rg "use client" app` 6매치) |
| 본문 데이터가 localStorage 의존 | `app/page.tsx`의 `useDeeds()`/`useVirtueStats()`가 `lib/store.ts` 클라이언트 스토어를 읽음 → SSR 시 빈 값 |
| 기계 판독 요약은 메타데이터 2줄이 전부 | `layout.tsx:6-9` `title`+`description`. JSON-LD/OG 없음 |
| 정적/SSG 출력 미설정 | `next.config.ts`에 `output` 모드 없음(기본 SSR). 단 페이지가 client component라 초기 HTML 본문은 셸 |
| 라이브 도달 가능성은 존재 | Infinity `marketing-01` 아카이브: k8s `deployment/virtue-rebirth` 라이브 HTTP 200 → 봇이 *도달은* 가능하나 *읽을* 본문이 없음 |

**해석(판정 아님):**

- AEO ②파싱 관점에서 현재 Virtue는 "도달 가능하지만 파싱 불가"에 가깝다. 답변엔진이 인용하려 해도 `<title>`+`description` 한 줄 외에 근거 텍스트가 없다.
- **이 비가시성은 *우연히* prelaunch 전략(노출 확대 안 함)과 정렬돼 있다.** 그러나 이는 **의도된 접근 제어(⑤)가 아니라 렌더링 방식의 부산물**이다. "지금 안 보이니 됐다"와 "의도적으로 안 보이게 했다"는 다르다 — 후자를 원하면 robots/noindex가 필요하고(행 3), 전자(launch 시 보이게)를 원하면 SSR 요약/JSON-LD가 필요하다(행 1·5). **둘 다 공개 변경 + 승인이라 본 Intent로는 결정·구현하지 않는다.**
- 따라서 prelaunch 단계의 정직한 1순위는 *기계 표면을 손대는 것*이 아니라, **launch 시 무엇을 보이게 할지의 내용(§4)을 내부에서 먼저 확정**하는 것이다.

## 4. Agent answer snippet 후보 (내부 초안 · 앱/공개 미반영)

"AI/에이전트가 Virtue를 한 문단으로 요약한다면" 의 **내부 후보**다. 사용자 노출 카피 확정본이 아니며, 앱·메타데이터·llms.txt 어디에도 반영하지 않는다. 근거는 모두 선행 문서(§6)에서 계승했다.

### 4-1. 4문항 구조 (무엇 / 누가 / 언제 / 왜 다른가)

- **무엇을 하는 제품인가:** 하루에 한 번, 오늘 한 일을 사진 한 컷 + 한 줄로 남기면 AI가 짧게 채점하고, 누적 점수("덕력")로 캐릭터 종(species)이 환생·진화하는 모바일 라이프 게임. (일본 드라마 *Brush Up Life*에서 영감.)
- **누가 쓰는가 (J1~J4 가설 계승):**
  - J1 기록형 — 일기/사진일기가 매번 거창해져 부담스러웠던 사람.
  - J2 누적형 — 점수 쌓이는 재미는 좋지만 습관앱의 스트릭 강박은 싫은 사람.
  - J3 AI 호기심형 — 긴 프롬프트 없이 "AI가 내 오늘을 어떻게 보는지" 궁금한 사람.
  - J4 회고형 — 정리 부담 없이 자동으로 쌓이는 개인 로그를 원하는 사람.
- **언제 쓰는가:** 하루 1회, 오늘 한 일을 가볍게 남기고 싶을 때. (일일 상한이 "오늘은 됐다" 경계를 대신 그어줌.)
- **왜 기본 대안과 다른가 (경쟁 대안 계승):**
  - 감사일기/메모앱 대비 → **쓰기 무게 제거**(사진 한 컷 + 한 줄이 입력 전부).
  - 습관 게임화 앱 대비 → **끝이 있는 환생 메타포 + 일일 상한**(끝없는 육성·스트릭 압박의 반대).
  - ChatGPT에 직접 입력 대비 → **프롬프트 없는 한 줄 채점**(사진 한 장이면 됨).
  - 노션/메모 아카이브 대비 → **정리 구조 없이 자동 누적**.
  - J1·J4의 가장 강한 대안은 경쟁 앱이 아니라 **"그냥 아무것도 안 하기"**(competitive 문서 §2 계승).

### 4-2. 저토큰 요약 1줄 (llms.txt 후보 재료)

> Virtue(덕 쌓기·환생): 하루 한 번 오늘 한 일을 사진+한 줄로 남기면 AI가 짧게 채점하고, 누적 "덕력"으로 종이 환생·진화하는 가벼운 모바일 라이프 게임. 일기의 쓰기 부담·습관앱의 스트릭 강박 없이, 하루 1덕만.

### 4-3. copy-spec 대조 (안전 확인)

- 위 후보는 `copy-spec.md` 금지어 명단(훌륭한·본받을·모범적인·귀감·인성·미덕·선행·베풂·봉사정신·마음이 따뜻한·좋은 사람·멋진 인격)을 **사용자 노출 문구로 쓰지 않았다.** "한 일/행동/덕행" 같은 앱 자체 어휘로 표현했고, 금지어는 본 §4-3 한 곳에서만 *금지선 설명용 메타 맥락*으로 등장한다.
- "환생/다음 생"은 copy-spec이 메타포 한정 허용("다음 생" OK / "업보 쌓아라" NG)하므로 통과. 단 **사용자 노출로 승격하려면** 부드러운 존댓말 톤(`~요`/`~네요`) 재작성 + 금지어 재대조가 필요하다(competitive 문서 §6 계승).

## 5. 지금 가능한 것 vs 공개 변경/승인 필요 경계

출처 노트와 Intent permission(L0/L1 리서치 및 내부 감사만)을 그대로 반영한다.

| 구분 | 항목 | 상태 |
|---|---|---|
| **지금 L1 가능** | 본 AEO 감사표 작성(본 문서) | 가능 |
| **지금 L1 가능** | 정본 설명면·agent snippet·llms.txt **후보 초안**(앱/공개 미반영) | 가능 (§4) |
| **지금 L1 가능** | 선행 positioning/JTBD 문서를 AEO 렌즈로 재합성 | 가능 |
| **공개 변경 필요(proposal-only)** | `app/robots.ts` 추가 (noindex/AI 봇 규칙) | 미적용 — 권고만 |
| **공개 변경 필요(proposal-only)** | `app/sitemap.ts` 추가 | 미적용 — 저우선 권고 |
| **공개 변경 필요(proposal-only)** | `layout.tsx`에 OG/Twitter/JSON-LD/canonical 추가 | 미적용 — 권고만 |
| **공개 변경 필요(proposal-only)** | homepage 정적/SSR 설명 블록 (파싱 가능화) | 미적용 — 권고만 |
| **공개 변경 필요(proposal-only)** | `public/llms.txt` 게시 | 미적용 — 권고만 |
| **승인 필요(Waiting)** | 위 공개 변경들의 **배포(production 반영)** | approval-needed |
| **승인 필요(Waiting)** | 검색엔진/AI 디렉터리 외부 제출 | approval-needed |
| **승인 필요(Waiting)** | 비용 집행(도메인/SEO 도구 등) | approval-needed |

> 경계 한 줄: **후보 문구·감사표를 쓰는 것까지가 L1. robots/sitemap/metadata/llms.txt/페이지를 *파일로 바꾸는 순간부터 공개 변경, 배포하는 순간부터 승인 필요*.**

## 6. 충돌 점검 (no-conflict)

본 문서가 선행 문서/금지선과 **충돌 없음**을 명시한다.

| 대상 문서 | 충돌 여부 | 근거 |
|---|---|---|
| `docs/first-session-jtbd-matrix.md` | **없음** | J1~J4 정의(기록형/누적형/AI 호기심형/회고형)를 §4 "누가 쓰는가"에 verbatim 계승. 새 잡·새 활성화 이벤트 정의 0. |
| `docs/competitive-alternatives-positioning-brief.md` | **없음** | §4 "왜 다른가"의 차별 속성(쓰기 무게 제거·끝있는 메타포+상한·프롬프트 없는 채점·정리 없는 누적)과 "아무것도 안 하기" 최강 대안을 §1~§2·§4에서 인용만. 새 positioning 가설·헤드라인 0. |
| `docs/three-screen-value-path-audit.md` | **없음** | §3의 클라이언트 렌더/화면 구조는 동 문서의 S1`/`→S2`/add`→S3 결과 카드 경로와 정합. 화면 경로 재정의 0. |
| `docs/first-impression-positioning-snapshot.md` / `minimum-viable-audience-brief.md` | **없음** | 내부 capability/value 정의가 "이미 충분함"(행 8)이라는 판단의 근거로 인용만. 카피·세그먼트 확정 0. |
| `docs/copy-spec.md` (금지어) | **없음** | §4 후보 스니펫에 금지어를 사용자 노출 문구로 쓰지 않음. 금지어는 §4-3 한 곳에서 금지선 설명용 메타 맥락으로만 등장(competitive 문서 §6과 동일 관례). |
| Infinity `research-08` (GEO/LLMO 체크리스트) | **없음** | "Virtue는 public explainer/canonical 선행, llms.txt는 보조" 결론을 그대로 계승 — 행 6에서 llms.txt를 explainer 다음 보조로 분류. 반박 0. |

## 7. Out of scope (변경 0건)

본 Intent(marketing-18)로 수행하지 않으며, 각각 별도 Intent/승인 후보다.

- **공개 표면 파일 변경 0건.** `robots.txt`·`sitemap`·`layout.tsx`(metadata/head)·공개 페이지·`public/llms.txt` 어느 것도 만들지 않음. §2·§5의 해당 행은 전부 *제안*이다.
- **소스 코드·카피·런타임 변경 0건.** `apps/web/src`·`apps/ios`·런타임 설정 변경 0. `apps/web/docs/` 1파일만 추가.
- **배포·CI 트리거 0건.** production/k8s에 새 빌드를 올리지 않음.
- **애널리틱스 스키마·대시보드·플래그·신규 이벤트 0건.** PostHog 설정을 읽지도 바꾸지도 않음(본 감사는 공개 표면 한정).
- **외부 호출·제출·발송·비용 0건.** 배경 출처 링크를 외부 fetch 하지 않았고, 검색엔진/AI 디렉터리 제출·도메인/도구 구매 없음.
- **시크릿·권한·개인정보 변경 0건.**
- **라이브 URL 능동 probe 미수행.** 배포된 공개 URL의 실제 응답을 본 감사는 fetch하지 않는다(repo read-only 근거로 충분, 외부 상태 비변경 원칙).

### 검증 게이트 (작성 시 self-check)

```bash
git diff --stat -- apps/web/src apps/ios                                    # 코드 변경 없음 (빈 출력)
git diff --name-only                                                        # 신규 doc 1개만
rg '<<<<<<<|=======|>>>>>>>' apps/web/docs/aeo-agent-ready-surface-audit.md || true  # 충돌 마커 0
```

---

## 검증 매핑

| # | 성공기준 (marketing-18) | 충족 섹션 |
|---|---|---|
| 1 | public homepage 점검 | §2 행 1, §3 |
| 2 | canonical product explainer 점검 | §2 행 2, §4 |
| 3 | robots.txt 점검 | §2 행 3, §1-⑤ |
| 4 | sitemap 점검 | §2 행 4 |
| 5 | structured metadata 점검 | §2 행 5, §3 |
| 6 | Markdown/llms.txt 후보 점검 | §2 행 6, §4-2 |
| 7 | agent answer snippet 점검 | §2 행 7, §4 |
| 8 | capability/value signaling 점검 | §2 행 8, §1-④ |
| 9 | 각 항목을 `이미 충분함/내부 문서 필요/공개 변경 필요/승인 필요`로 분류 | §2 분류 컬럼 + §2 4분류 요약 |
| 10 | 코드·카피·배포·robots/sitemap/metadata 변경 0건 | §0 전제①, §7 Out of scope + 검증 게이트 |
| 11 | 기존 positioning/JTBD/activation 문서와 충돌 0 | §6 충돌 점검 |
