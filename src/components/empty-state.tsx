import { cn } from "@/lib/cn";

interface IProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState = ({ icon, title, description, action, className }: IProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-card/40 py-10 px-6 text-center",
      className,
    )}
  >
    {icon ? <div className="mb-1 text-muted-foreground" aria-hidden>{icon}</div> : null}
    <p className="text-sm font-medium text-foreground">{title}</p>
    {description ? (
      <p className="text-xs leading-relaxed text-muted-foreground max-w-xs">{description}</p>
    ) : null}
    {action ? <div className="mt-3">{action}</div> : null}
  </div>
);
