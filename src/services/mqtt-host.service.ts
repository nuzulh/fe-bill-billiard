import { API } from "@/lib";
import { ApiResponse, MqttHost } from "@/types";

type MqttHostService = {
  get(): Promise<ApiResponse<MqttHost>>;
};

export default {
  get: async () => await API.get("/mqtt-host"),
} as MqttHostService;
