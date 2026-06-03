/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { authApi, setAccessToken } from "@/lib/api";
import type { AdminUser } from "@/types";

type AuthContextValue = {
  admin: AdminUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (...roles: string[]) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authApi
      .refresh()
      .then((result) => {
        setAccessToken(result.accessToken);
        setAdmin(result.admin);
      })
      .catch(() => {
        setAccessToken(null);
        setAdmin(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const result = await authApi.login({ email, password });
    setAccessToken(result.accessToken);
    setAdmin(result.admin);
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => undefined);
    setAccessToken(null);
    setAdmin(null);
  }, []);

  const hasRole = useCallback(
    (...roles: string[]) => {
      if (!admin) return false;
      if (admin.role === "SUPER_ADMIN" || admin.role === "ADMIN") return true;
      return roles.includes(admin.role);
    },
    [admin]
  );

  const value = useMemo(() => ({ admin, isLoading, login, logout, hasRole }), [admin, hasRole, isLoading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
