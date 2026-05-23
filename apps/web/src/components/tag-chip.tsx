import { cn } from "@/lib/cn";

interface IProps {
  children: React.ReactNode;
  tone?: "muted" | "brand" | "positive" | "amber";
  className?: string;
}

export const TagChip = ({ children, tone = "muted", className }: IProps) => {
  const style: React.CSSProperties =
    tone === "brand"
      ? {
          background: "color-mix(in oklab, var(--brand), transparent 85%)",
          color: "var(--brand)",
        }
      : tone === "positive"
        ? {
            background: "color-mix(in oklab, var(--positive), transparent 85%)",
            color: "var(--positive)",
          }
        : tone === "amber"
          ? {
              background: "color-mix(in oklab, var(--ui-amber), transparent 82%)",
              color: "var(--ui-amber)",
            }
          : {};

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none",
        tone === "muted" && "bg-muted text-muted-foreground",
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
};
