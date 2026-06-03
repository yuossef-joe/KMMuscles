import type {
  AdminUser,
  ApiEnvelope,
  Banner,
  CatalogEntity,
  DashboardSummary,
  MediaAsset,
  Order,
  Pagination,
  PolicyPage,
  Product
} from "@/types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function getAccessToken() {
  return accessToken;
}

export class ApiError extends Error {
  code: string;
  status: number;
  details?: unknown;

  constructor(message: string, code: string, status: number, details?: unknown) {
    super(message);
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

type RequestOptions = RequestInit & {
  auth?: boolean;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  const headers = new Headers(options.headers);
  const isFormData = options.body instanceof FormData;

  if (!isFormData && options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth !== false && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: "include"
  });

  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok || !payload?.success) {
    throw new ApiError(
      payload?.error?.message ?? "Request failed",
      payload?.error?.code ?? "REQUEST_FAILED",
      response.status,
      payload?.error?.details
    );
  }

  return payload.data;
}

export const authApi = {
  login: (body: { email: string; password: string }) =>
    apiRequest<{ accessToken: string; admin: AdminUser }>("/admin/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
      auth: false
    }),
  refresh: () => apiRequest<{ accessToken: string; admin: AdminUser }>("/admin/auth/refresh", { method: "POST", auth: false }),
  me: () => apiRequest<AdminUser>("/admin/auth/me"),
  logout: () => apiRequest<{ loggedOut: boolean }>("/admin/auth/logout", { method: "POST", auth: false })
};

export const dashboardApi = {
  summary: () => apiRequest<DashboardSummary>("/admin/dashboard")
};

export const productApi = {
  list: (query = "") => apiRequest<{ items: Product[]; pagination: Pagination }>(`/admin/products${query}`),
  create: (body: Record<string, unknown>) => apiRequest<Product>("/admin/products", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: Record<string, unknown>) =>
    apiRequest<Product>(`/admin/products/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  archive: (id: string) => apiRequest<{ archived: boolean }>(`/admin/products/${id}`, { method: "DELETE" })
};

export function catalogApi(kind: "categories" | "brands" | "goals") {
  return {
    list: () => apiRequest<CatalogEntity[]>(`/admin/${kind}`),
    create: (body: Record<string, unknown>) => apiRequest<CatalogEntity>(`/admin/${kind}`, { method: "POST", body: JSON.stringify(body) }),
    update: (id: string, body: Record<string, unknown>) =>
      apiRequest<CatalogEntity>(`/admin/${kind}/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    archive: (id: string) => apiRequest<{ archived: boolean }>(`/admin/${kind}/${id}`, { method: "DELETE" })
  };
}

export const orderApi = {
  list: (query = "") => apiRequest<{ items: Order[]; pagination: Pagination }>(`/admin/orders${query}`),
  updateStatus: (id: string, status: string) =>
    apiRequest<Order>(`/admin/orders/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  updatePayment: (id: string, paymentStatus: string) =>
    apiRequest<Order>(`/admin/orders/${id}/payment-status`, { method: "PATCH", body: JSON.stringify({ paymentStatus }) }),
  addNote: (id: string, note: string) =>
    apiRequest(`/admin/orders/${id}/notes`, { method: "POST", body: JSON.stringify({ note }) })
};

export const contentApi = {
  banners: () => apiRequest<Banner[]>("/admin/banners"),
  policies: () => apiRequest<PolicyPage[]>("/admin/policies"),
  siteSettings: () => apiRequest<Record<string, unknown> | null>("/admin/settings/site"),
  contactSettings: () => apiRequest<Record<string, unknown> | null>("/admin/settings/contact"),
  paymentSettings: () => apiRequest<Record<string, unknown> | null>("/admin/settings/payments"),
  users: () => apiRequest<AdminUser[]>("/admin/users"),
  media: () => apiRequest<MediaAsset[]>("/admin/media")
};
