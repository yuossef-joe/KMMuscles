import { z } from "zod";
import { booleanQuery, paginationQuerySchema } from "@/validators/common.validator";

export const productListQuerySchema = paginationQuerySchema.extend({
  search: z.string().trim().max(120).optional(),
  category: z.string().trim().max(120).optional(),
  brand: z.string().trim().max(120).optional(),
  goal: z.string().trim().max(120).optional(),
  priceMin: z.coerce.number().nonnegative().optional(),
  priceMax: z.coerce.number().nonnegative().optional(),
  inStock: booleanQuery,
  bestSeller: booleanQuery,
  featured: booleanQuery,
  sort: z.enum(["newest", "price_asc", "price_desc", "name_asc", "best_seller"]).optional()
});

export const relatedQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(12).optional()
});

export const productBodySchema = z.object({
  name: z.string().min(2).max(180),
  slug: z.string().min(2).max(180).optional(),
  sku: z.string().min(2).max(80).optional(),
  brandId: z.string().uuid().optional().nullable(),
  categoryId: z.string().uuid(),
  goalIds: z.array(z.string().uuid()).optional().default([]),
  description: z.string().max(5000).optional().nullable(),
  benefits: z.array(z.string().min(1).max(200)).optional().default([]),
  howToUse: z.string().max(3000).optional().nullable(),
  ingredients: z.string().max(3000).optional().nullable(),
  nutritionFacts: z.record(z.string()).optional().default({}),
  price: z.coerce.number().positive(),
  originalPrice: z.coerce.number().positive().optional().nullable(),
  stockQuantity: z.coerce.number().int().min(0).default(0),
  isBestSeller: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isNewArrival: z.boolean().optional(),
  discountBadge: z.string().max(80).optional().nullable(),
  isActive: z.boolean().optional()
});

export const productUpdateSchema = productBodySchema.partial().extend({
  goalIds: z.array(z.string().uuid()).optional()
});
