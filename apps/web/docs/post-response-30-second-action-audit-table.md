---
작성일: 2026-06-07
Intent: marketing-44
Mode: 내부 기획 L1 (+ L2 agent-approved push)
Status: complete
Owner: Marketer (Planner / Developer / Operator 관점 종합)
---

# Virtue 결과 카드 직후 30초 행동 감사표 (Post-Response 30-Second Action Audit Table)

## §0 목적 + 전제

### 목적

Mixpanel류 2026 AI/product analytics 렌즈는 **post-response user flow**(AI 응답 직후 사용자가 무엇을 하는가)를 응답 유용성의 핵심 행동 신호로 본다 — 좋은 답을 얻은 사용자는 대체로 다음 행동으로 이어지고, 부족한 답을 얻은 사용자는 재프롬프트·이탈·대체 검색으로 흐른다. AI 제품 품질은 pageview·클릭 수·세션 길이만으로 읽기 어렵고, **응답 직후 행동**이 더 직접적인 증거다.

Virtue의 AI 판정 **결과 카드**(`deed_judged`:106 발화 시점)는 첫 가치가 생기거나 사라지는 분기점이다. `deed_judged`가 발생했다는 사실만으로는 사용자가 결과를 이해했는지, 근거를 받아들였는지, 저장·재시도·종료 중 무엇이 자연스러운 다음 행동인지 알 수 없다. 특히 J3는 저장 없이 종료해도 정상이고, J1/J2/J4는 저장 뒤 홈의 누적 payoff로 이어지지 못하면 첫 응답 이후 흐름이 끊긴다.

본 문서는 **결과 카드 "직후 30초"를 세션 전체와 분리된 별도 판독 단위로 고정**한다. 잡(J1~J4)별로 결과 직후 행동을 **활성화(activation) / 정상(normal) / 보류(hold) / 마찰(friction)** 네 칸으로 읽고, 그 행동을 기존 이벤트 앵커에 매핑하며, **보내면 안 되는 조건(do-not-send)** 과 **바꾸면 안 되는 조건(do-not-change)** 을 함께 못박는다. 검증을 "결과 카드 수 세기"가 아니라 "결과 직후 행동 흐름 분류"로 바꾼다.

본 문서는 post-response 흐름을 *채점하거나 점수화하지 않는다.* prelaunch라 어떤 결과 직후 행동도 "이게 좋다/N점이다"로 못박지 않는다. 출시 후 첫 10명 또는 첫 7일 단계에서 **결과 직후 30초를 어떻게 읽고(활성화/정상/보류/마찰), 무엇을 가치로 읽으면 안 되며(오독 금지선), 무엇을 보내거나 바꾸면 안 되는가** 의 경계만 고정한다.

> **출처노트:** `source/external-links/marketing/2026-06-07-ai-post-response-flow.md` (로컬 존재 확인). Mixpanel "30+ AI product metrics" / "2026 AI benchmarks", Userpilot "User Onboarding Metrics in 2026" 요지를 prelaunch 관찰 질문으로만 번역한다. **외부 벤치마크 수치(post-response 전환율·세션 길이·D7 N%)는 Virtue에 임계값으로 이식하지 않는다.**

### "30초"의 의미 (못박기 — 신규 계측 아님)

- **"30초"는 수기 관찰 프레임이지 계측된 시간이 아니다.** 결과 카드(`deed_judged`:106)가 뜬 순간을 T0로 두고, 그 직후의 *첫 행동*을 사례 단위로 손기록하기 위한 관찰 창일 뿐이다.
- **타이머 이벤트·duration 속성·세션리플레이를 만들지 않는다.** window 내 on-instrument 신호는 이미 발화 중인 `deed_saved`:183 / `deed_rerolled`:149 / `deed_save_capped`:167 / (행동 없음=종료)뿐이고, 나머지(근거 읽기·비교·보여 주기·망설임)는 모두 off-instrument → 손기록 전용이다.
- "30초"는 정밀 임계값이 아니라 "결과 직후 한 호흡"을 가리키는 라벨이다. 25초/40초를 합격/불합격으로 가르지 않는다.

### 전제 (못박기)

1. **판독 경계이지 행동 채점이 아니다.** prelaunch이므로 post-response 품질 점수·임계값·전환율·activation rate를 산출하지 않는다(§4·§7 금지선).
2. **신규 0.** 신규 이벤트·속성·코드·카피·대시보드·플래그·세션리플레이·tracking/privacy·타이머를 단 하나도 만들지 않는다. 이미 발화 중인 기존 이벤트만 인용한다(§9 사실 확인).
3. **재정의 0.** first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`), 잡 정의, 막힘 4분류(B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL), `deed_save_capped`=availability/friction은 선행 문서가 소유한다. 본 문서는 그 위에 "결과 직후 30초 행동 판독" 층만 더한다(§8 충돌 점검).
4. **승인 전 Waiting.** post-response 품질 점수·임계값·전환율·PQL·가격 해석·신규 tracking·대시보드·공개 카피·발송은 본 Intent로 결정·구현하지 않으며 사용자 승인 전까지 Waiting 대상이다(§5·§7).

## §1 결과 직후 30초 ≠ 세션 전체 — 왜 별도 판독 단위인가 (핵심 원칙 5가지)

세션당 가치는 [[value-per-session-reading-table]](m42)가 이미 잡별 first value로 읽는다. 본 문서는 그 안에서 **결과 카드라는 한 분기점 직후의 행동 흐름**만 떼어 본다. 다음 5원칙이 토대다.

1. **결과 카드는 잡별로 부호가 다른 분기점이다.** J3에선 카드 자체가 first value(도착점)이고, J1/J2/J4에선 카드가 아직 가치가 아닌 **통과점**(저장 전)이다. 따라서 "결과 직후 행동"의 의미가 잡마다 뒤집힌다.
2. **`deed_judged` 발화 ≠ 가치 전달.** 카드가 떴다는 사실은 판정 결과가 생성됐다는 뜻일 뿐, 사용자가 이해·수용했는지는 직후 행동으로만 드러난다(activity ≠ acceptance, [[ai-outcome-proxy-dictionary]] m29 계승).
3. **결과 직후 행동의 대부분은 off-instrument다.** 근거 읽기·비교·보여 주기·망설임·다르게 보기는 화면 안에서 일어나며 저장수·reroll 수로 환산되지 않는다. on-instrument는 save/reroll/cap/종료 네 가지뿐이다. 행동 증거는 손기록이 우선이다([[shareworthy-first-result-observation-criteria]] m30 계승).
4. **무행동(종료)도 한 종류가 아니다.** 결과 직후 아무 이벤트 없이 닫힘은 J3에선 정상 종료(가치 얻고 닫음), J1/J2/J4에선 저장 전 보류다. drop ≠ end는 결과 직후 창에서도 그대로 적용된다([[product-body-vs-bumper-boundary-table]] m31 막힘 4분류).
5. **결과 직후 분류는 결론이 아니라 대조 후보다.** 결과 직후 행동을 활성화/정상/보류/마찰로 *읽는* 것은 출시 후 retention·반복 가치와 *대조할 후보*를 만드는 일이지, "이 응답이 좋다/나쁘다"는 확정이 아니다. 대조 방법은 m37, PQL 결론은 m41에 위임한다.

## §2 first value 매핑 계승 + 결과 카드의 잡별 역할 (재정의 0 — 판독 기준점)

결과 직후를 읽으려면 먼저 "이 잡에서 결과 카드가 도착점인가 통과점인가"가 고정돼야 한다. 아래는 m06·m42를 한 글자도 바꾸지 않고 가져온 기준점이다.

| 잡 | first value (계승, 재정의 0) | 결과 카드(`deed_judged`:106)의 역할 | 결과 직후 기대 행동 |
|---|---|---|---|
| **J1** 기록형 | 첫 `deed_saved`:183 | **통과점** (저장 전, 가치 아직) | 저장(`deed_saved`) → 홈 복귀 |
| **J2** 누적형 | 첫 `deed_saved`:183 (총합↑) | **통과점** (누적의 단위는 저장) | 저장 → 누적/`level_up_viewed`:199 확인 |
| **J3** AI 호기심형 | 첫 `deed_judged`:106 (저장 전 닫힘 정상) | **본체/도착점** (카드 자체가 first value) | 근거 확인·비교·정상 종료·재시도(저장 불요) |
| **J4** 회고형 | 첫 `deed_saved`:183 (로그 첫 항목) | **통과점** (돌아볼 로그는 저장돼야) | 저장 → 로그 적립 확인 |

> **계승 핵심:** ① J1/J2/J4는 결과 카드가 통과점이라 **결과 직후에 `deed_saved`가 와야 활성화**다. ② J3는 결과 카드가 도착점이라 **카드 도달 자체가 활성화이고, 직후 저장 없이 닫힘은 정상**이다(judged−saved 갭=이탈 아님). ③ `deed_save_capped`:167은 저장(first value)이 *차단된* availability/friction 구간이다([[prelaunch-monetization-boundary-brief]] m28·원장 계승). ④ 결과 직후 판독은 이 매핑 위에서만 한다 — 저장 유무 한 신호를 네 잡에 똑같이 적용하지 않는다.

## §3 결과 카드 직후 30초 행동 감사표 (이 문서의 심장)

T0 = 결과 카드(`deed_judged`:106) 렌더 시점. 직후 첫 행동을 **네 칸**으로 읽는다.

- **활성화(activation):** 그 잡 기준 first value 행동이 (결과 직후 창 안에서) 일어났거나 이미 도달했다.
- **정상(normal):** first value 도달 후, 또는 이탈이 아닌 자연 종료. (J3의 저장 없는 종료가 대표 사례)
- **보류(hold):** 가치 전달 여부가 모호해 수기 관찰 전에는 활성화/이탈로 단정하지 않는다.
- **마찰(friction):** 가용성·한도·실패로 결과 직후 행동이 *차단된* 구간. 가치 부재가 아니라 차단이다.

모든 셀은 가설이며 기존 이벤트·화면에만 근거한다. "행동 수"가 아니라 "어떤 행동이, 어느 잡에서, 결과 직후에"를 본다.

### §3.1 결과 직후 행동 → 잡별 판독

| 결과 직후 첫 행동 (T0 이후, 기존 이벤트만) | J1 기록형 | J2 누적형 | J3 AI 호기심형 | J4 회고형 |
|---|---|---|---|---|
| 저장 — `deed_saved`:183 발화 | **활성화** (first value 도달) | **활성화** (총합↑·본체) | **정상+** (이미 카드서 가치, 저장은 덤) | **활성화** (로그 적립) |
| 저장 후 홈 복귀(누적 payoff 확인)·`level_up_viewed`:199 | **정상** (다음 행동 안내됨) | **활성화/정상** (누적 본체 확인) | (해당 약함) | **정상** (로그 누적 확인) |
| 저장 없이 닫힘 (결과만 보고 종료) | **보류** (저장 전 이탈 후보 — B-LOST/B-MISMATCH/B-NORMAL 구분 필요) | **보류** (누적 시작 전 — 동일) | **정상** (판정서 first value 얻음, 저장 불요·정상 종료) | **보류** (로그 적립 전 — 동일) |
| 재시도 — `deed_rerolled`:149 (다르게 보기) | **보류** (다의: 불신·호기심·비교·제어감) | **보류** (동일) | **보류** (판정 재요청 호기심일 수 있음 — 불신 단정 금지) | **보류** (동일) |
| 저장 시도했으나 한도 — `deed_save_capped`:167 | **마찰** (30덕 상한 차단) | **마찰** (동일) | (저장 안 하는 잡이라 해당 약함) | **마찰** (동일) |
| 근거 읽기·비교·보여 주기·망설임 (off-instrument) | 보류(손기록) | 보류(손기록) | **정상/공유성 후보**(손기록 — 저장 전 별도 축) | 보류(손기록) |

> **읽기 핵심:** ① 같은 "결과만 보고 닫음"이 **J3엔 정상(성공), J1/J2/J4엔 보류**다(결과 카드가 도착점이냐 통과점이냐). ② J1/J2/J4의 "저장 없이 닫힘"은 곧장 이탈이 아니라 **보류**이고, 막힘 4분류(m31)로 라우팅 후에야 성격이 정해진다. ③ `deed_rerolled`는 결과 직후라도 다의적이라 **보류**(불신 단정 금지). ④ `deed_save_capped`는 가치 부재가 아니라 **차단(마찰)** 이다(§9 메커닉). ⑤ off-instrument 행동(근거 읽기·보여 주기)은 저장수·reroll 수로 환산하지 않고 손기록한다.

### §3.2 결과 직후 "종료"를 정상 vs 이탈로 가르는 기준 (drop ≠ end)

결과 카드 직후 닫혔다고 모두 이탈이 아니다. m31 막힘 4분류로 종료 성격을 먼저 가른다.

| 결과 직후 종료 모양 | 잡 맥락 | 분류 | 판독 |
|---|---|---|---|
| 카드 보고 저장 없이 닫힘 | **J3** | 정상 종료(B-NORMAL) | **정상** — 판정서 가치 얻음, 저장 불요 |
| 카드 보고 저장 없이 닫힘 | J1/J2/J4 | 보류 → B-LOST/B-MISMATCH/B-NORMAL 구분 | 보류(이탈 단정 금지) |
| `deed_save_capped`로 끊김 | 전 잡 | 가용성 차단(B-AVAIL) | **마찰** — 이탈 아님 |
| 카드 후 `deed_rerolled` 반복하다 닫힘 | 전 잡 | 다의적(불신·호기심·비교) | 보류 |
| 저장(first value) 후 닫힘 | J1/J2/J4 | 정상 종료 | **활성화/정상** |

> **drop ≠ end:** "결과만 보고 닫음·짧음"을 이탈로 환산하지 않는다. J3의 결과 직후 무저장 종료는 가장 흔한 **정상**, cap으로 끊긴 종료는 **마찰**, B-LOST는 **보류**다. 어느 것도 행동 수로 판정하지 않는다.

## §4 오독 금지선 (do-not-misread — 본 문서의 핵심 경계)

출시 후 작은 숫자에서 아래를 **결론으로 만들지 않는다**(원장 `Availability And Friction Are Not Value`·`AI Outcome Proxy Separation`·`Prelaunch Decision Boundary`·`Session Value Is Read By Job, Not Event Count` 및 m28·m29·m31·m41·m42 계승).

- **`deed_judged` 발화 = 가치 전달로 읽지 않는다(본 문서 1번 경계).** 카드 생성은 결과 직후 행동으로만 가치 전달을 확인한다.
- **결과 직후 저장 없음 = 실패로 단정하지 않는다.** J3는 저장 없이 닫힘이 정상(judged−saved 갭=이탈 아님). J1/J2/J4의 무저장은 보류이며 막힘 4분류 후에야 성격이 정해진다.
- **결과 직후 `deed_rerolled` = 불신/이탈로 단정하지 않는다.** 재판정 의도는 불신·호기심·비교·제어감 회복이 모두 가능(다의적)하므로 수기 관찰 전 처분하지 않는다.
- **`deed_save_capped` = 가치/upgrade demand가 아니다.** 30덕 상한 early return으로 `deed_saved`가 미발화하는 **availability/friction** 신호다(§9 메커닉). 가치 부재나 유료 수요로 환산하지 않는다.
- **결과 직후 행동 수↑ = 응답 품질↑로 읽지 않는다.** first value 없는 다행동(반복 reroll·재진입)은 길 잃음·다의적 탐색일 수 있다.
- **"30초"를 계측된 임계값으로 굳히지 않는다.** 수기 관찰 프레임이며 응답 속도/체류 시간 자동 집계를 의미하지 않는다.
- **결과 직후 분류를 비율·임계값·전환율로 환산하지 않는다.** "활성화 N / 보류 M"을 %·activation rate·유의성으로 읽지 않고 사람·사례 단위로 읽는다.
- **한 명의 결과 직후 행동을 제품 방향으로 확정하지 않는다.** 표본이 작을수록 한 명이 과대평가된다.
- **synthetic/mock/`임시 판정`·데모 시드·메이커 self-test를 사람 행동 흐름에 섞지 않는다.** 제외는 삭제가 아니라 표시 후 집계 제외다([[traffic-source-reading-boundary-table]] m25 계승).
- **외부 post-response 벤치마크를 합격선으로 베끼지 않는다.** 방향 참고일 뿐 임계값이 아니다.

## §5 보내면 안 되는 조건 + 바꾸면 안 되는 조건 (do-not-send / do-not-change)

본 문서가 명시적으로 못박는 두 경계. 결과 직후 행동을 *읽는* 것과, 그 읽기로 *무언가를 보내거나 바꾸는* 것은 별개다. 후자는 모두 본 Intent 범위 밖이다.

### §5.1 보내면 안 되는 조건 (do-not-send — 기본값 "보내지 않음")

결과 직후 행동을 근거로 in-app 넛지·푸시·이메일·발송을 **자동 발동하지 않는다.** 발송 기본값은 "아무것도 보내지 않음"이고, 모든 발송은 approval-needed다([[stuck-point-nudge-boundary-table]] m40 show-nothing·[[first-week-reactivation-boundary-table]] m43 do-not-send 계승).

| 결과 직후 상황 | 보내면 안 되는 것 | 이유 |
|---|---|---|
| J3 결과 보고 저장 없이 종료 | 저장 독촉·"마저 저장하세요" 넛지 | **정상 종료**다. 저장 강요는 J3 첫 가치 흐름을 방해 |
| 결과 직후 `deed_rerolled` 반복 | "결과가 마음에 안 드세요?" 류 개입 | 다의적(호기심·비교일 수 있음). 불신으로 단정한 개입 금지 |
| `deed_save_capped` 발화 | 업그레이드/유료 CTA | availability/friction이지 upgrade demand 아님(m28·원장) |
| J1/J2/J4 저장 전 종료 | 즉시 재방문 푸시·리마케팅 | 막힘 4분류 전이라 B-LOST 여부 미확정. 발송 대상 아님 |
| 결과 직후 어떤 행동이든 | 전환·공유·유료 넛지 끼워넣기 | first value 도달 직후 전환 넛지는 흐름 방해(원장 계승) |

- B-LOST(길 잃음)로 *수기 관찰로* 확인된 경우에 한해서만 입력/이해 보조가 **후보**가 되며, 그조차 자동 발동이 아니라 approval-needed다.
- 결과 직후 30초 신호를 retargeting·이메일·푸시·in-app 자동 트리거로 연결하지 않는다.

### §5.2 바꾸면 안 되는 조건 (do-not-change — 산출물은 docs 1파일)

결과 직후 행동을 근거로 코드·카피·이벤트를 **바꾸지 않는다.** 본 Intent 산출물은 이 문서 1개뿐이다.

- **코드/런타임 변경 0** — 결과 카드 UI·저장 흐름·`/add` 로직을 건드리지 않는다.
- **카피 변경 0** — 결과 카드 문구·버튼 라벨(`AI 채점`/`임시 판정`/`저장`)을 바꾸지 않는다. mock 모드 라벨 문제는 런타임 모드 정책이며 카피 변경 범위 밖(proposal-only).
- **이벤트/속성/타이머 변경 0** — post-response duration·체류 시간·"30초 경과" 이벤트를 만들지 않는다.
- **tracking/privacy·대시보드·세션리플레이·플래그 변경 0.**
- **결과 직후 행동 자동 집계·점수화·임계값 0.**

> 결과 직후 행동은 **관찰 대상**이지 자동 개입·변경의 근거가 아니다. 읽기 → (수기 관찰 누적) → (충분 표본·승인) → 변경/발송 검토 순서를 건너뛰지 않는다.

## §6 출시 후 첫 검증 게이트 (첫 10명 OR 첫 7일 — 행 단위로 채울 수 있는지만)

### 트리거 조건

| 항목 | 값 |
|---|---|
| 발동 조건 | **실제 사용자 10명 도달** OR **출시 후 7일 경과** — 둘 중 먼저 오는 쪽 (m33 §4·m42 §5 게이트와 정렬) |
| 표본 성격 | 소표본 / 통계적 유의성 없음 (post-response 품질 점수·전환율·activation rate 평가 불가) |
| 게이트 목적 | 결과 직후 행동을 §3 감사표(활성화/정상/보류/마찰)로 **행 단위로 채울 수 있는 상태인지** 확인 전용 |

### 게이트에서 하는 일 / 안 하는 일

| 한다 (✓) | 안 한다 (✗) |
|---|---|
| 들어온 결과 카드별 직후 행동을 잡 기준으로 활성화/정상/보류/마찰로 *사례 단위* 손기록 | 결과 직후 분류를 "응답 품질 점수"·"activation rate"로 환산 |
| J3 저장 없는 종료가 정상인지, J1 저장 전 보류인지 잡 맥락으로 구분 | 결과 직후 무저장을 일괄 이탈로 판정 |
| 반복 reroll·cap·B-LOST를 보류/마찰로 분리해 가치와 섞이지 않는지 확인 | 결과 직후 행동 수·체류 시간을 응답 품질로 환산 |
| 감사표와 어긋난 행동 모양(분류 불가·새 셀 필요)을 *감사표 갱신 후보*로 기록 | 사후에 새 점수 기준을 즉석 조립 |

> 원칙: 이 게이트는 **"결과 직후 30초를 감사표로 행 단위로 채울 수 있는가"** 만 본다. 어떤 결과 직후 행동이 retention과 상관되는지, post-response 품질 임계값이 얼마인지는 충분 표본·승인 후 별도 리뷰로 보류한다. retention 대조의 쿼리 모양·D7 우선은 **m37에 위임**, PQL/upgrade 후보 분류는 **m41에 위임**, 플랫폼 합산 전 web/iOS 분리는 **m15에 위임**한다. 첫 10명·첫 7일은 **행을 채워 보는 시점일 뿐, 결과 직후 품질을 확정하는 시점이 아니다.**

## §7 Waiting / approval-needed 경계

아래는 본 Intent로 결정·구현하지 않으며 **사용자 승인 전까지 Waiting** 대상이다.

- **post-response 품질 점수·임계값·등급화** — 소표본에서 임계값을 만들면 작은 숫자를 품질로 굳힌다. decision-grade 표본·승인 후로 보류.
- **activation rate·전환율·결과 직후→retention 상관 결론** — decision-grade 표본·대조(m37) 전에는 산출 금지.
- **PQL/upgrade demand 해석** — 결과 직후 분류는 m41 PQL 경계의 입력일 뿐, PQL 결론은 m41·승인 후로 위임.
- **가격 해석·플랜·paywall** — 결과 직후 행동을 유료 수요로 환산 금지(m28 §2·§4).
- **신규 tracking(이벤트·속성·플래그·duration/타이머)·post-response 자동 집계·PostHog 대시보드·cohort·세션리플레이** — 본 문서는 기존 이벤트 인용에 한정. 신규 0.
- **결과 직후 발송(in-app·푸시·이메일·retargeting)·실험·공개 카피·배포·CI·권한·시크릿·비용·개인정보 변경** — §5 do-not-send/do-not-change. 본 Intent 산출물은 docs 1파일뿐.

## §8 선행 문서 계승 / 충돌 점검 (no-conflict)

아래 "소유 문서"의 정의는 본 문서에서 한 글자도 바꾸지 않는다. 본 문서가 새로 하는 단 하나는 그 정의들 위에 **결과 카드 직후 30초 행동 감사표(활성화/정상/보류/마찰)** 를 얹는 것뿐이다.

| 정의 항목 | 소유 문서 (Single Source) | 본 문서의 취급 | 충돌 |
|---|---|---|---|
| J1~J4 잡 정의 + first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`) | `first-session-jtbd-matrix.md` (m06) | 그대로 계승·인용. 재정의 0 (§2) | 없음 |
| 세션당 가치 판독표(성공/정상/보류/마찰) | `value-per-session-reading-table.md` (m42) | 본 문서는 그 안의 *결과 직후 창*만 떼어 읽음. 재정의 0 | 없음 |
| 막힘 4분류(B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL) | `product-body-vs-bumper-boundary-table.md` (m31) | §3.2 종료 성격 라우팅에 인용. 재정의 0 | 없음 |
| 활동량≠인정 가치, reroll 다의성, `deed_save_capped`=availability | `ai-outcome-proxy-dictionary.md` (m29) | §1·§4에 계승. 재정의 0 | 없음 |
| 넛지는 event-triggered·기본값 show-nothing·B-LOST에만 후보 | `stuck-point-nudge-boundary-table.md` (m40) | §5.1 do-not-send 토대로 계승. 재정의 0 | 없음 |
| 미방문 do-not-send·발송 기본값 "보내지 않음"·approval-needed | `first-week-reactivation-boundary-table.md` (m43) | §5.1 발송 경계로 계승. 재정의 0 | 없음 |
| 첫 가치 이전 do-not-lock + `deed_save_capped`=availability | `prelaunch-monetization-boundary-brief.md` (m28) | §4·§5·§7 cap·가격 경계 계승. 재정의 0 | 없음 |
| 공유성은 별도 축(저장수로 환산 금지, 저장 전 시점) | `shareworthy-first-result-observation-criteria.md` (m30) | §3.1 off-instrument 행동을 공유성 후보로 분리. 재정의 0 | 없음 |
| 결과 직후→retention 대조 질문(D7 우선/D30 보류) + 제외 조건 | `activation-retention-correlation-readiness.md` (m37) | 대조 *방법*은 m37 위임. 본 문서는 분류만 | 없음 |
| PQL/upgrade 후보·비후보·Waiting 경계 | `post-launch-pql-upgrade-signal-boundary-table.md` (m41) | 결과 직후 분류는 PQL 경계의 *입력*. PQL 결론은 m41 위임 | 없음 |
| 사람/test/synthetic 트래픽 분리 선행 | `traffic-source-reading-boundary-table.md` (m25) | §4 제외 분류의 선행 원칙으로 계승 | 없음 |
| 사용자 노출 카피 금지어 | `copy-spec.md` | 사용자 노출 카피 0건. 인용한 `임시 판정`은 현재 코드 그대로의 단서 | 없음 |

## §9 기존 이벤트 증거 (발화 위치, read-only 사실 확인)

본 문서가 인용하는 모든 신호는 `apps/web/src/app/add/page.tsx`에 **이미 발화 중인 기존 이벤트**다. 신규 구현 0건. 아래 라인은 read-only 검증 결과이며 선행 문서(m33·m37·m41·m42)와 drift 0.

| 이벤트 | 발화 위치 | 발화 시점 | 본 문서에서의 역할 |
|---|---|---|---|
| `add_flow_started` | `add/page.tsx:72` | `/add` 마운트 시 1회(`useEffect([])`) | 진입(intent) — 결과 카드 이전, window 밖 |
| `add_flow_abandoned` | `add/page.tsx:78` | 입력 중 이탈 | 결과 카드 이전 이탈 — window 밖(참고만) |
| `deed_judged` | `add/page.tsx:106` | 채점 성공 직후, **저장과 독립·저장 전** 발화 | **T0 = 결과 카드 렌더 = window 시작점** · J3 first value |
| `deed_judge_attempted` | `add/page.tsx:135` | 채점 시도 | 시도 ≠ acceptance — window 밖(참고만) |
| `deed_rerolled` | `add/page.tsx:149` | "한 번 더" 클릭(최대 3회) | 결과 직후 재시도=보류(다의적)(§3·§4) |
| `deed_save_capped` | `add/page.tsx:167` | 30덕 상한 초과 시 발화 후 **저장 중단(early return)** | 결과 직후 저장 차단=마찰(§3·§4) |
| `deed_saved` | `add/page.tsx:183` | 저장 실행(`addDeed`) 후 발화 | 결과 직후 J1/J2/J4 활성화 신호(§2·§3) |
| `level_up_viewed` | `add/page.tsx:199` | `deed_saved` 직후 환생종 stage 상승 시에만 | 저장 후 J2 누적 확인 보조 — 1회를 가치로 승격 금지 |

> **`deed_save_capped` 메커닉(사실):** `add/page.tsx:167`에서 30덕 상한 초과 시 발화 후 **저장 중단(early return)** 하므로 `deed_saved`가 발화하지 않는다. 결과 직후 cap 행동은 저장(first value)이 *차단된* 구간이며, 신호 부재(저장 미발화)를 가치 부재로 읽지 않고 availability-blocked로 분류·보존한다(m37 X-CAP 계승).
>
> 보조 사실: `add_flow_started`·`add_flow_abandoned`·`deed_judge_attempted`는 결과 카드 *이전* 단계라 본 문서의 30초 window(T0=`deed_judged` 이후) 밖이다. 본 문서는 새 이벤트를 제안하지 않는다.

## §10 Out of scope (변경 0건) + 검증

본 Intent(marketing-44)로 수행하지 않으며, 각각 별도 Intent·단계에서 결정한다.

- 코드/카피/런타임 변경 **0건** — 산출물은 docs 1파일뿐이다.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·post-response duration/타이머·자동 집계·대시보드·cohort·세션리플레이·tracking/privacy 없음.
- **post-response 품질 점수·임계값·activation rate·전환율·PQL·가격 해석 산출 0건** — 본 문서는 결과 직후 분류 경계일 뿐 채점·결론이 아니다.
- 외부 발송·공개 모집 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고·업그레이드 CTA·in-app 자동 넛지 없음(§5.1).
- 배포·CI·권한·시크릿·비용·개인정보 변경 **0건**.
- 첫 10~20명 또는 synthetic/small sample을 **응답 품질·activation rate·리텐션율·전환율·PMF·세그먼트로 판정하는 일 0건**.
- 결과 직후→retention/conversion 실제 대조 실행(m37 위임·승인 후), PQL 결론(m41 위임), 플랫폼 패리티(m15 위임).

본 문서 작성이 위 경계를 지켰음을 검증하는 절차:

```bash
git diff --stat -- apps/web/src apps/ios/Sources   # 출력 없어야 함 (코드 변경 0)
git status --short                                  # docs 1파일만
rg '<<<<<<<|=======|>>>>>>>' apps/web/docs/post-response-30-second-action-audit-table.md   # 줄머리 충돌 마커 0
rg -n "add_flow_started|add_flow_abandoned|deed_judged|deed_judge_attempted|deed_rerolled|deed_save_capped|deed_saved|level_up_viewed" apps/web/src/app/add/page.tsx   # 앵커 72/78/106/135/149/167/183/199 재확인
```

## 부록: 성공기준 완성도 체크리스트

| # | 성공기준 (marketing-44) | 충족 섹션 | 완성도 |
|---|---|---|---|
| 1 | `apps/web/docs/`에 결과 직후 30초 행동 감사표 1개 | 본 문서 | ✅ |
| 2 | J1~J4별 결과 직후 행동 분류(활성화/정상/보류/마찰) | §3.1·§3.2 | ✅ |
| 3 | 이벤트 앵커 매핑(기존만, 신규 0) | §3·§9 | ✅ |
| 4 | first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`) 계승, 재정의 0 | §2·§8 | ✅ |
| 5 | `deed_save_capped`=availability/friction 계승 | §2·§4·§9 | ✅ |
| 6 | 보내면 안 되는 조건(do-not-send) | §5.1 | ✅ |
| 7 | 바꾸면 안 되는 조건(do-not-change) | §5.2 | ✅ |
| 8 | synthetic/mock/self-test·소표본 비결정 등급 | §0 전제·§4 | ✅ |
| 9 | 첫 검증 게이트(첫 10명 OR 첫 7일, 행 단위 채움 가능성만) | §6 | ✅ |
| 10 | event anchor drift 0 / conflict marker 0 / code diff 0 | §9·§10 | ✅ |
| 11 | source note path 인용 | §0 출처노트 | ✅ |

## 학습 루프 (marketing loop)

- **계승한 기준:** first value 매핑(J1/J2/J4=`deed_saved`:183, J3=`deed_judged`:106) 재정의 0 · 세션당 가치 판독표(성공/정상/보류/마찰, m42) · 막힘 4분류 B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL(m31) · `deed_save_capped`:167=availability/friction(m28·m29·원장) · 넛지 기본값 show-nothing·B-LOST에만 후보(m40) · 미방문 발송 기본값 "보내지 않음"·approval-needed(m43) · synthetic/mock/self-test·소표본 비결정 등급(m25·원장) · retention 대조 방법은 m37, PQL 결론은 m41 위임.
- **이번에 새로 배운 것:** AI 제품의 가치는 결과 카드 발화(`deed_judged`)가 아니라 **결과 카드 직후 행동 흐름**으로 드러난다. 같은 결과 카드가 J3엔 도착점(카드 자체가 first value, 직후 무저장 종료=정상)이고 J1/J2/J4엔 통과점(직후 `deed_saved`가 와야 활성화)이라, "결과 직후 행동"의 부호가 잡마다 뒤집힌다. 결과 직후 30초는 세션 전체와 분리된 별도 판독 단위이며, "30초"는 계측이 아니라 수기 관찰 프레임이다. on-instrument는 save/reroll/cap/종료뿐이고 근거 읽기·보여 주기는 off-instrument 손기록이다. 결과 직후 행동을 *읽는 것*과 그것으로 *보내거나 바꾸는 것*은 별개이고, 발송·변경 기본값은 "하지 않음"이다.
- **다음 Marketer에게 넘길 규칙:** 결과 직후 30초를 읽기 전에 ① 이 잡에서 결과 카드가 도착점(J3)인가 통과점(J1/J2/J4)인가 ② 결과 직후 first value 행동(`deed_saved` 또는 이미 도달한 `deed_judged`)이 일어났는가(→ 활성화) ③ 미발화면 종료 성격이 무엇인가(J3 정상 종료=정상 / B-AVAIL cap=마찰 / reroll·B-LOST=보류) ④ 읽기를 발송·변경 근거로 쓰려는 충동이 있는가(있으면 멈춤 — 발송/변경 기본값은 "하지 않음", approval-needed)를 순서대로 통과시킨다. 결과 직후 분류는 사례 단위 대조 *후보*일 뿐 비율·임계값·전환율로 환산하지 않는다. "30초"를 계측 임계값으로 굳히지 않는다.
- **MARKETING_LEARNINGS.md 승격 후보:** "Post-Response Flow Reveals Value, Not The Result Event" — AI 제품의 가치 전달은 결과/응답 이벤트 발화가 아니라 그 직후 행동 흐름으로 읽으며, 같은 결과 카드가 J3엔 도착점·J1/J2/J4엔 통과점이라 "결과 직후 행동"의 부호가 잡마다 뒤집힌다. 결과 직후 창은 세션 전체와 분리된 판독 단위이고, 읽기를 발송·변경 근거로 자동 연결하지 않는다(기본값 "하지 않음"). 기존 `Session Value Is Read By Job, Not Event Count`·`AI Outcome Proxy Separation`·`Nudges Are Event-Triggered, And Show-Nothing Is The Default`를 보완하는 새 축으로 승격 제안.
