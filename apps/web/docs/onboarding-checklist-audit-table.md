---
작성일: 2026-06-02
Intent: marketing-35
Mode: 내부 기획 L1
Status: draft
Owner: Marketer (Planner/Developer/Operator 관점 포함)
---

# Virtue 잡별 온보딩 체크리스트 감사표

## 0. 목적 + 전제

### 목적

2026년형 PLG 온보딩 플레이북(Appcues / Supademo / ProductLed)의 공통 렌즈는 체크리스트를 **기능 안내 목록이 아니라 activation event까지의 3~5개 행동 경로**로 제한하라는 것이다. ProductLed의 Bowling Alley Framework로 말하면, 먼저 **first value까지의 최단 직선 경로(straight-line path)** 를 만들고, **범퍼(bumper)** 는 사용자가 옆길로 샐 때만 보조해야 한다. 핵심 경로에 없는 항목은 체크리스트에 넣지 않는다.

Virtue는 first value가 잡별로 다르다 — J1/J2/J4는 `deed_saved`, J3는 `deed_judged`. 단일 체크리스트를 그대로 붙이면 **J3의 정상 종료(저장 없이 `deed_judged`에서 가치가 닫힘)를 "저장 미완료"로 오독**하고, 정상 종료를 이탈처럼 집계할 위험이 있다.

본 문서는 UI를 구현하지 않는다. 대신 **체크리스트를 만들 경우 어떤 항목이 first value 경로(체크리스트 적격)이고, 어떤 항목은 범퍼로만 남겨야 하며, 어떤 항목은 막힘 신호가 있을 때만 떠야 하는 맥락 폴백이고, 어떤 항목은 절대 넣으면 안 되는지**를 J1~J4 잡별로 먼저 감사한다.

이 문서가 답하려는 질문은 "체크리스트를 붙일 것인가"가 아니다. 질문은 **"각 잡의 first value 직선 위에 어떤 행동을 두고, 직선 밖의 보조는 어떤 종류로 분리할 것인가"** 이다.

### 전제 (못박기)

- Virtue는 정식 출시 전이고 결정 등급 사용자 데이터가 없다. 모든 잡·항목 분류는 **가설**이며, 합성/mock/self-test·소수 표본 신호를 결정 등급으로 승격하지 않는다.
- 본 문서는 **새 트래킹/코드/카피/이벤트/속성/대시보드/세션리플레이/배포를 만들지 않는다.** 이미 구현된 화면과 기존 발화 이벤트만 인용한다.
- 기존 first value 매핑을 **재정의하지 않는다.** J1/J2/J4 = `deed_saved`:183, J3 = `deed_judged`:106(저장 전)을 그대로 계승한다.
- 가용성/마찰 신호(`deed_save_capped`:167, 503, 지연, 저장 상한)는 value·retention·upgrade demand가 아니라 **availability/friction**으로 분류한다.
- 인용 이벤트 앵커(현행 `apps/web/src/app/add/page.tsx` 일치): `add_flow_started`:72 · `deed_judged`:106 · `deed_judge_attempted`:135 · `deed_rerolled`:149 · `deed_save_capped`:167 · `deed_saved`:183 · `level_up_viewed`:199.

## 1. 개념: 체크리스트 항목의 4분류

체크리스트에 넣을지 말지를 한 번에 가르지 않고, 각 행동을 **first value 직선과의 관계**로 4종으로 분류한다. 이 분류가 그 항목의 처분(체크 항목 / 범퍼 / 폴백 / 금지)을 결정한다.

| 코드 | 분류 | 정의 | 처분 |
|---|---|---|---|
| **CL-ELIGIBLE** | 체크리스트 적격 | 그 잡의 first value 직선 경로 위에 있는 고임팩트 행동. 명확한 **동사**로 쓰고, 그 잡의 first value(`deed_saved` 또는 `deed_judged`)에 직접 연결된다. | 체크리스트에 넣을 수 있음 — 잡당 3~5개 이내, 완료 후 다음 단계까지 |
| **BUMPER-ONLY** | 범퍼로만 | 직선 경로 자체는 아니지만, 옆길로 샌(또는 진입을 못 한) 사용자를 first value로 되돌리는 보조 행동. | 항상 표시하지 않음 — 진행감/다음 행동 안내로만. 체크 항목으로 승격 금지 |
| **CONTEXTUAL-FALLBACK** | 맥락 폴백 | 기본은 숨김(dismissible). **이탈/막힘(B-LOST) 신호가 손기록될 때만** 다시 뜨는 안내(ProductLed의 conversational bumper). | 항상 노출 금지 — 막힘 신호 조건에서만 발동(§4). 모두 proposal-only |
| **DO-NOT-INCLUDE** | 금지 | first value 경로에 없는 기능 안내, 후행 가치, 또는 정상 종료를 이탈처럼 만드는 항목. | 체크리스트·범퍼·폴백 어디에도 넣지 않음(§5) |

핵심 원칙 3가지 (m31 본체/범퍼 경계표 계승):

1. **체크리스트는 first value 위치를 따라간다.** J1/J2/J4는 first value가 `deed_saved`(저장 후)라 체크리스트가 저장까지 이어지지만, J3는 first value가 `deed_judged`(저장 전)라 **체크리스트가 판정 확인에서 끝나야 한다.** 같은 "저장하기" 행동이 J1엔 CL-ELIGIBLE, J3엔 DO-NOT-INCLUDE다.
2. **체크리스트(범퍼)는 약한 제품 본체를 못 가린다.** 결과 카드(제품 본체)가 약하면 어떤 체크 항목·툴팁도 첫 가치를 살리지 못한다. 막힘이 B-MISMATCH(결과 기대 불일치)면 폴백 안내가 아니라 제품 약속/품질 문제로 라우팅한다.
3. **강제보다 dismissible.** 목적이 분명한 사용자는 직접 길을 찾을 수 있어야 하고, 안내는 막힘 신호가 있을 때만 다시 떠야 한다(§4).

> 막힘 4분류(B-LOST 길 잃음 / B-MISMATCH 결과 불일치 / B-AVAIL 가용성 / B-NORMAL 정상 종료)는 `product-body-vs-bumper-boundary-table.md` §2를 그대로 계승한다. 본 문서는 그 위에 "체크리스트 항목 분류" 축만 더한다.

## 2. 잡별 체크리스트 감사표 (이 문서의 심장)

각 잡에 대해 **CL-ELIGIBLE(체크 적격) / BUMPER-ONLY(범퍼) / CONTEXTUAL-FALLBACK(맥락 폴백) / DO-NOT-INCLUDE(금지)** 를 분리한다. 행동은 기능명이 아니라 **동사**로 쓴다. 모든 항목은 가설이며 실제 화면과 기존 이벤트에 근거한다.

표면 약칭(m31 계승): S1 = `/` 홈 · S2 = `/add` 입력 · S3 = 결과 카드(`deed_judged`) · S4 = 저장 후 홈(`deed_saved`).

### J1 기록형 — first value = `deed_saved`:183 ("오늘 사소한 행동을 남겼다")

| 분류 | 항목 (행동 동사) | 이벤트/표면 근거 | 비고 |
|---|---|---|---|
| **CL-ELIGIBLE** | ① 오늘 한 일을 한 줄(또는 한 컷)로 남기기 | S2 `add_flow_started`:72 | 직선 진입 |
| **CL-ELIGIBLE** | ② AI 판정을 확인하기 | S3 `deed_judged`:106 | 통과점(가치의 끝 아님) |
| **CL-ELIGIBLE** | ③ 저장해서 오늘 기록 남기기 | S4 `deed_saved`:183 = **first value** | 완료 = 정상 종료 |
| **BUMPER-ONLY** | 홈 빈 상태에서 `오늘 덕 쌓기`로 입력 진입 | S1 범퍼(m31) | 진입 못 한 사용자만 |
| **CONTEXTUAL-FALLBACK** | 입력에서 멈추면 "사진 없이 한 줄도 돼요" 류 재안내 | S2 B-LOST 시 | proposal-only, 막힘 시만 |
| **DO-NOT-INCLUDE** | AI 채점 원리 설명, 누적/환생종 설명, 프로필·설정 완성 | first value 후행/타잡 | J1 직선 밖 |

### J2 누적형 — first value = `deed_saved`:183 (총합↑, "쌓였다")

| 분류 | 항목 (행동 동사) | 이벤트/표면 근거 | 비고 |
|---|---|---|---|
| **CL-ELIGIBLE** | ① 오늘 한 일을 남기기 | S2 `add_flow_started`:72 | 직선 진입 |
| **CL-ELIGIBLE** | ② AI 판정을 확인하기 | S3 `deed_judged`:106 | 통과점 |
| **CL-ELIGIBLE** | ③ 저장해서 덕력 올리기 | S4 `deed_saved`:183 = **first value**(총합↑) | 완료 = 정상 종료 |
| **CL-ELIGIBLE(선택)** | ④ 저장 후 홈에서 누적 변화 확인하기 | S4 `level_up_viewed`:199(조건부) | stage 상승 시만 발화 — 강제 아님 |
| **BUMPER-ONLY** | `count===0` 빈 상태에서 환생종 진행 암시 | S1 본체지만 첫 진입엔 공백 | **주의: B-MISMATCH 후보** — 제품 약속 공백이라 범퍼로 절반만 가려짐 |
| **CONTEXTUAL-FALLBACK** | 입력 진입에서 길 잃으면 재안내 | S2 B-LOST 시 | proposal-only |
| **DO-NOT-INCLUDE** | 리더보드·친구 초대·랭킹, 가격/업그레이드 안내 | 누적 본체 아님 / monetization | prelaunch 금지 |

### J3 AI 호기심형 — first value = `deed_judged`:106 (저장 전 닫힘, "AI가 내 행동을 이렇게 봤다")

| 분류 | 항목 (행동 동사) | 이벤트/표면 근거 | 비고 |
|---|---|---|---|
| **CL-ELIGIBLE** | ① 오늘 한 일을 입력하기 | S2 `add_flow_started`:72 | 직선 진입 |
| **CL-ELIGIBLE** | ② AI가 어떻게 봤는지 읽기 | S3 `deed_judged`:106 = **first value** | **여기서 체크리스트가 끝난다** |
| **CL-ELIGIBLE(선택)** | ③ 다르게 보고 싶으면 다시 보기 | S3 `deed_rerolled`:149 | 호기심 신호 — 강제 아님 |
| **BUMPER-ONLY** | 첫 화면에 "AI가 네 행동을 해석해" 진입 동기 | S1 약한 범퍼(m31) | AI가 S2/S3에서야 등장하므로 진입 동기 보강 |
| **CONTEXTUAL-FALLBACK** | 입력 전 길 잃으면 재안내 | S2 B-LOST 시만 | 결과 카드 후 멈춤은 폴백 대상 아님(아래) |
| **DO-NOT-INCLUDE** | **"저장하기"를 필수 체크 항목으로 넣기** | S4 — J3엔 범퍼(선택) | **핵심 금지**: judged 후 저장 없이 닫힘 = B-NORMAL 정상 종료. 저장 강제는 첫 가치 흐름 방해 + 정상 종료를 미완료로 오독 |

### J4 회고형 — first value = `deed_saved`:183 (로그 첫 항목, "나중에 돌아볼 게 생겼다")

| 분류 | 항목 (행동 동사) | 이벤트/표면 근거 | 비고 |
|---|---|---|---|
| **CL-ELIGIBLE** | ① 오늘 한 일을 남기기 | S2 `add_flow_started`:72 | 직선 진입 |
| **CL-ELIGIBLE** | ② AI 판정을 확인하기 | S3 `deed_judged`:106 | 통과점 |
| **CL-ELIGIBLE** | ③ 저장해서 나중에 볼 항목 만들기 | S4 `deed_saved`:183 = **first value** | 완료 = 정상 종료(회고 자체는 첫 세션 밖) |
| **BUMPER-ONLY** | `최근 덕행` 미리보기로 "여기 쌓일 것" 암시 | S1 범퍼(m31) | 로그 존재 인지 |
| **CONTEXTUAL-FALLBACK** | 입력 멈춤 시 "사진 없이 메모만도 돼요" 재안내 | S2 B-LOST 시 | proposal-only |
| **DO-NOT-INCLUDE** | 덕행록(`/deeds`) 재방문 유도, 메모/태그 강제 | 첫 세션 밖 후행 가치 | 첫 항목 저장까지만 |

## 3. 잡별 보충 메모 (셀이 좁을 때만)

- **체크리스트 길이는 잡별로 다르다.** J1/J2/J4는 first value가 저장이라 체크리스트가 ①입력 → ②판정 → ③저장의 3단계까지 이어진다. **J3는 ①입력 → ②판정 2단계에서 끝난다** — 저장은 first value 다음의 선택이지 체크 항목이 아니다. 이 한 줄이 J3 체크리스트를 다른 잡과 다르게 만든다.
- **J2 ④ 누적 확인은 강제할 수 없다.** `level_up_viewed`:199는 환생종 stage가 실제로 오를 때만 발화하므로, 첫 세션에 안 떠도 정상이다. 체크 항목으로 넣되 "도달 못 하면 미완료" 합격선을 세우지 않는다.
- **J2의 `count===0` 빈 상태는 범퍼로 못 가린다.** 누적감 공백은 길 안내(B-LOST) 문제가 아니라 제품 약속(B-MISMATCH) 공백이다. 체크리스트 항목이 아니라 첫 화면 약속/결과 품질 후보로 라우팅한다(proposal-only).
- **J3의 `deed_rerolled`:149는 이탈이 아니라 호기심이다.** "다시 보기"를 체크리스트에 강제 단계로 넣으면 안 되고, 선택 항목으로만 둔다. 재판정 한도(`deed_judge_attempted`:135 기준 MAX_REROLLS)는 과몰입을 막는 의도된 마찰이다.
- **AI 채점 대기의 부호가 잡별로 뒤집힌다.** 대기는 J3엔 가치(결과가 목적), J1·J4엔 마찰(빨리 남기고 싶음)이다. 그래서 "판정 대기를 줄이자" 같은 일반 목표가 아니라 잡별로 다르게 다룬다(m31·jtbd-matrix §4 계승).

## 4. dismissibility / contextual fallback 발동 규칙

체크리스트와 안내는 강제가 아니다(Appcues: 강제보다 dismissible). 맥락 폴백(conversational bumper)은 **막힘 신호가 손기록될 때만** 발동한다. 발동 여부는 막힘 4분류로 가른다 — **분류가 발동에 선행한다.**

| 막힘 분류 | 폴백 발동? | 이유 |
|---|---|---|
| **B-LOST** (길 잃음: "이제 뭐 하지?", 맴돎) | **발동** | 이탈 지점에만 안내 재노출(proposal-only). 체크리스트가 돕는 정확한 대상 |
| **B-MISMATCH** (결과 기대 불일치: "이게 다야?") | **발동 안 함** | 제품 약속/결과 품질 문제 — 폴백 안내로 못 가린다. 제품 후보로 라우팅 |
| **B-AVAIL** (503·지연·`deed_save_capped`:167) | **발동 안 함** | availability/friction — 가용성 복구 문제. upgrade·value 신호로 환산 금지 |
| **B-NORMAL** (J3 judged 후 미저장 정상 종료) | **발동 금지** | 막힘이 아니다. 재안내·저장 유도 폴백을 띄우면 정상 종료를 압박으로 바꾼다 |

발동 규칙 요약:

1. 목적이 분명한 사용자(직접 길을 찾는)는 체크리스트를 **닫을 수 있어야** 한다. 닫음 자체를 이탈로 집계하지 않는다.
2. 폴백은 **B-LOST에만** 뜬다. B-MISMATCH·B-AVAIL·B-NORMAL에는 띄우지 않는다.
3. **J3 결과 카드 후 미저장에는 어떤 저장 유도 폴백도 띄우지 않는다**(B-NORMAL 보존).
4. 발동/문구/노출 조건은 모두 **proposal-only** — 본 Intent로 UI·카피·이벤트로 구현하지 않는다.

## 5. 공통 do-not-include 목록

잡 공통으로 체크리스트·범퍼·폴백 어디에도 넣지 않는 항목.

1. **기능 안내형 항목.** 핵심 first value 경로에 없는 기능 소개(설정·프로필·테마·튜토리얼)는 체크리스트에서 제외(Appcues: 핵심 경로 외 항목 금지).
2. **J3 "저장하기" 필수 체크 항목.** judged 후 저장 없이 닫는 정상 종료(B-NORMAL)를 미완료로 만든다. J3에선 저장은 선택, 체크 항목 아님.
3. **가용성/마찰을 유료화로 전환하는 항목.** `deed_save_capped`:167·503·지연을 "더 저장하려면 업그레이드" 류 안내로 바꾸지 않는다(availability/friction을 monetization으로 환산 금지).
4. **후행 가치를 첫 세션 체크리스트에 넣기.** 덕행록 재방문(J4), D7 재방문, 누적 2회차·`level_up_viewed` 도달을 "첫 세션 완료" 항목으로 강제하지 않는다(첫 세션 밖 또는 조건부 발화).
5. **결제·계정 강제·핵심 행동 잠금·가격/플랜 노출.** first value 이전 monetization은 두지 않는다(prelaunch-monetization-boundary 계승).
6. **외부 벤치마크 기반 완료율 합격선.** "체크리스트 N% 완료 = 활성화" 같은 수치 합격선을 prelaunch에 복사하지 않는다.

## 6. prelaunch 금지선

- 전환율·리텐션%·PMF 결론·외부 벤치마크(40%, 체크리스트 완료율 등) 산출 금지. 작은/synthetic/mock/self-test 표본을 결정 등급으로 승격하지 않는다.
- judged−saved 갭을 J3에서 이탈/가치 부재로 단정 금지(B-NORMAL).
- `deed_save_capped`:167·503·지연을 upgrade demand·monetization intent·재가치·TTV 종료로 환산 금지(B-AVAIL).
- 한 명 신호로 항목 분류(CL-ELIGIBLE/범퍼/폴백/금지)나 막힘 성격을 확정 금지.
- 체크리스트 항목·범퍼·폴백 문구는 **분석일 뿐**, 본 Intent로 카피·화면·이벤트·코드로 반영하지 않는다(proposal-only / approval-needed).
- 신규 이벤트·속성·카피·계측·대시보드·세션 리플레이·배포·외부 발송·비용·시크릿·권한·개인정보 변경 0.

## 7. 충돌 점검 (no-conflict verification)

| 대상 문서 | 충돌 여부 | 근거 |
|---|---|---|
| `docs/first-session-jtbd-matrix.md` (m06) | **없음** | J1~J4 정의와 first value 매핑(J1/J2/J4=`deed_saved`, J3=`deed_judged`)을 그대로 계승. 새 잡·세그먼트·매핑 0. |
| `docs/product-body-vs-bumper-boundary-table.md` (m31) | **없음** | 본체/범퍼 분류와 막힘 4분류(B-LOST/B-MISMATCH/B-AVAIL/B-NORMAL)를 계승하고, 그 위에 "체크리스트 항목 4분류" 축만 더함. 본체/범퍼 정의 변경 0. |
| `docs/activation-candidate-registry.md` (m33) | **없음** | 등록부의 후보 묶음·window·완료 이벤트 우선 원칙과 정렬. 체크리스트 CL-ELIGIBLE은 등록 묶음의 완료 이벤트(`deed_judged`/`deed_saved`)와 1:1. 새 묶음·window·합격선 0. |
| `docs/first-input-defaults-prompt-audit.md` (m32) | **없음** | 중립 placeholder가 잡을 구분 없이 부른다는 발견과 정렬 — 체크리스트도 잡별로 갈라야 함. 첫 입력 기본값 변경 0(proposal-only 유지). |
| `docs/ai-outcome-proxy-dictionary.md` (m30) | **없음** | 활동량≠인정 가치, `deed_save_capped`=availability/friction 계승. `deed_rerolled`를 호기심으로(이탈 아님) 읽음. |
| `docs/plg-foundation-exit-gate.md` (m34) | **없음** | 측정 가능성과 측정값 성패는 별개 게이트라는 원칙과 정렬 — 체크리스트 완료율을 측정값 합격선으로 쓰지 않음. Foundation 종료 조건 변경 0. |
| `docs/copy-spec.md` (금지어) | **없음** | 사용자 대상 신규 카피 0. 인용한 화면 문구(`오늘 덕 쌓기`, `최근 덕행` 등)는 기존 구현 문구이며 새로 만들지 않음. |

## Out of scope

- 외부 메시징/발송 (이메일·SMS·푸시·웹훅·DM·SNS 어떤 채널도).
- 트래킹/PostHog 변경 (신규 이벤트·속성·대시보드·플래그·세션 리플레이).
- 코드 변경 (`src/`·`public/`·런타임 설정 어느 것도 변경하지 않음. `docs/` 한 파일만 추가).
- 프로덕션/배포 변경 (새 빌드·CI 트리거 없음).
- 체크리스트·범퍼·폴백 항목·문구의 실제 UI/카피 반영 (모두 proposal-only / approval-needed).
- first value 매핑 재정의 (J1/J2/J4=`deed_saved`, J3=`deed_judged` 고정).
- 체크리스트 dismissibility 발동 조건의 실제 구현 (관찰 기준만 정의).

---

## 검증 매핑

| 성공 기준 | 충족 섹션 |
|---|---|
| 1. 체크리스트 항목 4분류 개념(적격/범퍼/폴백/금지) + 3원칙 | §1 |
| 2. J1~J4 × CL-ELIGIBLE / BUMPER-ONLY / CONTEXTUAL-FALLBACK / DO-NOT-INCLUDE 표 | §2 (4개 잡 표) |
| 3. product bumper 분리 | §2 BUMPER-ONLY 행 + §1 |
| 4. contextual fallback 발동 규칙(막힘 분류 기준) | §4 |
| 5. do-not-include 공통 목록 | §5 |
| 6. first value 매핑 계승, 재정의 0 (J1/J2/J4=`deed_saved`, J3=`deed_judged`) | §0·§2·§7 |
| 7. `deed_save_capped`=availability/friction, J3 정상 종료 보존 | §4·§5·§6 |
| 8. 선행 문서 충돌 점검 + prelaunch 금지선 | §6·§7·"Out of scope" |

## 학습 루프 (marketing loop)

- **계승한 기준:** first value 매핑(J1/J2/J4=`deed_saved`:183, J3=`deed_judged`:106) 재정의 0 · `deed_save_capped`:167=availability/friction(upgrade 환산 금지) · synthetic/mock/self-test·소수 표본 비결정 등급(Prelaunch Decision Boundary · Traffic Source Before Metrics) · J3 저장 없는 종료=정상(B-NORMAL) · 본체/범퍼 + 막힘 4분류(Product Body vs Bumper By Job, m31).
- **이번에 새로 배운 것:** 체크리스트(범퍼의 일종)는 first value 위치를 따라가 **잡별로 길이가 다르다** — J1/J2/J4는 입력→판정→저장 3단계, J3는 입력→판정 2단계에서 끝나고 저장은 체크 항목이 아니다. 같은 "저장하기"가 J1엔 CL-ELIGIBLE, J3엔 DO-NOT-INCLUDE로 부호가 뒤집힌다. 맥락 폴백(conversational bumper)은 B-LOST에만 발동하고 B-MISMATCH(제품)·B-AVAIL(가용성)·B-NORMAL(정상 종료)에는 발동하지 않는다.
- **다음 Marketer에게 넘길 규칙:** 체크리스트를 감사할 때 먼저 그 잡의 first value 이벤트를 확인하고(저장이냐 판정이냐), 체크리스트를 first value에서 끊는다. J3에 저장을 필수 체크로 넣지 않는다. 안내(폴백)는 막힘 4분류 중 B-LOST에만 띄우고, 가용성·정상 종료·제품 불일치에는 띄우지 않는다. 체크리스트 완료율을 활성화 합격선으로 쓰지 않는다.
- **MARKETING_LEARNINGS.md 승격 후보:** "Checklist Follows First Value By Job" — 온보딩 체크리스트는 first value 위치를 따라 잡별로 길이·종료점이 다르며(J1/J2/J4=저장에서 종료, J3=판정에서 종료), 맥락 폴백은 막힘 4분류 중 길 잃음(B-LOST)에만 발동한다. [[Product Body vs Bumper By Job]]·[[Measurement Readiness Is A Separate Gate]]를 보완하는 적용 규칙. (단일 실행 산출물이라 durable 승격은 다음 재사용 시 재확인 권장 — 이번엔 report 안에 보류 제안.)
