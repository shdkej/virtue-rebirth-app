---
작성일: 2026-05-27
Intent: marketing-23
Mode: 내부 기획/운영 L1
Status: draft
Owner: Workflow-Master (Planner / Developer / Marketer / Operator 4역할 합성)
---

# Virtue 온보딩 지표 운영 판독표

## §0 목적 + 전제

### 목적

정식 출시 전 첫 10~20명을 관찰할 때, **activation / TTV / drop-off / D1·D7 retention** 을 흩어진 문서가 아니라 **한 운영 판독표**로 묶는다. 목표는 새 지표를 만드는 것이 아니라, "어느 이벤트를 볼지"보다 **"어떤 가치 증거로 해석할지"** 를 먼저 정하는 것이다. 출처 노트(`source/external-links/marketing/2026-05-27-onboarding-metrics-practice.md`, Appcues 온보딩 지표 가이드)의 핵심을 Virtue prelaunch 기준으로 번역한다.

- onboarding은 환영 메시지나 투어가 아니라 호기심 상태에서 실사용 상태로 넘어가는 과정 전체다.
- activation은 가입/설정 완료가 아니라 **제품 가치가 처음 드러나는 특정 행동**이다.
- TTV는 진입 이후 의미 있는 가치까지 걸린 시간이며 immediate / long-term으로 나눈다.
- funnel drop-off는 "온보딩이 나쁘다"는 판정이 아니라 **어느 단계에서 멈추는지 찾는 진단 도구**다.
- onboarding completion은 단독 목표가 아니다. 완료율이 높아도 activation/retention으로 이어지지 않으면 잘못된 체크리스트다.
- retention(D1/D7/D30)은 후행 신호지만, 작은 표본에선 비율보다 **세션 기록·행동 증거**를 먼저 본다.

### 선행 문서 역할 분리 (계승, 재정의 금지)

본 판독표는 새 정의를 만들지 않는다. 아래 선행 문서를 **운영 리듬으로 정렬**할 뿐이다. 정의를 바꾸면 충돌이다(§9 점검).

| 문서 | 본 판독표가 계승하는 것 | 본 판독표가 위임하는 것 |
|---|---|---|
| `first-session-jtbd-matrix.md` (m06) | J1~J4 잡 정의, J1/J2/J4 = `deed_saved` · J3 = `deed_judged` first-value 매핑 | 잡 자체의 정의·근거 |
| `time-to-value-observation-brief.md` (m10) | TTV 시작/종료점, `first_value_time`·`second_value_gap` 계산 틀 | 정밀 time gap·중앙값·P90 계산 |
| `first-60-second-value-observation-script.md` (m20) | 60초 라이브 판독, 가용성≠가치 분리, synthetic/test 단서 | 현장 60초 시계 메커닉·관찰자 셋업 |
| `retention-predictive-activation-brief.md` (m22) | 첫 행동(intent) vs first value vs depth 3층 분리, D7 재가치 질문 5선 | depth signal 상세·D7 질문 원문 |
| `seven-day-deed-loop.md` (m03) | `deed_saved` 중심 루프, D1/D3/D7 리듬, judged−saved 갭 주의 | 마일스톤 카피 후보 |
| `first-real-user-baseline-template.md` (m11) | 첫 10~20명 한 명당 한 행 기입 양식 | per-user 행 컬럼 원장 |

### 전제 (못박기)

1. **관찰 기록부지 채점표가 아니다.** prelaunch이므로 어떤 값도 "좋다/나쁘다"로 판정하지 않는다. 본 판독표는 무엇을 어떻게 분리해 읽을지를 정할 뿐이다.
2. **신규 0.** 신규 이벤트·속성·코드·카피·대시보드·플래그·세션리플레이를 단 하나도 만들지 않는다. 이미 발화 중인 기존 이벤트(`add_flow_started`, `deed_judged`, `deed_saved`, `level_up_viewed`, 보조 `deed_rerolled`, `deed_save_capped`)만 인용한다(§8 사실 확인).
3. **외부 액션 0.** 외부 발송·공개 모집·인터뷰 요청·광고를 0건 수행한다. 아래 D1/D7 질문은 *이미 허용된 관찰/대화*에서 손으로 적을 문장이지, 본 Intent로 보내는 메시지가 아니다.
4. **completion ≠ goal.** 내부 체크리스트 완료를 activation/retention과 동일시하지 않는다. vanity completion과 실제 value signal을 §2 한 표에서 다른 칸으로 가른다.

## §1 왜 흩어진 지표가 아니라 한 판독표인가

선행 문서들은 first value(m06), TTV(m10), 60초 라이브 판독(m20), 리텐션 예측 depth·D7(m22)을 각각 잘게 정의했다. 다음 위험은 "좋은 지표 후보가 많아졌지만 운영 리듬이 흐려지는 것"이다. Appcues 글의 쓸모는 새 벤치마크 숫자가 아니라 **activation, TTV, drop-off, retention을 한 루프로 묶고 vanity completion과 실제 value signal을 분리하라**는 점이다.

prelaunch 상태에서 필요한 것은 대시보드 숫자가 아니라 더 작은 질문이다: 이 사람이 어느 잡(J1~J4)으로 들어왔는가, 어느 순간 first value를 봤는가, 그 행동이 D1/D7에 한 번 더 닿았는가. 본 판독표는 그 질문들을 한 장에 모아 launch 전후의 **지표 과대해석과 중복 문서 생산**을 줄인다.

## §2 운영 판독표 (이 문서의 심장)

행은 네 잡. 한 행을 가로로 읽으면 그 잡의 **activation event → TTV 시작/종료 → drop-off 해석 주의 → D1/D7 재가치 질문 → synthetic/test 제외 단서** 가 한 번에 보인다. first value는 선행 문서에서 계승하며 재정의하지 않는다.

| 잡 | activation event (first value · 기존 이벤트) | TTV 시작 → 종료 | drop-off 해석 주의 (진단 도구지 실패 판정 아님) | D1 재가치 질문 (손기록) | D7 재가치 질문 (손기록) | synthetic/test 제외 단서 |
|---|---|---|---|---|---|---|
| **J1 기록형** | 첫 `deed_saved` — "방금 한 일을 남겼다"가 닫히는 즉시 만족 | start = `add_flow_started`(`/add` 진입) → end = 첫 `deed_saved` | `add_flow_started`는 있는데 `deed_saved`가 없으면 "어디서 멈췄나" 메모 대상. AI 채점 대기 중 이탈을 곧장 가치 거부로 읽지 않음 | "다음 날 다시 들어와 한 번 더 남겼는가? 처음과 같은 '남긴다' 가치였는가?" | "7일 안에 또 남겼는가? '또 할 수 있다'가 확인됐는가?" | mock 폴백·데모 시드(641)·메이커 self-test → 표시 후 집계 제외 |
| **J2 누적형** | 첫 `deed_saved` — 총합 증가로 "쌓였다"는 누적감 | start = `add_flow_started` → end = 첫 `deed_saved`(총합↑) | 저장은 했으나 누적 payoff를 못 알아챈 듯한 경우는 "도달/누출 애매"로 둠. `level_up_viewed` 첫 세션 부재를 리텐션 실패로 보지 않음 | "다음 날 누적이 한 번 더 보였는가? 환생종 진행을 알아챘는가?" | "7일 안에 누적/`level_up_viewed`(환생종 변화)에 한 번 더 닿았는가?" | 위와 동일 + localStorage 반복 테스트로 누적이 미리 쌓인 기기 제외 |
| **J3 AI 호기심형** | 첫 `deed_judged` — "AI가 내 행동을 이렇게 봤다" (저장 전 닫힘, 저장은 선택) | start = `add_flow_started` → end = 첫 `deed_judged` | **judged−saved 갭을 이탈로 단정하지 않음.** J3는 `deed_judged` 후 저장 없이 정상 종료할 수 있음. `deed_rerolled`("다르게 보면?")는 이탈이 아니라 호기심 신호 | "다시 판정을 보러 왔는가? 다르게 보고 싶었는가, 이번엔 저장으로 이어졌는가?" | "7일 안에 또 판정을 보러 왔는가? 반복 `deed_judged`/`deed_rerolled` 또는 저장 전환이 보였는가?" | mock 폴백 토스트("임시 판정") 시 진짜 AI 가치 경험 아님 → J3 first value로 집계 안 함 |
| **J4 회고형** | 첫 `deed_saved` — "나중에 돌아볼 게 생겼다"는 지연 가치 | start = `add_flow_started` → end = 첫 `deed_saved`(로그 첫 항목) | 즉시 반응이 약해도 미도달로 오판 금지(지연 가치). 첫 주 내 덕행록 재방문 부재를 회고형 실패로 단정하지 않음 | "저장한 항목을 다시 볼 만하다고 느꼈는가? 두 번째를 남기면 로그가 된다는 감각이 있었는가?" | "7일 안에 또 항목을 남겼는가? '쌓이면 로그가 된다'를 확인했는가?" | 위와 동일 (J1과 같은 `deed_saved`라도 가치 방향은 지연) |

> **판독 핵심:** 같은 `deed_saved`라도 가치 방향이 다르다 — J1 즉시 / J2 누적 / J4 지연. 이벤트가 같다고 같은 재가치로 묶지 않는다. J3만 `deed_judged`가 first value이고, 저장 없는 종료가 정상 경로다. `deed_save_capped`가 발화한 시도는 저장이 중단(early return)되어 `deed_saved`가 발화하지 않으므로 TTV 종료·D1/D7 재가치로 집계하지 않는다(§3·§8).

## §3 판독표 보충 메모 (셀이 좁을 때만)

- **TTV는 두 가지 출처가 있다.** 정밀 time gap(이벤트 타임스탬프 차이)은 `time-to-value-observation-brief.md`에, 60초 라이브 체감값은 `first-60-second-value-observation-script.md`에 위임한다. 본 판독표의 "TTV 시작 → 종료"는 *어느 이벤트가 시작이고 끝인가*를 잡별로 고정하는 칸일 뿐, 숫자를 계산하는 칸이 아니다.
- **immediate TTV vs long-term TTV.** first value까지의 시간이 immediate TTV, D1/D7에 가치가 다시 닿기까지가 long-term TTV에 해당한다. prelaunch에서는 둘 다 비율이 아니라 사례 손기록으로 본다.
- **D1과 D7은 묻는 결이 다르다.** D1은 "바로 다음 날 가치가 한 번 더 닿았는가"(즉시 반복), D7은 "한 주를 건너 같은 잡 가치가 살아남았는가"(초기 리텐션 조기 신호). 둘 다 **숫자가 아니라 질문**으로 손기록한다(retention-predictive-activation-brief §5 5선 계승).
- **availability ≠ value.** 503·AI judge 타임아웃/지연·`deed_save_capped`(30덕 상한) 차단 구간은 first value/TTV/drop-off 집계에서 **제외(availability-blocked)** 하고, 신호 부재를 가치 부재로 읽지 않는다.

## §4 drop-off 단계와 해석 주의 (funnel = 진단 도구)

온보딩 퍼널을 코드 흐름 순서로 고정하고, **각 갭이 "이탈"이 아니라 "어디서 멈췄나"의 질문**임을 못박는다. 단계는 `/` 대시보드 land → `/add` 진입(`add_flow_started`) → 채점 확인(`deed_judged`) → 저장(`deed_saved`) → (조건부) 환생종 변화(`level_up_viewed`).

| 단계 갭 | 무엇을 보는가 | 해석 주의 (do-not-infer) |
|---|---|---|
| `/` land → `add_flow_started` | `/`만 보고 `/add`로 안 넘어감 | "이탈률"로 환산 금지. "/에서 멈춤" 사례로만 기록. J3는 `/`에 AI 약속 신호가 약해 진입이 늦을 수 있음 |
| `add_flow_started` → `deed_judged` | 입력은 시작했으나 채점까지 못 감 | 입력 부담/사진 강제/대기 마찰일 수 있음. 코드상 `add_flow_started`(:72)는 abandon 시 `add_flow_abandoned`(:78, 기존 이벤트)와 짝을 이뤄 미저장 이탈 위치를 표시 |
| `deed_judged` → `deed_saved` | 채점은 봤으나 저장 안 함 | **잡별로 부호가 뒤집힌다.** J1/J2/J4엔 저장 전 이탈 후보, **J3엔 정상 종료**(가치는 `deed_judged`에서 이미 닫힘). 갭을 잡 구분 없이 이탈로 합산 금지 |
| `deed_saved` → `level_up_viewed` | 저장했으나 환생종 변화 없음 | 정상이다. `level_up_viewed`는 stage 상승 시에만 발화하므로 첫 세션 부재가 기본. 부재를 누적 가치 부재로 읽지 않음 |

**잡 무관 공통 경계:** drop-off는 온보딩 전체의 합격/불합격이 아니라 멈춤 위치를 찾는 도구다. 작은 표본에서 단계 통과 수를 비율로 읽지 않고 사람·상황 단위로 읽는다.

## §5 synthetic / test 제외 원칙

운영 기본값이 **mock 채점**이라 관찰 화면이 합성 데이터일 수 있다. 아래 단서가 보이면 **합성/테스트 런으로 분류해 집계에서 제외**한다 — 행은 남기되(삭제 아님) activation/TTV/drop-off/retention 카운트에서만 뺀다.

- **mock 단서:** 결과 카드 "임시 판정 / 임시 판정 결과" 라벨·헤더, 우상단 "mock" 배지, 폴백 토스트("AI가 잠깐 졸고 있어요. 임시 판정으로 보여드릴게요."). AI 모드라도 폴백이면 진짜 AI 가치 경험이 아니므로 J3 first value로 집계하지 않는다.
- **데모 시드:** 처음부터 총 641덕 + 가짜 덕행 14건이 보이면 `NEXT_PUBLIC_SHOW_DEMO=1` 시드 상태 → 실사용자 관찰 부적합. 신규 사용자 기본은 빈 스토어.
- **반복/내부 트래픽:** 메이커 본인 테스트·QA·더미 입력은 "test (제외)". localStorage 기반이라 같은 기기 반복은 누적 데이터를 보게 되어 "첫 세션/첫 가치" 관찰에 부적합.
- **점수 품질 판단 금지:** mock 점수는 가중 랜덤, 코멘트는 키워드 라우팅 고정 풀이라 입력과 무관하게 그럴듯할 수 있다. 채점 품질을 지표로 삼지 않는다.

## §6 운영 리듬 (손기록, 자동 집계 아님)

Appcues가 말하는 "반복 리듬"을 prelaunch 규모에 맞게 가장 가볍게 적용한다. 대시보드·알림·자동 집계를 만들지 않고, 기존 baseline 양식(`first-real-user-baseline-template.md`) 위에서 사람이 손으로 본다.

- **주간 — activation · drop-off 점검:** 이번 주 관찰한 사람들의 §2 first value 도달 여부와 §4 멈춤 위치를 사례로 모은다. 비율이 아니라 "누가 어디서 멈췄고 무엇을 말했나"를 적는다.
- **월간(또는 launch 직전) — retention · 재가치 점검:** §2 D1/D7 재가치 질문 답을 모아 같은 잡 가치가 다시 닿았는지 본다. D7을 외부 벤치마크 수치로 베끼지 않는다.
- **리듬의 목적은 점수가 아니라 루프다:** 계획(무엇을 관찰할지) → 관찰(손기록) → 분리(value vs vanity/availability) → 다음 관찰 질문 갱신.

## §7 prelaunch 해석 금지선 (do-not-infer / do-not-overclaim)

첫 10~20명(제외 후 한 자릿수)에서 아래를 **결론으로 만들지 않는다**(baseline §5 · ladder §4 · pmf-rubric · retention-predictive §6 계승).

- **completion을 결론으로 만들지 않는다.** 내부 체크리스트/온보딩 완료율을 activation·retention 성공으로 환산 금지(Appcues: high completion ≠ activation).
- **first click을 활성화로 승격하지 않는다.** `add_flow_started`(진입 의도)는 setup 칸이지 first value가 아니다. 클릭 수·비율을 지표로 올리면 vanity다.
- **conversion(전환율)을 산출하지 않는다.** "도달 N / 미도달 M"을 %로 읽지 않고 사람·상황 단위로 읽는다.
- **retention %를 외부 기준으로 판정하지 않는다.** 특정 % 리텐션 룰을 prelaunch 합격선으로 적용 금지. D7은 비율이 아니라 "같은 잡 가치가 한 번 더 닿았는가"의 손기록 질문.
- **PMF 계산을 하지 않는다.** 40% 임계값 등 외부 PMF 산식을 작은 표본에 적용 금지.
- **judged−saved 갭을 이탈로 단정하지 않는다.** J3는 `deed_judged`에서 가치를 얻고 정상 종료할 수 있다.
- **availability ≠ value.** 503·채점 지연·`deed_save_capped` 차단 구간은 제외하고, 신호 부재를 가치 부재로 읽지 않는다.
- **한 명의 강한 신호를 제품 방향으로 확정하지 않는다.** 표본이 작을수록 한 명의 인상/막힘이 과대평가된다.
- **단계·층 도달을 세그먼트 크기로 읽지 않는다.** "J3가 잘 닿음 → J3 세그먼트가 크다"로 읽지 않는다. 빈 잡은 "표본 없음"으로 둔다.
- **변경 금지.** 코드·카피·이벤트·속성·대시보드·세션리플레이·배포·외부 발송·비용·시크릿·권한·개인정보 변경 0.

## §8 기존 이벤트 증거 (발화 위치, read-only 사실 확인)

본 판독표가 인용하는 모든 신호는 `apps/web/src/app/add/page.tsx`에 **이미 발화 중인 기존 이벤트**다. 신규 구현 0건. 아래 라인은 Developer 렌즈 read-only 검증 결과이며 선행 문서(m22 §7 등)와 drift 0.

| 이벤트 | 발화 위치 | 발화 시점 | 본 판독표에서의 역할 |
|---|---|---|---|
| `add_flow_started` | `add/page.tsx:72` | `/add` 마운트 시 1회(`useEffect([])`) — 첫 입력이 아니라 진입 시점 | TTV 시작점 · 첫 행동(intent), activation 아님 |
| `deed_judged` | `add/page.tsx:106` | 채점 성공 직후, **저장과 독립·저장 전** 발화 | J3 activation(first value) · TTV 종료(J3) |
| `deed_rerolled` | `add/page.tsx:149` | "한 번 더" 클릭(재채점 한도 내, 최대 3회) | J3 호기심 depth 신호(이탈 아님) |
| `deed_save_capped` | `add/page.tsx:167` | 30덕 상한 초과 시 발화 후 **저장 중단(early return)** | availability-blocked(저장 미발화 → 집계 제외) |
| `deed_saved` | `add/page.tsx:183` | 저장 실행(`addDeed`) 후 발화 | J1/J2/J4 activation(first value) · TTV 종료 · 반복=재가치 |
| `level_up_viewed` | `add/page.tsx:199` | `deed_saved` 직후 환생종 stage 상승 시에만 | J2 누적 재가치 보조(첫 세션 보통 부재) |

> 보조 사실: 같은 파일에 `add_flow_abandoned`(:78), `deed_judge_attempted`(:135)도 이미 발화 중이다. 본 판독표는 **요청된 6개 이벤트에 한정**하며 새 이벤트를 제안하지 않는다. drop-off 해석 시 `add_flow_abandoned`는 미저장 이탈 위치 표시에 코드상 짝으로 존재한다는 사실만 §4에 인용한다.

## §9 충돌 점검 (no-conflict)

| 대상 문서 | 충돌 여부 | 근거 |
|---|---|---|
| `first-session-jtbd-matrix.md` | 없음 | J1~J4 잡 정의와 J1/J2/J4 = `deed_saved` · J3 = `deed_judged` 매핑을 그대로 계승. 재정의 0 |
| `time-to-value-observation-brief.md` | 없음 | TTV 시작/종료점 정의 계승. 정밀 계산식은 위임하고 다시 쓰지 않음 |
| `first-60-second-value-observation-script.md` | 없음 | 60초 라이브 판독·가용성≠가치·synthetic 단서 계승. 현장 시계 메커닉은 위임 |
| `retention-predictive-activation-brief.md` | 없음 | 첫 행동/first value/depth 3층 분리와 D7 재가치 질문을 계승. 본 표는 한 판독표로 정렬만 |
| `seven-day-deed-loop.md` | 없음 | `deed_saved` 중심 D1/D3/D7 리듬과 judged−saved 갭 주의 계승. 신규 이벤트 0 |
| `first-real-user-baseline-template.md` | 없음 | 첫 10~20명 1인 1행 양식 재사용. 새 표·컬럼 추가 0 |
| `copy-spec.md` (금지어) | 없음 | 사용자 노출 카피 0건. 인용한 화면 문구("임시 판정" 등)는 현재 코드 그대로의 단서. 금지어 미사용 |

## Out of scope

본 Intent(marketing-23)로 수행하지 않으며, 각각 별도 Intent에서 결정한다.

- 코드/카피/런타임 변경 **0건** — 산출물은 docs 1파일뿐이다.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·대시보드·세션리플레이 없음. baseline 양식에 컬럼 추가도 하지 않는다.
- 외부 발송·공개 모집 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고 없음.
- 배포·CI·권한·시크릿·비용·개인정보 변경 **0건**.
- 첫 10~20명 또는 synthetic/small sample을 **completion·전환율·리텐션율·PMF·세그먼트·D7 %로 판정하는 일 0건** — n<20 표본은 관찰 대상이지 채점 대상이 아니다.
- 정밀 time gap·중앙값·P90 계산(TTV brief 위임), 60초 현장 시계 메커닉(60s script 위임).

---

## 검증 매핑

| 성공 기준 (marketing-23) | 충족 섹션 |
|---|---|
| activation event (잡별 first value) | §2 "activation event" 컬럼, §8 |
| TTV 시작/종료점 | §2 "TTV 시작 → 종료" 컬럼, §3, §8 |
| drop-off 해석 주의 | §2 "drop-off 해석 주의" 컬럼, §4 |
| D1/D7 재가치 질문 | §2 "D1/D7 재가치 질문" 컬럼, §3, §6 |
| synthetic/test 제외 원칙 | §2 "synthetic/test 제외 단서" 컬럼, §5 |
| 한 운영 판독표로 묶음 | §2 (심장, 한 표로 6개 차원 포함) |
| 기존 이벤트만(6종), 신규 0 | §0 전제2, §8 (코드 근거) |
| first-value 정의 유지(J1/J2/J4=`deed_saved`, J3=`deed_judged`) | §2, §8, §9 |
| completion/first click/conversion/retention%/PMF 결론 금지 | §0 전제4, §1, §7 |
| 선행 문서 충돌 0 | §9 (no-conflict) |
