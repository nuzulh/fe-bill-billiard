import { Spinner } from "@/components";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { Table } from "@/types";
import React from "react";

type DeleteTableDialogProps = {
  table: Table;
  nextAction: () => void;
};

export default function DeleteTableDialog({
  table,
  nextAction,
}: DeleteTableDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function onDelete() {
    setLoading(true);
    const result = await Services.tableService.delete(table.id);
    toast({
      title: result.error ? "Gagal" : "Berhasil",
      description: result.message ?? "Meja berhasil dihapus",
      variant: result.error ? "destructive" : "default",
    });
    if (!result.error) {
      setLoading(false);
      nextAction();
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger className={buttonVariants({ variant: "outline" })}>
        Hapus
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah anda yakin ingin menghapus{" "}
            <span className="font-extrabold underline">{table.name}</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Aksi ini akan menghapus data secara permanen, data yang telah
            dihapus tidak bisa di kembalikan lagi!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-end">
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>
            {loading ? <Spinner /> : "Hapus"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
