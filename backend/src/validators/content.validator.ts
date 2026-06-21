import { z } from "zod";

const unsafeUrlPattern = /^(javascript|data|file):/i;

const safeUrl = z
  .string()
  .max(500)
  .refine((value) => !unsafeUrlPattern.test(value), "Unsafe URL protocol is not allowed");

export const bannerBodySchema = z.object({
  title: z.string().min(2).max(160),
  imageUrl: safeUrl,
  altText: z.string().max(200).optional().nullable(),
  linkUrl: safeUrl.optional().nullable(),
  placement: z.enum(["HOME_HERO", "HOME_PROMO", "PRODUCTS", "CATEGORY"]).optional(),
  displayOrder: z.coerce.number().int().min(0).optional(),
  startsAt: z.coerce.date().optional().nullable(),
  endsAt: z.coerce.date().optional().nullable(),
  isActive: z.boolean().optional()
});

export const bannerUpdateSchema = bannerBodySchema.partial();

export const policyBodySchema = z.object({
  title: z.string().min(2).max(160),
  content: z.string().min(1),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  metaTitle: z.string().max(160).optional().nullable(),
  metaDescription: z.string().max(300).optional().nullable()
});

export const cmsContentBodySchema = z.object({
  title: z.string().min(2).max(160),
  contentJson: z.record(z.unknown()),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  metaTitle: z.string().max(160).optional().nullable(),
  metaDescription: z.string().max(300).optional().nullable()
});

export const siteSettingsSchema = z.object({
  logoUrl: safeUrl.optional().nullable(),
  faviconUrl: safeUrl.optional().nullable(),
  metaTitle: z.string().max(160).optional().nullable(),
  metaDescription: z.string().max(300).optional().nullable(),
  socialLinksJson: z.record(z.string()).optional().nullable()
});

export const contactSettingsSchema = z.object({
  email: z.string().email(),
  phone: z.string().min(5).max(40),
  whatsapp: z.string().max(40).optional().nullable(),
  address: z.string().min(2).max(300),
  mapLink: safeUrl.optional().nullable(),
  socialsJson: z.record(z.string()).optional().nullable()
});

export const paymentSettingsSchema = z.object({
  cashOnDeliveryEnabled: z.boolean(),
  vodafoneCashEnabled: z.boolean(),
  vodafoneCashNumber: z.string().max(40).optional().nullable(),
  vodafoneCashInstructions: z.string().max(1000).optional().nullable(),
  cardEnabled: z.boolean()
});
