"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Bird } from "lucide-react";
import { cn } from "@/lib/cn";
import { useVirtueStats } from "@/lib/store";
import { getSpeciesFor } from "@/lib/species";

export const BottomNav = () => {
  const pathname = usePathname();
  const stats = useVirtueStats();
  const { current, progress } = getSpeciesFor(stats.total);
  const progressPct = Math.round(progress * 100);

  const leftActive = pathname === "/";
  const centerActive = pathname.startsWith("/add");
  const rightActive = pathname.startsWith("/dex");

  return (
    <nav
      aria-label="주요 메뉴"
      className="sticky bottom-0 z-50 mx-auto w-full max-w-md pb-[env(safe-area-inset-bottom)]"
    >
      <div className="relative">
        <div className="grid grid-cols-[1fr_5.5rem_1fr] items-stretch border-t border-border bg-background/85 backdrop-blur-md">
          <Link
            href="/"
            aria-current={leftActive ? "page" : undefined}
            className={cn(
              "flex flex-col items-start justify-center gap-0.5 px-4 py-2.5 text-left",
              leftActive ? "text-[var(--brand)]" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles
                className={cn(
                  "h-3.5 w-3.5",
                  leftActive &&
                    "drop-shadow-[0_0_6px_color-mix(in_oklab,var(--brand),transparent_55%)]",
                )}
                aria-hidden
              />
              <span className="text-[10px] font-medium tracking-wide">나의 덕</span>
            </span>
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {stats.total.toLocaleString()}덕
            </span>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              오늘 +{stats.today}
            </span>
          </Link>

          <div aria-hidden />

          <Link
            href="/dex"
            aria-current={rightActive ? "page" : undefined}
            className={cn(
              "flex flex-col items-end justify-center gap-0.5 px-4 py-2.5 text-right",
              rightActive ? "text-[var(--brand)]" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <span className="flex items-center gap-1.5">
              <span className="text-[10px] font-medium tracking-wide">환생종</span>
              <Bird
                className={cn(
                  "h-3.5 w-3.5",
                  rightActive &&
                    "drop-shadow-[0_0_6px_color-mix(in_oklab,var(--brand),transparent_55%)]",
                )}
                aria-hidden
              />
            </span>
            <span className="text-sm font-semibold text-foreground">{current.name}</span>
            <span className="text-[10px] text-muted-foreground tabular-nums">
              다음 생 {progressPct}%
            </span>
          </Link>
        </div>

        <Link
          href="/add"
          aria-label={`덕 쌓기 — 지금은 ${current.name} (Lv.${current.stage}, 진행 ${progressPct}%)`}
          aria-current={centerActive ? "page" : undefined}
          className="group absolute -top-7 left-1/2 -translate-x-1/2"
        >
          <span
            className={cn(
              "relative inline-flex h-16 w-16 items-center justify-center rounded-full p-[3px]",
              "transition-transform duration-200 active:scale-[0.94] group-hover:scale-[1.03]",
              centerActive &&
                "shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand),transparent_70%)]",
            )}
            style={{
              background: `conic-gradient(from -90deg, var(--brand) ${progressPct}%, color-mix(in oklab, var(--muted), transparent 40%) ${progressPct}%)`,
              borderRadius: "9999px",
            }}
          >
            <span
              className="animate-orb-breathe relative flex h-full w-full items-center justify-center overflow-hidden rounded-full ring-1 ring-white/40 backdrop-blur-md"
              style={{
                background:
                  "radial-gradient(circle at 32% 28%, oklch(1 0 0 / 0.85), oklch(1 0 0 / 0.05) 42%), radial-gradient(circle at 65% 78%, color-mix(in oklab, var(--brand), transparent 30%), color-mix(in oklab, var(--brand), transparent 75%) 70%)",
                boxShadow:
                  "inset 0 1px 1px oklch(1 0 0 / 0.55), inset 0 -6px 12px color-mix(in oklab, var(--brand), transparent 70%), 0 12px 28px color-mix(in oklab, var(--brand), transparent 55%)",
              }}
            >
              <span className="text-[1.6rem] leading-none drop-shadow-sm" aria-hidden>
                {current.emoji}
              </span>
              <span
                className="pointer-events-none absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-white/85 blur-[0.5px]"
                aria-hidden
              />
              <span
                className="pointer-events-none absolute -left-3 top-1/2 h-8 w-8 -translate-y-1/2 rotate-12 rounded-full opacity-30"
                style={{
                  background:
                    "linear-gradient(120deg, transparent 40%, oklch(1 0 0 / 0.4) 50%, transparent 60%)",
                }}
                aria-hidden
              />
            </span>
          </span>
        </Link>
      </div>
    </nav>
  );
};
