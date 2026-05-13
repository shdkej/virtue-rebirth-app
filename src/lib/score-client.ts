import { mockJudge, type IJudgeResult, type ITone } from "./judge";
import { ALLOWED_MIME } from "./score-schema";

export type IJudgeSource = "ai" | "mock";

export type IFallbackReason = "api_error" | "network_error";

export interface IJudgeOutcome extends IJudgeResult {
  source: IJudgeSource;
  model?: string;
  fallbackReason?: IFallbackReason;
}

const isAllowedMime = (m: string): m is (typeof ALLOWED_MIME)[number] =>
  (ALLOWED_MIME as readonly string[]).includes(m);

const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = String(reader.result ?? "");
      const comma = data.indexOf(",");
      const base64 = comma >= 0 ? data.slice(comma + 1) : data;
      resolve({ base64, mimeType: file.type || "image/jpeg" });
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

  if (!file || !isAllowedMime(file.type)) {
    return { ...mockJudge(memo, tone), source: "mock" };
  }

  try {
    const { base64, mimeType } = await fileToBase64(file);
    const res = await fetch("/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64: base64, mimeType, memo, toneMode: tone }),
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
