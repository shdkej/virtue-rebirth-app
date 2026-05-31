---
작성일: 2026-05-31
Intent: marketing-30
Mode: 내부 기획 L1
Status: draft
Owner: Marketer (Planner / Developer / Operator 관점 포함)
---

# Virtue 첫 결과 공유성 판독 기준

## §0 목적 + 전제

### 목적

정식 출시 전, 첫 10~20명 관찰에서 `/add` 결과 카드의 **첫 결과가 "공유하거나 누군가에게 보여 주고 싶을 만큼 강했는가"** 를 신규 계측 없이 사람이 손으로 판독하기 위한 내부 기준이다. 출처 노트(ProductLed, "AI Onboarding: How To Activate Users In Under 60 Seconds")는 좋은 AI 온보딩의 신호를 ① 60초 내 가치, ② 낮은 입력 부담 대비 강한 결과, ③ **공유하거나 추천하고 싶을 만큼의 첫 경험** 세 가지로 본다. 앞선 문서들이 ①·②는 이미 다뤘으므로(`first-60-second-value-observation-script.md`, `add-input-output-balance-audit.md`), 이 문서는 **③ 공유성(shareworthiness)** 만 잡(J1~J4)별로 못박는다.

핵심 질문은 "AI 온보딩을 새로 붙일지"가 아니다. Virtue는 이미 `/add`에서 사진+선택 메모를 받아 AI 판정 결과를 만든다. 더 중요한 질문은 **첫 판정 결과가 사용자의 말을 빌려 설명될 만큼 강한가, 그리고 사용자가 그 결과를 누군가에게 보여 주고 싶어 했는가**이다. prelaunch에서는 이 질문을 수치화하지 않고, 관찰 기록에 붙일 정성 판독 기준으로만 둔다.

본 문서가 만드는 것은 한 장이다.

- **공유성(shareworthiness)** 을 first value·acceptance와 구분되는 별도 판독 축으로 정의한다(§1).
- 공유성으로 읽을 수 있는 **행동 증거(behavior evidence) B1~B6** 사전과, 그중 무엇이 기존 이벤트에 잡히고 무엇이 off-instrument(손기록 전용)인지 고정한다(§2).
- **J1~J4 × first value × 공유성 관찰 순간 × 행동 증거 × 저장 후 누적 payoff 분리 × 기존 이벤트 매핑 × misread** 를 한 표로 고정한다(§3).
- `/add` 결과 카드가 Inform/Guide/Execute 중 어디에 머무는지 코드 변경 없이 감사한다(§4).
- prelaunch 금지선을 명시한다(§5).

### 선행 문서 계승 (재정의 금지)

본 문서는 새 first-value 정의를 만들지 않는다. 아래 매핑을 **그대로 인용**하고, 그 위에 "공유성 판독 축"만 덧댄다. 정의를 바꾸면 충돌이다(§6 점검).

| 잡 | first value (기존 이벤트, 재정의 0) | 출처(소유 문서) |
|---|---|---|
| J1 기록형 | 첫 `deed_saved` (즉시 만족) | `first-session-jtbd-matrix.md` |
| J2 누적형 | 첫 `deed_saved` (누적감) + 보조 `level_up_viewed` | `first-session-jtbd-matrix.md` |
| J3 AI 호기심형 | 첫 `deed_judged` (저장 전·저장 없이 닫힘이 정상 경로) | `first-session-jtbd-matrix.md` |
| J4 회고형 | 첫 `deed_saved` (지연 가치) | `first-session-jtbd-matrix.md` |

> 같은 `deed_saved`라도 J1 즉시 / J2 누적 / J4 지연으로 가치 방향이 다르고, J3만 `deed_judged`가 first value다. 본 문서는 이 매핑을 **한 글자도 바꾸지 않으며**, 그 위에 공유성 판독만 얹는다.

### 전제 (못박기)

1. **공유성은 first value가 아니다.** 공유성은 사용자가 첫 결과에 반응해 그것을 다시 말하거나 보여 주고 싶어 했는가를 본다. first value(가치 도달)도 acceptance(저장 선택)도 아닌 **별도의 공명/추천(resonance/advocacy) 판독 축**이다. 저장 없이도 공유성이 있을 수 있고(J3 재전달), 저장했어도 공유성이 없을 수 있다.
2. **분류이지 처분이 아니다.** 공유성 판독은 첫 결과를 어떻게 읽을지 가르는 렌즈일 뿐, 합격/실패 판정문도 KPI도 아니다.
3. **신규 0.** 신규 이벤트·속성·코드·카피·계측·대시보드·세션리플레이·플래그를 단 하나도 만들지 않는다. 이미 발화 중인 6개 이벤트(`add_flow_started`, `deed_judged`, `deed_saved`, `level_up_viewed`, `deed_rerolled`, `deed_save_capped`)만 인용한다.
4. **공유성 증거의 대부분은 off-instrument다.** 웃음·놀람·반박·"이것 봐"는 코드 이벤트로 잡히지 않는다. 따라서 공유성은 저장수·재판정수로 대체(proxy)하지 않고 **사람이 손으로 본 행동**으로만 기록한다(§2).
5. **작은 표본은 정성.** prelaunch에서 공유성은 비율·전환율·합격선이 아니라 관찰 기준이다(§5). synthetic/mock/self-test 신호는 공유성 증거에 섞지 않는다.

## §1 공유성(shareworthiness)이란 무엇인가

출처 노트의 "공유하거나 추천하고 싶은 첫 경험"을 Virtue 언어로 좁힌다. 공유성은 **첫 결과를 받은 직후, 사용자가 그 결과를 자기 밖으로 내보내고 싶어 하는 정도**다. 세 층을 분리해서 본다.

| 판독 층 | 무엇을 보는가 | 대응 proxy(앞 문서 계승) | 기존 이벤트 단서 |
|---|---|---|---|
| (a) 가치 도달 | 잡별 first value에 닿았는가 | acceptance(J1/J2/J4) · curiosity(J3) | `deed_saved` / `deed_judged` |
| (b) **공유성** | 첫 결과를 다시 말하거나 보여 주고 싶어 했는가 | **resonance/advocacy (본 문서 신규 판독 축)** | 대부분 off-instrument, 부분만 `deed_rerolled` |
| (c) 저장 후 누적 payoff | 저장 뒤 누적·진화 의미가 이어졌는가 | retention | `level_up_viewed` + 반복 `deed_saved` |

> **핵심 구분:** (b) 공유성은 (a) 가치 도달과 (c) 누적 payoff 사이에 있는 **별개의 즉시 반응**이다. (a)는 "받아들였는가", (b)는 "남에게 내보이고 싶은가", (c)는 "다시 돌아올 만큼 쌓였는가"를 본다. 셋을 한 칸으로 뭉치면, 저장 1회를 공유성으로 또는 공유성을 리텐션으로 잘못 승격한다.

공유성이 first value보다 강하게 또는 약하게 나타날 수 있는 예:

- **저장 없이 공유성 있음 (J3 전형):** 사용자가 `deed_judged` 결과를 읽고 웃거나 놀라 옆 사람에게 화면을 보여 준 뒤 저장하지 않고 닫는다. J3에선 이게 정상 경로이며, 공유성은 높고 acceptance(저장)는 발생하지 않았다.
- **저장 있으나 공유성 없음 (J1 전형):** 사용자가 묵묵히 한 컷 남기고 저장한다. first value(기록)는 닿았으나 결과 카드를 다시 보거나 보여 주려 하지 않았다 — 공유성은 낮고 그래도 J1은 충족된다.

이 두 예가 보여 주듯 **공유성은 first value 충족 여부와 독립적으로 기록해야 한다.**

## §2 행동 증거 사전 (behavior evidence B1~B6)

출처 노트가 제시한 "웃음/놀람/반박/재시도/타인에게 보여 주려는 행동"을 관찰 가능한 6종 행동 증거로 고정한다. 각 증거가 **기존 이벤트에 잡히는지(on-instrument)** 또는 **사람만 볼 수 있는지(off-instrument)** 를 명시한다.

| 코드 | 행동 증거 (관찰되는 모습) | 잡히는 곳 | 공유성 신호 강도(prelaunch 정성) |
|---|---|---|---|
| **B1 웃음/감탄** | 결과 카드를 읽고 웃거나 "오"·"헐" 같은 감탄을 냄 | **off-instrument** (이벤트 없음) | 강. 즉시 정서 반응 = 결과가 닿았다는 단서 |
| **B2 놀람/의외성** | 점수·코멘트가 예상과 달라 멈칫하거나 다시 읽음 | **off-instrument** | 중~강. 단 부정적 놀람(불쾌)과 구분 필요 |
| **B3 반박/되물음** | "이게 왜 이 점수야?"처럼 결과에 말로 반응 | **off-instrument** (반박 후 재판정 시 B4와 짝) | 중. 관여 신호일 수도, 불신일 수도 — 맥락 분리 |
| **B4 다르게 보기 재시도** | 같은 입력을 한 번 더 판정해 다른 결과를 봄 | **on-instrument** `deed_rerolled`(:149, 최대 `MAX_REROLLS`) | 중. 1회=탐색/공유 직전, 반복=불신 가능(부호 미정) |
| **B5 타인에게 보여 주기** | 화면을 옆 사람에게 돌려 보여 주거나 캡처/낭독 | **off-instrument** (스크린샷·구두 전달은 미계측) | 강. 출처 노트의 "공유하고 싶은 경험"에 가장 직접 대응 |
| **B6 재전달/재구성** | 결과 문장을 자기 말로 다시 옮겨 말함("AI가 나보고 ~래") | **off-instrument** | 강. 결과가 사용자의 말로 설명될 만큼 강했다는 단서 |

> **운영 원칙(§0 전제4 재확인):** B1·B2·B3·B5·B6은 **off-instrument**다. 공유성의 핵심 증거 대부분이 코드 이벤트 밖에 있으므로, 공유성은 손기록으로만 남기고 `deed_saved`·`deed_rerolled` 횟수로 대체하지 않는다. 유일하게 부분적으로 잡히는 `deed_rerolled`(B4)도 1회 탐색과 반복 불신을 코드만으로 구분할 수 없어, 관찰자가 옆에서 본 B1~B3·B5~B6과 함께 읽을 때만 공유성 신호가 된다.

## §3 J1~J4 공유성 판독표 (심장 표)

행은 네 잡. first value는 §0에서 계승하며 재정의하지 않는다. 각 잡에서 **공유성이 보일 때의 관찰 순간**, 그때 기대되는 **행동 증거(B1~B6)**, **저장 후 누적 payoff와의 분리**, **기존 이벤트 매핑**, **misread**를 한 행에 고정한다.

| 잡 | first value (계승) | 공유성 관찰 순간 (어디서 보는가) | 기대 행동 증거 | 저장 후 누적 payoff 분리 | 기존 이벤트 매핑 | misread (이렇게 읽으면 틀림) |
|---|---|---|---|---|---|---|
| **J1 기록형** | 첫 `deed_saved` (acceptance) | 결과 카드를 본 직후 (저장 전). "오늘 한 컷"이 보여 줄 만한 결과였는가 | B1 웃음, B5 보여 주기 | 누적 payoff 거의 없음 — J1은 단발 기록이라 공유성은 첫 결과 카드 한 장에 거의 전부 실림 | 공유성 관찰=`deed_judged`(:106) 직후 시점, 가치 도달=`deed_saved`(:183) | 저장했으니 공유성 있다고 읽기. J1은 묵묵한 저장(공유성 0)도 정상. 저장수=공유성 환산 금지 |
| **J2 누적형** | 첫 `deed_saved` (acceptance) + 보조 `level_up_viewed` (retention) | ① 첫 결과 카드 직후, ② 누적/진화 신호(`level_up_viewed`)를 본 순간 — 두 공유성 순간이 분리됨 | B1, B5, (진화 시) B6 재전달 | **반드시 분리.** 첫 결과 공유성과 누적 payoff 공유성("레벨업했어")은 다른 순간이다. 누적 공유성은 며칠 뒤 재방문과 함께만 의미 | 첫 결과=`deed_judged`/`deed_saved`, 누적=`level_up_viewed`(:199) | 첫 결과 공유성과 누적 payoff 공유성을 한 칸으로 뭉치기. 단발 `level_up_viewed` 1회를 누적 공유성 확보로 읽기 |
| **J3 AI 호기심형** | 첫 `deed_judged` (저장 전·저장 없이 닫힘 정상) | **결과 카드(=first value) 그 자체.** 채점을 읽고 반응하는 순간이 공유성 관찰의 본체 | B1 웃음, B2 놀람, B3 반박, B5 보여 주기, B6 재전달 — 가장 풍부 | 저장이 first value가 아니므로 누적 payoff 분리 불필요. 공유성은 `deed_saved` 없이 닫혀도 성립 | 공유성·가치 도달 모두 `deed_judged`(:106). 보조 `deed_rerolled`(:149) | **저장 안 했으니 공유성/가치 없다고 읽기(가장 흔한 오독).** J3은 저장 없이 보여 주고 닫는 게 정상. judged−saved 갭을 이탈로 읽기 금지 |
| **J4 회고형** | 첫 `deed_saved` (지연 가치) | 첫 항목을 저장하며 "나중에 돌아볼 게 생겼다"고 느끼는 순간. 공유성은 즉시보다 약하게, 지연되어 나타남 | B6 재전달("기록해 뒀어"), 약한 B5 | 진짜 회고 가치(따라서 회고 공유성)는 첫 세션 밖이다. 첫 세션에선 첫 항목 저장까지만 인정 | 첫 항목=`deed_saved`(:183), 재방문은 본 문서 범위 밖 | 첫 세션 저장 1회로 회고 공유성·습관을 단정하기. AI 채점 대기를 J4 가치로 읽기(J1과 동일, 마찰임) |

> **공통(잡 교차) 원칙:** 공유성은 어느 잡에서도 first value를 대체하지 않는다. J3에선 공유성 관찰 순간과 first value가 같은 `deed_judged`에서 겹치고, J1/J2/J4에선 공유성(결과 카드 직후)과 first value(저장) 시점이 어긋난다. 이 어긋남 때문에 **첫 결과 공유성은 항상 저장 전 시점에서 따로 기록**해야 한다.

## §4 Inform / Guide / Execute 위치 감사 (코드 변경 0)

출처 노트의 AI 온보딩 성숙도 4단계(Inform → Guide → Execute → Orchestrate) 중, `/add` 결과 카드가 현재 어디에 머무는지 **코드 변경 없이** 감사한다. 공유성은 Execute 단계에서 가장 크게 나타난다는 출처 가설을 Virtue 증거로 대조한다.

| 단계 | 정의 (출처) | Virtue `/add` 현재 증거 | 판정 |
|---|---|---|---|
| Inform | 무엇을 할 수 있는지 설명만 | 결과 카드는 설명에 머물지 않음 | 넘어섬 |
| Guide | 다음 단계를 안내 | 입력(사진+선택 메모)을 받아 판정으로 유도 | 부분 충족 |
| **Execute** | 사용자가 원하는 결과를 **AI가 직접 만들어 줌** | `deed_judged`(:106)에서 점수·코멘트 결과 카드를 **실제로 생성**해 제시 → 이미 Execute에 도달한 증거 | **도달(기존 증거 있음)** |
| Orchestrate | 행동·맥락 기반 자동 적응·연결 | 자동 nudging·외부 연동·맥락 자동화는 부재 | 미도달(현 단계 과함) |

- **충분한 증거(Execute 도달):** `/add`는 이미 입력을 받아 AI가 첫 아티팩트(판정 결과 카드)를 만들어 준다. blank-state paralysis를 줄이는 실행형 온보딩의 형태를 코드 변경 없이 갖추고 있다.
- **부족한 증거(공유성 강도):** Execute에 도달했다고 결과가 자동으로 shareworthy인 것은 아니다. **결과 카드가 B1~B6을 실제로 끌어냈는지**는 §2~§3 손기록으로만 확인되며, 현재 그 기록 양식이 없다는 점이 이 문서가 채우는 공백이다.
- **하지 않는 것:** Orchestrate(자동 nudging·외부 메시징·추가 추적)는 현 단계에서 과하다. 데이터·승인 없이 실행하지 않는다(§5).

## §5 prelaunch decision-grade 금지선 (forbidden boundaries)

> Virtue는 prelaunch/low-signal이라 어떤 공유성 관찰도 decision-grade가 아니다. 아래는 본 기준을 근거로 **하지 않는다**.

| 금지 항목 | 사유 |
|---|---|
| 공유성을 전환율·activation rate·retention%·PMF·벤치마크로 산출 | 작은/synthetic 표본은 비율이 아니라 정성 관찰 대상 |
| 한 명의 공유성 행동(B1~B6)으로 positioning·conversion·retention 단정 | 1명 신호는 가설 보강일 뿐 결론이 아니다(`first-user-message-confusion-log.md` 계승) |
| 저장수·재판정수를 공유성으로 환산 | 공유성 증거 대부분은 off-instrument(§2). 활동량 ≠ 공유성 |
| `deed_save_capped`(:167)를 공유성·upgrade 신호로 사용 | 30덕 상한 early-return = availability/friction 신호이지 가치·공유 욕구의 증명이 아님(`prelaunch-monetization-boundary-brief.md` §4 계승) |
| J3 judged−saved 갭을 공유성/가치 부재로 읽기 | J3은 저장 없이 보여 주고 닫는 게 정상 종료(`first-session-jtbd-matrix.md` §3 계승) |
| synthetic/mock/self-test 행동을 공유성 증거에 혼입 | 트래픽 출처 분류가 판독에 선행(`traffic-source-reading-boundary-table.md` 계승) |
| 신규 이벤트·속성·코드·계측·대시보드·세션리플레이·플래그 생성 | 본 문서는 기존 6개 이벤트 인용에 한정. 신규 0(§0 전제3) |
| 공개 카피·결제·paywall·배포·CI·외부 메시징·비용·시크릿·권한·개인정보 변경 | 본 Intent 산출물은 docs 1파일뿐(approval-needed → Waiting) |

## §6 충돌 점검 (no-conflict) + 계승/변경/충돌/승격 분리

본 Intent는 무엇을 계승하고, 무엇을 새로 더하며, 어디서 기존과 충돌할 수 있고, 무엇이 원장 승격 후보인지를 분리한다.

### 계승한 가정 (inherited assumptions)

- first value 매핑 J1/J2/J4=`deed_saved`, J3=`deed_judged` — 재정의 0 (`first-session-jtbd-matrix.md`).
- `deed_save_capped`는 availability/friction 신호이며 upgrade demand 아님 (`prelaunch-monetization-boundary-brief.md`, MARKETING_LEARNINGS "Availability And Friction Are Not Value").
- 활동량 ≠ 사용자 인정 가치, proxy 분리 (`ai-outcome-proxy-dictionary.md`, "AI Outcome Proxy Separation").
- prelaunch 작은/synthetic 표본은 비율·PMF·벤치마크가 아니라 정성 관찰 (`first-real-user-baseline-template.md`, "Prelaunch Decision Boundary" · "Traffic Source Before Metrics").
- J3 judged−saved 갭은 J3 정상 종료, 이탈 아님.

### 이번에 새로 더한 가정 (changed/added assumptions)

- **공유성(shareworthiness)을 first value·acceptance와 구분되는 별도 판독 축(resonance/advocacy)으로 정의했다.** 저장 없이 공유성 있음(J3), 저장 있으나 공유성 없음(J1)이 모두 가능하다(§1).
- **공유성 행동 증거 6종 중 5종(B1·B2·B3·B5·B6)이 off-instrument다.** 따라서 공유성은 저장수·재판정수로 proxy하지 않고 손기록 전용이다(§2). 이는 기존 매핑을 바꾸지 않고, 그 위에 "공유성은 이벤트 밖"이라는 새 경계를 더한 것이다.
- J1/J2/J4의 첫 결과 공유성과 저장 후 누적 payoff 공유성을 분리해 읽는다(§3).

### 선행 산출물과의 충돌 (conflicts)

| 대상 문서 | 충돌 여부 | 근거 |
|---|---|---|
| `first-session-jtbd-matrix.md` (m06) | 없음 | first value 매핑·J3 정상 종료 해석을 §0·§3에서 그대로 계승. 재정의 0 |
| `ai-outcome-proxy-dictionary.md` (m29) | 없음 | proxy 5종(activity/acceptance/curiosity/friction/retention)에 공유성을 "resonance/advocacy"로 **추가 축**으로 얹음. 기존 proxy 정의 변경 0. curiosity(`deed_judged`)와 공유성은 인접하나, 공유성은 off-instrument 행동까지 포함하는 더 넓은 즉시 반응으로 명시 분리 |
| `add-input-output-balance-audit.md` (m21) | 없음 | output strength 정점이 결과 카드(`deed_judged`)라는 발견과 정렬. 본 문서는 그 강한 결과가 공유성으로 이어졌는지를 손기록으로 확인하는 보완 |
| `first-60-second-value-observation-script.md` (m20) | 없음 | 60초 가치(①)는 동 문서가 소유, 본 문서는 공유성(③)만 담당. 관찰 셋업 원칙(은밀녹화·신규리플레이 금지) 계승 |
| `prelaunch-monetization-boundary-brief.md` (m28) | 없음 | `deed_save_capped` friction 해석·monetization 환산 금지 §5에서 계승 |
| `copy-spec.md` (금지어) | 없음 | 사용자 노출 카피 0건. 금지어 명단을 본 문서 어디서도 사용자 카피로 쓰지 않음 |

### 원장 승격 후보 (reusable learning candidates)

다음은 `MARKETING_LEARNINGS.md` 승격 후보다. 단일 사례·synthetic 신호가 아니라 AI 온보딩 출처 + 기존 매핑에서 도출된 **재사용 가능한 판독 원칙**이다.

1. **공유성은 first value의 별도 축이다.** "첫 결과"를 읽을 때 (a) 가치 도달 (b) 공유성(공명/추천) (c) 저장 후 누적 payoff 세 층을 분리한다. 저장 유무와 공유성은 독립이다.
2. **공유성 증거 대부분은 off-instrument다.** 웃음·놀람·반박·보여 주기·재전달은 이벤트 밖이다. 저장수·재판정수를 공유성으로 환산하지 않고 손기록한다.

## Out of scope

본 Intent(marketing-30)로 수행하지 않으며, 각각 별도 Intent에서 결정한다.

- 코드·카피·런타임 변경 **0건** — `src/`·`public/` 어느 것도 본 Intent로 변경하지 않는다. `docs/` 한 파일만 추가.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·대시보드·세션리플레이 생성 0.
- 외부 메시징 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고 없음.
- 배포·CI·프로덕션·시크릿·권한·비용·개인정보 변경 **0건**.
- 공유성 기반 의사결정 — 후속 관찰로 행동 증거를 보강하기 전에는 결론 0.

본 문서 작성이 위 경계를 지켰음을 검증하는 절차:

```bash
git diff --stat -- apps/web/src apps/ios/Sources   # 출력 없어야 함 (코드 변경 0)
git status --short                                  # docs 1파일 추가만
rg -n '^<{7}|^={7}|^>{7}' apps/web/docs/shareworthy-first-result-observation-criteria.md   # 충돌 마커 0
```

---

## 검증 매핑

| 성공 기준 (marketing-30) | 충족 섹션 |
|---|---|
| J1~J4 shareworthy first-result 관찰 기준 | §3 (심장 표) |
| 행동 증거 (behavior evidence) | §2 (B1~B6 사전) |
| prelaunch 금지선 | §5 |
| 기존 이벤트 매핑 | §2·§3 (앵커 72/106/149/167/183/199) |
| first-value 매핑 유지 (J1/J2/J4=`deed_saved`, J3=`deed_judged`) | §0, §3, §6 |
| 계승/변경/충돌/승격 분리 | §6 |
| 신규 이벤트·코드·카피·계측 0 | §0 전제3, Out of scope |
