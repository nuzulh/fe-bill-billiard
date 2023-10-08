import { API, appStorage } from "@/lib";
import { ApiResponse, User, UserRole } from "@/types";
import { NavigateFunction } from "react-router-dom";

type UserService = {
  login(email: string, password: string): Promise<ApiResponse<{
    id: string;
    role: UserRole;
    token: string;
  }>>;
  register(
    name: string,
    email: string,
    password: string
  ): Promise<ApiResponse<Partial<User>>>;
  logout(navigate: NavigateFunction): void;
  getAll(): Promise<ApiResponse<User[]>>;
  getOne(id: string): Promise<ApiResponse<User>>;
  create(data: Partial<User>): Promise<ApiResponse<User>>;
  update(id: string, data: Partial<User>): Promise<ApiResponse<User>>;
  delete(id: string): Promise<ApiResponse<any>>;
};

export default {
  login: async (email, password) => await API.post(
    "/auth/login",
    { email, password }
  ),
  register: async (name, email, password) => await API.post(
    "/auth/register",
    { name, email, password }
  ),
  logout: (navigate) => {
    appStorage.remove("token");
    navigate("/auth/login");
  },
  getAll: async () => await API.get("/user"),
  getOne: async (id) => await API.get(`/user/${id}`),
  create: async (data) => await API.post("/user", data),
  update: async (id, data) => await API.put(`/user/${id}`, data),
  delete: async (id) => await API.delete(`/user/${id}`),
} as UserService;
