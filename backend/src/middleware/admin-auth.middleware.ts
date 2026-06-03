import type { NextFunction, Request, Response } from "express";
import { prisma } from "@/config/database";
import { ApiError } from "@/utils/api-error";
import { verifyAdminAccessToken } from "@/utils/token";

export async function adminAuthMiddleware(req: Request, _res: Response, next: NextFunction) {
  const header = req.header("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return next(new ApiError(401, "Admin access token is required", "AUTH_REQUIRED"));
  }

  const payload = verifyAdminAccessToken(token);

  if (payload.type !== "admin_access") {
    return next(new ApiError(401, "Invalid admin access token", "INVALID_TOKEN_TYPE"));
  }

  const admin = await prisma.adminUser.findUnique({
    where: { id: payload.sub },
    select: { id: true, email: true, role: true, isActive: true }
  });

  if (!admin || !admin.isActive) {
    return next(new ApiError(401, "Admin account is not active", "ADMIN_INACTIVE"));
  }

  req.admin = {
    id: admin.id,
    email: admin.email,
    role: admin.role
  };

  next();
}
