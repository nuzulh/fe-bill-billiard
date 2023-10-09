export enum UserRole {
  "admin" = "admin",
  "cashier" = "cashier",
  "chef" = "chef",
  "user" = "user",
}

export type ApiResponse<T> = {
  error: boolean;
  data: T;
  message?: string;
};

export type User = {
  created_at: Date;
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Fnb = {
  created_at: Date;
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  active: boolean;
  image?: string;
};

export type OrderItem = {
  id: string;
  quantity: number;
  status: "pending" | "cooking" | "done";
  fnb: Fnb;
};

export type Order = {
  id: string;
  created_at: Date;
  costumer_name: string;
  paid: boolean;
  price: number;
  note?: string;
  created_by: string;
  table: string;
  table_order?: Partial<Table>;
  duration: number;
  life_time: boolean;
  order_items: Partial<OrderItem>[];
};

export type Table = {
  id: number;
  name: string;
  price: number;
  device_id: string;
  order?: Order;
};
