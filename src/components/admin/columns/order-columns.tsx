import { formatCurrency, formatDate } from "@/lib";
import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const orderColumns = (
  // nextAction: () => void
): ColumnDef<Order>[] => [
    {
      accessorKey: "created_at",
      header: "Tanggal",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span>
            {formatDate(new Date(row.original.created_at))}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "costumer_name",
      header: "Nama Pelanggan",
    },
    {
      accessorKey: "duration",
      header: "Durasi",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span>
            {row.original.table ? `${row.original.duration} Jam` : "-"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "table",
      header: "Meja",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span>{row.original.table ?? "-"}</span>
        </div>
      ),
    },
    {
      accessorKey: "paid",
      header: "Dibayar?",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span>{row.original.paid ? "Ya" : "Belum"}</span>
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Harga",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span>{formatCurrency(row.original.price)}</span>
        </div>
      ),
    },
    {
      accessorKey: "note",
      header: "Catatan",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span>{row.original.note ?? "-"}</span>
        </div>
      ),
    },
  ];
