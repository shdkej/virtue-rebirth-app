"use client";

import { Download, MessageCircle, Moon, Sparkles, Sun } from "lucide-react";
import { Card } from "@/components/card";
import { cn } from "@/lib/cn";
import {
  clearDeeds,
  exportJson,
  useDailyCapEnabled,
  useTheme,
  useTone,
} from "@/lib/store";
import { showToast } from "@/components/toast";

const MePage = () => {
  const [tone, setTone] = useTone();
  const [theme, setTheme] = useTheme();
  const [dailyCap, setDailyCap] = useDailyCapEnabled();

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
    showToast("기록을 비웠어요.");
  };

  return (
    <div className="flex flex-col gap-4 px-5 pt-6 pb-4">
      <header className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--brand),transparent_85%)] text-xl">
          🦔
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
              onClick={() => setTone(t)}
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
            onClick={() => setDailyCap(!dailyCap)}
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
              onClick={() => setTheme(t)}
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
