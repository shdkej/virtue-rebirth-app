---
작성일: 2026-05-27
Intent: marketing-22
Mode: 내부 기획 L1
Status: draft
Owner: Marketer (Planner/Developer/Operator 관점 포함)
---

# Virtue 리텐션 예측 활성화 브리프

## §0 목적 + 전제

### 목적

정식 출시 전 첫 10~20명을 관찰할 때, **첫 행동(intent click)** 과 **리텐션을 예측할 가능성이 있는 first value/depth signal** 을 한 언어로 분리해 적는다. 이 분리가 없으면 "들어왔다(`add_flow_started`)" 같은 진입 클릭을 활성화로 오인하거나, 단발 클릭의 비율을 리텐션 신호로 과대 해석하기 쉽다. 본 브리프는 그 경계를 못박고, 잡(J1~J4)별로 무엇이 first value이고 무엇이 깊이(depth) 신호인지, 그리고 D7에 무엇을 **질문으로** 손기록할지 한 장으로 정리한다.

출처 노트(`source/external-links/marketing/2026-05-27-retention-predictive-activation.md`)의 핵심 관점을 그대로 깐다.

- 좋은 활성화 지표는 클릭 수 같은 vanity가 아니라 **장기 리텐션과 상관되는 가치 경험**이다(Amplitude / Lenny Distilled).
- **D7 복귀는 장기 리텐션의 조기 신호가 될 수 있으나, 외부 벤치마크 수치를 그대로 베껴 prelaunch 합격선으로 쓰지 않는다.** 첫 10~20명은 수치 판정이 아니라 사례 손기록 대상이다.
- 활성화 정의는 가입/로그인/첫 클릭이 아니라 **제품 핵심 가치가 실제로 경험된 행동**이어야 한다. Virtue에서는 "판정을 봄"과 "저장/반복/누적 가치를 얻음"을 잡별로 분리해야 한다.

### 선행 문서 역할 분리 (계승, 재정의 금지)

본 브리프는 새 정의를 만들지 않는다. 아래 선행 문서를 **분리 렌즈**로만 재합성한다. 정의를 바꾸면 충돌이다(§8 점검).

| 문서 | 본 브리프가 계승하는 것 |
|---|---|
| `first-session-jtbd-matrix.md` (m06) | J1~J4 잡 정의, J1/J2/J4=`deed_saved`·J3=`deed_judged` 매핑 |
| `activation-milestone-ladder.md` (m09) | setup → aha → habit 사다리. setup=진입 의도, aha=first value, habit=반복 |
| `seven-day-deed-loop.md` (m03) | `deed_saved` 중심 루프, judged−saved 갭 해석 주의 |
| `first-week-activation-retention-bridge.md` (m14) | first value → 7일 내 second value(재가치) 연결, 503=관찰 차단 경계 |
| `add-input-output-balance-audit.md` (m21) | J3 저장 전 정상 종료, `deed_judged`(:106)가 `deed_saved`(:183)보다 항상 먼저 발화 |
| `first-real-user-baseline-template.md` (m11) | 첫 10~20명 한 명당 한 행 기입 양식 |

### 전제 (못박기)

1. **관찰 기록부지 채점표가 아니다.** prelaunch이므로 어떤 값도 "좋다/나쁘다"로 판정하지 않는다. 본 브리프는 무엇을 어떻게 분리해 적을지를 정할 뿐이다.
2. **신규 0.** 신규 이벤트·속성·코드·카피·대시보드·플래그·세션리플레이를 단 하나도 만들지 않는다. 이미 발화 중인 기존 이벤트(`add_flow_started`, `deed_judged`, `deed_saved`, `level_up_viewed`, 보조 `deed_rerolled`, `deed_save_capped`)만 인용한다(§7 사실 확인).
3. **외부 액션 0.** 외부 발송·공개 모집·인터뷰 요청·광고를 0건 수행한다. 본 브리프는 내부 관찰 렌즈에 한정된다.

## §1 왜 첫 행동이 아니라 리텐션 예측 first value인가 (vanity 분리)

Amplitude의 2025 Product Benchmark 분석과 Lenny Distilled의 활성화 메모가 공통으로 말하는 것은, **높고 쉬운 지표(가입률, 첫 클릭률)보다 낮고 엄격하지만 장기 리텐션과 강하게 연결되는 지표가 더 낫다**는 것이다. Snyk 사례처럼, "도구를 켰다"나 "취약점을 봤다"가 아니라 실제 핵심 가치인 "취약점을 고쳤다"가 활성화에 가깝다. Virtue로 번역하면 "입력 플로우에 들어왔다"가 아니라 "자기 잡의 가치를 경험했고, 그 가치가 다시 돌아왔다"가 활성화다.

그래서 `add_flow_started`는 **의도(intent)·첫 행동 신호이지 리텐션 예측 활성화가 아니다.** 이것은 사다리의 setup 칸이다(activation-milestone-ladder §3 계승) — 가치를 받을 자리에 섰다는 뜻이지, 가치를 경험했다는 뜻이 아니다. 첫 행동 클릭 수나 그 비율을 활성화·리텐션 지표로 승격하면 vanity에 끌려간다. 첫 행동은 first value까지의 거리를 줄이는 감사에는 쓰되(add-input-output-balance-audit 계승), 성공 지표로 올리지 않는다.

D7 복귀에 대해서도 같은 절제가 필요하다. D7 재방문은 장기 리텐션의 조기 신호가 될 가능성이 있지만, 외부 벤치마크의 절대 수치(예: 특정 % 리텐션 룰)를 그대로 베껴 prelaunch 합격선으로 거는 순간 작은 표본을 과대 해석하게 된다. 첫 10~20명에서 D7는 비율이 아니라 **"같은 잡의 가치가 D7에 한 번 더 닿았는가"를 사례로 손기록하는 질문**으로 다룬다(§5).

- Amplitude, "The 7% Retention Rule Explained": https://amplitude.com/blog/7-percent-retention-rule
- Lenny Distilled, "The best activation metrics correlate with long-term retention, not vanity metrics": https://www.lennydistilled.com/growth/activation-onboarding/the-best-activation-metrics-correlate-with-long-term-retenti/

## §2 세 층 분리표 — 첫 행동 vs first value vs depth signal (심장 1)

활성화를 한 점으로 보지 않고 세 층으로 분리한다. 각 층은 리텐션 예측력이 다르므로 같은 관찰표에서도 다른 칸에 적는다.

| 층 | 무엇인가 | Virtue 신호(기존 이벤트) | 리텐션 예측력 | 관찰 시 주의 |
|---|---|---|---|---|
| **첫 행동 (intent)** | 입력 플로우에 진입, "하러 왔다"는 의도 | `add_flow_started` (`add/page.tsx:72`) | **낮음.** vanity 위험. 단독으로는 활성화 아님 | 비율을 활성화/리텐션 지표로 승격 금지 |
| **first value (aha)** | 자기 잡의 핵심 가치를 처음 경험 | J1·J2·J4 = `deed_saved` (`:183`) / J3 = `deed_judged` (`:106`, 저장 전) | **중간.** 활성화가 닫히는 점이나, 1회로는 리텐션 미확정 | 잡별로 닫히는 이벤트가 다름(§3) |
| **retention-predictive depth signal** | 가치가 한 번을 넘어 "다시·더"로 이어진 신호 | 반복 `deed_saved`, `level_up_viewed` (`:199`), `deed_rerolled` (`:149`), D7 내 second value | **높을 가능성.** 단 작은 표본에선 비율이 아니라 정성으로 본다 | 1회 관찰로 리텐션 확보 단정 금지(§4·§6) |

**핵심:** 첫 행동 → first value → depth는 시간순 층이지 통과 관문이 아니다. J3처럼 first value(`deed_judged`)에서 잡이 충족되어 저장 없이 자연 종료하는 경로도 정상이다(add-input-output-balance-audit의 `J3 저장 전 정상 종료` 계승). prelaunch에서는 어느 층의 도달도 성패가 아니라 "그 사람이 어디까지 왔는가"의 관찰값이다.

## §3 J1~J4별 first value × retention-predictive depth signal × D7 재가치 질문 (심장 2)

행은 네 잡. first value는 선행 문서에서 계승하며 재정의하지 않는다. depth signal과 D7 재가치 질문은 본 브리프가 분리해 더하는 관찰 렌즈다.

| 잡 | first value (aha 이벤트) | retention-predictive depth signal | D7 재가치 질문 (손기록, 숫자 아님) | 기존 이벤트 증거 |
|---|---|---|---|---|
| **J1 기록형** | 첫 `deed_saved` — "방금 한 일을 남겼다"는 즉시 만족 | 7일 내 반복 `deed_saved` — "또 남길 수 있다"가 확인됨 | "D7에 다시 들어와 한 번 더 남겼는가? 그게 처음과 같은 '남긴다' 가치였는가?" | `deed_saved` `:183` |
| **J2 누적형** | 첫 `deed_saved` — 총합 증가로 "쌓였다"는 누적감 | 반복 `deed_saved` + `level_up_viewed`(환생종 변화 도달) — "누적 payoff를 알아차렸는가" | "D7에 누적이 한 번 더 보였는가? 환생종 진행(다음 단계)을 알아차렸는가?" | `deed_saved` `:183`, `level_up_viewed` `:199` |
| **J3 AI 호기심형** | 첫 `deed_judged` — "AI가 내 행동을 이렇게 봤구나" (저장 전 닫힘, 저장은 선택) | 반복 `deed_judged` + `deed_rerolled`("다르게 보면?") **또는** 저장 전환 | "D7에 다시 판정을 보러 왔는가? 다르게 보고 싶었는가, 이번엔 저장으로 이어졌는가?" | `deed_judged` `:106`, `deed_rerolled` `:149` |
| **J4 회고형** | 첫 `deed_saved` — "나중에 돌아볼 게 생겼다"는 지연 가치 | 반복 `deed_saved`(로그가 쌓임). 덕행록 재방문은 첫 주 밖이라 본 브리프 depth엔 미포함 | "D7에 또 항목을 남겼는가? '쌓이면 로그가 된다'를 확인했는가?" | `deed_saved` `:183` |

**보충 메모 (셀이 좁을 때만)**

- **같은 `deed_saved`라도 depth의 가치 방향이 다르다.** J1 즉시 만족 / J2 누적감 / J4 지연 가치. 이벤트가 같다고 같은 재가치로 묶지 않는다(first-week-bridge §2 계승).
- **J3는 저장 없이 `deed_judged`를 반복해도 정상 depth다.** J3의 depth는 "반복 저장"이 아니라 "반복 판정/리롤"로 읽는다. 다른 잡 기준(`deed_saved`)으로 J3을 합산하면 활성화·depth를 과소 측정한다(activation-milestone-ladder §2 계승).
- **D7 재가치 질문은 점수표가 아니라 손기록 질문이다.** "닿았다/미관찰/추정"으로만 적고, 닿았다고 리텐션 확보로 확정하지 않는다(§6).

## §4 작은 표본에서 depth signal을 읽는 법

첫 10~20명에서 depth signal은 **비율이 아니라 정성으로** 읽는다. 한 명의 행이 비율을 크게 흔들기 때문이다.

- **`level_up_viewed`는 도달률(%)이 아니라 정성 메모와 함께 본다.** "환생종 변화에 닿은 사람 N%"가 아니라 "이 사람이 누적 payoff를 알아차렸는가"를 적는다. 첫 주에 레벨업에 닿지 않았다고 누적 가치가 없다고 보지 않는다.
- **depth는 D0의 단일 클릭이 아니라 "다시·더"의 신호다.** 한 번의 `deed_saved`/`deed_judged`는 first value지 depth가 아니다. depth는 반복·재방문·재판정에서 처음 보인다.
- **availability ≠ value.** 503·심한 채점 지연·30덕 상한 차단(`deed_save_capped` `:167`은 발화 후 early return으로 저장 미발화) 구간은 depth 관찰에서 **제외(availability-blocked)** 한다. 가용성 때문에 신호가 안 뜬 것을 depth 부재로 읽지 않는다(first-week-bridge §6 계승).

## §5 D7 재가치 질문 — 손기록 관찰 질문 5선 (숫자 아님)

D7 재방문은 리텐션 조기 신호일 수 있으나 prelaunch에서 수치로 판정하지 않는다. 대신 첫 10~20명 각각에 대해 아래 **질문에 손으로 답을 적는다.** 잡별 D7 질문은 §3을 따르고, 아래는 잡 무관 공통 5선이다. 모두 baseline 양식(`first-real-user-baseline-template.md`)과 first-week-bridge §3 행에 **이미 있는 칸을 재사용**하며, 새 표를 만들지 않는다.

1. **D0 first value** — 첫 세션에서 자기 잡의 first value(잡별 §3)에 닿았는가? (이벤트 + 시각, 없으면 "미관찰")
2. **D7 return** — 7일 안에 다시 들어왔는가? 들어왔다면 그 이유를 **본인 표현 그대로** 적는다(모르면 "미확인", 짐작이면 "(추정)").
3. **D7 second value evidence** — 다시 들어와 같은 잡의 가치를 한 번 더 느낀 증거가 있는가? (잡별 depth 이벤트 + 정성 메모)
4. **same-job continuity** — D0의 잡과 D7의 잡이 같은가, 갈렸는가? (예: J3로 들어와 D7엔 J1으로 갈림)
5. **source promise fit** — 유입 문장(약속)과 D7 재가치가 같은 결인가? "AI가 점수 매겨준대"로 온 사람이 D7에 판정을 다시 보러 왔는지 등.

> 작성 원칙: 이 다섯 답은 **사람이 손으로** 적는다. 자동 집계·대시보드·알림을 만들지 않는다. 칸은 이미 선행 양식에 있으므로 신규 컬럼 추가도 본 브리프 범위 밖이다(필요 시 별도 Intent에서 검토).

## §6 prelaunch 해석 금지선

선행 `activation-milestone-ladder.md` §4, `first-week-activation-retention-bridge.md` §5, `pmf-response-analysis-rubric.md`의 작은 표본 금지선을 계승하고, 본 브리프 특화 항목을 더한다. 아래는 **아직 판정하지 않는다.**

- **D7 수치를 외부 벤치마크로 베끼지 않는다.** 특정 % 리텐션 룰·40% 임계값 등 외부 기준을 prelaunch 첫 10~20명의 합격선으로 적용하지 않는다.
- **첫 행동(`add_flow_started`)을 활성화·리텐션 지표로 승격하지 않는다.** intent 클릭(수·비율)은 vanity 위험이 있어 단독으로 활성화가 아니다.
- **전환율·리텐션율·PMF·% 산출을 하지 않는다.** n<20에서 first value 도달률, D7 second value 도달률, depth 비율 어느 것도 채점하지 않는다.
- **judged−saved 갭을 곧장 이탈로 단정하지 않는다.** J3는 저장 없이 `deed_judged`에서 가치를 얻고 정상 종료할 수 있다. 갭은 이탈이 아니라 잡 차이일 수 있다.
- **availability ≠ value.** 503·채점 지연·상한 차단 구간은 first value/depth 집계에서 제외하고, 신호 부재를 가치 부재로 읽지 않는다.
- **한 명의 강한 신호를 제품 방향으로 확정하지 않는다.** 표본이 작을수록 한 명의 인상적 경험·막힘이 과대평가된다. 기록하되 방향 근거로 굳히지 않는다.
- **단계·층 도달을 세그먼트 크기로 읽지 않는다.** "depth 3명"을 J2 세그먼트 규모로 해석하지 않는다.
- **depth signal 1회 관찰로 리텐션 확보를 단정하지 않는다.** D7 재가치가 한 번 보였어도 "리텐션 확보"로 확정하지 않는다(관찰값일 뿐).
- **synthetic/mock·내부/QA 트래픽은 제외한다.** 임시 판정(mock 모드)·데모 시드·반복 점검·더미 입력은 삭제하지 않고 표시 후 집계 제외한다(first-week-bridge §7 계승).
- **변경 금지.** 코드·카피·이벤트·속성·대시보드·세션리플레이·배포·외부 발송·비용·시크릿·권한·개인정보 변경 0.

## §7 기존 이벤트 증거 (발화 위치, 사실 확인)

본 브리프가 인용하는 모든 신호는 `apps/web/src/app/add/page.tsx`에 **이미 발화 중인 기존 이벤트**다. 신규 구현 0건. 아래 라인은 Developer 렌즈 read-only 검증 결과이며, 선행 문서(`activation-milestone-ladder.md` §3, `first-week-activation-retention-bridge.md` §9)와 드리프트 0.

| 이벤트 | 발화 위치 | 발화 시점 | 본 브리프에서의 층 |
|---|---|---|---|
| `add_flow_started` | `add/page.tsx:72` | `/add` 마운트 시 1회(`useEffect([])`) — 첫 입력이 아니라 진입 시점 | 첫 행동(intent) |
| `deed_judged` | `add/page.tsx:106` | 채점 성공 직후, **저장과 독립·저장 전** 발화 | first value (J3) |
| `deed_rerolled` | `add/page.tsx:149` | "한 번 더" 클릭(재채점 한도 내, 최대 3회) | depth (J3 호기심) |
| `deed_save_capped` | `add/page.tsx:167` | 30덕 상한 초과 시 발화 후 **저장 중단(early return)** | availability-blocked(저장 미발화) |
| `deed_saved` | `add/page.tsx:183` | 저장 실행(`addDeed`) 후 발화 | first value (J1/J2/J4) + depth(반복) |
| `level_up_viewed` | `add/page.tsx:199` | `deed_saved` 직후 환생종 stage 상승 시에만 | depth (J2 누적 보조) |

> 주의: `deed_save_capped`가 발생한 시도는 early return으로 그 시도의 `deed_saved`/`level_up_viewed`를 발화하지 않는다. depth(반복 저장) 카운팅 시 캡 차단 시도는 저장으로 집계되지 않는다.

## §8 충돌 점검 (no-conflict)

| 대상 문서 | 충돌 여부 | 근거 |
|---|---|---|
| `first-session-jtbd-matrix.md` | 없음 | J1~J4 잡 정의와 J1/J2/J4=`deed_saved`·J3=`deed_judged` 매핑을 그대로 계승. 재정의 0 |
| `activation-milestone-ladder.md` | 없음 | setup(첫 행동)→aha(first value)→habit(depth) 사다리를 층 분리에 계승. 이벤트 귀속·prelaunch 금지선 동일 |
| `seven-day-deed-loop.md` | 없음 | `deed_saved` 중심 루프와 judged−saved 갭 해석 주의를 계승. 신규 이벤트 0 |
| `first-week-activation-retention-bridge.md` | 없음 | first value→second value(7일 내 재가치) 연결과 503=관찰 차단 경계를 계승. D7 질문은 동 문서 §3 칸 재사용 |
| `add-input-output-balance-audit.md` | 없음 | `J3 저장 전 정상 종료`, `deed_judged`(:106)가 `deed_saved`(:183)보다 항상 먼저 발화를 계승 |
| `first-real-user-baseline-template.md` | 없음 | 첫 10~20명 한 명당 한 행 양식을 재사용. 신규 컬럼 추가 0 |
| `time-to-value-observation-brief.md` | 없음 | time gap 계산은 전적으로 위임. 본 브리프는 계산식을 다시 쓰지 않음 |
| `copy-spec.md` (금지어) | 없음 | 사용자 노출 카피 0건. 금지어 미사용. 본 브리프는 내부 관찰 렌즈이며 화면 문구를 새로 정의하지 않음 |

## §9 검증 매핑

| 성공 기준 (marketing-22) | 충족 섹션 |
|---|---|
| 첫 행동 vs 리텐션 예측 first value/depth 분리 | §1, §2 (세 층 분리표) |
| J1~J4별 first value | §3 (심장 표) "first value" 컬럼 |
| retention-predictive depth signal | §2, §3 "depth signal" 컬럼, §4 |
| D7 재가치 질문 | §3 "D7 재가치 질문" 컬럼, §5 (공통 5선) |
| 기존 이벤트 증거 | §7 (코드 근거 표, 신규 0) |
| prelaunch 해석 금지선 | §0 전제, §6 |
| 필수 문자열(`deed_judged`/`deed_saved`/`level_up_viewed`/`D7`/`prelaunch`) | §2·§3·§7(이벤트), §1·§5·§6(D7), §0·§1·§6(prelaunch) |
| 선행 문서 충돌 0 | §8 (no-conflict) |

## Out of scope

본 Intent(marketing-22)로 수행하지 않으며, 각각 별도 Intent에서 결정한다.

- 코드/카피/런타임 변경 **0건** — 산출물은 docs 1파일뿐이다.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·대시보드·세션리플레이 없음. 첫 10~20명 양식에 컬럼 추가도 하지 않는다(D7 칸은 기존 양식 재사용).
- 외부 발송·공개 모집 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고 없음.
- 배포·CI·권한·시크릿·비용·개인정보 변경 **0건**.
- 첫 10~20명을 **전환율·리텐션율·PMF·세그먼트·D7 % 로 판정하는 일 0건** — n<20 표본은 관찰 대상이지 채점 대상이 아니다.
