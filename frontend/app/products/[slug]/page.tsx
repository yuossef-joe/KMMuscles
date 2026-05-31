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
      <section className="bg-light-gray py-12 text-zinc-950">
        <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-card">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-light-gray">
              {product.discountBadge ? (
                <span className="absolute left-4 top-4 z-10 rounded bg-gym-red px-3 py-1 text-xs font-black uppercase text-white">
                  {product.discountBadge}
                </span>
              ) : null}
              <Image src={product.image} alt={product.name} fill className="object-contain p-10" priority />
            </div>
          </div>

          <div className="py-2">
            <p className="text-sm font-black uppercase text-gym-red">
              <Link href={`/brands/${product.brand.slug}`}>{product.brand.name}</Link> /{" "}
              <Link href={`/categories/${product.category.slug}`}>{product.category.name}</Link>
            </p>
            <h1 className="mt-3 font-heading text-5xl font-black uppercase leading-none md:text-7xl">
              {product.name}
            </h1>
            <div className="mt-5 flex flex-wrap items-end gap-3">
              <p className="text-4xl font-black">{formatCurrency(product.price)}</p>
              {product.originalPrice ? (
                <p className="text-xl text-zinc-500 line-through">{formatCurrency(product.originalPrice)}</p>
              ) : null}
            </div>
            <p className="mt-4 text-sm font-bold uppercase text-success">
              {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : "Out of stock"}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">{product.description}</p>
            <AddToCartPanel product={product} />
          </div>
        </div>
      </section>

      <section className="bg-muscle-black py-14">
        <div className="container-page grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl border border-border-gray bg-deep-charcoal p-7">
            <h2 className="font-heading text-3xl uppercase">Benefits</h2>
            <ul className="mt-4 grid gap-3 text-zinc-300">
              {product.benefits.map((benefit) => (
                <li key={benefit}>- {benefit}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border-gray bg-deep-charcoal p-7">
            <h2 className="font-heading text-3xl uppercase">How To Use</h2>
            <p className="mt-4 text-zinc-300">{product.howToUse}</p>
          </div>
          <div className="rounded-2xl border border-border-gray bg-deep-charcoal p-7">
            <h2 className="font-heading text-3xl uppercase">Nutrition Facts</h2>
            <dl className="mt-4 grid gap-3">
              {Object.entries(product.nutritionFacts).map(([label, value]) => (
                <div className="flex justify-between border-b border-border-gray pb-2" key={label}>
                  <dt className="text-zinc-400">{label}</dt>
                  <dd className="font-bold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="bg-light-gray py-14 text-zinc-950">
          <div className="container-page">
            <h2 className="section-title text-zinc-950">Related Products</h2>
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
