---
작성일: 2026-06-05
Intent: marketing-40
Mode: 내부 기획 L1
Status: draft
Owner: Marketer (Planner/Developer/Operator 관점 포함)
---

# Virtue 막힘 지점 넛지 경계표

## 0. 목적 + 전제

### 목적

Amplitude의 Guides and Surveys 발표(출처노트 `source/external-links/marketing/2026-06-05-behavior-triggered-onboarding-nudges.md`)의 핵심은 **인앱 안내가 모두에게 같은 팝업을 띄우는 방식이면 신뢰를 해친다**는 것이다. 좋은 넛지는 형식(투어·배너·툴팁·체크리스트)이 아니라 **event-triggered guidance** — 사용자가 *어느 행동에서 막혔는가*의 맥락을 읽고 필요한 순간에만 나온다. Lenny Distilled의 activation 렌즈도 "기능 설명"보다 즉시 가치, vanity click보다 retention과 연결되는 activation, 그리고 **좋은 마찰과 나쁜 마찰의 분리**를 강조한다.

Virtue는 이미 `/add` 진입·판정·저장·재판정·저장 상한·레벨업 이벤트를 발화한다. 그러나 첫 사용자가 막힐 때 바로 카피·팝업을 추가하면, (a) 좋은 마찰까지 없애거나 (b) J3처럼 저장 없이 끝나는 정상 흐름을 이탈로 오독할 수 있다.

본 문서는 UI를 구현하지 않는다. 대신 **기존 이벤트 조합(trigger condition)별로 ① 도움/넛지 후보(proposal-only), ② 아무것도 띄우지 말아야 할 경우, ③ 수기 관찰 질문, ④ prelaunch 금지선**을 한 표로 먼저 고정한다.

이 문서가 답하려는 질문은 "무엇을 띄울까"가 아니다. 질문은 **"어느 이벤트 조합에서 어떤 도움이 정당하고, 어느 상황에서는 *아무것도 띄우지 않는가*"** 이다. 출처노트의 표현대로, 첫 10명 관찰에서 막힘 신호와 정상 종료를 구분하려면 "띄우지 않는 경계"가 먼저 있어야 한다.

### 이 문서의 자리 (다른 문서와의 경계)

기존 docs와 **렌즈가 직교**하도록 좌표를 먼저 못박는다(중복·충돌 0).

- **표면(화면)별 본체/범퍼 분류는 `product-body-vs-bumper-boundary-table.md`(marketing-31) 소관.** 본 문서는 표면이 아니라 **이벤트 조합(trigger)** 을 행 단위로 본다.
- **수기 마찰 태그(F1~F9)는 `first-session-friction-observation-protocol.md`(marketing-17) 소관.** 본 문서의 "수기 관찰 질문" 칸은 그 태그를 *불러 쓰는* 부착 어휘이며 새 태그를 만들지 않는다.
- **체크리스트 항목 분류(CL-ELIGIBLE/BUMPER-ONLY/CONTEXTUAL-FALLBACK/DO-NOT-INCLUDE)는 `onboarding-checklist-audit-table.md`(marketing-35) 소관.** 본 문서는 체크리스트가 아니라 "막힘 trigger에 도움을 *띄울지/말지*"의 경계만 다룬다. 폴백 발동 조건(B-LOST)은 그 문서를 계승한다.
- **막힘 성격 4분류(B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL)는 `product-body-vs-bumper-boundary-table.md` §2 소관.** 본 문서는 재정의 없이 그대로 인용한다.
- **good/bad/hold 처분은 `activation-path-friction-audit.md`(marketing-12) 소관.** 본 문서는 넛지를 *처분*하지 않고 후보/금지 경계만 고정한다(모두 proposal-only).

### 전제 (못박기)

- Virtue는 정식 출시 전이고 결정 등급 사용자 데이터가 없다. 모든 잡·분류는 **가설**이며, 합성/mock/self-test·소수 표본 신호를 결정 등급으로 승격하지 않는다.
- 본 문서는 **새 트래킹/코드/카피/이벤트/속성/대시보드/세션리플레이/배포/공개 발송을 만들지 않는다.** 이미 구현된 화면과 기존 발화 이벤트만 인용한다. 넛지 후보는 *문구를 쓰지 않고* 역할만 적는다.
- 기존 first value 매핑을 **재정의하지 않는다.** J1/J2/J4 = `deed_saved`:183, J3 = `deed_judged`:106(저장 전)을 그대로 계승한다.
- 가용성/마찰 신호(`deed_save_capped`:167, 503, 판정 지연, 저장 상한)는 value·retention·upgrade demand가 아니라 **availability/friction**으로 분류한다. conversion 압박이 아니라 제한 설명·회복 경로 문제로 분리한다.
- 인용 이벤트 앵커(현행 `apps/web/src/app/add/page.tsx` 일치): `add_flow_started`:72 · `add_flow_abandoned`:78 · `deed_judged`:106 · `deed_judge_attempted`:135 · `deed_rerolled`:149 · `deed_save_capped`:167 · `deed_saved`:183 · `level_up_viewed`:199.

## 1. 개념: 넛지는 팝업이 아니라 event-triggered 막힘 지점 도움

출처노트의 번역을 Virtue 어휘로 못박는다.

| 잘못된 모양 (avoid) | 올바른 모양 (target) |
|---|---|
| 모든 사용자에게 같은 팝업/투어를 일괄 표시 | 특정 이벤트 조합(막힘 trigger)에서만 맥락 도움이 나옴 |
| 클릭 증가·완료율을 목표로 한 안내 | first value 접근을 돕는 것이 목표(클릭은 결과가 아님) |
| 마찰을 무조건 제거 | 마찰의 *의미*를 먼저 분류(좋은 마찰/나쁜 마찰/정상 종료/가용성) |
| AI 판정의 마지막 선택권을 대신 눌러 줌 | 사용자가 마지막 선택을 하도록 보조만 하는 장치 |

핵심 원칙 4가지:

1. **넛지의 단위는 표면이 아니라 trigger(이벤트 조합)다.** 같은 화면이라도 어떤 이벤트 조합에서 멈췄는지에 따라 도움이 정당할 수도, 방해일 수도 있다.
2. **"아무것도 띄우지 않음"은 결함이 아니라 설계다.** 정상 종료(B-NORMAL)와 가용성 차단(B-AVAIL) 위에 도움을 얹으면 오히려 신뢰를 깬다.
3. **trigger는 도움의 *조건*이지 도움의 *근거*가 아니다.** 같은 trigger라도 잡(J1~J4)별로 정상/막힘 부호가 뒤집힌다(특히 `deed_judged` 후 미저장).
4. **prelaunch에서는 trigger를 자동 발동으로 코드에 심지 않는다.** 본 표는 *출시 후 수기 관찰*과 *후속 proposal* 의 경계일 뿐, 자동 인앱 넛지를 구현하지 않는다.

## 2. 막힘 성격 4분류 (읽기 사전, m31 계승)

trigger를 도움으로 라우팅하기 전에, 그 막힘을 계측 없이 손기록 가능한 4종으로 분류한다. **이 분류가 "도울지/말지"를 결정한다.** 정의는 `product-body-vs-bumper-boundary-table.md` §2를 그대로 계승한다.

| 코드 | 막힘 성격 | 관찰 단서 | 도움 라우팅 |
|---|---|---|---|
| **B-LOST** | 길을 잃음 | "이제 뭐 하지?", 다음 행동을 못 찾고 맴돎, 반복 탭 | **넛지 후보** — 이탈 지점 안내 검토(proposal-only) |
| **B-MISMATCH** | 결과 기대 불일치 | "이게 다야?", 결과 카드를 보고 멈춤·되물음 | **제품 약속/결과 품질 후보** — 넛지로 못 가림 |
| **B-AVAIL** | 가용성 차단 | 503·판정 지연·저장 상한(`deed_save_capped`) | **availability/friction** — 넛지 아님, 제한 설명·회복 경로 |
| **B-NORMAL** | 정상 종료 | 잡 충족 후 자연 종료(특히 J3 `deed_judged` 후 미저장) | **아무것도 띄우지 않음** — 이탈 집계·도움 금지 |

> **핵심:** 막힘 trigger를 보면 먼저 B-AVAIL을 떼고, J3 미저장은 B-NORMAL로 보고, 남은 것만 B-LOST(넛지 후보) vs B-MISMATCH(제품 후보)로 가른다. 도움은 B-LOST에만 후보가 된다.

## 3. 이벤트 조합 → 넛지 경계표 (이 문서의 심장)

각 행은 **기존 이벤트 조합(trigger condition)** 이다. 각 trigger에 대해 ① 잡 맥락, ② 넛지/도움 후보(proposal-only, 문구 0), ③ 아무것도 띄우지 말아야 할 경우, ④ 수기 관찰 질문(F-태그 부착), ⑤ prelaunch 금지선을 적는다. 모든 셀은 가설이며 기존 이벤트·화면에만 근거한다.

> 표기: T = trigger. 넛지 후보는 모두 **proposal-only**(본 Intent로 카피·코드·발동 0). 수기 관찰 질문은 `first-session-friction-observation-protocol.md`의 F1~F9를 인용한다.

### T1 — `add_flow_started`:72 발화 + `deed_judged`:106 미발화 (입력/판정 전 멈춤)

| 항목 | 내용 |
|---|---|
| **잡 맥락** | 네 잡 공통. `/add` 진입은 했으나 판정 결과 카드까지 못 감. value-critical 단계(입력)에서 멈춤. |
| **넛지 후보 (proposal-only)** | **B-LOST일 때만** — 입력 단계에서 "무엇을 적을지" 막힌 경우의 입력 보조 후보. 단 잡별 조향은 `first-input-defaults-prompt-audit.md`(m32) 위임, 본 문서는 발동 *조건*만 표시. |
| **띄우지 말아야 할 경우** | (a) 가용성/네트워크/앱 종료로 이벤트 미도달 → B-AVAIL(넛지 아님). (b) 사용자가 둘러보다 의도적으로 나간 정상 탐색. (c) mock/self-test/합성 세션. |
| **수기 관찰 질문** | `F2 입력 보류`·`F3 입력 이탈`인가, 아니면 단순 탐색인가? `add_flow_abandoned`:78이 함께 떴다면 미저장 이탈 짝의 *사실*만 기록(이탈률로 환산 금지). |
| **prelaunch 금지선** | started−judged 갭을 곧장 "이탈률/관심 없음"으로 환산 금지. 자동 입력 도움을 코드에 심지 않음. |

### T2 — `deed_judged`:106 발화 + `deed_saved`:183 미발화 (판정 후 미저장) — **잡별 부호 전환**

| 항목 | 내용 |
|---|---|
| **잡 맥락** | 코드상 `deed_judged`(:106)가 `deed_saved`(:183)보다 항상 먼저라 식별 가능. **J3에선 first value(`deed_judged`)가 이미 닫힘 → 정상 종료(B-NORMAL).** J1/J2/J4에선 first value(`deed_saved`) 전 멈춤 → 이탈 후보(B-LOST/B-MISMATCH). |
| **넛지 후보 (proposal-only)** | **J1/J2/J4 + B-LOST일 때만** — 저장으로 잇는 보조 후보. **J3엔 저장 유도 넛지 금지**(첫 가치 흐름 방해). B-MISMATCH면 저장 넛지가 아니라 결과 품질/약속 문제로 라우팅. |
| **띄우지 말아야 할 경우** | **J3의 judged-without-saved = 정상 종료 → 아무것도 띄우지 않음.** 결과를 보고 닫는 것이 잡 충족이다. 저장 CTA를 강하게 붙이면 정상 종료를 이탈처럼 만들고 불필요한 압박이 됨. |
| **수기 관찰 질문** | 이 세션의 추정 잡은? J3면 "보고 닫음=만족"인가? J1/J2/J4면 `F5 저장 보류·건너뜀`이 B-LOST(길 잃음)인가 B-MISMATCH(결과 불일치)인가? |
| **prelaunch 금지선** | **judged−saved 갭을 J3에서 이탈/가치 부재로 단정 금지(B-NORMAL).** 저장수=만족도 환산 금지. 잡 분리 없이 갭을 모든 잡에 합산 금지. |

### T3 — `deed_rerolled`:149 1~3회 (재판정)

| 항목 | 내용 |
|---|---|
| **잡 맥락** | `deed_rerolled`는 최대 3회(`MAX_REROLLS`). 재판정 의도는 **불신·호기심·비교 학습**이 모두 가능하다(단일 해석 불가). J3에선 "다르게 보면?"이 호기심 신호(이탈 아님). |
| **넛지 후보 (proposal-only)** | 거의 없음. 재판정 *자체*는 제품 본체의 정상 사용일 수 있어 도움보다 **관찰이 먼저**다. 도움이 정당하려면 reroll 후 *B-MISMATCH가 손기록*돼야 함(그땐 넛지가 아니라 결과 품질 라우팅). |
| **띄우지 말아야 할 경우** | reroll을 "불신"으로 단정해 신뢰 회복 팝업을 띄우지 않음. 호기심/비교 학습 reroll에 도움을 얹으면 정상 탐색을 방해. cap 도달 전 reroll은 정상 범위. |
| **수기 관찰 질문** | 이 재판정은 불신인가, 호기심인가, 비교 학습인가? 사용자의 말(놀람/반박/"다르게 보면?")로 분리(증거는 off-instrument, `deed_rerolled` 횟수로 의도 환산 금지). |
| **prelaunch 금지선** | reroll 횟수를 불신/이탈/불만족 지표로 환산 금지. reroll 의도를 수기 관찰 전에 넛지로 처분 금지. |

### T4 — `deed_save_capped`:167 발화 (저장 상한 / 가용성)

| 항목 | 내용 |
|---|---|
| **잡 맥락** | 30덕 상한 early-return으로 `deed_saved` 미발화. 이는 가치 마찰이 아니라 **availability/limit 신호(B-AVAIL)**. |
| **넛지 후보 (proposal-only)** | **제한 설명 + 회복 경로**만 후보(예: 한도 도달·내일 재개 안내). 이는 conversion/upgrade 넛지가 아니다. 해당 상황 카피는 이미 `copy-spec.md`에 존재(신규 0). |
| **띄우지 말아야 할 경우** | **upgrade/결제/유료 전환 넛지 금지.** cap을 유료 수요로 읽고 paywall·가격 안내를 띄우지 않음. 503/판정 지연도 동일(availability). |
| **수기 관찰 질문** | 이 막힘은 제품 가치 문제인가, 단순 한도 도달인가? 한도 설명을 보고 사용자가 납득했는가(말·행동)? |
| **prelaunch 금지선** | `deed_save_capped`·503·지연을 upgrade demand·monetization intent·재가치·TTV 종료·리텐션으로 환산 금지(`Availability And Friction Are Not Value` 계승). |

### T5 — `deed_saved`:183 발화 (first value 도달 — J1/J2/J4)

| 항목 | 내용 |
|---|---|
| **잡 맥락** | J1/J2/J4의 first value 도달. 막힘이 아니라 **성공 경로**. (J3엔 저장이 선택이므로 first value 판정 기준 아님.) |
| **넛지 후보 (proposal-only)** | 막힘 해소형 넛지 **불필요**. 굳이 둔다면 다음 행동 안내(범퍼)이며 막힘 도움이 아님 — 그것도 `onboarding-checklist-audit-table.md`(BUMPER-ONLY) 소관. |
| **띄우지 말아야 할 경우** | first value 직후 즉시 전환/공유/유료 넛지를 끼워 넣지 않음(첫 가치 순간을 방해). |
| **수기 관찰 질문** | 저장 후 누적 payoff를 알아챘는가? (J2는 `/` 복귀에서 `F6`/`F8` 관찰) |
| **prelaunch 금지선** | `deed_saved`를 AI 판정 동의/만족으로 단정 금지. 저장 1회를 리텐션/activation 합격으로 승격 금지. |

### T6 — `level_up_viewed`:199 미발화 (첫 세션 누적 payoff 지연 — J2)

| 항목 | 내용 |
|---|---|
| **잡 맥락** | 신규 사용자의 시작 총합과 다음 환생종 경계 격차가 커서 첫 세션 1회 저장으로는 단계 교차가 사실상 없음 → `level_up_viewed` 보통 미발화. **설계상 정상**(B-NORMAL 성격). |
| **넛지 후보 (proposal-only)** | 막힘 도움 **불필요**. 누적 payoff 공백은 *제품 약속* 후보(B-MISMATCH)이지 넛지로 메우는 대상이 아님 — 시작값·경계 조정은 본 범위 밖. |
| **띄우지 말아야 할 경우** | "레벨업이 안 떴다"고 보상 팝업·가짜 진행감을 띄우지 않음(정상 설계를 결함처럼 위장 금지). |
| **수기 관찰 질문** | J2 사용자가 첫 세션 안에서 "쌓이는 재미"를 느꼈는가, 아니면 누적감이 다음 세션으로 지연됐는가(`F8 누적 payoff 공백`)? |
| **prelaunch 금지선** | `level_up_viewed` 미발화를 리텐션/이탈 신호로 환산 금지. 1회 발화를 리텐션 확보로 단정 금지. |

## 4. "아무것도 띄우지 않는다" 우선 규칙 (show-nothing-first)

출처노트가 강조하는 핵심은 "무엇을 띄울까"보다 **"어느 상황에서는 아무것도 띄우지 않는가"** 다. 막힘 trigger를 볼 때 아래 순서로 *먼저 도움을 빼는* 것을 기본값으로 둔다.

1. **가용성을 먼저 뗀다.** 503·판정 지연·`deed_save_capped`는 B-AVAIL → 넛지 아님. 제한 설명·회복 경로만(upgrade 환산 금지).
2. **J3 미저장은 B-NORMAL로 본다.** `deed_judged` 후 저장 없이 닫음 = 정상 종료 → 아무것도 띄우지 않음.
3. **합성/mock/self-test·소수 표본은 제외한다.** 도움 후보 판단의 입력으로 쓰지 않음(표시 후 집계 제외, 삭제 아님).
4. **재판정 의도는 수기 관찰 전에 처분하지 않는다.** reroll에 신뢰 회복 넛지를 자동으로 얹지 않음.
5. **남은 막힘만 B-LOST vs B-MISMATCH로 가른다.** B-LOST만 넛지 후보, B-MISMATCH는 제품 약속/결과 품질로 라우팅(넛지로 못 가림).
6. **first value 도달·정상 종료 위에는 도움을 얹지 않는다.** 성공 경로를 방해하지 않는다.

> 요약: 도움은 **B-LOST(길 잃음)** 에서만 후보가 되고, 나머지(B-AVAIL·B-NORMAL·B-MISMATCH·정상 사용)에는 *아무것도 띄우지 않거나* 다른 트랙으로 보낸다.

## 5. prelaunch 금지선

- 전환율·리텐션%·PMF 결론·외부 벤치마크(40% 등) 산출 금지. 작은/synthetic/mock/self-test 표본을 결정 등급으로 승격하지 않는다.
- judged−saved 갭을 J3에서 이탈/가치 부재로 단정 금지(B-NORMAL). 저장 유도 넛지를 J3에 붙이지 않는다.
- `deed_save_capped`·503·지연을 upgrade demand·monetization intent·재가치·TTV 종료로 환산 금지(B-AVAIL).
- `deed_rerolled` 횟수를 불신/불만족/이탈로 환산 금지. 재판정 의도는 수기 관찰로 분리.
- 한 명 신호로 넛지 후보를 확정 금지. 넛지를 자동 발동으로 코드에 심지 않음(본 Intent로 발동 0).
- 넛지 후보는 **분석일 뿐**, 본 Intent로 카피·화면·이벤트·코드·발송으로 반영하지 않는다(proposal-only / approval-needed).
- 신규 이벤트·속성·카피·계측·대시보드·세션 리플레이·tracking/privacy·배포·외부 발송·비용·시크릿·권한·개인정보 변경 0.

## 6. 충돌 점검 (no-conflict verification)

| 대상 문서 | 충돌 여부 | 근거 (한 줄) |
|---|---|---|
| `docs/first-session-jtbd-matrix.md` | **없음** | J1~J4 정의·first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`)을 그대로 계승. 새 잡·매핑 0. |
| `docs/product-body-vs-bumper-boundary-table.md` | **없음** | 막힘 4분류(B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL)를 §2에 재정의 없이 인용. 표면 본체/범퍼 분류는 그 문서 소관, 본 문서는 trigger 축만 더함. |
| `docs/first-session-friction-observation-protocol.md` | **없음** | F1~F9를 "수기 관찰 질문" 칸에서 *불러 씀*. 태그 정의·게이트 재정의 0. |
| `docs/onboarding-checklist-audit-table.md` | **없음** | CONTEXTUAL-FALLBACK 발동 조건(B-LOST)을 계승. 체크리스트 항목 분류는 그 문서 소관, 본 문서는 trigger→넛지/금지 경계만. |
| `docs/activation-path-friction-audit.md` | **없음** | good/bad/hold 처분은 그 문서 소관. 본 문서는 넛지 후보/금지 경계만(처분 아님, 보완). |
| `docs/first-input-defaults-prompt-audit.md` | **없음** | 입력 단계 조향(T1 넛지 후보)을 그 문서에 위임. 본 문서는 발동 조건만 표시. |
| `docs/ai-outcome-proxy-dictionary.md` | **없음** | 활동량≠인정 가치, `deed_save_capped`=availability/friction, reroll 단일 해석 불가를 그대로 계승. |
| `docs/copy-spec.md` (금지어) | **없음** | 사용자 대상 신규 카피 0. cap 안내 등 인용 상황 문구는 기존 구현/스펙이며 새로 만들지 않음. 금지어 명단 미사용. |

## Out of scope (변경 0건)

본 Intent(marketing-40)로 수행하지 않으며, 각각 별도 Intent 후보다.

- **코드·카피 변경 0건.** `src/`·`public/`·런타임 설정 어느 것도 변경하지 않음. `docs/` 한 파일만 추가.
- **신규 이벤트·속성·트래킹/privacy·PostHog 대시보드·세션 리플레이·플래그 0건.** 인용은 기존 발화 이벤트로 한정.
- **인앱 넛지 발동·자동화 0건.** 본 표는 출시 후 수기 관찰과 proposal 경계일 뿐, 자동 trigger를 코드에 심지 않음.
- **넛지 문구의 실제 반영 0건.** 모든 넛지 후보는 proposal-only / approval-needed.
- **전환율·activation rate·리텐션·PMF·세그먼트 판정 0건.**
- **외부 발송·공개 모집·인터뷰 요청·비용·시크릿·권한·배포·CI 트리거 0건.**
- **first value 매핑 재정의 0건.** (J1/J2/J4=`deed_saved`, J3=`deed_judged` 고정.)

### 검증 게이트 (작성 시 self-check)

```bash
git diff --stat -- apps/web/src apps/ios/Sources                                # 코드 변경 없음 (빈 출력)
rg '<<<<<<<|=======|>>>>>>>' apps/web/docs/stuck-point-nudge-boundary-table.md   # 충돌 마커 0
```

---

## 검증 매핑

| 성공 기준 | 충족 섹션 |
|---|---|
| 1. 기존 이벤트 조합별 도움/넛지 후보 | §3 (T1~T6 ② 넛지 후보) |
| 2. 띄우지 말아야 할 경우 (show nothing) | §3 (T1~T6 ③) + §4 show-nothing-first 규칙 |
| 3. 수기 관찰 질문 | §3 (T1~T6 ④, F1~F9 부착) |
| 4. prelaunch 금지선 | §3 (T1~T6 ⑤) + §5 |
| 5. first value·J3 정상 종료 경계 충돌 0 | §0·§2·§3 T2·§6 |
| 6. 코드 diff 0 / 신규 이벤트 0 | §0 전제 + Out of scope + 검증 게이트 |

## 학습 루프 (marketing loop)

- **계승한 기준:** first value 매핑(J1/J2/J4=`deed_saved`:183, J3=`deed_judged`:106) 재정의 0 · `deed_save_capped`:167=availability/friction(upgrade 환산 금지) · 막힘 4분류(B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL, m31) · synthetic/mock/self-test·소수 표본 비결정 등급 · J3 저장 없는 종료=정상.
- **이번에 새로 배운 것:** 넛지의 단위는 표면이 아니라 **이벤트 조합(trigger)** 이며, 막힘 trigger의 도움 라우팅은 "무엇을 띄울까"가 아니라 "**어느 trigger에서 아무것도 띄우지 않는가**"를 먼저 고정해야 정직하다. 도움은 **B-LOST(길 잃음)** 에서만 후보가 되고, B-AVAIL·B-NORMAL·B-MISMATCH·정상 사용·first value 도달 위에는 띄우지 않는다. 특히 `deed_judged` 후 미저장은 J3에선 정상 종료라 저장 넛지를 띄우면 첫 가치 흐름을 방해한다.
- **다음 Marketer에게 넘길 규칙:** 막힘 신호를 도움으로 바꾸기 전에 show-nothing-first 6단계(가용성 뗌 → J3 미저장 정상 → synthetic 제외 → reroll 관찰 보류 → B-LOST만 후보 → 성공 경로 비방해)를 통과시킨다. trigger는 도움의 조건이지 근거가 아니며, 같은 trigger도 잡별로 부호가 뒤집힌다.
- **MARKETING_LEARNINGS.md 승격 후보:** "Nudges Are Event-Triggered, And Show-Nothing Is The Default" — 넛지는 팝업이 아니라 이벤트 조합 trigger의 맥락 도움이며, 도움의 기본값은 "띄우지 않음"이고 B-LOST에서만 후보가 된다. 기존 `Product Body vs Bumper By Job`·`Availability And Friction Are Not Value`를 보완하는 새 축으로 승격 제안.
