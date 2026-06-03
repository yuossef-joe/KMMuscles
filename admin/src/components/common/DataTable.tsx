import { ArrowUpDown } from "lucide-react";
import clsx from "clsx";

export type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string;
  emptyText?: string;
};

export function DataTable<T>({ columns, rows, getRowKey, emptyText = "No records found." }: DataTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="min-w-full divide-y divide-zinc-200 text-left text-sm">
          <thead className="bg-zinc-50 text-xs font-black uppercase text-zinc-500">
            <tr>
              {columns.map((column) => (
                <th className={clsx("whitespace-nowrap px-4 py-3", column.className)} key={column.key}>
                  <span className="inline-flex items-center gap-1">
                    {column.header}
                    <ArrowUpDown size={13} className="text-zinc-300" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {rows.length ? (
              rows.map((row) => (
                <tr className="transition hover:bg-zinc-50" key={getRowKey(row)}>
                  {columns.map((column) => (
                    <td className={clsx("whitespace-nowrap px-4 py-3 text-zinc-700", column.className)} key={column.key}>
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-10 text-center text-zinc-500" colSpan={columns.length}>
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
