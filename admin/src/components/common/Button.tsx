import { Loader2 } from "lucide-react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: React.ReactNode;
  isLoading?: boolean;
};

export function Button({ className, variant = "primary", icon, isLoading, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "focus-ring inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" && "bg-gym-red text-white hover:bg-red-700",
        variant === "secondary" && "border border-zinc-200 bg-white text-zinc-900 hover:border-gym-red hover:text-gym-red",
        variant === "ghost" && "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950",
        variant === "danger" && "bg-error text-white hover:bg-red-700",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 size={16} className="animate-spin" /> : icon}
      {children}
    </button>
  );
}
