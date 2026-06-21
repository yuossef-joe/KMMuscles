import { Pencil, Plus, RefreshCw, Search, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { DataTable } from "@/components/common/DataTable";
import { ErrorState } from "@/components/common/ErrorState";
import { FormField, inputClass } from "@/components/common/FormField";
import { LoadingState } from "@/components/common/LoadingState";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { catalogApi, productApi } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import type { CatalogEntity, Product } from "@/types";

type ProductForm = {
  name: string;
  sku: string;
  categoryId: string;
  price: number;
  stockQuantity: number;
};

const emptyProduct: ProductForm = {
  name: "",
  sku: "",
  categoryId: "",
  price: 0,
  stockQuantity: 0
};

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CatalogEntity[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const query = useMemo(() => (search ? `?search=${encodeURIComponent(search)}` : ""), [search]);

  async function load() {
    setIsLoading(true);
    setError("");
    try {
      const [response, categoryRows] = await Promise.all([productApi.list(query), catalogApi("categories").list()]);
      setProducts(response.items);
      setCategories(categoryRows.filter((category) => category.isActive !== false));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [query]);

  async function createProduct(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSavingId("new");
    try {
      await productApi.create({
        ...form,
        ...(form.sku ? { sku: form.sku } : { sku: undefined }),
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity),
        benefits: [],
        nutritionFacts: {},
        goalIds: []
      });
      setForm(emptyProduct);
      setIsCreating(false);
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to create product");
    } finally {
      setSavingId(null);
    }
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyProduct);
    setIsCreating((value) => !value);
  }

  function startEdit(product: Product) {
    setIsCreating(false);
    setEditingId(product.id);
    setForm({
      name: product.name,
      sku: product.sku ?? "",
      categoryId: product.category?.id ?? "",
      price: product.price,
      stockQuantity: product.stockQuantity
    });
  }

  function closeForm() {
    setForm(emptyProduct);
    setEditingId(null);
    setIsCreating(false);
  }

  async function updateProduct(event: React.FormEvent) {
    event.preventDefault();
    if (!editingId) return;

    setError("");
    setSavingId(editingId);
    try {
      await productApi.update(editingId, {
        ...form,
        ...(form.sku ? { sku: form.sku } : { sku: undefined }),
        price: Number(form.price),
        stockQuantity: Number(form.stockQuantity)
      });
      closeForm();
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to update product");
    } finally {
      setSavingId(null);
    }
  }

  async function archiveProduct(id: string) {
    if (!window.confirm("Delete this product from the storefront? Existing order records will be kept.")) return;

    setError("");
    setSavingId(id);
    try {
      await productApi.archive(id);
      if (editingId === id) closeForm();
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to delete product");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Catalog"
        title="Products"
        description="Manage pricing, stock, badges, SEO fields, and active product availability."
        actions={
          <>
            <Button icon={<RefreshCw size={16} />} onClick={load} variant="secondary">
              Refresh
            </Button>
            <Button icon={<Plus size={16} />} onClick={startCreate}>
              New product
            </Button>
          </>
        }
      />

      <div className="mb-4 flex max-w-lg items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3">
        <Search size={18} className="text-zinc-400" />
        <input
          className="h-11 flex-1 bg-transparent text-sm outline-none"
          placeholder="Search products, SKU, or description"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {isCreating || editingId ? (
        <form
          className="mb-6 grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 md:grid-cols-5"
          onSubmit={editingId ? updateProduct : createProduct}
        >
          <div className="flex items-center justify-between md:col-span-5">
            <h2 className="text-base font-black text-zinc-950">{editingId ? "Update product" : "New product"}</h2>
            <Button aria-label="Close form" icon={<X size={16} />} onClick={closeForm} type="button" variant="ghost" />
          </div>
          <FormField label="Name">
            <input className={inputClass} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </FormField>
          <FormField label="SKU">
            <input className={inputClass} value={form.sku} onChange={(event) => setForm({ ...form, sku: event.target.value })} />
          </FormField>
          <FormField label="Category">
            <select className={inputClass} value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })} required>
              <option value="">Select category</option>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </FormField>
          <FormField label="Price">
            <input className={inputClass} min={1} type="number" value={form.price} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} required />
          </FormField>
          <FormField label="Stock">
            <input className={inputClass} min={0} type="number" value={form.stockQuantity} onChange={(event) => setForm({ ...form, stockQuantity: Number(event.target.value) })} required />
          </FormField>
          <div className="md:col-span-5">
            <Button isLoading={savingId === (editingId ?? "new")} type="submit">
              {editingId ? "Save changes" : "Create product"}
            </Button>
          </div>
        </form>
      ) : null}

      {error ? <ErrorState message={error} /> : isLoading ? <LoadingState /> : (
        <DataTable<Product>
          columns={[
            {
              key: "product",
              header: "Product",
              render: (row) => (
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center overflow-hidden rounded-md bg-zinc-100">
                    {row.thumbnailUrl ? <img src={row.thumbnailUrl} alt="" className="h-full w-full object-contain" /> : null}
                  </div>
                  <div>
                    <p className="font-black text-zinc-950">{row.name}</p>
                    <p className="text-xs text-zinc-500">{row.sku}</p>
                  </div>
                </div>
              )
            },
            { key: "category", header: "Category", render: (row) => row.category?.name ?? "-" },
            { key: "price", header: "Price", render: (row) => formatCurrency(row.price, row.currency) },
            { key: "stock", header: "Stock", render: (row) => <StatusBadge value={row.stockQuantity <= 0 ? "out" : row.stockQuantity <= 5 ? "low" : "active"} /> },
            {
              key: "actions",
              header: "Actions",
              render: (row) => (
                <div className="flex items-center gap-1">
                  <Button icon={<Pencil size={15} />} onClick={() => startEdit(row)} variant="ghost">
                    Edit
                  </Button>
                  <Button
                    icon={<Trash2 size={15} />}
                    isLoading={savingId === row.id}
                    onClick={() => archiveProduct(row.id)}
                    className="text-error hover:text-red-700"
                    variant="ghost"
                  >
                    Delete
                  </Button>
                </div>
              )
            }
          ]}
          getRowKey={(row) => row.id}
          rows={products}
        />
      )}
    </>
  );
}
