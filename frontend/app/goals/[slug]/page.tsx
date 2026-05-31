import { notFound } from "next/navigation";
import { CatalogGrid } from "@/components/CatalogGrid";
import { goals } from "@/lib/data";
import { getProductsByGoal } from "@/lib/catalog";

export function generateStaticParams() {
  return goals.map((goal) => ({ slug: goal.slug }));
}

export default function GoalPage({ params }: { params: { slug: string } }) {
  const goal = goals.find((item) => item.slug === params.slug);
  if (!goal) notFound();

  return (
    <CatalogGrid
      initialProducts={getProductsByGoal(params.slug)}
      title={goal.title}
      subtitle={`Supplements selected for ${goal.title.toLowerCase()} goals.`}
    />
  );
}
