import Link from "next/link";

type Props = {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
};

export function InfoPage({ title, eyebrow = "KMMuscles", children }: Props) {
  return (
    <section className="bg-light-gray py-12 text-zinc-950">
      <div className="container-page grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit rounded-2xl bg-muscle-black p-6 text-white">
          <h2 className="font-heading text-3xl uppercase">Company</h2>
          <nav className="mt-5 grid gap-2 text-sm font-bold uppercase text-zinc-300">
            <Link href="/about-us">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/shipping-policy">Shipping Policy</Link>
            <Link href="/refund-policy">Refund Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
            <Link href="/faqs">FAQs</Link>
          </nav>
        </aside>
        <article className="rounded-2xl bg-white p-8 shadow-card">
          <p className="text-sm font-black uppercase text-gym-red">{eyebrow}</p>
          <h1 className="section-title mt-2 text-zinc-950">{title}</h1>
          <div className="prose prose-zinc mt-8 max-w-none leading-8">{children}</div>
        </article>
      </div>
    </section>
  );
}
