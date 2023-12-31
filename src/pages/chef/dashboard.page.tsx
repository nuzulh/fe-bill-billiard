import { Loading } from "@/components";
import { ChefCards } from "@/components/chef";
import { toast } from "@/components/ui/use-toast";
import { useMqttClient } from "@/hooks";
import { Services } from "@/services";
import { OrderItem } from "@/types";
import React from "react";

export default function DashboardPage() {
  const [orderItems, setOrderItems] = React.useState<OrderItem[] | null>(null);
  const [mqttHost, setMqttHost] = React.useState<string | null>(null);

  async function fetchOrderItems() {
    const result = await Services.chefService.getAll();
    if (result.error)
      toast({
        title: "Gagal",
        description: result.message,
        variant: "destructive",
      });
    else setOrderItems(result.data);
  }

  async function fetchMqttHost() {
    const result = await Services.mqttHostService.get();

    if (result.error)
      toast({
        title: "Gagal",
        description: result.message,
        variant: "destructive",
      });
    else setMqttHost(`${result.data.protocol}://${result.data.host}:${result.data.port}`);
  }

  const { client, payload } = useMqttClient(mqttHost);

  React.useEffect(() => {
    if (payload?.topic == "refresh") {
      const refresh = payload.message == "true";
      if (refresh) {
        fetchOrderItems();
        client?.publish("refresh", "false");
      }
    }
  }, [payload, client]);

  React.useEffect(() => {
    fetchOrderItems();
    fetchMqttHost();
  }, []);

  if (!orderItems) return <Loading />;

  return (
    <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {orderItems.map(item => (
        <ChefCards.OrderCard
          key={item.id}
          orderItem={item}
          nextAction={fetchOrderItems}
        />
      ))}
    </div>
  );
}
