"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Camera, ImagePlus, Loader2, RotateCw, Sparkles } from "lucide-react";
import { Card } from "@/components/card";
import { mockJudge, type IJudgeResult } from "@/lib/judge";

const AddDeedPage = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [memo, setMemo] = useState("");
  const [judging, setJudging] = useState(false);
  const [result, setResult] = useState<IJudgeResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    setResult(null);
  };

  const onJudge = () => {
    setJudging(true);
    setResult(null);
    setTimeout(() => {
      setResult(mockJudge(memo));
      setJudging(false);
    }, 900);
  };

  const onReset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setMemo("");
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col gap-4 px-5 pt-6 pb-4">
      <header className="flex items-center gap-2">
        <Link
          href="/"
          aria-label="뒤로"
          className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-base font-semibold">덕 쌓기</h1>
      </header>

      <Card className="overflow-hidden">
        <label
          htmlFor="proof-photo"
          className="relative flex aspect-[4/5] w-full cursor-pointer items-center justify-center bg-muted text-muted-foreground"
        >
          {preview ? (
            <img
              src={preview}
              alt="업로드한 인증 사진 미리보기"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-sm">
              <ImagePlus className="h-8 w-8" aria-hidden />
              <span>인증 사진을 골라주세요</span>
              <span className="text-[11px] text-muted-foreground">카메라 또는 갤러리</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            id="proof-photo"
            type="file"
            accept="image/*"
            capture="environment"
            className="sr-only"
            onChange={onPickFile}
          />
        </label>
      </Card>

      <Card className="px-4 py-3">
        <label htmlFor="memo" className="text-xs text-muted-foreground">
          한 줄 메모 (선택)
        </label>
        <textarea
          id="memo"
          rows={2}
          placeholder="뭐 했어요? 짧게 적어주세요."
          value={memo}
          maxLength={120}
          onChange={(e) => setMemo(e.target.value)}
          className="mt-1 w-full resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
        />
        <div className="mt-1 text-right text-[10px] text-muted-foreground">{memo.length}/120</div>
      </Card>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={judging}
          onClick={onJudge}
          className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[color-mix(in_oklab,var(--brand),transparent_70%)] transition active:scale-[0.98] disabled:opacity-60"
        >
          {judging ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              채점 중...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden />
              AI 채점
            </>
          )}
        </button>
        {(preview || memo) && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center rounded-2xl border border-border bg-card px-4 text-muted-foreground"
            aria-label="초기화"
          >
            <RotateCw className="h-4 w-4" />
          </button>
        )}
      </div>

      {result && (
        <Card className="animate-virtue-pop px-5 py-5">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">AI 채점 결과</p>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground">
              mock
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span
              className="text-4xl font-bold tabular-nums"
              style={{ color: result.score === 0 ? "var(--negative)" : "var(--ui-amber)" }}
            >
              {result.score >= 0 ? "+" : ""}
              {result.score}
            </span>
            <span className="text-base text-muted-foreground">덕</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed">{result.comment}</p>
          {result.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {result.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  #{t}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={onReset}
              className="flex flex-1 items-center justify-center rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground"
            >
              취소
            </button>
            <button
              type="button"
              onClick={onJudge}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground"
            >
              <RotateCw className="h-3.5 w-3.5" aria-hidden />한 번 더
            </button>
            <button
              type="button"
              onClick={() => {
                onReset();
              }}
              className="flex flex-1 items-center justify-center rounded-xl bg-[var(--positive)] px-3 py-2 text-xs font-semibold text-white"
            >
              저장
            </button>
          </div>
        </Card>
      )}

      {!result && !preview && (
        <p className="px-1 text-[11px] leading-relaxed text-muted-foreground">
          <Camera className="-mt-0.5 mr-1 inline h-3 w-3" aria-hidden /> 사진은 로컬에만 잠시 머물러요. 채점은 mock으로 진행됩니다.
        </p>
      )}
    </div>
  );
};

export default AddDeedPage;
