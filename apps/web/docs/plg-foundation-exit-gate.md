---
작성일: 2026-06-02
Intent: marketing-34
Mode: 내부 기획 L1/L2
Status: complete
Owner: Marketer (Planner / Developer / Operator 관점 종합)
---

# Virtue PLG Foundation 단계 종료 게이트 (Foundation Exit Gate)

## §0 목적 + 전제

### 목적

PLG Handbook의 단계 모델은 PLG를 한 번에 다 고치는 작업이 아니라 **Foundation → Activation → Conversion** 순서로 다루라고 한다. 이때 **Foundation 단계의 종료 조건은 "활성화가 좋다"가 아니라 "활성화율과 기준선을 측정할 수 있는 상태"** 다. 즉 Foundation 종료는 *측정 가능성*의 문제이지 *측정값의 성패*가 아니다.

Virtue에는 이미 first value, 활성화 후보 등록부, 기준선, TTV, D7/리텐션 문서가 쌓여 있다. 문서가 많아질수록 출시 후 첫 데이터가 들어왔을 때 "어느 문서를 기준으로 다음 단계로 넘어갈지"가 흐려질 위험이 커진다. 본 게이트는 그 위험을 줄인다 — 개선 아이디어를 더 만드는 것이 아니라, **출시 전에는 어떤 조건이 갖춰져야 Foundation을 닫고 Activation 최적화로 넘어갈 수 있는지**를 한 장으로 고정한다.

본 게이트는 **readiness 체크리스트지 채점표가 아니다.** 각 게이트 항목은 "측정할 수 있는가"만 확인하고, "측정값이 좋은가/나쁜가"는 판정하지 않는다(§4 금지선).

### 전제 (못박기)

1. **재정의 0.** first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`), 잡 정의, 후보 묶음·window, TTV 계산 틀, D7 질문은 선행 문서가 소유한다. 본 게이트는 그 위에 *단계 게이트(phase gate)* 렌즈만 더한다(§5 충돌 점검).
2. **신규 0.** 신규 이벤트·속성·코드·카피·대시보드·플래그·세션리플레이를 하나도 만들지 않는다. 이미 발화 중인 기존 6개 이벤트만 인용한다(§6 사실 확인).
3. **외부 0.** 외부 발송·공개 모집·인터뷰 요청·광고·비용 0건. 본 게이트는 내부 단계 판단 렌즈다.
4. **외부 벤치마크 ≠ 합격선.** 출처노트의 PLG Handbook / Time to Value / ProductLed 벤치마크 글은 *순서와 절제*의 방향 참고일 뿐, TTV<5분·D7 N% 같은 외부 수치를 Virtue의 통과/탈락 임계값으로 복사하지 않는다(§4).

## §1 왜 단계 게이트인가 — 측정 가능 상태 vs 활성화 성패

prelaunch에서 가장 흔한 오류는 두 가지를 섞는 것이다.

- **(a) 측정 가능 상태:** 잡별 first value가 무엇이고, 어떤 이벤트 묶음을 어떤 시간창에서 손기록하며, 무엇을 트래픽에서 제외하는지가 *정의되어 있는가*.
- **(b) 측정값의 성패:** 그 지표가 *좋은가/나쁜가*, 활성화율이 합격선을 넘었는가.

Foundation 단계가 닫혀야 하는 조건은 (a)뿐이다. (b)는 충분한 실사용 데이터가 생긴 뒤, Activation 단계에서 다룰 문제다. 첫 10~20명·D7 작은 표본으로 (b)를 결론지으면 같은 작은 표본을 과대 해석하게 된다. 따라서 본 게이트는 **"무엇을 측정할 수 있게 준비됐는가"만 확인하고, 활성화 성패는 의도적으로 보류**한다.

세스 고딘식으로 말하면, 작은 오디언스에게 약속을 던지기 전에 필요한 것은 더 많은 렌즈가 아니라 "그 약속이 실제 경험으로 이어졌는지 보는 한 문장"이다. Virtue의 현재 위험은 약속 부재가 아니라, 첫 데이터가 생겼을 때 과하게 많은 렌즈로 같은 표본을 해석하는 것이다.

## §2 Foundation 종료 게이트 (이 문서의 심장)

각 행은 Foundation을 닫기 위해 *측정 가능 상태*로 준비돼야 할 항목이다. "충족 상태"는 합격/불합격이 아니라 **준비됨(문서로 정의 완료) / 출시 후 확인 대기(발화는 되나 도착·분류는 데이터 필요)** 두 값만 쓴다.

| 게이트 | 측정 가능성 (Foundation에서 확인할 것) | 소유 문서 (Single Source) | 충족 상태 | 금지 — 이걸로 판정하지 않는다 |
|---|---|---|---|---|
| **G1 first value 정의** | J1/J2/J4=`deed_saved`, J3=`deed_judged`가 잡별로 고정돼 있는가 | `first-session-jtbd-matrix.md` (m06) | **준비됨** | first value *도달률*을 Foundation 종료 조건으로 쓰지 않음 |
| **G2 후보 묶음 + window 등록** | A1~A4 후보 묶음과 W-IMM/W-CONF 시간창이 사후 선택 방지용으로 등록돼 있는가 | `activation-candidate-registry.md` (m33) | **준비됨** | 묶음 도달을 activation rate로 환산·우열 비교하지 않음 |
| **G3 TTV 시작/종료점 정의** | 잡별 first value time·second value gap의 시작점(`add_flow_started`)과 종료점이 정의돼 있는가 | `time-to-value-observation-brief.md` (m10) | **준비됨** | TTV 수치를 외부 벤치마크(예: <5분)와 대조해 합격선화하지 않음 |
| **G4 D7 재가치 질문 정의** | "7일 안에 같은 잡 가치가 한 번 더 닿았는가"가 비율이 아닌 손기록 질문으로 정의돼 있는가 | `retention-predictive-activation-brief.md` (m22) · `first-week-activation-retention-bridge.md` (m14) | **준비됨** | D7 복귀를 외부 리텐션 % 룰로 판정하지 않음 |
| **G5 기준선 기입 양식** | 첫 10~20명을 한 명당 한 행으로 손기록할 양식이 있는가 | `first-real-user-baseline-template.md` (m11) | **준비됨** | 작은 표본 한 행을 conversion/retention/PMF로 승격하지 않음 |
| **G6 최소 이벤트 발화 + 도착 검증** | 6개 핵심 이벤트가 *발화*되며, 출시 후 PostHog에 *도착*하는지 확인할 절차가 있는가 | §6 발화 위치 · `ios-activation-event-parity-brief.md` (m15, 플랫폼 패리티) | **출시 후 확인 대기** (발화는 준비됨, 도착·플랫폼 비교는 m33 §4 / m15 §6 게이트) | 도착 미확인 상태의 비율을 활성화로 읽지 않음 |
| **G7 트래픽 분리 + 가용성 제외** | 사람/메이커 self-test/synthetic·mock을 분리하고, 503·judge 지연·`deed_save_capped`(availability) 구간을 window에서 제외할 규칙이 있는가 | `traffic-source-reading-boundary-table.md` (m25) · m33 §3 | **준비됨** | 분리·제외 전 합산 신호를 활성화/리텐션으로 읽지 않음 |

> **게이트 판독 핵심:** ① Foundation 종료는 G1~G7가 "측정 *가능* 상태"로 준비됐는지만 본다 — 대부분 선행 문서로 이미 충족, **G6의 도착 검증만 출시 후 확인 대기**다. ② 어느 항목도 "수치가 좋아야 통과"가 아니다. ③ 본 게이트는 새 정의를 0개 만들고 선행 문서를 *집계*만 한다.

## §3 Foundation → Activation 진입 경계 (아직 넘지 않는 선)

본 게이트는 두 단계를 명확히 분리한다.

| 단계 전이 | 조건 | 본 게이트의 취급 |
|---|---|---|
| **Foundation 종료** | §2의 G1~G7가 측정 가능 상태로 준비됨 (G6 도착 검증은 출시 후) | 본 문서가 그 체크리스트를 제공 |
| **Activation 진입** | 충분한 데이터로 등록 후보를 *대조*할 수 있고, 데이터 품질이 확보됨 | **별도 결정** — 본 게이트는 진입을 선언하지 않고 입력만 정의 |

Activation 단계 진입 판단의 게이트는 **외부 벤치마크 수치가 아니라** 다음 네 가지다(출처노트 후속 실험 ③과 정렬).

1. **데이터 품질** — 6개 이벤트가 실제 도착하며 결손이 적은가(G6).
2. **synthetic 제외** — mock 폴백("임시 판정")·데모 시드(641덕)·메이커 self-test가 분리됐는가(G7).
3. **가용성 차단 여부** — 503·judge 지연·`deed_save_capped` 구간이 window에서 제외됐는가(G7).
4. **같은 잡의 재가치** — D7 안에 같은 잡 가치가 한 번 더 닿은 *사례*가 손기록됐는가(G4).

> 위 진입 판단의 발동 시점(실제 사용자 10명 OR 출시 후 7일)과 등록 ID별 도착 점검은 **`activation-candidate-registry.md` §4 출시 후 검증 게이트에 위임**한다. 본 게이트는 그 게이트를 *Activation 진입의 입력*으로 참조할 뿐 재정의하지 않는다. 즉 m33 §4 = "등록 후보를 데이터로 대조 가능한가"(데이터 쪽 게이트), 본 §3 = "그래서 Foundation을 닫고 Activation 단계로 넘어갈 수 있는가"(단계 쪽 게이트)다.

## §4 prelaunch 해석 금지선 (do-not-infer)

- **측정 가능 = Foundation 종료. 측정값이 좋음 ≠ Foundation 종료.** 둘을 섞지 않는다(§1).
- **외부 벤치마크 수치를 Virtue 합격선으로 쓰지 않는다.** TTV<5분·D7 N%·activation 40% 같은 수치는 방향 참고일 뿐 첫 10~20명의 통과/탈락 임계값이 아니다.
- **작은 표본·synthetic·mock·self-test는 decision-grade 지표가 아니다.** mock 폴백·데모 시드·메이커 테스트는 사람 활성화에 섞지 않고 표시 후 제외(삭제 아님)한다.
- **judged−saved 갭을 이탈로 단정하지 않는다.** J3(A3)는 `deed_judged`에서 가치를 얻고 저장 없이 정상 종료할 수 있다.
- **`deed_save_capped`는 availability/friction이지 가치·리텐션·upgrade demand가 아니다.** 30덕 상한 early return으로 `deed_saved`가 미발화하는 가용성 신호이며, 유료 수요로 환산하지 않는다.
- **`add_flow_started`(진입/의도)를 활성화로 승격하지 않는다.** 클릭 수·진입 비율은 vanity다.
- **한 명의 강한 신호를 단계 전이 근거로 확정하지 않는다.** 표본이 작을수록 한 명의 인상이 과대평가된다.
- **변경 0.** 코드·카피·이벤트·속성·대시보드·세션리플레이·배포·외부 발송·비용·시크릿·권한·개인정보 변경 0건.

## §5 선행 문서 계승 / 충돌 점검 (no-conflict)

아래 "소유 문서"의 정의는 본 게이트에서 한 글자도 바꾸지 않는다. 본 문서가 새로 하는 단 하나는 그 정의들을 **"Foundation 종료 = 측정 가능 상태"라는 단계 게이트로 집계**하는 것이다.

| 정의 항목 | 소유 문서 (Single Source) | 본 게이트의 취급 | 충돌 |
|---|---|---|---|
| 잡 정의 + first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`) | `first-session-jtbd-matrix.md` (m06) | G1로 계승·인용. 재정의 0 | 없음 |
| 후보 묶음(A1~A4) + window(W-IMM/W-CONF) 등록, 출시 후 검증 게이트 | `activation-candidate-registry.md` (m33) | G2·§3 진입 게이트 입력으로 계승. m33 §4는 위임 | 없음 |
| TTV 시작/종료점, time gap 계산 | `time-to-value-observation-brief.md` (m10) | G3로 계승. 계산식 위임 | 없음 |
| 첫 행동 vs first value vs depth 3층, D7 재가치 질문 | `retention-predictive-activation-brief.md` (m22) · `first-week-activation-retention-bridge.md` (m14) | G4로 계승. D7 질문 원문 위임 | 없음 |
| activation/TTV/drop-off/retention 운영 리듬, immediate vs long-term TTV | `onboarding-metrics-reading-table.md` (m23) | §3 운영 리듬·window 정렬 근거로 계승. 위임 | 없음 |
| 첫 10~20명 1인 1행 기입 양식 | `first-real-user-baseline-template.md` (m11) | G5로 계승. 새 표·컬럼 0 | 없음 |
| 사람/test/synthetic 트래픽 분리, availability≠value | `traffic-source-reading-boundary-table.md` (m25) · m33 §3 | G7로 계승. 재정의 0 | 없음 |
| 플랫폼 패리티(웹/iOS 이벤트 비대칭) | `ios-activation-event-parity-brief.md` (m15) | G6 도착 검증의 플랫폼 분리는 m15에 위임 | 없음 |
| 사용자 노출 카피 금지어 | `copy-spec.md` | 사용자 노출 카피 0건. 인용한 "임시 판정"은 현재 코드 그대로의 단서 | 없음 |

## §6 기존 이벤트 증거 (발화 위치, read-only 사실 확인)

본 게이트가 인용하는 모든 신호는 `apps/web/src/app/add/page.tsx`에 **이미 발화 중인 기존 6개 이벤트**다. 신규 구현 0건. 아래 라인은 read-only 검증 결과이며 선행 문서(m33 §7 등)와 drift 0.

| 이벤트 | 발화 위치 | 발화 시점 | 본 게이트에서의 역할 |
|---|---|---|---|
| `add_flow_started` | `add/page.tsx:72` | `/add` 마운트 시 1회 | G3 TTV 시작점 · 의도 신호(활성화 아님) |
| `deed_judged` | `add/page.tsx:106` | 채점 성공 직후, 저장과 독립·저장 전 | G1 J3 first value · G6 핵심 이벤트 |
| `deed_rerolled` | `add/page.tsx:149` | "한 번 더" 클릭(최대 3회) | A3 호기심 depth(이탈 아님) |
| `deed_save_capped` | `add/page.tsx:167` | 30덕 상한 초과 시 발화 후 저장 중단(early return) | G7 availability-blocked(window 제외) |
| `deed_saved` | `add/page.tsx:183` | 저장 실행 후 발화 | G1 J1/J2/J4 first value · G6 핵심 이벤트 |
| `level_up_viewed` | `add/page.tsx:199` | `deed_saved` 직후 환생종 stage 상승 시에만 | A2 누적 재가치 보조(첫 세션 보통 부재) |

> 보조 사실: 같은 파일에 `add_flow_abandoned`(:78), `deed_judge_attempted`(:135)도 발화 중이나, 본 게이트는 요청된 6개 이벤트에 한정하며 새 이벤트를 제안하지 않는다.

## §7 Out of scope (변경 0건)

본 Intent(marketing-34)로 수행하지 않으며, 각각 별도 Intent에서 결정한다.

- 코드/카피/런타임 변경 **0건** — 산출물은 docs 1파일뿐이다.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·대시보드·세션리플레이 없음.
- 외부 발송·공개 모집 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고 없음.
- 배포·CI·권한·시크릿·비용·개인정보 변경 **0건**.
- 첫 10~20명 또는 synthetic/small sample을 **activation rate·전환율·리텐션율·PMF·세그먼트로 판정하는 일 0건**.
- **Activation 단계 진입 선언 0건** — 본 게이트는 진입 *조건*만 정의하고, 진입 자체는 데이터 확보 후 별도 결정이다.

본 문서 작성이 위 경계를 지켰음을 검증하는 절차:

```bash
git diff --stat -- apps/web/src apps/ios/Sources   # 출력 없어야 함 (코드 변경 0)
git status --short                                  # docs 1파일만
rg '<<<<<<<|=======|>>>>>>>' apps/web/docs/plg-foundation-exit-gate.md   # 충돌 마커 0
rg 'posthog.capture\(' apps/web/src/app/add/page.tsx -n   # 6개 이벤트 발화 위치 재확인
```

## 부록: 성공기준 완성도 체크리스트

| # | 성공기준 (marketing-34) | 충족 섹션 | 완성도 |
|---|---|---|---|
| 1 | `apps/web/docs/`에 Foundation exit gate 한 장 추가 | 본 문서 | ✅ |
| 2 | 기존 first value/활성화 등록부/baseline/TTV/D7·retention 문서만 인용 | §2 게이트 · §5 충돌 점검 | ✅ |
| 3 | 신규 이벤트·속성·카피·계측·대시보드 0 | §0 전제2 · §6 · §7 | ✅ |
| 4 | 외부 벤치마크 수치를 Virtue 합격선으로 쓰지 않음 | §0 전제4 · §4 금지선 | ✅ |
| 5 | first value 매핑·`deed_save_capped`=availability·J3 정상 종료·작은 표본 비-결정성 계승 | §1 · §4 · §5 | ✅ |
| 6 | Foundation 종료 vs Activation 진입 분리 | §1 · §3 | ✅ |
