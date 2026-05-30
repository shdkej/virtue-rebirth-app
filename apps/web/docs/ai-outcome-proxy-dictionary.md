---
작성일: 2026-05-30
Intent: marketing-29
Mode: 내부 기획 L1
Status: draft
Owner: Marketer (Planner / Developer / Operator 관점 포함)
---

# Virtue AI outcome proxy 사전

## §0 목적 + 전제

### 목적

정식 출시 전, 작은 이벤트 수치를 성과로 **과대해석하지 않기 위한** 내부 판독 사전이다. AI 제품의 결과 지표는 "AI가 무언가 했다"는 **활동량**이 아니라 "사용자가 그 결과를 자기 맥락에서 받아들였는가"라는 **사용자 인정 가치의 대리(proxy)** 여야 한다(출처 노트 핵심, Intercom outcome-based value framing · Reforge North Star quality 렌즈). Virtue는 prelaunch/low-signal 단계라 제품 지표가 decision-grade가 아니다. 지금 필요한 것은 KPI 합격선이 아니라, 이미 발화 중인 이벤트를 **어떤 종류의 대리 지표로 읽을지, 그리고 어떻게 읽으면 틀리는지**를 잡(J1~J4)별로 못박는 경계다.

본 문서는 한 장을 만든다.

- 기존 발화 이벤트를 **5종 proxy type**(activity / acceptance / curiosity / friction / retention)으로 분류한다(§1·§2).
- **J1~J4 × 이벤트 × proxy type × quality condition × misread warning** 을 한 표로 고정한다(§3·§4).
- prelaunch decision-grade 금지선을 명시한다(§5).

### 선행 문서 계승 (재정의 금지)

본 사전은 새 first-value 정의를 만들지 않는다. 아래 선행 매핑을 **그대로 인용**하고, 그 위에 "outcome proxy 판독 축"만 덧댄다. 정의를 바꾸면 충돌이다(§6 점검).

| 잡 | first value (기존 이벤트, 재정의 0) | 출처(소유 문서) |
|---|---|---|
| J1 기록형 | 첫 `deed_saved` (즉시 만족) | `first-session-jtbd-matrix.md` |
| J2 누적형 | 첫 `deed_saved` (누적감) + 보조 `level_up_viewed` | `first-session-jtbd-matrix.md` |
| J3 AI 호기심형 | 첫 `deed_judged` (저장 전·저장 없이 닫힘이 정상 경로) | `first-session-jtbd-matrix.md` |
| J4 회고형 | 첫 `deed_saved` (지연 가치) | `first-session-jtbd-matrix.md` |

> 같은 `deed_saved`라도 J1 즉시 / J2 누적 / J4 지연으로 가치 방향이 다르고, J3만 `deed_judged`가 first value다. 본 문서는 이 매핑을 **한 글자도 바꾸지 않으며**, 그 위에 proxy 분류만 얹는다.

### 전제 (못박기)

1. **분류이지 처분이 아니다.** proxy type은 이벤트를 어떻게 읽을지 가르는 렌즈일 뿐, 합격/실패 판정문이 아니다.
2. **신규 0.** 신규 이벤트·속성·코드·카피·계측·대시보드·세션리플레이·플래그를 단 하나도 만들지 않는다. 이미 발화 중인 6개 이벤트(`add_flow_started`, `deed_judged`, `deed_saved`, `level_up_viewed`, `deed_rerolled`, `deed_save_capped`)만 인용한다.
3. **활동 ≠ 결과.** "AI가 관여한 행위"와 "사용자가 인정한 결과"를 분리한다. 활동량은 가치의 상한이 아니라 입구일 뿐이다.
4. **작은 표본은 정성.** prelaunch에서 proxy 수치는 비율·전환율·합격선이 아니라 관찰 기준이다(§5).

## §1 proxy type 사전 (5종 정의)

출처 노트의 outcome/North Star quality 렌즈를 Virtue 이벤트 언어로 번역한다. 각 type은 "무엇을 대리하는가"와 "왜 활동량과 다른가"를 가진다.

| proxy type | 무엇을 대리하는가 (Virtue) | 왜 활동량과 다른가 |
|---|---|---|
| **activity proxy** (활동) | AI/사용자가 단순히 행위를 시작·통과했다는 사실. `add_flow_started`, 단발 `deed_judged` 호출 횟수 | "무언가 일어났다"일 뿐. 호기심 방문자·self-test·반복 클릭까지 같이 세어, 가치 발생으로 직행하면 과대해석된다(Intercom: conversation 수 ≈ 가치 아님). |
| **acceptance proxy** (인정) | 사용자가 결과를 **보존하기로 선택**한 행위. 잡별 first value의 `deed_saved` | AI가 결과를 냈는지가 아니라 사용자가 그 결과를 자기 기준으로 받아들였는지를 본다. Intercom의 "성공은 고객이 정의한다"에 대응. |
| **curiosity proxy** (호기심) | 결과를 **확인·탐색**하려는 욕구. `deed_judged`(J3 first value), `deed_rerolled`(다르게 보기) | 채점을 본 것은 탐색 충족일 수 있고, 저장이 없어도 잡이 닫힐 수 있다(J3). 불신과 탐색이 같은 이벤트로 나타나 quality 조건 없이는 부호를 못 정한다. |
| **friction proxy** (마찰/가용성) | 외부 제약·한도로 인해 행위가 **차단**된 구간. `deed_save_capped`(30덕 상한 early-return) | AI가 만든 가치가 아니라 외부 제약 신호다. willingness-to-pay·upgrade demand로 환산하면 가치와 원가를 뒤섞는다(출처 노트). |
| **retention proxy** (재방문/지속) | 누적 payoff를 알아채고 **다시 의미 있는 행위로 돌아옴**. `level_up_viewed` + 며칠 뒤 반복 `deed_saved` | 단발 노출(`level_up_viewed` 1회)은 노출일 뿐. 진짜 리텐션 quality는 이후 재방문·second value와 함께 봐야 한다(Reforge: 첫인상은 1단계, 습관은 가치 차이로 만들어진다). |

> **핵심 원칙(출처 노트):** unit of value · quality · frequency를 분리하라. 값어치 있는 행동(acceptance·retention)과 단순 사용 행동(activity)을 구분하지 않으면 지표가 잘못된 행동을 장려한다.

## §2 이벤트 × proxy type × quality condition × misread warning (심장 표 1)

행은 6개 발화 이벤트. 각 이벤트의 지배적 proxy type, 그 type으로 **인정받기 위한 quality 조건**, 그리고 **오독 경고**를 고정한다. 코드 앵커는 `apps/web/src/app/add/page.tsx` 현행 발화 위치다.

| 이벤트 (앵커) | 지배적 proxy type | quality condition (이 조건일 때만 그 proxy로 읽음) | misread warning (이렇게 읽으면 틀림) |
|---|---|---|---|
| `add_flow_started` (:72) | activity | 입구를 통과했다는 사실 이상으로 읽지 않는다. 뒤따르는 acceptance/curiosity 신호와 함께 볼 때만 funnel 진입으로 의미. | 진입 자체를 activation·intent-to-pay로 읽기. 진입은 가치가 아니라 시작점이다. |
| `deed_judged` (:106) | curiosity (J3) / activity(그 외) | J3에선 first value(탐색 충족). 그 외 잡에선 저장으로 가는 통과점일 뿐. 같은 결과 카드를 본 맥락(잡)이 먼저 정해져야 의미. | `deed_judged`−`deed_saved` 갭을 **일괄 이탈**로 읽기. J3는 저장 없이 닫힘이 정상 종료다(`first-session-jtbd-matrix.md` §3 계승). |
| `deed_saved` (:183) | acceptance | 사용자가 결과를 보존하기로 **선택**했을 때. 단 0점 저장·즉흥 저장처럼 의외 행동이 있으므로 점수·맥락과 함께 본다. | 저장 횟수를 곧 만족도·품질로 환산하기. 저장은 인정의 강한 단서이나 자동 성공이 아니다(점수 무관 저장 존재). |
| `deed_rerolled` (:149) | curiosity | 1회 재판정은 탐색("다르게 보면?"), 반복 재판정은 불신일 수 있음. 저장 전/후·횟수(`MAX_REROLLS` 한도)로 나눠야 신호. | 재판정을 무조건 불신(나쁜 신호)으로 읽거나 무조건 engagement(좋은 신호)로 읽기. 횟수·맥락 분리 전에는 부호 미정. |
| `deed_save_capped` (:167) | friction | 30덕 상한 초과 시 저장 중단(early-return)이라 `deed_saved` 미발화. availability-blocked 구간으로 처리해 activation/TTV 집계에서 제외. | cap 횟수를 upgrade demand·monetization intent·"더 쓰고 싶다"로 환산하기. cap은 한도에 닿은 사실일 뿐 가치 욕구의 증명이 아니다(`prelaunch-monetization-boundary-brief.md` §4 계승). |
| `level_up_viewed` (:199) | retention | 누적 payoff 노출이지만, 진짜 retention quality는 며칠 뒤 반복 `deed_saved`·재방문과 함께 볼 때만 성립. 단발 노출은 노출. | 1회 노출을 리텐션 확보·습관 형성으로 읽기. 첫인상은 리텐션의 1단계일 뿐이다(Reforge 계승). |

> `deed_judge_attempted`(:135)·`add_flow_abandoned`(:78)도 코드에 존재하나, 본 사전의 proxy 판독은 검증 게이트가 지정한 **6개 발화 이벤트 화이트리스트**에만 한정한다. 둘은 위 6개의 보조 사실로만 참조하며 새 proxy를 부여하지 않는다.

## §3 J1~J4 × 이벤트 × proxy 판독 (심장 표 2)

같은 이벤트라도 잡에 따라 어떤 proxy로 읽히는지가 바뀐다. 행은 네 잡. first value는 §0에서 계승하며 재정의하지 않는다.

| 잡 | first value (proxy type) | 보조 proxy 신호 (기존 이벤트) | quality condition (잡 한정) | misread warning (잡 한정) |
|---|---|---|---|---|
| **J1 기록형** | 첫 `deed_saved` = **acceptance** | `add_flow_started`=activity(입구) | "오늘 한 컷 남겼다"가 저장으로 닫힐 때 인정. AI 채점 대기는 J1엔 마찰(빨리 남기고 싶음). | judged−saved 갭을 J1에선 저장 전 이탈 후보로 볼 수 있으나, 1명 신호로 이탈 단정 금지. activity(진입)를 J1 성공으로 읽지 않기. |
| **J2 누적형** | 첫 `deed_saved` = **acceptance** + 보조 `level_up_viewed` = **retention** | 반복 `deed_saved`(총합 증가)=retention, `deed_save_capped`=friction | 누적감·진화가 도착해야 J2 가치가 절반 이상 전달. retention proxy는 며칠 뒤 반복 저장과 함께 볼 때만. | 첫 세션 단발 `level_up_viewed`를 리텐션으로 읽기. `count===0` 첫 진입의 빈 누적감을 가치 부재로 읽기(빈 상태 의존일 뿐). |
| **J3 AI 호기심형** | 첫 `deed_judged` = **curiosity** (저장 전) | `deed_rerolled`=curiosity(다르게 보기), 선택적 `deed_saved`=acceptance | 채점 확인 자체가 first value. 저장 없이 종료는 **정상 경로**. 재판정은 1회 탐색 / 반복 불신으로 나눠 읽음. | judged−saved 갭을 이탈로 읽기(J3 한정 가장 흔한 오독). 재판정을 곧 불신으로 단정하기. |
| **J4 회고형** | 첫 `deed_saved` = **acceptance** (지연 가치) | 첫 세션 밖 덕행록 재방문=retention(본 문서 범위 밖) | "나중에 돌아볼 게 생겼다"가 첫 항목 저장으로 충족. 진짜 회고 가치는 첫 세션 밖이라 첫 항목 저장까지만 인정. | 첫 세션 저장 1회로 회고 습관·리텐션을 단정하기. AI 채점 대기를 J4 가치로 읽기(J1과 동일, 마찰임). |

> **공통(잡 교차) 원칙:** activity proxy는 어느 잡에서도 성공이 아니라 입구다. acceptance/curiosity는 잡별 first value에 묶이고, friction은 외부 제약, retention은 second value와 함께만 의미를 가진다. 같은 `deed_judged`가 J3엔 curiosity first value, 다른 잡엔 통과점인 것이 핵심이다.

## §4 misread warning 모음 (do-not-misread)

표 셀로 좁은 핵심 오독을 한 곳에 모은다. 모두 "활동 → 결과"로 직행하는 사고를 막기 위한 것이다.

- **활동량 = 가치 (가장 큰 오독).** `add_flow_started`·단발 `deed_judged` 횟수를 activation·trust·pricing intent로 직행하지 않는다. 호기심 방문자·self-test·반복 클릭이 섞인다(Intercom: 단순 conversation 과금/성과 환산 위험).
- **judged−saved 갭 = 이탈.** J3에선 저장 없는 종료가 정상이다. 갭의 부호는 잡이 정해진 뒤에야 결정된다. 코드상 `deed_judged`(:106)가 `deed_saved`(:183)보다 항상 먼저라 식별은 가능하지만, 식별이 곧 이탈 판정은 아니다.
- **`deed_save_capped` = 유료 수요.** cap은 friction/availability 신호다. upgrade demand·willingness-to-pay·monetization intent로 환산 금지(`prelaunch-monetization-boundary-brief.md` §4 계승).
- **`deed_rerolled` = 불신.** 1회 재판정은 탐색일 수 있다. 반복·맥락 분리 전에는 좋은/나쁜 신호 어느 쪽으로도 단정하지 않는다.
- **`level_up_viewed` 1회 = 리텐션.** 단발 노출은 노출일 뿐이다. retention proxy는 며칠 뒤 반복 `deed_saved`와 함께 볼 때만 quality를 가진다.
- **저장 횟수 = 만족도.** `deed_saved`는 인정의 강한 단서이나, 0점 저장 등 의외 행동이 있어 점수·맥락 없이 품질로 환산하지 않는다.
- **synthetic/mock = 인정.** mock 폴백·데모 시드·self-test로 발화한 이벤트를 acceptance/curiosity 증거에 섞지 않는다(`traffic-source-reading-boundary-table.md` 계승).

## §5 prelaunch decision-grade 금지선 (forbidden boundaries)

> Virtue는 prelaunch/low-signal이라 어떤 proxy 수치도 decision-grade가 아니다. 아래는 본 사전을 근거로 **하지 않는다**.

| 금지 항목 | 사유 |
|---|---|
| proxy 수치를 전환율·activation rate·retention%·PMF·벤치마크로 산출 | 작은/synthetic 표본은 비율이 아니라 정성 관찰 대상(출처 노트, 선행 문서 계승) |
| 한 명의 acceptance/curiosity 신호로 잡·가치 단정 | 1명 신호는 가설 보강일 뿐 결론이 아니다 |
| activity proxy(`add_flow_started`·단발 judged)를 성공 지표로 승격 | 활동량은 입구이지 결과가 아니다(§0 전제3) |
| `deed_save_capped`를 monetization/upgrade 신호로 사용 | friction proxy이지 가치 욕구의 증명이 아니다(§4) |
| 신규 이벤트·속성·코드·계측·대시보드·세션리플레이·플래그 생성 | 본 사전은 기존 6개 이벤트 인용에 한정. 신규 0(§0 전제2) |
| 공개 카피·결제·paywall·배포·CI·외부 메시징·비용·시크릿·권한·개인정보 변경 | 본 Intent 산출물은 docs 1파일뿐(approval-needed → Waiting) |

## §6 충돌 점검 (no-conflict)

| 대상 문서 | 충돌 여부 | 근거 |
|---|---|---|
| `first-session-jtbd-matrix.md` (m06) | 없음 | J1/J2/J4=`deed_saved`·J3=`deed_judged` first-value 매핑을 §0·§3에서 그대로 계승. 재정의 0. judged−saved 갭의 J3 정상 종료 해석도 동 문서 §3 계승 |
| `prelaunch-monetization-boundary-brief.md` (m28) | 없음 | `deed_save_capped`를 friction/availability로 보고 monetization intent 환산을 금지하는 §4를 그대로 계승. 새 판독 규칙 0 |
| `traffic-source-reading-boundary-table.md` (m25) | 없음 | synthetic/mock/self-test 제외 원칙을 §4에서 계승. 새 트래픽 규칙 0 |
| `retention-predictive-activation-brief.md` (m22) | 없음 | retention proxy를 second value·반복 저장과 함께 본다는 원칙이 동 문서 depth signal과 정렬. 정의 변경 0 |
| `copy-spec.md` (금지어) | 없음 | 사용자 노출 카피 0건. 금지어 명단(훌륭한/본받을/모범적인/귀감/인성/미덕/선행/베풂/봉사정신/마음이 따뜻한/좋은 사람/멋진 인격)은 본 문서 어디서도 사용자 카피로 쓰지 않음 |

## Out of scope

본 Intent(marketing-29)로 수행하지 않으며, 각각 별도 Intent에서 결정한다.

- 코드·카피·런타임 변경 **0건** — `src/`·`public/` 어느 것도 본 Intent로 변경하지 않는다. `docs/` 한 파일만 추가.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·대시보드·세션리플레이 생성 0.
- 외부 메시징 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고 없음.
- 배포·CI·프로덕션·시크릿·권한·비용·개인정보 변경 **0건**.
- proxy 수치 기반 의사결정 — 후속 관찰·인터뷰로 quality 조건을 보강하기 전에는 결론 0(출처 노트 후속 #2 인터뷰 메모는 별도 Intent).

본 문서 작성이 위 경계를 지켰음을 검증하는 절차:

```bash
git diff --stat -- apps/web/src apps/ios/Sources   # 출력 없어야 함 (코드 변경 0)
git status --short                                  # docs 1파일 추가만
rg -n '^<{7}|^={7}|^>{7}' apps/web/docs/ai-outcome-proxy-dictionary.md   # 충돌 마커 0
```

---

## 검증 매핑

| 성공 기준 (marketing-29) | 충족 섹션 |
|---|---|
| proxy type 5종 정의 (activity/acceptance/curiosity/friction/retention) | §1 (사전 표) |
| 이벤트 × proxy type × quality condition × misread warning | §2 (심장 표 1) |
| J1-J4 × 이벤트 × proxy 판독 × quality condition × misread warning | §3 (심장 표 2) + §4 |
| first-value 매핑 유지 (J1/J2/J4=`deed_saved`, J3=`deed_judged`) | §0, §3, §6 |
| prelaunch decision-grade 금지선 | §5 |
| 선행 문서 충돌 0 | §6 (no-conflict) |
| 신규 이벤트·코드·카피·계측 0 | §0 전제2, Out of scope |
