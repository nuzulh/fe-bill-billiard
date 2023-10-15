import { Spinner } from "@/components";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { Fnb } from "@/types";
import React from "react";

type DeleteFnbDialogProps = {
  fnb: Fnb;
  nextAction: () => void;
};

export default function DeleteFnbDialog({
  fnb,
  nextAction,
}: DeleteFnbDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function onDelete() {
    setLoading(true);
    const result = await Services.fnbService.delete(fnb.id);
    setLoading(false);
    toast({
      title: result.error ? "Gagal" : "Berhasil",
      description: result.message ?? "Produk berhasil dihapus",
      variant: result.error ? "destructive" : "default",
    });
    if (!result.error) {
      setIsOpen(false);
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
            <span className="font-extrabold underline">{fnb.name}</span>
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
