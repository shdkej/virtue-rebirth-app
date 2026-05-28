---
작성일: 2026-05-28
Intent: marketing-25
Mode: 내부 기획/운영 L1
Status: draft
Owner: Workflow-Master (Planner / Developer / Marketer / Operator 4역할 합성)
---

# Virtue human/test/agent 트래픽 판독 경계표

## §0 목적 + 전제

### 목적

정식 출시 전 첫 10~20명을 관찰하고 출시 직후 첫 PostHog 리뷰를 볼 때, **누가/무엇이 만든 트래픽인지를 먼저 가른 뒤에만** activation 신호를 읽기 위한 경계표다. 같은 `deed_saved`·`deed_judged` 숫자라도 그것을 만든 주체가 **사람 실사용 / 메이커 self-test / synthetic·mock / 다른 플랫폼 / 장래 agent·API** 중 무엇이냐에 따라 의미가 다르다. 이 다섯을 한 aggregate에 섞으면 사람 온보딩 문제가 좋아 보이거나 나빠 보인다(출처 노트 핵심).

목표는 두 가지다.

1. **첫 10~20명 baseline 신뢰 보존** — 메이커 테스트·mock·데모 시드·반복 방문이 섞여 baseline 원장이 오염되지 않게 한다.
2. **aggregate PostHog activation 과대해석 방지** — 분류 전 숫자를 활성화 성패로 읽지 않는다.

출처 노트(`source/external-links/marketing/2026-05-28-human-agent-onboarding-metrics.md`, Userpilot 2026·Appcues 2026 온보딩 지표 가이드)의 핵심을 Virtue prelaunch 기준으로 번역한다.

- 고신호 지표는 여전히 TTV·activation·D1/D7 retention이지만, prelaunch에서는 외부 벤치마크보다 **자기 baseline·cohort·출처(source) 선명도**가 먼저다.
- aggregate activation rate는 사람·테스트·agent·API·플랫폼 차이가 섞이면 빠르게 오염된다. 분리하지 않으면 인간 온보딩 진단이 흐려진다.
- AI agent의 activation은 환영 화면이나 투어가 아니라 **첫 의미 있는 작업을 오류 없이 완료**했는지에 가깝고, agent retention은 agent의 재방문이 아니라 **그 agent를 설정한 사람이 계속 호출·결과를 사용**하는지로 읽어야 한다.

### 선행 문서 역할 분리 (계승, 재정의 금지)

본 경계표는 새 정의를 만들지 않는다. 아래 선행 문서의 정의를 **트래픽 출처 축으로 교차**시킬 뿐이다. 정의를 바꾸면 충돌이다(§7 점검).

| 문서 | 본 경계표가 계승하는 것 | 본 경계표가 위임하는 것 |
|---|---|---|
| `first-session-jtbd-matrix.md` (m06) | J1~J4 잡 정의, J1/J2/J4 = `deed_saved` · J3 = `deed_judged` first-value 매핑 | 잡 자체의 정의·근거 |
| `onboarding-metrics-reading-table.md` (m23) | 잡별 activation·TTV·drop-off·D1/D7·synthetic 제외를 묶은 운영 판독표 | 잡 축(J1~J4)의 운영 리듬 |
| `ios-activation-event-parity-brief.md` (m15) | 웹/iOS 같은 이름·다른 의미 델타, `platform` 분리, 계측 부재≠행동 부재, 출시 후 첫 검증 게이트 | 플랫폼 패리티 표·델타 원장·결정 트리 |
| `first-60-second-value-observation-script.md` (m20) | mock/데모 시드(641)/메이커 self-test/localStorage 반복 등 synthetic·test 단서 | 현장 60초 시계 메커닉 |
| `first-real-user-baseline-template.md` (m11) | 첫 10~20명 1인 1행 양식, test/synthetic 표시 후 제외 원칙 | per-user 행 컬럼 원장 |

### 전제 (못박기)

1. **분류 보조 렌즈이지 성패 채점이 아니다.** prelaunch이므로 어떤 트래픽 종류의 어떤 이벤트 수도 "좋다/나쁘다"로 판정하지 않는다. 본 경계표는 무엇을 어떤 판독 규칙으로 분리해 읽고 무엇을 읽지 않을지를 정할 뿐이다(§5 금지선).
2. **신규 0.** 신규 이벤트·속성·코드·카피·대시보드·플래그·세션리플레이·세그먼트 정의를 단 하나도 만들지 않는다. 이미 발화 중인 기존 이벤트(`add_flow_started`, `deed_judged`, `deed_saved`, `level_up_viewed`, 보조 `deed_rerolled`, `deed_save_capped`)만 인용한다(§8 사실 확인).
3. **외부 액션 0.** 외부 발송·공개 모집·인터뷰 요청·광고를 0건 수행한다.
4. **agent/API는 아직 표면이 없다.** Virtue에는 현재 agent/API 진입 표면과 그 계측이 존재하지 않는다. 본 문서의 agent/API 칸(§2 5행, §6)은 표면이 생길 때를 위한 **경계 제안(proposal-only)** 일 뿐 구현·계측·대시보드가 아니다.

## §1 왜 트래픽을 섞으면 안 되는가

선행 문서들은 활성화를 **잡 축(m06·m23)** 과 **플랫폼 축(m15)** 으로 이미 잘게 분리했다. 남은 위험은 세 번째 축이다: 같은 이벤트를 **누가/무엇이** 만들었는가. prelaunch의 운영 기본값이 mock 채점이고(`apps/web/.env.example` `NEXT_PUBLIC_SCORING_MODE=mock`), 데모 시드·메이커 self-test·localStorage 누적이 같은 화면에 섞이며, 웹/iOS가 같은 이름의 이벤트를 다른 모양으로 보내고, 장래에 agent/API 호출이 더해지면, `deed_judged`·`deed_saved`·`level_up_viewed`의 의미가 흐려진다.

출처 노트의 표현대로, "누가 사용자인가"를 흐리게 둔 숫자는 고객의 언어가 아니라 대시보드의 소음을 듣는 것이다. 작은 오디언스일수록 더 많은 트래픽이 아니라 **더 선명한 분류**가 먼저다. 본 경계표는 그 분류를 한 장에 고정해, 분류가 끝나기 전에는 activation 칸을 읽지 않도록 만든다.

## §2 트래픽 판독 경계표 (이 문서의 심장)

행은 다섯 트래픽 종류. 한 행을 가로로 읽으면 그 트래픽의 **식별 단서 → 기존 이벤트에 어떻게 나타나는가 → 사람 activation과 같은 판독 규칙인가 → 집계 처리(포함/표시 후 제외/별도 판독) → 해석 금지선** 이 한 번에 보인다. first value는 선행 문서에서 계승하며 재정의하지 않는다(§4).

| 트래픽 종류 | 식별 단서 (read-only) | 기존 이벤트에 어떻게 나타나는가 | 사람 activation과 같은 판독 규칙인가 | 집계 처리 | 해석 금지선 (do-not-read) |
|---|---|---|---|---|---|
| **A. 사람 실사용**<br>(human real-use) | 빈 스토어에서 시작(612덕 + "아직 비어있어요. 오늘 1덕만 시작해볼까요?" `page.tsx:66-68`), mock 배지·"임시 판정" 없음(실 AI 판정), 내부 계정·QA 아님 | 6개 이벤트가 의도대로 발화 = **baseline 신호의 기준선** | **예 — 기준선 그 자체.** J1/J2/J4 = 첫 `deed_saved`, J3 = 첫 `deed_judged`(저장 전 닫힘) 적용(§4 계승) | baseline 원장 **본행으로 포함** | 한 명의 강한 신호를 제품 방향으로 확정 금지, n<20을 %·전환율로 환산 금지(§5) |
| **B. 메이커 self-test**<br>(maker self-test) | 본인·팀 내부 계정, 같은 화면 의도적 왕복·디버그 진입, 더미 입력("test"/"asdf"/"ㅁㄴㅇㄹ"/의미 없는 한 글자), localStorage 누적이 남은 같은 기기 반복 | 같은 6개 이벤트가 발화하지만 **의도가 검증·디버그** → 사람 가치 증거 아님 | **아니오 — 가치 증거로 읽지 않음** | 행은 남기되(삭제 아님) **"test (제외)" 표시 후 본집계에서 제외**(baseline §4·m20 §9 계승) | 메이커 테스트 도달을 사람 activation 도달로 합산 금지 |
| **C. synthetic / mock**<br>(synthetic-mock) | "임시 판정 / 임시 판정 결과" 라벨·헤더(`add/page.tsx:29-30`), 우상단 "mock" 배지(`:335`), 폴백 토스트("AI가 잠깐 졸고 있어요. 임시 판정으로 보여드릴게요." `:118`), 데모 시드(처음부터 641덕 + 가짜 덕행 14건, `NEXT_PUBLIC_SHOW_DEMO=1`) | `deed_judged`가 발화해도 **mock 폴백이면 진짜 AI 가치 경험이 아님** → J3 first value로 집계 안 함(m20·m23 계승). mock 점수는 가중 랜덤, 코멘트는 키워드 라우팅 고정 풀 | **아니오 — 특히 J3 first value 부적합** | **표시 후 제외.** 채점 품질을 지표로 삼지 않음 | mock 점수가 그럴듯하다고 채점 품질·사용자 가치로 읽지 않음 |
| **D. 플랫폼 차이**<br>(platform-difference, web↔iOS) | `platform = ios` super-property(iOS) vs `platform` unset(웹), 보조로 `$lib`(`posthog-js` ↔ `posthog-ios`) | 같은 이름이라도 발화·속성이 다름. **iOS엔 `add_flow_started`·`level_up_viewed`·`deed_rerolled`·`deed_save_capped` 부재**, `deed_saved` 속성 웹 12 vs iOS 3(m15 §2·§3 계승) | **부분 — 공통 명명 이벤트만.** `deed_judge_attempted`·`deed_judged`·`deed_saved` 3종을 최소공약수로 비교, 웹 전용 신호 부재는 그 플랫폼 결론에 섞지 않음 | **플랫폼 분리 후 읽기.** 합산 전 `platform`으로 web/iOS를 먼저 가름 | 계측 부재(이벤트 미발화)를 사용자 미도달·활성화 문제로 오판 금지(m15 §5·§7 위임) |
| **E. 장래 agent / API**<br>(future agent-API) | **현재 표면 없음** — 진입 표면·식별자·계측 모두 미존재. 표면이 생기면 식별 칸을 별도 Intent에서 채움 | **현재 발화 0.** 본 문서로 새로 만들지 않음 | **아니오 — 사람과 다른 판독 규칙 필요.** agent activation ≈ 첫 의미 있는 작업 무오류 완료, agent retention ≈ 설정한 사람이 계속 호출·결과 사용(출처 노트 계승) | **현재 미발생.** 발생 시 사람 funnel과 **분리**(§6 proposal-only) | 구현 0. 표면이 생기는 즉시 분리하지 않으면 aggregate activation 오염(출처 노트 경고) |

> **판독 핵심:** 같은 이벤트 수라도 **누가/무엇이** 만들었는지가 다르면 같은 activation으로 묶지 않는다. A(사람 실사용)만 baseline 본행이고, B·C는 표시 후 제외, D는 플랫폼 분리 후 최소공약수 비교, E는 아직 미발생이며 생기면 별도 규칙으로 분리한다. **분류가 끝나기 전에는 어떤 activation 칸도 읽지 않는다**(§5).

## §3 경계표 보충 메모 (셀이 좁을 때만)

- **분류는 판독에 선행한다.** 한 세션을 보면 먼저 A~E 중 무엇인지 표시하고, 그 다음에만 잡 축(m23)·플랫폼 축(m15)·TTV(m10)를 적용한다. 분류 칸이 비어 있으면 activation/TTV/retention 칸을 채우지 않는다.
- **한 세션이 여러 분류에 걸칠 수 있다.** 예: iOS(D) + mock 폴백(C), 또는 메이커가 웹에서 디버그(B+D). 이때는 **더 강한 제외 사유를 우선** 적용한다 — B(메이커)·C(mock)는 본집계 제외가 D(플랫폼 분리)보다 앞선다. 즉 "메이커가 iOS에서 mock으로 테스트"는 플랫폼 비교 대상이 아니라 제외 대상이다.
- **표시는 삭제가 아니다.** 제외된 행도 원장에 남겨 둔다(왜 제외했는지 단서 포함). 삭제하면 다음 관찰자가 같은 트래픽을 다시 사람으로 오인할 수 있다(baseline §4 계승).
- **availability ≠ value (계승).** 503·AI judge 타임아웃·`deed_save_capped`(30덕 상한, early return으로 `deed_saved` 미발화) 차단 구간은 어느 트래픽 종류든 activation/TTV 집계에서 **availability-blocked로 제외**하고, 신호 부재를 가치 부재로 읽지 않는다(m23 §3 계승).

## §4 사람 activation 판독은 그대로 (계승, 재정의 0)

본 경계표는 사람 실사용(A행)의 first value 정의를 **한 글자도 바꾸지 않는다.** 선행 문서의 매핑을 그대로 인용한다.

| 잡 | first value (기존 이벤트) | 출처(소유 문서) |
|---|---|---|
| J1 기록형 | 첫 `deed_saved` (즉시 만족) | `first-session-jtbd-matrix.md` |
| J2 누적형 | 첫 `deed_saved` (누적감) + 보조 `level_up_viewed` | `first-session-jtbd-matrix.md` |
| J3 AI 호기심형 | 첫 `deed_judged` (저장 전·저장 없이 닫힘이 정상 경로) | `first-session-jtbd-matrix.md` |
| J4 회고형 | 첫 `deed_saved` (지연 가치) | `first-session-jtbd-matrix.md` |

> 같은 `deed_saved`라도 J1 즉시 / J2 누적 / J4 지연으로 가치 방향이 다르고, J3만 `deed_judged`가 first value다(m23 §2 계승). 본 문서는 이 매핑을 **트래픽 종류별로 적용 가능한지**만 덧댄다 — A에는 그대로 적용, B·C에는 미적용(제외), D에는 플랫폼 가용성 한도 내 적용, E에는 사람과 다른 규칙(§6).

## §5 첫 검증 게이트 · 초기 baseline 판독 금지선 (no-read / forbidden)

분류가 끝나기 전, 그리고 작은 표본에서, 아래는 **읽지 않거나 결론으로 만들지 않는다.**

### 출시 후 첫 검증 게이트 동안 (m15 §6 게이트: 실사용자 10명 OR 7일 중 먼저)

- **분류 전 숫자 읽기 금지(no-read).** 이 게이트는 "계측이 믿을 만한가"만 본다. 트래픽이 A~E 중 무엇인지 분류가 끝나기 전에는 activation/TTV/drop-off/retention 어느 칸도 읽지 않는다.
- **aggregate 합산 전환율 금지.** 사람·테스트·mock·플랫폼·agent를 한 funnel로 합산해 transition/전환율을 산출하지 않는다. 합산 전 반드시 `platform`(D)으로 분리하고 B·C를 제외한다.
- **계측 불일치를 활성화 문제로 오판 금지.** iOS의 `add_flow_started`·`level_up_viewed` 빈칸은 사용자 미도달이 아니라 이벤트 미발화다(m15 §7 결정 트리: 이벤트 존재→속성 모양→분리 필터→비로소 행동 순으로 배제).

### 초기 baseline(첫 10~20명, 제외 후 한 자릿수) 판독 (m23 §7 계승)

- **completion을 결론으로 만들지 않는다.** 내부 체크리스트/온보딩 완료율을 activation·retention 성공으로 환산 금지.
- **first click을 활성화로 승격하지 않는다.** `add_flow_started`(진입 의도)는 setup이지 first value가 아니다.
- **conversion·retention %·PMF 산식 금지.** "도달 N / 미도달 M"을 %로 읽지 않고 사람·상황 단위로 읽는다. 40% 등 외부 PMF 임계값을 작은 표본에 적용 금지.
- **B·C·데모 시드·localStorage 반복을 baseline 본집계에 포함 금지.** 표시 후 제외한 행을 도달 카운트에 다시 넣지 않는다.
- **한 명의 강한 신호를 제품 방향으로 확정 금지.** 표본이 작을수록 한 명의 인상이 과대평가된다.
- **agent/API 트래픽을 사람 baseline 행에 섞지 않는다.** 현재는 미발생이지만, 표면이 생기는 즉시 사람 행과 분리한다(§6).
- **judged−saved 갭을 곧장 이탈로 단정하지 않는다(계승).** J3는 `deed_judged`에서 가치를 얻고 정상 종료할 수 있다.
- **변경 금지.** 코드·카피·이벤트·속성·대시보드·세션리플레이·배포·외부 발송·비용·시크릿·권한·개인정보 변경 0.

## §6 장래 agent / API 표면 — 경계 제안만 (proposal-only, 미구현)

Virtue에는 현재 agent/API 진입 표면과 그 계측이 **없다.** 본 절은 표면이 생길 때를 위한 경계 제안이며, 어떤 구현·계측·대시보드도 만들지 않는다. 확정·구현은 별도 Intent(approval-needed)로 분리한다.

- **사람과 다른 판독 규칙(제안).** agent activation은 환영/투어 화면이 아니라 **첫 의미 있는 작업을 오류 없이 완료**했는지로 본다. agent retention은 agent의 재방문이 아니라 **그 agent를 설정한 사람이 계속 호출하거나 결과를 사용**하는지로 본다(출처 노트 계승).
- **사람 funnel과 분리(제안).** agent/API 트래픽은 사람 first-value 매핑(§4)을 그대로 쓰지 않는다. 별도 식별자·세그먼트로 사람 aggregate와 분리해야 하며, 분리하지 않으면 사람 onboarding 진단이 오염된다.
- **launch 이후 PostHog 대시보드 후보(approval-needed 보관).** aggregate activation과 별도로 platform/source/test-exclusion cohort를 나누는 요구사항은 초안만 보관하고 본 Intent로 구현하지 않는다(출처 노트 후속 #3).
- **이 절이 하는 일.** 트래픽이 생기기 전에 "사람과 같은 규칙으로 읽지 않는다"는 경계를 미리 못박아, 표면 추가 시 곧장 aggregate에 섞이는 사고를 막는다. 그 이상은 하지 않는다.

## §7 충돌 점검 (no-conflict)

| 대상 문서 | 충돌 여부 | 근거 |
|---|---|---|
| `first-session-jtbd-matrix.md` | 없음 | J1~J4 잡 정의와 J1/J2/J4=`deed_saved`·J3=`deed_judged` 매핑을 그대로 계승. 재정의 0(§4) |
| `onboarding-metrics-reading-table.md` (m23) | 없음 | 잡 축 운영 판독표를 계승하고, 본 문서는 트래픽 출처 축만 추가. 잡별 운영 리듬은 위임 |
| `ios-activation-event-parity-brief.md` (m15) | 없음 | 플랫폼 델타·`platform` 분리·계측≠행동·검증 게이트를 계승. 패리티 표 재작성 0(§2 D행·§5에서 위임 인용) |
| `first-60-second-value-observation-script.md` (m20) | 없음 | mock/데모 시드/메이커/localStorage 단서를 계승. 현장 시계 메커닉은 위임 |
| `first-real-user-baseline-template.md` (m11) | 없음 | 1인 1행 양식과 test/synthetic 표시 후 제외 원칙 재사용. 새 표·컬럼 추가 0 |
| `copy-spec.md` (금지어) | 없음 | 사용자 노출 카피 0건. 인용한 화면 문구("임시 판정" 등)는 현재 코드 그대로의 식별 단서. 금지어 미사용 |

## §8 기존 이벤트 증거 (발화 위치, read-only 사실 확인)

본 경계표가 인용하는 모든 신호는 `apps/web/src/app/add/page.tsx`에 **이미 발화 중인 기존 이벤트**다. 신규 구현 0건. 아래 라인은 Developer 렌즈 read-only 확인 결과이며 선행 문서(m15 §2·m23 §8)와 drift 0.

| 이벤트 | 발화 위치 | 발화 시점 | 본 경계표에서의 역할 |
|---|---|---|---|
| `add_flow_started` | `add/page.tsx:72` | `/add` 마운트 시 1회 | 진입 의도(setup), activation 아님 · **웹 전용**(iOS 부재, D행) |
| `deed_judged` | `add/page.tsx:106` | 채점 성공 직후, 저장 전·독립 발화 | J3 first value(A행) · mock 폴백 시 J3 미집계(C행) |
| `deed_rerolled` | `add/page.tsx:149` | "한 번 더" 클릭(최대 3회) | J3 호기심 신호(이탈 아님) · **웹 전용**(D행) |
| `deed_save_capped` | `add/page.tsx:167` | 30덕 상한 초과 후 저장 중단(early return) | availability-blocked(저장 미발화 → 제외, §3) · **웹 전용**(D행) |
| `deed_saved` | `add/page.tsx:183` | 저장 실행(`addDeed`) 후 발화 | J1/J2/J4 first value(A행) · 속성 웹 12 vs iOS 3(D행) |
| `level_up_viewed` | `add/page.tsx:199` | `deed_saved` 직후 환생종 stage 상승 시에만 | J2 누적 보조 · **웹 전용**(iOS 부재, D행) |

> 보조 사실: 같은 파일에 `add_flow_abandoned`(:78), `deed_judge_attempted`(:135)도 이미 발화 중이고, iOS는 `score_fallback_shown`·`deed_judge_failed`를 별도 명명 이벤트로 보낸다(m15 §2). 본 경계표는 **요청된 6개 이벤트에 한정**하며 새 이벤트를 제안하지 않는다. iOS는 `platform = ios` super-property(`Analytics.swift:23`)로 분리한다.

## Out of scope

본 Intent(marketing-25)로 수행하지 않으며, 각각 별도 Intent에서 결정한다.

- 코드·카피·런타임 변경 **0건** — 산출물은 docs 1파일뿐이다.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·대시보드·세션리플레이·세그먼트·코호트 생성 0. baseline 양식에 컬럼 추가도 하지 않는다.
- agent/API 표면·식별자·계측 **구현 0건** — §2 E행·§6은 경계 제안일 뿐이다.
- 외부 발송·공개 모집 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고 없음.
- 배포·CI·권한·시크릿·비용·개인정보 변경 **0건**.
- 첫 10~20명 또는 synthetic/small sample을 **completion·전환율·리텐션율·PMF·세그먼트·D7 %로 판정하는 일 0건**.
- 플랫폼 패리티 델타 원장(m15 위임), 잡별 운영 판독표(m23 위임), 정밀 time gap(m10 위임).

본 문서 작성이 위 경계를 지켰음을 검증하는 절차:

```bash
git diff --stat -- apps/web/src apps/ios/Sources   # 출력 없어야 함
git status --short                                  # 코드 변경 없음
rg '<<<<<<<|=======|>>>>>>>' apps/web/docs/traffic-source-reading-boundary-table.md   # 충돌 마커 0
rg 'posthog.capture|Analytics.capture' apps/web/src apps/ios/Sources -S   # 인용 6개 이벤트가 현행 코드에 존재
```

---

## 검증 매핑

| 성공 기준 (marketing-25) | 충족 섹션 |
|---|---|
| 5개 트래픽 종류 판독 경계(human/maker/synthetic-mock/platform/future-agent) | §2 (심장, 5행) |
| 기존 이벤트 해석 경계만, 신규 0 | §0 전제2, §2, §8 |
| 첫 검증 게이트 no-read/금지선 | §5 (게이트 절) |
| 초기 baseline 판독 금지선 | §5 (baseline 절) |
| first value 정의 유지(J1/J2/J4=`deed_saved`, J3=`deed_judged`) | §4, §2 A행, §7 |
| 선행 iOS 패리티·온보딩 판독·baseline·trust 문서 충돌 0 | §7 (no-conflict) |
| 장래 agent/API·대시보드 = 제안만, 미구현 | §2 E행, §6, Out of scope |
| baseline 신뢰 보존 · aggregate 과대해석 방지 | §0 목적, §1, §5 |
