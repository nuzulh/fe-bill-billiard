import { DialogContainer, Spinner } from "@/components";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn, formatCurrency } from "@/lib";
import { FillTableSchema } from "@/lib/schemas";
import { Services } from "@/services";
import { Fnb, Table } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Trash, UserPlus } from "lucide-react";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

type FillTableDialogProps = {
  table: Table;
  fnbs: Fnb[];
  nextAction: () => void;
};

export default function FillTableDialog({
  table,
  fnbs,
  nextAction,
}: FillTableDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof FillTableSchema>>({
    resolver: zodResolver(FillTableSchema),
    defaultValues: {
      costumer_name: "",
      table_order: {
        id: table.id,
        duration: 0,
      },
      order_items: [],
      total_price: 0,
      life_time: false,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "order_items",
  });
  const orderItems = form.watch("order_items");
  const duration = form.watch("table_order.duration");
  const lifeTime = form.watch("life_time");

  async function onSubmit(val: z.infer<typeof FillTableSchema>) {
    setLoading(true);
    const result = await Services.orderService.create(val as never);
    setLoading(false);
    if (result.error)
      toast({
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
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Isi Meja</span>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-[400px] sm:max-w-[425px] max-h-[80vh] overflow-y-auto overflow-x-hidden">
          <DialogHeader>
            <DialogTitle>Isi Meja Billiard</DialogTitle>
            <DialogDescription>Pastikan data yang diisi sudah benar</DialogDescription>
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
                <FormLabel>Durasi (/jam)</FormLabel>
                <FormField
                  control={form.control}
                  name="life_time"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={val => {
                            form.setValue("table_order.duration", val ? -1 : 0);
                            field.onChange(val);
                          }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Direct</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                {lifeTime ? null : (
                  <FormField
                    control={form.control}
                    name="table_order.duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Masukkan durasi"
                            type="number"
                            {...field}
                            {...form.register("table_order.duration", {
                              setValueAs: value => Number(value) || "",
                              onChange(event) {
                                form.setValue(
                                  "total_price",
                                  event.target.value > 0
                                    ? event.target.value * table.price
                                    : 0,
                                );
                              },
                            })}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-end w-full gap-2">
                    <div>
                      <FormLabel className={cn(index !== 0 && "sr-only")}>F&B</FormLabel>
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
                                      !field.value && "text-muted-foreground",
                                    )}
                                  >
                                    {field.value
                                      ? fnbs.find(fnb => fnb.name === field.value)?.name
                                      : "Pilih F&B"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] p-0">
                                <Command>
                                  <CommandInput placeholder="Cari f&b..." />
                                  <CommandEmpty>Tidak ada F&B.</CommandEmpty>
                                  <CommandGroup>
                                    {fnbs.map(fnb => (
                                      <CommandItem
                                        value={fnb.name}
                                        key={fnb.id}
                                        onSelect={() => {
                                          form.clearErrors(`order_items.${index}.name`);
                                          form.setValue(
                                            `order_items.${index}.id`,
                                            fnb.id,
                                          );
                                          form.setValue(
                                            `order_items.${index}.name`,
                                            fnb.name,
                                          );
                                          form.setValue(
                                            `order_items.${index}.price`,
                                            fnb.price,
                                          );
                                          const qty = form.getValues(
                                            `order_items.${index}.quantity`,
                                          );
                                          form.setValue(
                                            `order_items.${index}.total_price`,
                                            fnb.price * qty,
                                          );
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            fnb.name === field.value
                                              ? "opacity-100"
                                              : "opacity-0",
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
                      <FormLabel className={cn(index !== 0 && "sr-only")}>Qty</FormLabel>
                      <FormField
                        control={form.control}
                        name={`order_items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="w-10"
                                {...field}
                                {...form.register(`order_items.${index}.quantity`, {
                                  setValueAs: value => Number(value) || "",
                                  min: 1,
                                  onChange(event) {
                                    const price = form.getValues(
                                      `order_items.${index}.price`,
                                    );
                                    form.setValue(
                                      `order_items.${index}.total_price`,
                                      price * event.target.value,
                                    );
                                  },
                                })}
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
                  onClick={() =>
                    append({
                      id: 0,
                      name: "",
                      quantity: 1,
                      price: 0,
                      total_price: 0,
                    })
                  }
                >
                  Tambah F&B
                </Button>
                <FormItem>
                  <FormLabel>Harga</FormLabel>
                  <FormControl>
                    <Input
                      value={formatCurrency(
                        orderItems.reduce((a, b) => a + b.price * b.quantity, 0) +
                        table.price * (duration < 0 ? 0 : duration),
                      )}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              <Button disabled={loading} className="w-full mt-6" type="submit">
                {loading ? <Spinner /> : "Isi Meja"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </DialogContainer>
  );
}
