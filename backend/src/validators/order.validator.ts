import { z } from "zod";
import { isEgyptianPhone } from "@/utils/phone";

export const createOrderSchema = z.object({
  customer: z.object({
    fullName: z.string().min(2).max(140),
    phone: z.string().refine(isEgyptianPhone, "Phone must be a valid Egyptian mobile number"),
    email: z.string().email().optional().or(z.literal(""))
  }),
  shippingAddress: z.object({
    governorate: z.string().min(2).max(120),
    city: z.string().min(1).max(120).optional(),
    addressLine: z.string().min(5).max(500)
  }),
  paymentMethod: z.enum(["cash_on_delivery", "vodafone_cash"]),
  notes: z.string().max(1000).optional(),
  items: z
    .array(
      z.object({
        productId: z.string().uuid(),
        variantId: z.string().uuid().nullable().optional(),
        quantity: z.coerce.number().int().positive().max(99)
      })
    )
    .min(1)
    .max(50)
});

export const orderListQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
  search: z.string().max(120).optional(),
  status: z
    .enum(["NEW", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED", "RETURNED"])
    .optional(),
  paymentStatus: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]).optional(),
  paymentMethod: z.enum(["CASH_ON_DELIVERY", "VODAFONE_CASH", "CARD"]).optional()
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["NEW", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED", "RETURNED"])
});

export const updatePaymentStatusSchema = z.object({
  paymentStatus: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"])
});

export const orderNoteSchema = z.object({
  note: z.string().min(1).max(1000)
});
