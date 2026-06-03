import type { Prisma } from "@prisma/client";
import { prisma } from "@/config/database";
import { buildPagination } from "@/utils/api-response";
import { decimalToNumber } from "@/utils/money";
import { parsePagination } from "@/utils/pagination";
import { slugify } from "@/utils/slug";

const productInclude = {
  brand: true,
  category: true,
  images: { orderBy: { displayOrder: "asc" as const } },
  variants: true,
  goals: { include: { goalCollection: true } }
};

export function mapProductListItem(product: any) {
  const thumbnail = product.images?.[0];
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    brand: product.brand ? { id: product.brand.id, name: product.brand.name, slug: product.brand.slug } : null,
    category: { id: product.category.id, name: product.category.name, slug: product.category.slug },
    price: decimalToNumber(product.price),
    originalPrice: decimalToNumber(product.originalPrice),
    currency: product.currency,
    thumbnailUrl: thumbnail?.url ?? null,
    stockQuantity: product.stockQuantity,
    isBestSeller: product.isBestSeller,
    isFeatured: product.isFeatured,
    isNewArrival: product.isNewArrival,
    discountBadge: product.discountBadge
  };
}

export function mapProductDetail(product: any) {
  return {
    ...mapProductListItem(product),
    description: product.description,
    benefits: product.benefitsJson ?? [],
    howToUse: product.howToUse,
    ingredients: product.ingredients,
    nutritionFacts: product.nutritionFacts ?? {},
    metaTitle: product.metaTitle,
    metaDescription: product.metaDescription,
    images: product.images.map((image: any) => ({
      id: image.id,
      url: image.url,
      altText: image.altText,
      displayOrder: image.displayOrder
    })),
    variants: product.variants.map((variant: any) => ({
      id: variant.id,
      name: variant.name,
      sku: variant.sku,
      price: decimalToNumber(variant.price),
      stockQuantity: variant.stockQuantity
    })),
    goals: product.goals.map((goal: any) => ({
      id: goal.goalCollection.id,
      title: goal.goalCollection.title,
      slug: goal.goalCollection.slug
    }))
  };
}

export async function listPublicProducts(query: Record<string, any>) {
  const { page, limit, skip } = parsePagination(query);
  const where: Prisma.ProductWhereInput = {
    isActive: true,
    category: { isActive: true }
  };

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
      { sku: { contains: query.search, mode: "insensitive" } }
    ];
  }

  if (query.category) where.category = { slug: query.category, isActive: true };
  if (query.brand) where.brand = { slug: query.brand, isActive: true };
  if (query.goal) where.goals = { some: { goalCollection: { slug: query.goal, isActive: true } } };
  if (query.inStock === true) where.stockQuantity = { gt: 0 };
  if (query.bestSeller !== undefined) where.isBestSeller = query.bestSeller;
  if (query.featured !== undefined) where.isFeatured = query.featured;
  if (query.priceMin !== undefined || query.priceMax !== undefined) {
    where.price = {
      gte: query.priceMin,
      lte: query.priceMax
    };
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    query.sort === "price_asc"
      ? { price: "asc" }
      : query.sort === "price_desc"
        ? { price: "desc" }
        : query.sort === "name_asc"
          ? { name: "asc" }
          : query.sort === "best_seller"
            ? { isBestSeller: "desc" }
            : { createdAt: "desc" };

  const [items, total] = await prisma.$transaction([
    prisma.product.findMany({ where, include: productInclude, orderBy, skip, take: limit }),
    prisma.product.count({ where })
  ]);

  return {
    items: items.map(mapProductListItem),
    pagination: buildPagination(page, limit, total)
  };
}

export async function getPublicProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: { slug, isActive: true, category: { isActive: true } },
    include: productInclude
  });

  return product ? mapProductDetail(product) : null;
}

export async function getRelatedProducts(slug: string, limit = 4) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { goals: true }
  });

  if (!product) return [];

  const goalIds = product.goals.map((goal) => goal.goalCollectionId);
  const products = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      isActive: true,
      OR: [{ categoryId: product.categoryId }, { brandId: product.brandId }, { goals: { some: { goalCollectionId: { in: goalIds } } } }]
    },
    include: productInclude,
    take: limit
  });

  return products.map(mapProductListItem);
}

export async function createProduct(data: any) {
  const slug = data.slug ?? slugify(data.name);
  const { goalIds, benefits, nutritionFacts, ...productData } = data;

  return prisma.product.create({
    data: {
      ...productData,
      slug,
      benefitsJson: benefits ?? [],
      nutritionFacts: nutritionFacts ?? {},
      goals: goalIds?.length
        ? {
            createMany: {
              data: goalIds.map((goalCollectionId: string) => ({ goalCollectionId }))
            }
          }
        : undefined
    },
    include: productInclude
  });
}

export async function updateProduct(id: string, data: any) {
  const { goalIds, benefits, nutritionFacts, ...productData } = data;

  return prisma.$transaction(async (tx) => {
    if (goalIds) {
      await tx.productGoal.deleteMany({ where: { productId: id } });
      if (goalIds.length) {
        await tx.productGoal.createMany({
          data: goalIds.map((goalCollectionId: string) => ({ productId: id, goalCollectionId }))
        });
      }
    }

    return tx.product.update({
      where: { id },
      data: {
        ...productData,
        slug: productData.slug ?? undefined,
        benefitsJson: benefits,
        nutritionFacts
      },
      include: productInclude
    });
  });
}

export async function archiveProduct(id: string) {
  return prisma.product.update({ where: { id }, data: { isActive: false } });
}
