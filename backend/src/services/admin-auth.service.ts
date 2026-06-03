import { prisma } from "@/config/database";
import { ApiError } from "@/utils/api-error";
import { verifyPassword } from "@/utils/hash";
import { signAdminAccessToken, signAdminRefreshToken, verifyAdminRefreshToken } from "@/utils/token";

export async function loginAdmin(email: string, password: string) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });

  if (!admin || !admin.isActive) {
    throw new ApiError(401, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  const passwordMatches = await verifyPassword(password, admin.passwordHash);
  if (!passwordMatches) {
    throw new ApiError(401, "Invalid email or password", "INVALID_CREDENTIALS");
  }

  const payload = { sub: admin.id, email: admin.email, role: admin.role };
  return {
    accessToken: signAdminAccessToken(payload),
    refreshToken: signAdminRefreshToken(payload),
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }
  };
}

export async function refreshAdmin(refreshToken: string | undefined) {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token is required", "REFRESH_REQUIRED");
  }

  const payload = verifyAdminRefreshToken(refreshToken);
  if (payload.type !== "admin_refresh") {
    throw new ApiError(401, "Invalid refresh token", "INVALID_TOKEN_TYPE");
  }

  const admin = await prisma.adminUser.findUnique({
    where: { id: payload.sub },
    select: { id: true, name: true, email: true, role: true, isActive: true }
  });

  if (!admin || !admin.isActive) {
    throw new ApiError(401, "Admin account is not active", "ADMIN_INACTIVE");
  }

  return {
    accessToken: signAdminAccessToken({ sub: admin.id, email: admin.email, role: admin.role }),
    admin
  };
}
