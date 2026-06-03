import { z } from "zod";

const unsafeUrlPattern = /^(javascript|data|file):/i;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

export const productSchema = z.object({
  name: z.string().min(2),
  sku: z.string().optional(),
  price: z.coerce.number().positive(),
  stockQuantity: z.coerce.number().int().min(0),
  categoryId: z.string().min(1)
});

export const safeUrlSchema = z
  .string()
  .max(500)
  .refine((value) => !unsafeUrlPattern.test(value), "Unsafe URL protocol is not allowed");
