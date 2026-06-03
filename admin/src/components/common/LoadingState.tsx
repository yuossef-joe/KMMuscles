export function LoadingState({ label = "Loading workspace" }: { label?: string }) {
  return (
    <div className="grid min-h-64 place-items-center rounded-lg border border-zinc-200 bg-white">
      <div className="text-sm font-bold text-zinc-500">{label}</div>
    </div>
  );
}
