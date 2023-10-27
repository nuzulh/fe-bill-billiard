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

export type FnbCategory = "food" | "beverage" | "other";

export type Fnb = {
  created_at: Date;
  id: number;
  name: string;
  price: number;
  stock: number;
  category: FnbCategory;
  active: boolean;
  image: string | null;
};

export type OrderItemStatus = "pending" | "cooking" | "done";

export type OrderItem = {
  id: string;
  quantity: number;
  status: OrderItemStatus;
  fnb: Fnb;
  order?: Order;
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
  stopped: boolean;
};

export type Table = {
  id: number;
  name: string;
  price: number;
  device_id: string;
  active: boolean;
  order?: Order;
};

export type MqttHost = {
  id: number;
  protocol: string;
  host: string;
  port: number;
  username: string | null;
  password: string | null;
};

export type GroupOrder = {
  month: Date;
  total_paid_order_table: number;
  total_paid_order_item: number;
  total_paid_price: number;
  total_unpaid_order_table: number;
  total_unpaid_order_item: number;
  total_unpaid_price: number;
};

export type TableOrder = {
  id: string;
  duration: number;
  stoped_at: Date;
  life_time: boolean;
  used_table: Table & { created_at: Date; };
};

export type OverviewOrder = {
  created_at: Date;
  id: string;
  costumer_name: string;
  paid: boolean;
  price: number;
  note: string | null;
  table_order: TableOrder | null;
  order_items: Array<OrderItem & { created_at: Date; }>;
};

export type OverviewUser = {
  role: UserRole;
  count: number;
};

export type Overview = {
  groupOrders: GroupOrder[];
  paidOrders: OverviewOrder[];
  unPaidOrders: OverviewOrder[];
  users: OverviewUser[];
};
