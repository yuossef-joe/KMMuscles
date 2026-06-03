import { Router } from "express";
import { AdminRole } from "@prisma/client";
import { config } from "@/config";
import { prisma } from "@/config/database";
import { adminAuthMiddleware } from "@/middleware/admin-auth.middleware";
import { authRateLimit, uploadRateLimit } from "@/middleware/rate-limit.middleware";
import { requireRole } from "@/middleware/role.middleware";
import { upload } from "@/middleware/upload.middleware";
import { validate } from "@/middleware/validation.middleware";
import { refreshAdmin, loginAdmin } from "@/services/admin-auth.service";
import { createAdminUser, dashboardSummary, deleteAdminUser, listAdminUsers, updateAdminUser } from "@/services/admin.service";
import {
  archiveBrand,
  archiveCategory,
  archiveGoal,
  createBrand,
  createCategory,
  createGoal,
  listBrands,
  listCategories,
  listGoals,
  updateBrand,
  updateCategory,
  updateGoal
} from "@/services/catalog.service";
import { addOrderNote, listAdminOrders, updateOrderStatus, updatePaymentStatus } from "@/services/order.service";
import { archiveProduct, createProduct, listPublicProducts, mapProductDetail, updateProduct } from "@/services/product.service";
import { writeAuditLog } from "@/services/audit-log.service";
import { sendCreated, sendSuccess } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { ApiError } from "@/utils/api-error";
import { adminLoginSchema, adminUserBodySchema, adminUserUpdateSchema } from "@/validators/admin-auth.validator";
import {
  brandBodySchema,
  brandUpdateSchema,
  categoryBodySchema,
  categoryUpdateSchema,
  goalBodySchema,
  goalUpdateSchema
} from "@/validators/catalog.validator";
import {
  bannerBodySchema,
  bannerUpdateSchema,
  contactSettingsSchema,
  paymentSettingsSchema,
  policyBodySchema,
  siteSettingsSchema
} from "@/validators/content.validator";
import { idParamSchema, keyParamSchema } from "@/validators/common.validator";
import { orderListQuerySchema, orderNoteSchema, updateOrderStatusSchema, updatePaymentStatusSchema } from "@/validators/order.validator";
import { productBodySchema, productListQuerySchema, productUpdateSchema } from "@/validators/product.validator";

export const adminRouter = Router();

const contentRoles = [AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.CONTENT_MANAGER];
const productRoles = [AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.PRODUCT_MANAGER];
const orderRoles = [AdminRole.SUPER_ADMIN, AdminRole.ADMIN, AdminRole.ORDER_STAFF];
const userRoles = [AdminRole.SUPER_ADMIN, AdminRole.ADMIN];

function setRefreshCookie(res: any, refreshToken: string) {
  res.cookie(config.ADMIN_REFRESH_COOKIE_NAME, refreshToken, {
    httpOnly: true,
    secure: config.ADMIN_REFRESH_COOKIE_SECURE || config.isProduction,
    sameSite: "lax",
    path: "/api/admin/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}

adminRouter.post(
  "/auth/login",
  authRateLimit,
  validate({ body: adminLoginSchema }),
  asyncHandler(async (req, res) => {
    const result = await loginAdmin(req.body.email, req.body.password);
    setRefreshCookie(res, result.refreshToken);
    sendSuccess(res, { accessToken: result.accessToken, admin: result.admin });
  })
);

adminRouter.post(
  "/auth/refresh",
  asyncHandler(async (req, res) => {
    const result = await refreshAdmin(req.cookies?.[config.ADMIN_REFRESH_COOKIE_NAME]);
    sendSuccess(res, result);
  })
);

adminRouter.post("/auth/logout", (_req, res) => {
  res.clearCookie(config.ADMIN_REFRESH_COOKIE_NAME, { path: "/api/admin/auth" });
  sendSuccess(res, { loggedOut: true });
});

adminRouter.get(
  "/auth/me",
  adminAuthMiddleware,
  asyncHandler(async (req, res) => {
    sendSuccess(res, req.admin);
  })
);

adminRouter.use(adminAuthMiddleware);

adminRouter.get(
  "/dashboard",
  requireRole(...userRoles, AdminRole.ORDER_STAFF, AdminRole.PRODUCT_MANAGER, AdminRole.CONTENT_MANAGER),
  asyncHandler(async (_req, res) => {
    sendSuccess(res, await dashboardSummary());
  })
);

adminRouter.get(
  "/products",
  requireRole(...productRoles),
  validate({ query: productListQuerySchema }),
  asyncHandler(async (req, res) => {
    sendSuccess(res, await listPublicProducts({ ...req.query, isAdmin: true }));
  })
);

adminRouter.post(
  "/products",
  requireRole(...productRoles),
  validate({ body: productBodySchema }),
  asyncHandler(async (req, res) => {
    const product = await createProduct(req.body);
    await writeAuditLog({ adminUserId: req.admin?.id, action: "create", entityType: "Product", entityId: product.id });
    sendCreated(res, mapProductDetail(product));
  })
);

adminRouter.get(
  "/products/:id",
  requireRole(...productRoles),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res) => {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: { brand: true, category: true, images: true, variants: true, goals: { include: { goalCollection: true } } }
    });
    if (!product) throw new ApiError(404, "Product not found", "PRODUCT_NOT_FOUND");
    sendSuccess(res, mapProductDetail(product));
  })
);

adminRouter.patch(
  "/products/:id",
  requireRole(...productRoles),
  validate({ params: idParamSchema, body: productUpdateSchema }),
  asyncHandler(async (req, res) => {
    const product = await updateProduct(req.params.id, req.body);
    await writeAuditLog({ adminUserId: req.admin?.id, action: "update", entityType: "Product", entityId: product.id });
    sendSuccess(res, mapProductDetail(product));
  })
);

adminRouter.delete(
  "/products/:id",
  requireRole(...productRoles),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res) => {
    const product = await archiveProduct(req.params.id);
    await writeAuditLog({ adminUserId: req.admin?.id, action: "archive", entityType: "Product", entityId: product.id });
    sendSuccess(res, { archived: true });
  })
);

adminRouter.post(
  "/media",
  requireRole(...contentRoles, ...productRoles),
  uploadRateLimit,
  upload.single("file"),
  asyncHandler(async (req, res) => {
    if (!req.file) throw new ApiError(400, "Upload file is required", "UPLOAD_REQUIRED");
    const url = `${config.PUBLIC_UPLOAD_BASE_URL}/${req.file.filename}`;
    const asset = await prisma.mediaAsset.create({
      data: {
        url,
        filename: req.file.filename,
        altText: req.body.altText,
        mimeType: req.file.mimetype,
        sizeBytes: req.file.size,
        folder: req.body.folder ?? "general"
      }
    });
    await writeAuditLog({ adminUserId: req.admin?.id, action: "upload", entityType: "MediaAsset", entityId: asset.id });
    sendCreated(res, asset);
  })
);

adminRouter.get(
  "/media",
  requireRole(...contentRoles, ...productRoles),
  asyncHandler(async (_req, res) => {
    sendSuccess(res, await prisma.mediaAsset.findMany({ orderBy: { createdAt: "desc" } }));
  })
);

adminRouter.patch(
  "/media/:id",
  requireRole(...contentRoles, ...productRoles),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res) => {
    sendSuccess(res, await prisma.mediaAsset.update({ where: { id: req.params.id }, data: { altText: req.body.altText } }));
  })
);

adminRouter.delete(
  "/media/:id",
  requireRole(...contentRoles, ...productRoles),
  validate({ params: idParamSchema }),
  asyncHandler(async (req, res) => {
    await prisma.mediaAsset.delete({ where: { id: req.params.id } });
    sendSuccess(res, { deleted: true });
  })
);

adminRouter.get("/categories", requireRole(...productRoles, ...contentRoles), asyncHandler(async (_req, res) => sendSuccess(res, await listCategories(false))));
adminRouter.post("/categories", requireRole(...productRoles, ...contentRoles), validate({ body: categoryBodySchema }), asyncHandler(async (req, res) => sendCreated(res, await createCategory(req.body))));
adminRouter.patch("/categories/:id", requireRole(...productRoles, ...contentRoles), validate({ params: idParamSchema, body: categoryUpdateSchema }), asyncHandler(async (req, res) => sendSuccess(res, await updateCategory(req.params.id, req.body))));
adminRouter.delete("/categories/:id", requireRole(...productRoles, ...contentRoles), validate({ params: idParamSchema }), asyncHandler(async (req, res) => { await archiveCategory(req.params.id); sendSuccess(res, { archived: true }); }));

adminRouter.get("/brands", requireRole(...productRoles), asyncHandler(async (_req, res) => sendSuccess(res, await listBrands(false))));
adminRouter.post("/brands", requireRole(...productRoles), validate({ body: brandBodySchema }), asyncHandler(async (req, res) => sendCreated(res, await createBrand(req.body))));
adminRouter.patch("/brands/:id", requireRole(...productRoles), validate({ params: idParamSchema, body: brandUpdateSchema }), asyncHandler(async (req, res) => sendSuccess(res, await updateBrand(req.params.id, req.body))));
adminRouter.delete("/brands/:id", requireRole(...productRoles), validate({ params: idParamSchema }), asyncHandler(async (req, res) => { await archiveBrand(req.params.id); sendSuccess(res, { archived: true }); }));

adminRouter.get("/goals", requireRole(...productRoles, ...contentRoles), asyncHandler(async (_req, res) => sendSuccess(res, await listGoals(false))));
adminRouter.post("/goals", requireRole(...productRoles, ...contentRoles), validate({ body: goalBodySchema }), asyncHandler(async (req, res) => sendCreated(res, await createGoal(req.body))));
adminRouter.patch("/goals/:id", requireRole(...productRoles, ...contentRoles), validate({ params: idParamSchema, body: goalUpdateSchema }), asyncHandler(async (req, res) => sendSuccess(res, await updateGoal(req.params.id, req.body))));
adminRouter.delete("/goals/:id", requireRole(...productRoles, ...contentRoles), validate({ params: idParamSchema }), asyncHandler(async (req, res) => { await archiveGoal(req.params.id); sendSuccess(res, { archived: true }); }));

adminRouter.get("/banners", requireRole(...contentRoles), asyncHandler(async (_req, res) => sendSuccess(res, await prisma.banner.findMany({ orderBy: { createdAt: "desc" } }))));
adminRouter.post("/banners", requireRole(...contentRoles), validate({ body: bannerBodySchema }), asyncHandler(async (req, res) => sendCreated(res, await prisma.banner.create({ data: req.body }))));
adminRouter.patch("/banners/:id", requireRole(...contentRoles), validate({ params: idParamSchema, body: bannerUpdateSchema }), asyncHandler(async (req, res) => sendSuccess(res, await prisma.banner.update({ where: { id: req.params.id }, data: req.body }))));
adminRouter.delete("/banners/:id", requireRole(...contentRoles), validate({ params: idParamSchema }), asyncHandler(async (req, res) => { await prisma.banner.update({ where: { id: req.params.id }, data: { isActive: false } }); sendSuccess(res, { archived: true }); }));

adminRouter.get("/policies", requireRole(...contentRoles), asyncHandler(async (_req, res) => sendSuccess(res, await prisma.policyPage.findMany({ orderBy: { updatedAt: "desc" } }))));
adminRouter.put("/policies/:key", requireRole(...contentRoles), validate({ params: keyParamSchema, body: policyBodySchema }), asyncHandler(async (req, res) => sendSuccess(res, await prisma.policyPage.upsert({ where: { key: req.params.key }, update: req.body, create: { key: req.params.key, ...req.body } }))));

adminRouter.get("/settings/site", requireRole(...contentRoles), asyncHandler(async (_req, res) => sendSuccess(res, await prisma.siteSettings.findUnique({ where: { id: "site" } }))));
adminRouter.put("/settings/site", requireRole(...contentRoles), validate({ body: siteSettingsSchema }), asyncHandler(async (req, res) => sendSuccess(res, await prisma.siteSettings.upsert({ where: { id: "site" }, update: req.body, create: { id: "site", ...req.body } }))));
adminRouter.get("/settings/contact", requireRole(...contentRoles), asyncHandler(async (_req, res) => sendSuccess(res, await prisma.contactSettings.findUnique({ where: { id: "contact" } }))));
adminRouter.put("/settings/contact", requireRole(...contentRoles), validate({ body: contactSettingsSchema }), asyncHandler(async (req, res) => sendSuccess(res, await prisma.contactSettings.upsert({ where: { id: "contact" }, update: req.body, create: { id: "contact", ...req.body } }))));
adminRouter.get("/settings/payments", requireRole(...contentRoles), asyncHandler(async (_req, res) => sendSuccess(res, await prisma.paymentSettings.findUnique({ where: { id: "payments" } }))));
adminRouter.put("/settings/payments", requireRole(...contentRoles), validate({ body: paymentSettingsSchema }), asyncHandler(async (req, res) => sendSuccess(res, await prisma.paymentSettings.upsert({ where: { id: "payments" }, update: req.body, create: { id: "payments", ...req.body } }))));

adminRouter.get("/orders", requireRole(...orderRoles), validate({ query: orderListQuerySchema }), asyncHandler(async (req, res) => sendSuccess(res, await listAdminOrders(req.query))));
adminRouter.get("/orders/:id", requireRole(...orderRoles), validate({ params: idParamSchema }), asyncHandler(async (req, res) => {
  const order = await prisma.order.findUnique({ where: { id: req.params.id }, include: { items: true, adminNotes: true } });
  if (!order) throw new ApiError(404, "Order not found", "ORDER_NOT_FOUND");
  sendSuccess(res, order);
}));
adminRouter.patch("/orders/:id/status", requireRole(...orderRoles), validate({ params: idParamSchema, body: updateOrderStatusSchema }), asyncHandler(async (req, res) => sendSuccess(res, await updateOrderStatus(req.params.id, req.body.status))));
adminRouter.patch("/orders/:id/payment-status", requireRole(...orderRoles), validate({ params: idParamSchema, body: updatePaymentStatusSchema }), asyncHandler(async (req, res) => sendSuccess(res, await updatePaymentStatus(req.params.id, req.body.paymentStatus))));
adminRouter.post("/orders/:id/notes", requireRole(...orderRoles), validate({ params: idParamSchema, body: orderNoteSchema }), asyncHandler(async (req, res) => sendCreated(res, await addOrderNote(req.params.id, req.admin!.id, req.body.note))));

adminRouter.get("/users", requireRole(...userRoles), asyncHandler(async (_req, res) => sendSuccess(res, await listAdminUsers())));
adminRouter.post("/users", requireRole(...userRoles), validate({ body: adminUserBodySchema.required({ password: true }) }), asyncHandler(async (req, res) => sendCreated(res, await createAdminUser(req.body))));
adminRouter.patch("/users/:id", requireRole(...userRoles), validate({ params: idParamSchema, body: adminUserUpdateSchema }), asyncHandler(async (req, res) => sendSuccess(res, await updateAdminUser(req.params.id, req.body))));
adminRouter.delete("/users/:id", requireRole(...userRoles), validate({ params: idParamSchema }), asyncHandler(async (req, res) => { await deleteAdminUser(req.params.id); sendSuccess(res, { archived: true }); }));
