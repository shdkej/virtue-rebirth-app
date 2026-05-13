import Link from "next/link";
import { Camera, ChevronRight } from "lucide-react";
import { Card } from "@/components/card";
import { ProgressBar } from "@/components/progress-bar";
import { getSpeciesFor } from "@/lib/species";
import { MOCK_DEEDS, MOCK_MONTH_TOTAL, MOCK_TOTAL_VIRTUE, MOCK_YESTERDAY_TOTAL } from "@/lib/mock-data";
import { formatTimeAgo } from "@/lib/format";

const DashboardPage = () => {
  const { current, next, progress } = getSpeciesFor(MOCK_TOTAL_VIRTUE);
  const recent = MOCK_DEEDS.slice(0, 3);

  return (
    <div className="flex flex-col gap-4 px-5 pt-8 pb-4">
      <header className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground">2026년 5월 13일 수요일</p>
        <h1 className="text-lg font-semibold tracking-tight">
          오늘 1덕만 쌓아볼까요?
        </h1>
      </header>

      <Card className="relative overflow-hidden px-5 py-6">
        <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[color-mix(in_oklab,var(--brand),transparent_80%)] blur-2xl" aria-hidden />
        <p className="text-xs text-muted-foreground">나의 덕력</p>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-5xl font-bold tracking-tight tabular-nums">
            {MOCK_TOTAL_VIRTUE.toLocaleString()}
          </span>
          <span className="text-base text-muted-foreground">덕</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          이번 달 <span className="text-foreground">+{MOCK_MONTH_TOTAL}</span> · 어제 <span className="text-foreground">+{MOCK_YESTERDAY_TOTAL}</span>
        </p>
      </Card>

      <Card className="px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden>
              {current.emoji}
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">환생종 · Lv.{current.stage}</span>
              <span className="text-base font-semibold">{current.name}</span>
            </div>
          </div>
          <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
            {Math.round(progress * 100)}%
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{current.blurb}</p>
        <div className="mt-4">
          <ProgressBar value={progress} tone="positive" />
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>{current.min.toLocaleString()}덕</span>
          <span>
            다음: {next ? <span className="text-foreground">??? 잠금</span> : "최고 단계"}
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
        <ul className="flex flex-col gap-3">
          {recent.map((deed) => (
            <li key={deed.id} className="flex items-start gap-3 text-sm">
              <span className="mt-0.5 inline-flex h-7 min-w-9 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--positive),transparent_80%)] px-2 text-xs font-semibold text-[var(--positive)] tabular-nums">
                +{deed.score}
              </span>
              <div className="flex flex-1 flex-col">
                <span className="leading-snug">{deed.memo}</span>
                <span className="text-[11px] text-muted-foreground">{formatTimeAgo(deed.createdAt)}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default DashboardPage;
