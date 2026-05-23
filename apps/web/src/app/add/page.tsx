"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, ImagePlus, Loader2, RotateCw, Sparkles } from "lucide-react";
import { Card } from "@/components/card";
import { ScorePill } from "@/components/score-pill";
import { TagChip } from "@/components/tag-chip";
import { LevelUpSheet } from "@/components/level-up-sheet";
import { showToast } from "@/components/toast";
import posthog from "posthog-js";
import { judgeWithFallback, type IJudgeOutcome } from "@/lib/score-client";
import {
  addDeed,
  useTone,
  useDailyCapEnabled,
  useVirtueStats,
} from "@/lib/store";
import { DAILY_CAP } from "@/lib/mock-data";
import { getRecentlyUnlocked, type ISpecies } from "@/lib/species";

const MAX_REROLLS = 3;

// AI vs mock label. In mock mode we don't promise "AI 채점" since the runtime
// returns mock judgements. NEXT_PUBLIC_SCORING_MODE is the same env the
// score-client uses to actually decide.
const IS_AI_MODE = process.env.NEXT_PUBLIC_SCORING_MODE === "ai";
const JUDGE_LABEL = IS_AI_MODE ? "AI 채점" : "임시 판정";
const JUDGE_HEADER = IS_AI_MODE ? "AI가 본 오늘" : "임시 판정 결과";

const AddDeedPage = () => {
  const router = useRouter();
  const [tone] = useTone();
  const [capEnabled] = useDailyCapEnabled();
  const stats = useVirtueStats();

  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [memo, setMemo] = useState("");
  const [judging, setJudging] = useState(false);
  const [result, setResult] = useState<IJudgeOutcome | null>(null);
  const [rerolls, setRerolls] = useState(0);
  const [unlocked, setUnlocked] = useState<ISpecies | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Funnel instrumentation: did the user actually save before leaving /add,
  // and what had they engaged with at unmount? Refs keep the unmount handler
  // reading the latest values without re-subscribing the mount effect.
  const savedRef = useRef(false);
  const engagementRef = useRef({ hadPhoto: false, hadMemo: false, hadJudgment: false });

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Keep the latest engagement state available to the unmount handler.
  useEffect(() => {
    engagementRef.current = {
      hadPhoto: !!file,
      hadMemo: memo.trim().length > 0,
      hadJudgment: !!result,
    };
  }, [file, memo, result]);

  // Add-flow funnel: entry on mount, abandon on unmount when nothing was saved.
  // Pairs with deed_judge_attempted / deed_judged / deed_saved to locate the
  // landing → add → judge → save drop-off the activation audit is chasing.
  useEffect(() => {
    posthog.capture("add_flow_started", {
      scoring_mode: IS_AI_MODE ? "ai" : "mock",
    });
    return () => {
      if (savedRef.current) return;
      const { hadPhoto, hadMemo, hadJudgment } = engagementRef.current;
      posthog.capture("add_flow_abandoned", {
        had_photo: hadPhoto,
        had_memo: hadMemo,
        had_judgment: hadJudgment,
      });
    };
  }, []);

  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    const url = URL.createObjectURL(picked);
    setPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    setFile(picked);
    setResult(null);
    setRerolls(0);
  };

  const runJudge = async () => {
    setJudging(true);
    setResult(null);
    const startedAt = Date.now();
    try {
      const outcome = await judgeWithFallback({ file, memo, tone });
      setResult(outcome);
      posthog.capture("deed_judged", {
        score: outcome.score,
        source: outcome.source,
        fallback_reason: outcome.fallbackReason ?? null,
        model: outcome.model ?? null,
        has_photo: !!file,
        tone,
        memo_length: memo.trim().length,
        retry_count: rerolls,
        duration_ms: Date.now() - startedAt,
      });
      if (outcome.fallbackReason) {
        showToast("AI가 잠깐 졸고 있어요. 임시 판정으로 보여드릴게요.");
      }
    } catch (err) {
      // judgeWithFallback already returns mock on failure, but guard anyway.
      posthog.captureException(err instanceof Error ? err : new Error(String(err)), {
        flow: "deed-judge",
        has_photo: !!file,
        tone,
      });
      throw err;
    } finally {
      setJudging(false);
    }
  };

  const onJudge = () => {
    setRerolls(0);
    posthog.capture("deed_judge_attempted", {
      has_photo: !!file,
      has_memo: memo.trim().length > 0,
      memo_length: memo.trim().length,
      tone,
      scoring_mode: IS_AI_MODE ? "ai" : "mock",
    });
    runJudge();
  };

  const onReroll = () => {
    if (rerolls >= MAX_REROLLS) return;
    const next = rerolls + 1;
    setRerolls(next);
    posthog.capture("deed_rerolled", { reroll_number: next, rerolls_left: MAX_REROLLS - next });
    runJudge();
  };

  const onReset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    setMemo("");
    setResult(null);
    setRerolls(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSave = () => {
    if (!result) return;

    if (capEnabled && stats.today + result.score > DAILY_CAP) {
      posthog.capture("deed_save_capped", { score: result.score, today_total: stats.today });
      showToast("오늘은 충분히 쌓았어요. 내일 또 봐요.");
      return;
    }

    const prevTotal = stats.total;
    addDeed({
      memo: memo || undefined,
      score: result.score,
      comment: result.comment,
      tags: result.tags,
      photoUrl: preview ?? undefined,
    });
    savedRef.current = true;
    const unlock = getRecentlyUnlocked(prevTotal, prevTotal + result.score);

    posthog.capture("deed_saved", {
      score: result.score,
      source: result.source,
      fallback_reason: result.fallbackReason ?? null,
      tags: result.tags,
      tag_count: result.tags.length,
      has_photo: !!preview,
      tone,
      memo_length: memo.trim().length,
      retry_count: rerolls,
      level_up: !!unlock,
      new_species: unlock?.name ?? null,
      total_after: prevTotal + result.score,
    });

    if (unlock) {
      posthog.capture("level_up_viewed", { species: unlock.name, stage: unlock.stage });
      setUnlocked(unlock);
      setSheetOpen(true);
      // We do NOT auto-navigate when sheet is open — user taps 계속.
    } else {
      showToast(`저장됐어요. +${result.score}덕`);
      window.setTimeout(() => {
        router.push("/");
      }, 1400);
    }
  };

  const onSheetClose = () => {
    setSheetOpen(false);
    setUnlocked(null);
    window.setTimeout(() => {
      router.push("/");
    }, 200);
  };

  const rerollsLeft = MAX_REROLLS - rerolls;
  const wouldExceedCap =
    !!result &&
    capEnabled &&
    stats.today + result.score > DAILY_CAP;

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
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="오늘의 한 컷 미리보기"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-sm">
              <ImagePlus className="h-8 w-8" aria-hidden />
              <span>오늘의 한 컷, 골라주세요</span>
              <span className="text-[11px] text-muted-foreground">카메라 또는 갤러리에서</span>
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
          placeholder="뭐 했어요? 한 줄이면 충분해요."
          value={memo}
          maxLength={120}
          onChange={(e) => setMemo(e.target.value)}
          className="mt-1 w-full resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
        />
        <div className="mt-1 text-right text-[10px] text-muted-foreground tabular-nums">{memo.length}/120</div>
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
              보는 중...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden />
              {JUDGE_LABEL}
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
            <p className="text-xs text-muted-foreground">{JUDGE_HEADER}</p>
            <span
              className="rounded-full px-2 py-0.5 text-[10px]"
              style={
                result.source === "ai"
                  ? {
                      background:
                        "color-mix(in oklab, var(--positive), transparent 80%)",
                      color: "var(--positive)",
                    }
                  : {
                      background: "var(--muted)",
                      color: "var(--muted-foreground)",
                    }
              }
            >
              {result.source === "ai" ? "AI" : "mock"}
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span
              className="text-4xl font-bold tabular-nums"
              style={{ color: result.score === 0 ? "var(--negative)" : "var(--ui-amber)" }}
            >
              {result.score >= 0 ? "+" : ""}
              {result.score}
            </span>
            <span className="text-base text-muted-foreground">덕</span>
            <span className="ml-auto">
              <ScorePill score={result.score} size="sm" />
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed">{result.comment}</p>
          {result.tags.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {result.tags.map((t) => (
                <li key={t}>
                  <TagChip>#{t}</TagChip>
                </li>
              ))}
            </ul>
          )}
          {result.source === "ai" && result.model && (
            <p className="mt-2 text-[10px] text-muted-foreground tabular-nums">
              모델 · {result.model}
            </p>
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
              onClick={onReroll}
              disabled={rerollsLeft <= 0 || judging}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground disabled:opacity-40"
              aria-label={
                rerollsLeft > 0
                  ? `한 번 더 · ${rerollsLeft}회 남음`
                  : "한 번 더 (소진)"
              }
            >
              <RotateCw className="h-3.5 w-3.5" aria-hidden />
              <span>한 번 더</span>
              <span className="tabular-nums">· {rerollsLeft}회 남음</span>
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={wouldExceedCap}
              className="flex flex-1 items-center justify-center rounded-xl bg-[var(--positive)] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
            >
              저장
            </button>
          </div>
          {wouldExceedCap && (
            <p className="mt-2 text-[11px] text-muted-foreground">
              오늘은 충분히 쌓았어요. 내일 또 봐요. (오늘 {stats.today}/{DAILY_CAP}덕)
            </p>
          )}
        </Card>
      )}

      {!result && !preview && (
        <p className="px-1 text-[11px] leading-relaxed text-muted-foreground">
          <Camera className="-mt-0.5 mr-1 inline h-3 w-3" aria-hidden /> 사진은 이 기기에만 잠시 머물러요. 키가 설정돼 있으면 AI가, 없으면 mock이 채점해요.
        </p>
      )}

      <LevelUpSheet open={sheetOpen} onClose={onSheetClose} species={unlocked} />
    </div>
  );
};

export default AddDeedPage;
