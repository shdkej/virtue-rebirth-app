import { z } from "zod";

export const ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;

export const ScoreRequestSchema = z.object({
  imageBase64: z
    .string()
    .min(1)
    .max(7_500_000),
  mimeType: z.enum(ALLOWED_MIME),
  memo: z.string().max(500).optional(),
  toneMode: z.enum(["soft", "casual"]).optional(),
});

export type IScoreRequest = z.infer<typeof ScoreRequestSchema>;

export const ScoreResultSchema = z.object({
  score: z.number().int().min(0).max(10),
  comment: z.string().min(1).max(120),
  tags: z.array(z.string().min(1).max(20)).max(2),
});

export type IScoreResult = z.infer<typeof ScoreResultSchema>;
