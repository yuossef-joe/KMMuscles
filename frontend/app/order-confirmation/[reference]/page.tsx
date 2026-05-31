import Link from "next/link";

export const metadata = {
  title: "Order Confirmation"
};

export default function OrderConfirmationPage({ params }: { params: { reference: string } }) {
  return (
    <section className="bg-light-gray py-16 text-zinc-950">
      <div className="container-page max-w-3xl rounded-2xl bg-white p-8 text-center shadow-card">
        <p className="text-sm font-black uppercase text-success">Order submitted</p>
        <h1 className="section-title mt-2 text-zinc-950">Thank You</h1>
        <p className="mt-4 text-lg text-zinc-600">
          Your order reference is <strong className="text-zinc-950">{params.reference}</strong>.
          KMMuscles will contact you to confirm delivery and payment details.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex rounded-lg bg-gym-red px-7 py-4 font-black uppercase text-white"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
