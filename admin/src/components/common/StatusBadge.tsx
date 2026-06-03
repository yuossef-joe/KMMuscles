import clsx from "clsx";
import { titleCase } from "@/lib/format";

const statusClass: Record<string, string> = {
  NEW: "bg-info/10 text-info",
  CONFIRMED: "bg-info/10 text-info",
  PREPARING: "bg-warning/10 text-warning",
  OUT_FOR_DELIVERY: "bg-warning/10 text-warning",
  DELIVERED: "bg-success/10 text-success",
  CANCELLED: "bg-error/10 text-error",
  RETURNED: "bg-error/10 text-error",
  PENDING: "bg-warning/10 text-warning",
  PAID: "bg-success/10 text-success",
  FAILED: "bg-error/10 text-error",
  REFUNDED: "bg-zinc-200 text-zinc-700",
  active: "bg-success/10 text-success",
  inactive: "bg-zinc-200 text-zinc-700",
  low: "bg-warning/10 text-warning",
  out: "bg-error/10 text-error"
};

export function StatusBadge({ value, className }: { value: string; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex h-7 items-center rounded-full px-2.5 text-xs font-bold",
        statusClass[value] ?? "bg-zinc-100 text-zinc-700",
        className
      )}
    >
      {titleCase(value)}
    </span>
  );
}
