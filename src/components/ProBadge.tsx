import { Crown } from "lucide-react";

export function ProBadge({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold gradient-pro text-warning-foreground ${className}`}>
      <Crown className="h-3 w-3" />
      PRO
    </span>
  );
}
