"use client";

import { useEffect, useState } from "react";
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

const WEEKDAYS_KO = ["일", "월", "화", "수", "목", "금", "토"] as const;

const formatKoreanDate = (d: Date): string =>
  `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${WEEKDAYS_KO[d.getDay()]}요일`;

const DashboardPage = () => {
  const stats = useVirtueStats();
  const deeds = useDeeds();
  const { current, next, progress } = getSpeciesFor(stats.total);
  const recent = deeds.slice(0, 3);
  const isFirstVisit = stats.count === 0;

  // Render the date on the client to avoid SSR/client timezone drift.
  const [todayLabel, setTodayLabel] = useState<string>("");
  useEffect(() => {
    setTodayLabel(formatKoreanDate(new Date()));
  }, []);

  return (
    <div className="flex flex-col gap-4 px-5 pt-8 pb-4">
      <header className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p
            className="text-xs text-muted-foreground"
            suppressHydrationWarning
          >
            {todayLabel || " "}
          </p>
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
        <p className="text-xs text-muted-foreground">
          {isFirstVisit ? "오늘의 첫 환생 기록" : "나의 덕력"}
        </p>
        <div className="mt-1 flex items-baseline gap-1">
          <AnimatedNumber
            value={stats.total}
            className="text-5xl font-bold tracking-tight"
          />
          <span className="text-base text-muted-foreground">덕</span>
        </div>
        {isFirstVisit ? (
          <div className="mt-3 space-y-2">
            <p className="text-sm leading-relaxed text-foreground/80">
              사진 한 장이나 한 줄 메모만 남기면 AI가 오늘의 덕을 판정하고,
              당신의 환생도가 바로 움직여요.
            </p>
            <p className="text-xs text-muted-foreground">
              첫 기록은 길게 설명할 필요 없어요. 사소한 거 하나면 충분해요.
            </p>
          </div>
        ) : (
          <p className="mt-2 text-xs text-muted-foreground">
            이번 달 <span className="text-foreground">+{stats.month}덕</span>
            {" · "}
            어제 <span className="text-foreground">+{stats.yesterday}덕</span>
          </p>
        )}
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
        {isFirstVisit ? "첫 덕 기록해보기" : "오늘 덕 쌓기"}
      </Link>

      {isFirstVisit ? (
        <Card className="px-5 py-4">
          <p className="text-xs font-medium text-foreground/75">
            시작하면 바로 보이는 것
          </p>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <li>오늘 한 일을 AI가 덕으로 판정해줘요.</li>
            <li>누적 덕력과 다음 환생종 진행도가 바로 반영돼요.</li>
            <li>최근 덕행에 첫 기록이 남아 다음 행동이 또렷해져요.</li>
          </ul>
        </Card>
      ) : null}

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
            title="첫 기록이 여기에 쌓여요."
            description="오늘 덕 하나만 남기면 결과와 함께 바로 돌아와요."
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
