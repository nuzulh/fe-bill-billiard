import { Spinner } from "@/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { AddFnbSchema } from "@/lib";
import { Services } from "@/services";
import { Fnb } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type EditFnbDialogProps = {
  fnb: Fnb;
  nextAction: () => void;
};

export default function EditFnbDialog({
  fnb,
  nextAction,
}: EditFnbDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof AddFnbSchema>>({
    resolver: zodResolver(AddFnbSchema),
    defaultValues: {
      image: fnb.image,
      name: fnb.name,
      price: `${fnb.price}`,
      stock: `${fnb.stock}`,
      category: fnb.category,
      active: `${fnb.active}`,
    },
  });

  async function onSubmit(val: z.infer<typeof AddFnbSchema>) {
    setLoading(true);
    const result = await Services.fnbService.update(fnb.id, ({
      // image: val.image,
      name: val.name,
      price: Number(val.price),
      stock: Number(val.stock),
      active: val.active === "true",
      category: val.category,
    }));
    setLoading(false);
    toast({
      title: result.error ? "Gagal" : "Berhasil",
      description: result.message ?? "Produk berhasil diedit",
      variant: result.error ? "destructive" : "default",
    });
    if (!result.error) {
      setIsOpen(false);
      nextAction();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Food & Beverage</DialogTitle>
          <DialogDescription>
            Pastikan data yang dikirim sudah benar
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center justify-between mt-4">
          {form.getValues("image") && (
            <Avatar className="h-40 w-40">
              <AvatarImage src={form.getValues("image")!} alt="img" />
              <AvatarFallback><Spinner /></AvatarFallback>
            </Avatar>
          )}
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Produk</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama produk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukkan harga produk"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stok</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Masukkan stok produk"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="food">Makanan</SelectItem>
                        <SelectItem value="beverage">Minuman</SelectItem>
                        <SelectItem value="other">Lainnya</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Pasarkan Produk?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="true" />
                          </FormControl>
                          <FormLabel className="font-normal">Ya</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="false" />
                          </FormControl>
                          <FormLabel className="font-normal">Tidak</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="w-full mt-6" type="submit">
              {loading ? <Spinner /> : "Edit"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
