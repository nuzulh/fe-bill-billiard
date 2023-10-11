import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib";
import { Table } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const tableColumns: ColumnDef<Table>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.getValue("price") as number;

      return (
        <div className="flex items-center justify-center">
          <span>{formatCurrency(price)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "device_id",
    header: "Device ID",
  },
  {
    accessorKey: "active",
    header: "Bisa Digunakan?",
    cell: ({ row }) => {
      const active = row.getValue("active") as boolean;

      return (
        <div className="flex items-center justify-center">
          <span>{active ? "Bisa" : "Tidak Bisa"}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Aksi",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;

      return (
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={() => {
              console.log("id", id);
            }}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              console.log("id", id);
            }}
          >
            Hapus
          </Button>
        </div>
      );
    },
  },
];
