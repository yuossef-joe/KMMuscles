import { Archive, Plus, RefreshCw } from "lucide-react";
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
  const [name, setName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
    load();
  }, [kind]);

  async function create(event: React.FormEvent) {
    event.preventDefault();
    await api.create(kind === "goals" ? { title: name } : { name });
    setName("");
    setIsCreating(false);
    await load();
  }

  async function archive(id: string) {
    await api.archive(id);
    await load();
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
            <Button icon={<Plus size={16} />} onClick={() => setIsCreating((value) => !value)}>
              Add
            </Button>
          </>
        }
      />

      {isCreating ? (
        <form className="mb-6 flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-5 sm:flex-row sm:items-end" onSubmit={create}>
          <div className="flex-1">
            <FormField label={kind === "goals" ? "Title" : "Name"}>
              <input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} required />
            </FormField>
          </div>
          <Button type="submit">Save</Button>
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
                <Button icon={<Archive size={15} />} onClick={() => archive(row.id)} variant="ghost">
                  Archive
                </Button>
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
