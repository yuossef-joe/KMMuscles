import { prisma } from "@/config/database";

function formatCairoDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Cairo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .format(date)
    .replaceAll("-", "");
}

export async function generateOrderReference() {
  const datePart = formatCairoDate();
  const dayStart = new Date();
  dayStart.setUTCHours(0, 0, 0, 0);

  const count = await prisma.order.count({
    where: {
      reference: {
        startsWith: `KM-${datePart}`
      }
    }
  });

  return `KM-${datePart}-${String(count + 1).padStart(4, "0")}`;
}
