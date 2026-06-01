---
작성일: 2026-06-01
Intent: marketing-33
Mode: 내부 기획 L1/L2
Status: complete
Owner: Marketer (Planner / Developer / Operator 관점 종합)
---

# Virtue 활성화 후보 등록부 (Activation Candidate Registry)

## §0 목적 + 전제

### 목적

PostHog의 활성화(activation) 렌즈는 **활성화를 단일 magic 이벤트가 아니라 3~5개 이벤트의 묶음(bundle)으로 보고, 제품별 관찰 window 안에서 묶음 도달이 장기 리텐션과 얼마나 상관되는지를 비교해 후보 중 하나를 고르라**고 권한다. 핵심은 두 가지다 — (1) 단일 이벤트가 아니라 묶음, (2) 시점이 아니라 **window**.

Virtue는 prelaunch라 어떤 묶음도 어떤 window도 "활성화 정의 확정"으로 못박을 수 없다. 그러나 **출시 후 작은 실사용 데이터가 생겼을 때 묶음·window를 사후에 입맛대로 고르는(cherry-pick) 위험**은 지금 막을 수 있다. 본 등록부는 그 위험을 막는 장치다: J1~J4 잡별로 **검증 대상 후보 묶음과 관찰 window를 미리 한곳에 고정(register)** 해 두고, 출시 후 검증은 "새로 만드는" 것이 아니라 "등록된 후보를 대조"하는 일이 되게 한다.

본 등록부는 두 시점에 쓰인다.

1. **첫 10~20명 사람 관찰** 단계 — 관찰자가 "이 사람의 잡은 무엇이고, 어떤 묶음을 어떤 window 안에서 손기록할 것인가"를 등록된 후보로 채운다.
2. **출시 후 첫 데이터 리뷰** 단계 — 숫자를 보기 전에 "어떤 후보 묶음을 어떤 window로 리텐션과 대조할 것인가"를 등록부에서 꺼내 쓴다(사후 선택 금지).

### 전제 (못박기)

1. **등록부지 채점표가 아니다.** prelaunch이므로 본 문서는 어떤 묶음·window의 도달률도 "좋다/나쁘다"로 판정하지 않는다. 후보를 *등록*할 뿐, 합격선을 세우지 않는다(§5 금지선).
2. **신규 0.** 신규 이벤트·속성·코드·카피·대시보드·플래그·세션리플레이를 단 하나도 만들지 않는다. 이미 발화 중인 기존 6개 이벤트(`add_flow_started`, `deed_judged`, `deed_saved`, `level_up_viewed`, 보조 `deed_rerolled`, `deed_save_capped`)만 인용한다(§7 사실 확인).
3. **외부 액션 0.** 외부 발송·공개 모집·인터뷰 요청·광고를 0건 수행한다. 아래 수기 관찰 칸은 *이미 허용된 관찰/대화*에서 손으로 적는 문장이지, 본 Intent로 보내는 메시지가 아니다.
4. **재정의 0.** first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`), 잡 정의, 사다리, TTV 계산 틀은 선행 문서가 소유한다. 본 등록부는 그 위에 "후보 묶음 + window를 등록"하는 축만 더한다(§6 충돌 점검).

> **출처노트 주의:** Intent가 가리킨 출처노트 `source/external-links/marketing/2026-06-01-activation-metric-bundles.md`는 본 작업 시점 로컬 저장소에 **부재**(`source/` 트리 자체 없음)했다. 따라서 본 등록부는 출처노트 원문이 아니라 Intent rationale에 적힌 PostHog 활성화 렌즈 요지(묶음+window+리텐션 대조)와 이미 검증된 선행 문서(특히 m15 §4 묶음 원칙)에 근거한다. 출처노트가 복구되면 §1 요지를 재대조한다.

## §1 왜 "등록부"인가 — 묶음·window를 미리 고정하는 이유

선행 문서들은 묶음과 window의 재료를 이미 잘게 정의했다.

- **묶음:** `ios-activation-event-parity-brief.md`(m15) §4가 J1~J4 활성화 후보 이벤트 묶음(3~5개)을 *플랫폼 패리티 축*으로 이미 표로 만들었다.
- **window:** `retention-predictive-activation-brief.md`(m22)가 첫 행동/first value/depth 3층과 D7 재가치를, `onboarding-metrics-reading-table.md`(m23)가 immediate TTV vs long-term TTV를, `time-to-value-observation-brief.md`(m10)가 TTV 시작/종료점을 정의했다.

남은 위험은 "재료는 흩어져 있는데, 출시 후 데이터가 생기면 그때그때 묶음·window를 새로 조립하면서 결과가 좋아 보이는 조합을 고르게 되는 것"이다. PostHog 활성화 렌즈가 경계하는 바로 그 사후 선택이다. 본 등록부는 m15의 묶음과 m22/m23/m10의 window를 **잡별 한 행에 묶어 후보를 동결**해, 검증을 "조립"이 아니라 "대조"로 바꾼다.

**m15·m23과의 역할 분리(중복 아님):**

- m15는 같은 묶음이 **웹/iOS에서 같게 관측되는가**(패리티)를 본다. 본 등록부는 플랫폼 패리티를 **m15에 위임**하고, 묶음 자체를 *등록 단위*로 고정한다(웹 발화 기준; iOS 차이는 m15 참조).
- m23은 activation/TTV/drop-off/retention을 **운영 리듬(주간/월간 손기록)** 으로 정렬한다. 본 등록부는 운영 리듬을 **m23에 위임**하고, 그 리듬이 매번 참조할 *후보 묶음+window 카탈로그*를 제공한다.

## §2 활성화 후보 등록부 (이 문서의 심장)

행은 네 잡. 한 행을 가로로 읽으면 그 잡의 **등록 ID → first value(계승) → 후보 묶음(3~5) → 관찰 window → 사용 가능 기존 이벤트 → 수기 관찰 칸 → 금지 해석**이 한 번에 보인다.

후보 묶음은 **시작 이벤트가 아니라 완료 이벤트를 우선**한다(시작=의도, 완료=가치 도달). window는 **W-IMM(첫 세션 안, immediate first value)** 과 **W-CONF(D7 안, 재가치/depth 확인)** 두 칸으로 나눠 등록한다 — 둘 다 *후보*이지 합격선이 아니다(§3 window 정의).

| 등록 ID | 잡 | first value (계승, 재정의 0) | 후보 묶음 (3~5 이벤트, 완료 우선) | 관찰 window | 사용 가능 기존 이벤트 | 수기 관찰 칸 (손기록) | 금지 해석 (do-not-infer) |
|---|---|---|---|---|---|---|---|
| **A1** | **J1 기록형**<br>"방금 한 일을 남겼다" 즉시 만족 | 첫 `deed_saved`:183 | `add_flow_started` → `deed_judged` → `deed_saved` → (W-CONF) 2nd `deed_saved` | **W-IMM** 첫 세션 내 첫 `deed_saved`<br>**W-CONF** D7 내 2nd `deed_saved` | `add_flow_started`:72 / `deed_judged`:106 / `deed_saved`:183 | "첫 세션에 남겼나 / 7일 안에 또 남겼나 / 같은 '남긴다' 가치였나" | `add_flow_started`(진입=의도)를 활성화로 승격 금지. judged 후 미저장은 저장 전 이탈 *후보*로만 메모(가용성 먼저 배제) |
| **A2** | **J2 누적형**<br>"쌓였다" 누적감 | 첫 `deed_saved`:183 (총합↑) | `deed_saved`(총합↑) → (보조)`level_up_viewed` → (W-CONF) 2nd `deed_saved` → 2nd `level_up_viewed` | **W-IMM** 첫 세션 내 첫 `deed_saved`<br>**W-CONF** D7 내 2nd `deed_saved` 또는 `level_up_viewed` 재도달 | `deed_saved`:183 / `level_up_viewed`:199(조건부) | "누적이 보였나 / 환생종 진행을 알아챘나 / 7일 안에 누적 가치에 한 번 더 닿았나" | `level_up_viewed` 첫 세션 부재를 누적 가치 부재·리텐션 실패로 읽지 않음(stage 상승 시에만 발화) |
| **A3** | **J3 AI 호기심형**<br>"AI가 내 행동을 이렇게 봤다" | 첫 `deed_judged`:106 (저장 전 닫힘) | `add_flow_started` → `deed_judged`(채점 완료=가치) → (선택)`deed_rerolled` → (W-CONF) 2nd `deed_judged` | **W-IMM** 첫 세션 내 첫 `deed_judged`<br>**W-CONF** D7 내 2nd `deed_judged`/`deed_rerolled` 또는 저장 전환 | `add_flow_started`:72 / `deed_judged`:106 / `deed_rerolled`:149 | "AI 판정을 가치로 봤나 / 다르게 보고 싶었나 / 7일 안에 또 판정을 보러 왔나" | **judged−saved 갭을 이탈로 단정 금지** — J3는 저장 없이 `deed_judged`에서 정상 종료. `deed_rerolled`는 이탈 아닌 호기심. 묶음에서 `deed_saved`를 필수로 요구 금지 |
| **A4** | **J4 회고형**<br>"나중에 돌아볼 게 생겼다" 지연 가치 | 첫 `deed_saved`:183 (로그 첫 항목) | `add_flow_started` → `deed_judged` → `deed_saved` → (W-CONF) 2nd `deed_saved` | **W-IMM** 첫 세션 내 첫 `deed_saved`<br>**W-CONF** D7 내 2nd `deed_saved` | `add_flow_started`:72 / `deed_judged`:106 / `deed_saved`:183 | "다시 볼 만하다고 느꼈나 / '쌓이면 로그가 된다' 감각이 있었나 / 7일 안에 또 남겼나" | 즉시 반응이 약해도 미도달로 오판 금지(지연 가치). 덕행록 재방문은 첫 세션 밖이라 본 묶음 범위 밖 |

> **등록부 판독 핵심:** ① 같은 `deed_saved`라도 가치 방향이 다르다 — A1 즉시 / A2 누적 / A4 지연. 이벤트가 같다고 같은 묶음·재가치로 합치지 않는다. ② J3(A3)만 `deed_judged`가 first value이고, 저장 없는 종료가 정상 경로다(`deed_saved`를 A3 묶음의 필수 단계로 등록하지 않는 이유). ③ 모든 묶음은 **완료 이벤트 우선** — `add_flow_started`는 묶음 진입 신호일 뿐 활성화 후보 자체가 아니다. ④ 어느 묶음도 합격선이 아니라 **검증 대상 후보**다.

### 등록부 설계 원칙 (m15 §4 계승)

1. **단일 `deed_saved`로 고정하지 않는다.** 같은 저장이라도 J1/J2/J4는 가치 방향이 달라 묶음 구성·window 해석이 갈린다.
2. **시작보다 완료 이벤트를 우선한다.** aha 후보는 `add_flow_started`(의도)가 아니라 `deed_judged`/`deed_saved`(가치 도달)다.
3. **자동 발화 screen/lifecycle은 핵심 묶음에서 제외, 보조로만.** 화면 조회·앱 포그라운드는 "잡을 해냈다"를 증명하지 못한다.
4. **클라이언트 이벤트는 누락될 수 있어 따로 검증한다.** 묶음 대조 전에 각 핵심 이벤트가 실제 도착하는지부터 본다(§4 게이트).
5. **플랫폼 차이는 m15에 위임한다.** 본 등록부 묶음은 웹 발화 기준이며, iOS의 `add_flow_started`·`level_up_viewed`·`deed_rerolled` 부재 등 패리티 비대칭은 m15 §4를 그대로 참조한다(여기서 재정의 0).

## §3 관찰 window 정의 (W-IMM / W-CONF)

PostHog 활성화 렌즈가 말하는 "제품별 window"를 Virtue prelaunch 규모로 가장 가볍게 정의한다. 정밀 time gap·중앙값·P90 계산은 `time-to-value-observation-brief.md`(m10)에, D7 재가치 질문 원문은 `retention-predictive-activation-brief.md`(m22 §5)에 위임한다. 본 절은 *어느 시간창을 후보로 등록하는가*만 고정한다.

| window | 정의 | 등록 의미 | prelaunch 취급 |
|---|---|---|---|
| **W-IMM** (immediate) | 첫 세션 안에서 first value 도달 | 묶음의 *aha 단계*가 닿는 즉시 가치 시간창 | 비율 아닌 사례 손기록("첫 세션에 닿았나") |
| **W-CONF** (confirmation) | first value 후 **D7 안**에서 재가치/depth 도달 | 묶음의 *재가치 단계*가 닿는 초기 리텐션 조기 신호 시간창 | 비율 아닌 사례 손기록("7일 안에 또 닿았나") |

- **W-IMM vs W-CONF는 m23의 immediate TTV vs long-term TTV와 정렬**되며 새 정의가 아니다. 본 등록부는 그 둘을 *묶음과 짝지어 등록*만 한다.
- **window 시작점은 잡별 진입(`add_flow_started`:72) 또는 첫 land**, 종료점은 잡별 first value(A1/A2/A4=`deed_saved`, A3=`deed_judged`)다. W-CONF의 종료점은 2nd value(재저장/재판정/`level_up_viewed`)다.
- **availability ≠ value (window 제외 구간):** 503·AI judge 타임아웃/지연·`deed_save_capped`:167(30덕 상한 early return으로 `deed_saved` 미발화) 구간은 W-IMM/W-CONF 집계에서 **제외(availability-blocked)** 하고, 신호 부재를 가치 부재로 읽지 않는다.
- **D7은 숫자가 아니라 질문이다.** "7일 안에 같은 잡 가치가 한 번 더 닿았는가"의 손기록 질문이며, 외부 리텐션 % 룰을 prelaunch 합격선으로 쓰지 않는다(§5).

## §4 출시 후 첫 검증 게이트

### 트리거 조건

| 항목 | 값 |
|---|---|
| 발동 조건 | **실제 사용자 10명 도달** OR **출시 후 7일 경과** — 둘 중 먼저 오는 쪽 |
| 표본 성격 | 소표본 / 통계적 유의성 없음 (전환율·리텐션율 평가 불가) |
| 게이트 목적 | 등록된 후보 묶음·window가 **데이터로 대조 가능한지** 확인 전용 |

### 게이트에서 하는 일 / 안 하는 일

| 한다 (✓) | 안 한다 (✗) |
|---|---|
| 각 등록 묶음(A1~A4)의 핵심 이벤트가 PostHog에 **도착하는지** 확인 | 묶음 도달률을 activation rate로 환산해 좋다/나쁘다 판정 |
| W-IMM/W-CONF 시간창으로 **사례를 분류 가능한지** 확인 | 묶음 간 우열·리텐션 상관 결론 |
| synthetic/mock·메이커 self-test가 **분리 표시되는지** 확인(§5) | 전환율(judge→save 등) 수치 평가 |
| 등록부와 어긋난 점(누락·새 묶음 필요)을 *등록부 갱신 후보*로 기록 | 사후에 새 묶음/window를 즉석 조립해 결론 |

> 원칙: 이 게이트는 **"등록된 후보를 데이터로 대조할 수 있는가"** 만 본다. 숫자가 좋은지 나쁜지, 어떤 묶음이 리텐션과 상관되는지는 충분 표본 확보 후의 별도 성장 리뷰로 보류한다. 플랫폼 합산 전 web/iOS 분리는 **m15 §6 게이트**에 위임한다.

### 등록 ID별 점검 체크리스트 (웹 발화 기준)

| 등록 ID | W-IMM 점검 (첫 세션 first value 도착) | W-CONF 점검 (D7 재가치 도착) | 비고 |
|---|---|---|---|
| **A1** J1 | `add_flow_started`→`deed_judged`→`deed_saved` 도착 | 2nd `deed_saved` 도착 | iOS `add_flow_started` 부재 시 묶음 3→2단계 축소(m15) |
| **A2** J2 | `deed_saved` 도착(+`level_up_viewed` 발생 시) | 2nd `deed_saved` 또는 `level_up_viewed` 재도달 | `level_up_viewed` 첫 세션 부재는 정상 |
| **A3** J3 | `deed_judged` 도착(저장 없어도 정상) | 2nd `deed_judged`/`deed_rerolled` 또는 저장 전환 | `deed_saved` 미도착을 결손으로 보지 않음 |
| **A4** J4 | `add_flow_started`→`deed_judged`→`deed_saved` 도착 | 2nd `deed_saved` 도착 | 덕행록 재방문은 게이트 범위 밖 |

## §5 prelaunch 해석 금지선 (do-not-infer / do-not-overclaim)

첫 10~20명(제외 후 한 자릿수)에서 아래를 **결론으로 만들지 않는다**(m15 §5 · m22 §6 · m23 §7 · baseline · pmf-rubric 계승).

- **묶음·window를 사후에 입맛대로 고르지 않는다(본 등록부 존재 이유).** 출시 후 결과가 좋아 보이는 조합을 골라 "이게 우리 활성화"라고 선언 금지. 검증은 등록된 A1~A4 후보 대조로 한정한다.
- **묶음 도달률을 activation rate로 환산하지 않는다.** "묶음 도달 N / 미도달 M"을 %로 읽지 않고 사람·상황 단위로 읽는다.
- **window 도달을 합격선으로 못박지 않는다.** W-IMM/W-CONF는 검증 대상 시간창 후보일 뿐, "이 안에 닿으면 활성화 성공"이라는 임계값이 아니다.
- **리텐션 상관·전환율을 평가하지 않는다.** 어떤 묶음이 리텐션과 상관된다는 주장은 prelaunch에서 금지. 묶음 간 우열을 매기지 않는다.
- **`add_flow_started`(첫 행동/의도)를 활성화로 승격하지 않는다.** 클릭 수·진입 비율은 vanity다.
- **judged−saved 갭을 이탈로 단정하지 않는다.** J3(A3)는 `deed_judged`에서 가치를 얻고 정상 종료할 수 있다.
- **availability ≠ value.** 503·채점 지연·`deed_save_capped`:167 차단 구간은 window에서 제외하고, 신호 부재를 가치 부재로 읽지 않는다.
- **synthetic/mock·self-test를 사람 활성화에 섞지 않는다.** mock 폴백("임시 판정")은 J3 first value로 집계하지 않고, 데모 시드(641덕)·메이커 테스트·localStorage 반복 기기는 표시 후 집계 제외(삭제 아님).
- **외부 벤치마크 임계값(예: D7 40%)을 prelaunch에 적용하지 않는다.** 방향 참고점일 뿐 첫 10~20명의 합격선이 아니다.
- **한 명의 강한 신호를 제품 방향으로 확정하지 않는다.** 표본이 작을수록 한 명의 인상/막힘이 과대평가된다.
- **변경 금지.** 코드·카피·이벤트·속성·대시보드·세션리플레이·배포·외부 발송·비용·시크릿·권한·개인정보 변경 0.

## §6 선행 문서 계승 / 충돌 점검 (no-conflict)

아래 "소유 문서"의 정의는 본 등록부에서 한 글자도 바꾸지 않는다. 본 문서가 새로 하는 단 하나는 그 정의들을 **"잡별 후보 묶음 + 관찰 window를 한곳에 등록"** 하는 것뿐이다.

| 정의 항목 | 소유 문서 (Single Source) | 본 등록부의 취급 | 충돌 |
|---|---|---|---|
| J1~J4 잡 정의 + first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`) | `first-session-jtbd-matrix.md` (m06) | 그대로 계승·인용. 재정의 0 | 없음 |
| J1~J4 활성화 후보 이벤트 묶음(3~5) + 묶음 설계 원칙 | `ios-activation-event-parity-brief.md` (m15 §4) | 묶음 구성·원칙 계승. 본 문서는 *등록 단위*로 고정, 플랫폼 패리티는 m15에 위임 | 없음 |
| 첫 행동 vs first value vs depth 3층 + D7 재가치 | `retention-predictive-activation-brief.md` (m22) | W-CONF 시간창 근거로 계승. D7 질문 원문은 위임 | 없음 |
| activation/TTV/drop-off/retention 운영 리듬, immediate vs long-term TTV | `onboarding-metrics-reading-table.md` (m23) | W-IMM/W-CONF 정렬 근거로 계승. 운영 리듬(주간/월간)은 위임 | 없음 |
| TTV 시작/종료점, time gap 계산 틀 | `time-to-value-observation-brief.md` (m10) | window 시작/종료점 계승. 정밀 계산식은 위임 | 없음 |
| 첫 10~20명 1인 1행 기입 양식 | `first-real-user-baseline-template.md` (m11) | 수기 관찰 칸은 이 양식 재사용. 새 표·컬럼 0 | 없음 |
| availability≠value, synthetic/mock 제외, J3 저장 없는 정상 종료 | m20/m21/m23/proxy-dictionary | 계승. 재정의 0 | 없음 |
| 사용자 노출 카피 금지어 | `copy-spec.md` | 사용자 노출 카피 0건. 인용한 "임시 판정"은 현재 코드 그대로의 단서 | 없음 |

## §7 기존 이벤트 증거 (발화 위치, read-only 사실 확인)

본 등록부가 인용하는 모든 신호는 `apps/web/src/app/add/page.tsx`에 **이미 발화 중인 기존 6개 이벤트**다. 신규 구현 0건. 아래 라인은 Developer 렌즈 read-only 검증 결과이며 선행 문서(m15·m23 §8 등)와 drift 0.

| 이벤트 | 발화 위치 | 발화 시점 | 본 등록부에서의 역할 |
|---|---|---|---|
| `add_flow_started` | `add/page.tsx:72` | `/add` 마운트 시 1회(`useEffect([])`) | 묶음 진입 신호(intent), 활성화 후보 아님 · window 시작점 |
| `deed_judged` | `add/page.tsx:106` | 채점 성공 직후, **저장과 독립·저장 전** 발화 | A3 first value(W-IMM 종료) · A1/A4 묶음 중간 단계 |
| `deed_rerolled` | `add/page.tsx:149` | "한 번 더" 클릭(최대 3회) | A3 호기심 depth(W-CONF 보조, 이탈 아님) |
| `deed_save_capped` | `add/page.tsx:167` | 30덕 상한 초과 시 발화 후 **저장 중단(early return)** | availability-blocked(저장 미발화 → window 제외) |
| `deed_saved` | `add/page.tsx:183` | 저장 실행(`addDeed`) 후 발화 | A1/A2/A4 first value(W-IMM 종료) · 반복=W-CONF 재가치 |
| `level_up_viewed` | `add/page.tsx:199` | `deed_saved` 직후 환생종 stage 상승 시에만 | A2 누적 재가치 보조(첫 세션 보통 부재) |

> 보조 사실: 같은 파일에 `add_flow_abandoned`(:78), `deed_judge_attempted`(:135)도 발화 중이나, 본 등록부는 **요청된 6개 이벤트에 한정**하며 새 이벤트를 제안하지 않는다.

## §8 Out of scope (변경 0건)

본 Intent(marketing-33)로 수행하지 않으며, 각각 별도 Intent에서 결정한다.

- 코드/카피/런타임 변경 **0건** — 산출물은 docs 1파일뿐이다.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·대시보드·세션리플레이 없음. baseline 양식에 컬럼 추가도 하지 않는다.
- 외부 발송·공개 모집 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고 없음.
- 배포·CI·권한·시크릿·비용·개인정보 변경 **0건**.
- 첫 10~20명 또는 synthetic/small sample을 **activation rate·전환율·리텐션율·PMF·세그먼트로 판정하는 일 0건**.
- 묶음 간 리텐션 상관 비교(충분 표본 후 별도 리뷰), 플랫폼 패리티(m15 위임), 운영 리듬(m23 위임), 정밀 time gap 계산(m10 위임).

본 문서 작성이 위 경계를 지켰음을 검증하는 절차:

```bash
git diff --stat -- apps/web/src apps/ios/Sources   # 출력 없어야 함 (코드 변경 0)
git status --short                                  # docs 1파일만
rg '<<<<<<<|=======|>>>>>>>' apps/web/docs/activation-candidate-registry.md   # 충돌 마커 0
rg 'posthog.capture\(' apps/web/src/app/add/page.tsx -n   # 6개 이벤트 발화 위치 재확인
```

## 부록: 성공기준 완성도 체크리스트

| # | 성공기준 (marketing-33) | 충족 섹션 | 완성도 |
|---|---|---|---|
| 1 | J1~J4별 후보 묶음 | §2 등록부 "후보 묶음" 컬럼 (A1~A4) | ✅ |
| 2 | activation window | §2 "관찰 window" 컬럼 + §3 W-IMM/W-CONF 정의 | ✅ |
| 3 | 사용 가능한 기존 이벤트 | §2 "사용 가능 기존 이벤트" 컬럼 + §7 발화 위치 | ✅ |
| 4 | 수기 관찰 칸 | §2 "수기 관찰 칸" 컬럼 (baseline 양식 재사용) | ✅ |
| 5 | 금지 해석 | §2 "금지 해석" 컬럼 + §5 금지선 | ✅ |
| 6 | 출시 후 검증 게이트 | §4 게이트 (10명 OR 7일) + 등록 ID별 체크리스트 | ✅ |
| 7 | 선행 first value 문서와 충돌 0 | §6 충돌 점검 (no-conflict) | ✅ |
| 8 | 기존 6개 이벤트만 인용, 신규 0 | §0 전제2, §7 코드 근거 | ✅ |
