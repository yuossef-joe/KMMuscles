import { AdminRole } from "@prisma/client";
import { prisma } from "@/config/database";
import { hashPassword } from "@/utils/hash";

export async function dashboardSummary() {
  const [totalOrders, pendingOrders, deliveredOrders, cancelledOrders, lowStockProducts, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "NEW" } }),
      prisma.order.count({ where: { status: "DELIVERED" } }),
      prisma.order.count({ where: { status: "CANCELLED" } }),
      prisma.product.findMany({ where: { stockQuantity: { lte: 5 }, isActive: true }, take: 10 }),
      prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 8, include: { items: true } })
    ]);

  const revenue = await prisma.order.aggregate({
    _sum: { total: true },
    where: { status: "DELIVERED" }
  });

  return {
    totalOrders,
    pendingOrders,
    deliveredOrders,
    cancelledOrders,
    totalRevenue: revenue._sum.total ? Number(revenue._sum.total.toFixed(2)) : 0,
    lowStockProducts,
    recentOrders
  };
}

export async function listAdminUsers() {
  return prisma.adminUser.findMany({
    select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true, updatedAt: true },
    orderBy: { createdAt: "desc" }
  });
}

export async function createAdminUser(input: any) {
  return prisma.adminUser.create({
    data: {
      name: input.name,
      email: input.email,
      role: input.role as AdminRole,
      isActive: input.isActive ?? true,
      passwordHash: await hashPassword(input.password ?? "ChangeMe123!")
    },
    select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true }
  });
}

export async function updateAdminUser(id: string, input: any) {
  const data = { ...input };
  if (input.password) {
    data.passwordHash = await hashPassword(input.password);
    delete data.password;
  }

  return prisma.adminUser.update({
    where: { id },
    data,
    select: { id: true, name: true, email: true, role: true, isActive: true, updatedAt: true }
  });
}

export async function deleteAdminUser(id: string) {
  return prisma.adminUser.update({ where: { id }, data: { isActive: false } });
}
