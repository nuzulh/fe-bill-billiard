export enum UserRole {
  "admin" = "admin",
  "cashier" = "cashier",
  "chef" = "chef",
  "user" = "user",
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string;
};

export type ApiResponse<T> = {
  error: boolean;
  data: T;
  message?: string;
};
