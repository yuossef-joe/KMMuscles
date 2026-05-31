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
    <section className="bg-light-gray py-12 text-zinc-950">
      <form onSubmit={submit} className="container-page grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <p className="text-sm font-black uppercase text-gym-red">Guest checkout</p>
          <h1 className="section-title mt-2 text-zinc-950">Checkout</h1>
          <div className="mt-8 grid gap-4 rounded-2xl bg-white p-6 shadow-card">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold">
                Full name
                <input required className="h-12 rounded-lg border border-zinc-200 px-4 outline-none focus:border-gym-red" />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Phone number
                <input required className="h-12 rounded-lg border border-zinc-200 px-4 outline-none focus:border-gym-red" />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Email optional
                <input type="email" className="h-12 rounded-lg border border-zinc-200 px-4 outline-none focus:border-gym-red" />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Governorate
                <input required className="h-12 rounded-lg border border-zinc-200 px-4 outline-none focus:border-gym-red" />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                City
                <input required className="h-12 rounded-lg border border-zinc-200 px-4 outline-none focus:border-gym-red" />
              </label>
              <label className="grid gap-2 text-sm font-bold md:col-span-2">
                Full address
                <input required className="h-12 rounded-lg border border-zinc-200 px-4 outline-none focus:border-gym-red" />
              </label>
              <label className="grid gap-2 text-sm font-bold md:col-span-2">
                Notes optional
                <textarea className="min-h-28 rounded-lg border border-zinc-200 p-4 outline-none focus:border-gym-red" />
              </label>
            </div>

            <div className="border-t border-zinc-200 pt-5">
              <h2 className="font-heading text-3xl uppercase">Payment Method</h2>
              <div className="mt-4 grid gap-3">
                {[
                  ["cash_on_delivery", "Cash on Delivery"],
                  ["vodafone_cash", "Vodafone Cash manual confirmation"],
                  ["card", "Visa/Mastercard ready soon"]
                ].map(([value, label]) => (
                  <label
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200 p-4"
                    key={value}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={paymentMethod === value}
                      onChange={() => setPaymentMethod(value)}
                      disabled={value === "card"}
                    />
                    <span className="font-bold">{label}</span>
                  </label>
                ))}
              </div>
              {paymentMethod === "vodafone_cash" ? (
                <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-zinc-700">
                  Send the total to Vodafone Cash number +201159500155, then our team will confirm
                  your order by phone.
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-2xl bg-white p-6 shadow-card">
          <h2 className="font-heading text-3xl uppercase">Your Order</h2>
          <div className="mt-5 grid gap-3 text-sm">
            {items.map((item) => (
              <div className="flex justify-between gap-4" key={`${item.productId}-${item.variant}`}>
                <span>
                  {item.quantity} x {item.name}
                </span>
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
              </div>
            ))}
            <div className="border-t border-zinc-200 pt-4" />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <strong>{formatCurrency(deliveryFee)}</strong>
            </div>
            <div className="flex justify-between text-lg">
              <span>Total</span>
              <strong>{formatCurrency(subtotal + deliveryFee)}</strong>
            </div>
          </div>
          <button
            type="submit"
            disabled={items.length === 0}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-gym-red font-black uppercase text-white hover:bg-energy-orange disabled:bg-zinc-300"
          >
            Submit Order
          </button>
        </aside>
      </form>
    </section>
  );
}
