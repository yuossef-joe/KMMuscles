import Link from "next/link";
import { PackageCheck } from "lucide-react";
import { getBrands } from "@/lib/catalog";

export const metadata = {
  title: "Brands"
};

export default function BrandsPage() {
  const brands = getBrands();

  return (
    <section className="bg-surface py-12 text-ink">
      <div className="container-page">
        <p className="eyebrow text-ink-soft">Shop by brand</p>
        <h1 className="section-title mt-2 text-ink">Brands</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link
              href={`/brands/${brand.slug}`}
              className="rounded-xl border border-line bg-paper p-8 transition hover:border-ink/20 hover:shadow-card"
              key={brand.slug}
            >
              <PackageCheck className="text-brand-red" size={34} />
              <h2 className="mt-5 font-heading text-3xl uppercase text-ink">{brand.name}</h2>
              <p className="mt-2 text-ink-soft">View available products and best-selling stacks.</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
