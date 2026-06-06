---
작성일: 2026-06-06
Intent: marketing-43
Mode: 내부 기획 L1/L2 (docs-only)
Status: draft
Owner: Marketer (Planner/Operator 관점 포함)
---

# Virtue 첫 주 재초대 경계표

## §0 목적 + 전제

### 목적

첫 주(D1/D3/D7) **미방문(non-return)을 실패 판정이 아니라 잡별 재초대(reactivation) 후보로 읽는** 내부 경계표를 출시 전에 고정한다. 선행 `first-week-activation-retention-bridge.md`(m14)가 "first value → 7일 내 second value 연결"을 정의했고, 본 문서는 그 연결이 **끊긴 경우**(돌아오지 않은 사용자)를 잡별로 (a) 어디까지 갔나(last value seen), (b) 어떤 second value 앞에서 멈췄나(missed second value), (c) 돌아올 이유(value recall 후보), (d) 보내면 안 되는 조건, (e) 승인 필요선으로 분리한다.

이 문서의 산출물은 **발송 문안 확정이 아니다.** 첫 10명/첫 7일 데이터가 들어왔을 때 D7 미방문을 곧장 onboarding 실패·가치 부족·관심 없음으로 단정하는 오독을 줄이고, 승인 전 내부 재초대 경계를 미리 못박는 것이 성공 기준이다.

### 출처노트

- 근거: `source/external-links/marketing/2026-06-06-first-week-reactivation.md` (Amplitude "The Hidden ROI of Winning Back Users" 2025-11-24 / "The 7% Retention Rule" 2025-09-30 / ProductLed "AI Onboarding" 2026-01-13). 작업 시점 로컬에 source note가 존재하면 그 요지를, 부재하면 Intent rationale 요지를 근거로 한다.
- 외부 렌즈 요지: 휴면 사용자는 완전한 손실이 아니라 이미 의도·이해를 보인 warm audience다. 재초대는 generic 단일 메시지가 아니라 **행동 패턴별로 달라야** 하고, 메시지는 할인/과장이 아니라 **value recall**(전에 하려던 일·도달한 결과·놓친 다음 가치를 다시 보여줌)에 가까워야 한다.
- **번역 경계:** Amplitude의 D7 retention rule, 7% 기준, win-back 수치는 **목표치로 이식하지 않는다.** Virtue prelaunch에서는 첫 주를 *관찰 window*로만 쓴다.

### 전제 (못박기)

1. **내부 경계표**: prelaunch이므로 성패 채점표가 아니다. 미방문을 "좋다/나쁘다"로 판정하지 않고, **재초대 후보인지 / 후보가 아닌지 / 보내면 안 되는지**만 분류한다.
2. **신규 0**: 신규 트래킹·이벤트·속성·코드·대시보드·세션리플레이·비용을 하나도 만들지 않는다. 기존 발화 이벤트(`add_flow_started`:72, `add_flow_abandoned`:78, `deed_judged`:106, `deed_judge_attempted`:135, `deed_rerolled`:149, `deed_save_capped`:167, `deed_saved`:183, `level_up_viewed`:199)만 인용한다.
3. **발송 0**: 공개 발송, 이메일/푸시/in-app 메시지, retargeting, 광고 집행은 본 문서 범위가 아니다. 본 문서는 **카피를 배포하는 자리가 아니라 경계를 고정하는 자리**다. 실제 발송은 모두 approval-needed(§6).

## §1 왜 미방문을 실패가 아니라 재초대 후보로 읽는가

Virtue의 현재 단계에서 가장 위험한 오독은 첫 사용자가 D1/D7에 돌아오지 않았다는 사실만으로 onboarding 실패·가치 부족·retention 실패를 판정하는 것이다. 첫 사용자에는 아직 오디언스 fit, 잡별 의도, availability 차단, synthetic/self-test가 섞여 있다. 미방문은 단일 churn이 아니라 **"어떤 first value까지 갔고, 어떤 second value 앞에서 멈췄는가"를 읽는 segmentation 문제**다.

재방문이 없는 사용자를 곧장 실패로 치는 대신, 잡별로 분류하면 세 갈래가 보인다. ① first value까지 도달한 뒤 멈춘 사용자는 이미 가치를 한 번 본 **warm 후보**다. ② first value 전에 멈춘 사용자는 막힘 4분류(m31)로 먼저 라우팅해야 하며, 길 잃음(B-LOST)만 후보다. ③ availability·synthetic·정상 종료(J3)는 애초에 재초대 후보가 아니다. 이 분리가 있어야 작은 데이터가 들어온 뒤 사후 해석(아무 미방문이나 churn으로 묶거나, 아무에게나 재초대를 보내려는 충동)을 줄일 수 있다.

이것은 "메시지를 많이 보내자"는 뜻이 **아니다.** 재초대의 기본값도 넛지와 마찬가지로 **"보내지 않음"**이며([[stuck-point-nudge-boundary-table.md]] m40의 show-nothing default 계승), 승인 전에는 어떤 발송도 하지 않는다. 지금 할 수 있는 일은 경계표를 고정하는 docs-only 작업뿐이다.

## §2 재초대 후보 분류 사전 (RC-*)

미방문 사용자를 발송 대상으로 바로 보지 않고, 먼저 아래 5종으로 분류한다. 분류가 판독에 선행한다(traffic source·availability를 먼저 갈라낸 뒤 잡을 본다).

| 분류 | 정의 (기존 이벤트 기준) | 재초대 후보? |
|---|---|---|
| **RC-WARM** | 잡 기준 first value 도달(J1/J2/J4 `deed_saved` / J3 `deed_judged`) 후 7일 내 second value 없이 미방문 | 후보 (강함) — value recall 대상 |
| **RC-PRE-LOST** | first value 전에 멈춤(`add_flow_started` 후 미판정/미저장). 막힘 4분류에서 **B-LOST(길 잃음)으로 분류된 경우만** | 후보 (약함) — 입력 보조 성격, 발송보다 제품/온보딩 |
| **RC-NORMAL** | J3가 `deed_judged`만 보고 저장 없이 닫힘 = 정상 종료 / 의도적 1회성 사용 | **후보 아님** — judged−saved 갭을 이탈로 읽지 않음 |
| **RC-AVAIL** | `deed_save_capped`:167, 503, judge 지연 등 availability/friction 구간에 걸림 | **후보 아님** — 가용성 문제, 분리 보존 |
| **RC-EXCLUDED** | synthetic/mock/self-test, 봇/크롤러, 내부/QA 트래픽 | **후보 아님** — 비결정 등급, 사람 증거에 섞지 않음 |

원칙: **삭제하지 않고 표시 후 분리**한다([[first-week-activation-retention-bridge.md]] §7 위생 계승). RC-AVAIL/RC-EXCLUDED는 지우지 않고 가용성/테스트 관찰용으로 보존한다.

## §3 심장표 — J1~J4 첫 주 재초대 경계

각 행은 **재초대를 보낼 근거가 아니라, 보낼지/말지를 가르는 경계**다. "돌아올 이유"는 승인 시 value recall 카피의 *방향 후보*일 뿐 확정 문안이 아니다.

| 잡 | first value (계승) | 놓친 second value (m14 §2 계승) | 돌아올 이유 (value recall 후보, 방향만) | 보내면 안 되는 조건 |
|---|---|---|---|---|
| **J1 기록형** | `deed_saved`:183 (방금 한 일을 남긴 즉시 만족) | 다음 `deed_saved` ("또 남길 수 있다" 미확인) | "마지막으로 남긴 덕행을 다시 이어 쓰기" — 한 줄이면 충분 | RC-AVAIL/EXCLUDED · first value 1회 미방문을 곧장 이탈로 단정 · 저장 독촉/할인 |
| **J2 누적형** | `deed_saved`:183 (쌓였다는 누적감) | 다음 `deed_saved`, 보조 `level_up_viewed`:199 (누적이 한 번 더 미확인) | "저장 뒤 누적/진화 payoff가 어디까지 왔는지" 다시 보기 | RC-AVAIL/EXCLUDED · `level_up_viewed` 미발생을 누적 가치 부재로 읽음 · 레벨업 압박 |
| **J3 AI 호기심형** | `deed_judged`:106 (저장 전이라도 닫힘) | 다음 `deed_judged` 또는 `deed_saved` (다르게 보면? 미확인) | "다른 사례를 같은 AI 판정으로 비교해 보기" — 저장 강요 없음 | **judged 후 저장 없음 = 정상 종료(RC-NORMAL)라 저장 독촉 금지** · `deed_rerolled`를 불신으로 읽음 · RC-AVAIL/EXCLUDED |
| **J4 회고형** | `deed_saved`:183 (나중에 돌아볼 게 생긴 지연 가치) | 다음 `deed_saved` (쌓이면 로그가 된다 미확인) | "지난 판단/기록을 조용히 다시 보기" — 회고 톤, 재촉 아님 | RC-AVAIL/EXCLUDED · 지연 가치 잡에 즉시 행동 압박 · 미방문 기간을 곧장 이탈로 환산 |

**같은 미방문이 잡별로 부호가 다르다.** J3의 "judged 보고 저장 없이 안 돌아옴"은 정상 종료(RC-NORMAL)일 수 있어 재초대 후보가 아니지만, 같은 행동 패턴이 J1/J2/J4면 저장 전 보류(RC-WARM 또는 RC-PRE-LOST)일 수 있다. 이벤트가 같다고 같은 재초대 성격으로 묶지 않는다.

## §4 라우팅 순서 (분류 → 후보 → 경계)

미방문 사용자를 보면 아래 순서로 통과시킨다. 순서를 지켜야 가용성·테스트가 사람 증거에 섞이지 않는다.

1. **RC-EXCLUDED 먼저 분리** — synthetic/mock/self-test/봇/내부·QA를 표시 후 제외(삭제 아님).
2. **RC-AVAIL 분리** — `deed_save_capped`·503·지연 구간 세션을 가용성/마찰로 표시 후 제외. availability가 확인되기 전에는 재초대 성격을 판정하지 않는다.
3. **first value 도달 여부 확인** — 잡 기준 first value 이벤트가 발화했나?
   - 발화 → **RC-WARM** (second value 미발생 + 미방문이면 value recall 후보).
   - 미발화 → 다음 단계.
4. **종료 성격 확인** — J3가 `deed_judged`만 보고 닫혔으면 **RC-NORMAL**(후보 아님). first value 전에 멈췄으면 막힘 4분류(m31)로 라우팅해 **B-LOST일 때만 RC-PRE-LOST**.
5. **경계 적용** — 후보라도 §3의 "보내면 안 되는 조건"과 §6 승인 필요선을 통과하지 못하면 보내지 않는다(기본값 = 보내지 않음).

## §5 prelaunch 해석 금지선

첫 10명/첫 7일 표본에서 위 분류표는 **관찰 렌즈일 뿐 합격선·발송 트리거가 아니다.** [[first-week-activation-retention-bridge.md]] §5, `pmf-response-analysis-rubric.md`의 작은 표본 금지선을 계승해 아래는 *아직 판정하지 않는다*.

- **D1/D3/D7 미방문률을 reactivation rate·churn rate·retention%로 산출하지 않는다.** 첫 10명 수준의 비율은 방향 재료이지 지표가 아니다.
- **미방문을 곧장 onboarding 실패·가치 부족·관심 없음으로 단정하지 않는다.** first value까지 간 미방문(RC-WARM)은 warm 후보다.
- **judged−saved 갭을 이탈/실패로 읽지 않는다.** J3는 저장 없이 정상 종료할 수 있다(RC-NORMAL).
- **`deed_save_capped`를 upgrade demand/재초대 수요로 환산하지 않는다.** availability/friction이다([[prelaunch-monetization-boundary-brief.md]] m28·원장 계승).
- **재초대 후보(RC-WARM)를 PQL/upgrade 신호로 읽지 않는다.** PQL은 반복+재방문 묶음이며 별개 게이트다([[post-launch-pql-upgrade-signal-boundary-table.md]] m41 위임).
- **한 명의 강한 미방문/복귀 신호를 제품·마케팅 방향으로 확정하지 않는다.**
- **recovery/comeback/skip을 KPI·합격선으로 읽지 않는다**([[recovery-over-streak-retention-lens.md]] m26 계승). 빠진 뒤 돌아오는 신호는 정성 관찰로만 둔다.
- 실제 retention 대조 방법은 [[activation-retention-correlation-readiness.md]](m37)에 위임한다.

## §6 승인 필요선 (approval-needed)

본 문서는 경계만 고정한다. 아래는 모두 **별도 승인 또는 Infinity 라우팅**이 필요하며 본 작업으로 실행하지 않는다(실행 0건).

| 행동 | 상태 | 비고 |
|---|---|---|
| 공개 발송, 이메일/푸시/in-app 메시지 | **approval-needed** | value recall 1문장 카피라도 승인 대상 |
| retargeting, 광고 집행 | **approval-needed** | prelaunch 범위 밖 |
| 신규 tracking·이벤트·속성(`last_value_seen`·`missed_second_value`·`reactivation_candidate_type` 등) | **approval-needed / proposal-only** | 출처노트 후속 후보지만 신규 계측은 만들지 않음 |
| 대시보드·세션리플레이·자동 집계·정기 알림 | **approval-needed** | 자동화 0건 |
| tracking/privacy 변경, 비용·권한·시크릿 | **approval-needed (일부 L3)** | 본 작업 0건 |
| 재초대 카피 확정·small-batch 발송 | **approval-needed** | 출시 승인 뒤에만, J1~J4별 1문장 후보를 별도 Waiting으로 |

지금 가능한 일은 **카피 배포가 아니라 경계표 작성**이다.

## §7 코드 근거 (발화 위치, 사실 확인)

신규 구현 0건. 인용 이벤트는 모두 현재 코드에서 발화 중이며 선행 문서 라인과 드리프트 없다.

| 이벤트 | 발화 위치 file:line | 본 문서에서의 의미 |
|---|---|---|
| `add_flow_started` | `apps/web/src/app/add/page.tsx:72` | setup (진입) — RC-PRE-LOST 라우팅 진입점 |
| `add_flow_abandoned` | `apps/web/src/app/add/page.tsx:78` | 입력 이탈 (보조) — 막힘 4분류 재료 |
| `deed_judged` | `apps/web/src/app/add/page.tsx:106` | J3 first value (저장 전·독립) |
| `deed_judge_attempted` | `apps/web/src/app/add/page.tsx:135` | 채점 시도 (보조) |
| `deed_rerolled` | `apps/web/src/app/add/page.tsx:149` | 다의적(불신·호기심·비교) — 단독 해석 금지 |
| `deed_save_capped` | `apps/web/src/app/add/page.tsx:167` | 30덕 상한 early return = availability/friction (RC-AVAIL) |
| `deed_saved` | `apps/web/src/app/add/page.tsx:183` | J1/J2/J4 first value + second value(반복 저장) |
| `level_up_viewed` | `apps/web/src/app/add/page.tsx:199` | J2 보조 second value |

## §8 충돌 점검 (no-conflict)

| 대상 문서 | 충돌 | 근거 |
|---|---|---|
| `first-session-jtbd-matrix.md` (m06) | 없음 | J1~J4 잡 정의·first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`) 재정의 0 |
| `first-week-activation-retention-bridge.md` (m14) | 없음 | first value→7일 second value 연결·관찰 양식·위생을 계승. 본 문서는 *연결이 끊긴 경우*(미방문)의 재초대 분류층만 추가 |
| `product-body-vs-bumper-boundary-table.md` (m31) | 없음 | 막힘 4분류(B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL)를 RC-PRE-LOST 라우팅에 그대로 사용 |
| `stuck-point-nudge-boundary-table.md` (m40) | 없음 | show-nothing default를 재초대 기본값(보내지 않음)으로 계승 |
| `recovery-over-streak-retention-lens.md` (m26) | 없음 | recovery/comeback을 정성 관찰로 두는 경계 계승 |
| `post-launch-pql-upgrade-signal-boundary-table.md` (m41) | 없음 | RC-WARM을 PQL로 읽지 않음. PQL 결론은 m41 위임 |
| `prelaunch-monetization-boundary-brief.md` (m28) | 없음 | `deed_save_capped`=availability/friction, upgrade 환산 금지 계승 |
| `copy-spec.md` | 없음 | 카피 신규/수정 0건. "돌아올 이유"는 방향 후보일 뿐 확정 문안·사용자 노출 문구 아님 |

## §9 검증 매핑

| 성공 기준 (marketing-43) | 충족 섹션 |
|---|---|
| J1/J2/J3/J4별 first value · 놓친 second value · 돌아올 이유 · 보내면 안 되는 조건 한 표 | §3 |
| availability/synthetic 제외 분리 | §2 (RC-AVAIL/RC-EXCLUDED), §4 1~2단계 |
| 승인 필요선 명시 | §6 |
| first value 매핑 계승(J1/J2/J4=`deed_saved`, J3=`deed_judged`) 재정의 0 | §0 전제, §3 |
| 기존 이벤트만 인용 (신규 0) | §0 전제 ②, §7 |
| prelaunch rate/% 결론 없음 (분류 가능성만) | §5 |
| 선행 문서 충돌 0 | §8 |

## Out of scope

- 코드/카피/런타임 변경 **0건** — 산출물은 docs 1파일뿐.
- 트래킹/PostHog/privacy 변경 **0건** — 신규 이벤트·속성·플래그·대시보드·세션리플레이 없음.
- 외부 발송·공개 모집 **0건** — 이메일·푸시·in-app·DM·retargeting·광고 없음(전부 §6 approval-needed).
- 배포·CI·권한·시크릿·비용 변경 **0건**.
- 첫 10명/첫 7일을 reactivation rate·churn·retention%·PMF로 판정하는 일 **0건** — n<10~20 표본은 분류 대상이지 채점 대상이 아니다.
