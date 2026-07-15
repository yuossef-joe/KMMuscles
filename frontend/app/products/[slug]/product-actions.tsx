"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";

export function AddToCartPanel({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants[0]);
  const { addItem } = useCart();

  return (
    <div className="mt-8 rounded-xl border border-line bg-paper p-5">
      <label className="grid gap-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
        Size / flavor
        <select
          value={variant}
          onChange={(event) => setVariant(event.target.value)}
          className="h-12 rounded-lg border border-line bg-surface px-3 text-ink outline-none"
        >
          {product.variants.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          disabled={product.stockQuantity <= 0}
          onClick={() => addItem(product, variant)}
          className="focus-ring inline-flex h-12 items-center gap-2 rounded-lg border border-ink bg-ink px-7 text-sm font-medium uppercase tracking-wide text-white transition hover:bg-brand-red hover:border-brand-red disabled:border-line disabled:bg-surface disabled:text-ink-soft"
        >
          <ShoppingCart size={20} /> Add to Cart
        </button>
        <Link
          href="/checkout"
          onClick={() => addItem(product, variant)}
          className="focus-ring inline-flex h-12 items-center gap-2 rounded-lg border border-ink px-7 text-sm font-medium uppercase tracking-wide text-ink transition hover:bg-ink hover:text-white"
        >
          <Zap size={20} /> Buy Now
        </Link>
      </div>
    </div>
  );
}
