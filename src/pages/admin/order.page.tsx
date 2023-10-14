import { Loading } from "@/components";
import { AdminColumns } from "@/components/admin";
import DataTable from "@/components/data-table";
import { toast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { Order } from "@/types";
import React from "react";

export default function OrderPage() {
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

  if (!orders) return <Loading />;

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={AdminColumns.orderColumns()}
        data={orders}
        filter="costumer_name"
        filterPlaceHolder="nama kostumer..."
      />
    </div>
  );
}
