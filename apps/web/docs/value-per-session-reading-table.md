---
작성일: 2026-06-06
Intent: marketing-42
Mode: 내부 기획 L1 (+ L2 agent-approved push)
Status: complete
Owner: Marketer (Planner / Developer / Operator 관점 종합)
---

# Virtue 세션당 가치 판독표 (Value-Per-Session Reading Table)

## §0 목적 + 전제

### 목적

Mixpanel류 2026 AI/product analytics 렌즈는 두 가지를 말한다 — (1) **AI 제품에서는 행동 수(actions)가 적은 것이 더 빠른 가치일 수 있다**(fewer actions ≠ worse), (2) **raw usage volume(클릭·이벤트 수)보다 workflow 안에서 만들어진 measurable value가 중요하다.** 즉 "이벤트가 많이 찍혔다 = 좋다", "세션이 짧다 = 나쁘다"는 둘 다 AI 제품에서 깨지는 단순판정이다.

Virtue는 prelaunch라 세션 품질을 전환율·리텐션율·activation rate로 산출할 단계가 **아니다.** 그러나 출시 후 작은 숫자가 들어오면 `deed_judged`·`deed_rerolled`·`deed_saved` 같은 **이벤트 수를 세션 가치(activation 품질)로 곧장 읽는 오독**이 가장 흔하다 — 특히 "짧은 세션 = 이탈", "reroll 많음 = 불신", "클릭 많음 = engagement 좋음", "저장 없음 = 실패"처럼.

본 문서는 그 오독을 출시 *전에* 막는 장치다. 출시 후 들어오는 **한 세션의 모양(event shape)을 잡별 first value 기준으로 성공 / 정상 / 보류 / 마찰 네 칸으로 읽는 내부 판독표**를 고정해, 검증을 "이벤트 수 세기"가 아니라 "세션당 가치 증거 분류"로 바꾼다.

본 문서는 세션 가치를 *채점하거나 점수화하지 않는다.* 어떤 세션도 "이게 좋은 세션이다 / N점이다"로 못박지 않는다. 출시 후 첫 10명 또는 첫 7일 단계에서 **한 세션을 어떻게 읽고(성공/정상/보류/마찰), 무엇을 가치로 읽으면 안 되며(오독 금지선), 무엇은 승인 전까지 손대지 않는가(Waiting/approval-needed)** 의 경계만 고정한다.

> **출처노트:** `source/external-links/marketing/2026-06-06-ai-value-per-session.md`. 본 작업 시점 로컬 저장소에 해당 출처노트가 **부재**해 원문을 직접 대조하지 못했다. 따라서 본 문서는 출처노트 원문이 아니라 Intent rationale에 적힌 Mixpanel 2026 AI/product analytics 렌즈 요지(fewer actions가 빠른 가치일 수 있고, raw usage volume보다 measurable value가 중요)와 이미 검증된 선행 문서(특히 m06 first value, m33 활성화 후보, m29 outcome proxy, m31 막힘 4분류, m41 PQL 경계)에 근거한다. 출처노트가 복구되면 §1 요지를 재대조한다. **외부 세션 길이·engagement 벤치마크 수치는 prelaunch/post-launch 첫 리뷰의 합격선으로 가져오지 않는다.**

### 전제 (못박기)

1. **판독 경계이지 세션 채점/품질 점수가 아니다.** prelaunch이므로 세션 가치 점수·임계값·전환율·activation rate를 산출하지 않는다. 본 문서는 출시 후 한 세션을 어떻게 분류해 읽을지를 가르는 내부 기준일 뿐이다(§7 금지선).
2. **신규 0.** 신규 이벤트·속성·코드·카피·대시보드·플래그·세션리플레이·tracking/privacy 설정을 단 하나도 만들지 않는다. 이미 발화 중인 기존 6개 이벤트(`add_flow_started`, `deed_judged`, `deed_saved`, `level_up_viewed`, 보조 `deed_rerolled`, `deed_save_capped`)만 인용한다(§8 사실 확인).
3. **재정의 0.** first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`), 잡 정의, 후보 묶음(A1~A4), 막힘 4분류(B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL)는 선행 문서가 소유한다. 본 문서는 그 위에 "세션당 가치 읽기 판독표"라는 층만 더한다(§7 충돌 점검).
4. **승인 전 Waiting.** 세션 품질 점수·임계값·전환율·PQL·가격 해석·신규 tracking·대시보드·공개 카피는 본 Intent로 결정·구현하지 않으며 사용자 승인 전까지 Waiting 대상이다(§6).

## §1 세션당 가치 ≠ 이벤트 수 — 핵심 원칙 5가지

한 세션의 가치는 그 세션에서 **찍힌 이벤트의 개수**가 아니라, **잡별 first value에 도달했는가 + 그 도달이 정상 흐름인가**로 읽는다. 다음 5원칙이 본 판독표의 토대다.

1. **이벤트 수는 가치의 대리지표가 아니다.** 같은 5개 이벤트도 한 세션은 가치 도달, 다른 세션은 길을 잃고 헤맨 흔적일 수 있다. raw event volume을 세션 품질·engagement·activation으로 환산하지 않는다.
2. **짧은 세션이 빠른 가치일 수 있다(특히 J3).** AI 호기심형(J3)은 `add_flow_started` → `deed_judged` 두세 동작에 first value를 얻고 저장 없이 닫는 것이 **정상이자 빠른 가치**다. 짧음을 이탈·미충족으로 읽지 않는다.
3. **많은 행동이 마찰일 수 있다.** 반복 `deed_rerolled`(저장 없음), `deed_save_capped`, 판정 없는 다회 `add_flow_started`처럼 이벤트가 많은 세션은 가치가 아니라 다의적 탐색·가용성 마찰·길 잃음일 수 있다.
4. **세션 가치는 잡별로 다른 모양이다.** J1/J2/J4의 가치는 저장(`deed_saved`)에서, J3의 가치는 판정(`deed_judged`)에서 난다. 같은 "저장 없는 짧은 세션"이 J3엔 성공, J1엔 보류다(§2·§3).
5. **세션 분류는 결론이 아니라 대조 후보다.** 한 세션을 성공/정상/보류/마찰로 *읽는* 것은 출시 후 retention·반복 가치와 *대조할 후보*를 만드는 일이지, "이 세션이 좋다/나쁘다"는 확정이 아니다. 대조 방법은 m37·m41에 위임한다.

## §2 first value 매핑 계승 (재정의 0 — 세션 판독의 기준점)

세션을 읽으려면 먼저 "이 잡에서 무엇이 first value인가"가 고정돼야 한다. 아래는 m06·m33을 한 글자도 바꾸지 않고 가져온 기준점이다.

| 잡 | first value (계승, 재정의 0) | 가치 발화 이벤트 | 저장의 역할 |
|---|---|---|---|
| **J1** 기록형 | 첫 `deed_saved`:183 | `deed_saved` | 본체(저장이 가치) |
| **J2** 누적형 | 첫 `deed_saved`:183 (총합↑) | `deed_saved` (+보조 `level_up_viewed`) | 본체(누적의 단위) |
| **J3** AI 호기심형 | 첫 `deed_judged`:106 (저장 전 닫힘 정상) | `deed_judged` | 범퍼(선택) — 저장 불요 |
| **J4** 회고형 | 첫 `deed_saved`:183 (로그 첫 항목) | `deed_saved` | 본체(돌아볼 로그) |

> **계승 핵심:** ① J1/J2/J4의 세션 가치는 `deed_saved`로, J3은 `deed_judged`로 읽는다. ② **J3는 `deed_judged` 후 `deed_saved`가 없어도 first value에 도달한 정상 세션**이다(judged−saved 갭=이탈 아님). ③ `add_flow_started`는 진입(intent)일 뿐 가치가 아니다. ④ 세션 판독은 이 매핑 위에서만 한다 — 저장 유무라는 한 신호를 모든 잡에 똑같이 적용하지 않는다.

## §3 세션당 가치 판독표 (이 문서의 심장)

출시 후 들어오는 한 세션의 모양을 **네 칸**으로 읽는다.

- **성공(가치 도달):** 그 세션의 잡 기준 first value에 도달했다.
- **정상(정상 종료):** first value 도달 후 더 안 해도 되는, 또는 이탈이 아닌 자연 종료. (성공의 한 형태이거나 그 직후 상태)
- **보류(판단 보류):** 가치 도달 여부가 모호해 수기 관찰 전에는 성공/이탈로 단정하지 않는다.
- **마찰(availability/friction):** 가용성·한도·실패로 가치 행동이 *차단된* 구간. 가치 부재가 아니라 차단이다.

모든 셀은 가설이며 기존 이벤트·화면에만 근거한다. "이벤트 수"가 아니라 "어떤 이벤트가, 어느 잡에서, 어떤 순서로"를 본다.

### §3.1 세션 모양 → 잡별 판독

| 세션 모양 (event shape, 기존 이벤트만) | J1 기록형 | J2 누적형 | J3 AI 호기심형 | J4 회고형 |
|---|---|---|---|---|
| `add_flow_started` → `deed_judged` → `deed_saved` (짧아도) | **성공** (저장=가치) | **성공** (총합↑) | **성공** (이미 판정서 가치, 저장은 덤) | **성공** (로그 적립) |
| `add_flow_started` → `deed_judged`, **저장 없이 닫힘** | **보류** (저장 전 이탈 후보 — B-LOST/B-MISMATCH/B-NORMAL 구분 필요) | **보류** (누적 시작 전 — 동일) | **성공/정상** (판정서 first value, 저장 불요·정상 종료) | **보류** (로그 적립 전 — 동일) |
| `deed_saved` **반복**(둘째~) + `level_up_viewed` | 성공(반복 가치) | **성공** (누적·진화 본체) | (해당 약함) | 성공(로그 누적) |
| **반복** `deed_rerolled`, 저장 없음 | **보류** (다의적: 불신·호기심·비교) | 보류 | **보류** (판정 재요청 호기심일 수 있음 — 불신 단정 금지) | 보류 |
| `deed_save_capped` 발화(저장 중단) | **마찰** (30덕 상한 차단) | **마찰** (동일) | (저장 안 하는 잡이라 해당 약함) | **마찰** (동일) |
| `add_flow_started`만, 판정 없음 | **보류** (B-LOST/탐색/mock 구분 필요) | 보류 | 보류 | 보류 |
| 이벤트 다수지만 first value 0 (클릭 많은 세션) | **보류/마찰** (engagement 아님 — 길 잃음/가용성 분리) | 보류/마찰 | 보류/마찰 | 보류/마찰 |

> **읽기 핵심:** ① 같은 "짧은·저장 없는 세션"이 **J3엔 성공, J1/J2/J4엔 보류**다(잡별 first value 차이). ② "저장 없이 닫힘(J1/J2/J4)"은 곧장 이탈이 아니라 **보류**이고, 막힘 4분류(B-LOST 길 잃음 / B-MISMATCH 기대 불일치 / B-AVAIL 가용성 / B-NORMAL 정상 종료, m31)로 라우팅 후에야 성격이 정해진다. ③ 이벤트가 많아도 first value가 없으면 **engagement가 아니라 보류/마찰**이다. ④ `deed_save_capped`는 가치 부재가 아니라 **차단(마찰)** 이다(§4).

### §3.2 "정상 종료"와 "이탈"을 가르는 기준 (drop ≠ end)

세션이 짧게 끝났다고 모두 이탈이 아니다. m31 막힘 4분류로 종료 성격을 먼저 가른다.

| 종료 모양 | 잡 맥락 | 분류 | 가치 판독 |
|---|---|---|---|
| `deed_judged` 후 저장 없이 닫힘 | **J3** | 정상 종료(B-NORMAL) | **성공** — 판정서 가치 얻음, 저장 불요 |
| `deed_judged` 후 저장 없이 닫힘 | J1/J2/J4 | 보류 → B-LOST/B-MISMATCH/B-NORMAL 구분 | 보류(이탈 단정 금지) |
| `deed_save_capped`로 끊김 | 전 잡 | 가용성 차단(B-AVAIL) | **마찰** — 이탈 아님 |
| `add_flow_started` 후 아무 가치 이벤트 없음 | 전 잡 | 길 잃음 후보(B-LOST) ↔ 탐색·mock 구분 | 보류 |
| first value 후 닫힘(J별 해당 가치 이벤트 발화) | 전 잡 | 정상 종료 | **성공/정상** |

> **drop ≠ end:** "짧다·저장 없다·세션 끝"을 이탈로 환산하지 않는다. J3의 짧은 무저장 세션은 가장 흔한 **성공**이고, cap으로 끊긴 세션은 **마찰**이며, 진입만 한 세션은 **보류**다. 어느 것도 이벤트 수로 판정하지 않는다.

## §4 오독 금지선 (do-not-misread — 본 문서의 핵심 경계)

출시 후 작은 숫자에서 아래를 **결론으로 만들지 않는다**(원장 `Availability And Friction Are Not Value`·`AI Outcome Proxy Separation`·`Prelaunch Decision Boundary` 및 m28·m29·m31·m41 계승).

- **이벤트 수 증가 = 가치 증가로 읽지 않는다(본 문서 1번 경계).** raw event/click volume을 세션 품질·engagement·activation으로 환산하지 않는다. 가치는 잡별 first value 도달로만 읽는다.
- **짧은 세션 = 나쁜 세션으로 읽지 않는다.** J3는 짧을수록 빠른 가치일 수 있다. 세션 길이·동작 수를 품질 점수로 쓰지 않는다.
- **저장 없는 종료 = 이탈로 단정하지 않는다.** J3(judged−saved 갭)는 정상 종료다. J1/J2/J4의 무저장 종료는 보류이며 막힘 4분류 후에야 성격이 정해진다.
- **반복 `deed_rerolled` = 불신/이탈로 단정하지 않는다.** 재판정 의도는 불신·호기심·비교 학습이 모두 가능(다의적)하므로 수기 관찰 전 처분하지 않는다.
- **`deed_save_capped` = 가치/upgrade demand가 아니다.** 30덕 상한 early return으로 `deed_saved`가 미발화하는 **availability/friction** 신호다(§3.1·아래 §4 메커닉). 가치 부재나 유료 수요로 환산하지 않는다.
- **클릭/이벤트 많은 세션 = engagement 좋음으로 읽지 않는다.** first value가 없는 다이벤트 세션은 길 잃음(B-LOST)·가용성 마찰일 수 있다.
- **세션 분류를 비율·임계값·전환율로 환산하지 않는다.** "성공 N / 보류 M"을 %·activation rate·유의성으로 읽지 않고 사람·사례 단위로 읽는다.
- **한 명의 세션을 제품 방향으로 확정하지 않는다.** 표본이 작을수록 한 명의 세션이 과대평가된다.
- **synthetic/mock/`임시 판정`·데모 시드(641덕)·메이커 self-test를 사람 세션 가치에 섞지 않는다.** 제외는 삭제가 아니라 표시 후 집계 제외다.
- **외부 세션 길이·engagement 벤치마크를 합격선으로 베끼지 않는다.** 방향 참고일 뿐 임계값이 아니다.
- **변경 금지.** 코드·카피·이벤트·속성·대시보드·세션리플레이·tracking/privacy·배포·외부 발송·비용·시크릿·권한·개인정보 변경 0.

**`deed_save_capped` 메커닉(사실):** `apps/web/src/app/add/page.tsx:167`에서 30덕 상한 초과 시 발화 후 **저장 중단(early return)** 하므로 `deed_saved`가 발화하지 않는다. 즉 cap 세션은 저장(first value)이 *차단된* 구간이며, 신호 부재(저장 미발화)를 가치 부재로 읽지 않고 availability-blocked로 분류·보존한다(m37 §5 X-CAP 계승).

## §5 출시 후 첫 검증 게이트 (첫 10명 OR 첫 7일 — 분류 가능성만)

### 트리거 조건

| 항목 | 값 |
|---|---|
| 발동 조건 | **실제 사용자 10명 도달** OR **출시 후 7일 경과** — 둘 중 먼저 오는 쪽 (m33 §4 게이트와 정렬) |
| 표본 성격 | 소표본 / 통계적 유의성 없음 (세션 품질 점수·전환율·activation rate 평가 불가) |
| 게이트 목적 | 한 세션을 §3 판독표(성공/정상/보류/마찰)로 **분류 가능한 상태인지** 확인 전용 |

### 게이트에서 하는 일 / 안 하는 일

| 한다 (✓) | 안 한다 (✗) |
|---|---|
| 들어온 세션을 잡별 first value 기준으로 성공/정상/보류/마찰로 *사례 단위* 손기록 | 세션 분류를 "세션 품질 점수"·"activation rate"로 환산 |
| 짧은 무저장 세션이 J3 성공인지 J1 보류인지 잡 맥락으로 구분 | 짧은 세션·저장 없음을 일괄 이탈로 판정 |
| 다이벤트·반복 reroll·cap 세션을 보류/마찰로 분리해 가치와 섞이지 않는지 확인 | 이벤트 수·클릭 수를 engagement·가치로 환산 |
| 판독표와 어긋난 세션 모양(분류 불가·새 셀 필요)을 *판독표 갱신 후보*로 기록 | 사후에 새 세션 점수 기준을 즉석 조립 |

> 원칙: 이 게이트는 **"들어온 세션을 판독표로 분류할 수 있는가"** 만 본다. 어떤 세션 모양이 retention과 상관되는지, 세션 품질 임계값이 얼마인지는 충분 표본·승인 후의 별도 리뷰로 보류한다. 세션→retention 대조의 쿼리 모양·D7 우선/D30 보류는 **m37 §6에 위임**하고, PQL/upgrade 후보 분류는 **m41에 위임**하며, 플랫폼 합산 전 web/iOS 분리는 **m15에 위임**한다. 첫 10명·첫 7일은 **세션을 분류해 보는 시점일 뿐, 세션 품질을 확정하는 시점이 아니다.**

## §6 Waiting / approval-needed 경계

아래는 본 Intent로 결정·구현하지 않으며 **사용자 승인 전까지 Waiting** 대상이다. Infinity 작업은 세션 채점·계측이 아니라 *세션 판독 경계표* 작성에 머무른다.

- **세션 품질 점수·임계값·등급화** — 소표본에서 임계값을 만들면 작은 숫자를 품질로 굳힌다. decision-grade 표본·승인 후로 보류.
- **activation rate·전환율·세션→retention 상관 결론** — decision-grade 표본·대조(m37) 전에는 산출 금지.
- **PQL/upgrade demand 해석** — 세션 판독은 m41 PQL 경계의 입력일 뿐, PQL 결론은 m41·승인 후로 위임.
- **가격 해석·플랜·paywall** — 세션 가치를 유료 수요로 환산 금지(m28 §2·§4).
- **신규 tracking(이벤트·속성·플래그)·세션 길이/이벤트 수 자동 집계·PostHog 세션 품질 대시보드·cohort·세션리플레이** — 본 문서는 기존 6개 이벤트 인용에 한정. 신규 0.
- **공개 카피·outbound·실험·배포·CI·권한·시크릿·비용·개인정보 변경** — 본 Intent 산출물은 docs 1파일뿐.

## §7 선행 문서 계승 / 충돌 점검 (no-conflict)

아래 "소유 문서"의 정의는 본 문서에서 한 글자도 바꾸지 않는다. 본 문서가 새로 하는 단 하나는 그 정의들 위에 **세션당 가치 읽기 판독표(성공/정상/보류/마찰)** 를 얹는 것뿐이다.

| 정의 항목 | 소유 문서 (Single Source) | 본 문서의 취급 | 충돌 |
|---|---|---|---|
| J1~J4 잡 정의 + first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`) | `first-session-jtbd-matrix.md` (m06) | 그대로 계승·인용. 재정의 0 (§2) | 없음 |
| A1~A4 활성화 후보 묶음 + window + 출시 후 게이트 | `activation-candidate-registry.md` (m33) | §2·§5 토대로 인용. 세션 판독은 그 위층. 재정의 0 | 없음 |
| 막힘 4분류(B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL) | `product-body-vs-bumper-boundary-table.md` (m31) | §3.2 종료 성격 라우팅에 인용. 재정의 0 | 없음 |
| 활동량≠인정 가치, reroll 다의성, `deed_save_capped`=availability | `ai-outcome-proxy-dictionary.md` (m29) | §1·§4에 계승. 재정의 0 | 없음 |
| 첫 가치 이전 do-not-lock + `deed_save_capped`=availability | `prelaunch-monetization-boundary-brief.md` (m28) | §4·§6 cap·가격 경계 계승. 재정의 0 | 없음 |
| 세션→retention 대조 질문(D7 우선/D30 보류) + 제외 조건 | `activation-retention-correlation-readiness.md` (m37) | 대조 *방법*은 m37 위임. 본 문서는 분류만 | 없음 |
| PQL/upgrade 후보·비후보·Waiting 경계 | `post-launch-pql-upgrade-signal-boundary-table.md` (m41) | 세션 판독은 PQL 경계의 *입력*. PQL 결론은 m41 위임 | 없음 |
| 사람/test/synthetic 트래픽 분리 선행 | `traffic-source-reading-boundary-table.md` (m25) | §4 제외 분류의 선행 원칙으로 계승 | 없음 |
| 공유성은 별도 축(저장수로 환산 금지) | `shareworthy-first-result-observation-criteria.md` (m30) | 세션 가치를 공유성으로 환산하지 않음(별도 축) | 없음 |
| 사용자 노출 카피 금지어 | `copy-spec.md` | 사용자 노출 카피 0건. 인용한 `임시 판정`은 현재 코드 그대로의 단서 | 없음 |

## §8 기존 이벤트 증거 (발화 위치, read-only 사실 확인)

본 문서가 인용하는 모든 신호는 `apps/web/src/app/add/page.tsx`에 **이미 발화 중인 기존 6개 이벤트**다. 신규 구현 0건. 아래 라인은 read-only 검증 결과이며 선행 문서(m33 §7·m37 §9·m41 §9)와 drift 0.

| 이벤트 | 발화 위치 | 발화 시점 | 본 문서에서의 역할 |
|---|---|---|---|
| `add_flow_started` | `add/page.tsx:72` | `/add` 마운트 시 1회(`useEffect([])`) | 진입(intent) — 가치 아님(§1·§3) |
| `deed_judged` | `add/page.tsx:106` | 채점 성공 직후, **저장과 독립·저장 전** 발화 | J3 first value · 짧은 무저장 세션의 성공 신호(§3) |
| `deed_rerolled` | `add/page.tsx:149` | "한 번 더" 클릭(최대 3회) | 반복=보류(다의적: 불신·호기심·비교)(§3·§4) |
| `deed_save_capped` | `add/page.tsx:167` | 30덕 상한 초과 시 발화 후 **저장 중단(early return)** | availability/friction — 마찰(§3·§4) |
| `deed_saved` | `add/page.tsx:183` | 저장 실행(`addDeed`) 후 발화 | J1/J2/J4 first value · 세션 성공 신호(§2·§3) |
| `level_up_viewed` | `add/page.tsx:199` | `deed_saved` 직후 환생종 stage 상승 시에만 | J2 누적 보조 — 1회를 가치로 승격 금지 |

> 보조 사실: 같은 파일에 `add_flow_abandoned`(:78), `deed_judge_attempted`(:135)도 발화 중이나, 본 문서는 **요청된 6개 이벤트에 한정**하며 새 이벤트를 제안하지 않는다.

## §9 Out of scope (변경 0건) + 검증

본 Intent(marketing-42)로 수행하지 않으며, 각각 별도 Intent·단계에서 결정한다.

- 코드/카피/런타임 변경 **0건** — 산출물은 docs 1파일뿐이다.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·세션 길이/이벤트 수 자동 집계·대시보드·cohort·세션리플레이·tracking/privacy 없음.
- **세션 품질 점수·임계값·activation rate·전환율·PQL·가격 해석 산출 0건** — 본 문서는 세션 분류 경계일 뿐 채점·결론이 아니다.
- 외부 발송·공개 모집 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고·업그레이드 CTA 없음.
- 배포·CI·권한·시크릿·비용·개인정보 변경 **0건**.
- 첫 10~20명 또는 synthetic/small sample을 **세션 품질·activation rate·리텐션율·전환율·PMF·세그먼트로 판정하는 일 0건**.
- 세션→retention/conversion 실제 대조 실행(m37 위임·승인 후), PQL 결론(m41 위임), 플랫폼 패리티(m15 위임).

본 문서 작성이 위 경계를 지켰음을 검증하는 절차:

```bash
git diff --stat -- apps/web/src apps/ios/Sources   # 출력 없어야 함 (코드 변경 0)
git status --short                                  # docs 1파일만
rg '<<<<<<<|=======|>>>>>>>' apps/web/docs/value-per-session-reading-table.md   # 줄머리 충돌 마커 0
rg 'posthog.capture\(' apps/web/src/app/add/page.tsx -n   # 6개 이벤트 발화 위치 재확인 (72/106/149/167/183/199)
```

## 부록: 성공기준 완성도 체크리스트

| # | 성공기준 (marketing-42) | 충족 섹션 | 완성도 |
|---|---|---|---|
| 1 | `apps/web/docs/`에 세션당 가치 판독 문서 1개 | 본 문서 | ✅ |
| 2 | first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`) 계승, 재정의 0 | §2·§7 | ✅ |
| 3 | 기존 이벤트만 인용(신규 0) | §8·§9 | ✅ |
| 4 | 세션당 가치 판독표(성공/정상/보류/마찰) | §3.1·§3.2 | ✅ |
| 5 | 오독 금지선(이벤트 수↑·짧은 세션·저장 없음·reroll·cap·클릭 많음) | §4 | ✅ |
| 6 | 첫 검증 게이트(첫 10명 OR 첫 7일, 분류 가능성만) | §5 | ✅ |
| 7 | 신규 계측·임계값·전환율·PQL·가격 해석 0 | §0 전제1·§6·§9 | ✅ |
| 8 | 선행 first value/활성화/proxy/막힘/PQL 문서 충돌 0 | §7 충돌 점검 | ✅ |
| 9 | source note path 인용 | §0 출처노트 | ✅ |

## 학습 루프 (marketing loop)

- **계승한 기준:** first value 매핑(J1/J2/J4=`deed_saved`:183, J3=`deed_judged`:106) 재정의 0 · 막힘 4분류 B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL(m31) · 활동량≠인정 가치·reroll 다의성·`deed_save_capped`:167=availability/friction(m29·m28·원장) · J3 저장 없는 종료=정상(judged−saved 갭=이탈 아님) · synthetic/mock/self-test·소표본 비결정 등급 · 세션→retention 대조 방법은 m37, PQL 결론은 m41 위임.
- **이번에 새로 배운 것:** AI 제품의 세션 가치는 **이벤트 수가 아니라 잡별 first value 도달+종료 성격**으로 읽는다. fewer actions가 더 빠른 가치일 수 있고(J3 짧은 무저장 세션=성공), 많은 행동이 마찰일 수 있다(반복 reroll·cap·다이벤트 무가치=보류/마찰). 한 세션은 **성공 / 정상 / 보류 / 마찰** 네 칸으로 갈라 읽되, 같은 "짧고 저장 없는 세션"이 잡에 따라 성공(J3)도 보류(J1/J2/J4)도 된다. 세션 분류는 결론이 아니라 대조 후보다.
- **다음 Marketer에게 넘길 규칙:** 한 세션을 읽기 전에 ① 이 세션의 잡과 first value가 무엇인가 ② first value 이벤트가 발화했는가(→ 성공) ③ 미발화면 종료 성격이 무엇인가(J3 정상 종료=성공 / B-AVAIL cap=마찰 / B-LOST·다의=보류) ④ 이벤트 수·세션 길이로 품질을 매기려는 충동이 있는가(있으면 멈춤)를 순서대로 통과시킨다. 세션 분류는 사례 단위 대조 *후보*일 뿐 비율·임계값·activation rate로 환산하지 않는다.
- **MARKETING_LEARNINGS.md 승격 후보:** "Session Value Is Read By Job, Not Event Count" — 세션 가치는 이벤트/클릭 수가 아니라 잡별 first value 도달과 종료 성격으로 읽으며, 짧은 무저장 세션이 J3엔 성공·J1엔 보류이고, 많은 행동(반복 reroll·cap·다이벤트 무가치)은 보류/마찰일 수 있다. 한 세션을 성공/정상/보류/마찰로 갈라 읽되 결론이 아니라 대조 후보로 둔다. 기존 `AI Outcome Proxy Separation`·`Availability And Friction Are Not Value`·`Product Body vs Bumper By Job`·`Readiness Trace Over Accuracy`를 보완하는 새 축으로 승격 제안.
