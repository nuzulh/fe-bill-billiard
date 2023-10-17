import React from "react";
// import mqtt from "mqtt";
import * as mqtt from "mqtt/dist/mqtt.min";

type MqttStatus = "noaction" | "connecting" | "reconnecting" | "connected";
type MqttPayload = {
  topic: string;
  message: string;
};

export function useMqttClient(host: string | null, mqttOption?: mqtt.IClientOptions) {
  const [status, setStatus] = React.useState<MqttStatus>("noaction");
  const [client, setClient] = React.useState<mqtt.MqttClient | null>(null);
  const [payload, setPayload] = React.useState<MqttPayload | null>(null);

  async function mqttConnect(host: string, mqttOption?: mqtt.IClientOptions) {
    setStatus("connecting");
    const client = await mqtt.connectAsync(host, mqttOption);
    setClient(client);
  }

  React.useEffect(() => {
    if (client) {
      client.subscribe("orders");
      client.on("connect", () => {
        setStatus("connected");
      });
      client.on("error", (err: any) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        setStatus("reconnecting");
      });
      client.on("message", (topic: string, message: Buffer) => {
        const payload = { topic, message: message.toString() };
        setPayload(payload);
      });
    } else {
      if (host) mqttConnect(host, mqttOption);
    }
  }, [client, host]);

  return { status, client, payload };
}
