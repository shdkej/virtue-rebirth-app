---
작성일: 2026-05-30
Intent: marketing-28
Mode: 내부 기획 L1
Status: draft
Owner: Marketer (Planner / Developer / Operator 관점 포함)
---

# Virtue prelaunch 유료화 경계 브리프

## §0 목적 + 전제

### 목적

정식 출시 전, 가격·제한·업그레이드 트리거를 **먼저 정하지 않기 위한** 내부 경계표다. PLG에서 가격/패키징은 제품 밖의 결제표가 아니라 제품 안에서 사용자가 가치를 경험하는 방식의 일부이며, **첫 가치 이전의 제한은 paywall로 읽혀 activation을 가린다**(출처 노트 핵심). Virtue는 prelaunch/low-signal 단계이므로 지금 필요한 것은 가격 결정이 아니라 두 가지를 **분리하는 기준**이다.

1. **첫 가치 이전에 절대 잠그지 말 것** — 무엇을 막으면 activation 자체가 보이지 않게 되는가(§2).
2. **첫 가치 이후에만 검토할 확장/유료화 트리거 후보** — 제품 의존이 생긴 뒤에야 의미가 커지는 제한(§3).

출처 노트(`source/external-links/marketing/2026-05-30-plg-pricing-triggers.md`, Stripe PLG pricing 2026·Growth Unhinged B2B monetization 2026)를 Virtue prelaunch 기준으로 번역한다.

### 선행 문서 계승 (재정의 금지)

본 브리프는 새 first-value 정의를 만들지 않는다. 아래 선행 문서의 매핑을 **그대로 인용**하고, 그 위에 "유료화 경계 축"만 덧댄다. 정의를 바꾸면 충돌이다(§6 점검).

| 잡 | first value (기존 이벤트, 재정의 0) | 출처(소유 문서) |
|---|---|---|
| J1 기록형 | 첫 `deed_saved` (즉시 만족) | `first-session-jtbd-matrix.md` |
| J2 누적형 | 첫 `deed_saved` (누적감) + 보조 `level_up_viewed` | `first-session-jtbd-matrix.md` |
| J3 AI 호기심형 | 첫 `deed_judged` (저장 전·저장 없이 닫힘이 정상 경로) | `first-session-jtbd-matrix.md` |
| J4 회고형 | 첫 `deed_saved` (지연 가치) | `first-session-jtbd-matrix.md` |

> 같은 `deed_saved`라도 J1 즉시 / J2 누적 / J4 지연으로 가치 방향이 다르고, J3만 `deed_judged`가 first value다. 본 문서는 이 매핑을 **한 글자도 바꾸지 않으며**, "이 지점 이전/이후"를 경계로만 사용한다.

### 전제 (못박기)

1. **경계 분리이지 가격 결정이 아니다.** prelaunch이므로 어떤 가격·플랜·금액도 정하지 않는다. 본 문서는 무엇을 잠그지 말고, 무엇을 나중에 검토할지를 가르는 내부 기준일 뿐이다.
2. **신규 0.** 신규 이벤트·속성·코드·카피·결제·트래킹·대시보드·플래그를 단 하나도 만들지 않는다. 이미 발화 중인 기존 이벤트(`add_flow_started`, `deed_judged`, `deed_rerolled`, `deed_save_capped`, `deed_saved`, `level_up_viewed`)만 인용한다.
3. **트리거는 후보일 뿐이다.** §3의 확장/유료화 트리거는 가설 후보이며, 실제 사용자 반복 가치를 관찰하기 전에는 어떤 것도 확정·구현하지 않는다.
4. **승인 전 Waiting.** 공개 가격표·결제 연동·트래킹 변경·paywall 실험은 사용자 승인 전까지 Waiting 대상이다(§5).

## §1 왜 첫 가치 이전에 잠그면 안 되는가

사용자는 제품 안에서 스스로 판단한다. 제한/가격은 사용자가 **의미 있는 한계를 만났을 때** 이해되며, 그 전에 등장하면 paywall로 읽힌다. PLG 가격의 흔한 실수는 aha moment를 잠그는 것, 결제 정보를 너무 일찍 요구하는 것, self-serve 플랜을 너무 많이 만드는 것, 가치 지표가 사용자 체감과 어긋나는 것이다(출처 노트).

Virtue의 aha moment는 선행 문서가 이미 정의했다 — J1/J2/J4는 첫 `deed_saved`, J3는 첫 `deed_judged`. 따라서 **이 이벤트가 일어나기 전에 놓이는 모든 차단은 activation을 가리는 차단**이다. 세스고딘식으로, 가격은 설득 문구가 아니라 약속의 경계다. 작은 오디언스가 Virtue를 왜 쓰는지 말하기 전에 과금 경계를 먼저 세우면, 제품이 팔리는 것이 아니라 문이 먼저 보인다.

## §2 첫 가치 이전에 잠그지 말 것 (do-not-lock-before-first-value)

행은 네 잡. 각 잡의 first value 도달 **이전**에 놓이면 activation을 가리므로 prelaunch에서 도입하지 않는다. first value는 §0에서 계승하며 재정의하지 않는다.

| 잡 | first value (도달 기준선) | 이 지점 이전에 잠그지 말 것 (do-not-lock) | 왜 (paywall로 읽히는 이유) |
|---|---|---|---|
| **J1 기록형** | 첫 `deed_saved` | 저장 횟수 상한, 저장 전 계정/로그인 강제, 저장 전 결제정보 요구, 메모/사진 입력의 유료화 | "오늘 한 컷을 남긴다"는 잡 자체가 저장으로 닫힌다. 저장을 막으면 첫 가치가 발생하지 못한다. |
| **J2 누적형** | 첫 `deed_saved` + 보조 `level_up_viewed` | 누적/환생종 진행을 가리는 프리미엄 게이트, 첫 레벨업 이전 진행률 바·`나의 덕력` 잠금, 누적 보기 유료화 | J2의 보상은 누적감과 진화다. 첫 누적·첫 레벨업을 잠그면 "쌓는 재미"가 도착하기 전에 문이 보인다(`count===0` 빈틈을 더 키움). |
| **J3 AI 호기심형** | 첫 `deed_judged` (저장 전 닫힘 정상) | AI 채점 자체의 유료화, 첫 판정 전 결제정보 요구, `deed_rerolled`(한 번 더 보기)를 0회로 잠금 | J3의 목적은 "AI가 어떻게 보는지"다. 채점이 곧 first value이므로 채점을 잠그면 잡이 성립하지 않는다. 재채점 호기심 신호까지 막으면 진입 동기가 사라진다. |
| **J4 회고형** | 첫 `deed_saved` | 첫 항목 저장 유료화, 로그(`최근 덕행`/덕행록) 존재 자체의 유료 게이트, 저장 전 백업/내보내기 강제 결제 | J4의 가치는 "나중에 돌아볼 게 생긴다"이다. 첫 항목 저장을 막으면 돌아볼 대상이 만들어지지 못한다. |

> **공통 금지선:** 네 잡 모두 first value 도달 **이전**에는 (a) 결제정보 요구, (b) 계정/로그인 강제, (c) self-serve 플랜 선택 화면, (d) 핵심 행동(저장·채점)의 횟수 0 잠금을 두지 않는다. 이들은 모두 aha moment 앞에 놓이면 paywall로 읽힌다.

## §3 첫 가치 이후에만 검토할 확장/유료화 트리거 후보 (post-first-value, candidate-only)

좋은 업그레이드 트리거는 사용자가 **이미 가치를 얻은 뒤** "더 하고 싶은 일"에 연결된다. usage cap·협업·보안/관리·통합·성능/지원 같은 제한은 제품 의존이 생긴 뒤에 의미가 커진다(출처 노트). 아래는 **후보일 뿐**이며, 실제 반복 가치를 관찰하기 전에는 확정·구현하지 않는다(§0 전제3).

| 잡 | 첫 가치 이후 관찰할 반복 신호 (기존 이벤트, read-only) | 확장/유료화 트리거 **후보** (candidate-only) | 카피 번역 원칙 (토큰/크레딧 금지) |
|---|---|---|---|
| **J1 기록형** | 반복 `deed_saved`(둘째 저장 이후), 메모/사진 손맛 사용 | 긴 회고 보존, 풍부한 입력(다중 사진/태그), 내보내기/백업 | "더 많은 토큰"이 아니라 "긴 회고 보존", "내보내기/백업"처럼 체감 일 단위로 |
| **J2 누적형** | 반복 `deed_saved`로 총합 증가, 반복 `level_up_viewed` | 진행/통계 심화(반복 패턴 분석), 환생종 컬렉션 확장, 누적 히스토리 보기 | "더 많은 판정"·"반복 패턴 분석"처럼 사용자가 체감하는 결과로 |
| **J3 AI 호기심형** | 반복 `deed_judged`, 반복 `deed_rerolled`(다르게 보기 욕구) | 더 많은 판정/재채점, 심화 판단 관점, 판정 히스토리 비교 | "더 많은 판정", "더 깊은 판단"처럼 — 토큰·크레딧·사용량 원가 지표로 표현 금지 |
| **J4 회고형** | 덕행록 재방문(첫 세션 밖), 누적 항목 증가 | 긴 보존 기간, 내보내기/백업, 검색/필터 심화 | "긴 회고 보존", "내보내기/백업"처럼 일 단위 — 저장 용량(MB) 같은 원가 지표 지양 |

> **트리거 판별 질문(정성 관찰용 후보):** "무엇이 더 많아지면 돈을 낼 이유가 생기는가?"가 아니라 **"무엇을 더 하고 싶어서 막히면 아쉬운가?"** 로 묻는다(출처 노트 후속 #3). 전자는 가격을 먼저 세우고, 후자는 가치를 먼저 확인한다. AI 판단 비용이 실제 원가가 되더라도, 사용자 카피는 토큰/크레딧이 아니라 완성된 일·판단의 신뢰·반복 가능한 결과로 번역한다(출처 노트).

## §4 `deed_save_capped` 오독 금지 (do-not-misread)

`deed_save_capped`는 **availability/friction 신호이지 monetization intent나 upgrade demand가 아니다.** 이를 과금 신호로 오독하면 "사용자가 더 원해서 막혔다"로 잘못 읽혀, 첫 가치 이전에 유료화를 끌어오는 사고로 이어진다.

- **발화 메커닉(사실).** `deed_save_capped`는 `apps/web/src/app/add/page.tsx:167`에서 **30덕 상한 초과 시 저장 중단(early return)** 으로 발화하며, 이때 `deed_saved`는 발화하지 않는다. 즉 cap은 저장이라는 first value 행동이 **차단된** 구간이다.
- **올바른 판독.** cap 구간은 선행 문서대로 **availability-blocked로 처리**해 activation/TTV 집계에서 제외하고, 신호 부재(저장 미발화)를 가치 부재로 읽지 않는다(`traffic-source-reading-boundary-table.md` §3 계승).
- **금지 판독.** cap 횟수를 "업그레이드 수요", "유료 전환 의향", "더 쓰고 싶다는 monetization intent"로 환산하지 않는다. cap은 과몰입을 막는 의도된 마찰(J2 기준)이거나 가용성 한도일 뿐이며, 유료화 트리거의 근거로 사용하지 않는다.
- **트리거와의 관계.** §3의 usage cap류 트리거 후보는 **첫 가치를 이미 얻은 사용자**의 반복 욕구에서만 의미를 가진다. `deed_save_capped` 자체가 그 욕구를 증명하지 않는다 — 그것은 한도에 닿았다는 사실일 뿐, 더 원한다는 신호가 아니다.

## §5 승인 필요 경계 (approval-needed → Waiting)

아래는 본 Intent로 결정·구현하지 않으며, **사용자 승인 전까지 Waiting** 대상이다. Infinity 작업은 가격 결정이 아니라 prelaunch boundary brief 작성에 머무른다(출처 노트).

| 항목 | 상태 | 사유 |
|---|---|---|
| 공개 가격표 / 플랜 구조 확정 | **Waiting (approval-needed)** | prelaunch·low-signal에서 가격을 먼저 세우면 약속의 경계가 가치보다 앞선다 |
| 결제 연동 (결제정보 요구·페이먼트) | **Waiting (approval-needed)** | 첫 가치 이전 결제정보 요구는 PLG 흔한 실수 — 금지(§2) |
| 트래킹 변경 (신규 이벤트·속성·대시보드·플래그) | **Waiting (approval-needed)** | 본 브리프는 기존 이벤트 인용에 한정. 신규 0(§0 전제2) |
| paywall / 유료화 실험 | **Waiting (approval-needed)** | aha moment를 잠그는 실험은 activation 관찰을 오염 |
| §3 확장/유료화 트리거 확정·구현 | **Waiting (approval-needed)** | 반복 가치 관찰 전에는 후보로만 보관(§0 전제3) |
| 배포·CI·권한·시크릿·비용·외부 메시징 변경 | **Waiting (out-of-scope)** | 본 Intent 산출물은 docs 1파일뿐 |

## §6 충돌 점검 (no-conflict)

| 대상 문서 | 충돌 여부 | 근거 |
|---|---|---|
| `first-session-jtbd-matrix.md` (m06) | 없음 | J1/J2/J4=`deed_saved`·J3=`deed_judged` first-value 매핑을 §0·§2에서 그대로 계승. 재정의 0 |
| `traffic-source-reading-boundary-table.md` (m25) | 없음 | `deed_save_capped`를 availability-blocked로 보는 §3 판독을 §4에서 계승. 새 판독 규칙 0 |
| `seven-day-deed-loop.md` | 없음 | `deed_saved` 중심 활성화 정의와 30덕 상한·재채점 3회 한도(의도된 마찰)를 인용만. 정의 변경 0 |
| `copy-spec.md` (금지어) | 없음 | 사용자 노출 카피 0건. §3의 "긴 회고 보존" 등은 카피 후보가 아니라 번역 **원칙** 설명. 금지어 미사용 |

## Out of scope

본 Intent(marketing-28)로 수행하지 않으며, 각각 별도 Intent에서 결정한다.

- 가격·플랜·금액 확정 **0건** — 산출물은 docs 1파일뿐이다.
- 코드·카피·결제·런타임 변경 **0건** — `src/`·`public/`·결제 연동 어느 것도 본 Intent로 변경하지 않는다.
- 트래킹/PostHog 변경 **0건** — 신규 이벤트·속성·플래그·대시보드·세션리플레이 생성 0.
- 외부 메시징 **0건** — 이메일·SMS·푸시·DM·SNS·설문·인터뷰·광고 없음.
- 배포·CI·프로덕션·시크릿·권한·개인정보 변경 **0건**.
- §3 확장/유료화 트리거의 확정·구현·실험 — 후보 보관에 한정(승인 전 Waiting, §5).

본 문서 작성이 위 경계를 지켰음을 검증하는 절차:

```bash
git diff --stat -- apps/web/src apps/ios/Sources   # 출력 없어야 함 (코드 변경 0)
git status --short                                  # docs 1파일 추가만
rg -n '^<{7}|^={7}|^>{7}' apps/web/docs/prelaunch-monetization-boundary-brief.md   # 충돌 마커 0
```

---

## 검증 매핑

| 성공 기준 (marketing-28) | 충족 섹션 |
|---|---|
| J1-J4 첫 가치 이전에 잠그지 말 것 | §2 (심장 표 1) |
| 첫 가치 이후에만 검토할 확장/유료화 트리거 후보 | §3 (심장 표 2, candidate-only) |
| `deed_save_capped` 오독 경고 (monetization intent 아님) | §4 |
| 승인 필요 경계 | §5 (approval-needed → Waiting) |
| first-value 매핑 유지 (J1/J2/J4=`deed_saved`, J3=`deed_judged`) | §0, §2, §6 |
| 선행 문서 충돌 0 | §6 (no-conflict) |
| 신규 이벤트·코드·카피·결제 0 | §0 전제2, Out of scope |
