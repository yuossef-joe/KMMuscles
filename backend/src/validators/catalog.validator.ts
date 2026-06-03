import { z } from "zod";

export const categoryBodySchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(140).optional(),
  imageUrl: z.string().max(500).optional().nullable(),
  description: z.string().max(3000).optional().nullable(),
  showInNavbar: z.boolean().optional(),
  displayOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  metaTitle: z.string().max(160).optional().nullable(),
  metaDescription: z.string().max(300).optional().nullable()
});

export const categoryUpdateSchema = categoryBodySchema.partial();

export const brandBodySchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().min(2).max(140).optional(),
  logoUrl: z.string().max(500).optional().nullable(),
  description: z.string().max(3000).optional().nullable(),
  isActive: z.boolean().optional()
});

export const brandUpdateSchema = brandBodySchema.partial();

export const goalBodySchema = z.object({
  title: z.string().min(2).max(120),
  slug: z.string().min(2).max(140).optional(),
  imageUrl: z.string().max(500).optional().nullable(),
  accent: z.string().max(160).optional().nullable(),
  description: z.string().max(3000).optional().nullable(),
  ctaText: z.string().max(80).optional(),
  displayOrder: z.coerce.number().int().min(0).optional(),
  isActive: z.boolean().optional()
});

export const goalUpdateSchema = goalBodySchema.partial();
