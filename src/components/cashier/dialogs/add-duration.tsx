import { DialogContainer, Spinner } from "@/components";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { AddDurationSchema } from "@/lib";
import { Services } from "@/services";
import { Table } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TimerReset } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type AddDurationDialogProps = {
  table: Table;
  nextAction: () => void;
};

export default function AddDurationDialog({
  table,
  nextAction,
}: AddDurationDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof AddDurationSchema>>({
    resolver: zodResolver(AddDurationSchema),
    defaultValues: {
      customer_name: table.order?.costumer_name,
      duration: 1,
    }
  });

  async function onSubmit(val: z.infer<typeof AddDurationSchema>) {
    setLoading(true);
    const result = await Services.tableService.addDuration(
      table.id,
      val.duration,
    );
    setLoading(false);
    if (result.error) toast({
      title: "Gagal",
      description: result.message,
      variant: "destructive",
    });
    else {
      setIsOpen(false);
      form.reset();
      nextAction();
    }
  }

  return (
    <DialogContainer>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="flex gap-1 items-center">
            <TimerReset className="mr-2 h-4 w-4" />
            <span>Tambah Durasi</span>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[400px] sm:max-w-[425px] max-h-[80vh] overflow-y-auto overflow-x-hidden">
          <DialogHeader>
            <DialogTitle>Tambah Durasi</DialogTitle>
            <DialogDescription>
              Pastikan data yang diisi sudah benar
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="customer_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Kostumer</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama kostumer"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tambahan Durasi (/jam)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan durasi"
                          type="number"
                          {...field}
                          {...form.register("duration", {
                            setValueAs: (value) => Number(value) || "",
                            min: 1,
                          })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={loading} className="w-full mt-6" type="submit">
                {loading ? <Spinner /> : "Tambah Durasi"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DialogContainer>
  );
}
