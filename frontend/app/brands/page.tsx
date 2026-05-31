import Link from "next/link";
import { PackageCheck } from "lucide-react";
import { getBrands } from "@/lib/catalog";

export const metadata = {
  title: "Brands"
};

export default function BrandsPage() {
  const brands = getBrands();

  return (
    <section className="bg-light-gray py-12 text-zinc-950">
      <div className="container-page">
        <p className="text-sm font-black uppercase text-gym-red">Shop by brand</p>
        <h1 className="section-title mt-2 text-zinc-950">Brands</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link
              href={`/brands/${brand.slug}`}
              className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-card transition hover:-translate-y-1"
              key={brand.slug}
            >
              <PackageCheck className="text-gym-red" size={34} />
              <h2 className="mt-5 font-heading text-4xl uppercase">{brand.name}</h2>
              <p className="mt-2 text-zinc-500">View available products and best-selling stacks.</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
