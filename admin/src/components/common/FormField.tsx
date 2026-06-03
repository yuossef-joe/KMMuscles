type FormFieldProps = {
  label: string;
  children: React.ReactNode;
  error?: string;
};

export function FormField({ label, children, error }: FormFieldProps) {
  return (
    <label className="grid gap-1.5 text-sm font-bold text-zinc-700">
      <span>{label}</span>
      {children}
      {error ? <span className="text-xs text-error">{error}</span> : null}
    </label>
  );
}

export const inputClass =
  "focus-ring h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm text-zinc-950 placeholder:text-zinc-400";

export const textareaClass =
  "focus-ring min-h-28 rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 placeholder:text-zinc-400";
