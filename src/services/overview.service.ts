import { API } from "@/lib";
import { ApiResponse, Overview } from "@/types";

type OverviewService = {
  get(from: string, to: string): Promise<ApiResponse<Overview>>;
};

export default {
  get: async (from, to) => await API.get(
    `/dashboard?from=${from}&to=${to}`
  ),
} as OverviewService;
