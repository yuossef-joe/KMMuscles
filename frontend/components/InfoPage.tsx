import Link from "next/link";

type Props = {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
};

export function InfoPage({ title, eyebrow = "KMMuscles", children }: Props) {
  return (
    <section className="bg-surface py-12 text-ink">
      <div className="container-page grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit rounded-xl border border-line bg-paper p-6">
          <h2 className="font-heading text-2xl uppercase text-ink">Company</h2>
          <nav className="mt-5 grid gap-1 text-sm font-medium text-ink-soft">
            <Link className="rounded-lg px-3 py-2 transition hover:bg-surface hover:text-ink" href="/about-us">About Us</Link>
            <Link className="rounded-lg px-3 py-2 transition hover:bg-surface hover:text-ink" href="/contact">Contact</Link>
            <Link className="rounded-lg px-3 py-2 transition hover:bg-surface hover:text-ink" href="/privacy-policy">Privacy Policy</Link>
            <Link className="rounded-lg px-3 py-2 transition hover:bg-surface hover:text-ink" href="/shipping-policy">Shipping Policy</Link>
            <Link className="rounded-lg px-3 py-2 transition hover:bg-surface hover:text-ink" href="/refund-policy">Refund Policy</Link>
            <Link className="rounded-lg px-3 py-2 transition hover:bg-surface hover:text-ink" href="/terms-and-conditions">Terms &amp; Conditions</Link>
            <Link className="rounded-lg px-3 py-2 transition hover:bg-surface hover:text-ink" href="/faqs">FAQs</Link>
          </nav>
        </aside>
        <article className="rounded-xl border border-line bg-paper p-8 shadow-card">
          <p className="eyebrow text-ink-soft">{eyebrow}</p>
          <h1 className="section-title mt-2 text-ink">{title}</h1>
          <div className="prose prose-zinc mt-8 max-w-none leading-8">{children}</div>
        </article>
      </div>
    </section>
  );
}
