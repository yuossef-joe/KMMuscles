import { Router } from "express";
import { checkoutRateLimit } from "@/middleware/rate-limit.middleware";
import { validate } from "@/middleware/validation.middleware";
import { getBrand, getCategory, getGoal, listBrands, listCategories, listGoals, mapBrand, mapBrandDetail, mapCategory, mapCategoryDetail, mapGoal, mapGoalDetail } from "@/services/catalog.service";
import { getBanners, getContactSettings, getHomeContent, getPolicy, getSiteSettings } from "@/services/content.service";
import { createOrder, getOrderConfirmation } from "@/services/order.service";
import { getPublicProductBySlug, getRelatedProducts, listPublicProducts } from "@/services/product.service";
import { ApiError } from "@/utils/api-error";
import { sendCreated, sendSuccess } from "@/utils/api-response";
import { asyncHandler } from "@/utils/async-handler";
import { keyParamSchema, slugParamSchema } from "@/validators/common.validator";
import { createOrderSchema } from "@/validators/order.validator";
import { productListQuerySchema, relatedQuerySchema } from "@/validators/product.validator";

export const publicRouter = Router();

publicRouter.get(
  "/products",
  validate({ query: productListQuerySchema }),
  asyncHandler(async (req, res) => {
    sendSuccess(res, await listPublicProducts(req.query));
  })
);

publicRouter.get(
  "/products/:slug/related",
  validate({ params: slugParamSchema, query: relatedQuerySchema }),
  asyncHandler(async (req, res) => {
    sendSuccess(res, await getRelatedProducts(req.params.slug, Number(req.query.limit ?? 4)));
  })
);

publicRouter.get(
  "/products/:slug",
  validate({ params: slugParamSchema }),
  asyncHandler(async (req, res) => {
    const product = await getPublicProductBySlug(req.params.slug);
    if (!product) throw new ApiError(404, "Product not found", "PRODUCT_NOT_FOUND");
    sendSuccess(res, product);
  })
);

publicRouter.get(
  "/categories",
  asyncHandler(async (_req, res) => {
    sendSuccess(res, (await listCategories(true)).map(mapCategory));
  })
);

publicRouter.get(
  "/categories/:slug",
  validate({ params: slugParamSchema }),
  asyncHandler(async (req, res) => {
    const category = await getCategory(req.params.slug);
    if (!category) throw new ApiError(404, "Category not found", "CATEGORY_NOT_FOUND");
    sendSuccess(res, mapCategoryDetail(category));
  })
);

publicRouter.get(
  "/brands",
  asyncHandler(async (_req, res) => {
    sendSuccess(res, (await listBrands(true)).map(mapBrand));
  })
);

publicRouter.get(
  "/brands/:slug",
  validate({ params: slugParamSchema }),
  asyncHandler(async (req, res) => {
    const brand = await getBrand(req.params.slug);
    if (!brand) throw new ApiError(404, "Brand not found", "BRAND_NOT_FOUND");
    sendSuccess(res, mapBrandDetail(brand));
  })
);

publicRouter.get(
  "/goals",
  asyncHandler(async (_req, res) => {
    sendSuccess(res, (await listGoals(true)).map(mapGoal));
  })
);

publicRouter.get(
  "/goals/:slug",
  validate({ params: slugParamSchema }),
  asyncHandler(async (req, res) => {
    const goal = await getGoal(req.params.slug);
    if (!goal) throw new ApiError(404, "Goal not found", "GOAL_NOT_FOUND");
    sendSuccess(res, mapGoalDetail(goal));
  })
);

publicRouter.get(
  "/content/home",
  asyncHandler(async (_req, res) => {
    sendSuccess(res, await getHomeContent());
  })
);

publicRouter.get(
  "/banners",
  asyncHandler(async (_req, res) => {
    sendSuccess(res, await getBanners());
  })
);

publicRouter.get(
  "/policies/:key",
  validate({ params: keyParamSchema }),
  asyncHandler(async (req, res) => {
    const policy = await getPolicy(req.params.key);
    if (!policy) throw new ApiError(404, "Policy not found", "POLICY_NOT_FOUND");
    sendSuccess(res, policy);
  })
);

publicRouter.get(
  "/settings/site",
  asyncHandler(async (_req, res) => {
    sendSuccess(res, await getSiteSettings());
  })
);

publicRouter.get(
  "/settings/contact",
  asyncHandler(async (_req, res) => {
    sendSuccess(res, await getContactSettings());
  })
);

publicRouter.post(
  "/orders",
  checkoutRateLimit,
  validate({ body: createOrderSchema }),
  asyncHandler(async (req, res) => {
    sendCreated(res, await createOrder(req.body));
  })
);

publicRouter.get(
  "/order-confirmation/:reference",
  asyncHandler(async (req, res) => {
    const order = await getOrderConfirmation(req.params.reference);
    if (!order) throw new ApiError(404, "Order confirmation not found", "ORDER_NOT_FOUND");
    sendSuccess(res, order);
  })
);
