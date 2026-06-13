import type { ProjectStatus } from "@/types/project";
import { cn } from "@/lib/utils/cn";

const styles: Record<ProjectStatus, string> = {
  available: "bg-success/20 text-success border-success/30",
  featured: "bg-accent/20 text-accent border-accent/30",
  sold: "bg-white/10 text-text-muted border-white/20",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={cn("text-caption px-2 py-0.5 rounded-full border font-heading font-semibold capitalize", styles[status])}>
      {status}
    </span>
  );
}
