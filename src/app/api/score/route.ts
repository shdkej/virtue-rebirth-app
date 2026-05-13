import Anthropic from "@anthropic-ai/sdk";
import { ScoreRequestSchema, ScoreResultSchema } from "@/lib/score-schema";
import { buildSystemPrompt } from "@/lib/score-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const DEFAULT_MODEL = "claude-sonnet-4-6";

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "scoring_disabled", message: "ANTHROPIC_API_KEY 미설정. 클라이언트는 mock으로 폴백." },
      { status: 503 },
    );
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = ScoreRequestSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json(
      { error: "invalid_request", detail: parsed.error.issues },
      { status: 400 },
    );
  }
  const { imageBase64, mimeType, memo, toneMode = "soft" } = parsed.data;

  const model = process.env.SCORING_MODEL ?? DEFAULT_MODEL;
  const client = new Anthropic({ apiKey });
  const systemPrompt = buildSystemPrompt(toneMode);

  try {
    const resp = await client.messages.create({
      model,
      max_tokens: 256,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mimeType, data: imageBase64 },
            },
            ...(memo
              ? [{ type: "text" as const, text: `메모: ${memo}` }]
              : []),
          ],
        },
      ],
    });

    const text = resp.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n")
      .trim();

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      return Response.json(
        { error: "ai_no_json", raw: text },
        { status: 502 },
      );
    }

    let json: unknown;
    try {
      json = JSON.parse(match[0]);
    } catch {
      return Response.json(
        { error: "ai_bad_json", raw: text },
        { status: 502 },
      );
    }

    const validated = ScoreResultSchema.safeParse(json);
    if (!validated.success) {
      return Response.json(
        { error: "ai_invalid_schema", detail: validated.error.issues, raw: text },
        { status: 502 },
      );
    }

    return Response.json({
      source: "ai",
      model,
      ...validated.data,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown_error";
    return Response.json(
      { error: "ai_call_failed", message },
      { status: 502 },
    );
  }
}
