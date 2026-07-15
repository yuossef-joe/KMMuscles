import Link from "next/link";

export const metadata = {
  title: "Order Confirmation"
};

export default function OrderConfirmationPage({ params }: { params: { reference: string } }) {
  return (
    <section className="bg-surface py-16 text-ink">
      <div className="container-page max-w-3xl rounded-2xl border border-line bg-paper p-8 text-center shadow-card">
        <p className="eyebrow text-success">Order submitted</p>
        <h1 className="section-title mt-2 text-ink">Thank You</h1>
        <p className="mt-4 text-lg text-ink-soft">
          Your order reference is <strong className="text-ink">{params.reference}</strong>.
          KMMuscles will contact you to confirm delivery and payment details.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex rounded-lg bg-ink px-7 py-4 text-sm font-medium uppercase tracking-wide text-white transition hover:bg-brand-red"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
