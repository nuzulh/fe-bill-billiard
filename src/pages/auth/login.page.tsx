import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "../../components";
import { Services } from "@/services";
import { useToast } from "@/components/ui/use-toast";
import { LoginSchema, appStorage } from "@/lib";

export default function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setLoading(true);
    const result = await Services.userService.login(
      values.email,
      values.password
    );
    setLoading(false);
    if (result.error) {
      toast({
        title: "Gagal login",
        description: result.message,
        variant: "destructive",
      });
      return;
    }
    appStorage.set("token", { token: result.data.token });
    navigate(`/${result.data.role}`, { replace: true });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
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
        </div>
        <Button disabled={loading} className="w-full mt-6" type="submit">
          {loading ? <Spinner /> : "Masuk"}
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-2">
        tidak punya akun?{" "}
        <Link className="text-blue-500 hover:underline" to="/auth/register">
          Daftar
        </Link>
      </p>
    </Form>
  );
}
