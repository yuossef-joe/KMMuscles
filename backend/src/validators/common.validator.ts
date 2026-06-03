import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string().uuid()
});

export const slugParamSchema = z.object({
  slug: z.string().min(1).max(160)
});

export const keyParamSchema = z.object({
  key: z.string().min(1).max(120)
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional()
});

export const booleanQuery = z
  .enum(["true", "false"])
  .optional()
  .transform((value) => (value === undefined ? undefined : value === "true"));
