import { API } from "@/lib";
import { ApiResponse, Table } from "@/types";

type TableService = {
  getAll(): Promise<ApiResponse<Table[]>>;
  getOne(id: number): Promise<ApiResponse<Table>>;
  create(data: Partial<Table>): Promise<ApiResponse<Table>>;
  update(id: number, data: Partial<Table>): Promise<ApiResponse<Table>>;
  delete(id: number): Promise<ApiResponse<any>>;
};

export default {
  getAll: async () => await API.get("/table"),
  getOne: async (id) => await API.get(`/table/${id}`),
  create: async (data) => await API.post("/table", data),
  update: async (id, data) => await API.put(`/table/${id}`, data),
  delete: async (id) => await API.delete(`/table/${id}`),
} as TableService;
