import { CashierTabs } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams({
    tab: "billing",
  });
  const tabMenu = searchParams.get("tab");

  return (
    <main className="container flex flex-col">
      <Tabs defaultValue={tabMenu ?? "billing"} className="space-y-4">
        <TabsList className="gap-2">
          <TabsTrigger
            value="billing"
            onClick={() => setSearchParams((prev) => {
              prev.set("tab", "billing");
              return prev;
            })}
          >
            Billing
          </TabsTrigger>
          <TabsTrigger
            value="fnb"
            onClick={() => setSearchParams((prev) => {
              prev.set("tab", "fnb");
              return prev;
            })}
          >
            F&B
          </TabsTrigger>
          <TabsTrigger
            value="order"
            onClick={() => setSearchParams((prev) => {
              prev.set("tab", "order");
              return prev;
            })}
          >
            Order
          </TabsTrigger>
        </TabsList>
        <TabsContent value="billing" className="space-y-4">
          <CashierTabs.BillingTab />
        </TabsContent>
        <TabsContent value="fnb" className="space-y-4">
          <CashierTabs.FnbTab />
        </TabsContent>
      </Tabs>
    </main>
  );
}
