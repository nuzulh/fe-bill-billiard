import { API } from "@/lib";
import { ApiResponse, OrderItem } from "@/types";

type ChefService = {
  getAll(): Promise<ApiResponse<OrderItem[]>>;
  process(id: string): Promise<ApiResponse<any>>;
  finish(id: string): Promise<ApiResponse<any>>;
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
