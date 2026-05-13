"use client";

import { Card } from "@/components/card";
import { ProgressBar } from "@/components/progress-bar";
import { SPECIES, getSpeciesFor } from "@/lib/species";
import { useVirtueStats } from "@/lib/store";
import { cn } from "@/lib/cn";

const DexPage = () => {
  const { total } = useVirtueStats();
  const { current, next, progress } = getSpeciesFor(total);

  return (
    <div className="flex flex-col gap-4 px-5 pt-6 pb-4">
      <header className="flex flex-col gap-1">
        <h1 className="text-base font-semibold">환생도감</h1>
        <p className="text-xs text-muted-foreground">
          누적 덕력에 따라 다음 생의 종(種)이 바뀌어요.
        </p>
      </header>

      <Card className="px-5 py-4">
        <p className="text-[11px] text-muted-foreground">지금 머무는 단계</p>
        <div className="mt-1 flex items-center gap-3">
          <span className="text-3xl" aria-hidden>
            {current.emoji}
          </span>
          <div className="flex flex-1 flex-col">
            <span className="text-base font-semibold">{current.name}</span>
            <span className="text-[11px] text-muted-foreground">{current.blurb}</span>
            <span className="mt-0.5 text-[11px] text-foreground/75">{current.trait}</span>
          </div>
        </div>
        <div className="mt-3">
          <ProgressBar value={progress} tone="brand" />
        </div>
        {next ? (
          <p className="mt-2 text-[11px] text-muted-foreground">
            {next.nextHint ?? "다음 생: 베일 속"}
          </p>
        ) : null}
      </Card>

      <ol className="flex flex-col gap-2">
        {SPECIES.map((s) => {
          const unlocked = total >= s.min;
          const isCurrent = s.stage === current.stage;
          const isLocked = !unlocked;
          return (
            <li key={s.stage}>
              <Card
                className={cn(
                  "px-4 py-3 transition",
                  isCurrent && "ring-2 ring-[var(--brand)]",
                  isLocked && "opacity-60",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden>
                    {isLocked ? "❓" : s.emoji}
                  </span>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">
                        {isLocked ? "???" : s.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">Lv.{s.stage}</span>
                      {isCurrent && (
                        <span className="rounded-full bg-[color-mix(in_oklab,var(--brand),transparent_80%)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--brand)]">
                          현재
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      {isLocked ? "다음 생의 비밀." : s.blurb}
                    </span>
                  </div>
                  <span className="text-right text-[10px] text-muted-foreground tabular-nums">
                    {s.min.toLocaleString()}덕~
                  </span>
                </div>
              </Card>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default DexPage;
