---
작성일: 2026-06-05
Intent: marketing-41
Mode: 내부 기획 L1 (+ L2 agent-approved push)
Status: complete
Owner: Marketer (Planner / Developer / Operator 관점 종합)
---

# Virtue post-launch PQL/upgrade 신호 경계표 (Post-Launch PQL/Upgrade Signal Boundary Table)

## §0 목적 + 전제

### 목적

Mixpanel 류 PLG 2026 렌즈는 **PQL(Product Qualified Lead)·high-intent 판단도 활성화처럼 단일 클릭이 아니라 행동 묶음(behavior bundle)** 이며, 그 묶음을 retention·conversion과 **대조 가능한 단위**로 두라고 한다. 핵심은 두 가지다 — (1) 단일 이벤트가 아니라 묶음, (2) 그 묶음을 "업그레이드 수요가 있다"는 결론으로 곧장 읽지 말고 retention·conversion과 *대조할 후보*로만 둔다.

Virtue는 prelaunch라 PQL 임계값·전환율·upgrade demand를 산출할 단계가 **아니다.** 그러나 출시 후 작은 숫자가 들어오면 `deed_save_capped`·`deed_rerolled`·`level_up_viewed` 같은 **단일 이벤트 한 번을 "더 원해서 막혔다 = 업그레이드 수요"로 과대해석할 위험**이 크다. 본 문서는 그 위험을 출시 *전에* 막는 장치다 — 출시 후 high-intent/upgrade 판단을 **"행동 묶음 후보 + 금지 오독"** 으로 미리 고정해, 검증을 "새 결론 만들기"가 아니라 "등록된 후보 대조"로 바꾼다.

본 문서는 PQL을 *정의·채점하지 않는다.* 어떤 묶음도 "이게 PQL이다", "이 횟수면 업그레이드 의향이다"로 못박지 않는다. 출시 후 첫 10명 또는 첫 7일 단계에서 **무엇을 PQL 후보로 대조할 수 있고(후보), 무엇을 PQL로 읽으면 안 되며(비후보), 무엇은 승인 전까지 손대지 않는가(Waiting/approval-needed)** 의 세 경계만 고정한다.

> **출처노트:** `source/external-links/marketing/2026-06-05-plg-pql-activation-boundary.md`. 본 작업 시점 로컬 저장소에 `source/` 트리가 **부재**해 출처노트 원문을 직접 대조하지 못했다. 따라서 본 문서는 출처노트 원문이 아니라 Intent rationale에 적힌 PLG 2026/PQL 렌즈 요지(PQL=행동 묶음, retention·conversion 대조 단위)와 이미 검증된 선행 문서(특히 m33 후보 묶음·m28 유료화 경계·m37 correlation readiness)에 근거한다. 출처노트가 복구되면 §1 요지를 재대조한다. **외부 PQL 벤치마크 수치는 prelaunch/post-launch 첫 리뷰의 합격선으로 가져오지 않는다.**

### 전제 (못박기)

1. **경계 분리이지 PQL 정의/채점이 아니다.** prelaunch이므로 PQL 임계값·전환율·upgrade demand·가격을 산출하지 않는다. 본 문서는 출시 후 신호를 어떻게 분류해 읽을지를 가르는 내부 기준일 뿐이다(§7 금지선).
2. **신규 0.** 신규 이벤트·속성·코드·카피·대시보드·플래그·세션리플레이·tracking/privacy 설정을 단 하나도 만들지 않는다. 이미 발화 중인 기존 6개 이벤트(`add_flow_started`, `deed_judged`, `deed_saved`, `level_up_viewed`, 보조 `deed_rerolled`, `deed_save_capped`)만 인용한다(§9 사실 확인).
3. **재정의 0.** first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`), 잡 정의, 후보 묶음(A1~A4), window(W-IMM/W-CONF)는 선행 문서가 소유한다. 본 문서는 그 위에 "PQL/upgrade 신호 읽기 경계"라는 층만 더한다(§8 충돌 점검).
4. **승인 전 Waiting.** PQL 채점·가격·paywall·신규 tracking·대시보드·공개 카피는 본 Intent로 결정·구현하지 않으며 사용자 승인 전까지 Waiting 대상이다(§6).

## §1 PQL은 단일 이벤트가 아니라 행동 묶음 — activation과 PQL의 분리

Virtue 사용자의 신호는 세 층으로 나뉘며, **PQL/upgrade-readiness는 activation 다음 층**이다. 이 분리를 못박지 않으면 first value 한 번을 곧장 업그레이드 수요로 읽는 오류가 생긴다.

| 층 | 무엇 | Virtue 신호 | 소유 문서 |
|---|---|---|---|
| ① intent(진입) | "해보려 함" | `add_flow_started`:72 | m06·m33 (vanity, 활성화 아님) |
| ② activation(first value) | "한 번 가치를 얻음" | J1/J2/J4=첫 `deed_saved`, J3=첫 `deed_judged` | `first-session-jtbd-matrix.md`(m06) · `activation-candidate-registry.md`(m33) |
| ③ **PQL/upgrade-readiness(반복·심화)** | "**반복해서 가치를 얻어 제품 의존이 생김 → 더 하고 싶은 일이 생길 가능성**" | 반복 first value 묶음 + D7 재방문 + depth(반복 `level_up_viewed`/`deed_rerolled`) | **본 문서(읽기 경계)** · 트리거 후보는 `prelaunch-monetization-boundary-brief.md`(m28) §3 |

핵심 원칙 4가지:

1. **PQL은 ②가 아니라 ③이다.** first value 한 번(activation)은 PQL이 아니다. PQL 후보는 **first value 이후 반복 가치 + 같은 잡 재방문**이라는 *묶음*이다(m28 §3 "첫 가치 이후 관찰할 반복 신호" 계승).
2. **묶음이지 단일 이벤트가 아니다.** `deed_save_capped` 1회, `deed_rerolled` 1회, `level_up_viewed` 1회 같은 단일 이벤트를 PQL/업그레이드 수요로 읽지 않는다. PQL 후보는 항상 *반복+재방문* 묶음으로만 후보가 된다.
3. **후보지 결론이 아니다.** PQL 후보 묶음은 출시 후 *retention·conversion과 대조할 대상*일 뿐, "이 사람은 업그레이드한다"는 결론이 아니다. 대조 자체(상관 쿼리 모양)는 `activation-retention-correlation-readiness.md`(m37)에 위임한다 — 본 문서는 그 대조에 넣을 *신호를 분류*만 한다.
4. **prelaunch/첫 데이터에서는 임계값을 만들지 않는다.** "몇 회 저장이면 PQL", "재방문 N일이면 high-intent" 같은 임계값·전환율은 충분 표본·승인 후의 별도 단계다(§6·§7).

## §2 A1~A4 activation 후보 묶음 (계승, 재정의 0 — PQL 후보의 토대)

PQL 후보 묶음(③)은 m33의 activation 후보 묶음(②) **위에서** 자란다. 아래는 m33 등록부를 한 글자도 바꾸지 않고 토대로 가져온 것이다. first value 매핑은 m06 그대로다.

| 등록 ID | 잡 | first value (계승, 재정의 0) | activation 후보 묶음 (m33, 완료 이벤트 우선) | 이 위에서 자라는 PQL 후보 방향(§3 상술) |
|---|---|---|---|---|
| **A1** | J1 기록형 | 첫 `deed_saved`:183 | `add_flow_started` → `deed_judged` → `deed_saved` | 반복 `deed_saved`(둘째 세션 이후) + D7 재방문 |
| **A2** | J2 누적형 | 첫 `deed_saved`:183 (총합↑) | `deed_saved` → (보조)`level_up_viewed` | 반복 `deed_saved`로 총합↑ + **반복** `level_up_viewed`(복수 stage 교차) + D7 재방문 |
| **A3** | J3 AI 호기심형 | 첫 `deed_judged`:106 (저장 전 닫힘) | `add_flow_started` → `deed_judged` → (선택)`deed_rerolled` | 반복 `deed_judged`(여러 세션에 판정 보러 옴) + D7 재방문 — **저장 불요** |
| **A4** | J4 회고형 | 첫 `deed_saved`:183 (로그 첫 항목) | `add_flow_started` → `deed_judged` → `deed_saved` | 반복 `deed_saved` + 덕행록 재방문(첫 세션 밖) |

> **계승 핵심:** ① 같은 `deed_saved`라도 A1 즉시 / A2 누적 / A4 지연으로 가치 방향이 달라 **PQL 후보도 잡별로 따로** 본다(묶음을 합치지 않음). ② **A3의 PQL 후보는 반복 `deed_judged`이고 `deed_saved`를 요구하지 않는다** — J3는 저장 없이 정상 종료하므로 judged−saved 갭을 업그레이드 망설임으로 읽지 않는다(§3·§4). ③ `add_flow_started`는 진입(intent)일 뿐 PQL 후보가 아니다. ④ 어느 묶음도 PQL 임계값이 아니라 **대조 대상 후보**다.

## §3 PQL/upgrade 신호 경계표 (이 문서의 심장)

출시 후 들어오는 신호를 **세 칸**으로 분류한다 — (A) **PQL 후보**(post-launch에 retention·conversion과 대조할 후보 묶음, 결론 아님), (B) **비후보 / 가짜 PQL**(업그레이드 수요로 읽으면 안 되는 신호), (C) **Waiting / approval-needed**(승인 전까지 손대지 않는 것). 모든 셀은 가설이며 기존 이벤트·화면에만 근거한다.

### §3.1 (A) PQL 후보 — retention·conversion과 *대조할* 후보 (결론 아님)

PQL 후보는 항상 **반복 + 재방문 묶음**이다. 단일 이벤트는 PQL 후보가 되지 못한다(§1 원칙2).

| 등록 ID | PQL 후보 묶음 (반복+재방문, 기존 이벤트만) | 왜 후보인가 (upgrade-readiness 방향) | 출시 후 무엇과 대조하나 (m37 위임) |
|---|---|---|---|
| **A1** J1 | 반복 `deed_saved`(둘째 세션 이후) + D7 내 같은 '남긴다' 재방문 | 기록 습관이 붙으면 "더 길게 보존·내보내기"가 더 하고 싶은 일이 됨(m28 §3) | 묶음 닿은 집단의 D7 재방문을 retention과 대조(비율 아님, 사례) |
| **A2** J2 | 반복 `deed_saved`(총합↑) + **반복** `level_up_viewed`(복수 stage) + D7 재방문 | 누적·진화에 반복 도달하면 "더 깊은 진행/컬렉션 확장"이 더 하고 싶은 일이 됨 | 누적 묶음 닿은 집단의 D7/장기 재가치를 retention과 대조 |
| **A3** J3 | 반복 `deed_judged`(여러 세션 판정 재방문) + D7 재방문 (저장 불요) | 판정을 반복적으로 찾는 호기심 주기가 보이면 "더 많은/깊은 판정"이 더 하고 싶은 일이 됨 | 판정 재방문 집단을 retention과 대조 — judged−saved 갭은 비후보 아님(§4) |
| **A4** J4 | 반복 `deed_saved` + 덕행록 재방문(첫 세션 밖) | 돌아볼 로그가 쌓이면 "긴 보존·검색/필터"가 더 하고 싶은 일이 됨 | 로그 재방문 집단을 retention과 대조 |

> **(A) 읽기 핵심:** ① PQL 후보는 **대조 대상**이지 "업그레이드한다"는 결론이 아니다. ② 후보 묶음은 모두 *반복+재방문*이며 단일 이벤트가 아니다. ③ 대조의 쿼리 모양·D7 우선/D30 보류·제외 조건은 **m37에 위임**하고, 본 문서는 *어떤 신호를 후보로 넣고 무엇을 빼는지*만 고정한다. ④ A3는 저장 없이도 후보가 된다.

### §3.2 (B) 비후보 / 가짜 PQL — 업그레이드 수요로 읽으면 안 되는 신호

아래 신호는 출시 후 가장 흔히 "더 원한다 = 업그레이드 수요"로 오독되지만, **PQL 후보가 아니다.** 단일 이벤트이거나, 가용성/마찰이거나, 정상 종료이거나, 의도가 다의적이기 때문이다.

| 신호 | 왜 PQL/업그레이드 수요가 아닌가 | 올바른 분류 |
|---|---|---|
| `deed_save_capped`:167 (저장 상한) | 30덕 상한 early-return으로 `deed_saved` 미발화. "더 원해서 막혔다"가 아니라 **한도에 닿았다는 사실**일 뿐(§4 상술) | **availability/friction** — 제한 설명·회복 경로 문제 |
| `deed_judged` 후 `deed_saved` 없음 (judged−saved 갭, J3) | J3는 `deed_judged`에서 first value를 얻고 저장 없이 **정상 종료**한다. 저장 안 한 것은 업그레이드 망설임이 아님 | **정상 종료(B-NORMAL)** — 이탈·미충족 아님 |
| `deed_rerolled`:149 단발 (재판정 1~2회) | 재판정 의도는 불신·호기심·비교 학습이 모두 가능(다의적). 단발 reroll은 업그레이드 수요가 아님 | **호기심/탐색 depth** — 수기 관찰 전 처분 금지 |
| `level_up_viewed`:199 1회 | 첫 stage 교차 1회는 누적 *시작*일 뿐 반복 누적·high-intent가 아님 | **활성화 보조 신호** — 1회를 PQL/리텐션으로 승격 금지 |
| `add_flow_started`:72 (진입/클릭) | 진입은 의도일 뿐 가치 도달도 PQL도 아님 | **intent/vanity** |
| 한 명의 강한 신호(1인 다회 저장·강한 재방문) | 표본이 작을수록 한 명이 과대평가됨 | **단일 사례** — 제품 방향·PQL 결론 금지 |
| synthetic/mock/`임시 판정`·데모 시드(641덕)·메이커 self-test | 사람 실사용이 아님 | **제외(표시 후 집계 제외, 삭제 아님)** |

> **(B) 읽기 핵심:** ① **단일 이벤트는 PQL 후보가 아니다** — 특히 `deed_save_capped` 1회를 "업그레이드 수요"로 읽는 것이 본 문서가 막는 1번 오독이다. ② judged−saved 갭(J3)·단발 reroll·`level_up_viewed` 1회는 모두 정상/다의적/시작 신호이며 high-intent 결론이 아니다. ③ 비후보 신호는 **버리지 않고** availability/friction·정상 종료·탐색으로 분류해 보존한다.

### §3.3 (C) Waiting / approval-needed — 승인 전까지 손대지 않는 것

PQL을 *실제로* 점수화·추적·과금에 쓰는 모든 행위는 본 Intent 범위 밖이며 승인 전까지 Waiting이다(§6 상술).

| 항목 | 상태 | 사유 |
|---|---|---|
| PQL 점수/임계값/등급 정의 (예: "N회 저장=PQL") | **Waiting (approval-needed)** | prelaunch·소표본에서 임계값을 만들면 작은 숫자를 high-intent로 굳힘 |
| 업그레이드 수요·전환율·conversion 결론 | **Waiting (approval-needed)** | decision-grade 표본·대조(m37) 전에는 산출 금지 |
| 신규 이벤트·속성(PQL 추적용 instrumentation) | **Waiting (approval-needed)** | 본 문서는 기존 6개 이벤트 인용에 한정. 신규 0 |
| PostHog PQL 대시보드·cohort·세션리플레이 | **Waiting (approval-needed)** | tracking/대시보드 구성은 별도 승인 |
| 가격·플랜·paywall·업그레이드 CTA·공개 카피 | **Waiting (approval-needed)** | first value 이전 잠금 금지(m28 §2), 카피·가격 확정은 approval-needed |
| 배포·CI·권한·시크릿·비용·외부 발송 | **Waiting (out-of-scope)** | 본 Intent 산출물은 docs 1파일뿐 |

## §4 `deed_save_capped` 오독 금지 (do-not-misread — 본 문서 1번 경계)

`deed_save_capped`는 **availability/friction 신호이지 monetization intent나 upgrade demand가 아니다**(원장 `Availability And Friction Are Not Value`·m28 §4 계승). 이를 PQL/업그레이드 신호로 오독하면 "사용자가 더 원해서 막혔다"로 잘못 읽혀, 소표본에서 곧장 paywall·가격을 끌어오는 사고로 이어진다.

- **발화 메커닉(사실).** `deed_save_capped`는 `apps/web/src/app/add/page.tsx:167`에서 **30덕 상한 초과 시 저장 중단(early return)** 으로 발화하며, 이때 `deed_saved`는 발화하지 않는다. 즉 cap은 저장이라는 first value 행동이 **차단된** 구간이다.
- **올바른 판독.** cap 구간은 선행대로 **availability-blocked**로 처리해 activation/PQL 대조 모집단에서 제외하고(m37 §5 X-CAP 계승), 신호 부재(저장 미발화)를 가치 부재·업그레이드 수요로 읽지 않는다.
- **금지 판독.** cap 횟수를 "업그레이드 수요", "유료 전환 의향", "더 쓰고 싶다는 monetization intent", PQL 후보로 환산하지 않는다. cap은 과몰입을 막는 의도된 마찰(J2 기준)이거나 가용성 한도일 뿐, **더 원한다는 신호가 아니다** — 한도에 닿았다는 사실일 뿐이다.
- **트리거와의 관계.** m28 §3의 usage cap류 업그레이드 트리거 *후보*는 **이미 반복 가치를 얻은 사용자**(③ PQL 후보 묶음 도달)의 욕구에서만 의미를 가진다. `deed_save_capped` 자체가 그 욕구를 증명하지 않는다.

## §5 출시 후 첫 검증 게이트 (첫 10명 OR 첫 7일 — 대조 후보만)

### 트리거 조건

| 항목 | 값 |
|---|---|
| 발동 조건 | **실제 사용자 10명 도달** OR **출시 후 7일 경과** — 둘 중 먼저 오는 쪽 (m33 §4 게이트와 정렬) |
| 표본 성격 | 소표본 / 통계적 유의성 없음 (PQL 전환율·upgrade demand 평가 불가) |
| 게이트 목적 | (A) PQL 후보 묶음이 **데이터로 대조 가능한 상태인지** 확인 전용 |

### 게이트에서 하는 일 / 안 하는 일

| 한다 (✓) | 안 한다 (✗) |
|---|---|
| (A) PQL 후보 묶음(§3.1)의 반복+재방문 신호가 PostHog에 **도착·식별 가능한지** 확인 | PQL 후보를 "PQL 전환율"·"업그레이드 수요"로 환산 |
| (B) 비후보 신호(§3.2)가 PQL 모집단에서 **분리·제외되는지** 확인 | `deed_save_capped`·단발 reroll·`level_up_viewed` 1회를 high-intent로 판정 |
| 같은 잡 반복 가치 *사례*를 사람·사례 단위로 손기록 | PQL 임계값·등급·합격선 산출 |
| 등록 경계와 어긋난 점(누락·새 후보 필요)을 *경계 갱신 후보*로 기록 | 사후에 새 PQL 정의를 즉석 조립 |

> 원칙: 이 게이트는 **"등록된 PQL 후보를 데이터로 대조할 수 있는가"** 만 본다. 어떤 묶음이 업그레이드와 상관되는지, PQL 임계값이 얼마인지는 충분 표본·승인 후의 별도 성장/monetization 리뷰로 보류한다. 실제 retention 대조의 쿼리 모양·D7 우선/D30 보류는 **m37 §6에 위임**하고, 플랫폼 합산 전 web/iOS 분리는 **m15에 위임**한다. 첫 10명·첫 7일은 **대조 후보를 확인하는 시점일 뿐, PQL을 확정하는 시점이 아니다.**

## §6 Waiting / approval-needed 경계 (§3.3 상술)

아래는 본 Intent로 결정·구현하지 않으며 **사용자 승인 전까지 Waiting** 대상이다. Infinity 작업은 PQL 정의·과금이 아니라 *신호 읽기 경계표* 작성에 머무른다.

- **PQL 채점·임계값·등급화** — 소표본에서 임계값을 만들면 작은 숫자를 high-intent로 굳힌다. decision-grade 표본·대조(m37)·승인 후로 보류.
- **업그레이드 수요·전환율 결론, 가격/플랜/paywall/업그레이드 CTA** — first value 이전 잠금 금지(m28 §2), 가격·카피 확정은 approval-needed.
- **신규 tracking(이벤트·속성·플래그)·PostHog PQL 대시보드·cohort·세션리플레이** — 본 문서는 기존 6개 이벤트 인용에 한정. 신규 0.
- **공개 카피·outbound·실험·배포·CI·권한·시크릿·비용·개인정보 변경** — 본 Intent 산출물은 docs 1파일뿐.

## §7 post-launch 해석 금지선 (do-not-infer / do-not-overclaim)

첫 10~20명(제외 후 한 자릿수)에서 아래를 **결론으로 만들지 않는다**(원장 `Prelaunch Decision Boundary`·`Availability And Friction Are Not Value`·m28·m33 §5·m37 §7 계승).

- **PQL 임계값·전환율·upgrade demand를 산출하지 않는다(본 문서 존재 이유).** "몇 회면 PQL", "재방문 N일=high-intent", "cap N회=업그레이드 수요" 같은 임계값·비율을 만들지 않는다.
- **단일 이벤트를 PQL/업그레이드 수요로 읽지 않는다.** 특히 `deed_save_capped` 1회·단발 `deed_rerolled`·`level_up_viewed` 1회·`add_flow_started`를 high-intent로 승격 금지.
- **`deed_save_capped`는 availability/friction이지 upgrade demand가 아니다(§4).** 30덕 상한 early return으로 `deed_saved` 미발화하는 가용성 신호이며, 유료 수요로 환산하지 않는다.
- **judged−saved 갭(J3)을 업그레이드 망설임·이탈로 단정하지 않는다.** J3(A3)는 `deed_judged`에서 가치를 얻고 저장 없이 정상 종료할 수 있다. `deed_rerolled`는 이탈·불신이 아닌 호기심일 수 있다.
- **PQL 후보 묶음을 사후에 입맛대로 고르지 않는다.** 대조는 사전 등록된 A1~A4 반복+재방문 후보로 한정하고, 결과가 좋아 보이는 조합을 골라 "이게 PQL"이라고 선언 금지.
- **PQL 후보 도달을 conversion rate로 환산하지 않는다.** "후보 도달 N / 미도달 M"을 %·유의성으로 읽지 않고 사람·사례 단위로 읽는다.
- **묶음 간 업그레이드 상관·우열을 결론짓지 않는다.** 충분 표본·승인 후의 별도 monetization 리뷰 몫이다.
- **synthetic/mock·self-test를 사람 PQL 대조에 섞지 않는다.** 제외는 삭제가 아니라 표시 후 집계 제외다.
- **한 명의 강한 신호를 제품 방향·PQL로 확정하지 않는다.** 표본이 작을수록 한 명의 재방문이 과대평가된다.
- **외부 PQL 벤치마크 수치를 prelaunch/첫 리뷰 합격선으로 베끼지 않는다.** 방향 참고일 뿐 임계값이 아니다.
- **변경 금지.** 코드·카피·이벤트·속성·대시보드·세션리플레이·tracking/privacy·배포·외부 발송·비용·시크릿·권한·개인정보 변경 0.

## §8 선행 문서 계승 / 충돌 점검 (no-conflict)

아래 "소유 문서"의 정의는 본 문서에서 한 글자도 바꾸지 않는다. 본 문서가 새로 하는 단 하나는 그 정의들 위에 **PQL/upgrade 신호 읽기 경계(후보/비후보/Waiting)** 를 얹는 것뿐이다.

| 정의 항목 | 소유 문서 (Single Source) | 본 문서의 취급 | 충돌 |
|---|---|---|---|
| J1~J4 잡 정의 + first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`) | `first-session-jtbd-matrix.md` (m06) | 그대로 계승·인용. 재정의 0 | 없음 |
| A1~A4 후보 묶음 + W-IMM/W-CONF window + 출시 후 게이트 | `activation-candidate-registry.md` (m33) | §2 토대로 그대로 가져옴. PQL 후보는 그 위층(③). 재정의 0 | 없음 |
| 첫 가치 이전 do-not-lock + 첫 가치 이후 확장/유료화 트리거 후보 + `deed_save_capped`=availability | `prelaunch-monetization-boundary-brief.md` (m28) | §3 PQL 후보 방향·§4 cap 오독을 계승. 본 문서는 *신호 읽기*만 더함(트리거 확정은 m28에 위임) | 없음 |
| retention 대조 질문(D7 우선/D30 보류) + pseudo-query shape + 제외 조건 | `activation-retention-correlation-readiness.md` (m37) | PQL 후보의 *대조 방법*은 m37에 위임. 본 문서는 대조에 넣을 신호 분류만 | 없음 |
| measurement readiness / Foundation 종료 게이트 | `plg-foundation-exit-gate.md` (m34) | PQL 읽기는 측정·상관 게이트 다음 층. 보완, 충돌 아님 | 없음 |
| 막힘 4분류(B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL) | `product-body-vs-bumper-boundary-table.md` (m31) | §3.2 정상 종료·가용성 분류에 인용. 재정의 0 | 없음 |
| 활동량≠인정 가치, reroll 다의성, `deed_save_capped`=availability | `ai-outcome-proxy-dictionary.md` (m29) | §3.2·§4에 계승. 재정의 0 | 없음 |
| 사람/test/synthetic 트래픽 분리 선행 | `traffic-source-reading-boundary-table.md` (m25) | §3.2 제외 분류의 선행 원칙으로 계승 | 없음 |
| 사용자 노출 카피 금지어 | `copy-spec.md` | 사용자 노출 카피 0건. 인용한 `임시 판정`은 현재 코드 그대로의 단서 | 없음 |

## §9 기존 이벤트 증거 (발화 위치, read-only 사실 확인)

본 문서가 인용하는 모든 신호는 `apps/web/src/app/add/page.tsx`에 **이미 발화 중인 기존 6개 이벤트**다. 신규 구현 0건. 아래 라인은 read-only 검증 결과이며 선행 문서(m33 §7·m37 §9)와 drift 0.

| 이벤트 | 발화 위치 | 발화 시점 | 본 문서에서의 역할 |
|---|---|---|---|
| `add_flow_started` | `add/page.tsx:72` | `/add` 마운트 시 1회(`useEffect([])`) | ① intent(vanity) · 비후보(§3.2) |
| `deed_judged` | `add/page.tsx:106` | 채점 성공 직후, **저장과 독립·저장 전** 발화 | A3 first value · 반복 시 A3 PQL 후보(§3.1) |
| `deed_rerolled` | `add/page.tsx:149` | "한 번 더" 클릭(최대 3회) | 단발=비후보(다의적) · 반복은 A3 depth 보조 |
| `deed_save_capped` | `add/page.tsx:167` | 30덕 상한 초과 시 발화 후 **저장 중단(early return)** | availability/friction — **PQL 비후보(§4)** |
| `deed_saved` | `add/page.tsx:183` | 저장 실행(`addDeed`) 후 발화 | A1/A2/A4 first value · **반복**=PQL 후보 묶음(§3.1) |
| `level_up_viewed` | `add/page.tsx:199` | `deed_saved` 직후 환생종 stage 상승 시에만 | 1회=비후보 · **반복**(복수 stage)=A2 PQL 후보 |

> 보조 사실: 같은 파일에 `add_flow_abandoned`(:78), `deed_judge_attempted`(:135)도 발화 중이나, 본 문서는 **요청된 6개 이벤트에 한정**하며 새 이벤트를 제안하지 않는다.

## §10 Out of scope (변경 0건) + 검증

본 Intent(marketing-41)로 수행하지 않으며, 각각 별도 Intent·단계에서 결정한다.

- 코드/카피/런타임 변경 **0건** — 산출물은 docs 1파일뿐이다.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·대시보드·cohort·세션리플레이·tracking/privacy 없음.
- **PQL 임계값·전환율·upgrade demand·가격 산출 0건** — 본 문서는 신호 분류 경계일 뿐 채점·결론이 아니다.
- 외부 발송·공개 모집 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고·업그레이드 CTA 없음.
- 배포·CI·권한·시크릿·비용·개인정보 변경 **0건**.
- 첫 10~20명 또는 synthetic/small sample을 **PQL rate·전환율·리텐션율·upgrade demand·PMF·세그먼트로 판정하는 일 0건**.
- PQL 후보의 실제 retention/conversion 대조 실행(m37 위임·승인 후), 묶음 간 업그레이드 상관(충분 표본 후), 플랫폼 패리티(m15 위임).

본 문서 작성이 위 경계를 지켰음을 검증하는 절차:

```bash
git diff --stat -- apps/web/src apps/ios/Sources   # 출력 없어야 함 (코드 변경 0)
git status --short                                  # docs 1파일만
rg '<<<<<<<|=======|>>>>>>>' apps/web/docs/post-launch-pql-upgrade-signal-boundary-table.md   # 줄머리 충돌 마커 0
rg 'posthog.capture\(' apps/web/src/app/add/page.tsx -n   # 6개 이벤트 발화 위치 재확인
```

## 부록: 성공기준 완성도 체크리스트

| # | 성공기준 (marketing-41) | 충족 섹션 | 완성도 |
|---|---|---|---|
| 1 | `apps/web/docs/`에 PQL/upgrade 신호 경계 문서 1개 | 본 문서 | ✅ |
| 2 | A1~A4 activation 후보 계승 | §2 | ✅ |
| 3 | first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`) 계승, 재정의 0 | §1·§2·§8 | ✅ |
| 4 | `deed_save_capped`=availability/friction, upgrade demand 아님 계승 | §3.2·§4 | ✅ |
| 5 | PQL 후보 / 비후보 / Waiting·approval-needed 신호 표 | §3.1 / §3.2 / §3.3 | ✅ |
| 6 | post-launch 첫 10명 OR 첫 7일 대조 후보로만 한정 | §5 게이트 | ✅ |
| 7 | PQL 임계값·전환율·upgrade demand 산출 0 | §0 전제1·§5·§7·§10 | ✅ |
| 8 | 신규 이벤트·속성·tracking·카피·대시보드·코드 0 | §0 전제2·§9·§10 | ✅ |
| 9 | 선행 first value/활성화/유료화 문서 충돌 0 | §8 충돌 점검 | ✅ |

## 학습 루프 (marketing loop)

- **계승한 기준:** first value 매핑(J1/J2/J4=`deed_saved`:183, J3=`deed_judged`:106) 재정의 0 · A1~A4 activation 후보 묶음(m33) · `deed_save_capped`:167=availability/friction(upgrade demand 환산 금지, m28 §4·원장) · J3 저장 없는 종료=정상 · synthetic/mock/self-test·소표본 비결정 등급 · retention 대조 방법은 m37 위임.
- **이번에 새로 배운 것:** PQL/upgrade-readiness는 activation(② first value)이 아니라 **그 다음 층(③ 반복+재방문 묶음)** 이며, 단일 이벤트(특히 `deed_save_capped` 1회)를 업그레이드 수요로 읽는 것이 가장 흔한 오독이다. 출시 후 신호는 **(A) PQL 후보(대조 대상, 결론 아님) / (B) 비후보·가짜 PQL(availability·정상 종료·다의적 단발) / (C) Waiting·approval-needed(채점·가격·tracking)** 세 칸으로 먼저 갈라야 정직하다. 첫 10명·첫 7일은 PQL을 *확정*하는 시점이 아니라 후보를 *대조 가능한지* 확인하는 시점이다.
- **다음 Marketer에게 넘길 규칙:** high-intent/upgrade 신호를 읽기 전에 ① 단일 이벤트인가(그러면 PQL 후보 아님) ② 가용성/마찰인가(`deed_save_capped`·503=비후보) ③ J3 정상 종료인가(judged−saved 갭=비후보) ④ 반복+재방문 묶음인가(그래야 후보)를 순서대로 통과시킨다. PQL 후보는 대조 *대상*일 뿐 임계값·전환율로 환산하지 않는다.
- **MARKETING_LEARNINGS.md 승격 후보:** "PQL Is A Bundle, Not A Single Event" — PQL/upgrade-readiness는 activation 다음 층의 반복+재방문 묶음이며, 단일 이벤트(특히 `deed_save_capped` 1회)를 업그레이드 수요로 읽지 않고 후보/비후보/Waiting 세 칸으로 분류한다. 기존 `Monetization Boundary`·`Availability And Friction Are Not Value`·`Measurement Readiness`·`Correlation Readiness`를 보완하는 새 축으로 승격 제안.
