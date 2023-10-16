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


export const EditOrderSchema = z.object({
  table_order: z.object({
    id: z.number(),
    duration: z.number(),
  }).optional(),
  costumer_name: z
    .string()
    .min(1, "Nama harus diisi")
    .max(100, "Nama maksimal 100 karakter").optional(),
  life_time: z.boolean().optional(),
  total_price: z.number().optional(),
  order_items: z
    .array(
      z.object({
        fnb_id: z.number(),
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


export const AddDurationSchema = z.object({
  customer_name: z.string(),
  duration: z.number().min(1, "Durasi harus diisi"),
});


export const OrderFnbSchema = z.object({
  costumer_name: z
    .string()
    .min(1, "Nama harus diisi")
    .max(100, "Nama maksimal 100 karakter"),
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
    .min(1, "Minimal 1 Order")
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


export const AddTableSchema = z.object({
  name: z.string().min(1, "Nama meja harus diisi"),
  price: z.string().min(1, "Harga harus diisi"),
  device_id: z.string().min(1, "Device ID harus diisi"),
  active: z.boolean(),
});


export const AddFnbSchema = z.object({
  id: z.string().optional(),
  image: z.string().nullable(),
  name: z
    .string()
    .min(1, "Nama harus diisi")
    .max(100, "Nama maksimal 100 karakter"),
  price: z.string().min(1, "Harga harus diisi"),
  stock: z.string().min(1, "Stok harus diisi"),
  category: z.enum(["food", "beverage", "other"]).default("other"),
  active: z.enum(["true", "false"]).default("true"),
});


export const PayOrderSchema = z.object({
  note: z.string().optional(),
});
