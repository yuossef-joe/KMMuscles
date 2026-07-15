"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";

export function CheckoutClient() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");
  const deliveryFee = subtotal > 0 ? 80 : 0;

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const reference = `KM-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-0001`;
    window.sessionStorage.setItem(
      "kmmuscles_last_order",
      JSON.stringify({ reference, items, total: subtotal + deliveryFee, paymentMethod })
    );
    clearCart();
    router.push(`/order-confirmation/${reference}`);
  }

  return (
    <section className="bg-surface py-12 text-ink">
      <form onSubmit={submit} className="container-page grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="eyebrow text-ink-soft">Guest checkout</p>
          <h1 className="section-title mt-2 text-ink">Checkout</h1>
          <div className="mt-8 grid gap-4 rounded-xl border border-line bg-paper p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-ink">
                Full name
                <input required className="h-12 rounded-lg border border-line bg-paper px-4 outline-none focus:border-ink" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink">
                Phone number
                <input required className="h-12 rounded-lg border border-line bg-paper px-4 outline-none focus:border-ink" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink">
                Email optional
                <input type="email" className="h-12 rounded-lg border border-line bg-paper px-4 outline-none focus:border-ink" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink">
                Governorate
                <input required className="h-12 rounded-lg border border-line bg-paper px-4 outline-none focus:border-ink" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink">
                City
                <input required className="h-12 rounded-lg border border-line bg-paper px-4 outline-none focus:border-ink" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
                Full address
                <input required className="h-12 rounded-lg border border-line bg-paper px-4 outline-none focus:border-ink" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-ink md:col-span-2">
                Notes optional
                <textarea className="min-h-28 rounded-lg border border-line bg-paper p-4 outline-none focus:border-ink" />
              </label>
            </div>

            <div className="border-t border-line pt-5">
              <h2 className="font-heading text-2xl uppercase text-ink">Payment Method</h2>
              <div className="mt-4 grid gap-3">
                {[
                  ["cash_on_delivery", "Cash on Delivery"],
                  ["vodafone_cash", "Vodafone Cash manual confirmation"],
                  ["card", "Visa/Mastercard ready soon"]
                ].map(([value, label]) => (
                  <label
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-line p-4 transition hover:border-ink/30"
                    key={value}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={paymentMethod === value}
                      onChange={() => setPaymentMethod(value)}
                      disabled={value === "card"}
                      className="accent-ink"
                    />
                    <span className="font-medium text-ink">{label}</span>
                  </label>
                ))}
              </div>
              {paymentMethod === "vodafone_cash" ? (
                <div className="mt-4 rounded-xl border border-line bg-surface p-4 text-sm text-ink-soft">
                  Send the total to Vodafone Cash number +201159500155, then our team will confirm
                  your order by phone.
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-line bg-paper p-6">
          <h2 className="font-heading text-2xl uppercase text-ink">Your Order</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {items.map((item) => (
              <div className="flex justify-between gap-4" key={`${item.productId}-${item.variant}`}>
                <span className="text-ink-soft">
                  {item.quantity} x {item.name}
                </span>
                <strong className="text-ink">{formatCurrency(item.price * item.quantity)}</strong>
              </div>
            ))}
            <div className="border-t border-line pt-4" />
            <div className="flex justify-between">
              <span className="text-ink-soft">Subtotal</span>
              <strong className="text-ink">{formatCurrency(subtotal)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-soft">Delivery</span>
              <strong className="text-ink">{formatCurrency(deliveryFee)}</strong>
            </div>
            <div className="flex justify-between text-lg">
              <span className="text-ink">Total</span>
              <strong className="text-ink">{formatCurrency(subtotal + deliveryFee)}</strong>
            </div>
          </div>
          <button
            type="submit"
            disabled={items.length === 0}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-ink text-sm font-medium uppercase tracking-wide text-white transition hover:bg-brand-red disabled:bg-surface disabled:text-ink-soft"
          >
            Submit Order
          </button>
        </aside>
      </form>
    </section>
  );
}
