import { CalendarDateRangePicker, Loading } from "@/components";
import { AdminCards } from "@/components/admin";
import { toast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { Overview } from "@/types";
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function DashboardPage() {
  const [overview, setOverview] = React.useState<Overview | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentDate = new Date();
  const fromDate =
    searchParams.get("from") ??
    new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
  const toDate = searchParams.get("to") ?? currentDate.toISOString();

  async function fetchOverview() {
    const result = await Services.overviewService.get(fromDate, toDate);
    if (result.error)
      toast({
        title: "Gagal",
        description: result.message,
        variant: "destructive",
      });
    else setOverview(result.data);
  }

  React.useEffect(() => {
    setSearchParams(prev => {
      prev.set("from", fromDate);
      prev.set("to", toDate);
      return prev;
    });
    fetchOverview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (!overview) return <Loading />;

  return (
    <div className="container flex-1 space-y-4 py-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker
            date={{
              from: new Date(fromDate),
              to: new Date(toDate),
            }}
            setDate={range =>
              setSearchParams(prev => {
                prev.set("from", range?.from?.toISOString() ?? fromDate);
                prev.set("to", range?.to?.toISOString() ?? toDate);
                return prev;
              })
            }
          />
        </div>
      </div>
      <div className="space-y-4">
        <AdminCards.OverviewCards
          groupOrder={overview.groupOrders[0]}
          users={overview.users}
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <AdminCards.ChartsCard groupOrders={overview.groupOrders} />
          <AdminCards.UnpaidOrdersCard unPaidOrders={overview.unPaidOrders} />
        </div>
      </div>
    </div>
  );
}
