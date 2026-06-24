import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  tone = "primary"
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  tone?: "primary" | "success" | "danger" | "accent";
}) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground/60">{label}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          {trend ? <p className="mt-1 text-xs text-foreground/55">{trend}</p> : null}
        </div>
        <span
          className={cn(
            "grid h-12 w-12 place-items-center rounded-md",
            tone === "primary" && "bg-primary/12 text-primary",
            tone === "success" && "bg-success/12 text-success",
            tone === "danger" && "bg-danger/12 text-danger",
            tone === "accent" && "bg-accent/12 text-cyan-500"
          )}
        >
          <Icon size={22} />
        </span>
      </div>
    </Card>
  );
}
