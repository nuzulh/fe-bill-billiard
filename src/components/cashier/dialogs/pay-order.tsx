import { Spinner } from "@/components";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { PayOrderSchema, formatCurrency, formatDuration, onPrint } from "@/lib";
import { Services } from "@/services";
import { Order } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Printer } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type PayOrderDialogProps = {
  order: Order;
  nextAction: () => void;
};

export default function PayOrderDialog({
  order,
  nextAction,
}: PayOrderDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof PayOrderSchema>>({
    resolver: zodResolver(PayOrderSchema),
  });

  async function onSubmit(val: z.infer<typeof PayOrderSchema>) {
    setLoading(true);
    const result = await Services.orderService.patchNote(order.id, val.note);
    setLoading(false);
    toast({
      title: result.error ? "Gagal" : "Berhasil",
      description: result.message ?? "Bayar orderan berhasil",
      variant: result.error ? "destructive" : "default",
    });
    if (!result.error) {
      setIsOpen(false);
      onPrint(order);
      nextAction();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Printer className="mr-2 h-4 w-4" />
          <span>Bayar & Cetak</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bayar</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm">Nama Pelanggan:</p>
            <p className="text-sm font-semibold">{order.costumer_name}</p>
          </div>
          {order.table && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm">Meja:</p>
                <p className="text-sm font-semibold">{order.table}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm">Durasi:</p>
                <p className="text-sm font-semibold">{formatDuration(order.duration)}</p>
              </div>
            </>
          )}
          {order.order_items.length > 0 && order.order_items.map((x) => (
            <div className="flex justify-between items-center" key={x.id}>
              <p className="text-sm">{`${x.fnb}`}:</p>
              <p className="text-sm font-semibold">{x.quantity}x</p>
            </div>
          ))}
          <hr />
          <div className="flex justify-between items-center">
            <p className="text-sm font-semibold">Harga:</p>
            <p className="text-sm font-bold">{formatCurrency(order.price)}</p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Catatan tambahan"
                        className="resize-none mt-5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="w-full mt-6" type="submit">
              {loading ? <Spinner /> : "Bayar dan Cetak"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
