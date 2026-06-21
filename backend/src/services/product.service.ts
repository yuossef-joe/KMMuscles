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

export function skuPrefixFromName(name: string) {
  const prefix = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .map((part) => part.slice(0, 4))
    .join("")
    .toUpperCase()
    .slice(0, 12);

  return prefix || "PRODUCT";
}

function randomSkuSuffix() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function generateUniqueProductSku(name: string) {
  const prefix = skuPrefixFromName(name);

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const sku = `${prefix}-${randomSkuSuffix()}`;
    const existing = await prisma.product.findUnique({ where: { sku }, select: { id: true } });
    if (!existing) return sku;
  }

  return `${prefix}-${Date.now().toString(36).toUpperCase()}`;
}

async function uniqueProductSlug(name: string, excludeId?: string) {
  const base = slugify(name) || "product";

  for (let index = 0; index < 50; index += 1) {
    const slug = index === 0 ? base : `${base}-${index + 1}`;
    const existing = await prisma.product.findUnique({ where: { slug }, select: { id: true } });
    if (!existing || existing.id === excludeId) return slug;
  }

  return `${base}-${Date.now().toString(36)}`;
}

export async function createProduct(data: any) {
  const slug = await uniqueProductSlug(data.name);
  const { goalIds, benefits, nutritionFacts, imageUrls, ...productData } = data;
  const sku = productData.sku ?? (await generateUniqueProductSku(productData.name));

  return prisma.product.create({
    data: {
      ...productData,
      slug,
      sku,
      benefitsJson: benefits ?? [],
      nutritionFacts: nutritionFacts ?? {},
      images: imageUrls?.length
        ? {
            createMany: {
              data: imageUrls.map((url: string, index: number) => ({
                url,
                altText: productData.name,
                displayOrder: index
              }))
            }
          }
        : undefined,
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
  const { goalIds, benefits, nutritionFacts, imageUrls, ...productData } = data;
  const slug = productData.name ? await uniqueProductSlug(productData.name, id) : undefined;

  return prisma.$transaction(async (tx) => {
    if (goalIds) {
      await tx.productGoal.deleteMany({ where: { productId: id } });
      if (goalIds.length) {
        await tx.productGoal.createMany({
          data: goalIds.map((goalCollectionId: string) => ({ productId: id, goalCollectionId }))
        });
      }
    }

    if (imageUrls) {
      await tx.productImage.deleteMany({ where: { productId: id } });
      if (imageUrls.length) {
        await tx.productImage.createMany({
          data: imageUrls.map((url: string, index: number) => ({
            productId: id,
            url,
            altText: productData.name,
            displayOrder: index
          }))
        });
      }
    }

    return tx.product.update({
      where: { id },
      data: {
        ...productData,
        slug,
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
