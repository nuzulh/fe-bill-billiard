import React from "react";
// import mqtt from "mqtt";
import * as mqtt from "mqtt/dist/mqtt.min";

type MqttStatus = "noaction" | "connecting" | "reconnecting" | "connected";
type MqttPayload = {
  topic: string;
  message: string;
};

export function useMqttClient(host: string, mqttOption?: mqtt.IClientOptions) {
  const [status, setStatus] = React.useState<MqttStatus>("noaction");
  const [client, setClient] = React.useState<mqtt.MqttClient | null>(null);
  const [payload, setPayload] = React.useState<MqttPayload | null>(null);

  function mqttConnect(host: string, mqttOption?: mqtt.IClientOptions) {
    setStatus("connecting");
    setClient(mqtt.connect(host, mqttOption));
  };

  React.useEffect(() => {
    if (client) {
      console.log(client);
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
    } else mqttConnect(host, mqttOption);
  }, [client]);

  return { status, client, payload };
}
