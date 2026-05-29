---
작성일: 2026-05-29
Intent: marketing-26
Mode: 내부 기획 L1
Status: draft
Owner: Workflow-Master (Planner / Developer / Marketer / Operator 4역할 합성)
---

# Virtue 회복 우선 리텐션 렌즈 (연속성보다 회복성)

## §0 목적 + 전제

### 목적

정식 출시 전 첫 7일 재방문 루프와 기존 카피를 **"연속일 보호(streak)"가 아니라 "빠진 뒤 회복 가능성(recovery)"** 으로 읽는 내부 렌즈다. Virtue의 덕행 기록은 언어상 도덕 평가와 가까워서, 강한 streak reset이나 손실 회피·shame 압박을 붙이면 사용자가 "오늘도 실패하면 안 된다"로 읽고 기록 자체의 신뢰를 잃을 수 있다. 그래서 첫 주 루프를 recovery / skip / monthly completion / comeback session 네 관점으로 감사하고, 같은 재방문이라도 잡(J1~J4)별로 무엇을 회복 신호로 볼지 분리한다.

출처 노트(`source/external-links/marketing/2026-05-29-streak-flexibility-recovery-retention.md`, Duolingo Streak Freeze · Reforge ICED/retention · HabitBoard agency)의 관점을 Virtue prelaunch 기준으로 번역한다.

### 앞선 문서 역할 분리 (계승, 재정의 금지)

본 렌즈는 새 정의를 만들지 않는다. 아래 문서의 정의를 **회복 관점으로 재해석**할 뿐이다. 정의를 바꾸면 충돌이다(§7 점검).

| 문서 | 본 렌즈가 계승하는 것 | 본 렌즈가 위임하는 것 |
|---|---|---|
| `seven-day-deed-loop.md` (m03) | `deed_saved` 중심 루프, "이번 주 N번" 저압 표현, 원칙 A "빠진 날은 셈하지 않는다", judged−saved 갭 주의 | 첫 주 D1/D3/D7 카피 후보·B=MAP·마일스톤 정의 (카피를 새로 짓지 않음) |
| `first-week-activation-retention-bridge.md` (m14) | first value → 7일 내 second value 연결, 잡별 가치 방향 분리, 503=관찰 차단, synthetic 위생 | second value/time gap 정의·관찰 행 양식 (회복 신호는 second value의 정성 재해석일 뿐 새 정의 아님) |
| `retention-predictive-activation-brief.md` (m22) | J1/J2/J4=`deed_saved`·J3=`deed_judged` 매핑, 첫 행동/first value/depth 3층, D7 손기록 질문, 이벤트 발화 라인, prelaunch 금지선 | depth signal·D7 질문 정의 (comeback 질문은 D7 질문의 회복 관점 변주이지 신규 칸 아님) |

잡 정의(`first-session-jtbd-matrix.md`)와 카피 가드레일(`copy-spec.md`)은 재정의 0으로 참조만 한다.

### 전제 (못박기)

1. **관찰 렌즈지 채점표가 아니다.** prelaunch이므로 어떤 회복/skip/월간 완료/복귀 값도 "좋다/나쁘다"로 판정하지 않는다. 본 렌즈는 무엇을 회복 신호로 분리해 읽고 무엇을 읽지 않을지를 정할 뿐이다(§5 금지선).
2. **신규 0.** 신규 이벤트·속성·코드·카피 반영·대시보드·플래그·세션리플레이를 단 하나도 만들지 않는다. 이미 발화 중인 기존 이벤트(`add_flow_started`, `add_flow_abandoned`, `deed_judged`, `deed_saved`, `deed_rerolled`, `deed_save_capped`, `level_up_viewed`)만 인용한다(§6 사실 확인).
3. **외부 액션 0.** 외부 발송·공개 모집·인터뷰 요청·광고를 0건 수행한다. 공개 카피·기능 변경은 §8 proposal-only로 분리하고 반영은 Waiting/approval-needed로 둔다.
4. **코드에 streak 기계가 없다.** 현재 코드 어디에도 streak/freeze/연속일 카운터 로직이 없다(§6 검증). 따라서 "연속성보다 회복성"은 기능을 빼는 일이 아니라 **재방문을 어떻게 읽을지**의 판독 기준이다.

## §1 왜 연속(streak)보다 회복(recovery)을 먼저 보는가

Duolingo는 streak를 장식이 아니라 반복 행동을 보이게 하는 신호로 다루되, Streak Freeze 같은 slack 장치로 "하루쯤 빠져도 돌아올 여지"를 함께 설계했고 그 결과 일일 활성이 +0.38% 움직였다. 효과를 낸 건 엄격함이 아니라 빠짐을 흡수하는 회복 여지였다. Reforge ICED는 제품마다 자연 사용 빈도가 다르다고 본다 — Virtue가 매일 쓰는 앱인지, 주 몇 회 회고형인지, 특정 감정/상황에서 돌아오는 앱인지 먼저 분리하지 않으면 streak 지표 자체가 제품 건강을 오해하게 만든다. HabitBoard는 streak가 압박으로 작동할 수 있다고 보고 복구·skip·월간 완료 수·숫자 끄기 같은 개인 agency 장치를 제공한다 — 통제권을 사용자에게 돌려주는 방식이다.

Virtue의 덕행 기록은 도덕 평가 언어와 가깝기 때문에, 여기에 streak reset·손실 회피·shame을 붙이면 사용자는 "오늘도 실패하면 안 된다"로 읽고 기록 자체를 신뢰하지 않게 된다. 세스 고딘식으로 번역하면, 좋은 연속성 장치는 사용자를 조종하는 장치가 아니라 되고 싶은 사람의 정체성을 작게 확인하는 신호다. 그래서 Virtue는 "덕을 잃지 마세요"(손실 프레임)보다 "어제와 무관하게 오늘의 덕은 남는다"(누적·정체성 프레임)가 제품 약속과 맞는다. prelaunch 단계에서는 재방문을 밀어붙이기보다 **"빠진 뒤 돌아온 세션(comeback)"이 일어나는지를 먼저 정성 신호로 본다.**

- Duolingo Blog, "The habit-building research behind your Duolingo streak": https://blog.duolingo.com/how-duolingo-streak-builds-habit/
- Reforge, "ICED Theory — Growing Infrequent Products": https://www.reforge.com/blog/iced-theory-growing-infrequent-products
- HabitBoard, "Streaks and Personal Agency": https://habitboard.app/streaks/

## §2 회복 렌즈 4축 (정의)

표(§3)의 네 열을 미리 못박는다. 모두 비율이 아니라 사례 손기록 단위다.

- **recovery(회복 — 빠진 뒤 돌아옴):** 빈 날 이후 다시 들어와 자기 잡의 가치를 한 번 더 경험한 세션. "연속일"이 아니라 "끊겨도 돌아왔는가"를 본다.
- **skip(의도적 건너뜀):** 하루 비운 것을 streak reset이 아니라 회복 가능한 공백으로 본다. 코드에 연속일 로직이 없으므로 skip은 어떤 이벤트로도 기록되지 않는다 — 빈 날을 손실/실패로 환산하지 않는다.
- **monthly completion(월간 완료 수):** "X일 연속" 대신 한 달 안 가치 발생 일수/횟수를 세는 낮은 압박 단위. 목표선·합격선이 아니라 "연속 카운터 대신 무엇을 셀까"의 관찰 단위다(m03 "이번 주 N번" 계승).
- **comeback session(복귀 세션):** 공백 뒤 돌아온 세션에서 사용자가 무엇을 기대하고 다시 왔는지를 본인 표현으로 받아 적는 정성 질문. D7 손기록 질문(m22 §5)의 회복 관점 변주다.

## §3 J1~J4 회복 렌즈표 (이 문서의 심장)

행은 네 잡. first value는 앞선 문서에서 계승하며 재정의하지 않는다 — **J1/J2/J4 = `deed_saved`, J3 = `deed_judged`(저장 전 닫힘).**

| 잡 | first value (이벤트) | recovery — 빠진 뒤 돌아옴 신호 | skip — 의도적 건너뜀 해석 | monthly completion — 월간 완료 수 관점 | comeback session — 복귀 세션 정성 질문 |
|---|---|---|---|---|---|
| **J1 기록형** | 첫 `deed_saved` | 빈 날 이후 다시 들어와 한 번 더 `deed_saved` — "끊겨도 또 남길 수 있다" | 하루 안 남긴 건 실패가 아니라 그날 남길 게 없던 선택. 연속 깨짐으로 읽지 않음 | "연속일"이 아니라 한 달 안 `deed_saved` 일수 합으로 본다 | "빈 날 뒤 다시 왔을 때, 처음과 같은 '남긴다' 가치로 돌아왔는가?" |
| **J2 누적형** | 첫 `deed_saved` (보조 `level_up_viewed`) | 공백 후 복귀 `deed_saved`로 누적이 멈추지 않았음을 확인 — 끊겨도 총합은 남음 | 건너뛴 날이 누적을 0으로 되돌리지 않음. skip은 누적의 차감이 아님 | 월간 누적 증가분으로 본다. 환생종 진행(`level_up_viewed`)은 빠진 날과 무관하게 이어짐 | "복귀했을 때 그동안 쌓인 게 사라지지 않았음을 알아차렸는가?" |
| **J3 AI 호기심형** | 첫 `deed_judged` (저장 전 닫힘) | 공백 후 다시 들어와 반복 `deed_judged`(저장 아님) — 회복은 "다시 판정을 보러 옴". 보조로 `deed_rerolled`("다르게 보면?") | 저장 안 한 날은 이탈 아님. judged−saved 갭은 잡 차이지 skip 실패 아님 | 월간 `deed_judged` 재방문 횟수로 본다(저장 합산 아님) | "다시 판정을 보러 왔는가? 저장이 아니어도 '다르게 보고 싶어' 돌아왔는가?" |
| **J4 회고형** | 첫 `deed_saved` | 공백 후 복귀 `deed_saved`로 로그가 다시 이어짐 — "끊겨도 돌아볼 게 계속 쌓인다" | 건너뛴 날은 로그의 공백일 뿐 실패 아님. 지연 가치라 매일 압박이 부적합 | 월간 남긴 항목 수로 본다. 연속이 아니라 "돌아볼 거리가 쌓였는가" | "다시 와서 또 항목을 남겼는가? 공백을 메우려기보다 자기 흐름으로 돌아왔는가?" |

> **판독 핵심:** 회복 렌즈는 **"빠진 뒤 돌아온 세션"을 "연속일"보다 값진 정성 신호로 본다.** 단 어느 칸도 비율/도달률로 채점하지 않으며(prelaunch), comeback이 없다고 이탈로, skip을 실패로, J3의 저장 부재를 회복 실패로 단정하지 않는다. monthly completion 역시 목표선이 아니라 "연속 카운터 대신 무엇을 셀까"의 관찰 단위일 뿐이다.

## §4 표 보충 메모 (셀이 좁을 때만)

- **같은 `deed_saved`라도 회복의 가치 방향이 다르다.** J1 즉시 만족 / J2 누적감 / J4 지연 가치. 이벤트가 같다고 같은 회복으로 묶지 않는다(m14 §2 계승). 복귀 후 재저장도 잡별로 다른 가치가 돌아온 것이다.
- **J3의 회복은 "반복 저장"이 아니라 "반복 판정"이다.** J3는 저장 없이 `deed_judged`에서 가치가 닫히므로(m22 계승), 복귀를 `deed_saved`로만 세면 J3 회복을 과소 측정한다. 저장 없는 재판정·`deed_rerolled`도 정상 회복이다.
- **skip은 코드 신호가 없다.** 빈 날은 어떤 이벤트도 만들지 않으므로(연속일 로직 부재, §6), skip은 관찰자가 사람·상황 단위로 손기록할 뿐 자동 계측 대상이 아니다.
- **availability ≠ value.** 503·AI judge 지연·`deed_save_capped`(30덕 상한 후 early return으로 `deed_saved` 미발화) 구간은 회복/복귀 관찰에서 제외한다(§5). 가용성 때문에 신호가 안 뜬 것을 회복 부재로 읽지 않는다.

## §5 prelaunch 해석 금지선

표본이 첫 10~20명일 때 회복/skip/월간 완료/복귀 세션은 **관찰 렌즈일 뿐 합격선·임계값이 아니다.** 아래는 *아직 판정하지 않는다*(m14 §5 · m22 §6 · m23 §7 계승 + 회복 특화).

- **comeback 부재를 이탈로 단정하지 않는다.** 빠진 날 뒤 돌아온 세션이 안 보여도 "이탈"로 결론내지 않는다. 표본이 작고 자연 사용 주기(매일/주 회고/상황 트리거)가 아직 미분리이므로 미복귀는 "미관찰"로만 둔다.
- **skip(빠진 날)을 실패로 읽지 않는다.** 빠진 날은 streak reset이 아니라 회복 가능한 공백이다. 빈 날을 손실/실패 신호로 환산 금지.
- **J3 저장 부재를 회복 실패로 단정하지 않는다.** J3는 `deed_judged`에서 가치가 닫히고 저장 없이 정상 종료할 수 있다. 복귀 후에도 저장 없는 재판정(judged−saved 갭)은 회복 실패가 아니라 잡 차이다.
- **monthly completion 수를 목표선/합격선으로 쓰지 않는다.** "이번 달 N번 남김"은 손기록 정성 관찰값일 뿐 달성 목표·KPI·합격 임계값이 아니다(m23 completion≠goal 계승).
- **recovery rate를 % 전환율로 산출하지 않는다.** "복귀 M명 / 빠진 N명"을 비율·전환율로 읽지 않는다. n<20에서 비율은 한 명이 크게 흔든다 — 사람·상황 단위 사례로만 적는다.
- **availability ≠ value.** 503·judge 지연/타임아웃·`deed_save_capped`(early return) 구간은 회복/복귀 관찰에서 제외(availability-blocked)하고, 가용성 확인 전에는 회복 신호를 판정하지 않는다(m14 §6 계승).
- **한 명의 강한 복귀 신호를 제품 방향으로 확정하지 않는다.** 인상적인 단일 comeback을 streak 기능 도입·카피 변경 근거로 굳히지 않는다. 기록하되 방향 결정 근거로 쓰지 않는다.
- **변경 금지.** 코드·카피·이벤트·속성·대시보드·세션리플레이·배포·외부 발송·비용·시크릿·권한·개인정보 변경 0.

## §6 기존 이벤트 증거 (발화 위치, read-only 사실 확인)

본 렌즈가 인용하는 모든 신호는 `apps/web/src/app/add/page.tsx`에 **이미 발화 중인 기존 이벤트**다. 신규 구현 0건. 아래 라인은 Developer 렌즈 read-only 검증 결과이며 앞선 문서(m22 §7 등)와 drift 0.

| 이벤트 | 발화 위치 | 발화 시점 | 회복 렌즈에서의 역할 |
|---|---|---|---|
| `add_flow_started` | `add/page.tsx:72` | `/add` 마운트 시 1회(`useEffect([])`) | 복귀 세션 진입 표지(intent). 회복 여부를 이걸로 판정하지 않음 |
| `add_flow_abandoned` | `add/page.tsx:78` | 입력 시작 후 미저장 이탈 시 | 복귀했으나 다시 멈춘 위치 표시(이탈 단정 아님) |
| `deed_judged` | `add/page.tsx:106` | 채점 성공 직후, 저장과 독립·저장 전 | J3 first value. 복귀 후 저장 없는 재판정도 정상 회복 신호 |
| `deed_rerolled` | `add/page.tsx:149` | "한 번 더" 재채점(한도 내, 최대 3회 `:23`) | J3 호기심 depth(복귀 후 "다르게 보면?"), 이탈 아님 |
| `deed_save_capped` | `add/page.tsx:167` | 30덕 상한 초과 → 발화 후 early return(save 미발화) | availability-blocked. 회복 관찰·월간 완료 카운트에서 제외 |
| `deed_saved` | `add/page.tsx:183` | 저장 실행(`addDeed`) 후 | J1/J2/J4 first value. 복귀 후 재저장 = monthly completion 손기록 단위. 0점 덕행도 저장됨 |
| `level_up_viewed` | `add/page.tsx:199` | `deed_saved` 직후 환생종 stage 상승 시에만 | J2 누적 보조. 복귀 세션 부재가 기본, 부재를 회복 실패로 읽지 않음 |

> 사실 확인 보강: 코드 어디에도 **streak/freeze/연속일 카운터 로직이 없다.** "연속"·"freeze"·"streak" 문자열은 모두 `docs/` 산문에만 있고, m03은 첫 주에 숫자 streak 카운터를 노출하지 않는다고 이미 못박았다. 따라서 본 렌즈는 기능 제거가 아니라 재방문 판독 기준이다. 허용 7종 밖의 보조·서버측 이벤트는 인용하지 않으며, 판정 단계는 `deed_judged`로만 읽는다. `deed_save_capped`가 발화한 시도는 `deed_saved`/`level_up_viewed`를 발화하지 않으므로 monthly completion 카운트에 넣지 않는다.

## §7 충돌 점검 (no-conflict)

| 대상 문서 | 충돌 여부 | 근거 |
|---|---|---|
| `seven-day-deed-loop.md` (m03) | 없음 | `deed_saved` 중심 루프·"이번 주 N번" 저압 표현·원칙 A("빠진 날은 셈하지 않는다")를 그대로 계승. 본 렌즈의 monthly completion·recovery는 m03 방향의 retention/회복 관점 보강일 뿐. 첫 주 카피 후보는 m03에 위임(새 카피 0) |
| `first-week-activation-retention-bridge.md` (m14) | 없음 | first value→7일 내 second value 연결·잡별 가치 방향 분리·503=관찰 차단을 계승. recovery 신호는 second value의 정성 재해석이며 second value/time gap 정의를 다시 쓰지 않음 |
| `retention-predictive-activation-brief.md` (m22) | 없음 | J1/J2/J4=`deed_saved`·J3=`deed_judged` 매핑과 D7 손기록 질문을 계승. comeback 질문은 D7 질문의 회복 관점 변주이지 신규 칸 아님. 이벤트 발화 라인 동일(drift 0) |
| `first-session-jtbd-matrix.md` | 없음 | J1~J4 잡 정의를 재정의하지 않고 참조만. first value 매핑 그대로 |
| `copy-spec.md` (금지어) | 없음 | 사용자 노출 카피 0건. §8 회복 카피는 내부 초안이며 copy-spec 금지어 명단(인격 평가·설교형 어휘) 미사용, 손실 프레임·shame·격언 배제. 공개 반영 Waiting |

## §8 proposal-only (공개 카피·기능·운영 후보 — 본 Intent 범위 밖)

> 아래는 전부 **후보·내부 초안**이다. 본 Intent로 어떤 공개 카피·기능·계측·운영 양식도 확정/구현하지 않는다. 공개 반영은 Marketer + Planner 합의 후 승인 필요(Waiting / approval-needed).

### §8-1 회복 재방문 카피 패밀리 (내부 초안 only)

재방문 카피 후보를 두 계열로 나눠 내부 초안만 적는다. 최종 user-facing 문자열을 정의하지 않는다.

**패밀리 A — "연속 유지(streak-continuity)" 계열** *(대조군. 제품 약속과 충돌 가능 — 채택 비권장)*
- soft: `이틀째 흐름, 끊기지 않게 오늘도 한 덕.`
- soft: `여기까지 온 흐름, 오늘 한 컷으로 이어가요.`
- casual: `흐름 왔다. 오늘도 한 컷.`
- 톤 리스크: "끊기지 않게"가 손실 회피·압박으로 읽힐 수 있고, 빈 날 다음에 노출하면 shame 위험. m03 원칙 A("빠진 날은 셈하지 않는다")와 긴장.

**패밀리 B — "오늘의 덕은 남음(today's-virtue-remains)" 계열** *(제품 약속 적합 — 권장)*
- soft: `어제 비었어도 오늘 한 덕은 그대로예요.` *(m03 원칙 A 힌트와 정렬)*
- soft: `오랜만이어도 오늘 한 컷이면 다시 쌓여요.`
- casual: `어제 비었어도 오늘 덕은 그대로다.`
- 적합 이유: 누적·정체성 프레임이라 빈 날 다음에 노출해도 다그치지 않음. ICED상 "주 회고형/상황형" 가능성을 열어두어 매일 사용을 강제하지 않음. comeback 세션을 환영하는 톤.

> 권장: 패밀리 B. "어제와 무관하게 오늘의 덕은 남는다"가 제품 약속이므로 A 계열은 대조 보관용으로만 둔다. 두 계열 모두 공개 반영 전 copy-spec 톤·금지어 통과 + 사용자 관찰 비교가 필요하다(Waiting).

### §8-2 운영 관찰 후보 (commit 아님)

- **빠진 뒤 복귀 수기 메모 칸 (제안만):** 기존 첫 10~20명 baseline 관찰표(`first-real-user-baseline-template.md` §2 양식)에 회복 메모 칸을 *후보로만* 제안한다(출처 노트 후속 실험 후보 #2). **신규 컬럼·신규 이벤트 commit 0** — 우선은 이미 있는 정성 메모 칸에 "(빠진 뒤 돌아옴)" 접두로 손기록한다. 정식 컬럼 분리는 별도 Intent에서 승인 필요. 적는 내용: "며칠 공백 뒤 복귀 + 본인이 말한 복귀 이유(본인 표현 그대로, 모르면 미확인/추정)". 이 칸이 새 외부 접촉을 정당화하지 않으며 이미 허용된 대화/메모에서만 옮긴다.
- **가벼운 회복 관찰 리듬 (손기록):** 월간(또는 launch 직전) monthly completion 수를 손으로 읽고(비율·목표선 아님), comeback session을 정성 메모로 노트한다("어떤 상황의 누가 며칠 공백 뒤 무엇을 기대하고 돌아왔나"). 자동집계·대시보드·알림 없음 — 모두 Waiting.

## §9 Out of scope

본 Intent(marketing-26)로 수행하지 않으며, 각각 별도 Intent에서 결정한다.

- 코드/카피 반영/런타임 변경 **0건** — 산출물은 docs 1파일뿐이다. §8 카피는 내부 초안이며 화면 반영 0.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·대시보드·세션리플레이 없음. baseline 양식 컬럼 추가도 하지 않는다(§8-2는 제안만).
- streak/freeze UI·연속일 카운터 **구현 0건** — 본 렌즈는 판독 기준이지 기능 제안이 아니다.
- 외부 발송·공개 모집 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고 없음.
- 배포·CI·권한·시크릿·비용·개인정보 변경 **0건**.
- 첫 10~20명 또는 회복/skip/월간 완료/복귀를 **전환율·리텐션율·PMF·세그먼트·recovery %로 판정하는 일 0건** — n<20 표본은 관찰 대상이지 채점 대상이 아니다.

---

## 검증 매핑

| 성공 기준 (marketing-26) | 충족 섹션 |
|---|---|
| recovery / skip / monthly completion / comeback session 4축 J1~J4 표 | §2 (4축 정의), §3 (심장, 4행×6열) |
| first value 매핑 유지 (J1/J2/J4=`deed_saved`, J3=`deed_judged`) | §0 앞선 문서 분리, §3, §6, §7 |
| 공개 카피/기능 = proposal-only, 분리된 섹션 | §8 (8-1 카피 내부 초안 / 8-2 운영 후보, 반영 Waiting) |
| 기존 이벤트만(7종), 신규 0 | §0 전제 2, §6 (코드 근거) |
| m03/m14/m22 충돌 0 | §7 (no-conflict) |
| prelaunch 해석 금지선 | §0 전제 1, §3 판독 핵심, §5 |
| 연속성 → 회복성 재해석 (streak 기계 부재 사실) | §0 전제 4, §1, §6 사실 확인 보강 |
