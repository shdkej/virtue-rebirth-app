# virtue-rebirth-lambda

iOS 앱(`virtue-rebirth-ios`)이 호출하는 채점 API. SST v3 + AWS API Gateway v2 + Lambda (`ap-northeast-2`).
**LLM은 Google Gemini** (`gemini-2.5-flash`). API 키는 SST Secret에만 저장.

## 엔드포인트

| 스테이지 | URL |
|----------|-----|
| production | `https://score.virtue.aws.shdkej.com/score` |
| dev        | `https://score-dev.virtue.aws.shdkej.com/score` |

DNS zone: `Z07242312C5BE3VLQW344` (`aws.shdkej.com`).

## 구조

```
sst.config.ts       ApiGatewayV2 + 커스텀 도메인 + Function + Secret
src/handler.ts      Gemini multimodal 호출 (inlineData 이미지 + 메모)
src/scorePrompt.ts  채점 시스템 프롬프트 (웹과 동기 — SoT)
```

## 첫 배포

```bash
cd ~/workspace/virtue-rebirth-lambda
pnpm install
pnpm secret:set         # Google AI Studio 키 입력 (https://aistudio.google.com/apikey)

npx sst deploy --stage dev          # → score-dev.virtue.aws.shdkej.com 발급
npx sst deploy --stage production   # → score.virtue.aws.shdkej.com (production)

# 참고: pnpm 10의 [ERR_PNPM_IGNORED_BUILDS] 워닝 때문에
# `pnpm deploy:dev`는 exit 1로 실패할 수 있음. npx 직접 호출 권장.
```

## 개발 (Live Lambda)

```bash
pnpm dev   # 로컬 핸들러 변경이 즉시 클라우드 Lambda에 반영
```

## 호출 예시

```bash
curl -X POST https://score-dev.virtue.aws.shdkej.com/score \
  -H 'content-type: application/json' \
  -d '{
    "imageBase64": "<base64>",
    "mimeType": "image/jpeg",
    "memo": "할머니 짐 들어드렸어요",
    "toneMode": "soft"
  }'

# → { "source":"ai", "model":"gemini-2.5-flash", "score":4, "comment":"...", "tags":["배려","일상"] }
```

## 보안 노트

- API Gateway 현재 인증 없음. 베타까진 OK. 출시 전 택1:
  - Apple App Attest 토큰 검증 (권장 — iOS 네이티브)
  - API Gateway + API Key + Usage Plan
  - Cloudflare Workers 앞단 + Turnstile

## 동기화 정책

`scorePrompt.ts`가 단일 출처(SoT). 웹 앱(`virtue-rebirth-app/src/lib/score-prompt.ts`)을 수정하면 여기도 같이 업데이트.

## 모델 변경

`sst.config.ts` 의 `SCORING_MODEL` 만 바꾸고 재배포. 후보: `gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-2.0-flash`.

## 참고

afzma(`~/workspace/afzma`)와 동일 SST/도메인/Gemini 패턴.
