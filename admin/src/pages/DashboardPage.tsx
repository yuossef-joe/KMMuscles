import { AlertTriangle, Banknote, CheckCircle2, Clock, PackageSearch, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DataTable } from "@/components/common/DataTable";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";
import { PageHeader } from "@/components/common/PageHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { dashboardApi } from "@/lib/api";
import { formatCurrency, formatDate } from "@/lib/format";
import type { DashboardSummary, Order } from "@/types";

const fallbackChart = [
  { day: "Mon", orders: 8 },
  { day: "Tue", orders: 12 },
  { day: "Wed", orders: 9 },
  { day: "Thu", orders: 15 },
  { day: "Fri", orders: 18 },
  { day: "Sat", orders: 11 },
  { day: "Sun", orders: 14 }
];

function Stat({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-bold text-zinc-500">{label}</p>
        <div className="grid h-10 w-10 place-items-center rounded-md bg-gym-red/10 text-gym-red">{icon}</div>
      </div>
      <p className="mt-4 text-3xl font-black text-zinc-950">{value}</p>
    </div>
  );
}

export function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    dashboardApi.summary().then(setSummary).catch((caught) => setError(caught instanceof Error ? caught.message : "Failed to load dashboard"));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!summary) return <LoadingState />;

  return (
    <>
      <PageHeader eyebrow="Overview" title="Dashboard" description="Order activity, revenue, and catalog risks." />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Stat icon={<ShoppingBag size={20} />} label="Total orders" value={summary.totalOrders} />
        <Stat icon={<Clock size={20} />} label="Pending" value={summary.pendingOrders} />
        <Stat icon={<CheckCircle2 size={20} />} label="Delivered" value={summary.deliveredOrders} />
        <Stat icon={<AlertTriangle size={20} />} label="Cancelled" value={summary.cancelledOrders} />
        <Stat icon={<Banknote size={20} />} label="Revenue" value={formatCurrency(summary.totalRevenue)} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-black text-zinc-950">Orders trend</h2>
            <span className="text-xs font-bold text-zinc-400">Sample week</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer height="100%" width="100%">
              <AreaChart data={fallbackChart}>
                <defs>
                  <linearGradient id="orders" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#E21B2D" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#E21B2D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#E4E4E7" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#71717A" />
                <YAxis stroke="#71717A" />
                <Tooltip />
                <Area dataKey="orders" fill="url(#orders)" stroke="#E21B2D" strokeWidth={3} type="monotone" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-lg border border-zinc-200 bg-white p-5">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-black text-zinc-950">
            <PackageSearch size={20} className="text-gym-red" />
            Low stock
          </h2>
          <div className="grid gap-3">
            {summary.lowStockProducts.length ? (
              summary.lowStockProducts.map((product) => (
                <div className="flex items-center justify-between rounded-md bg-zinc-50 p-3" key={product.id}>
                  <div>
                    <p className="font-bold text-zinc-950">{product.name}</p>
                    <p className="text-xs text-zinc-500">{product.sku}</p>
                  </div>
                  <StatusBadge value={product.stockQuantity <= 0 ? "out" : "low"} />
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500">No low-stock products.</p>
            )}
          </div>
        </section>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-black text-zinc-950">Recent orders</h2>
        <DataTable<Order>
          columns={[
            { key: "reference", header: "Reference", render: (row) => <span className="font-black text-zinc-950">{row.reference}</span> },
            { key: "customer", header: "Customer", render: (row) => row.customerName },
            { key: "status", header: "Status", render: (row) => <StatusBadge value={row.status} /> },
            { key: "payment", header: "Payment", render: (row) => <StatusBadge value={row.paymentStatus} /> },
            { key: "total", header: "Total", render: (row) => formatCurrency(row.total, row.currency) },
            { key: "created", header: "Created", render: (row) => formatDate(row.createdAt) }
          ]}
          getRowKey={(row) => row.id}
          rows={summary.recentOrders}
        />
      </section>
    </>
  );
}
