import { Archive, Plus, RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/common/Button";
import { DataTable } from "@/components/common/DataTable";
import { ErrorState } from "@/components/common/ErrorState";
import { FormField, inputClass } from "@/components/common/FormField";
import { LoadingState } from "@/components/common/LoadingState";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { productApi } from "@/lib/api";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types";

const emptyProduct = {
  name: "",
  sku: "",
  categoryId: "",
  price: 0,
  stockQuantity: 0
};

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyProduct);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const query = useMemo(() => (search ? `?search=${encodeURIComponent(search)}` : ""), [search]);

  async function load() {
    setIsLoading(true);
    setError("");
    try {
      const response = await productApi.list(query);
      setProducts(response.items);
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
    try {
      await productApi.create({
        ...form,
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
    }
  }

  async function archiveProduct(id: string) {
    await productApi.archive(id);
    await load();
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
            <Button icon={<Plus size={16} />} onClick={() => setIsCreating((value) => !value)}>
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

      {isCreating ? (
        <form className="mb-6 grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 md:grid-cols-5" onSubmit={createProduct}>
          <FormField label="Name">
            <input className={inputClass} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          </FormField>
          <FormField label="SKU">
            <input className={inputClass} value={form.sku} onChange={(event) => setForm({ ...form, sku: event.target.value })} />
          </FormField>
          <FormField label="Category ID">
            <input className={inputClass} value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })} required />
          </FormField>
          <FormField label="Price">
            <input className={inputClass} min={1} type="number" value={form.price} onChange={(event) => setForm({ ...form, price: Number(event.target.value) })} required />
          </FormField>
          <FormField label="Stock">
            <input className={inputClass} min={0} type="number" value={form.stockQuantity} onChange={(event) => setForm({ ...form, stockQuantity: Number(event.target.value) })} required />
          </FormField>
          <div className="md:col-span-5">
            <Button type="submit">Create product</Button>
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
                <Button icon={<Archive size={15} />} onClick={() => archiveProduct(row.id)} variant="ghost">
                  Archive
                </Button>
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
