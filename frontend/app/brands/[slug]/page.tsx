import { notFound } from "next/navigation";
import { CatalogGrid } from "@/components/CatalogGrid";
import { getBrands, getProductsByBrand } from "@/lib/catalog";

export function generateStaticParams() {
  return getBrands().map((brand) => ({ slug: brand.slug }));
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrands().find((item) => item.slug === params.slug);
  if (!brand) notFound();

  return (
    <CatalogGrid
      initialProducts={getProductsByBrand(params.slug)}
      title={brand.name}
      subtitle={`Products from ${brand.name}.`}
    />
  );
}
