import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import path from "path";
import { config } from "@/config";
import { corsOptions } from "@/config/cors";
import { errorMiddleware, notFoundMiddleware } from "@/middleware/error.middleware";
import { publicRateLimit } from "@/middleware/rate-limit.middleware";
import { requestLogger } from "@/middleware/request-logger.middleware";
import { apiRouter } from "@/routes";

export function createApp() {
  const app = express();

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));

  if (config.NODE_ENV !== "test") {
    app.use(requestLogger);
  }

  app.use(publicRateLimit);
  app.use("/uploads", express.static(path.resolve(process.cwd(), config.UPLOAD_DIR)));
  app.use("/api", apiRouter);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
