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
  created_at: string;
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type Table = {
  id: number;
  name: string;
  price: number;
  device_id: string;
  active: boolean;
};

export type Fnb = {
  created_at: string;
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
  fnb: string;
  quantity: number;
};

export type Order = {
  id: string;
  costumer_name: string;
  paid: boolean;
  price: number;
  note?: string;
  created_by: string;
  table: string;
  duration: number;
  life_time: boolean;
  order_items: OrderItem[];
};
