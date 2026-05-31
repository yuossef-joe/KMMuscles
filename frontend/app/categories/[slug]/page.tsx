import { notFound } from "next/navigation";
import { CatalogGrid } from "@/components/CatalogGrid";
import { getCategory, getProductsByCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return [
    "mass-gainer",
    "protein",
    "creatine",
    "pre-workout",
    "carbohydrate",
    "amino",
    "fat-burner",
    "recovery",
    "test-booster",
    "multi-vitamin"
  ].map((slug) => ({ slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  return (
    <CatalogGrid
      initialProducts={getProductsByCategory(params.slug)}
      title={category.name}
      subtitle={`Shop ${category.name} supplements from the KMMuscles catalog.`}
    />
  );
}
