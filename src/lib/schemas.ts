import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email harus diisi").email("Email tidak valid"),
  password: z
    .string()
    .min(1, "Password harus diisi")
    .min(8, "Password minimal 8 karakter"),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, "Nama harus diisi").max(100),
    email: z.string().min(1, "Email harus diisi").email("Email tidak valid"),
    password: z
      .string()
      .min(1, "Password harus diisi")
      .min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password harus diisi"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password tidak cocok",
  });

export const FillTableSchema = z.object({
  table_order: z.object({
    id: z.number(),
    duration: z.number(),
  }),
  costumer_name: z
    .string()
    .min(1, "Nama harus diisi")
    .max(100, "Nama maksimal 100 karakter"),
  life_time: z.boolean(),
  total_price: z.number(),
  order_items: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        total_price: z.number(),
        quantity: z
          .number({
            errorMap: () => ({
              message: `Qty harus diisi`,
            }),
          })
          .min(1, "Qty harus diisi"),
      })
    )
    .refine(
      (items) =>
        items.find(
          (item) => items.filter((i) => i.name === item.name).length > 1
        ) === undefined,
      {
        message: "Gunakan qty untuk item yang sama",
        path: [0, "name"],
      }
    ),
});
