import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(5000),
  API_BASE_URL: z.string().url().default("http://localhost:5000"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_ADMIN_SECRET: z.string().min(24, "JWT_ADMIN_SECRET must be at least 24 characters"),
  JWT_ADMIN_EXPIRY: z.string().default("15m"),
  JWT_ADMIN_REFRESH_SECRET: z.string().min(24, "JWT_ADMIN_REFRESH_SECRET must be at least 24 characters"),
  JWT_ADMIN_REFRESH_EXPIRY: z.string().default("7d"),
  CORS_ORIGINS: z.string().default("http://localhost:3000,http://localhost:3001"),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(900000),
  RATE_LIMIT_MAX_REQUESTS: z.coerce.number().int().positive().default(100),
  ADMIN_REFRESH_COOKIE_NAME: z.string().default("km_admin_refresh"),
  ADMIN_REFRESH_COOKIE_SECURE: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  UPLOAD_DIR: z.string().default("uploads"),
  MAX_UPLOAD_SIZE_MB: z.coerce.number().positive().default(5),
  STORAGE_DRIVER: z.enum(["local", "cloudinary"]).default("local"),
  PUBLIC_UPLOAD_BASE_URL: z.string().url().default("http://localhost:5000/uploads"),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM_NAME: z.string().default("KMMuscles"),
  SMTP_FROM_EMAIL: z.string().email().default("noreply@kmmuscles.com"),
  STAFF_NOTIFICATION_EMAIL: z.string().email().default("info@kmmuscles.com")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
  throw new Error(`Invalid environment configuration: ${issues}`);
}

export const config = {
  ...parsed.data,
  corsOrigins: parsed.data.CORS_ORIGINS.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  maxUploadSizeBytes: parsed.data.MAX_UPLOAD_SIZE_MB * 1024 * 1024,
  isProduction: parsed.data.NODE_ENV === "production"
};

export type AppConfig = typeof config;
