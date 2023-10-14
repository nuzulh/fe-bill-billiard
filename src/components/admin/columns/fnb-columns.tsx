import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib";
import { Fnb } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Beer, Sandwich, UtensilsCrossed } from "lucide-react";

export const fnbColumns = (
  nextAction: () => void
): ColumnDef<Fnb>[] => [
    {
      accessorKey: "image",
      header: "Gambar",
      cell: ({ row }) => {
        const categoryIdLang = {
          food: <Sandwich />,
          beverage: <Beer />,
          other: <UtensilsCrossed />,
        };
        return row.original.image ? (
          <div className="flex items-center justify-center">
            <Avatar className="h-10 w-10">
              <AvatarImage src={row.original.image} alt="img" />
              <AvatarFallback>
                {categoryIdLang[row.original.category]}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            {categoryIdLang[row.original.category]}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Nama Produk",
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Harga
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span>{formatCurrency(row.original.price)}</span>
        </div>
      ),
    },
    {
      accessorKey: "stock",
      header: "Stok",
    },
    {
      accessorKey: "category",
      header: "Kategori",
    },
    {
      accessorKey: "active",
      header: "Dipasarkan?",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.original.active ? (
            <span className="text-green-500">Ya</span>
          ) : (
            <span className="text-red-500">Tidak</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "id",
      header: "Aksi",
      cell: ({ row }) => (
        <Button onClick={nextAction}>
          Test {row.original.id}
        </Button>
      ),
    },
  ];
