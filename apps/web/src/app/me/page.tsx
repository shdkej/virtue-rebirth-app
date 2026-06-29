"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Coffee, Download, MessageCircle, Moon, Send, Sparkles, Sun } from "lucide-react";
import { Card } from "@/components/card";
import { cn } from "@/lib/cn";
import {
  clearDeeds,
  exportJson,
  useDailyCapEnabled,
  useTheme,
  useTone,
  useVirtueStats,
} from "@/lib/store";
import { getSpeciesFor } from "@/lib/species";
import posthog from "posthog-js";
import { showToast } from "@/components/toast";

const MePage = () => {
  const [tone, setTone] = useTone();
  const [theme, setTheme] = useTheme();
  const [dailyCap, setDailyCap] = useDailyCapEnabled();
  const stats = useVirtueStats();
  const { current } = getSpeciesFor(stats.total);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [feedbackSending, setFeedbackSending] = useState(false);

  const feedbackEndpoint = process.env.NEXT_PUBLIC_FEEDBACK_ENDPOINT ?? "";
  const buyMeCoffeeUrl = process.env.NEXT_PUBLIC_BUY_ME_A_COFFEE_URL ?? "";

  const onSendFeedback = async () => {
    const message = feedbackMessage.trim();
    if (message.length < 3) {
      showToast("조금만 더 적어주세요.");
      return;
    }
    if (!feedbackEndpoint) {
      showToast("의견 보내기는 아직 연결 준비 중이에요.");
      return;
    }

    setFeedbackSending(true);
    try {
      const res = await fetch(feedbackEndpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "settings_feedback",
          message,
          replyEmail: replyEmail.trim() || undefined,
          path: typeof window === "undefined" ? "/me" : window.location.pathname,
          userAgent: typeof navigator === "undefined" ? undefined : navigator.userAgent,
          appVersion: "0.1.0",
          stats: {
            total: stats.total,
            count: stats.count,
            today: stats.today,
            month: stats.month,
          },
        }),
      });

      if (!res.ok) throw new Error("feedback_failed");
      setFeedbackMessage("");
      setReplyEmail("");
      posthog.capture("feedback_sent", { source: "settings" });
      showToast("의견을 보냈어요. 감사합니다.");
    } catch {
      showToast("전송이 막혔어요. 잠시 후 다시 보내주세요.");
    } finally {
      setFeedbackSending(false);
    }
  };

  const onExport = () => {
    try {
      const json = exportJson();
      if (typeof window === "undefined") return;
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `virtue-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      posthog.capture("data_exported");
      showToast("export.json 챙겨드렸어요.");
    } catch {
      showToast("내보내기가 잠깐 막혔어요. 다시 한 번 눌러주세요.");
    }
  };

  const onClear = () => {
    if (typeof window === "undefined") return;
    const ok = window.confirm(
      "지금까지 쌓은 덕행 기록을 모두 지울게요. 되돌릴 수 없어요. 진행할까요?",
    );
    if (!ok) return;
    clearDeeds();
    posthog.capture("data_cleared");
    showToast("기록을 비웠어요.");
  };

  return (
    <div className="flex flex-col gap-4 px-5 pt-6 pb-4">
      <header className="flex items-center gap-2">
        <Link
          href="/"
          aria-label="대시보드로 돌아가기"
          className="rounded-full p-1.5 text-muted-foreground hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--brand),transparent_85%)] text-xl"
          aria-label={`현재 단계: ${current.name}`}
        >
          {current.emoji}
        </div>
        <div className="flex flex-col">
          <h1 className="text-base font-semibold">나</h1>
          <p className="text-xs text-muted-foreground">개인용 모드 · 동기화 없음</p>
        </div>
      </header>

      <Card className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MessageCircle className="h-4 w-4 text-muted-foreground" aria-hidden />
          말투
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          AI 코멘트의 톤을 결정해요. 기본은 부드러운 존댓말.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(["soft", "casual"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTone(t); posthog.capture("tone_changed", { tone: t }); }}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm transition",
                tone === t
                  ? "border-[var(--brand)] bg-[color-mix(in_oklab,var(--brand),transparent_88%)] text-[var(--brand)]"
                  : "border-border text-muted-foreground",
              )}
              aria-pressed={tone === t}
            >
              {t === "soft" ? "부드러운 존댓말" : "장난기 있는 반말"}
            </button>
          ))}
        </div>
      </Card>

      <Card className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-muted-foreground" aria-hidden />
          하루 30덕 상한
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          몰아치기 방지용. 끄면 무제한이지만, 그게 재미있을지는...
        </p>
        <label className="mt-3 flex cursor-pointer items-center justify-between">
          <span className="text-sm">활성화</span>
          <span
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition",
              dailyCap ? "bg-[var(--positive)]" : "bg-muted",
            )}
            onClick={() => { const next = !dailyCap; setDailyCap(next); posthog.capture("daily_cap_toggled", { enabled: next }); }}
            role="switch"
            aria-checked={dailyCap}
          >
            <span
              className={cn(
                "inline-block h-5 w-5 transform rounded-full bg-white transition",
                dailyCap ? "translate-x-5" : "translate-x-0.5",
              )}
            />
          </span>
        </label>
      </Card>

      <Card className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          {theme === "light" ? (
            <Sun className="h-4 w-4 text-muted-foreground" aria-hidden />
          ) : (
            <Moon className="h-4 w-4 text-muted-foreground" aria-hidden />
          )}
          테마
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {(["light", "dark"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTheme(t); posthog.capture("theme_changed", { theme: t }); }}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm transition",
                theme === t
                  ? "border-[var(--brand)] bg-[color-mix(in_oklab,var(--brand),transparent_88%)] text-[var(--brand)]"
                  : "border-border text-muted-foreground",
              )}
              aria-pressed={theme === t}
            >
              {t === "light" ? "라이트" : "다크"}
            </button>
          ))}
        </div>
      </Card>

      <Card className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <MessageCircle className="h-4 w-4 text-muted-foreground" aria-hidden />
          의견 보내기
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          써보며 막힌 점이나 이상했던 점을 앱 안에서 바로 보내주세요.
        </p>
        <textarea
          value={feedbackMessage}
          onChange={(e) => setFeedbackMessage(e.target.value)}
          rows={4}
          maxLength={3000}
          placeholder="예: 첫 기록 후 어디로 가야 할지 헷갈렸어요."
          className="mt-3 min-h-28 w-full resize-none rounded-2xl border border-border bg-background px-3 py-3 text-base outline-none placeholder:text-muted-foreground focus:border-[var(--brand)]"
        />
        <input
          value={replyEmail}
          onChange={(e) => setReplyEmail(e.target.value)}
          type="email"
          inputMode="email"
          placeholder="답장 받을 이메일 (선택)"
          className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-base outline-none placeholder:text-muted-foreground focus:border-[var(--brand)]"
        />
        <button
          type="button"
          onClick={onSendFeedback}
          disabled={feedbackSending}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-3 py-2.5 text-sm font-semibold text-white transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" aria-hidden />
          {feedbackSending ? "보내는 중" : "의견 보내기"}
        </button>
      </Card>

      <Card className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Coffee className="h-4 w-4 text-muted-foreground" aria-hidden />
          커피 쏘기
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Virtue가 마음에 들었다면 작은 응원으로 남겨주세요.
        </p>
        {buyMeCoffeeUrl ? (
          <a
            href={buyMeCoffeeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => posthog.capture("buy_me_a_coffee_clicked", { source: "settings" })}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-muted"
          >
            <Coffee className="h-4 w-4" aria-hidden />
            Buy Me a Coffee
          </a>
        ) : (
          <button
            type="button"
            onClick={() => showToast("커피 링크는 아직 연결 준비 중이에요.")}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm font-semibold text-muted-foreground"
          >
            <Coffee className="h-4 w-4" aria-hidden />
            Buy Me a Coffee
          </button>
        )}
      </Card>

      <Card className="px-5 py-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Download className="h-4 w-4 text-muted-foreground" aria-hidden />
          데이터 내보내기
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          덕행 전부 JSON으로 챙겨가세요. (아직 mock)
        </p>
        <button
          type="button"
          onClick={onExport}
          className="mt-3 w-full rounded-xl border border-border px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
        >
          export.json 다운로드
        </button>
      </Card>

      <div className="pt-2 text-center">
        <button
          type="button"
          onClick={onClear}
          className="text-[11px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
        >
          기록 초기화
        </button>
      </div>

      <p className="px-1 pt-2 text-center text-[11px] text-muted-foreground">
        v0.1.0 · Brush Up Life에서 영감받음
      </p>
    </div>
  );
};

export default MePage;
