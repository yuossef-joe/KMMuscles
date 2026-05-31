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
    <section className="bg-light-gray py-12 text-zinc-950">
      <div className="container-page">
        <h1 className="section-title text-zinc-950">Shopping Cart</h1>
        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-12 text-center shadow-card">
            <h2 className="font-heading text-4xl uppercase">Your cart is empty</h2>
            <p className="mt-2 text-zinc-500">Start with a goal, a category, or the best sellers.</p>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-lg bg-gym-red px-6 py-3 font-black uppercase text-white"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-4">
              {items.map((item) => (
                <article
                  className="grid gap-4 rounded-2xl bg-white p-4 shadow-card sm:grid-cols-[110px_1fr_auto]"
                  key={`${item.productId}-${item.variant}`}
                >
                  <div className="relative aspect-square rounded-xl bg-light-gray">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-4" />
                  </div>
                  <div>
                    <Link href={`/products/${item.slug}`} className="text-lg font-black">
                      {item.name}
                    </Link>
                    {item.variant ? <p className="mt-1 text-sm text-zinc-500">{item.variant}</p> : null}
                    <p className="mt-3 font-black">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-between">
                    <div className="flex h-11 items-center rounded-lg border border-zinc-200">
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
            <aside className="h-fit rounded-2xl bg-white p-6 shadow-card">
              <h2 className="font-heading text-3xl uppercase">Order Summary</h2>
              <div className="mt-5 grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <strong>{formatCurrency(subtotal)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Delivery fee</span>
                  <strong>{formatCurrency(deliveryFee)}</strong>
                </div>
                <div className="flex justify-between border-t border-zinc-200 pt-4 text-lg">
                  <span>Total</span>
                  <strong>{formatCurrency(subtotal + deliveryFee)}</strong>
                </div>
              </div>
              <Link
                href="/checkout"
                className="mt-6 flex h-12 items-center justify-center rounded-lg bg-gym-red font-black uppercase text-white hover:bg-energy-orange"
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
