---
작성일: 2026-05-22
Intent: marketing-10
Mode: 내부 기획 L1
Status: draft
Owner: Marketer (Planner/Developer/Operator 관점 포함)
---

# Virtue time-to-value 관찰 기준표

## 0. 목적 + 전제

이 문서는 Virtue의 prelaunch 관찰을 "첫 가치까지 걸린 시간"과 "두 번째 가치까지 걸린 시간"으로 좁힌다. `docs/first-session-jtbd-matrix.md`가 J1-J4의 첫 세션 잡을 정의했고, `docs/activation-milestone-ladder.md`가 setup -> aha -> habit 사다리를 정의했다면, 이 문서는 그 사이의 시간 간격을 첫 10명 관찰표에서 같은 방식으로 기록하기 위한 기준표다.

전제는 세 가지다.

1. **prelaunch이므로 시간값은 성패 판정이 아니라 관찰값이다.** 빠르다/느리다, 좋다/나쁘다를 선언하지 않고 "누가 어떤 잡에서 어느 간격을 보였는가"만 기록한다.
2. **새 트래킹 / 이벤트 / 속성 / 코드 / 대시보드는 0이다.** 기존 이벤트 `add_flow_started`, `deed_judged`, `deed_saved`, `level_up_viewed`만 사용한다.
3. **외부 발송이나 인터뷰 요청은 하지 않는다.** 아래 질문은 첫 10명 관찰 중 내부 메모나 이미 허용된 대화에서 확인할 문장이지, 본 Intent로 보내는 메시지가 아니다.

## 1. J1-J4 time-to-value 표

| 잡 | first value | second value | 기존 이벤트 | time gap 계산 방식 | 정성 확인 질문 | prelaunch 해석 금지선 |
|---|---|---|---|---|---|---|
| **J1 기록형** | 오늘 한 행동을 저장해 "남겼다"가 닫히는 순간. | 같은 세션 또는 이후에 다른 행동을 한 번 더 저장해 "또 남길 수 있다"가 확인되는 순간. | start = `add_flow_started`; first = 첫 `deed_saved`; second = 다음 `deed_saved`. | first value time = 첫 `deed_saved` - `add_flow_started`. second value gap = 두 번째 `deed_saved` - 첫 `deed_saved`. | "저장된 뒤 방금 한 일이 기록됐다고 느꼈나?" "다음 것도 남기고 싶어졌나?" | AI 채점 대기 중 이탈을 곧장 가치 거부로 보지 않는다. 두 번째 저장이 없어도 기록형 잡 실패로 단정하지 않는다. |
| **J2 누적형** | 저장 후 덕력/진행이 늘었다고 느끼는 순간. | 추가 저장이나 `level_up_viewed`로 누적 보상이 한 번 더 보이는 순간. | start = `add_flow_started`; first = 첫 `deed_saved`; second = 다음 `deed_saved` 또는 `level_up_viewed`. | first value time = 첫 `deed_saved` - `add_flow_started`. second value gap = min(다음 `deed_saved`, 첫 `level_up_viewed`) - 첫 `deed_saved`. | "저장 후 쌓였다는 느낌이 있었나?" "다음 단계나 환생종 변화가 궁금했나?" | 첫 저장만으로 누적감이 약할 수 있다. `level_up_viewed` 미도달을 곧장 리텐션 실패로 보지 않는다. |
| **J3 AI 호기심형** | AI 판단을 확인하는 순간. 저장 전이어도 `deed_judged`에서 가치가 닫힐 수 있다. | 다른 판단을 한 번 더 보거나, 판단 후 저장으로 이어지는 순간. | start = `add_flow_started`; first = 첫 `deed_judged`; second = 다음 `deed_judged` 또는 `deed_saved`. 핵심 집계는 `deed_judged`와 `deed_saved`만으로 시작한다. | first value time = 첫 `deed_judged` - `add_flow_started`. second value gap = 다음 `deed_judged`/`deed_saved` 중 첫 발생 - 첫 `deed_judged`. | "AI가 본 결과 자체가 궁금증을 해소했나?" "저장하지 않아도 충분했나, 아니면 더 보거나 남기고 싶었나?" | judged - saved 갭을 이탈로 단정하지 않는다. J3는 저장 없이 정상 종료할 수 있으므로 `deed_saved`만으로 활성화를 읽지 않는다. |
| **J4 회고형** | 나중에 돌아볼 항목이 생겼다고 느끼는 첫 저장 순간. | 다른 항목을 더 저장하거나 덕행록/최근 덕행에서 기록이 쌓인다는 감각이 확인되는 순간. | start = `add_flow_started`; first = 첫 `deed_saved`; second = 다음 `deed_saved`. `level_up_viewed`는 회고형 핵심이 아니라 보조 맥락. | first value time = 첫 `deed_saved` - `add_flow_started`. second value gap = 두 번째 `deed_saved` - 첫 `deed_saved`. | "저장된 항목을 나중에 다시 볼 만하다고 느꼈나?" "두 번째 기록을 남기면 로그가 된다는 감각이 있었나?" | J1과 같은 `deed_saved`라도 가치 방향은 지연 가치다. 첫 주 안 재방문 부재를 회고형 실패로 판정하지 않는다. |

## 2. 공통 계산 원칙

| 항목 | 정의 | 주의 |
|---|---|---|
| `first_value_time` | 잡별 first value 이벤트 시각 - `add_flow_started` 시각 | J1/J2/J4는 첫 `deed_saved`, J3는 첫 `deed_judged`를 사용한다. |
| `second_value_gap` | 잡별 second value 이벤트 시각 - first value 이벤트 시각 | 두 번째 가치는 잡별로 다르다. J2는 `level_up_viewed`가 먼저 오면 보조 second value로 기록한다. |
| `setup_without_first_value` | `add_flow_started`는 있으나 잡별 first value 이벤트가 없는 상태 | prelaunch에서는 실패가 아니라 "어디서 멈췄는가" 메모 대상이다. |
| `first_without_second_value` | first value는 있으나 second value 후보가 없는 상태 | habit 미도달 판정이 아니라 후속 동기나 마찰을 묻는 관찰 지점이다. |

모든 계산은 기존 이벤트 시각 차이로만 한다. `job_hint`, `is_first`, 덕행록 재방문 전용 이벤트, PostHog 대시보드는 본 문서에서 만들지 않는다.

## 3. 첫 10명 관찰 메모 컬럼 후보

| 컬럼 | 기록 방식 |
|---|---|
| 관찰 대상 | 이름 또는 내부 식별자. 외부 공유 금지. |
| 추정 잡 | J1/J2/J3/J4 중 주된 첫 세션 동기. 모르면 "혼합/미정"으로 둔다. |
| first value 도달 | 잡별 first value 이벤트와 시각. |
| first value time | `add_flow_started`에서 first value까지의 시간. |
| second value 후보 | 잡별 second value 이벤트와 시각. 없으면 "미관찰"로 둔다. |
| second value gap | first value에서 second value까지의 시간. |
| 정성 메모 | 위 표의 질문에 대한 짧은 관찰 문장. |
| 판정 보류 메모 | 성패/리텐션/PMF 결론을 쓰지 않고, 해석하지 말아야 할 점만 남긴다. |

## 4. 충돌 점검

| 대상 문서 | 충돌 여부 | 근거 |
|---|---|---|
| `docs/first-session-jtbd-matrix.md` | 없음 | J1/J2/J4 = `deed_saved`, J3 = `deed_judged`, J2 보조 = `level_up_viewed` 매핑을 그대로 계승한다. |
| `docs/activation-milestone-ladder.md` | 없음 | setup = `add_flow_started`, aha = 잡별 first value, habit/반복 = second value 후보라는 사다리 해석을 유지한다. |
| `docs/seven-day-deed-loop.md` | 없음 | 반복 `deed_saved`와 judged - saved 갭 주의를 계승한다. 신규 이벤트 없이 기존 이벤트 시간차만 계산한다. |
| `docs/copy-spec.md` | 없음 | 사용자 노출 카피를 만들지 않는다. 이 문서는 내부 관찰 기준표다. |

## Out of scope

- 코드, 런타임, PostHog, 대시보드, 이벤트, 속성 변경.
- 외부 인터뷰 요청, 설문, DM, 이메일, SNS 게시.
- production 배포, CI 트리거, 비용 발생 작업.
- 첫 10명 또는 synthetic/small sample을 전환율, retention, PMF, segment size로 판정하는 일.

---

## 검증 매핑

| 성공 기준 | 충족 섹션 |
|---|---|
| J1-J4별 first value / second value 정의 | §1 |
| 기존 이벤트 `add_flow_started`, `deed_judged`, `deed_saved`, `level_up_viewed` 사용 | §1, §2 |
| time gap 계산 방식 | §1, §2 |
| 정성 확인 질문 | §1, §3 |
| prelaunch 해석 금지선 | §0, §1, §2, Out of scope |
