import { z } from "zod";

export const adminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(200)
});

export const adminUserBodySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(200).optional(),
  role: z.enum(["SUPER_ADMIN", "ADMIN", "PRODUCT_MANAGER", "CONTENT_MANAGER", "ORDER_STAFF", "STAFF"]),
  isActive: z.boolean().optional()
});

export const adminUserUpdateSchema = adminUserBodySchema.partial();
