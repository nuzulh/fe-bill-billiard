import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatCurrency, formatDuration, onDownload, onPrint } from "@/lib";
import { Order } from "@/types";
import { Download, FileText, Printer } from "lucide-react";
import React from "react";

type InvoiceDialogProps = {
  order: Order;
};

export default function InvoiceDialog({
  order,
}: InvoiceDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FileText className="mr-2 h-4 w-4" />
          <span>Lihat Invoice</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invoice</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm">Nama Pelanggan:</p>
            <p className="text-sm font-semibold">{order.costumer_name}</p>
          </div>
          <hr />
          {order.table && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm">Meja:</p>
                <p className="text-sm font-semibold">{order.table}</p>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <p className="text-sm">Durasi:</p>
                <p className="text-sm font-semibold">{formatDuration(order.duration)}</p>
              </div>
              <hr />
            </>
          )}
          {order.order_items.length > 0 && order.order_items.map((x) => (
            <div className="flex justify-between items-center" key={x.id}>
              <p className="text-sm">{`${x.fnb}`}:</p>
              <p className="text-sm font-semibold">{x.quantity}x</p>
            </div>
          ))}
          <hr />
          <p className="text-sm">Catatan:</p>
          <em className="text-sm">{order.note ?? "-"}</em>
          <hr />
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold">Harga:</p>
            <p className="text-sm font-bold">{formatCurrency(order.price)}</p>
          </div>
          <hr />
        </div>
        <DialogFooter>
          <Button onClick={() => onPrint(order)}>
            <Printer className="mr-2 h-4 w-4" />
            <span>Cetak</span>
          </Button>
          <Button onClick={() => onDownload(order)}>
            <Download className="mr-2 h-4 w-4" />
            <span>Unduh</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
