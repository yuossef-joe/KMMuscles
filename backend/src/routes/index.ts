import { Router } from "express";
import { healthRouter } from "@/routes/health.routes";
import { publicRouter } from "@/routes/public";
import { adminRouter } from "@/routes/admin";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use(publicRouter);
apiRouter.use("/admin", adminRouter);
