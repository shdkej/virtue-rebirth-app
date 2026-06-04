---
작성일: 2026-06-04
Intent: marketing-39
Mode: 내부 문서 L1/L2 (docs-only)
Status: final
Owner: Marketer (Planner/Developer/Operator 관점 포함)
---

# Virtue 인간-AI 준비도 흔적 지도 (Human-AI Readiness Trace Map · 첫 10명)

## 0. 목적

정식 출시 전 첫 10명을 관찰할 때, Virtue의 AI 판정 경험을 **정확도·만족도·activation %가 아니라 "준비도 흔적(readiness trace)"으로 읽는** 한 장을 고정한다. 출처 노트(arXiv "From Accuracy to Readiness" + Userpilot 2026 온보딩)의 핵심은 **인간-AI 제품 평가는 모델 정확도만으로 부족하고, 사용자가 결과를 본 뒤 저장·재시도·무시·수정·재방문 중 무엇을 했는지(interaction trace)가 더 실행 가능한 신호**라는 것이다. 논문은 인간-AI 의사결정을 **outcome · reliance behavior · safety signal · learning over time** 네 축으로 보자고 제안한다. 이 문서는 그 4축과 **U-C-I lifecycle(Understand-Control-Improve)** 을 Virtue의 첫 10명 관찰 언어로 번역한다.

만드는 것은 다음이다.

- 첫 10명 1인 1행 위에 얹는 **준비도 흔적 4축**(outcome / reliance / safety / learning) 컬럼 정의(§3).
- 4축을 J1~J4 잡별로 어떻게 읽는지의 **잡별 준비도 흔적 매핑**(§4, 심장).
- 각 흔적을 어디까지 읽고 어디부터 읽지 않는지의 **U-C-I 관찰 질문**(§5)과 **읽기 경계**(§6).
- 이 문서가 **새로 고정하는 단 하나의 경계**: outcome·reliance·safety·learning은 *서로 다른 축*이며, 한 축의 신호를 다른 축으로 합산하지 않는다(§2).

전제 못박기:

- Virtue는 정식 출시 전이고 실사용 데이터가 충분치 않다. 모든 흔적·신호·질문은 **관찰 기준**이지 판정 결과가 아니다. 첫 10명은 비율·평균·합격선의 대상이 아니다.
- 본 문서는 **새 이벤트·속성·카피·코드·대시보드·계측·세션리플레이를 단 하나도 만들지 않는다.** 이미 발화 중인 기존 이벤트만 인용하고, 신규 제안은 §8 proposal-only로 분리한다.
- First Value Mapping(J1/J2/J4=`deed_saved`, J3=`deed_judged` 저장 전)과 J1~J4 정의는 `first-session-jtbd-matrix.md`(m06)에서 그대로 계승한다(재정의 0).
- 본 문서는 첫 10명 기입 양식 `first-real-user-baseline-template.md`(m11) 위에 얹는 **읽기 렌즈**이며, 새 표·새 컬럼을 강제하지 않는다. 손기록은 m11 양식을 재사용한다.

## 1. 출처 렌즈 (정의 못박기)

- **outcome(결과 도달):** 사용자가 그 잡의 first value에 닿았는가. Virtue에서는 잡별 first value 이벤트(J1/J2/J4=`deed_saved`, J3=`deed_judged`)로 본다. outcome은 만족·동의가 아니라 "가치 자리에 닿음"이다.
- **reliance behavior(의존 행동):** 결과를 본 뒤 사용자가 **무엇을 했는가** — 저장·재시도·무시·수정·재방문. 자기보고식 trust보다 행동 흔적이 더 실행 가능한 신호다. 핵심은 *적정 의존(calibrated reliance)*: 과신(얕은 입력 판정을 정체성 사실로 받음)도 과소의존(도움 되는 AI를 무시)도 모두 흔적이다.
- **safety signal(안전 신호):** 잘못된 의존이 드러나는 지점. Virtue는 자율 외부 행동이 없으므로 safety는 "AI가 잘못 행동함"이 아니라 **자기인식 오보정**(과신)과 **냉소적 이탈**(`임시 판정` mock에 "그냥 랜덤")의 흔적으로 좁다([[No Autonomous Action Bounds The Trust Question]] 계승).
- **learning over time(시간에 따른 학습):** 첫 세션이 아니라 그 뒤. 출시 후 D7 재방문을 "AI를 믿었는가"가 아니라 **"이전 판정 이후 더 잘 쓰는가"** 라는 질문으로 본다. prelaunch에서는 흔적 후보만 등록한다.
- **U-C-I lifecycle:** AI 온보딩을 "기능 설명"이 아니라 사용자가 (U)AI의 한계·선택권을 **이해**하고, (C)저장/재시도/무시를 **제어**하며, (I)시간이 지나며 **더 잘 쓰게** 되는 흐름으로 본다. 온보딩은 제품 본체를 대체하지 않고 value line 이탈만 좁히는 bumper다(Userpilot, [[Product Body vs Bumper By Job]] 계승).

## 2. 이 문서가 새로 고정하는 경계 — 네 축은 서로 다른 축이다

출처 노트의 핵심 실수 방지선은 **한 축의 신호를 다른 축으로 합산하지 말라**는 것이다. Virtue에서 이 혼동은 구체적으로 다음처럼 나타난다.

- **outcome ≠ reliance:** J3가 `deed_judged`에서 정상 종료(outcome 도달)했는데 저장이 없다고 reliance 부재·이탈로 합산하면 오독이다. judged−saved 갭은 outcome 미달이 아니라 reliance 형태의 한 종류(무시/충분)다.
- **reliance ≠ safety:** `deed_rerolled`는 불신(과소의존)일 수도, "다르게 보면?"이라는 호기심·학습 행동일 수도 있다. reliance 활동량을 곧장 safety 위험(불신)으로 읽지 않는다([[AI Outcome Proxy Separation]] 계승).
- **outcome ≠ agreement:** `deed_saved`는 outcome 도달이지 **AI 판정에 동의했다는 신호가 아니다.** "참고해서 남김"과 "맞다고 해서 저장"은 다른 흔적이다(§6 경계, 출처 노트 §적용 1·2).
- **safety는 양방향:** 안전 위험은 과신(자기인식 오보정)만이 아니라 과소의존(도움 되는 AI 무시)도 포함한다. 신뢰를 무조건 높이는 게 목표가 아니라 적정 보정이다([[Trust Calibration By Job]] 계승).

> 함의(관찰용, 변경 아님): 첫 10명 손기록에서 한 칸(예: 저장수)만 보고 4축을 통째로 추론하지 않는다. 같은 행에서 outcome·reliance·safety·learning을 *분리해* 받아 적는다. 한 축이 비어도 다른 축의 실패로 읽지 않는다.

## 3. 준비도 흔적 4축 컬럼 (m11 양식 위에 얹는 읽기 렌즈)

m11 기준선 표(1인 1행)에 새 컬럼을 *강제하지 않고*, 기존 "정성 관찰 메모" 칸을 아래 4축으로 **구조화해 읽는** 렌즈만 제공한다. 모든 값은 기존 이벤트 + 수기 발화로만 채운다.

| 축 | 무엇을 받아 적나 | 채우는 재료 (기존 이벤트 + 수기) | 읽기 단위 |
|---|---|---|---|
| **outcome** (결과 도달) | 그 잡의 first value에 닿았나 | J1/J2/J4 `deed_saved`:183 / J3 `deed_judged`:106 (저장 전) | 사례("닿음/미관찰"), 비율 아님 |
| **reliance** (의존 행동) | 결과 뒤 저장/재시도/무시/수정/재방문 중 무엇을 했나 | `deed_saved`:183 · `deed_rerolled`:149 · 미저장 종료/`add_flow_abandoned`:78 · 입력 수정 | 행동 흔적 + 발화, 만족도 아님 |
| **safety** (안전 신호) | 과신(정체성 거울) / 과소의존(도움 무시) / mock 냉소 흔적 | 수기 발화("AI가 보기에 난…", "그냥 랜덤") + `임시 판정`(mock) 인지 여부 | 정성 흔적, 판정 아님 |
| **learning** (시간에 따른 학습) | (출시 후) 이전 판정 이후 더 잘 쓰는가 | D7 내 2nd `deed_judged`/`deed_saved`/`deed_rerolled` 재도달 | 후보 등록만, prelaunch 결론 0 |

> 판독 핵심: ① outcome은 잡별 first value 이벤트로, reliance는 그 *뒤* 행동으로, safety는 발화로, learning은 D7 재도달로 — **재료가 다르다.** ② 같은 `deed_saved`라도 outcome(닿음)과 agreement(동의)는 분리(§6). ③ learning 축은 prelaunch에서 후보 등록까지만, 첫 세션 관찰로 굳히지 않는다.

## 4. 잡별 준비도 흔적 매핑 (문서의 심장)

각 행은 한 잡. 모든 셀은 관찰 가설이다. 첫 가치 이벤트는 m06을 계승한다. 인용 이벤트는 전부 기존 발화 이벤트다.

| 잡 | outcome (first value 도달) | reliance behavior (결과 뒤 행동) | safety signal (오보정 흔적) | learning over time (D7, 출시 후) |
|---|---|---|---|---|
| **J1 기록형** | `deed_saved`:183 (0점도 가능). "남겼다" 즉시 만족이 outcome. | 저장=목적 / 재시도 거의 안 씀 / 점수 무시하고 저장도 정상. reliance는 *약함*이 정상(판정은 통과점). | **과신:** 낮은/0점을 "내 기록이 별로"로 받아 저장 망설임. **과소:** 점수 random해 보여 무시(정상). | 7일 안에 또 남기나(2nd `deed_saved`). "AI를 믿었나"가 아니라 "또 기록 자리로 오나". |
| **J2 누적형** | `deed_saved`:183 (총합↑). "쌓였다" 누적감이 outcome. 보조 `level_up_viewed`:199. | 점수 추격 재시도(`deed_rerolled`:149) 가장 잦음. 상한은 `deed_save_capped`:167 early return으로 미저장. | **과신:** 점수를 "객관 덕 측정치"로 받거나 높은 점수 노려 재판정 반복(슬롯머신화). **과소:** 출렁이면 "누적 무의미"→중단. | 7일 안에 누적 가치 재도달(2nd `deed_saved`/`level_up_viewed`). 더 잘 쌓는가. |
| **J3 AI 호기심형** | `deed_judged`:106 (저장 전). "AI가 나를 어떻게 보나" 확인 자체가 outcome. **저장 없이 종료가 정상.** | 저장=선택 / 재시도=가장 높은 가치("다르게 보면?", 양면 신호) / 무시=정상 종료(이탈 아님). reliance 형태가 가장 다양. | **과신(최대):** 얕은 입력 판정을 정체성 거울로("AI가 보기에 난 2/5"). **과소/냉소:** 빗나가거나 `임시 판정`(mock)이면 "그냥 랜덤". | 7일 안에 또 판정 보러 오나(2nd `deed_judged`/`deed_rerolled`). "믿었나"가 아니라 "또 보고 싶나". |
| **J4 회고형** | `deed_saved`:183 (로그 첫 항목). "나중에 돌아볼 게 생겼다" 지연 가치가 outcome. | 저장=항목 생성 / 재시도=로그 전 더 나은 코멘트 확보 / 무시=이탈. **출력 수정 부재**(저장 후 코멘트·태그 수정 불가). | **과신:** 빗나간 코멘트가 로그에 영구 부착돼도 수용(보관함 오염). **과소:** 코멘트 generic해도 사진+메모는 저장(AI만 절하). | 7일 안에 또 남기나(2nd `deed_saved`). 덕행록 재방문은 첫 세션 밖. |

> 이 표는 m38(신뢰/제어권 경계표)을 **재정의하지 않는다.** m38은 "낮은 위험 × 근거 가시성 × 선택권 × 과신/불신"의 delegation 렌즈이고, 본 표는 같은 잡을 **outcome/reliance/safety/learning 4축**으로 읽는 readiness 렌즈다. 같은 셀을 인용·보충하되 결론을 바꾸지 않는다(§7 충돌 점검).

## 5. U-C-I 관찰 질문 (수기 전용, readiness 렌즈 추가분만)

§4·m38·60초 스크립트와 중복되는 질문은 **위임하고 재수집하지 않는다.** 여기서는 출처 노트의 U-C-I lifecycle이 새로 묻는 것만 추린다. 모두 수기 관찰이다.

- **(U) Understand — 한계·선택권 이해:** 사진 1장+짧은 메모라는 *얕은 입력*에서 점수가 나온 걸 아는가, 전지적 평가로 받는가? `임시 판정`(mock)·AI 배지·한계 고지를 알아채는가?
- **(C) Control — 마지막 선택권 체감:** 결과를 본 뒤 "저장/재시도/무시 중 *내가* 골랐다"는 느낌이 남는가, "AI가 정했다"로 느끼는가? (특히 J3 저장 강제 오인 신호)
- **(I) Improve — 시간에 따라 더 잘 씀:** (출시 후) 재방문 시 이전보다 입력을 더 잘 쓰거나, 판정을 더 잘 해석하거나, 무시·재시도를 더 적절히 고르는가? "믿음의 증가"가 아니라 "사용 능력의 증가"로 본다.

> 가드: 어떤 발화도 "이 사용자는 AI를 신뢰함/불신함"으로 *판정*하지 않는다. 표현을 받아 적는 데까지만(60초 스크립트 §4-1 가드 계승).

## 6. 흔적 읽기 경계 (DO / DO-NOT)

§3·§4의 4축을 어디까지 읽을지 못박는다. 모든 신호는 **수기 관찰**로만 수집한다(새 컬럼·계측·리플레이 0).

| 신호 | DO (여기까지 읽는다) | DO-NOT (여기부터 읽지 않는다) |
|---|---|---|
| `deed_saved` | outcome 도달(J1/J2/J4)·로그 생성·총합 반영 | **AI 판정 동의/승인/만족으로 환산 금지.** "참고해 남김"과 "맞다고 해서 저장"을 구분. 저장수를 reliance 강도·신뢰도로 읽지 않음. |
| `deed_judged` (저장 없음) | J3 outcome 도달·정상 종료 가능 | 이탈/outcome 미달/불신으로 단정 금지. J3 저장 강제·필수 체크 금지. |
| `deed_rerolled` | reliance의 한 형태(호기심·일관성 테스트 J3 / 점수 추격 J2)의 activity proxy | safety 위험(불신)·만족·리텐션 단독 단정 금지. 재판정수를 신뢰/공유성으로 환산 금지. |
| `deed_save_capped` | availability/friction (저장 미발화) | value·upgrade demand·불신·outcome 종료·learning으로 환산 금지([[Availability And Friction Are Not Value]]). |
| 미저장 종료 / `add_flow_abandoned` | reliance(무시) 또는 막힘 — 4분류로 라우팅(B-LOST·B-MISMATCH·B-AVAIL·B-NORMAL) | 단일 부호(이탈)로 읽지 않음. J3 저장 없는 종료는 B-NORMAL 대표(m31 위임). |
| 수기 발화("맞네/아닌데/재밌네", "왜 이 점수지?") | safety(과신/과소)·control 체감의 정성 표현으로 받아 적음 | 한 명 발화로 신뢰/불신 *판정* 금지. learning 결론 금지. 표현 수집까지만. |
| D7 재도달 | learning 축 *후보 등록* | prelaunch에서 learning 결론·리텐션% 금지. "믿어서 돌아왔다"로 환산 금지. |

- **트래픽 분류가 먼저:** synthetic/mock/self-test 신호·점수는 사람 사용자 outcome이나 J3 first value 판단에 섞지 않는다(표시 후 집계 제외, 삭제 아님). 작은 표본은 방향 재료이지 합격선이 아니다([[Traffic Source Before Metrics]]).
- **learning은 prelaunch에서 미완:** 4축 중 learning은 첫 세션 관찰로 채울 수 없다. 첫 10명에서는 outcome·reliance·safety 3축만 흔적으로 적고, learning은 출시 후 D7 질문으로 *연다*(결론 0).

## 7. 충돌 점검 (no-conflict verification)

| 대상 문서 | 충돌 여부 | 근거 |
|---|---|---|
| `first-session-jtbd-matrix.md` (m06) | **없음** | J1~J4 정의·first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged` 저장 전) 그대로 계승. 재정의 0. |
| `first-real-user-baseline-template.md` (m11) | **없음** | 1인 1행 양식·synthetic 제외·판정 보류 메모를 그대로 재사용. 4축은 새 컬럼 강제가 아니라 "정성 관찰 메모" 구조화 렌즈. 새 표 0. |
| `activation-candidate-registry.md` (m33) | **없음** | A3(J3) `deed_saved` 미필수·judged−saved 갭=정상, W-IMM/W-CONF window 계승. learning 축의 D7 후보는 m33 W-CONF에 위임. activation 묶음 재정의 0. |
| `ai-judgment-trust-control-observation-boundary-table.md` (m38) | **없음** | delegation 4축(낮은 위험·근거·선택권·과신/불신)을 인용·보충. 본 문서는 readiness 4축(outcome/reliance/safety/learning)으로 *다른 렌즈*이며 같은 셀을 재정의하지 않음. "자율 행동 없음" 경계 계승. |
| `ai-outcome-proxy-dictionary.md` (m24/m29) | **없음** | activity ≠ acceptance ≠ value 분리 계승. outcome ≠ agreement(§6)는 이를 강화. |
| `product-body-vs-bumper-boundary-table.md` (m31) | **없음** | 막힘 4분류(B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL)를 §6 미저장 종료 라우팅에 인용. U-C-I의 bumper 정의는 m31 본체/범퍼 계승. 새 분류 0. |
| `first-60-second-value-observation-script.md` §4-1 (m20) | **없음** | J3 라이브 큐·"판정 금지" 가드 계승. §5 U-C-I는 그와 중복하지 않는 readiness 추가분만. |
| `copy-spec.md` (금지어) | **없음** | 사용자 대상 카피를 새로 만들지 않음. §8 카피 후보는 proposal-only이며 노출 카피 아님. |

## 8. proposal-only (본 Intent 범위 밖)

- **m11 양식에 4축 컬럼 정식 추가:** 본 문서는 *읽기 렌즈*만 제공. 양식에 outcome/reliance/safety/learning 컬럼을 정식 추가할지는 양식 변경이므로 별도 Intent.
- **learning 축 D7 계측:** 재방문·재판정 trace를 자동 집계할 대시보드/쿼리. → 계측 변경, m37 correlation 등록부 게이트에 위임, approval-needed.
- **마지막 선택권 가시화:** "저장 안 해도 돼요" 류 control 안내 카피. → J3 첫 가치 흐름 방해 위험, 관찰로 먼저 확인, 승인 대상.
- **신규 readiness 이벤트/속성:** 근거 조회 여부·판정 동의/이견·mock 인지 태깅. → 계측 변경, 본 Intent 금지.

## 9. 가정 분리 — 계승 / 변경 / 충돌 / 학습 후보

### 9.1 계승한 가정 (Inherited, 변경 0)

- First Value Mapping: J1/J2/J4=`deed_saved`(:183), J3=`deed_judged`(:106). J3 judged−saved 갭=정상. ([[First Value Mapping]])
- AI Outcome Proxy Separation: activity/acceptance/value 분리. 저장수·reroll·judged−save 갭 단독 단정 금지. ([[AI Outcome Proxy Separation]])
- No Autonomous Action Bounds The Trust Question: 자율 외부 행동 없음 → safety는 자기인식 오보정 범위로 좁음. ([[No Autonomous Action Bounds The Trust Question]])
- Trust Calibration By Job: 신뢰는 과신·불신 사이 적정 보정. J3 진폭 최대. ([[Trust Calibration By Job]])
- Availability And Friction Are Not Value · Traffic Source Before Metrics · Prelaunch Decision Boundary · Product Body vs Bumper By Job.

### 9.2 변경한 가정 (Changed)

- **없음.** 기존 결론·이벤트·정의를 바꾸지 않는다. 본 문서는 출처 노트의 readiness 4축으로 기존 신호의 **읽기 렌즈**를 추가할 뿐이다.
- 단, 출처 노트가 부각한 nuance **"`deed_saved` ≠ AI 판정 동의(outcome ≠ agreement)"** 를 §6에서 명시화했다. 이는 [[AI Outcome Proxy Separation]]의 *강화*이지 변경이 아니다.

### 9.3 충돌 (Conflicts)

- **선행 문서와 충돌 0.** §7 표 참조. 본 문서는 인용·위임·보충만 하며 어떤 셀도 재정의하지 않는다.
- source note(`source/external-links/marketing/2026-06-04-human-ai-readiness-traces.md`) 인용. 외부 논문 프레임을 Virtue 성과 기준·벤치마크 숫자로 가져오지 않고, prelaunch 관찰 기준으로만 번역(노트 Source Boundary 준수).

### 9.4 학습 후보 (Learning Candidates)

- **승격 후보(durable):** `Readiness Trace Over Accuracy` — 인간-AI 제품의 첫 경험은 정확도·만족도가 아니라 **outcome/reliance/safety/learning 4축의 상호작용 흔적**으로 읽는다. 네 축은 서로 다른 축이며 한 축의 신호(예: 저장수)를 다른 축(동의·신뢰·학습)으로 합산하지 않는다. Virtue에서 outcome=잡별 first value, reliance=결과 뒤 행동, safety=자기인식 오보정 흔적, learning=D7 "더 잘 쓰는가". → [[AI Outcome Proxy Separation]]·[[No Autonomous Action Bounds The Trust Question]]를 잇는 관찰 프레임. 모든 비행동 AI 판정 제품에 반복 적용 가능하므로 승격 후보.
- **report 보류(one-off):** "learning 축은 Virtue prelaunch에서 첫 세션 관찰로 채울 수 없어 3축만 적는다"는 관측은 이번 단계의 인스턴스 사실이라 원장에 올리지 않고 본 문서·report에만 둔다.

## 10. 학습 루프 (다음 Marketer 인계)

### 계승한 기준

§9.1 전체. 핵심 3개: First Value Mapping · AI Outcome Proxy Separation · No Autonomous Action Bounds The Trust Question.

### 이번에 새로 배운 것

인간-AI 준비도는 정확도가 아니라 상호작용 흔적으로 본다. 출처 노트의 **outcome/reliance/safety/learning 4축**을 Virtue에 번역하면, 같은 잡을 m38의 delegation 렌즈와 *다른 각도*로 읽게 된다 — outcome(닿음)·reliance(결과 뒤 행동)·safety(오보정 흔적)·learning(D7 더 잘 씀)은 **재료가 다른 별개 축**이고, 한 축 신호를 다른 축으로 합산하면 오독이다. 특히 `deed_saved`는 outcome 도달이지 **AI 판정 동의가 아니다(outcome ≠ agreement).** prelaunch 첫 10명에서는 learning 축을 채울 수 없어 outcome·reliance·safety 3축만 흔적으로 적고 learning은 출시 후 D7 질문으로 연다.

### 다음 Marketer에게 넘길 규칙

1. 인간-AI 첫 경험은 정확도·만족도 한 칸이 아니라 outcome/reliance/safety/learning 4축으로 *분리해* 읽는다. 한 축이 비어도 다른 축의 실패로 읽지 않는다.
2. `deed_saved`를 AI 판정 동의/승인으로, judged−saved 갭을 outcome 미달/이탈로, `deed_rerolled`를 safety 불신으로, `deed_save_capped`를 value로 읽지 않는다.
3. learning 축은 prelaunch에서 후보 등록까지만. D7 재방문은 "믿었나"가 아니라 "더 잘 쓰나"로 본다(결론 0).
4. 모든 흔적은 수기 관찰. 4축 컬럼 정식 추가·D7 계측·trust 이벤트는 proposal-only(§8).

### MARKETING_LEARNINGS.md 승격 후보

- **승격(durable):** `Readiness Trace Over Accuracy`(§9.4). 모든 비행동 AI 판정 제품에 반복 적용 가능. [[AI Outcome Proxy Separation]]·[[No Autonomous Action Bounds The Trust Question]]를 잇는 관찰 프레임.
- **report 보류(one-off):** "learning 축은 첫 세션 관찰로 못 채워 3축만 적는다"는 이번 단계 인스턴스 사실이라 원장에 올리지 않는다.

## 11. Out of scope

- 외부 메시징/발송(이메일·SMS·푸시·웹훅·DM·SNS·설문 어떤 채널도).
- 계측/PostHog 변경(신규 이벤트·속성·대시보드·세션 리플레이·플래그).
- 코드 변경(`src/`·`public/`·런타임 설정). `apps/web/docs/` 한 파일만 추가.
- 프로덕션/배포 변경, 비용·시크릿·권한·접근 제어·프로덕션 데이터 변경.
- 실제 준비도/신뢰 측정치 확정(4축 흔적은 관찰 가설이며 실사용 데이터 없이 굳히지 않음). 첫 10명을 activation rate·전환율·리텐션·PMF로 판정하는 일 0건.

---

## 검증 매핑

| 성공 기준 | 충족 섹션 |
|---|---|
| outcome/reliance/safety/learning 4축 | §1, §3, §4 |
| U-C-I 관찰 질문 | §1, §5 |
| J1~J4 first value 매핑 (J1/J2/J4=`deed_saved`, J3=`deed_judged`) | §0, §3, §4, §9.1 |
| J3 judged-without-save 정상 경계 | §2, §4 J3, §6 |
| `deed_saved` ≠ AI 판정 동의 경계 | §2, §6, §9.2 |
| no-new-instrumentation line | §0 전제2, §11 |
| 기존 이벤트만 인용(`add_flow_started`:72/`add_flow_abandoned`:78/`deed_judged`:106/`deed_rerolled`:149/`deed_save_capped`:167/`deed_saved`:183/`level_up_viewed`:199) | §3, §4, §6 |
| 계승/변경/충돌/학습 후보 분리 | §9 |
| source note 인용 + 선행 문서 충돌 0 | §0, §7, §9.3 |
| 학습 루프(계승/새로 배운 것/넘길 규칙/승격 후보) | §10 |
