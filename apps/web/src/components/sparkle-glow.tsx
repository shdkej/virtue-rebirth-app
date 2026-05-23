import { cn } from "@/lib/cn";

interface IProps {
  className?: string;
  tone?: "brand" | "amber" | "positive";
}

export const SparkleGlow = ({ className, tone = "brand" }: IProps) => {
  const color =
    tone === "amber"
      ? "var(--ui-amber)"
      : tone === "positive"
        ? "var(--positive)"
        : "var(--brand)";

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
      aria-hidden
    >
      <div
        className="absolute -top-16 -left-10 h-56 w-56 rounded-full blur-3xl opacity-50"
        style={{
          background: `radial-gradient(circle at center, color-mix(in oklab, ${color}, transparent 55%), transparent 70%)`,
        }}
      />
      <div
        className="absolute -bottom-20 -right-12 h-64 w-64 rounded-full blur-3xl opacity-40"
        style={{
          background: `radial-gradient(circle at center, color-mix(in oklab, ${color}, transparent 70%), transparent 75%)`,
        }}
      />
    </div>
  );
};
