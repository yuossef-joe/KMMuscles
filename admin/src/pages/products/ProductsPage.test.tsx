import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductsPage } from "@/pages/products/ProductsPage";
import { catalogApi, contentApi, productApi } from "@/lib/api";

vi.mock("@/lib/api", () => ({
  catalogApi: vi.fn(),
  contentApi: {
    uploadMedia: vi.fn()
  },
  productApi: {
    list: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    archive: vi.fn()
  }
}));

const mockedCatalogApi = vi.mocked(catalogApi);
const mockedContentApi = vi.mocked(contentApi);
const mockedProductApi = vi.mocked(productApi);

describe("products page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedProductApi.list.mockResolvedValue({ items: [], pagination: { page: 1, limit: 20, total: 0, pages: 0 } });
    mockedCatalogApi.mockReturnValue({
      list: vi.fn().mockResolvedValue([{ id: "category-1", name: "Protein", slug: "protein", isActive: true }]),
      create: vi.fn(),
      update: vi.fn(),
      archive: vi.fn()
    });
    mockedContentApi.uploadMedia.mockResolvedValue({
      id: "media-1",
      url: "/uploads/product.png",
      filename: "product.png",
      mimeType: "image/png",
      sizeBytes: 128,
      folder: "products"
    });
    mockedProductApi.create.mockResolvedValue({
      id: "product-1",
      name: "Whey Protein",
      slug: "whey-protein",
      sku: "WHEYPROT-ABC123",
      category: { id: "category-1", name: "Protein", slug: "protein" },
      price: 1200,
      currency: "EGP",
      stockQuantity: 10,
      thumbnailUrl: "/uploads/product.png"
    });
  });

  it("uploads a product image and lets the backend generate SKU on create", async () => {
    const user = userEvent.setup();
    render(<ProductsPage />);

    await user.click(await screen.findByRole("button", { name: /new product/i }));
    expect(screen.getByText(/auto-generated after save/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/name/i), "Whey Protein");
    await user.selectOptions(screen.getByLabelText(/category/i), "category-1");
    await user.clear(screen.getByLabelText(/price/i));
    await user.type(screen.getByLabelText(/price/i), "1200");
    await user.clear(screen.getByLabelText(/stock/i));
    await user.type(screen.getByLabelText(/stock/i), "10");
    await user.upload(screen.getByLabelText(/product image/i), new File(["image"], "product.png", { type: "image/png" }));
    await user.click(screen.getByRole("button", { name: /create product/i }));

    await waitFor(() => {
      expect(mockedContentApi.uploadMedia).toHaveBeenCalledWith(expect.any(File), "products", "Whey Protein");
      expect(mockedProductApi.create).toHaveBeenCalledWith(expect.objectContaining({
        sku: undefined,
        imageUrls: ["/uploads/product.png"],
        price: 1200,
        stockQuantity: 10
      }));
    });
  });
});
