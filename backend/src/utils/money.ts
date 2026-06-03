import { Prisma } from "@prisma/client";

export function toDecimal(value: number | string | Prisma.Decimal) {
  return new Prisma.Decimal(value);
}

export function decimalToNumber(value: Prisma.Decimal | null | undefined) {
  return value ? Number(value.toFixed(2)) : null;
}
