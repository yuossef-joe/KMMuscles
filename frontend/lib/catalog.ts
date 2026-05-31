import { categories, products } from "@/lib/data";

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.category.slug === slug);
}

export function getProductsByBrand(slug: string) {
  return products.filter((product) => product.brand.slug === slug);
}

export function getProductsByGoal(slug: string) {
  return products.filter((product) => product.goals.includes(slug));
}

export function getBrands() {
  const map = new Map<string, string>();
  products.forEach((product) => map.set(product.brand.slug, product.brand.name));
  return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
}
