import { Loading } from "@/components";
import { ChefCards } from "@/components/chef";
import { toast } from "@/components/ui/use-toast";
import { useMqttClient } from "@/hooks";
import { Services } from "@/services";
import { OrderItem } from "@/types";
import React from "react";

export default function DashboardPage() {
  const [orderItems, setOrderItems] = React.useState<OrderItem[] | null>(null);

  async function fetchOrderItems() {
    const result = await Services.chefService.getAll();
    if (result.error) toast({
      title: "Gagal",
      description: result.message,
      variant: "destructive",
    });
    else setOrderItems(result.data);
  }

  const { status, payload } = useMqttClient("ws://broker.emqx.io");
  console.log(status, payload);

  React.useEffect(() => {
    fetchOrderItems();
  }, []);

  if (!orderItems) return <Loading />;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {orderItems.map((item) => (
        <ChefCards.ChefCard
          key={item.id}
          orderItem={item}
          nextAction={fetchOrderItems}
        />
      ))}
    </div>
  );
}
