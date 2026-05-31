"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const isOut = product.stockQuantity <= 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white text-zinc-950 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-light-gray">
          {product.discountBadge ? (
            <span className="absolute left-3 top-3 z-10 rounded bg-gym-red px-3 py-1 text-xs font-black uppercase text-white">
              {product.discountBadge}
            </span>
          ) : null}
          {product.isBestSeller ? (
            <span className="absolute right-3 top-3 z-10 rounded bg-muscle-black px-3 py-1 text-xs font-black uppercase text-white">
              Best Seller
            </span>
          ) : null}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="product-card-image object-contain p-8 transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-bold uppercase text-gym-red">{product.category.name}</p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-1 min-h-14 text-lg font-black leading-tight">{product.name}</h3>
          </Link>
          <p className="mt-1 text-sm text-zinc-500">{product.brand.name}</p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xl font-black">{formatCurrency(product.price)}</p>
            {product.originalPrice ? (
              <p className="text-sm text-zinc-500 line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => addItem(product, product.variants[0])}
            disabled={isOut}
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg bg-gym-red px-4 text-sm font-black uppercase text-white transition hover:bg-energy-orange disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            <ShoppingCart size={18} />
            {isOut ? "Out" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
