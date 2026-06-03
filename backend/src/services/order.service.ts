import { OrderStatus, PaymentMethod, PaymentStatus, Prisma } from "@prisma/client";
import { prisma } from "@/config/database";
import { ApiError } from "@/utils/api-error";
import { buildPagination } from "@/utils/api-response";
import { decimalToNumber } from "@/utils/money";
import { generateOrderReference } from "@/utils/order-reference";
import { parsePagination } from "@/utils/pagination";

const orderInclude = {
  items: true,
  adminNotes: { include: { adminUser: { select: { id: true, name: true, email: true } } }, orderBy: { createdAt: "desc" as const } }
};

function mapPaymentMethod(method: "cash_on_delivery" | "vodafone_cash") {
  return method === "cash_on_delivery" ? PaymentMethod.CASH_ON_DELIVERY : PaymentMethod.VODAFONE_CASH;
}

export function mapOrder(order: any) {
  return {
    id: order.id,
    reference: order.reference,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    customerEmail: order.customerEmail,
    governorate: order.governorate,
    city: order.city,
    addressLine: order.addressLine,
    notes: order.notes,
    subtotal: decimalToNumber(order.subtotal),
    deliveryFee: decimalToNumber(order.deliveryFee),
    total: decimalToNumber(order.total),
    currency: order.currency,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    status: order.status,
    items: order.items?.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      variantId: item.variantId,
      productName: item.productName,
      variantName: item.variantName,
      unitPrice: decimalToNumber(item.unitPrice),
      quantity: item.quantity,
      lineTotal: decimalToNumber(item.lineTotal)
    })),
    adminNotes: order.adminNotes,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt
  };
}

export async function createOrder(input: any) {
  const paymentMethod = mapPaymentMethod(input.paymentMethod);

  return prisma.$transaction(async (tx) => {
    const reference = await generateOrderReference();
    const orderItems = [];
    let subtotal = new Prisma.Decimal(0);

    for (const item of input.items) {
      const product = await tx.product.findFirst({
        where: { id: item.productId, isActive: true },
        include: { variants: true }
      });

      if (!product) {
        throw new ApiError(400, "Product is not available", "PRODUCT_UNAVAILABLE", { productId: item.productId });
      }

      const variant = item.variantId ? product.variants.find((entry) => entry.id === item.variantId) : null;

      if (item.variantId && !variant) {
        throw new ApiError(400, "Product variant is not available", "VARIANT_UNAVAILABLE", {
          variantId: item.variantId
        });
      }

      const availableStock = variant ? variant.stockQuantity : product.stockQuantity;
      if (availableStock < item.quantity) {
        throw new ApiError(409, "Insufficient stock", "INSUFFICIENT_STOCK", {
          productId: product.id,
          variantId: variant?.id ?? null,
          availableStock
        });
      }

      const unitPrice = variant?.price ?? product.price;
      const lineTotal = unitPrice.mul(item.quantity);
      subtotal = subtotal.add(lineTotal);

      orderItems.push({
        productId: product.id,
        variantId: variant?.id ?? null,
        productName: product.name,
        variantName: variant?.name ?? null,
        unitPrice,
        quantity: item.quantity,
        lineTotal
      });

      if (variant) {
        const updateResult = await tx.productVariant.updateMany({
          where: { id: variant.id, stockQuantity: { gte: item.quantity } },
          data: { stockQuantity: { decrement: item.quantity } }
        });
        if (updateResult.count !== 1) {
          throw new ApiError(409, "Insufficient stock", "INSUFFICIENT_STOCK", {
            productId: product.id,
            variantId: variant.id
          });
        }
      } else {
        const updateResult = await tx.product.updateMany({
          where: { id: product.id, stockQuantity: { gte: item.quantity } },
          data: { stockQuantity: { decrement: item.quantity } }
        });
        if (updateResult.count !== 1) {
          throw new ApiError(409, "Insufficient stock", "INSUFFICIENT_STOCK", {
            productId: product.id,
            variantId: null
          });
        }
      }
    }

    const deliveryFee = new Prisma.Decimal(0);
    const total = subtotal.add(deliveryFee);

    const order = await tx.order.create({
      data: {
        reference,
        customerName: input.customer.fullName,
        customerPhone: input.customer.phone,
        customerEmail: input.customer.email || null,
        governorate: input.shippingAddress.governorate,
        city: input.shippingAddress.city,
        addressLine: input.shippingAddress.addressLine,
        notes: input.notes,
        subtotal,
        deliveryFee,
        total,
        paymentMethod,
        paymentStatus: PaymentStatus.PENDING,
        status: OrderStatus.NEW,
        items: { createMany: { data: orderItems } }
      },
      include: orderInclude
    });

    return mapOrder(order);
  });
}

export async function getOrderConfirmation(reference: string) {
  const order = await prisma.order.findUnique({
    where: { reference },
    include: { items: true }
  });

  if (!order) return null;

  return {
    reference: order.reference,
    status: order.status,
    paymentStatus: order.paymentStatus,
    total: decimalToNumber(order.total),
    currency: order.currency,
    paymentMethod: order.paymentMethod,
    customerName: order.customerName,
    items: order.items.map((item) => ({
      productName: item.productName,
      variantName: item.variantName,
      quantity: item.quantity,
      lineTotal: decimalToNumber(item.lineTotal)
    }))
  };
}

export async function listAdminOrders(query: Record<string, any>) {
  const { page, limit, skip } = parsePagination(query);
  const where: Prisma.OrderWhereInput = {};

  if (query.status) where.status = query.status;
  if (query.paymentStatus) where.paymentStatus = query.paymentStatus;
  if (query.paymentMethod) where.paymentMethod = query.paymentMethod;
  if (query.search) {
    where.OR = [
      { reference: { contains: query.search, mode: "insensitive" } },
      { customerName: { contains: query.search, mode: "insensitive" } },
      { customerPhone: { contains: query.search, mode: "insensitive" } }
    ];
  }

  const [items, total] = await prisma.$transaction([
    prisma.order.findMany({ where, include: orderInclude, orderBy: { createdAt: "desc" }, skip, take: limit }),
    prisma.order.count({ where })
  ]);

  return { items: items.map(mapOrder), pagination: buildPagination(page, limit, total) };
}

export async function updateOrderStatus(id: string, status: OrderStatus) {
  return mapOrder(await prisma.order.update({ where: { id }, data: { status }, include: orderInclude }));
}

export async function updatePaymentStatus(id: string, paymentStatus: PaymentStatus) {
  return mapOrder(await prisma.order.update({ where: { id }, data: { paymentStatus }, include: orderInclude }));
}

export async function addOrderNote(orderId: string, adminUserId: string, note: string) {
  return prisma.orderNote.create({
    data: { orderId, adminUserId, note }
  });
}
