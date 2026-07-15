"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";

export function CartPageClient() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const deliveryFee = subtotal > 0 ? 80 : 0;

  return (
    <section className="bg-surface py-12 text-ink">
      <div className="container-page">
        <h1 className="section-title text-ink">Shopping Cart</h1>
        {items.length === 0 ? (
          <div className="mt-8 rounded-xl border border-line bg-paper p-12 text-center shadow-card">
            <h2 className="font-heading text-4xl uppercase text-ink">Your cart is empty</h2>
            <p className="mt-2 text-ink-soft">Start with a goal, a category, or the best sellers.</p>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-lg bg-ink px-6 py-3 text-sm font-medium uppercase tracking-wide text-white transition hover:bg-brand-red"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-4">
              {items.map((item) => (
                <article
                  className="grid gap-4 rounded-xl border border-line bg-paper p-4 sm:grid-cols-[110px_1fr_auto]"
                  key={`${item.productId}-${item.variant}`}
                >
                  <div className="relative aspect-square rounded-xl bg-surface">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-4" />
                  </div>
                  <div>
                    <Link href={`/products/${item.slug}`} className="text-lg font-medium text-ink">
                      {item.name}
                    </Link>
                    {item.variant ? <p className="mt-1 text-sm text-ink-soft">{item.variant}</p> : null}
                    <p className="mt-3 font-semibold text-ink">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-between">
                    <div className="flex h-11 items-center rounded-lg border border-line">
                      <button
                        className="px-3"
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variant)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="min-w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        className="px-3"
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      className="inline-flex items-center gap-2 text-sm font-bold text-error"
                      type="button"
                      onClick={() => removeItem(item.productId, item.variant)}
                    >
                      <Trash2 size={17} /> Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <aside className="h-fit rounded-xl border border-line bg-paper p-6">
              <h2 className="font-heading text-2xl uppercase text-ink">Order Summary</h2>
              <div className="mt-5 grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-soft">Subtotal</span>
                  <strong className="text-ink">{formatCurrency(subtotal)}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-soft">Delivery fee</span>
                  <strong className="text-ink">{formatCurrency(deliveryFee)}</strong>
                </div>
                <div className="flex justify-between border-t border-line pt-4 text-lg">
                  <span className="text-ink">Total</span>
                  <strong className="text-ink">{formatCurrency(subtotal + deliveryFee)}</strong>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-6 flex h-12 items-center justify-center rounded-lg bg-ink text-sm font-medium uppercase tracking-wide text-white transition hover:bg-brand-red"
              >
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
