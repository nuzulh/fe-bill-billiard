import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "../../components";
import React from "react";
import { RegisterSchema } from "@/lib";
import { Services } from "@/services";
import { toast } from "@/components/ui/use-toast";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    setLoading(true);
    const result = await Services.userService.register(
      values.name,
      values.email,
      values.password
    );
    setLoading(false);
    toast({
      title: `Daftar ${result.error ? "gagal" : "berhasil"}`,
      description: result.message ?? "Silahkan login",
      variant: result.error ? "destructive" : "default",
    });
    if (!result.error) navigate("/auth/login");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Andrian" {...field} />
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
                  <Input placeholder="mail@example.com" {...field} />
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
                  <Input
                    type="password"
                    placeholder="Masukkan password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan konfirmasi password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={loading} className="w-full mt-6" type="submit">
          {loading ? <Spinner /> : "Daftar"}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-2">
        sudah punya akun?{" "}
        <Link className="text-blue-500 hover:underline" to="/auth/login">
          Masuk
        </Link>
      </p>
    </Form>
  );
}
