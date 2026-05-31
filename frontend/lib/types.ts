export type Category = {
  name: string;
  slug: string;
  image?: string;
};

export type Brand = {
  name: string;
  slug: string;
};

export type Goal = {
  title: string;
  slug: string;
  image: string;
  accent: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand: Brand;
  category: Category;
  goals: string[];
  price: number;
  originalPrice?: number;
  currency: "EGP";
  image: string;
  stockQuantity: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  discountBadge?: string;
  description: string;
  benefits: string[];
  howToUse: string;
  nutritionFacts: Record<string, string>;
  variants: string[];
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  variant?: string;
  quantity: number;
};

export type CheckoutPayload = {
  fullName: string;
  phone: string;
  email?: string;
  governorate: string;
  city: string;
  addressLine: string;
  paymentMethod: "cash_on_delivery" | "vodafone_cash" | "card";
  notes?: string;
};
