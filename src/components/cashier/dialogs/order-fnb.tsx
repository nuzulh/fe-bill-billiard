import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Check, Salad, Trash } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Fnb } from "@/types";
import { Button } from "@/components/ui/button";
import { DialogContainer, Spinner } from "@/components";
import { OrderFnbSchema, cn, formatCurrency } from "@/lib";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Services } from "@/services";
import { toast } from "@/components/ui/use-toast";

type OrderFnbDialogProps = {
  fnbs: Fnb[],
  nextAction: () => void;
};

export default function OrderFnbDialog({
  fnbs,
  nextAction,
}: OrderFnbDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof OrderFnbSchema>>({
    resolver: zodResolver(OrderFnbSchema),
    defaultValues: {
      costumer_name: "",
      order_items: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "order_items",
  });
  const orderItems = form.watch("order_items");

  function onSelectFnb(fnb: Fnb, index: number) {
    form.clearErrors(`order_items.${index}.name`);
    form.setValue(`order_items.${index}.id`, fnb.id);
    form.setValue(`order_items.${index}.name`, fnb.name);
    form.setValue(`order_items.${index}.price`, fnb.price);
    form.setValue(
      `order_items.${index}.total_price`,
      fnb.price * form.getValues(`order_items.${index}.quantity`)
    );
  }

  async function onSubmit(val: z.infer<typeof OrderFnbSchema>) {
    setLoading(true);
    const result = await Services.orderService.create(val as any);
    setLoading(false);
    toast({
      title: result.error ? "Gagal" : "Berhasil",
      description: result.message ?? "Order berhasil dibuat",
      variant: result.error ? "destructive" : "default",
    });
    if (!result.error) {
      setIsOpen(false);
      form.reset();
      nextAction();
    }
  }

  return (
    <DialogContainer>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="flex gap-1 items-center">
            <Salad className="mr-2 h-4 w-4" />
            <span>Order F&B</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[400px] sm:max-w-[425px] max-h-[80vh] overflow-y-auto overflow-x-hidden">
          <DialogHeader>
            <DialogTitle>Order F&B</DialogTitle>
            <DialogDescription>
              Pastikan data yang diisi sudah benar
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="costumer_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Kostumer</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama kostumer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-end w-full gap-2">
                    <div>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        F&B
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name={`order_items.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormMessage />
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                      "w-[200px] justify-between",
                                      !field.value && "text-muted-foreground"
                                    )}                                      >
                                    {field.value || "Pilih F&B"}
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Cari F&B..." />
                                  <CommandEmpty>Tidak ada F&B</CommandEmpty>
                                  <CommandGroup>
                                    {fnbs.map((fnb) => (
                                      <CommandItem
                                        key={fnb.id}
                                        value={fnb.name}
                                        onSelect={() => onSelectFnb(fnb, index)}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            fnb.name === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {fnb.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>
                        Qty
                      </FormLabel>
                      <FormField
                        control={form.control}
                        name={`order_items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-10"
                                {...field}
                                {...form.register(
                                  `order_items.${index}.quantity`,
                                  {
                                    setValueAs: (value) => Number(value) || "",
                                    min: 1,
                                    onChange(event) {
                                      let price = form.getValues(
                                        `order_items.${index}.price`
                                      );
                                      form.setValue(
                                        `order_items.${index}.total_price`,
                                        price * event.target.value
                                      );
                                    },
                                  }
                                )}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(index)}
                    >
                      <Trash width={20} height={20} />
                    </Button>
                    {form.getValues(`order_items.${index}.total_price`) || 0}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-10"
                  onClick={() => append({
                    id: 0,
                    name: "",
                    quantity: 1,
                    price: 0,
                    total_price: 0,
                  })}
                >
                  Tambah F&B
                </Button>
                <FormItem>
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <Input
                      value={
                        formatCurrency(orderItems.reduce((a, b) => a + b.price * b.quantity, 0))
                      }
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              <Button disabled={loading} className="w-full mt-6" type="submit">
                {loading ? <Spinner /> : "Order F&B"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DialogContainer>
  );
}
