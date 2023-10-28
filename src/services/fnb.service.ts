import { API } from "@/lib";
import { ApiResponse, Fnb } from "@/types";

type FnbService = {
  getAll(allData?: boolean | null): Promise<ApiResponse<Fnb[]>>;
  getOne(id: number): Promise<ApiResponse<Fnb>>;
  create(data: Partial<Fnb>): Promise<ApiResponse<Fnb>>;
  update(id: number, data: Partial<Fnb>): Promise<ApiResponse<Fnb>>;
  delete(id: number): Promise<ApiResponse<unknown>>;
};

export default {
  getAll: async (allData?: boolean | null) =>
    await API.get("/Fnb" + (allData ? "?allData=true" : "")),
  getOne: async id => await API.get(`/Fnb/${id}`),
  create: async data => await API.post("/Fnb", data),
  update: async (id, data) => await API.put(`/Fnb/${id}`, data),
  delete: async id => await API.delete(`/Fnb/${id}`),
} as FnbService;
