import { cn } from "@/lib/cn";

interface IProps {
  score: number;
  size?: "sm" | "md";
}

export const ScorePill = ({ score, size = "sm" }: IProps) => {
  const isPositive = score > 0;
  const isZero = score === 0;
  const isNegative = score < 0;

  const label = isZero
    ? "0덕"
    : isNegative
      ? `−${Math.abs(score)}덕`
      : `+${score}덕`;

  const style: React.CSSProperties = isPositive
    ? {
        background: "color-mix(in oklab, var(--positive), transparent 80%)",
        color: "var(--positive)",
      }
    : isNegative
      ? {
          background: "color-mix(in oklab, var(--negative), transparent 80%)",
          color: "var(--negative)",
        }
      : {};

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium tabular-nums",
        size === "sm" ? "text-[11px] h-6 min-w-8 px-2" : "text-xs h-7 min-w-9 px-2",
        isZero && "bg-muted text-muted-foreground",
      )}
      style={style}
    >
      {label}
    </span>
  );
};
