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

async function uniqueCategorySlug(name: string, excludeId?: string) {
  const base = slugify(name) || "category";

  for (let index = 0; index < 50; index += 1) {
    const slug = index === 0 ? base : `${base}-${index + 1}`;
    const existing = await prisma.category.findUnique({ where: { slug }, select: { id: true } });
    if (!existing || existing.id === excludeId) return slug;
  }

  return `${base}-${Date.now().toString(36)}`;
}

async function uniqueBrandSlug(name: string, excludeId?: string) {
  const base = slugify(name) || "brand";

  for (let index = 0; index < 50; index += 1) {
    const slug = index === 0 ? base : `${base}-${index + 1}`;
    const existing = await prisma.brand.findUnique({ where: { slug }, select: { id: true } });
    if (!existing || existing.id === excludeId) return slug;
  }

  return `${base}-${Date.now().toString(36)}`;
}

async function uniqueGoalSlug(title: string, excludeId?: string) {
  const base = slugify(title) || "goal";

  for (let index = 0; index < 50; index += 1) {
    const slug = index === 0 ? base : `${base}-${index + 1}`;
    const existing = await prisma.goalCollection.findUnique({ where: { slug }, select: { id: true } });
    if (!existing || existing.id === excludeId) return slug;
  }

  return `${base}-${Date.now().toString(36)}`;
}

export async function createCategory(data: any) {
  return prisma.category.create({ data: { ...data, slug: await uniqueCategorySlug(data.name) } });
}

export async function updateCategory(id: string, data: any) {
  return prisma.category.update({ where: { id }, data: { ...data, slug: data.name ? await uniqueCategorySlug(data.name, id) : undefined } });
}

export async function archiveCategory(id: string) {
  return prisma.category.update({ where: { id }, data: { isActive: false } });
}

export async function createBrand(data: any) {
  return prisma.brand.create({ data: { ...data, slug: await uniqueBrandSlug(data.name) } });
}

export async function updateBrand(id: string, data: any) {
  return prisma.brand.update({ where: { id }, data: { ...data, slug: data.name ? await uniqueBrandSlug(data.name, id) : undefined } });
}

export async function archiveBrand(id: string) {
  return prisma.brand.update({ where: { id }, data: { isActive: false } });
}

export async function createGoal(data: any) {
  return prisma.goalCollection.create({ data: { ...data, slug: await uniqueGoalSlug(data.title) } });
}

export async function updateGoal(id: string, data: any) {
  return prisma.goalCollection.update({ where: { id }, data: { ...data, slug: data.title ? await uniqueGoalSlug(data.title, id) : undefined } });
}

export async function archiveGoal(id: string) {
  return prisma.goalCollection.update({ where: { id }, data: { isActive: false } });
}

export function mapCatalogAdmin<T extends { isActive?: boolean }>(item: T) {
  return item;
}
