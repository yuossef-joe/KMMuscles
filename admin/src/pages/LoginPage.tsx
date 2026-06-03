import { Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/common/Button";
import { FormField, inputClass } from "@/components/common/FormField";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";
import { loginSchema } from "@/lib/validations";

export function LoginPage() {
  const { admin, login } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("admin@kmmuscles.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (admin) {
    return <Navigate replace to={(location.state as { from?: { pathname: string } })?.from?.pathname ?? "/"} />;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check your login details.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (caught) {
      setError(caught instanceof ApiError ? caught.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-muscle-black p-4 text-white lg:grid-cols-[0.9fr_1.1fr]">
      <section className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.03] p-6 lg:p-10">
        <div className="flex items-center gap-3">
          <img src="/assets/logo-mark.png" alt="KMMuscles" className="h-12 w-auto" />
          <div>
            <p className="text-xl font-black uppercase">KMMuscles</p>
            <p className="text-sm font-bold text-zinc-400">Admin dashboard</p>
          </div>
        </div>
        <div className="my-16 max-w-2xl">
          <p className="mb-4 inline-flex rounded bg-gym-red px-3 py-2 text-xs font-black uppercase">Staff access</p>
          <h1 className="text-5xl font-black tracking-tight lg:text-7xl">Control products, orders, and content.</h1>
          <p className="mt-5 text-lg text-zinc-300">Operational tools for catalog updates, order handling, and CMS publishing.</p>
        </div>
        <p className="text-xs font-bold text-zinc-500">Access tokens stay in memory. Refresh tokens are handled by secure HTTP-only cookies.</p>
      </section>

      <section className="grid place-items-center p-4">
        <form className="w-full max-w-md rounded-lg bg-white p-6 text-zinc-950 shadow-soft" onSubmit={handleSubmit}>
          <div className="mb-6 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-gym-red text-white">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-black">Sign in</h2>
              <p className="text-sm text-zinc-500">Use your admin credentials.</p>
            </div>
          </div>

          <div className="grid gap-4">
            <FormField label="Email">
              <input className={inputClass} autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </FormField>
            <FormField label="Password">
              <input
                className={inputClass}
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormField>
          </div>

          {error ? <p className="mt-4 rounded-md bg-error/10 px-3 py-2 text-sm font-bold text-error">{error}</p> : null}

          <Button className="mt-6 w-full" isLoading={isSubmitting} type="submit">
            Sign in
          </Button>
        </form>
      </section>
    </main>
  );
}
