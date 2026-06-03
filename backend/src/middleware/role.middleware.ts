import type { AdminRole } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { ApiError } from "@/utils/api-error";

export function requireRole(...roles: AdminRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.admin) {
      return next(new ApiError(401, "Admin authentication is required", "AUTH_REQUIRED"));
    }

    if (!roles.includes(req.admin.role)) {
      return next(new ApiError(403, "You do not have permission to perform this action", "FORBIDDEN"));
    }

    next();
  };
}
