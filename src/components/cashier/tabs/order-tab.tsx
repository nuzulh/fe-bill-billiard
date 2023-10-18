import DataTable from "@/components/data-table";
import { CashierColumns, Loading } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { Order } from "@/types";
import React from "react";
import { DatePicker } from "@/components/date-picker";
import { formatDate } from "@/lib";

export default function OrderTab() {
  const [orders, setOrders] = React.useState<Order[] | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const filteredOrders = React.useMemo(
    () => orders?.filter((x) => formatDate(x.created_at) === formatDate(selectedDate)) || [],
    [orders, selectedDate]
  );

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
    <DataTable
      columns={CashierColumns.orderColumns(fetchOrders)}
      data={filteredOrders}
      filter="costumer_name"
      filterPlaceHolder="nama kostumer..."
      actionElement={
        <DatePicker onDateChange={(date) => setSelectedDate(date)} />
      }
    />
  );
}
