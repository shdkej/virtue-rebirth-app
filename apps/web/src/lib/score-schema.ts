import { z } from "zod";

export const ALLOWED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

export const ScoreRequestSchema = z.object({
  imageBase64: z
    .string()
    .min(1)
    .max(7_500_000)
    .optional(),
  mimeType: z.enum(ALLOWED_MIME).optional(),
  memo: z.string().max(500).optional(),
  toneMode: z.enum(["soft", "casual"]).optional(),
}).superRefine((value, ctx) => {
  const hasImage = !!value.imageBase64;
  const hasMime = !!value.mimeType;
  const hasMemo = !!value.memo?.trim();

  if (hasImage !== hasMime) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "imageBase64 and mimeType must be provided together",
      path: hasImage ? ["mimeType"] : ["imageBase64"],
    });
  }

  if (!hasImage && !hasMemo) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Provide a photo or memo to score",
      path: ["memo"],
    });
  }
});

export type IScoreRequest = z.infer<typeof ScoreRequestSchema>;

export const ScoreResultSchema = z.object({
  score: z.number().int().min(0).max(10),
  comment: z.string().min(1).max(120),
  tags: z.array(z.string().min(1).max(20)).max(2),
});

export type IScoreResult = z.infer<typeof ScoreResultSchema>;
