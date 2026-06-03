import { prisma } from "@/config/database";
import { slugify } from "@/utils/slug";
import { mapProductListItem } from "@/services/product.service";

export async function listCategories(publicOnly = true) {
  return prisma.category.findMany({
    where: publicOnly ? { isActive: true } : undefined,
    orderBy: [{ displayOrder: "asc" }, { name: "asc" }]
  });
}

export async function getCategory(slug: string) {
  return prisma.category.findFirst({
    where: { slug, isActive: true },
    include: {
      products: {
        where: { isActive: true },
        include: { brand: true, category: true, images: { orderBy: { displayOrder: "asc" } } }
      }
    }
  });
}

export async function listBrands(publicOnly = true) {
  return prisma.brand.findMany({
    where: publicOnly ? { isActive: true } : undefined,
    orderBy: { name: "asc" }
  });
}

export async function getBrand(slug: string) {
  return prisma.brand.findFirst({
    where: { slug, isActive: true },
    include: {
      products: {
        where: { isActive: true },
        include: { brand: true, category: true, images: { orderBy: { displayOrder: "asc" } } }
      }
    }
  });
}

export async function listGoals(publicOnly = true) {
  return prisma.goalCollection.findMany({
    where: publicOnly ? { isActive: true } : undefined,
    orderBy: [{ displayOrder: "asc" }, { title: "asc" }]
  });
}

export async function getGoal(slug: string) {
  return prisma.goalCollection.findFirst({
    where: { slug, isActive: true },
    include: {
      products: {
        include: {
          product: {
            include: { brand: true, category: true, images: { orderBy: { displayOrder: "asc" } } }
          }
        }
      }
    }
  });
}

export function mapCategory(category: any) {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    imageUrl: category.imageUrl,
    description: category.description,
    showInNavbar: category.showInNavbar,
    displayOrder: category.displayOrder,
    metaTitle: category.metaTitle,
    metaDescription: category.metaDescription
  };
}

export function mapBrand(brand: any) {
  return {
    id: brand.id,
    name: brand.name,
    slug: brand.slug,
    logoUrl: brand.logoUrl,
    description: brand.description
  };
}

export function mapGoal(goal: any) {
  return {
    id: goal.id,
    title: goal.title,
    slug: goal.slug,
    imageUrl: goal.imageUrl,
    accent: goal.accent,
    description: goal.description,
    ctaText: goal.ctaText,
    displayOrder: goal.displayOrder
  };
}

export function mapCategoryDetail(category: any) {
  return {
    ...mapCategory(category),
    products: category.products.map(mapProductListItem)
  };
}

export function mapBrandDetail(brand: any) {
  return {
    ...mapBrand(brand),
    products: brand.products.map(mapProductListItem)
  };
}

export function mapGoalDetail(goal: any) {
  return {
    ...mapGoal(goal),
    products: goal.products.map((item: any) => mapProductListItem(item.product))
  };
}

export async function createCategory(data: any) {
  return prisma.category.create({ data: { ...data, slug: data.slug ?? slugify(data.name) } });
}

export async function updateCategory(id: string, data: any) {
  return prisma.category.update({ where: { id }, data });
}

export async function archiveCategory(id: string) {
  return prisma.category.update({ where: { id }, data: { isActive: false } });
}

export async function createBrand(data: any) {
  return prisma.brand.create({ data: { ...data, slug: data.slug ?? slugify(data.name) } });
}

export async function updateBrand(id: string, data: any) {
  return prisma.brand.update({ where: { id }, data });
}

export async function archiveBrand(id: string) {
  return prisma.brand.update({ where: { id }, data: { isActive: false } });
}

export async function createGoal(data: any) {
  return prisma.goalCollection.create({ data: { ...data, slug: data.slug ?? slugify(data.title) } });
}

export async function updateGoal(id: string, data: any) {
  return prisma.goalCollection.update({ where: { id }, data });
}

export async function archiveGoal(id: string) {
  return prisma.goalCollection.update({ where: { id }, data: { isActive: false } });
}

export function mapCatalogAdmin<T extends { isActive?: boolean }>(item: T) {
  return item;
}
