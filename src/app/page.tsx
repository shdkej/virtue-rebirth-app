"use client";

import Link from "next/link";
import { Camera, ChevronRight, Settings2, Sparkles } from "lucide-react";
import { Card } from "@/components/card";
import { ProgressBar } from "@/components/progress-bar";
import { AnimatedNumber } from "@/components/animated-number";
import { SparkleGlow } from "@/components/sparkle-glow";
import { ScorePill } from "@/components/score-pill";
import { EmptyState } from "@/components/empty-state";
import { Greeting } from "@/components/greeting";
import { getSpeciesFor } from "@/lib/species";
import { useDeeds, useVirtueStats } from "@/lib/store";
import { formatTimeAgo } from "@/lib/format";

const DashboardPage = () => {
  const stats = useVirtueStats();
  const deeds = useDeeds();
  const { current, next, progress } = getSpeciesFor(stats.total);
  const recent = deeds.slice(0, 3);

  return (
    <div className="flex flex-col gap-4 px-5 pt-8 pb-4">
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">2026년 5월 13일 수요일</p>
          <Greeting className="text-lg font-semibold tracking-tight" />
        </div>
        <Link
          href="/me"
          aria-label="설정"
          className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Settings2 className="h-4 w-4" aria-hidden />
        </Link>
      </header>

      <Card className="relative overflow-hidden px-5 py-6">
        <SparkleGlow tone="brand" />
        <p className="text-xs text-muted-foreground">나의 덕력</p>
        <div className="mt-1 flex items-baseline gap-1">
          <AnimatedNumber
            value={stats.total}
            className="text-5xl font-bold tracking-tight"
          />
          <span className="text-base text-muted-foreground">덕</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          이번 달 <span className="text-foreground">+{stats.month}덕</span>
          {" · "}
          어제 <span className="text-foreground">+{stats.yesterday}덕</span>
        </p>
      </Card>

      <Card className="px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden>
              {current.emoji}
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">지금은 · Lv.{current.stage}</span>
              <span className="text-base font-semibold">{current.name}</span>
              <span className="mt-0.5 text-[11px] text-muted-foreground">{current.trait}</span>
            </div>
          </div>
          <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground tabular-nums">
            {Math.round(progress * 100)}%
          </span>
        </div>
        <div className="mt-4">
          <ProgressBar value={progress} tone="brand" />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground tabular-nums">
          <span>{current.min.toLocaleString()}덕</span>
          <span className="text-foreground/80">
            {next ? (next.nextHint ?? "다음 생: 베일 속") : "최고 단계"}
          </span>
          <span>{next ? `${next.min.toLocaleString()}덕` : ""}</span>
        </div>
      </Card>

      <Link
        href="/add"
        className="group relative flex items-center justify-center gap-2 rounded-2xl bg-[var(--brand)] px-5 py-4 text-base font-semibold text-white shadow-lg shadow-[color-mix(in_oklab,var(--brand),transparent_70%)] transition active:scale-[0.98]"
      >
        <Camera className="h-5 w-5" aria-hidden />
        오늘 덕 쌓기
      </Link>

      <Card className="px-5 py-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">최근 덕행</h2>
          <Link
            href="/deeds"
            className="flex items-center text-xs text-muted-foreground hover:text-foreground"
          >
            전체 보기
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
        {recent.length === 0 ? (
          <EmptyState
            icon={<Sparkles className="h-5 w-5" aria-hidden />}
            title="아직 기록이 없어요."
            description="오늘 사소한 거 하나, 카메라로 콕."
            className="py-6"
          />
        ) : (
          <ul className="flex flex-col gap-3">
            {recent.map((deed) => (
              <li key={deed.id} className="flex items-start gap-3 text-sm">
                <ScorePill score={deed.score} size="sm" />
                <div className="flex flex-1 flex-col">
                  <span className="leading-snug">{deed.memo}</span>
                  <span className="text-[11px] text-muted-foreground">{formatTimeAgo(deed.createdAt)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;
