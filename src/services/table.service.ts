import { API } from "@/lib";
import { ApiResponse, Table } from "@/types";

type TableService = {
  getAll(allData?: boolean | null): Promise<ApiResponse<Table[]>>;
  getOne(id: number): Promise<ApiResponse<Table>>;
  create(data: Partial<Table>): Promise<ApiResponse<Table>>;
  update(id: number, data: Partial<Table>): Promise<ApiResponse<Table>>;
  delete(id: number): Promise<ApiResponse<unknown>>;
  editFnbOrder(
    tableId: number,
    orderItems: {
      fnb_id: number;
      quantity: number;
    }[],
  ): Promise<ApiResponse<unknown>>;
  addDuration(tableId: number, duration: number): Promise<ApiResponse<unknown>>;
  stop(id: number, reason: "stop" | "done"): Promise<ApiResponse<unknown>>;
  reminder(id: number): Promise<ApiResponse<unknown>>;
};

export default {
  getAll: async (allData?: boolean | null) =>
    await API.get("/table" + (allData ? "?allData=true" : "")),
  getOne: async id => await API.get(`/table/${id}`),
  create: async data => await API.post("/table", data),
  update: async (id, data) => await API.put(`/table/${id}`, data),
  delete: async id => await API.delete(`/table/${id}`),
  editFnbOrder: async (id, orderItems) =>
    await API.patch(`/table-action/edit-fnb/${id}`, { order_items: orderItems }),
  addDuration: async (id, duration) =>
    await API.put(`/table-action/add-duration/${id}`, { duration }),
  stop: async (id, reason) =>
    await API.post(`/table-action/stop/${id}?reason=${reason}`, null),
  reminder: async (id) =>
    await API.get(`/table-action/reminder/${id}`),
} as TableService;
