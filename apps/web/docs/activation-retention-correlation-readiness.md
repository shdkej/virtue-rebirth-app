---
작성일: 2026-06-03
Intent: marketing-37
Mode: 내부 기획 L1 (+ L2 agent-approved push)
Status: complete
Owner: Marketer (Planner / Developer / Operator 관점 종합)
---

# Virtue Activation–Retention Correlation Readiness Spec

## §0 목적 + 전제

### 목적

PostHog의 activation 렌즈는 활성화를 **단일 magic 이벤트가 아니라 후보 이벤트 묶음**으로 보고, 그 방법을 다음 흐름으로 정리한다 — (1) 후보 묶음을 여러 개 만든다 → (2) 각 묶음이 **제품별 시간창** 안에 완료됐는지 본다 → (3) 그 묶음에 닿은 집단의 **retention이 평균보다 나은지를 쿼리로 대조**한다(출처노트 §핵심요약).

Virtue는 이미 그 흐름의 앞 두 단계를 갖고 있다. `first-session-jtbd-matrix.md`(m06)가 first value 매핑을, `activation-candidate-registry.md`(m33)가 A1~A4 후보 묶음과 관찰 window(W-IMM/W-CONF)를 등록했다. **빠진 것은 세 번째 단계의 준비물**이다 — 출시 후 retention과 대조할 때 어떤 쿼리 모양으로, 어떤 비교 질문을, 어떤 제외 조건을 걸어 읽을지가 흩어져 있으면, 작은 표본을 보고 "맞는 metric"을 사후 선택하는(cherry-pick) 위험이 그대로 남는다(출처노트 §왜중요한가).

본 문서는 그 세 번째 단계의 **준비(readiness)** 만 한다. A1~A4 후보 묶음 · first value 매핑 · activation window · retention 대조 질문(D7 우선·D30 보류) · 제외 조건 · pseudo-query shape · prelaunch 금지 해석을 한 문서에 고정해, 출시 후 첫 데이터가 들어왔을 때 "새로 조립"이 아니라 "사전 등록 후보 대조"로 읽게 한다.

> **출처노트:** `source/external-links/marketing/2026-06-03-activation-retention-correlation.md`(로컬 존재 확인). PostHog "WTF is activation"(후보 묶음+window+retention SQL 대조), Amplitude "Activating New Users"(onboarding/aha/engagement ladder/first value exchange + 재방문), Reforge "Retention Is The Silent Killer"(retention 주기·core action을 잘못 고르면 겉보기 지표가 제품 문제를 가린다)를 인용한다. **외부 수치·벤치마크는 prelaunch 판단 기준으로 가져오지 않는다**(출처노트 §Source Boundary).

### 전제 (못박기)

1. **준비 스펙이지 실행/채점표가 아니다.** 본 문서는 어떤 묶음·window의 retention 상관도 "좋다/나쁘다"로 판정하지 않는다. pseudo-query는 **실행 가능한 쿼리가 아니라 읽기 전용 모양(shape)** 이며, 실제 PostHog 조회·대시보드 구성은 출시 데이터와 접근권한이 decision-grade가 됐을 때 별도 단계로 둔다(출처노트 §적용가능성 마지막 항).
2. **신규 0.** 신규 이벤트·속성·코드·카피·대시보드·플래그·세션리플레이·tracking/privacy 설정을 단 하나도 만들지 않는다. 이미 발화 중인 기존 6개 이벤트(`add_flow_started`, `deed_judged`, `deed_saved`, `level_up_viewed`, 보조 `deed_rerolled`, `deed_save_capped`)만 인용한다(§9 사실 확인).
3. **외부 액션 0.** 외부 발송·공개 모집·인터뷰 요청·광고·실제 쿼리 실행을 0건 수행한다.
4. **재정의 0.** first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`), 잡 정의, 후보 묶음(A1~A4), window(W-IMM/W-CONF) 정의는 선행 문서가 소유한다. 본 문서는 그 위에 "retention 대조 질문 + pseudo-query shape"라는 준비 층만 더한다(§8 충돌 점검).

## §1 왜 또 "readiness"인가 — measurement readiness와 correlation readiness의 분리

`plg-foundation-exit-gate.md`(m34, 승격된 학습 "Measurement Readiness Is A Separate Gate")는 **활성화를 측정할 수 있는 상태인가**를 게이트로 고정했다. 본 문서는 그 다음 칸이다 — 활성화가 측정 가능해도, **그 활성화를 retention과 대조(correlate)할 준비**는 별개의 게이트다.

| 게이트 | 종료 조건 | 소유 |
|---|---|---|
| measurement readiness (m34) | first value 매핑·후보 묶음+window·TTV 시작/종료점·D7 질문·baseline 양식·이벤트 도착·traffic 분리가 정의됐는가 | `plg-foundation-exit-gate.md` |
| **correlation readiness (본 문서)** | 등록된 묶음을 **어떤 비교 질문·시간창 tier·제외 조건·쿼리 모양**으로 retention과 대조할지가 사전 고정됐는가 | 본 문서 |

두 게이트의 차이는 "측정 *가능성*"과 "측정값 *성패*"의 차이(m34)에서 한 칸 더 나아간다 — **측정 가능하다고 곧장 retention 상관을 결론지을 수 있는 것은 아니다.** 상관 대조는 (a) 충분 표본, (b) 사전 등록된 쿼리 모양, (c) 사전 합의된 제외 조건이 모두 있어야 정직하다. 본 문서는 (b)와 (c)를 미리 고정하고, (a)는 prelaunch에서 충족되지 않으므로 **실행을 명시적으로 보류**한다.

**역할 분리(중복 아님):** 후보 묶음 등록은 m33에, D7 재가치 질문 원문은 m22 §5에, 첫 주 second value 브리지·503 경계는 `first-week-activation-retention-bridge.md`(m14)에, 정밀 time gap은 m10에, 운영 리듬은 m23에 위임한다. 본 문서가 새로 하는 단 하나는 그 재료를 **"retention 대조용 pseudo-query shape + D7 우선/D30 보류 비교 질문"** 으로 묶는 것이다.

## §2 A1~A4 후보 묶음 + first value 매핑 (계승, 재정의 0)

m33 등록부의 묶음을 한 글자도 바꾸지 않고 대조 단위로 가져온다. first value 매핑은 m06 그대로다.

| 등록 ID | 잡 | first value (계승) | 후보 묶음 (완료 이벤트 우선) | 묶음 완료 정의 (correlation 대상 행동) |
|---|---|---|---|---|
| **A1** | J1 기록형 | 첫 `deed_saved`:183 | `add_flow_started` → `deed_judged` → `deed_saved` | 첫 세션 내 `deed_saved` 1회 |
| **A2** | J2 누적형 | 첫 `deed_saved`:183 (총합↑) | `deed_saved` → (보조)`level_up_viewed` | 첫 세션 내 `deed_saved` 1회 (+`level_up_viewed` 발생 시 누적 신호 보조) |
| **A3** | J3 AI 호기심형 | 첫 `deed_judged`:106 (저장 전 닫힘) | `add_flow_started` → `deed_judged` → (선택)`deed_rerolled` | 첫 세션 내 `deed_judged` 1회 — **`deed_saved` 미요구** |
| **A4** | J4 회고형 | 첫 `deed_saved`:183 (로그 첫 항목) | `add_flow_started` → `deed_judged` → `deed_saved` | 첫 세션 내 `deed_saved` 1회 |

> **대조 단위 핵심:** ① 같은 `deed_saved`라도 A1 즉시 / A2 누적 / A4 지연으로 가치 방향이 다르므로 **묶음을 합치지 않고 잡별로 따로 대조**한다. ② **A3의 묶음 완료 정의는 `deed_judged`이고 `deed_saved`를 요구하지 않는다** — J3는 저장 없이 정상 종료할 수 있으므로(아래 §5·§7) judged−saved 갭을 묶음 미완료로 환산하지 않는다. ③ `add_flow_started`는 묶음 진입(intent)일 뿐 묶음 완료가 아니다 — 상관 대상 행동에서 제외한다(m22 §1·m33 §2 계승).

## §3 activation window 후보 + retention 대조 창 (W-IMM / W-CONF 계승 + W-LONG 보류)

PostHog가 말하는 "제품별 시간창"은 두 종류로 분리해 둔다 — 묶음이 *완료되는* 창(activation window)과, 그 집단의 *재방문을 보는* 창(retention 대조 창).

### activation window (묶음 완료 시간창, m33 계승)

| window | 정의 | 종료점 |
|---|---|---|
| **W-IMM** (immediate) | 첫 세션 안에서 묶음 완료(first value 도달) | A1/A2/A4=`deed_saved`, A3=`deed_judged` |
| **W-CONF** (confirmation) | first value 후 **D7 안**에서 재가치/depth 도달 | 2nd `deed_saved`/`deed_judged`/`level_up_viewed` |

### retention 대조 창 (D7 우선 · D30 보류)

| tier | 정의 | prelaunch 취급 |
|---|---|---|
| **D7 (우선)** | 묶음 완료 집단이 **첫 가치 후 7일 안에 같은 잡 가치로 재방문**했는가 | **1차 대조 창.** 단 비율 판정이 아니라 사례 손기록 질문(§4). D7 외부 벤치마크 %를 합격선으로 베끼지 않음 |
| **D30 (보류)** | 묶음 완료 집단이 **30일 안에 재방문/재가치**했는가 | **보류(deferred).** 출처노트가 말하는 "제품별로 14일·30일 다른 창"은 자연 주기가 확인된 뒤 후보로 연다. prelaunch 첫 데이터 리뷰에서는 D30을 **대조하지 않는다** — Virtue 첫 주 second-value 브리지(m14)와 D7 질문(m22)이 자연 주기로 검증되기 전까지 D30은 등록만 하고 실행 보류 |

- **W-IMM/W-CONF는 m23의 immediate vs long-term TTV와 정렬**되며 새 정의가 아니다(m33 §3 계승). 본 문서는 그 위에 **retention 대조 tier(D7/D30)** 만 얹는다.
- **D7을 먼저, D30을 나중에 두는 이유:** prelaunch 첫 데이터(10~20명, 제외 후 한 자릿수)는 D30 창을 채울 시간도 표본도 없다. D30을 미리 대조하려 들면 빈 창을 "리텐션 없음"으로 오독한다. D30은 **자연 주기가 D7로 먼저 보인 뒤** 여는 후보 창이다.
- **availability ≠ value (창 제외 구간):** 503·AI judge 타임아웃/지연·`deed_save_capped`:167(30덕 상한 early return으로 `deed_saved` 미발화) 구간은 W-IMM/W-CONF/retention 창 집계에서 **제외(availability-blocked)** 하고, 신호 부재를 가치 부재로 읽지 않는다(m22 §4·m33 §3·m14 503 경계 계승).

## §4 retention 대조 질문 (D7 우선, D30 보류)

출시 후 묶음 완료 집단을 retention과 대조할 때, **수치가 아니라 질문으로** 먼저 읽는다. 질문은 잡별로 다르며 D7 원문은 m22 §5의 5선을 재사용한다(새 질문 양식 0).

| 등록 ID | D7 대조 질문 (우선, 손기록) | D30 대조 질문 (보류 — 자연 주기 확인 후) |
|---|---|---|
| **A1** J1 | "묶음 완료(첫 `deed_saved`) 집단이 7일 안에 또 남겼는가? 그게 처음과 같은 '남긴다' 가치였는가?" | (보류) "30일 안에도 같은 기록 가치로 돌아왔는가?" |
| **A2** J2 | "묶음 완료 집단이 7일 안에 누적을 한 번 더 봤는가? 환생종 진행(`level_up_viewed`)을 알아챘는가?" | (보류) "30일 누적 곡선이 한 번의 호기심이 아니라 습관으로 보이는가?" |
| **A3** J3 | "`deed_judged` 집단이 7일 안에 또 판정을 보러 왔는가? 다르게 보고 싶었는가(`deed_rerolled`), 이번엔 저장으로 이어졌는가? — **저장 없이 재판정만 와도 재가치다**" | (보류) "30일 안에 판정을 반복적으로 찾는 호기심 주기가 있는가?" |
| **A4** J4 | "묶음 완료 집단이 7일 안에 또 항목을 남겼는가? '쌓이면 로그가 된다'를 확인했는가?" | (보류) "30일 뒤 덕행록 재방문(첫 세션 밖)으로 지연 가치가 실현됐는가?" |

> **대조 질문 원칙:** ① **묶음 완료 집단 vs 미완료 집단의 D7 재방문을 비교**하는 것이 PostHog 방법의 핵심이나, prelaunch에서는 "집단 간 비율 우열"이 아니라 "묶음에 닿은 사람이 7일 안에 같은 잡 가치로 돌아왔는가"를 **사람·사례 단위로** 손기록한다. ② D30 질문은 등록만 하고 **실행 보류** — 첫 데이터 리뷰에서 답하지 않는다. ③ J3의 D7 질문은 **재판정·재방문이 저장 없이도 재가치**임을 명시한다(judged−saved 갭을 이탈로 환산 금지).

## §5 제외 조건 (correlation 전 필터)

retention 대조 쿼리에 들어가기 **전에** 아래를 분리·제외한다. 제외는 *삭제가 아니라 표시 후 집계 제외*다(m23 §5·m25 traffic-source·m33 §5 계승). 분류가 판독에 선행한다(m25 "Traffic Source Before Metrics" 계승).

| 제외 코드 | 무엇을 제외 | 근거 / 식별 단서 |
|---|---|---|
| **X-MOCK** | mock/`임시 판정` 폴백 세션 | `IS_AI_MODE` 분기에서 AI 미연동 시 mock 판정. J3 first value(`deed_judged`)로 집계하지 않음(m32·m29 계승) |
| **X-SYNTH** | synthetic/데모 시드(641덕)·더미 입력 | 사람 실사용이 아님. retention 대조 모집단에서 제외 |
| **X-SELF** | 메이커 self-test·QA·반복 점검(localStorage 반복 기기) | 표시 후 제외(삭제 아님). 사람 활성화에 섞지 않음(m25 B행 계승) |
| **X-CAP** | `deed_save_capped`:167 발생 시도 | 30덕 상한 early return으로 `deed_saved` 미발화 → availability/friction. 묶음 미완료·이탈로 읽지 않음(원장 "Availability And Friction Are Not Value" 계승) |
| **X-503** | 503·AI judge 타임아웃/심한 지연 구간 | 가용성 차단. 신호 부재를 가치 부재로 읽지 않음. 해당 세션은 window·retention 집계 제외 |

> **제외 원칙:** ① 제외는 retention 상관을 읽기 *전에* 끝낸다 — 제외하지 않은 채 비율을 내면 availability/test 잡음이 활성화·retention 신호로 둔갑한다. ② X-CAP·X-503은 **활성화 실패도 monetization 신호도 아니다** — availability/friction으로만 분류한다(원장 계승). ③ 제외된 세션은 **버리지 않고 따로 보존**해 가용성/마찰 관찰에 쓴다.

## §6 pseudo-query shape (읽기 전용 모양, 실행 아님)

아래는 **실행 가능한 쿼리가 아니라** "출시 후 decision-grade 표본이 생겼을 때 어떤 모양으로 묶음 완료 집단의 retention을 대조할 것인가"를 사전 고정하는 **읽기 전용 골격**이다. 실제 PostHog HogQL/SQL 작성·실행·대시보드 구성은 별도 승인·데이터 단계로 보류한다(§0 전제1·§10).

### §6.1 공통 골격 (묶음 완료 집단 vs 미완료 집단의 D7 재방문 대조)

```text
# PSEUDO-ONLY — 실행 금지, 모양 고정용. 실제 이벤트/속성 스키마 변경 0.

STEP 0  exclude_filter :=
          NOT mock(X-MOCK) AND NOT synthetic(X-SYNTH) AND NOT self_test(X-SELF)
          AND NOT availability_blocked(X-CAP, X-503)
          # 제외는 retention 대조 전에 끝낸다 (§5)

STEP 1  activated_cohort(<BUNDLE_ID>) :=
          persons WHERE <BUNDLE_COMPLETE_EVENT> 발생 WITHIN W-IMM(첫 세션)
          AND passes exclude_filter
          # <BUNDLE_COMPLETE_EVENT>: A1/A2/A4 = deed_saved, A3 = deed_judged (§2)

STEP 2  not_activated_cohort(<BUNDLE_ID>) :=
          persons WHERE add_flow_started 발생 AND NOT <BUNDLE_COMPLETE_EVENT> WITHIN W-IMM
          AND passes exclude_filter
          # 진입했으나 묶음 미완료. (단 A3는 deed_judged 미발생만 미완료;
          #  deed_judged 후 deed_saved 없음 ≠ 미완료, ≠ 이탈 — §7)

STEP 3  returned_D7(cohort) :=
          cohort 중 first_value 후 [1d, 7d] 안에
          같은 잡 재가치 이벤트 재발생 (A1/A2/A4: 2nd deed_saved /
          A2 보조: level_up_viewed / A3: 2nd deed_judged OR deed_rerolled)

STEP 4  compare :=
          returned_D7(activated_cohort) "관찰"  vs  returned_D7(not_activated_cohort) "관찰"
          # prelaunch: 비율·유의성 산출 금지. 사람·사례 단위 손기록만 (§4·§7)

STEP 5  (DEFERRED) returned_D30(cohort) := ...   # D30은 자연 주기 D7 확인 후에만 연다 (§3)
```

### §6.2 묶음별 파라미터 (위 골격에 끼우는 값만)

| 파라미터 | A1 (J1) | A2 (J2) | A3 (J3) | A4 (J4) |
|---|---|---|---|---|
| `<BUNDLE_COMPLETE_EVENT>` (W-IMM 종료) | `deed_saved` | `deed_saved` | **`deed_judged`** | `deed_saved` |
| D7 재가치 이벤트 (STEP 3) | 2nd `deed_saved` | 2nd `deed_saved` / `level_up_viewed` | 2nd `deed_judged` / `deed_rerolled` (저장 불요) | 2nd `deed_saved` |
| 미완료 정의 (STEP 2) | `deed_saved` 미발생 | `deed_saved` 미발생 | **`deed_judged` 미발생** (저장 없음은 미완료 아님) | `deed_saved` 미발생 |
| D30 (STEP 5) | 보류 | 보류 | 보류 | 보류 |

> **pseudo-query 읽기 핵심:** ① 이 골격은 **모양을 고정**할 뿐, 어떤 이벤트도 새로 만들지 않고 어떤 쿼리도 실행하지 않는다(§9의 기존 6개 이벤트만 placeholder로 인용). ② **A3의 미완료 정의가 다른 잡과 다르다** — A3에서 미완료는 `deed_judged` 자체가 없는 경우이고, `deed_judged` 후 `deed_saved`가 없는 것은 **정상 완료**다(judged−saved 갭=정상 종료, §7). ③ STEP 4의 비교는 prelaunch에서 **비율·유의성으로 환산 금지** — 모양만 준비하고 값 판정은 충분 표본 후로 보류. ④ STEP 5(D30)는 보류 표시로 골격에만 남긴다.

## §7 prelaunch 해석 금지선 (do-not-infer / do-not-overclaim)

첫 10~20명(제외 후 한 자릿수)에서 아래를 **결론으로 만들지 않는다**(m22 §6·m33 §5·m34·baseline·pmf-rubric 계승).

- **묶음·window·tier를 사후에 입맛대로 고르지 않는다(본 문서 존재 이유).** retention 대조는 사전 등록된 A1~A4 묶음 · W-IMM/W-CONF · D7(우선)로 한정하고, 결과가 좋아 보이는 조합을 골라 "이게 우리 활성화"라고 선언 금지.
- **pseudo-query를 실행 결과로 착각하지 않는다.** §6은 모양일 뿐 값이 아니다. 실제 PostHog 조회·대시보드·SQL 실행은 decision-grade 표본·접근권한이 있을 때 별도 승인 단계.
- **D7/D30 외부 벤치마크 %를 prelaunch 합격선으로 베끼지 않는다.** "D7 N% / D30 M%" 같은 외부 룰은 방향 참고점일 뿐 첫 데이터의 임계값이 아니다.
- **D30을 prelaunch 첫 리뷰에서 대조하지 않는다.** 빈 D30 창을 "리텐션 없음"으로 읽지 않는다. D30은 자연 주기가 D7로 보인 뒤 여는 보류 창이다.
- **묶음 완료율을 activation rate로 환산하지 않는다.** "완료 N / 미완료 M"을 %·전환율·유의성으로 읽지 않고 사람·사례 단위로 읽는다.
- **묶음 간 retention 우열·상관을 prelaunch에서 결론짓지 않는다.** 어떤 묶음이 retention과 상관된다는 주장은 충분 표본 후의 별도 성장 리뷰 몫이다.
- **judged−saved 갭을 이탈/묶음 미완료로 단정하지 않는다.** A3(J3)는 `deed_judged`에서 가치를 얻고 저장 없이 정상 종료할 수 있다. `deed_rerolled`는 이탈이 아닌 호기심이다.
- **availability ≠ value.** X-CAP(`deed_save_capped`:167)·X-503 구간은 창·retention 집계에서 제외하고, 신호 부재를 가치 부재·monetization 수요로 읽지 않는다.
- **synthetic/mock·self-test를 사람 retention 대조에 섞지 않는다(§5).** 제외는 삭제가 아니라 표시 후 집계 제외다.
- **한 명의 강한 재방문 신호를 제품 방향으로 확정하지 않는다.** 표본이 작을수록 한 명의 D7 복귀가 과대평가된다.
- **`add_flow_started`(진입/의도)를 활성화·retention 신호로 승격하지 않는다.** 진입 클릭은 묶음 완료가 아니다.
- **변경 금지.** 코드·카피·이벤트·속성·대시보드·세션리플레이·tracking/privacy·배포·외부 발송·비용·시크릿·권한·개인정보 변경 0.

## §8 선행 문서 계승 / 충돌 점검 (no-conflict)

아래 "소유 문서"의 정의는 본 문서에서 한 글자도 바꾸지 않는다. 본 문서가 새로 하는 단 하나는 그 정의들 위에 **retention 대조 질문(D7 우선/D30 보류) + pseudo-query shape**를 얹는 것뿐이다.

| 정의 항목 | 소유 문서 (Single Source) | 본 문서의 취급 | 충돌 |
|---|---|---|---|
| J1~J4 잡 정의 + first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`) | `first-session-jtbd-matrix.md` (m06) | 그대로 계승·인용. 재정의 0 | 없음 |
| A1~A4 후보 묶음 + W-IMM/W-CONF window + 출시 후 게이트 | `activation-candidate-registry.md` (m33) | 묶음·window를 대조 단위로 그대로 가져옴. 재정의 0 | 없음 |
| 첫 행동 vs first value vs depth 3층 + D7 재가치 질문 5선 | `retention-predictive-activation-brief.md` (m22) | D7 질문은 §5(m22) 재사용. 본 문서는 잡별 대조 질문으로 묶기만 함 | 없음 |
| first value→7일 내 second value 브리지, 503=관찰 차단 | `first-week-activation-retention-bridge.md` (m14) | D7 재방문·503 제외 근거로 계승. 재정의 0 | 없음 |
| measurement readiness 게이트(측정 가능성 vs 성패) | `plg-foundation-exit-gate.md` (m34) | 본 문서를 correlation readiness로 그 다음 칸에 분리(§1). 보완, 충돌 아님 | 없음 |
| immediate vs long-term TTV, 운영 리듬 | `onboarding-metrics-reading-table.md` (m23) | W-IMM/W-CONF 정렬·제외 표시 후 집계 근거로 계승. 운영 리듬은 위임 | 없음 |
| 정밀 time gap 계산 | `time-to-value-observation-brief.md` (m10) | window 시작/종료점만 참조, 계산식은 위임 | 없음 |
| traffic source 분류 선행(human/self-test/synthetic/agent) | `traffic-source-reading-boundary-table.md` (m25) | §5 제외 분류의 선행 원칙으로 계승 | 없음 |
| availability≠value, J3 저장 없는 정상 종료 | m21/m29/proxy-dictionary | 계승. 재정의 0 | 없음 |
| 첫 10~20명 1인 1행 기입 양식 | `first-real-user-baseline-template.md` (m11) | 대조 질문 손기록은 이 양식 재사용. 새 표·컬럼 0 | 없음 |
| 사용자 노출 카피 금지어 | `copy-spec.md` | 사용자 노출 카피 0건. 인용한 `임시 판정`은 현재 코드 그대로의 단서 | 없음 |

## §9 기존 이벤트 증거 (발화 위치, read-only 사실 확인)

본 문서가 인용·placeholder로 쓰는 모든 신호는 `apps/web/src/app/add/page.tsx`에 **이미 발화 중인 기존 6개 이벤트**다. 신규 구현 0건. 아래 라인은 read-only 검증 결과이며 선행 문서(m22 §7·m33 §7)와 drift 0.

| 이벤트 | 발화 위치 | 발화 시점 | 본 문서에서의 역할 |
|---|---|---|---|
| `add_flow_started` | `add/page.tsx:72` | `/add` 마운트 시 1회(`useEffect([])`) | 묶음 진입(intent), 상관 대상 아님 · 미완료 모집단 기준점(STEP 2) |
| `deed_judged` | `add/page.tsx:106` | 채점 성공 직후, **저장과 독립·저장 전** 발화 | A3 묶음 완료(W-IMM 종료) · A1/A4 묶음 중간 단계 |
| `deed_rerolled` | `add/page.tsx:149` | "한 번 더" 클릭(최대 3회) | A3 D7 재가치 보조(호기심, 이탈 아님) |
| `deed_save_capped` | `add/page.tsx:167` | 30덕 상한 초과 시 발화 후 **저장 중단(early return)** | X-CAP availability-blocked(저장 미발화 → 대조 제외) |
| `deed_saved` | `add/page.tsx:183` | 저장 실행(`addDeed`) 후 발화 | A1/A2/A4 묶음 완료(W-IMM 종료) · 반복=D7 재가치 |
| `level_up_viewed` | `add/page.tsx:199` | `deed_saved` 직후 환생종 stage 상승 시에만 | A2 누적 재가치 보조(첫 세션 보통 부재) |

> 보조 사실: 같은 파일에 `add_flow_abandoned`(:78), `deed_judge_attempted`(:135)도 발화 중이나, 본 문서는 **요청된 6개 이벤트에 한정**하며 새 이벤트를 제안하지 않는다.

## §10 Out of scope (변경 0건) + 검증

본 Intent(marketing-37)로 수행하지 않으며, 각각 별도 Intent·단계에서 결정한다.

- 코드/카피/런타임 변경 **0건** — 산출물은 docs 1파일뿐이다.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·대시보드·세션리플레이·tracking/privacy 없음. baseline 양식에 컬럼 추가도 하지 않는다.
- **실제 쿼리 실행·PostHog private data 조회·대시보드 구성 0건** — §6은 읽기 전용 pseudo-shape이며, 실행은 출시 데이터·접근권한이 decision-grade일 때 별도 승인 단계(출처노트 §적용가능성 계승).
- 외부 발송·공개 모집 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고 없음.
- 배포·CI·권한·시크릿·비용·개인정보 변경 **0건**.
- 첫 10~20명 또는 synthetic/small sample을 **activation rate·전환율·리텐션율·D7/D30 %·PMF·세그먼트로 판정하는 일 0건**.
- 묶음 간 retention 상관 비교(충분 표본 후 별도 리뷰), D30 대조 실행(보류), 플랫폼 패리티(m15 위임), 운영 리듬(m23 위임), 정밀 time gap(m10 위임).

검증 절차:

```bash
git diff --stat -- apps/web/src apps/ios/Sources   # 출력 없어야 함 (코드 변경 0)
git status --short                                  # docs 1파일만
rg '<<<<<<<|=======|>>>>>>>' apps/web/docs/activation-retention-correlation-readiness.md   # 줄머리 충돌 마커 0
rg 'posthog.capture\(' apps/web/src/app/add/page.tsx -n   # 6개 이벤트 발화 위치 재확인
```

## 부록: 성공기준 완성도 체크리스트

| # | 성공기준 (marketing-37) | 충족 섹션 | 완성도 |
|---|---|---|---|
| 1 | A1~A4 후보 묶음 | §2 묶음표 | ✅ |
| 2 | first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`) | §2 + §9 | ✅ |
| 3 | activation window 후보 | §3 W-IMM/W-CONF | ✅ |
| 4 | retention 대조 질문(D7 우선, D30 보류) | §3 tier + §4 잡별 질문 | ✅ |
| 5 | 제외 조건(mock/synthetic/self-test/availability cap/503) | §5 X-MOCK/X-SYNTH/X-SELF/X-CAP/X-503 | ✅ |
| 6 | pseudo-query shape | §6 공통 골격 + 묶음별 파라미터 | ✅ |
| 7 | prelaunch 금지 해석 | §0 전제 + §7 금지선 | ✅ |
| 8 | source note + activation-candidate-registry 인용 | §0 출처노트 + §2·§8 m33 인용 | ✅ |
| 9 | 신규 이벤트/속성/코드/대시보드 변경 0 | §0 전제2 + §9 + §10 | ✅ |
| 10 | 선행 first value 매핑 충돌 0 | §8 충돌 점검 | ✅ |
