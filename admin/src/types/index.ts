export type AdminRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "PRODUCT_MANAGER"
  | "CONTENT_MANAGER"
  | "ORDER_STAFF"
  | "STAFF";

export type AdminUser = {
  id: string;
  name?: string;
  email: string;
  role: AdminRole;
  isActive?: boolean;
};

export type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku?: string | null;
  brand?: { id: string; name: string; slug: string } | null;
  category?: { id: string; name: string; slug: string };
  price: number;
  originalPrice?: number | null;
  currency: "EGP";
  thumbnailUrl?: string | null;
  stockQuantity: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  discountBadge?: string | null;
  isActive?: boolean;
};

export type CatalogEntity = {
  id: string;
  name?: string;
  title?: string;
  slug: string;
  isActive?: boolean;
  displayOrder?: number;
  showInNavbar?: boolean;
  imageUrl?: string | null;
  logoUrl?: string | null;
  accent?: string | null;
};

export type Order = {
  id: string;
  reference: string;
  customerName: string;
  customerPhone: string;
  total: number;
  currency: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  items?: Array<{ productName: string; quantity: number; lineTotal: number }>;
};

export type DashboardSummary = {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  lowStockProducts: Product[];
  recentOrders: Order[];
};

export type Banner = {
  id: string;
  title: string;
  imageUrl: string;
  placement: string;
  isActive: boolean;
  displayOrder: number;
};

export type PolicyPage = {
  id: string;
  key: string;
  title: string;
  status: string;
  updatedAt: string;
};

export type CMSContent = {
  id: string;
  pageKey: string;
  title: string;
  contentJson: Record<string, unknown>;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  metaTitle?: string | null;
  metaDescription?: string | null;
  updatedAt: string;
};

export type SiteSettings = {
  id: string;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  socialLinksJson?: Record<string, string> | null;
};

export type ContactSettings = {
  id: string;
  email: string;
  phone: string;
  whatsapp?: string | null;
  address: string;
  mapLink?: string | null;
  socialsJson?: Record<string, string> | null;
};

export type PaymentSettings = {
  id: string;
  cashOnDeliveryEnabled: boolean;
  vodafoneCashEnabled: boolean;
  vodafoneCashNumber?: string | null;
  vodafoneCashInstructions?: string | null;
  cardEnabled: boolean;
};

export type MediaAsset = {
  id: string;
  url: string;
  filename: string;
  altText?: string | null;
  mimeType: string;
  sizeBytes: number;
  folder: string;
};
