import { API } from "@/lib";
import { ApiResponse, User, UserRole } from "types";

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
} as UserService;
