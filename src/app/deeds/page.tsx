"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Card } from "@/components/card";
import { ScorePill } from "@/components/score-pill";
import { TagChip } from "@/components/tag-chip";
import { EmptyState } from "@/components/empty-state";
import { useDeeds } from "@/lib/store";
import { formatRelativeDay, formatTimeAgo } from "@/lib/format";
import type { IDeed } from "@/lib/mock-data";

const DeedsPage = () => {
  const deeds = useDeeds();
  const totalScore = deeds.reduce((acc, d) => acc + d.score, 0);

  // Group by calendar day (YYYY-MM-DD of createdAt local).
  const groups = new Map<string, IDeed[]>();
  for (const d of deeds) {
    const key = d.createdAt.slice(0, 10);
    const arr = groups.get(key) ?? [];
    arr.push(d);
    groups.set(key, arr);
  }
  const groupEntries = Array.from(groups.entries());

  return (
    <div className="flex flex-col gap-4 px-5 pt-6 pb-4">
      <header className="flex flex-col gap-1">
        <h1 className="text-base font-semibold">덕행록</h1>
        <p className="text-xs text-muted-foreground">
          최근 {deeds.length}건 · 누계 +{totalScore}덕
        </p>
      </header>

      {deeds.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="h-6 w-6" aria-hidden />}
          title="아직 덕이 비어 있네요."
          description="한 컷 찍어두면 여기 차곡차곡 쌓여요."
          action={
            <Link
              href="/add"
              className="inline-flex items-center justify-center rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              덕 쌓기
            </Link>
          }
        />
      ) : (
        <ol className="flex flex-col gap-5">
          {groupEntries.map(([day, dayDeeds]) => {
            const dayTotal = dayDeeds.reduce((s, d) => s + d.score, 0);
            return (
              <li key={day}>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-medium">{formatRelativeDay(dayDeeds[0].createdAt)}</span>
                  <span className="text-muted-foreground tabular-nums">+{dayTotal}덕</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {dayDeeds.map((d) => (
                    <li key={d.id}>
                      <Card className="px-4 py-3">
                        <div className="flex items-start gap-3">
                          <ScorePill score={d.score} size="sm" />
                          <div className="flex flex-1 flex-col gap-1">
                            <span className="text-sm leading-snug">{d.memo}</span>
                            <span className="text-[11px] leading-relaxed text-muted-foreground">
                              {d.comment}
                            </span>
                            <div className="flex items-center justify-between pt-1">
                              <ul className="flex flex-wrap gap-1">
                                {d.tags.map((t) => (
                                  <li key={t}>
                                    <TagChip>#{t}</TagChip>
                                  </li>
                                ))}
                              </ul>
                              <span className="text-[10px] text-muted-foreground">
                                {formatTimeAgo(d.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default DeedsPage;
