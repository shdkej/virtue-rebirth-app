---
작성일: 2026-06-03
Intent: marketing-36
Mode: 내부 기획 L1/L2 (doc-only)
Status: draft
Owner: Marketer (Planner/Developer/Operator 관점 포함)
---

# Virtue Prelaunch 분석 Skill Sheet

> 다음 Marketer/Agent 실행이 매번 제품 taxonomy·쿼리 금지선·activation 정의를 **재발견하지 않도록** 한 장에 고정하는 참조 시트.
> 이 문서는 새 결론을 만들지 않는다. 선행 문서(marketing-06~35)와 `MARKETING_LEARNINGS.md`에서 이미 확정된 판단 기준을 **인덱싱·요약**할 뿐이다.
> 충돌이 생기면 이 시트가 아니라 원본 문서(file:line)와 `MARKETING_LEARNINGS.md`가 단일 진실 원천이다.

## 0. 사용 규칙 (먼저 읽기)

- 새 `marketing-*` 또는 Virtue prelaunch 분석 intent는 **이 시트 → `MARKETING_LEARNINGS.md` → 해당 주제 원본 문서** 순으로 읽고 시작한다.
- 이 시트는 **읽기용 참조**다. 제품 코드·public copy·tracking/privacy·PostHog 설정·dashboard·session replay·배포·외부 발송·비용·권한·개인정보 변경은 이 시트 범위 밖이며 별도 승인(approval-needed) 없이는 실행하지 않는다.
- 이 시트에 적힌 file:line 앵커는 **작성 시점(2026-06-03) 기준 검증값**이다. 실행 전 한 번 `rg`로 drift를 재확인하고, 어긋나면 시트가 아니라 코드를 따른다(§7 검증 명령).
- 작은 표본·synthetic/mock/self-test 신호는 이 시트로 결론을 내리는 근거가 아니다. 방향 재료일 뿐이다([[Prelaunch Decision Boundary]]).

## 1. 제품 Taxonomy — 첫 세션 4-Job (J1~J4)

출처: `first-session-jtbd-matrix.md` (marketing-06). 4개 잡은 **검증 대상 가설**이며 실제 세그먼트가 아니다. 한 사람 안에 여러 잡이 섞일 수 있고, "첫 세션에서 어떤 잡이 먼저 충족되는가"로 분리한다.

| 잡 | 풀 잡 진술 | 포지셔닝 가설 | first value 이벤트 |
|---|---|---|---|
| **J1 기록형** | "오늘의 사소한 행동을 남기고 싶다" | A 자기관찰 게임 | `deed_saved` |
| **J2 누적형** | "내가 얼마나 덕을 쌓았는지 게임처럼 보고 싶다" | B 라이프 RPG | `deed_saved` (부가 `level_up_viewed`) |
| **J3 AI 호기심형** | "AI가 내 행동을 어떻게 해석하는지 보고 싶다" | C AI 셀프 거울 | `deed_judged` (저장은 선택) |
| **J4 회고형** | "나중에 돌아볼 개인 로그를 만들고 싶다" | 개인 로그/덕행록 | `deed_saved` |

## 2. First Value Mapping — 가장 자주 재발견되는 기준 (고정)

- **J1 / J2 / J4 = `deed_saved`** (`apps/web/src/app/add/page.tsx:183`). "남겼다/쌓였다/나중에 돌아볼 게 생겼다"는 저장이 일어나야 충족. 채점은 통과점이지 가치의 끝이 아님.
- **J3 = `deed_judged`** (`apps/web/src/app/add/page.tsx:106`). "AI가 어떻게 보는지"가 목적이라 **저장 전에 이미 가치 발생**. 저장은 선택.
- **J3의 judged−saved 갭은 이탈이 아니다.** J3에서 `deed_judged`만 있고 `deed_saved`가 없는 세션은 **잡 충족 후 정상 종료**일 수 있다. J1/J2/J4에서는 같은 갭이 저장 전 이탈 후보다 — 잡을 먼저 분리하고 갭을 읽는다.
- **iOS 패리티:** `deed_judged` `AddDeedView.swift:103`, `deed_saved` `AddDeedView.swift:136`. 명칭은 웹과 동일(`apps/ios/README.md`). 플랫폼 차이는 `ios-activation-event-parity-brief.md`에 위임.

출처 누적: marketing-06/07/09/10, marketing-20~35. [[First Value Mapping]]

## 3. 이벤트 어휘 — 발화 이벤트와 앵커 (검증값 2026-06-03)

`apps/web/src/app/add/page.tsx` 기준. **신규 이벤트/속성을 만들지 않는다.** 지표 후보는 아래 기존 발화 이벤트만 재사용한다.

| 이벤트 | 앵커 | 의미 | 분류 주의 |
|---|---|---|---|
| `add_flow_started` | `:72` | `/add` 입력 흐름 시작 | 시작점, 가치 아님 |
| `add_flow_abandoned` | `:78` | 입력 중 이탈 | 막힘/정상 종료 분리 필요(§5) |
| `deed_judged` | `:106` | AI 채점 결과 카드 생성 | **J3 first value** |
| `deed_judge_attempted` | `:135` | 채점 시도 | 시도 ≠ acceptance |
| `deed_rerolled` | `:149` | 재채점(다르게 보기) | activity proxy, 만족/불신 단정 금지 |
| `deed_save_capped` | `:167` | 일일 저장 상한 도달 | **availability/friction** (§4) |
| `deed_saved` | `:183` | 덕행 저장 | **J1/J2/J4 first value** |
| `level_up_viewed` | `:199` | 환생종 진화 도달 | J2 부가 동기, 단독 리텐션 단정 금지 |

## 4. Availability ≠ Value (분리 고정)

- `deed_save_capped`(`:167`), 503, 지연, 저장 상한은 **availability/friction 신호**다. value·retention·upgrade demand가 **아니다**.
- cap/실패 신호는 먼저 가용성/마찰로 분류하고, 반복 가치 관찰 전에는 유료화 신호로 쓰지 않는다.
- `deed_save_capped`를 monetization intent, upgrade demand, TTV 종료, 재가치 신호로 환산하지 않는다.

출처: marketing-21/22/23/28/29. [[Availability And Friction Are Not Value]]

## 5. 막힘 4분류 — 저신호를 라우팅하는 렌즈

출처: `product-body-vs-bumper-boundary-table.md`(m31), `onboarding-checklist-audit-table.md`(m35). 막힘은 한 종류가 아니다. 라우팅이 다르다.

| 코드 | 성격 | 라우팅 |
|---|---|---|
| **B-LOST** | 길을 잃음 | 범퍼 후보(안내·체크리스트·툴팁). **맥락 폴백은 B-LOST에만 발동** |
| **B-MISMATCH** | 결과 기대 불일치 | 제품 약속/결과 문제(범퍼로 못 가림) |
| **B-AVAIL** | 가용성 차단 | availability/friction(§4) |
| **B-NORMAL** | 정상 종료 | 이탈 아님. **J3의 저장 없는 종료가 대표 사례** |

- 같은 표면이 잡별로 본체/범퍼 부호가 뒤집힌다 — J1/J2/J4는 저장 후 홈(`deed_saved`)이 본체, J3는 결과 카드(`deed_judged`)가 본체이고 저장은 범퍼(선택). 제품 본체가 약하면 범퍼로 못 가린다.
- **J3에 저장 유도 범퍼를 무조건 붙이면 첫 가치 흐름을 방해**한다. 저장률·재판정수로 막힘 성격을 단정하지 않는다.

[[Product Body vs Bumper By Job]]

## 6. Activation 측정 가능 상태 — Foundation exit gate (값 판정 아님)

출처: `plg-foundation-exit-gate.md`(m34), `activation-candidate-registry.md`(m33), `retention-predictive-activation-brief.md`.

- PLG는 **Foundation → Activation → Conversion** 순서다. Foundation의 종료 조건은 "활성화가 좋다"가 아니라 **"활성화율·기준선을 측정할 수 있는 상태"**다. 측정 *가능성*과 측정 *값의 성패*는 별개 게이트다.
- 활성화는 단일 magic 이벤트가 아니라 **3~5 이벤트 묶음 + 제품별 window**를 retention과 대조한다. 출시 전에 묶음(A1~A4)과 window를 **등록(register)** 해 사후 cherry-pick을 막는다.
  - **A3(J3)만 `deed_saved`를 묶음에 필수 등록하지 않는다** — `deed_judged`가 first value이고 저장 없는 종료가 정상이라.
  - window: **W-IMM**(첫 세션 즉시), **W-CONF**(D7 확인). availability 구간(503·지연·`deed_save_capped`)은 window에서 제외.
- Activation 단계 **진입 판단**은 외부 벤치마크 수치가 아니라 ① 데이터 품질 ② synthetic 제외 ③ 가용성 차단 분리 ④ 같은 잡 재가치 — 이 4가지로 한다.

[[Measurement Readiness Is A Separate Gate]]

## 7. Prelaunch 쿼리/해석 금지선 (DO-NOT)

다음은 작은 표본·prelaunch 단계에서 **하지 않는다.** 위반 시 저신호 과해석으로 이어진다.

1. 외부 벤치마크(TTV<5분·D7 N%·activation 40%)를 prelaunch 합격선으로 복사하지 않는다.
2. 첫 10~20명·D1/D7·PMF 응답·전환율·retention%를 **확정 지표**로 읽지 않는다(정성 질문·손기록 중심).
3. 한 명 신호, completion 지표를 단독으로 승격하지 않는다.
4. **synthetic/mock/self-test** 언어·점수를 사람 사용자 증거나 J3 first value 판단에 섞지 않는다. 트래픽 분류가 신호 해석보다 먼저다([[Traffic Source Before Metrics]]).
5. `deed_save_capped`/503/지연을 value·upgrade·TTV 종료로 환산하지 않는다(§4).
6. **J3의 judged−saved 갭을 가치 부재/이탈/공유성 부재로 단정하지 않는다**(§2, §5). J3 저장을 강제하거나 필수 체크로 넣지 않는다.
7. activity proxy(저장수·reroll·`level_up_viewed` 1회·judged−save 갭)를 단독으로 만족/불신/리텐션/이탈로 단정하지 않는다([[AI Outcome Proxy Separation]]).
8. 공유성(shareworthiness)을 저장수·재판정수로 환산하지 않는다. 공유성은 first value·acceptance와 독립 축이며 저장 전 시점에서 따로 손기록([[Shareworthiness Is A Separate Axis]]).
9. 측정 불가 상태의 비율을 활성화로 읽지 않는다(§6).

## 8. 코퍼스 지도 — 주제별 단일 소유 문서 (재발견 방지)

특정 주제를 다시 정의하지 말고 아래 소유 문서를 먼저 인용한다. (모두 `apps/web/docs/` 하위)

| 주제 | 소유 문서 | intent |
|---|---|---|
| 4-Job taxonomy / first value 매핑 | `first-session-jtbd-matrix.md` | m06 |
| 7일 덕행 루프 / `deed_saved` 셀 정의 | `seven-day-deed-loop.md` | — |
| 첫 결과 강도(입력 대비) | `add-input-output-balance-audit.md` | m21 |
| 60초 가치 관찰 스크립트 | `first-60-second-value-observation-script.md` | m20 |
| AI outcome proxy 사전 | `ai-outcome-proxy-dictionary.md` | m24/m29 |
| AI 신뢰 보정 | `ai-judgment-trust-calibration-audit.md` | m24 |
| 공유성(별도 축) | `shareworthy-first-result-observation-criteria.md` | m30 |
| 본체/범퍼 + 막힘 4분류 | `product-body-vs-bumper-boundary-table.md` | m31 |
| 첫 입력 기본값/placeholder 조향 | `first-input-defaults-prompt-audit.md` | m32 |
| activation 후보 등록부(묶음·window) | `activation-candidate-registry.md` | m33 |
| Foundation exit gate(측정 가능성) | `plg-foundation-exit-gate.md` | m34 |
| 온보딩 체크리스트 4분류 | `onboarding-checklist-audit-table.md` | m35 |
| 트래픽 소스 분리 | `traffic-source-reading-boundary-table.md` | m25 |
| 가용성/마찰 vs 가치 | `prelaunch-monetization-boundary-brief.md` 외 | m21~m28 |
| 실사용자 baseline 양식 | `first-real-user-baseline-template.md` | — |
| iOS 이벤트 패리티 | `ios-activation-event-parity-brief.md` | — |
| 회복 vs 스트릭 리텐션 | `recovery-over-streak-retention-lens.md` | m26 |
| 사용자 언어/혼란 로그 | `first-user-message-confusion-log.md` | m27 |

> 검증 명령(실행 전 drift 점검): `rg -n "deed_saved|deed_judged|deed_save_capped|deed_rerolled|level_up_viewed" apps/web/src` · `rg '<<<<<<<|=======|>>>>>>>' <file>` (conflict marker) · `git diff --stat apps/web/src apps/ios` (코드 diff 0 확인).

## 9. 가정 분리 — 계승 / 변경 / 충돌 / 승격 후보

### 9.1 계승한 가정 (Inherited assumptions, 변경 0)

이 시트는 아래를 **그대로 인용**하며 재정의하지 않는다.

- First Value Mapping: J1/J2/J4=`deed_saved`(:183), J3=`deed_judged`(:106). J3 judged−saved 갭=정상 가능.
- Availability And Friction Are Not Value: `deed_save_capped`(:167)=availability/friction.
- Traffic Source Before Metrics: synthetic/mock/self-test 분리 후 신호 해석. 비결정 등급.
- Prelaunch Decision Boundary: 작은 표본은 방향 재료, 합격선 아님.
- AI Outcome Proxy Separation / Trust Calibration By Job / Shareworthiness Is A Separate Axis / Product Body vs Bumper By Job / Recovery Over Streak / Message Confusion As Evidence / First-Input Defaults Steer The Job / Monetization Boundary / Measurement Readiness Is A Separate Gate.

### 9.2 변경한 가정 (Changed assumptions)

- **없음.** 이 intent는 통합 참조 시트이며 기존 기준을 바꾸지 않는다. 새 결론·새 이벤트·새 정의 0.

### 9.3 충돌 (Conflicts)

- **선행 문서와 충돌 0.** 이 시트는 원본을 요약·인덱싱만 한다. 시트와 원본이 어긋나면 **원본 문서(file:line)와 `MARKETING_LEARNINGS.md`가 우선**이고 시트를 고친다(시트는 파생물).
- source note(`source/external-links/marketing/2026-06-03-agent-first-product-surfaces.md`)는 로컬에 부재(`source/` 트리 자체 없음). intent rationale 요지(agent-first 재발견 비용 절감)만 근거로 사용하고 외부 본문은 인용하지 않는다.

### 9.4 재사용 학습 후보 (Reusable learning candidates)

- 후보: **"Prelaunch Analysis Skill Sheet As A Single Lookup"** — Virtue prelaunch 분석은 매번 taxonomy/first value/금지선/activation 정의를 재발견하지 말고 단일 시트를 먼저 참조한다. 단, 이는 **운영 절차 후보**이지 새 제품 판단 기준이 아니다. 단일 실행 산출물이라 durable 승격은 **다음 실사용 대조 후로 보류**하고 이번엔 report 안에 둔다(§아래 학습 루프).

## 10. 학습 루프 (다음 Marketer 인계)

### 계승한 기준

§9.1 전체. 핵심 3개: First Value Mapping · Availability And Friction Are Not Value · Measurement Readiness Is A Separate Gate.

### 이번에 새로 배운 것

흩어진 기준(taxonomy·first value·이벤트 앵커·금지선·activation 묶음·코퍼스 소유 문서)이 12개 이상 문서에 분산돼 있어, 분석 intent마다 **같은 재발견 비용**이 든다. 이를 한 장의 읽기 전용 시트로 모으면 재발견 대신 **참조 후 대조**로 전환된다. 시트는 새 결론을 만들지 않고 파생물로 두며, 충돌 시 원본이 우선이라는 우선순위를 명시해야 stale 위험을 막는다.

### 다음 Marketer에게 넘길 규칙

1. Virtue prelaunch 분석은 이 시트 → `MARKETING_LEARNINGS.md` → 주제 원본 순으로 읽고 시작한다.
2. file:line 앵커는 실행 전 `rg`로 drift 재확인하고, 어긋나면 코드를 따른다(시트가 아니라).
3. 시트에 새 제품 결론을 추가하지 않는다 — 새 판단은 주제 원본 문서에 쓰고 시트는 인덱스만 갱신한다.
4. J3 저장 미강제, synthetic 제외, availability 분리, judged−saved 갭=정상 가능 — 이 4개를 분석 전에 먼저 확인한다.

### MARKETING_LEARNINGS.md 승격 후보

§9.4. "Prelaunch Analysis Skill Sheet As A Single Lookup"은 운영 절차 후보이며 단일 실행이라 **report 보류**. 다음 분석 intent가 실제로 이 시트를 참조해 재발견 비용이 줄었음이 확인되면 그때 승격 검토.

## 11. Out of scope (이 문서가 하지 않는 것)

새 이벤트·속성·코드·public copy·tracking/privacy·PostHog 설정·dashboard·session replay·배포·외부 발송·비용·시크릿·권한·개인정보 변경. PMF/전환율/리텐션% 확정. 외부 벤치마크 합격선화. 이 시트는 **읽기용 참조 1장**이며 그 외 변경은 별도 Intent·승인이 필요하다.
