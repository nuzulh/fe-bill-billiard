import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Fnb } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Beer, Sandwich, UtensilsCrossed } from "lucide-react";

export const fnbColumns: ColumnDef<Fnb>[] = [
  {
    accessorKey: "image",
    header: "Gambar",
    cell: ({ row }) => {
      const image = row.getValue("image") as string | null;
      const category = row.getValue("category") as "food" | "beverage" | "other";
      const categoryIdLang = {
        food: <Sandwich />,
        beverage: <Beer />,
        other: <UtensilsCrossed />,
      };
      return image ? (
        <div className="flex items-center justify-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={image} alt="img" />
            <AvatarFallback>{categoryIdLang[category]}</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="flex items-center justify-center">{categoryIdLang[category]}</div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nama Produk",
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
    cell: ({ row }) => {
      const active = row.getValue("active") as boolean;
      return (
        <div className="flex items-center justify-center">
          {active ? (
            <span className="text-green-500">Ya</span>
          ) : (
            <span className="text-red-500">Tidak</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Aksi",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      console.log(id);
      return <Button>Test</Button>;
    },
  },
];
