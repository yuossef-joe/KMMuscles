import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { DataTable } from "@/components/common/DataTable";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { contentApi } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { AdminUser, Banner, MediaAsset, PolicyPage } from "@/types";

type SimpleListPageProps = {
  type: "banners" | "policies" | "media" | "users";
  title: string;
  description: string;
};

type Row = Banner | PolicyPage | MediaAsset | AdminUser;

export function SimpleListPage({ type, title, description }: SimpleListPageProps) {
  const [rows, setRows] = useState<Row[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setIsLoading(true);
    setError("");
    try {
      const result = await contentApi[type]();
      setRows(result as Row[]);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : `Failed to load ${type}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [type]);

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title={title}
        description={description}
        actions={
          <Button icon={<RefreshCw size={16} />} onClick={load} variant="secondary">
            Refresh
          </Button>
        }
      />
      {error ? <ErrorState message={error} /> : isLoading ? <LoadingState /> : (
        <DataTable<Row>
          columns={[
            {
              key: "name",
              header: "Name",
              render: (row) => {
                if ("title" in row) return <span className="font-black text-zinc-950">{row.title}</span>;
                if ("filename" in row) return <span className="font-black text-zinc-950">{row.filename}</span>;
                return <span className="font-black text-zinc-950">{row.name ?? row.email}</span>;
              }
            },
            {
              key: "meta",
              header: "Meta",
              render: (row) => {
                if ("placement" in row) return row.placement;
                if ("status" in row) return <StatusBadge value={row.status} />;
                if ("folder" in row) return row.folder;
                return row.role;
              }
            },
            {
              key: "state",
              header: "State",
              render: (row) => {
                if ("isActive" in row) return <StatusBadge value={row.isActive ? "active" : "inactive"} />;
                if ("updatedAt" in row) return formatDate(row.updatedAt);
                return "-";
              }
            }
          ]}
          getRowKey={(row) => row.id}
          rows={rows}
        />
      )}
    </>
  );
}
