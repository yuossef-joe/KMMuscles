import type { Prisma } from "@prisma/client";
import { prisma } from "@/config/database";

export async function writeAuditLog(input: {
  adminUserId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Prisma.InputJsonValue;
}) {
  await prisma.auditLog.create({
    data: input
  });
}
