import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "created_at",
    header: "Tanggal",
    cell: ({ row }) => {
      const createdAt = row.getValue("created_at") as string;
      return (
        <div className="flex items-center justify-center">
          <span>
            {new Intl.DateTimeFormat("id-ID", {
              dateStyle: "full",
            }).format(new Date(createdAt))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "costumer_name",
    header: "Nama Pelanggan",
  },
  {
    accessorKey: "duration",
    header: "Durasi",
    cell: ({ row }) => {
      const duration = row.getValue("duration") as number | null;
      const table = row.getValue("table") as string;
      return (
        <div className="flex items-center justify-center">
          <span>{table ? `${duration} Jam` : "-"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "table",
    header: "Meja",
    cell: ({ row }) => {
      const table = row.getValue("table") as string;
      return (
        <div className="flex items-center justify-center">
          <span>{table ? table : "-"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "paid",
    header: "Dibayar?",
    cell: ({ row }) => {
      const paid = row.getValue("paid") as boolean;
      return (
        <div className="flex items-center justify-center">
          <span>{paid ? "Ya" : "Belum"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price);

      return (
        <div className="flex items-center justify-center">
          <span>{formatted}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "note",
    header: "Catatan",
    cell: ({ row }) => {
      const note = row.getValue("note") as string;
      return (
        <div className="flex items-center justify-center">
          <span>{note ? note : "-"}</span>
        </div>
      );
    },
  },
];
