import { API } from "@/lib";
import { ApiResponse, OrderItem } from "@/types";

type ChefService = {
  getAll(): Promise<ApiResponse<OrderItem[]>>;
  process(id: string): Promise<ApiResponse<unknown>>;
  finish(id: string): Promise<ApiResponse<unknown>>;
};

export default {
  getAll: async () => await API.get("/order-item"),
  process: async (id) => await API.post(
    `/order-item/${id}/process`,
    null
  ),
  finish: async (id) => await API.post(
    `/order-item/${id}/finish`,
    null
  ),
} as ChefService;
