import { CatalogGrid } from "@/components/CatalogGrid";

export const metadata = {
  title: "Products",
  description: "Browse KMMuscles supplement products by category, brand, goal, price, and stock."
};

export default function ProductsPage() {
  return <CatalogGrid title="Products" subtitle="Search supplements, compare goals, and add your stack to cart." />;
}
