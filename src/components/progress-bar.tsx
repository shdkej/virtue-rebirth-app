import { cn } from "@/lib/cn";

interface IProps {
  value: number;
  className?: string;
  tone?: "positive" | "brand" | "amber";
}

export const ProgressBar = ({ value, className, tone = "positive" }: IProps) => {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  const toneColor =
    tone === "positive" ? "var(--positive)" : tone === "amber" ? "var(--ui-amber)" : "var(--brand)";
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500"
        style={{ width: `${pct}%`, background: toneColor }}
      />
    </div>
  );
};
