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
    <article className="group flex flex-col overflow-hidden rounded-xl border border-line bg-paper text-ink transition duration-300 hover:border-ink/20 hover:shadow-card">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-surface">
          {product.discountBadge ? (
            <span className="absolute left-3 top-3 z-10 rounded bg-brand-red px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              {product.discountBadge}
            </span>
          ) : null}
          {product.isBestSeller ? (
            <span className="absolute right-3 top-3 z-10 rounded border border-ink/15 bg-paper px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-ink">
              Best Seller
            </span>
          ) : null}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="product-card-image object-contain p-8 transition duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="eyebrow text-ink-soft">{product.category.name}</p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-2 min-h-14 text-base font-medium leading-tight">{product.name}</h3>
          </Link>
          <p className="mt-1 text-sm text-ink-soft">{product.brand.name}</p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="text-lg font-semibold">{formatCurrency(product.price)}</p>
            {product.originalPrice ? (
              <p className="text-sm text-brand-red line-through">
                {formatCurrency(product.originalPrice)}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => addItem(product, product.variants[0])}
            disabled={isOut}
            className="focus-ring inline-flex h-11 items-center gap-2 rounded-lg border border-ink bg-ink px-4 text-sm font-medium uppercase tracking-wide text-white transition hover:bg-paper hover:text-ink disabled:cursor-not-allowed disabled:border-line disabled:bg-surface disabled:text-ink-soft"
          >
            <ShoppingCart size={18} />
            {isOut ? "Out" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
