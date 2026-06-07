import { ScoreRequestSchema } from "@/lib/score-schema";
import { getPostHogClient } from "@/lib/posthog-server";

export const runtime = "nodejs";
export const dynamic = "auto";
export const maxDuration = 30;

// 채점 로직은 Lambda(`virtue-rebirth-lambda`)가 단일 출처(SoT).
// 이 라우트는 얇은 프록시 + 서버측 PostHog 로깅만 담당한다.
//   - dev:        https://score-dev.virtue.aws.shdkej.com/score
//   - production: https://score.virtue.aws.shdkej.com/score
const DEFAULT_LAMBDA_URL = "https://score.virtue.aws.shdkej.com/score";

export async function POST(req: Request) {
  const lambdaUrl = process.env.SCORE_LAMBDA_URL ?? DEFAULT_LAMBDA_URL;

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

  try {
    const upstream = await fetch(lambdaUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const text = await upstream.text();
    let body: Record<string, unknown> = {};
    try { body = JSON.parse(text); } catch { /* keep empty */ }

    if (upstream.ok && typeof body.score === "number") {
      getPostHogClient().capture({
        distinctId: "server",
        event: "deed_scored",
        properties: {
          score: body.score,
          model: body.model ?? null,
          source: body.source ?? "ai",
          tone_mode: parsed.data.toneMode ?? "soft",
          via: "lambda-proxy",
        },
      });
    } else {
      getPostHogClient().capture({
        distinctId: "server",
        event: "deed_score_failed",
        properties: {
          status: upstream.status,
          error: body.error ?? "upstream_error",
          via: "lambda-proxy",
        },
      });
    }

    return new Response(text, {
      status: upstream.status,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown_error";
    getPostHogClient().capture({
      distinctId: "server",
      event: "deed_score_failed",
      properties: { error: "lambda_unreachable", message },
    });
    return Response.json(
      { error: "lambda_unreachable", message },
      { status: 502 },
    );
  }
}
