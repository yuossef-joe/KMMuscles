import { Pencil, Plus, RefreshCw, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { DataTable } from "@/components/common/DataTable";
import { ErrorState } from "@/components/common/ErrorState";
import { FormField, inputClass } from "@/components/common/FormField";
import { LoadingState } from "@/components/common/LoadingState";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { catalogApi } from "@/lib/api";
import type { CatalogEntity } from "@/types";

type CatalogPageProps = {
  kind: "categories" | "brands" | "goals";
  title: string;
  description: string;
};

export function CatalogPage({ kind, title, description }: CatalogPageProps) {
  const api = catalogApi(kind);
  const [rows, setRows] = useState<CatalogEntity[]>([]);
  const [form, setForm] = useState({ label: "", slug: "", displayOrder: 0, isActive: true });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function load() {
    setIsLoading(true);
    setError("");
    try {
      setRows(await api.list());
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : `Failed to load ${kind}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    closeForm();
    load();
  }, [kind]);

  function closeForm() {
    setForm({ label: "", slug: "", displayOrder: 0, isActive: true });
    setEditingId(null);
    setIsCreating(false);
  }

  function startCreate() {
    setEditingId(null);
    setForm({ label: "", slug: "", displayOrder: 0, isActive: true });
    setIsCreating((value) => !value);
  }

  function startEdit(row: CatalogEntity) {
    setIsCreating(false);
    setEditingId(row.id);
    setForm({
      label: row.name ?? row.title ?? "",
      slug: row.slug,
      displayOrder: row.displayOrder ?? 0,
      isActive: row.isActive !== false
    });
  }

  function payload() {
    return {
      ...(kind === "goals" ? { title: form.label } : { name: form.label }),
      ...(form.slug ? { slug: form.slug } : {}),
      ...(kind === "brands" ? {} : { displayOrder: Number(form.displayOrder) }),
      isActive: form.isActive
    };
  }

  async function save(event: React.FormEvent) {
    event.preventDefault();
    const targetId = editingId ?? "new";
    setError("");
    setSavingId(targetId);
    try {
      if (editingId) {
        await api.update(editingId, payload());
      } else {
        await api.create(payload());
      }
      closeForm();
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : `Failed to save ${kind}`);
    } finally {
      setSavingId(null);
    }
  }

  async function archive(id: string) {
    const label = kind === "goals" ? "goal" : kind.slice(0, -1);
    if (!window.confirm(`Delete this ${label} from the storefront?`)) return;

    setError("");
    setSavingId(id);
    try {
      await api.archive(id);
      if (editingId === id) closeForm();
      await load();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : `Failed to delete ${label}`);
    } finally {
      setSavingId(null);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Catalog"
        title={title}
        description={description}
        actions={
          <>
            <Button icon={<RefreshCw size={16} />} onClick={load} variant="secondary">
              Refresh
            </Button>
            <Button icon={<Plus size={16} />} onClick={startCreate}>
              Add
            </Button>
          </>
        }
      />

      {isCreating || editingId ? (
        <form className="mb-6 grid gap-4 rounded-lg border border-zinc-200 bg-white p-5 md:grid-cols-4" onSubmit={save}>
          <div className="flex items-center justify-between md:col-span-4">
            <h2 className="text-base font-black text-zinc-950">{editingId ? `Update ${title.toLowerCase()}` : `Add ${title.toLowerCase()}`}</h2>
            <Button aria-label="Close form" icon={<X size={16} />} onClick={closeForm} type="button" variant="ghost" />
          </div>
          <div>
            <FormField label={kind === "goals" ? "Title" : "Name"}>
              <input className={inputClass} value={form.label} onChange={(event) => setForm({ ...form, label: event.target.value })} required />
            </FormField>
          </div>
          <FormField label="Slug">
            <input className={inputClass} placeholder="Generated when blank" value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} />
          </FormField>
          {kind !== "brands" ? (
            <FormField label="Display order">
              <input className={inputClass} min={0} type="number" value={form.displayOrder} onChange={(event) => setForm({ ...form, displayOrder: Number(event.target.value) })} />
            </FormField>
          ) : <div />}
          <label className="flex h-10 items-center gap-2 self-end text-sm font-bold text-zinc-700">
            <input checked={form.isActive} onChange={(event) => setForm({ ...form, isActive: event.target.checked })} type="checkbox" />
            Active
          </label>
          <div className="md:col-span-4">
            <Button isLoading={savingId === (editingId ?? "new")} type="submit">{editingId ? "Save changes" : "Create"}</Button>
          </div>
        </form>
      ) : null}

      {error ? <ErrorState message={error} /> : isLoading ? <LoadingState /> : (
        <DataTable<CatalogEntity>
          columns={[
            { key: "name", header: "Name", render: (row) => <span className="font-black text-zinc-950">{row.name ?? row.title}</span> },
            { key: "slug", header: "Slug", render: (row) => row.slug },
            { key: "order", header: "Order", render: (row) => row.displayOrder ?? 0 },
            { key: "state", header: "State", render: (row) => <StatusBadge value={row.isActive === false ? "inactive" : "active"} /> },
            {
              key: "actions",
              header: "Actions",
              render: (row) => (
                <div className="flex items-center gap-1">
                  <Button icon={<Pencil size={15} />} onClick={() => startEdit(row)} variant="ghost">
                    Edit
                  </Button>
                  <Button
                    className="text-error hover:text-red-700"
                    icon={<Trash2 size={15} />}
                    isLoading={savingId === row.id}
                    onClick={() => archive(row.id)}
                    variant="ghost"
                  >
                    Delete
                  </Button>
                </div>
              )
            }
          ]}
          getRowKey={(row) => row.id}
          rows={rows}
        />
      )}
    </>
  );
}
