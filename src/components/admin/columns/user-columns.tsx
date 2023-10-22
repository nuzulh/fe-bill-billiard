import { formatDate } from "@/lib";
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { AdminDialogs } from "..";

export const userColumns = (
  nextAction: () => void
): ColumnDef<User>[] => [
    {
      accessorKey: "name",
      header: "Nama",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "created_at",
      header: "Tanggal didaftarkan",
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      accessorKey: "id",
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-3">
          <AdminDialogs.EditUserDialog
            user={row.original}
            nextAction={nextAction}
          />
          <AdminDialogs.DeleteUserDialog
            user={row.original}
            nextAction={nextAction}
          />
        </div>
      ),
    },
  ];
