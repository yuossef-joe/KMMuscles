import jwt, { type SignOptions } from "jsonwebtoken";
import { config } from "@/config";
import type { AdminRole } from "@prisma/client";

export type AdminTokenPayload = {
  sub: string;
  email: string;
  role: AdminRole;
  type: "admin_access" | "admin_refresh";
};

function sign(payload: AdminTokenPayload, secret: string, expiresIn: string) {
  return jwt.sign(payload, secret, { expiresIn } as SignOptions);
}

export function signAdminAccessToken(payload: Omit<AdminTokenPayload, "type">) {
  return sign({ ...payload, type: "admin_access" }, config.JWT_ADMIN_SECRET, config.JWT_ADMIN_EXPIRY);
}

export function signAdminRefreshToken(payload: Omit<AdminTokenPayload, "type">) {
  return sign(
    { ...payload, type: "admin_refresh" },
    config.JWT_ADMIN_REFRESH_SECRET,
    config.JWT_ADMIN_REFRESH_EXPIRY
  );
}

export function verifyAdminAccessToken(token: string) {
  return jwt.verify(token, config.JWT_ADMIN_SECRET) as AdminTokenPayload;
}

export function verifyAdminRefreshToken(token: string) {
  return jwt.verify(token, config.JWT_ADMIN_REFRESH_SECRET) as AdminTokenPayload;
}
