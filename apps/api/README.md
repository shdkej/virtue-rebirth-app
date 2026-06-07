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
src/handler.ts      Gemini 호출 (이미지+메모 또는 메모-only)
src/scorePrompt.ts  채점 시스템 프롬프트 (API SoT)
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

사진 없이 메모만 보내는 것도 허용한다. 이때는 보수적으로 낮거나 중간 점수를 매긴다.

```bash
curl -X POST https://score.virtue.aws.shdkej.com/score \
  -H 'content-type: application/json' \
  -d '{"memo":"아침에 엘리베이터 문을 잡아줬어요","toneMode":"soft"}'
```

## 보안 노트

- API Gateway 현재 인증 없음. 베타까진 OK. 출시 전 택1:
  - Apple App Attest 토큰 검증 (권장 — iOS 네이티브)
  - API Gateway + API Key + Usage Plan
  - Cloudflare Workers 앞단 + Turnstile
- 현재 공개 웹 정적판(`https://virtue.aws.shdkej.com`)에서 직접 호출할 수 있도록 production CORS를 해당 origin으로 제한한다.
- 기본 남용 방지는 2겹이다: Lambda reserved concurrency 5, API Gateway `$default` stage throttling `rate=2 rps`, `burst=10`.

## 동기화 정책

`src/scorePrompt.ts`가 API 채점 프롬프트의 단일 출처(SoT).

## 모델 변경

`sst.config.ts` 의 `SCORING_MODEL` / `SCORING_MODEL_FALLBACK` 을 바꾸고 재배포. 현재 production 기본값은 `gemini-2.5-flash`, fallback은 `gemini-2.5-flash-lite`.

## 참고

afzma(`~/workspace/afzma`)와 동일 SST/도메인/Gemini 패턴.
