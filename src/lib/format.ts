const NOW = new Date("2026-05-13T18:00:00+09:00").getTime();

export const formatTimeAgo = (iso: string) => {
  const t = new Date(iso).getTime();
  const diff = NOW - t;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "방금";
  if (m < 60) return `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}시간 전`;
  const d = Math.floor(h / 24);
  if (d === 1) return "어제";
  if (d < 7) return `${d}일 전`;
  const date = new Date(iso);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export const formatDateLabel = (iso: string) => {
  const date = new Date(iso);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

/**
 * Day-granularity relative label, useful for deed-list section headers.
 * Returns "오늘" / "어제" / "N일 전" / "M월 D일".
 */
export const formatRelativeDay = (iso: string, now?: Date): string => {
  const base = now ? now.getTime() : NOW;
  const baseDate = new Date(base);
  const target = new Date(iso);

  // Strip times — compare calendar days only.
  const startOf = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

  const diffDays = Math.floor((startOf(baseDate) - startOf(target)) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "오늘";
  if (diffDays === 1) return "어제";
  if (diffDays > 1 && diffDays < 7) return `${diffDays}일 전`;
  return `${target.getMonth() + 1}월 ${target.getDate()}일`;
};
