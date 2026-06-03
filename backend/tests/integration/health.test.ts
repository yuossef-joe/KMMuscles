import request from "supertest";
import { createApp } from "@/app";

describe("GET /api/health", () => {
  it("returns API health status", async () => {
    const response = await request(createApp()).get("/api/health").expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe("ok");
    expect(response.body.data.service).toBe("kmmuscles-backend");
  });
});
