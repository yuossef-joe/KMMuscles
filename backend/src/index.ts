import { config } from "@/config";
import { prisma } from "@/config/database";
import { createApp } from "@/app";
import { logger } from "@/utils/logger";

async function bootstrap() {
  await prisma.$connect();

  const app = createApp();
  const server = app.listen(config.PORT, () => {
    logger.info(`KMMuscles API listening on port ${config.PORT}`);
  });

  async function shutdown(signal: string) {
    logger.info(`Received ${signal}, shutting down`);
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  }

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

bootstrap().catch((error) => {
  logger.error("Failed to start API", error);
  process.exit(1);
});
