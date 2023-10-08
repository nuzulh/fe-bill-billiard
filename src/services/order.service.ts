import { API } from "@/lib";
import { ApiResponse, Order } from "@/types";

type OrderService = {
  getAll(): Promise<ApiResponse<Order[]>>;
  getOne(id: number): Promise<ApiResponse<Order>>;
  create(data: Partial<Order>): Promise<ApiResponse<Order>>;
  patchNote(id: number, note: string): Promise<ApiResponse<string>>;
  delete(id: number): Promise<ApiResponse<any>>;
};

export default {
  getAll: async () => await API.get("/order"),
  getOne: async (id) => await API.get(`/order/${id}`),
  create: async (data) => await API.post("/order", data),
  patchNote: async (id, note) => await API.patch(`/order/${id}`, { note }),
  delete: async (id) => await API.delete(`/order/${id}`),
} as OrderService;
