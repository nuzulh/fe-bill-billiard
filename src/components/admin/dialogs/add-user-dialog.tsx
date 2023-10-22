import { Spinner } from "@/components";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import { AddUserSchema } from "@/lib";
import { Services } from "@/services";
import { UserRole } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type AddUserDialogProps = {
  nextAction: () => void;
};

export default function AddUserDialog({
  nextAction,
}: AddUserDialogProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof AddUserSchema>>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    }
  });

  async function onSubmit(val: z.infer<typeof AddUserSchema>) {
    setLoading(true);
    const result = await Services.userService.create({
      ...val,
      role: UserRole[val.role],
    });
    setLoading(false);
    toast({
      title: result.error ? "Gagal" : "Berhasil",
      description: result.message ?? "Pengguna berhasil ditambahkan",
      variant: result.error ? "destructive" : "default",
    });
    if (!result.error) {
      setIsOpen(false);
      form.reset();
      nextAction();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Tambah Pengguna</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tambah Pengguna</DialogTitle>
          <DialogDescription>
            Pastikan data yang dikirim sudah benar
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Penggguna</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama pengguna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan email pengguna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Masukkan password pengguna" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue="user"
                        className="flex flex-col space-y-1"
                      >
                        {Object.values(UserRole).map((role, index) => (
                          <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={role} />
                            </FormControl>
                            <FormLabel className="font-normal">{role}</FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="w-full mt-6" type="submit">
              {loading ? <Spinner /> : "Tambah Pengguna"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
