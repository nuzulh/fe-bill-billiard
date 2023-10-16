import { useCountdown } from "@/hooks";
import { formatCurrency, formatDuration, formatTime } from "@/lib";
import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { CashierDialogs } from "..";

export const orderColumns = (
  nextAction: () => void
): ColumnDef<Order>[] => [
    {
      accessorKey: "created_at",
      header: "Waktu Mulai",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span>
            {formatTime(new Date(row.original.created_at))}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "costumer_name",
      header: "Nama Pelanggan",
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
      accessorKey: "duration",
      header: "Durasi",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span>
            {row.original.table ? formatDuration(row.original.duration) : "-"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "created_by",
      header: "Berlangsung?",
      cell: ({ row }) => {
        const { status } = useCountdown(
          row.original.created_at,
          row.original.duration
        );

        return (
          <div
            className={
              status === "active"
                ? "text-green-500"
                : status === "emergency"
                  ? "text-amber-500"
                  : "text-red-500"
            }
          >
            {status !== "inactive" ? "Ya" : "Tidak"}
          </div>
        );
      },
    },
    {
      accessorKey: "paid",
      header: "Dibayar?",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.original.paid ? (
            <span className="text-green-500">Sudah</span>
          ) : (
            <span className="text-red-500">Belum</span>
          )}
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
      accessorKey: "id",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.original.paid ? (
            <CashierDialogs.InvoiceDialog order={row.original} />
          ) : (
            <CashierDialogs.PayOrderDialog
              order={row.original}
              nextAction={nextAction}
            />
          )}
        </div>
      ),
    },
  ];
