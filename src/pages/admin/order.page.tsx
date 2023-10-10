import { Spinner } from "@/components";
import { OrderTable } from "@/components/admin";
import DataTable from "@/components/data-table";
import { useToast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { Order } from "@/types";
import React from "react";

export default function OrderPage() {
  const { toast } = useToast();
  const [orders, setOrders] = React.useState<Order[] | null>(null);

  async function fetchOrders() {
    const result = await Services.orderService.getAll();
    if (result.error)
      toast({
        title: "Gagal",
        description: result.message,
        variant: "destructive",
      });
    else setOrders(result.data);
  }

  React.useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders) return <Spinner />;

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={OrderTable.orderColumns}
        data={orders}
        filter="costumer_name"
        filterPlaceHolder="nama kostumer..."
      />
    </div>
  );
}
