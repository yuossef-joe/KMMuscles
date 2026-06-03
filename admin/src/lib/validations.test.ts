import { describe, expect, it } from "vitest";
import { loginSchema, safeUrlSchema } from "@/lib/validations";

describe("admin validations", () => {
  it("accepts a valid login payload", () => {
    expect(loginSchema.parse({ email: "admin@kmmuscles.com", password: "ChangeMe123!" })).toEqual({
      email: "admin@kmmuscles.com",
      password: "ChangeMe123!"
    });
  });

  it("rejects unsafe URL protocols", () => {
    expect(() => safeUrlSchema.parse("javascript:alert(1)")).toThrow();
    expect(() => safeUrlSchema.parse("data:text/html,hello")).toThrow();
    expect(() => safeUrlSchema.parse("file:///etc/passwd")).toThrow();
  });
});
