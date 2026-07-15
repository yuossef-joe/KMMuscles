import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { getProduct } from "@/lib/catalog";
import { products } from "@/lib/data";
import { formatCurrency } from "@/lib/format";
import { AddToCartPanel } from "./product-actions";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  return {
    title: product?.name ?? "Product",
    description: product?.description
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = products
    .filter((item) => item.id !== product.id && item.category.slug === product.category.slug)
    .slice(0, 4);

  return (
    <>
      <section className="bg-surface py-12 text-ink">
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-line bg-paper p-8 shadow-card">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-surface">
              {product.discountBadge ? (
                <span className="absolute left-4 top-4 z-10 rounded bg-brand-red px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  {product.discountBadge}
                </span>
              ) : null}
              <Image src={product.image} alt={product.name} fill className="object-contain p-10" priority />
            </div>
          </div>

          <div className="py-2">
            <p className="eyebrow text-ink-soft">
              <Link className="hover:text-brand-red" href={`/brands/${product.brand.slug}`}>{product.brand.name}</Link> /{" "}
              <Link className="hover:text-brand-red" href={`/categories/${product.category.slug}`}>{product.category.name}</Link>
            </p>
            <h1 className="mt-3 font-heading text-5xl uppercase leading-none text-ink md:text-6xl">
              {product.name}
            </h1>
            <div className="mt-5 flex flex-wrap items-end gap-3">
              <p className="text-4xl font-semibold text-ink">{formatCurrency(product.price)}</p>
              {product.originalPrice ? (
                <p className="text-xl text-brand-red line-through">{formatCurrency(product.originalPrice)}</p>
              ) : null}
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-success">
              {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of stock"}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">{product.description}</p>
            <AddToCartPanel product={product} />
          </div>
        </div>
      </section>

      <section className="bg-paper py-14">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          <div className="rounded-xl border border-line bg-surface p-7">
            <h2 className="font-heading text-2xl uppercase text-ink">Benefits</h2>
            <ul className="mt-4 grid gap-3 text-ink-soft">
              {product.benefits.map((benefit) => (
                <li key={benefit}>- {benefit}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-line bg-surface p-7">
            <h2 className="font-heading text-2xl uppercase text-ink">How To Use</h2>
            <p className="mt-4 text-ink-soft">{product.howToUse}</p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-7">
            <h2 className="font-heading text-2xl uppercase text-ink">Nutrition Facts</h2>
            <dl className="mt-4 grid gap-3">
              {Object.entries(product.nutritionFacts).map(([label, value]) => (
                <div className="flex justify-between border-b border-line pb-2" key={label}>
                  <dt className="text-ink-soft">{label}</dt>
                  <dd className="font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-line bg-surface py-14 text-ink">
          <div className="container-page">
            <h2 className="section-title text-ink">Related Products</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
