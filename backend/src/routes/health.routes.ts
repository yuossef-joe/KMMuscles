import { Router } from "express";
import { sendSuccess } from "@/utils/api-response";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  sendSuccess(res, {
    status: "ok",
    service: "kmmuscles-backend",
    timestamp: new Date().toISOString()
  });
});
