import { Card } from "@/components/card";
import { MOCK_DEEDS } from "@/lib/mock-data";
import { formatDateLabel, formatTimeAgo } from "@/lib/format";

const groupByDay = () => {
  const groups = new Map<string, typeof MOCK_DEEDS>();
  for (const d of MOCK_DEEDS) {
    const key = d.createdAt.slice(0, 10);
    const arr = groups.get(key) ?? [];
    arr.push(d);
    groups.set(key, arr);
  }
  return Array.from(groups.entries());
};

const DeedsPage = () => {
  const groups = groupByDay();
  const totalScore = MOCK_DEEDS.reduce((acc, d) => acc + d.score, 0);

  return (
    <div className="flex flex-col gap-4 px-5 pt-6 pb-4">
      <header className="flex flex-col gap-1">
        <h1 className="text-base font-semibold">덕행록</h1>
        <p className="text-xs text-muted-foreground">
          최근 {MOCK_DEEDS.length}건 · 누계 +{totalScore}덕
        </p>
      </header>

      <ol className="flex flex-col gap-5">
        {groups.map(([day, deeds]) => {
          const dayTotal = deeds.reduce((s, d) => s + d.score, 0);
          return (
            <li key={day}>
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium">{formatDateLabel(day)}</span>
                <span className="text-muted-foreground">+{dayTotal}덕</span>
              </div>
              <ul className="flex flex-col gap-2">
                {deeds.map((d) => (
                  <li key={d.id}>
                    <Card className="px-4 py-3">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-7 min-w-9 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--positive),transparent_80%)] px-2 text-xs font-semibold text-[var(--positive)] tabular-nums">
                          +{d.score}
                        </span>
                        <div className="flex flex-1 flex-col gap-1">
                          <span className="text-sm leading-snug">{d.memo}</span>
                          <span className="text-[11px] leading-relaxed text-muted-foreground">
                            {d.comment}
                          </span>
                          <div className="flex items-center justify-between pt-1">
                            <ul className="flex flex-wrap gap-1">
                              {d.tags.map((t) => (
                                <li
                                  key={t}
                                  className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                                >
                                  #{t}
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
    </div>
  );
};

export default DeedsPage;
