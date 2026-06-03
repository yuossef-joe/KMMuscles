import { RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/common/Button";
import { DataTable } from "@/components/common/DataTable";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { orderApi } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import type { Order } from "@/types";

const orderStatuses = ["NEW", "CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED", "CANCELLED", "RETURNED"];
const paymentStatuses = ["PENDING", "PAID", "FAILED", "REFUNDED"];

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setIsLoading(true);
    setError("");
    const query = statusFilter ? `?status=${statusFilter}` : "";
    try {
      const response = await orderApi.list(query);
      setOrders(response.items);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [statusFilter]);

  async function updateStatus(id: string, status: string) {
    await orderApi.updateStatus(id, status);
    await load();
  }

  async function updatePayment(id: string, paymentStatus: string) {
    await orderApi.updatePayment(id, paymentStatus);
    await load();
  }

  return (
    <>
      <PageHeader
        eyebrow="Orders"
        title="Order management"
        description="Review orders, update fulfillment state, and confirm manual payments."
        actions={
          <Button icon={<RefreshCw size={16} />} onClick={load} variant="secondary">
            Refresh
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <select className="focus-ring h-10 rounded-md border border-zinc-200 bg-white px-3 text-sm" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="">All statuses</option>
          {orderStatuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {error ? <ErrorState message={error} /> : isLoading ? <LoadingState /> : (
        <DataTable<Order>
          columns={[
            { key: "reference", header: "Reference", render: (row) => <span className="font-black text-zinc-950">{row.reference}</span> },
            { key: "customer", header: "Customer", render: (row) => <div><p className="font-bold text-zinc-950">{row.customerName}</p><p className="text-xs text-zinc-500">{row.customerPhone}</p></div> },
            { key: "status", header: "Status", render: (row) => <StatusBadge value={row.status} /> },
            { key: "payment", header: "Payment", render: (row) => <StatusBadge value={row.paymentStatus} /> },
            { key: "total", header: "Total", render: (row) => formatCurrency(row.total, row.currency) },
            { key: "created", header: "Created", render: (row) => formatDate(row.createdAt) },
            {
              key: "actions",
              header: "Actions",
              render: (row) => (
                <div className="flex gap-2">
                  <select className="focus-ring h-9 rounded-md border border-zinc-200 bg-white px-2 text-xs" value={row.status} onChange={(event) => updateStatus(row.id, event.target.value)}>
                    {orderStatuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                  <select className="focus-ring h-9 rounded-md border border-zinc-200 bg-white px-2 text-xs" value={row.paymentStatus} onChange={(event) => updatePayment(row.id, event.target.value)}>
                    {paymentStatuses.map((status) => <option key={status}>{status}</option>)}
                  </select>
                </div>
              )
            }
          ]}
          getRowKey={(row) => row.id}
          rows={orders}
        />
      )}
    </>
  );
}
