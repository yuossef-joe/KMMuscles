import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";
import { ApiError } from "@/utils/api-error";
import { logger } from "@/utils/logger";

export function notFoundMiddleware(req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`, "NOT_FOUND"));
}

export function errorMiddleware(error: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request data",
        details: error.flatten()
      }
    });
  }

  if (error instanceof TokenExpiredError || error instanceof JsonWebTokenError) {
    return res.status(401).json({
      success: false,
      error: {
        code: "INVALID_TOKEN",
        message: "Authentication token is invalid or expired"
      }
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        error: {
          code: "DUPLICATE_VALUE",
          message: "A unique field already exists",
          details: error.meta
        }
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Requested record was not found"
        }
      });
    }
  }

  logger.error("Unhandled API error", error);

  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "Something went wrong"
    }
  });
}
