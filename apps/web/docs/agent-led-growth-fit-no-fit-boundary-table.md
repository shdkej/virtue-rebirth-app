---
작성일: 2026-06-08
Intent: marketing-46
Mode: 내부 문서 L2 (docs-only)
Status: 완료 (docs-only)
Owner: Marketer (Planner/Developer/Operator 관점 포함)
Source note: /home/ubuntu/workspace/knowledge-lab/source/external-links/marketing/2026-06-08-agent-led-growth-boundary.md
---

# Virtue agent-led growth fit / no-fit 경계표

## 0. 목적

AI 제품 유통 논의가 **agent-led growth**(AI 에이전트가 도구·API·문서를 발견하고 *task completion*으로 활성화를 판단하는 흐름)로 기울고 있다. 출처 노트는 PLG가 사람의 발견→가입→온보딩→첫 가치를 전제했다면, agent-led growth는 활성화 트리거를 *aha moment*가 아니라 *API 호출 성공·구조화된 응답·에이전트 작업 완료*로 옮기고, 발견 채널을 검색/입소문/Product Hunt에서 *MCP registry·API documentation search·tool-use example·agent-to-agent recommendation*으로 확장하며, 제품 설계를 *API-first·documentation-first·task-completion-first*로 재정의한다고 주장한다.

이 문서는 그 주장을 **Virtue prelaunch 단계에 그대로 복사하지 않기 위한 fit / no-fit 경계표 1장**으로 번역한다. 만드는 것은 다음이다.

- 어떤 조건에서 agent-led growth가 **맞고(fit)**, 어떤 조건에서 **맞지 않는지(no-fit)**, Virtue가 지금 어느 칸에 있는지를 한 행씩 매핑한 경계표(§3, 심장).
- agent-readable 표면을 **설명(read-about)**과 **실행(do-for-you)**으로 가르는 허용 경계표(§4).
- 나중에 다시 검토할 **launch / post-launch gate**(§5)와 **지금 만들지 않을 것 = 금지선**(§6).
- 이 문서가 새로 고정하는 단 하나의 발견(§2).

전제 못박기:

- Virtue는 정식 출시 전이고 실사용 데이터가 decision-grade가 아니다. 모든 판단은 **방향 가설**이지 측정 결과가 아니다([[Prelaunch Decision Boundary]] 계승).
- 본 문서는 **공개 카피·robots/sitemap/llms.txt·API/MCP·tracking/privacy·코드·배포·외부 발송·비용·권한을 만들거나 바꾸지 않는다.** 모든 후보·게이트는 docs-only 분류이며 *이미 적용했다는 주장이 아니다*.
- J1~J4 정의와 첫 가치 매핑(J1/J2/J4=`deed_saved` `:188`, J3=`deed_judged` `:107` 저장 전)은 `first-session-jtbd-matrix.md`(m06)에서 그대로 계승한다(재정의 0).
- agent-readable 공개 표면 경계는 `aeo-agent-ready-surface-audit.md`(m18)에서, 비자율 AI 신뢰 모양은 `ai-judgment-trust-control-observation-boundary-table.md`(m38)·결정-위임 카피 축은 `ai-promise-decision-control-audit-table.md`(m45)에서 계승한다. 본 문서는 그 중복이 아니라 **유통 전략 층**에 같은 경계를 적용한다(§7 충돌 점검).
- 이벤트 앵커 현행 위치(이름/제거 drift 0): `add_flow_started:73` · `add_flow_abandoned:79` · `deed_judged:107` · `deed_judge_attempted:140` · `deed_rerolled:154` · `deed_save_capped:172` · `deed_saved:188` · `level_up_viewed:204`.

## 1. 출처 렌즈 (정의 못박기)

출처 노트의 축을 fit/no-fit 판단 기준으로 고정한다.

- **PLG activation:** 사람이 첫 가치(aha moment)를 *경험*하면 활성화. 발견·가입·온보딩이 사람 경로다.
- **Agent-led activation:** AI 에이전트가 도구를 *발견*하고 task를 *완료*하면 활성화. API 호출 성공·구조화 응답·작업 완료가 활성화에 가깝다.
- **Agent 발견 채널:** MCP registry, API documentation search, tool-use example, agent-to-agent recommendation. 문서가 사실상 **product surface**가 된다.
- **설계 원칙:** API-first, documentation-first, task-completion-first. **UI-only action은 agent path에서 막힘**이 된다.
- **출처가 그은 적합 경계:** 이 주장은 agent가 직접 사용하거나 워크플로에 *편입*할 수 있는 **B2B/API형 제품**에 더 강하게 맞는다. 개인의 성찰·기록·자기 해석이 본체인 제품에 그대로 복사하면 제품 의미가 흐려진다.

## 2. 이 문서가 새로 고정하는 발견 — 유통 모드는 "AI 제품인가"가 아니라 "가치를 누가 완료하나"로 갈린다

"AI 제품이니까 agent-first 유통부터"는 **범주 오류**다. agent-led growth는 *제품에 AI가 들어갔는가*에 대한 주장이 아니라 **가치를 완성하는 주체가 누구인가(task completion subject)**에 대한 유통 주장이다.

- agent-led growth가 강하게 맞는 제품은 **에이전트가 task를 대신 완료해 주는 것이 곧 사용자 가치**인 제품(API·B2B·워크플로 편입형)이다. 여기선 "AI가 대신 했다 = 좋다".
- Virtue는 정반대다. 가치의 본체는 **사람이 자기 언어로 첫 기록/판정/저장/재방문을 *경험*하고 마지막 선택을 *본인이* 하는 것**이다. 여기서 "에이전트가 대신 Virtue를 써 줬다"는 가치 전달이 아니라 **제품 의미의 소거**다 — 성찰을 대행하면 성찰이 사라진다.

그래서 경계선은 "AI 제품 → agent-first"가 아니라 다음 질문이다.

> **이 제품에서 가치는 *에이전트가 task를 완료*해서 생기나, *사람이 경험하고 선택*해서 생기나?**

Virtue의 답이 후자인 한, agent-readable 표면은 **설명(read-about: "Virtue가 무엇인지 에이전트가 읽고 사람에게 안내")**까지만 허용 후보이고, **실행(do-for-you: "에이전트가 사람 대신 Virtue를 사용/판정/저장")**은 no-fit이다. 이는 m38의 *"Virtue AI는 외부 자율 행동을 하지 않는다"*와 m45의 *"마지막 결정권은 구조적으로 사용자에게 있다"*를 **유통 층으로 확장**한 것이다 — agent path를 열면 "외부 자율 행동 없음"과 "사람이 마지막 선택"이라는 두 구조적 안전장치가 동시에 무너진다.

## 3. fit / no-fit 경계표 (문서의 심장)

각 행은 한 판단 차원. `fit`은 agent-led growth가 맞는 조건, `no-fit`은 맞지 않는 조건, `Virtue 현재`는 지금 어느 칸인지다. 모두 방향 가설이며 결론이 아니다.

| 판단 차원 | fit (agent-led growth 맞음) | no-fit (지금 안 맞음) | Virtue 현재 위치 | 근거·계승 |
|---|---|---|---|---|
| **가치 생성 주체** | 에이전트가 task를 *완료*하는 것이 곧 사용자 가치 (워크플로 편입형) | 사람이 *경험·선택*해야 가치가 생김 (성찰/기록/자기 해석) | **no-fit.** 가치 본체=사람의 첫 기록·판정·저장·재방문 경험 | §2; m06 first value; m38 |
| **activation 정의** | API 호출 성공·구조화 응답·task completion | 사람의 aha moment·첫 가치 경험 | **no-fit.** J1/J2/J4=`deed_saved:188`, J3=`deed_judged:107` (사람 경로) | m06 [[First Value Mapping]] |
| **발견 채널** | MCP registry·API docs search·tool-use example·agent-to-agent rec | 검색·입소문·앱스토어·사람 추천 | **no-fit(지금).** 첫 10명 학습이 우선; agent 채널 자산화는 미시점 | 출처 §발견; m18 |
| **제품 표면** | 문서/스키마/에러코드/예제가 product surface (agent가 읽고 실행) | 화면·문장·결과 카드가 product surface (사람이 읽고 느낌) | **no-fit.** 본체 표면=`/`·`/add`·결과 카드(사람용 UI) | m38; m45; 출처 §docs |
| **UI-only action** | agent path의 *막힘*이므로 API로 풀어야 함 | 사람 경험의 *본질*이므로 보존해야 함 | **보존 대상.** 결과 후 3선택(취소·한 번 더·저장 `:386,399,408`)은 막힘이 아니라 제어 affordance | m45 affordance 축 |
| **AI 자율 행동** | 에이전트가 외부 행동/작업을 자율 수행 (그게 제품) | AI는 판정만 제시, 외부 자율 행동 없음 | **no-fit.** 비자율 판정 제품 → agent 실행 경로 없음 | m38 [[No Autonomous Action Bounds The Trust Question]] |
| **마지막 선택권** | 에이전트가 결정까지 대행 가능 | 사람이 마지막 선택을 *본인이* 해야 의미 | **no-fit.** 0점도 저장 가능·무저장 종료 비용 0 = 사람 선택 구조 보장 | m45 [[Decision-Delegation Risk Rides The Verb]] |
| **제품 단계** | 활성 사용자·반복 사용·외부 연결 수요가 확인된 단계 | 첫 가치 학습(첫 10명)도 끝나지 않은 prelaunch | **no-fit(지금).** prelaunch; 작은 표본은 decision-grade 아님 | [[Prelaunch Decision Boundary]] |

핵심 읽기: **8개 차원 전부에서 Virtue는 현재 no-fit이거나 "보존 대상"이다.** 이는 "agent-led growth가 틀렸다"가 아니라 **"지금 Virtue 단계·제품 성격에 맞지 않는다"**는 뜻이다. agent path를 안 만드는 이유는 게으름이 아니라 *제품 의미·구조적 안전장치 보존*이다.

## 4. agent-readable 표면 허용 경계표 — 설명(read-about) vs 실행(do-for-you)

agent-readable를 전부 막는 게 아니다. **무엇을 위해 읽히는가**로 가른다.

| 표면 종류 | 모드 | 지금 허용 여부 | 경계·계승 |
|---|---|---|---|
| 제품 설명 1문단 (내부 snippet, aeo §4) | read-about (에이전트가 *읽고 사람에게 안내*) | **내부 docs-only 허용.** 공개 반영은 approval | 공개 미반영·proposal-only (m18); 동사 프레임 정렬은 m45 위임 |
| llms.txt / robots / sitemap 공개 표면 | read-about (공개) | **approval-needed.** 지금 생성/변경 안 함 | 공개 표면 변경은 항상 approval (m18 계승) |
| 구조화 스키마·에러코드·tool-use 예제 | do-for-you (에이전트가 *실행 재료*로 사용) | **no-fit(지금).** 만들지 않음 | task-completion 표면 = agent 실행 경로 = §2 no-fit |
| 공개 API / MCP server | do-for-you (에이전트가 *대신 사용*) | **no-fit(지금) + approval-needed** | 비자율·사람 선택 구조 무너뜨림 (m38·m45); 비용/권한 동반 |
| agent onboarding / workflow template | do-for-you | **no-fit(지금).** 만들지 않음 | 성찰 대행 = 제품 의미 소거 (§2) |
| programmatic auth / usage-based pricing | do-for-you (수익화 표면) | **no-fit + approval-needed** | 첫 가치 전 결제·잠금 금지 ([[Monetization Boundary]]) |

읽기 규칙: agent-readable 후보가 들어오면 먼저 **read-about인가 do-for-you인가**를 가른다. read-about는 (공개면 approval) 후보가 될 수 있지만, do-for-you는 Virtue가 §2 질문에서 "사람이 경험·선택" 칸에 있는 한 **no-fit**이다. read-about 표면도 "사람 대신 에이전트가 Virtue를 쓴다"는 약속으로 읽히지 않게 m45 동사 프레임(판결 vs 관점)을 따른다.

## 5. launch / post-launch gate — 나중에 다시 검토할 조건

지금 no-fit이라고 영구 금지는 아니다. 아래 신호가 **실사용자에게서** 관찰되면 그때 해당 칸을 다시 연다. 모든 게이트는 "그때 재검토"이지 "그때 자동 실행"이 아니다.

| 게이트 | 재검토를 여는 신호 (실사용자) | 무엇을 재검토 | 선결 조건 |
|---|---|---|---|
| **G1 read-about 공개** | 사람이 Virtue를 설명·공유하려는 반복 요청; 검색/AEO 유입 발생 | llms.txt 등 공개 설명 표면 승격 여부 | 첫 10명 first value 학습 완료; m18 경계; approval |
| **G2 export 수요** | 사용자가 자기 기록을 *내보내거나 옮기려는* 요청 (API형 export) | 데이터 export 경로 (사람용 우선, agent용 아님) | 반복 `deed_saved` 재방문 확인; tracking/privacy approval |
| **G3 외부 워크플로 연결** | 사용자가 Virtue를 다른 도구/루틴과 *연결*하려는 명시 요청 | 제한적 연동 후보 (do-for-you 아닌 read/export 우선) | 실제 연결 수요 ≥ 복수 사용자; approval |
| **G4 agent path 본격** | 위 G1~G3 충족 + 반복+재방문 묶음([[PQL Is A Bundle, Not A Single Event]]) 확인 | MCP/API/agent onboarding 여부 자체 | decision-grade 표본; 비용·권한·privacy approval; §2 질문 재판정 |

게이트 순서는 **read-about(G1) → export(G2) → 연결(G3) → 실행 표면(G4)** 으로, 가벼운 설명 표면부터 무거운 실행 표면 순이다. G4(do-for-you)는 §2 질문("가치를 누가 완료하나")을 *다시* 통과해야 하며, 그 답이 여전히 "사람이 경험·선택"이면 G1~G3가 충족돼도 열지 않는다.

## 6. 금지선 (지금 만들지 않을 것 = forbidden lines)

prelaunch docs-only 단계에서 본 Intent가 넘지 않는 선:

- 공개 API·MCP server·programmatic auth·usage-based pricing·workflow template **생성 0** (전부 no-fit + 비용/권한 동반).
- robots / sitemap / **llms.txt** 생성·변경 0 (공개 표면 = approval-needed).
- 구조화 스키마·에러코드·tool-use 예제 등 **agent 실행 재료 표면** 생성 0 (do-for-you = no-fit).
- 공개 카피·온보딩·결과 카드 문장 변경 0; 결과 후 3선택 affordance 축소/제거 0 (보존 대상).
- 신규 이벤트·속성·tracking/privacy·대시보드·세션리플레이·배포·외부 발송·비용·권한·코드 변경 0.
- 작은 표본/synthetic/mock/self-test를 agent 수요·유통 결론으로 읽기 0; agent-to-agent recommendation·MCP 노출 수치를 Virtue 성과 기준으로 복사 0.
- first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`) 재정의 0; m18/m38/m45 경계 재정의 0.

위 선 중 read-about 공개(llms.txt 등)·export·연동·API/MCP는 모두 **approval-needed**이며 §5 게이트에서만 다시 논의한다.

## 7. 계승 / 변경 / 충돌 / 승격 분리 (마케팅 학습 루프)

- **계승한 가정:** ① 첫 가치 매핑 J1/J2/J4=`deed_saved`·J3=`deed_judged`(m06). ② 비자율 AI라 외부 자율 행동 없음·위험=자기인식 오보정(m38). ③ 마지막 결정권은 결과 후 affordance에 구조적으로 실림(m45). ④ AEO 내부 snippet은 공개 미반영·proposal-only, 공개 표면은 approval(m18). ⑤ prelaunch 작은 표본은 방향 재료이지 decision-grade 아님([[Prelaunch Decision Boundary]]). ⑥ first value 전 결제·잠금 금지([[Monetization Boundary]]). ⑦ synthetic/mock/self-test 비결정 등급(m25·m11).
- **이번에 새로 배운 것(새 렌즈 층, 기존 셀 재정의 0):** 유통 모드 선택은 "AI 제품인가"가 아니라 **"가치를 누가 완료하나(task completion subject)"**로 갈린다. Virtue가 "사람이 경험·선택" 칸에 있는 한 agent-readable은 **read-about까지만 후보, do-for-you는 no-fit**이다. m38(자율 행동 없음)·m45(사람 마지막 선택)를 *신뢰/카피 층*에서 *유통 전략 층*으로 확장.
- **변경한 가정:** 없음. 본 문서는 기존 경계를 재정의하지 않고 유통 의사결정 차원만 추가한다.
- **선행 산출물과의 충돌:** 없음. m18=공개 agent 표면 감사, m38=신뢰 신호 관찰, m45=카피 프레임 감사, 본 문서=유통 모드 fit/no-fit. 같은 셀 재정의 없이 위임/인용. 출처 노트가 명시한 세 학습(`Decision-Delegation Risk Rides The Verb`·`No Autonomous Action Bounds The Trust Question`·`Prelaunch Decision Boundary`)과 정렬 확인: 본 문서의 no-fit 결론은 셋과 같은 방향(사람 마지막 선택·비자율·작은 표본 비결정)을 유통 층에서 강화한다. 충돌 0.
- **재사용 학습 후보(승격 제안):** *"agent-led growth가 맞는지는 '제품에 AI가 있는가'가 아니라 '가치를 누가 완료하는가'로 갈린다. 에이전트의 task completion이 곧 가치인 제품(API/B2B/워크플로 편입형)에는 맞지만, 사람의 경험·선택이 본체인 제품에는 do-for-you 유통이 제품 의미를 소거한다. 후자에서 agent-readable 표면은 설명(read-about)까지만 후보이고 실행(do-for-you: MCP/API/agent onboarding)은 no-fit이며, 재검토는 실사용 신호 기반 launch/post-launch gate로만 연다. 모든 공개·실행 표면은 approval-needed."* → m18·m38·m45를 보완하는 **유통 전략 축**. MARKETING_LEARNINGS.md 승격 후보.

## 8. proposal-only (관찰/승인 후 별도 Intent)

1. read-about 공개 표면(llms.txt/메타데이터) 프레임 결정 후 승격 — G1, approval-needed.
2. 사용자 export 경로(사람용 우선) — G2, tracking/privacy approval.
3. 외부 워크플로 연결 후보 — G3, approval-needed.
4. agent path 본격(MCP/API/onboarding) 재판정 — G4, §2 질문 재통과 + 비용/권한/privacy approval.
