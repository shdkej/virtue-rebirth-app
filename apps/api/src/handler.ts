import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { z } from "zod";
import { Resource } from "sst";
import { buildSystemPrompt } from "./scorePrompt.js";

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"] as const;
const RequestSchema = z.object({
  imageBase64: z.string().min(1).max(7_500_000),
  mimeType: z.enum(ALLOWED_MIME),
  memo: z.string().max(500).optional(),
  toneMode: z.enum(["soft", "casual"]).optional(),
});
const ResultSchema = z.object({
  score: z.number().int().min(0).max(10),
  comment: z.string().min(1).max(120),
  tags: z.array(z.string().min(1).max(20)).max(2),
});

// Gemini 출력 구조 강제 (타입/필드/순서). 구조적 schema 위반을 막아
// primary 호출이 ai_invalid_schema로 떨어져 fallback을 2번 호출하는 낭비를 줄인다.
// (길이 제약은 Gemini schema가 보장 못 하므로 프롬프트 + zod가 최종 가드)
const GEMINI_RESPONSE_SCHEMA = {
  type: SchemaType.OBJECT,
  properties: {
    score: { type: SchemaType.INTEGER },
    comment: { type: SchemaType.STRING },
    tags: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
  },
  required: ["score", "comment", "tags"],
};

const json = (status: number, body: unknown): APIGatewayProxyResultV2 => ({
  statusCode: status,
  headers: { "content-type": "application/json" },
  body: JSON.stringify(body),
});

export const handler = async (
  event: APIGatewayProxyEventV2,
): Promise<APIGatewayProxyResultV2> => {
  let raw: unknown;
  try {
    const text = event.isBase64Encoded
      ? Buffer.from(event.body ?? "", "base64").toString("utf8")
      : event.body ?? "";
    raw = JSON.parse(text);
  } catch {
    return json(400, { error: "invalid_json" });
  }

  const parsed = RequestSchema.safeParse(raw);
  if (!parsed.success) return json(400, { error: "invalid_request", detail: parsed.error.issues });

  const { imageBase64, mimeType, memo, toneMode = "soft" } = parsed.data;
  const primary = process.env.SCORING_MODEL ?? "gemini-3-pro-preview";
  const fallback = process.env.SCORING_MODEL_FALLBACK ?? "gemini-2.5-flash";
  const gemini = new GoogleGenerativeAI(Resource.GEMINI_API_KEY.value);

  const call = async (modelName: string) => {
    const model = gemini.getGenerativeModel({
      model: modelName,
      systemInstruction: buildSystemPrompt(toneMode),
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: GEMINI_RESPONSE_SCHEMA,
        // gemini-2.5-flash는 thinking 토큰이 출력 예산을 함께 소비한다.
        // 256은 thinking이 다 먹어 JSON이 잘리므로 충분히 키운다 (cap이라 실사용분만 과금).
        maxOutputTokens: 2048,
        temperature: 0.4,
      },
    });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType, data: imageBase64 } },
            ...(memo ? [{ text: `메모: ${memo}` }] : []),
          ],
        },
      ],
    });
    const text = result.response.text().trim();
    let aiJson: unknown;
    try { aiJson = JSON.parse(text); }
    catch {
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error(`ai_no_json: ${text.slice(0, 120)}`);
      aiJson = JSON.parse(match[0]);
    }
    const validated = ResultSchema.safeParse(aiJson);
    if (!validated.success) throw new Error("ai_invalid_schema");
    return validated.data;
  };

  // 1차: primary 모델 → 실패 시 fallback 모델로 재시도
  try {
    const data = await call(primary);
    return json(200, { source: "ai", model: primary, ...data });
  } catch (primaryErr) {
    const primaryMsg = primaryErr instanceof Error ? primaryErr.message : "unknown";
    try {
      const data = await call(fallback);
      return json(200, { source: "ai_fallback", model: fallback, primaryError: primaryMsg, ...data });
    } catch (fallbackErr) {
      const fallbackMsg = fallbackErr instanceof Error ? fallbackErr.message : "unknown";
      return json(502, {
        error: "ai_call_failed",
        primaryModel: primary,
        primaryError: primaryMsg,
        fallbackModel: fallback,
        fallbackError: fallbackMsg,
      });
    }
  }
};
