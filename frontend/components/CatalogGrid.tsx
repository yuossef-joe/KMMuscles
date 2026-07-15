"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { categories, goals, products } from "@/lib/data";
import type { Product } from "@/lib/types";

type Props = {
  initialProducts?: Product[];
  title?: string;
  subtitle?: string;
};

export function CatalogGrid({ initialProducts = products, title = "Products", subtitle }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [goal, setGoal] = useState("all");
  const [sort, setSort] = useState("newest");

  const visibleProducts = useMemo(() => {
    const filtered = initialProducts
      .filter((product) =>
        [product.name, product.description, product.sku].join(" ").toLowerCase().includes(search.toLowerCase())
      )
      .filter((product) => category === "all" || product.category.slug === category)
      .filter((product) => goal === "all" || product.goals.includes(goal));

    return filtered.sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "name_asc") return a.name.localeCompare(b.name);
      if (sort === "best_seller") return Number(Boolean(b.isBestSeller)) - Number(Boolean(a.isBestSeller));
      return 0;
    });
  }, [category, goal, initialProducts, search, sort]);

  return (
    <section className="bg-surface py-12 text-ink">
      <div className="container-page">
        <div className="mb-8">
          <p className="eyebrow text-ink-soft">KMMuscles catalog</p>
          <h1 className="section-title mt-2 text-ink">{title}</h1>
          {subtitle ? <p className="mt-3 max-w-2xl text-ink-soft">{subtitle}</p> : null}
        </div>

        <div className="mb-8 grid gap-3 rounded-xl border border-line bg-paper p-4 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <label className="flex min-h-12 items-center gap-3 rounded-lg bg-surface px-4">
            <Search size={19} className="text-ink-soft" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>
          <label className="flex min-h-12 items-center gap-3 rounded-lg bg-surface px-4">
            <SlidersHorizontal size={19} className="text-ink-soft" />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full bg-transparent text-sm outline-none"
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option value={item.slug} key={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <select
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            className="min-h-12 rounded-lg bg-surface px-4 text-sm outline-none"
          >
            <option value="all">All goals</option>
            {goals.map((item) => (
              <option value={item.slug} key={item.slug}>
                {item.title}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="min-h-12 rounded-lg bg-surface px-4 text-sm outline-none"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price low to high</option>
            <option value="price_desc">Price high to low</option>
            <option value="name_asc">Name A-Z</option>
            <option value="best_seller">Best sellers</option>
          </select>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-line bg-paper p-12 text-center">
            <h2 className="font-heading text-4xl uppercase">No products found</h2>
            <p className="mt-2 text-ink-soft">Try another category, goal, or search term.</p>
          </div>
        )}
      </div>
    </section>
  );
}
