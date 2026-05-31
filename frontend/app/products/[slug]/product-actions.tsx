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
    <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5">
      <label className="grid gap-2 text-sm font-bold uppercase text-zinc-600">
        Size / flavor
        <select
          value={variant}
          onChange={(event) => setVariant(event.target.value)}
          className="h-12 rounded-lg border border-zinc-200 bg-light-gray px-3 text-zinc-950 outline-none"
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
          className="focus-ring inline-flex h-13 items-center gap-2 rounded-lg bg-gym-red px-7 py-4 font-black uppercase text-white transition hover:bg-energy-orange disabled:bg-zinc-300"
        >
          <ShoppingCart size={20} /> Add to Cart
        </button>
        <Link
          href="/checkout"
          onClick={() => addItem(product, variant)}
          className="focus-ring inline-flex h-13 items-center gap-2 rounded-lg bg-muscle-black px-7 py-4 font-black uppercase text-white transition hover:bg-zinc-800"
        >
          <Zap size={20} /> Buy Now
        </Link>
      </div>
    </div>
  );
}
