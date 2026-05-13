import { cn } from "@/lib/cn";

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <section
    className={cn(
      "rounded-2xl border border-border bg-card text-card-foreground shadow-[0_1px_0_color-mix(in_oklab,var(--foreground),transparent_92%)]",
      className,
    )}
  >
    {children}
  </section>
);
