import { adminLoginSchema } from "@/validators/admin-auth.validator";
import { createOrderSchema } from "@/validators/order.validator";
import { productBodySchema, productListQuerySchema } from "@/validators/product.validator";

describe("validators", () => {
  it("accepts valid product filter query values", () => {
    const parsed = productListQuerySchema.parse({
      search: "whey",
      category: "protein",
      inStock: "true",
      bestSeller: "false",
      sort: "price_asc",
      page: "1",
      limit: "12"
    });

    expect(parsed.inStock).toBe(true);
    expect(parsed.bestSeller).toBe(false);
    expect(parsed.limit).toBe(12);
  });

  it("rejects invalid Egyptian phone numbers at checkout", () => {
    expect(() =>
      createOrderSchema.parse({
        customer: { fullName: "Test Customer", phone: "123", email: "customer@example.com" },
        shippingAddress: { governorate: "Luxor", city: "Luxor", addressLine: "Street address" },
        paymentMethod: "cash_on_delivery",
        items: [{ productId: "7ad21895-b355-4bd5-a006-e365a221c57b", quantity: 1 }]
      })
    ).toThrow();
  });

  it("rejects unsupported payment methods", () => {
    expect(() =>
      createOrderSchema.parse({
        customer: { fullName: "Test Customer", phone: "+201159500155" },
        shippingAddress: { governorate: "Luxor", city: "Luxor", addressLine: "Street address" },
        paymentMethod: "card",
        items: [{ productId: "7ad21895-b355-4bd5-a006-e365a221c57b", quantity: 1 }]
      })
    ).toThrow();
  });

  it("rejects weak admin login payloads", () => {
    expect(() => adminLoginSchema.parse({ email: "not-email", password: "short" })).toThrow();
  });

  it("rejects invalid product create payloads", () => {
    expect(() =>
      productBodySchema.parse({
        name: "A",
        categoryId: "bad-id",
        price: -1
      })
    ).toThrow();
  });
});
