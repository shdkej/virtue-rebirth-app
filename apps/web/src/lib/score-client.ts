import { mockJudge, type IJudgeResult, type ITone } from "./judge";
import { ALLOWED_MIME } from "./score-schema";

export type IJudgeSource = "ai" | "mock";

export type IFallbackReason = "api_error" | "network_error";

export interface IJudgeOutcome extends IJudgeResult {
  source: IJudgeSource;
  model?: string;
  fallbackReason?: IFallbackReason;
}

const scoreApiUrl = process.env.NEXT_PUBLIC_SCORE_API_URL || "/api/score";

const isAllowedMime = (m: string): m is (typeof ALLOWED_MIME)[number] =>
  (ALLOWED_MIME as readonly string[]).includes(m);

const inferMimeType = (file: File): (typeof ALLOWED_MIME)[number] | null => {
  if (isAllowedMime(file.type)) return file.type;

  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "heic") return "image/heic";
  if (ext === "heif") return "image/heif";

  return null;
};

const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = String(reader.result ?? "");
      const comma = data.indexOf(",");
      const base64 = comma >= 0 ? data.slice(comma + 1) : data;
      resolve({ base64, mimeType: inferMimeType(file) ?? "image/jpeg" });
    };
    reader.onerror = () => reject(reader.error ?? new Error("read_failed"));
    reader.readAsDataURL(file);
  });

export const judgeWithFallback = async (params: {
  file: File | null;
  memo: string;
  tone: ITone;
}): Promise<IJudgeOutcome> => {
  const { file, memo, tone } = params;
  const trimmedMemo = memo.trim();

  if (!file && !trimmedMemo) {
    return { ...mockJudge(memo, tone), source: "mock" };
  }

  if (process.env.NEXT_PUBLIC_SCORING_MODE !== "ai") {
    return { ...mockJudge(memo, tone), source: "mock" };
  }

  const inferredMimeType = file ? inferMimeType(file) : null;
  if (file && !inferredMimeType) {
    return { ...mockJudge(memo, tone), source: "mock", fallbackReason: "api_error" };
  }

  try {
    const image = file ? await fileToBase64(file) : null;
    const res = await fetch(scoreApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(image ? { imageBase64: image.base64, mimeType: image.mimeType } : {}),
        memo: trimmedMemo || undefined,
        toneMode: tone,
      }),
    });

    if (!res.ok) {
      return { ...mockJudge(memo, tone), source: "mock", fallbackReason: "api_error" };
    }

    const data = (await res.json()) as {
      score: number;
      comment: string;
      tags: string[];
      model?: string;
    };

    return {
      score: data.score,
      comment: data.comment,
      tags: data.tags,
      source: "ai",
      model: data.model,
    };
  } catch {
    return { ...mockJudge(memo, tone), source: "mock", fallbackReason: "network_error" };
  }
};
