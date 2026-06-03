process.env.NODE_ENV = "test";
process.env.DATABASE_URL = process.env.DATABASE_URL ?? "postgresql://user:password@localhost:5432/kmmuscles_test";
process.env.JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET ?? "test-admin-access-secret-with-length";
process.env.JWT_ADMIN_REFRESH_SECRET = process.env.JWT_ADMIN_REFRESH_SECRET ?? "test-admin-refresh-secret-with-length";
process.env.CORS_ORIGINS = process.env.CORS_ORIGINS ?? "http://localhost:3000";
