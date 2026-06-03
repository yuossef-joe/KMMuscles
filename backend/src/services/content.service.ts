import { BannerPlacement, ContentStatus } from "@prisma/client";
import { prisma } from "@/config/database";
import { listCategories, listGoals, mapCategory, mapGoal } from "@/services/catalog.service";
import { listPublicProducts } from "@/services/product.service";

export async function getHomeContent() {
  const [content, goals, banners, bestSellers, contact, site] = await Promise.all([
    prisma.cMSContent.findUnique({ where: { pageKey: "home" } }),
    listGoals(true),
    prisma.banner.findMany({
      where: {
        placement: { in: [BannerPlacement.HOME_HERO, BannerPlacement.HOME_PROMO] },
        isActive: true,
        OR: [{ startsAt: null }, { startsAt: { lte: new Date() } }],
        AND: [{ OR: [{ endsAt: null }, { endsAt: { gte: new Date() } }] }]
      },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }]
    }),
    listPublicProducts({ bestSeller: true, limit: 8 }),
    prisma.contactSettings.findUnique({ where: { id: "contact" } }),
    prisma.siteSettings.findUnique({ where: { id: "site" } })
  ]);

  return {
    content: content?.contentJson ?? null,
    goals: goals.map(mapGoal),
    banners,
    bestSellers: bestSellers.items,
    contact,
    site
  };
}

export async function getBanners(placement?: BannerPlacement) {
  return prisma.banner.findMany({
    where: {
      isActive: true,
      placement,
      OR: [{ startsAt: null }, { startsAt: { lte: new Date() } }],
      AND: [{ OR: [{ endsAt: null }, { endsAt: { gte: new Date() } }] }]
    },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }]
  });
}

export async function getPolicy(key: string) {
  return prisma.policyPage.findFirst({ where: { key, status: ContentStatus.PUBLISHED } });
}

export async function getSiteSettings() {
  const [site, payments] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "site" } }),
    prisma.paymentSettings.findUnique({ where: { id: "payments" } })
  ]);
  return { ...site, paymentMethods: payments };
}

export async function getContactSettings() {
  return prisma.contactSettings.findUnique({ where: { id: "contact" } });
}

export async function getNavbarCategories() {
  const categories = await listCategories(true);
  return categories.filter((category) => category.showInNavbar).map(mapCategory);
}
