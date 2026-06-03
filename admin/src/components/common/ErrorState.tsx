import { AlertTriangle } from "lucide-react";

export function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-error/20 bg-error/5 p-4 text-sm font-bold text-error">
      <AlertTriangle size={18} />
      {message}
    </div>
  );
}
