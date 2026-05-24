---
작성일: 2026-05-24
Intent: marketing-15
Mode: 내부 기획 L1
Status: draft
Owner: Marketer (Planner/Developer/Operator 관점 종합)
---

# Virtue 웹/iOS 활성화 이벤트 패리티 브리프

## §0 목적 + 전제

### 목적

Virtue는 웹(`apps/web`)과 iOS(`apps/ios`) 두 클라이언트가 **같은 PostHog 프로젝트로, 같은 이름의 이벤트**(`deed_judged`, `deed_saved` 등)를 보낸다. 같은 이름이라 대시보드에서 하나의 펀넬로 합쳐 보이지만, **발화 위치·발화 조건·속성·식별자가 플랫폼마다 다르다.** 이 차이를 모르고 합산하면, 출시 후 PostHog 리뷰에서 "활성화가 낮다"가 **진짜 활성화 문제**인지 **플랫폼 계측 불일치(measurement drift)**인지 구분할 수 없다.

이 브리프는 그 둘을 **미리 분리해 두는 렌즈**다. 두 시점에 쓰인다.

1. **첫 10~20명 사람 관찰** 단계 — 관찰자가 "이 사용자는 웹인가 iOS인가, 그래서 어떤 이벤트가 애초에 안 뜨는 게 정상인가"를 알고 행을 채울 수 있게 한다.
2. **출시 후 첫 PostHog 리뷰** 단계 — 펀넬 숫자를 보기 전에 "이 단계의 빈칸이 사용자 행동의 부재인지, 그 플랫폼이 그 이벤트를 안 보내서인지"를 먼저 갈라낸다.

선행 문서들이 활성화를 **잡(JTBD)·사다리(setup→aha→habit)·time gap·관찰 행 양식**으로 이미 정의했다. 본 문서는 그 정의를 **하나도 바꾸지 않고**, 그 위에 **"같은 활성화 이벤트가 두 플랫폼에서 같게 관측되는가"라는 패리티 렌즈만** 새로 얹는다. 정의를 바꾸면 충돌이다.

### 전제 (못박기)

1. **관찰 보조 렌즈이지 성패 채점이 아니다.** prelaunch이므로 본 문서는 어떤 플랫폼의 어떤 이벤트 비율도 "좋다/나쁘다"로 판정하지 않는다. 패리티 차이를 *드러내 기록*할 뿐, "iOS가 웹보다 활성화가 낮다" 같은 결론을 내리지 않는다(§5 해석 금지선).
2. **신규 0.** 신규 트래킹·이벤트·속성·코드·대시보드·플래그·비용을 단 하나도 만들지 않는다. 본 문서는 **현재 양 플랫폼 코드에 이미 발화 중인 이벤트의 사실(발화 위치/속성)을 read-only로 기록**할 뿐이며, 패리티 격차를 "메우는" 코드 변경을 제안하지 않는다(메우는 일은 별도 Intent 후보).
3. **외부 액션 0.** 외부 발송·공개 모집·인터뷰 요청을 0건 수행한다. 본 문서는 내부 계측 정합성 렌즈에 한정된다.

## §1 왜 "같은 이벤트 이름"이 정합성을 보장하지 않는가

웹과 iOS는 의도적으로 이벤트 이름을 같게 맞췄다(iOS `Analytics.swift` 주석: "이름은 웹과 동일하게 유지 — distinct_id가 달라도 대시보드에서 같은 펀넬로 본다"). 이름을 맞추는 것은 옳은 선택이지만, 이름이 같다고 **세 가지**까지 같아지는 것은 아니다.

1. **발화 위치/조건이 다르다.** 웹 `deed_judge_attempted`의 `has_photo`는 실제 첨부 여부(`!!file`)지만, iOS는 사진 필수 플로우라 항상 `true`(상수)다. 같은 속성명이 한쪽은 *관찰값*, 한쪽은 *상수*다.
2. **속성 집합이 다르다.** 웹 `deed_saved`는 12속성(레벨업·누적·태그·재시도 포함), iOS는 3속성(`score`/`source`/`tone`)뿐이다. 속성 기반 세분화는 웹에서만 가능하다.
3. **존재 자체가 다르다.** `add_flow_started`·`level_up_viewed`는 웹에만 있다. iOS에서 이 이벤트가 0인 것은 "사용자가 안 했다"가 아니라 "그 플랫폼이 안 보낸다"이다.

소표본(첫 10~20명)에서는 이 세 차이가 퍼센트보다 큰 왜곡을 만든다. 그래서 펀넬을 합산해 보기 전에 본 브리프로 "어디가 구조적으로 비대칭인가"를 먼저 고정한다.

## §2 이벤트 발화 위치 패리티 표

> 검증 게이트 `rg 'posthog.capture|Analytics.capture' apps/web/src apps/ios/Sources -S` 결과와 1:1 대응한다. 자동 이벤트(`$pageview`/`$screen` 등)는 rg에 잡히지 않으므로 §8에서 보조 신호로 분리해 다룬다.

| 이벤트명 | 웹 (file:line + 속성) | iOS (file:line + 속성) | 비고 |
|---|---|---|---|
| `add_flow_started` | `add/page.tsx:72` `{scoring_mode}` | — | 웹 전용 (퍼널 진입) |
| `add_flow_abandoned` | `add/page.tsx:78` `{had_photo, had_memo, had_judgment}` | — | 웹 전용 (이탈) |
| `deed_judge_attempted` | `add/page.tsx:135` `{has_photo(=!!file), has_memo, memo_length(=trim), tone, scoring_mode(=IS_AI_MODE?"ai":"mock")}` | `AddDeedView.swift:91` `{has_photo(=true 상수), has_memo, memo_length(=memo.count), tone, scoring_mode(="ai" 상수)}` | 속성명 동일, 의미 다름 (델타 3·11) |
| `deed_judged` | `add/page.tsx:106` `{score, source, fallback_reason(??null), model(??null), has_photo(=!!file), tone, memo_length(=trim), retry_count, duration_ms}` (9속성) | `AddDeedView.swift:103` `{score, source, model(??""), has_photo(=true 상수), tone, memo_length(=memo.count), duration_ms}` (7속성) | 웹 9 vs iOS 7 (델타 4) |
| `deed_rerolled` | `add/page.tsx:149` `{reroll_number, rerolls_left}` | — | 웹 전용 (델타 6) |
| `deed_save_capped` | `add/page.tsx:167` `{score, today_total}` | — | 웹 전용 (일일 상한) (델타 6) |
| `deed_saved` | `add/page.tsx:183` `{score, source, fallback_reason(??null), tags, tag_count, has_photo(=!!preview), tone, memo_length(=trim), retry_count, level_up, new_species(??null), total_after}` (12속성) | `AddDeedView.swift:136` `{score, source, tone}` (3속성) | **핵심 비대칭** (델타 1) |
| `level_up_viewed` | `add/page.tsx:199` `{species, stage}` | — | 웹 전용 (델타 2) |
| `score_fallback_shown` | — | `AddDeedView.swift:113` `{source, model(??"")}` | iOS 전용 명명 이벤트 (델타 7) |
| `deed_judge_failed` | — | `AddDeedView.swift:120` `{message}` | iOS 전용 명명 이벤트 (델타 7) |
| `data_exported` | `me/page.tsx:39` `{}` | — | 웹 전용 설정 이벤트 (델타 8) |
| `data_cleared` | `me/page.tsx:53` `{}` | — | 웹 전용 설정 이벤트 (델타 8) |
| `tone_changed` | `me/page.tsx:92` `{tone}` | — | 웹 전용 설정 이벤트 (델타 8) |
| `daily_cap_toggled` | `me/page.tsx:122` `{enabled}` | — | 웹 전용 설정 이벤트 (델타 8) |
| `theme_changed` | `me/page.tsx:150` `{theme}` | — | 웹 전용 설정 이벤트 (델타 8) |

**rg에 함께 잡히지만 명명 capture가 아닌 줄 (활성화 이벤트에서 제외):**

- `add/page.tsx:122` `posthog.captureException(err, {flow:"deed-judge", has_photo, tone})` — deed-judge 실패 시 `$exception`으로 적재. **`capture`가 아니라 `captureException`.** (`posthog.capture` 패턴에 부분 매칭되어 rg 출력에 나타남.)
- `error.tsx:15` `posthog.captureException(error, {...})` — 전역 에러 바운더리.
- iOS의 동일 시점 오류 처리는 명명 이벤트 `deed_judge_failed`(:120)로 발화 → **같은 실패 상황이 웹=`$exception` vs iOS=명명 이벤트로 갈라진다** (델타 7 연장).

## §3 이벤트 속성 차이 — "같은 이름, 다른 의미" 델타

분석가가 두 플랫폼을 나란히 두고 오판하지 않도록, 같은 이름이 다른 모양·의미로 쓰이는 지점을 전부 나열한다.

1. **`deed_saved` 12 vs 3 (최대 함정).** 웹은 12속성으로 레벨업(`level_up`)·누적(`total_after`)·태그(`tags`/`tag_count`)·재시도(`retry_count`)·fallback(`fallback_reason`)을 한 번에 싣는다. iOS는 `score`/`source`/`tone` 3속성뿐. **저장 수(count)만 플랫폼 비교 가능, 속성 기반 비교는 웹 단독.**
2. **`level_up_viewed`는 웹 전용 + iOS엔 단서조차 없음.** iOS는 `level_up_viewed`를 발화하지 않을 뿐 아니라 `deed_saved`에 `level_up` 플래그도 없다 → iOS는 레벨업 발생 여부를 이벤트로 전혀 알 수 없다. "레벨업 = aha moment" 가설은 **iOS 데이터로 검증 불가.**
3. **`deed_judge_attempted` — 속성명 동일, 값의 출처 다름.** 웹 `has_photo=!!file`(실제 첨부 여부), iOS `has_photo=true`(상수, 사진 필수 플로우). 웹 `scoring_mode=IS_AI_MODE?"ai":"mock"`(실제 모드), iOS `scoring_mode="ai"`(상수). **iOS의 `has_photo`/`scoring_mode`로 세분화하면 의미 없는 단일 버킷.**
4. **`deed_judged` — 웹에만 `fallback_reason`·`retry_count`.** iOS는 fallback 사유를 별도 이벤트(`score_fallback_shown`)로 분리하고, retry 개념 자체가 없다. `has_photo`는 iOS에서 항상 true(상수). **판정 품질 분석 시 retry/fallback은 웹 단독 신호.**
5. **퍼널 비대칭.** 웹 퍼널: `add_flow_started`(:72) → `deed_judge_attempted` → `deed_judged` → `deed_saved`(+이탈 시 `add_flow_abandoned`). iOS는 진입/이탈 이벤트가 없어 **퍼널이 `deed_judge_attempted`에서 시작.** 동일 funnel step 수로 두 플랫폼을 나란히 그리면 iOS 첫 단계가 인위적으로 높아 보인다(상단 단계 부재).
6. **`deed_rerolled`·`deed_save_capped` 웹 전용.** 리롤 행동·일일 상한 도달은 iOS에서 관측 불가.
7. **`score_fallback_shown`·`deed_judge_failed` iOS 전용 명명 이벤트.** 웹은 fallback을 `deed_judged.fallback_reason`으로 흡수, 오류는 `captureException`(`$exception`). → **fallback/오류율 비교는 이벤트 이름이 달라 자동 집계 불가**, 플랫폼별로 다른 쿼리가 필요하다.
8. **설정 이벤트 5종 웹 전용** (`data_exported`/`data_cleared`/`tone_changed`/`daily_cap_toggled`/`theme_changed`). iOS는 설정 행동 텔레메트리가 전무하다.
9. **null vs `""` (필터 동작 함정).** 웹은 `model ?? null`, `fallback_reason ?? null` → PostHog "is set" 필터에서 **빠진다.** iOS는 `model ?? ""` → 빈 문자열도 **"is set"으로 잡힌다.** 같은 "모델 없음" 상태가 웹=null(미설정)/iOS=`""`(설정됨)로 갈려 모델 채택률·결측 분석을 왜곡한다.
10. **`platform` super-property 비대칭.** iOS만 `Analytics.swift:23 register(["platform":"ios"])` → 모든 iOS 이벤트에 `platform=ios`. 웹은 super-property 등록이 없어(rg에 `register`/`platform` 미존재) 웹 이벤트는 `platform` **미설정(unset).**
11. **`memo_length` 측정 기준 차이.** 웹은 `memo.trim().length`(앞뒤 공백 제외), iOS는 `memo.count`(공백 포함). 공백만 입력하면 웹=0/iOS>0. `memo_length`로 "메모 작성 여부"를 추론하면 iOS가 과대 집계된다.

## §4 J1~J4 활성화 후보 이벤트 묶음 × 플랫폼 관측 가능성

### 왜 단일 magic 이벤트가 아니라 묶음인가

PostHog "WTF is activation"의 원칙을 계승한다: **활성화는 단일 magic 이벤트가 아니라, 검증 가능한 3~5개 이벤트의 묶음(set)** 이다. 출시 후 각 묶음이 장기 리텐션과 얼마나 상관되는지를 *비교*해 후보 중 하나를 고르는 것이지, 지금 한 이벤트를 활성화로 못박는 것이 아니다. **Virtue는 prelaunch이므로 어떤 묶음도 "활성화 정의 확정"이 아니라 "검증 대상 후보 가설"로만 둔다.** 리텐션 상관 주장은 §5에서 강하게 보류한다.

형제 문서(`first-session-jtbd-matrix.md`, `first-week-activation-retention-bridge.md`)의 J1~J4 잡 정의와 first/second value 매핑을 **그대로 계승**하며 재정의하지 않는다. 본 절은 그 위에 "어떤 이벤트 묶음으로 관찰할 후보를 둘 것인가 + 웹/iOS에서 그 묶음이 동일하게 관찰되는가"라는 **패리티 렌즈만** 더한다.

### J1~J4 활성화 후보 이벤트 묶음 표

aha 후보는 **시작 이벤트가 아니라 완료 이벤트를 우선**한다(시작은 의도, 완료는 가치 도달).

| 잡 | aha 후보 (완료 이벤트 우선) | habit 후보 | 묶음 구성 (3~5개) | 웹 가용 | iOS 가용 / 대체 |
|---|---|---|---|---|---|
| **J1 기록형**<br>"방금 한 일을 남겼다" 즉시 만족 | 첫 `deed_saved` (저장 완료 = 잡 닫힘) | 7일 내 2번째 `deed_saved` | `add_flow_started` → `deed_judged` → `deed_saved` → 7일 내 2nd `deed_saved` | 전부 가용 | **부분 가용.** `deed_judged`·`deed_saved` 가용. **`add_flow_started` 없음 → 진입 신호 결손, 묶음을 3개(judged→saved→2nd saved)로 축소.** "진입했는데 저장 안 함"의 시작점을 동일 이벤트로 못 봄 |
| **J2 누적형**<br>"쌓였다" 누적감 | 첫 `deed_saved`(총합 증가) + 보조 `level_up_viewed` | 7일 내 2번째 `deed_saved` + `level_up_viewed` 재도달 | `deed_saved`(총합↑) → `level_up_viewed`(누적 가시화) → 7일 내 2nd `deed_saved` → 2nd `level_up_viewed` | 전부 가용 | **결정적 비대칭.** `deed_saved`만 가용. **`level_up_viewed` iOS 없음 → J2 핵심 누적/진화 신호를 iOS에서 동일 이벤트로 관찰 불가**(대체 없음). iOS `deed_saved` 속성이 3개뿐이라 `total_after`·`tags` 기반 누적 묶음 자체가 불가 → iOS J2는 `deed_saved` 단독으로 쪼그라들어 J1과 사실상 구분 불가 |
| **J3 AI 호기심형**<br>"AI가 내 행동을 이렇게 봤구나" | 첫 `deed_judged` (저장 전이라도 닫힘) | 7일 내 2번째 `deed_judged` 또는 `deed_saved` | `deed_judge_attempted` → `deed_judged`(채점 완료 = 가치) → (선택)`deed_rerolled` → 7일 내 2nd `deed_judged` | 전부 가용 | **부분 가용 — 가장 잘 따라감.** `deed_judge_attempted`·`deed_judged` 둘 다 가용(iOS 핵심 aha 보유). **`deed_rerolled` iOS 없음**(보조라 영향 작음). iOS는 `score_fallback_shown`·`deed_judge_failed`로 채점 실패/대체 경로 관찰은 오히려 더 풍부 |
| **J4 회고형**<br>"나중에 돌아볼 게 생겼다" 지연 가치 | 첫 `deed_saved` (돌아볼 항목 생성) | 7일 내 2번째 `deed_saved` | `add_flow_started` → `deed_judged` → `deed_saved` → 7일 내 2nd `deed_saved` | 전부 가용 | **부분 가용.** J1과 동일 비대칭(`add_flow_started` 없음). 회고의 진짜 검증(덕행록 재방문)은 첫 세션 밖이라 두 플랫폼 모두 본 묶음 범위 밖 |

**패리티 결론(한 줄):** J3가 웹/iOS 가장 대칭(핵심 aha `deed_judged`를 양쪽 보유), **J2가 가장 비대칭**(`level_up_viewed` 부재 + `deed_saved` 속성 3개 한계로 누적 신호를 iOS에서 동일 이벤트로 잴 수 없음), J1·J4는 `add_flow_started` 부재로 진입 퍼널만 비대칭.

### 묶음 설계 원칙

1. **단일 `deed_saved`로 고정하지 않는다.** 같은 `deed_saved`라도 J1(즉시 만족)·J2(누적감)·J4(지연 가치)는 가치 방향이 다르다(형제 문서 계승). 한 이벤트로 못박으면 잡 차이가 뭉개진다.
2. **시작보다 완료 이벤트를 우선한다.** aha 후보는 `add_flow_started`(시작=의도)가 아니라 `deed_judged`/`deed_saved`(완료=가치 도달)로 잡는다.
3. **자동 발화 screen/lifecycle은 핵심 묶음에서 제외, 보조로만.** 화면 조회·앱 포그라운드는 "잡을 해냈다"를 증명하지 못한다. 핵심 묶음은 사용자가 의도적으로 만든 완료 이벤트로만 구성한다.
4. **클라이언트 이벤트는 누락될 수 있어 따로 검증한다.** 웹·iOS 모두 네트워크·앱 종료·차단으로 빠질 수 있다. 묶음 비교 전에 각 핵심 이벤트가 실제 도착하는지부터 확인한다.
5. **웹/iOS 최소 공약수를 먼저 고정한다.** 공통 명명 이벤트 `deed_judge_attempted`·`deed_judged`·`deed_saved` 3종을 **공통 기준 묶음**으로 세우고, 웹 전용(`level_up_viewed`·`add_flow_started`·`deed_rerolled`·`deed_save_capped`)은 *웹 한정 확장 신호*로만 얹는다. 웹 전용 신호의 부재를 두 플랫폼 공통 결론에 섞지 않는다.

## §5 prelaunch 해석 금지선

표본이 첫 10~20명이고 prelaunch인 동안, 위 묶음은 **검증 대상 후보일 뿐 합격선이 아니다.** 형제 문서(`first-week-activation-retention-bridge.md` §5, `first-session-jtbd-matrix.md` 전제, `activation-milestone-ladder.md` §4)의 금지선을 계승해 아래는 *아직 판정하지 않는다*.

- **리텐션 상관·전환율을 평가하지 않는다.** 어떤 묶음이 리텐션과 상관된다는 주장은 prelaunch에서 금지다. 묶음 간 우열을 매기지 않으며, 묶음 도달률을 activation rate로 환산해 좋다/나쁘다를 선언하지 않는다.
- **작은 표본에서는 퍼센트보다 사례 분류를 본다.** "묶음 도달 3명"을 도달률(%)로 바꿔 읽지 않는다. 한 자릿수~수십 명에서는 "누가 어떤 상황에서 어디까지 갔나"를 사례 단위로 분류하는 것이 더 정직하다.
- **"플랫폼 계측 불일치"를 "활성화 문제"로 오판하지 않는다 (가장 중요).** iOS의 setup·level_up 빈칸은 사용자 미도달이 아니라 **이벤트 미발화**다 — iOS에서 J2 누적/습관 신호가 안 보이는 것은 사용자 행동 문제가 아니라 `level_up_viewed`가 iOS에 없다는 계측 부재이고, iOS 진입 퍼널이 안 잡히는 것은 이탈이 아니라 `add_flow_started` 부재다. 계측 비대칭으로 생긴 "신호 없음"을 잡 실패·온보딩 실패로 읽으면 잘못된 개선 방향(예: 멀쩡한 iOS J2 UX를 고치려는 시도)으로 끌려간다. **신호가 안 보이면 먼저 "그 이벤트가 그 플랫폼에 존재하는가"부터 확인한다(§7 결정 트리).**
- **묶음은 가설일 뿐 합격선이 아니다.** 본 문서의 어떤 묶음도 "달성 시 활성화 성공"이라는 임계값이 아니다. 출시 후 실제 데이터로 묶음 간 리텐션 상관을 *비교*하기 전까지, 묶음은 관찰 렌즈에 머문다.
- (계승) **judged−saved 갭을 곧장 이탈로 읽지 않는다.** J3는 저장 없이 `deed_judged`에서 정상 종료할 수 있다.
- (계승) **외부 벤치마크 임계값(예: 40%)을 prelaunch에 적용하지 않는다.** B2B/PLG 벤치마크는 방향 참고점일 뿐 첫 10~20명의 합격선이 아니다.

## §6 출시 후 첫 검증 게이트

### 트리거 조건

| 항목 | 값 |
|---|---|
| 발동 조건 | **실제 사용자 10명 도달** OR **출시 후 7일 경과** — 둘 중 먼저 오는 쪽 |
| 표본 성격 | 소표본 / 통계적 유의성 없음 (전환율 평가 불가) |
| 게이트 목적 | 플랫폼별 add→judge→save 경로의 **이벤트 누락·불일치 발견** 전용 |

### 게이트에서 하는 일 / 안 하는 일

| 한다 (✓) | 안 한다 (✗) |
|---|---|
| 각 단계 이벤트가 PostHog에 **도착하는지** 확인 | 전환율(judge→save 등) 수치 평가 |
| 플랫폼별 super-property로 **분리 가능한지** 확인 | 단계 간 drop-off 좋고 나쁨 판정 |
| 속성 모양(키/타입/기본값)이 명세와 일치하는지 확인 | 활성화 성공/실패 결론 |
| 누락·불일치를 이슈로 기록 | 코호트/리텐션 분석 |

> 원칙: 이 게이트는 **"계측이 믿을 만한가"**만 본다. 숫자가 좋은지 나쁜지는 다음 성장 리뷰(충분 표본 확보 후)로 보류한다. 펀넬을 플랫폼 합산으로 보기 전, `platform`으로 web/iOS를 먼저 분리한다 — 분리 없이 합산한 setup→aha 전환율은 iOS의 `add_flow_started` 부재 때문에 구조적으로 왜곡된다.

### 플랫폼별 단계별 점검 체크리스트

**웹 핵심 퍼널**

| 단계 | 이벤트 | 점검 | 비고 |
|---|---|---|---|
| 진입 | `add_flow_started` | 이벤트 도착 | 이탈 관찰: `add_flow_abandoned` |
| 판정 시도 | `deed_judge_attempted` | 이벤트 도착 | |
| 판정 결과 | `deed_judged` | 도착 + `fallback_reason`/`retry_count` 속성 존재 | `model` 기본값 `null` |
| 저장 | `deed_saved` | 도착 + 12속성 모양 | |
| 보상 | `level_up_viewed` | 발생 시 도착 | 조건부(레벨업 시만) |

**iOS 핵심 퍼널**

| 단계 | 이벤트 | 점검 | 비고 |
|---|---|---|---|
| 판정 시도 | `deed_judge_attempted` | 도착 + `platform=ios` super-property 부착 | |
| 판정 결과 | `deed_judged` | 도착 + 7속성(웹 `fallback_reason`/`retry_count` **없음**) | `model` 기본값 `""` |
| 저장 | `deed_saved` | 도착 + 3속성(웹 12속성과 다름 — 정상) | |
| 실패/폴백 | `score_fallback_shown` / `deed_judge_failed` | 발생 시 도착 | 보조 신호 |
| (부재) | `add_flow_started` / `add_flow_abandoned` / `level_up_viewed` | **점검 대상 아님 — 웹 전용, iOS 미구현이 정상** | |

> 플랫폼 분리 필터: iOS는 `platform = ios`, 웹은 `platform`이 unset. 분리가 애매하면 `$lib`(웹 `posthog-js` / iOS `posthog-ios`)로 교차 확인.

## §7 "계측 불일치 vs 활성화 문제" 판별 절차

소표본에서 특정 단계 신호가 안 보일 때, **사용자 행동 문제로 단정하기 전에** 아래 순서로 계측 원인을 먼저 배제한다.

```
신호가 기대보다 적거나 0이다
│
├─ (a) 이 이벤트가 해당 플랫폼에 "존재"하는가?
│     └─ 아니오 → 계측 부재(설계상 미구현). 행동 문제 아님. [종료]
│         예) iOS에서 level_up_viewed=0, add_flow_started=0 → 웹 전용. iOS 미발화가 정상.
│     └─ 예 ↓
│
├─ (b) 이벤트는 오는데 속성이 비거나 모양이 다른가?
│     └─ 예 → 속성 모양 차이 가능성.
│         · 웹 deed_saved 12속성 vs iOS 3속성 → 명세대로면 정상
│         · model 기본값 웹 null / iOS "" → 빈 값이 아니라 "기본값"
│         · deed_judged fallback_reason/retry_count → iOS엔 없음(정상)
│         → 명세와 대조해 "정상 차이"면 종료, 아니면 계측 버그 이슈화. [종료]
│     └─ 아니오 ↓
│
├─ (c) 분리 필터(platform)가 잘못 잡혔는가?
│     └─ platform=ios로 필터 시 0인데 전체로는 보임
│         → super-property 미등록/세션 초기화 순서 문제 의심. $lib(posthog-ios)로 교차 확인.
│         → 필터 문제면 대시보드 정정. [종료]
│     └─ 아니오 ↓
│
└─ (d) 위 셋 모두 배제됨 → 비로소 "진짜 사용자 행동"으로 해석 가능
        (단, 소표본이므로 전환율 결론은 여전히 보류)
```

| 관찰 | 1차 결론 | 근거 |
|---|---|---|
| iOS `level_up_viewed` = 0 | (a) 계측 부재 — 행동 문제 아님 | iOS 미구현(웹 전용) |
| iOS `add_flow_started` = 0 | (a) 계측 부재 — 진입은 다른 신호로 | iOS는 `deed_judge_attempted`가 퍼널 첫 단계 |
| iOS `deed_saved` 속성 3개뿐 | (b) 정상 차이 | 웹 12 vs iOS 3 명세대로 |
| `platform=ios` 필터 시 모든 이벤트 0 | (c) 분리 필터/super-property 문제 의심 | `register(["platform":"ios"])` 부착 시점 확인 |
| 웹 `deed_judged`는 오는데 `deed_saved`만 급감 | (d) 행동 후보 — 단, 소표본 보류 | (a)(b)(c) 배제 후에만 |

## §8 코드 근거 · 플랫폼 분리 · 재검증 명령

### 자동 이벤트는 보조 신호로만 (핵심 묶음 제외)

- 웹(`instrumentation-client.ts`, `defaults: "2026-01-30"`): `$pageview`/`$pageleave`/`$autocapture` 자동, `capture_exceptions: true`로 `$exception`.
- iOS(`Analytics.swift`, `captureScreenViews`/`captureApplicationLifecycleEvents = true`): `$screen`/`Application Opened` 등 자동, `sessionReplay = false`.
- **어휘가 다르다**(`$pageview` ≠ `$screen`, `$autocapture`는 iOS 없음) → 자동 이벤트로 플랫폼 간 "방문/세션"을 직접 비교하지 않는다. 활성화 정의는 반드시 **명명 이벤트**(§2 표) 기준.

### 웹 vs iOS 구분 방법 (우선순위)

1. `platform = ios`(iOS 전 이벤트) vs `platform` **unset**(웹) — 가장 신뢰 가능. 단 "웹 = unset"이라는 음의 정의에 의존하므로, 향후 다른 플랫폼이 `platform`을 등록하면 웹 정의가 오염된다.
2. 보조로 PostHog 자동 속성 `$lib`(웹 `posthog-js` 계열 vs iOS `posthog-ios`)로 교차 검증.

### 재검증 명령 (출시 후 / 코드 변경 후 표 갱신 루틴)

```bash
# 1) 활성화 이벤트 capture 호출 전수 추출
rg 'posthog.capture|Analytics.capture' apps/web/src apps/ios/Sources -S

# 2) iOS platform super-property 등록 확인
rg 'register' apps/ios/Sources/Core/Services/Analytics.swift -n
```

대조 절차: ① 출력의 이벤트 목록과 §2 표를 1:1 매칭 → ② 코드에만/표에만 있는 이벤트를 차이로 기록 → ③ 신규/삭제 발견 시 표 갱신 후 변경 사유를 1줄 첨부.

**작성 시점 대조 결과 — 일치 확인**

| 코드(rg 결과) | 문서 표 | 상태 |
|---|---|---|
| 웹: `add_flow_started`/`add_flow_abandoned`/`deed_judge_attempted`/`deed_judged`/`deed_rerolled`/`deed_save_capped`/`deed_saved`/`level_up_viewed` (+ me 설정 5종, captureException 2건) | §2 표에 전부 반영 | 일치 |
| iOS: `deed_judge_attempted`/`deed_judged`/`score_fallback_shown`/`deed_judge_failed`/`deed_saved` | §2 표 반영, `add_*`/`level_up` 부재 명시 | 일치 |
| iOS `register(["platform": "ios"])` (`Analytics.swift:23`) | `platform=ios` 분리 전제 | 일치 |

## §9 선행 문서 계승 / 재정의 금지

아래 "소유 문서"의 정의는 본 문서에서 한 글자도 바꾸지 않는다. 본 문서가 새로 하는 단 하나는 이 정의들을 **"두 플랫폼에서 같게 관측되는가"라는 패리티 축으로 교차**시키는 것뿐이다.

| 정의 항목 | 소유 문서 (Single Source) | 본 문서의 취급 |
|---|---|---|
| J1~J4 잡 정의 + 풀 진술 | `first-session-jtbd-matrix.md` | 그대로 인용. 라벨·진술 재정의 금지 |
| 잡별 활성화 이벤트 귀속 (J1/J2/J4=`deed_saved`, J3=`deed_judged`, J2 보조=`level_up_viewed`) | `first-session-jtbd-matrix.md` / `activation-milestone-ladder.md` | 계승. 본 문서는 이 귀속이 **플랫폼별로 관측 가능한지**만 덧댐(§4) |
| setup→aha→habit 사다리 | `activation-milestone-ladder.md` | 계승. 사다리 단 재정의 금지 |
| first value → 7일 내 second value 연결 | `first-week-activation-retention-bridge.md` | 계승. 연결 정의 재정의 금지 |
| time gap 계산 기준 | `time-to-value-observation-brief.md` | 전적으로 위임. 계산식 재작성 안 함 |
| 첫 10~20명 한 명당 한 행 기입 양식 | `first-real-user-baseline-template.md` / `first-week-activation-retention-bridge.md` | 양식 계승. 본 문서는 행에 **`platform` 식별 칸을 명시 분리**할 것을 권고만 함 |
| prelaunch 작은 표본 해석 금지선 | `activation-milestone-ladder.md` / `pmf-response-analysis-rubric.md` | 계승. 본 문서는 **플랫폼 비교 한정 금지 항목만** 추가(§5) |

## §10 Out of scope (변경 0건)

- **코드·계측 변경 0건.** 본 문서는 read-only 기록이다. iOS에 `add_flow_started`/`level_up_viewed`를 추가하거나 `deed_saved` 속성을 웹과 맞추는 등 패리티를 "메우는" 작업은 본 문서 범위 밖이며, 필요 시 별도 Intent로 분리한다.
- **PostHog 설정·대시보드 0건.** 펀넬/인사이트/대시보드 생성, 트래킹 옵션 변경을 하지 않는다.
- **외부 발송·모집·비용 0건.**

본 문서 작성이 위 경계를 지켰음을 검증하는 절차:

```bash
git diff --stat -- apps/web/src apps/ios/Sources   # 출력 없어야 함
git status --short                                  # 코드 변경 없음
rg '<<<<<<<|=======|>>>>>>>' apps/web/docs/ios-activation-event-parity-brief.md   # 충돌 마커 0
```

## 부록: 성공기준 완성도 체크리스트

| # | 성공기준 (marketing-15) | 충족 섹션 | 완성도 |
|---|---|---|---|
| 1 | 웹/iOS 이벤트 발화 위치 | §2 발화 위치 패리티 표 (web file:line ↔ iOS file:line) + §8 | ✅ |
| 2 | 속성 차이 | §2·§3 "같은 이름, 다른 의미" 델타 (web only / iOS only / 모양 차이 / `platform` 유무) | ✅ |
| 3 | J1-J4 활성화 후보 묶음 | §4 J1~J4 × 플랫폼 관측 가능성 (선행 귀속 계승) | ✅ |
| 4 | prelaunch 해석 금지선 | §0 전제 ①, §5 금지선, §7 판별 절차 | ✅ |
| 5 | 출시 후 첫 검증 게이트 | §6 출시 후 첫 검증 게이트 (10명 OR 7일) | ✅ |
