import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { App } from "@/App";

vi.mock("@/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/lib/api")>("@/lib/api");
  return {
    ...actual,
    authApi: {
      refresh: vi.fn().mockRejectedValue(new Error("no session")),
      login: vi.fn(),
      logout: vi.fn()
    }
  };
});

describe("admin app routing", () => {
  it("renders the login page", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(await screen.findByRole("heading", { name: /sign in/i })).toBeInTheDocument();
  });
});
