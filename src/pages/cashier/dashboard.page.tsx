import { CashierTabs } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabMenu = searchParams.get("tab") ?? "billing";

  function onChangeParams(key: string, value: string) {
    setSearchParams((prev) => {
      prev.set(key, value);
      return prev;
    });
  }

  return (
    <main className="container flex flex-col">
      <Tabs defaultValue={tabMenu} className="space-y-4">
        <TabsList className="gap-2">
          <TabsTrigger
            value="billing"
            onClick={() => onChangeParams("tab", "billing")}
          >
            Billing
          </TabsTrigger>
          <TabsTrigger
            value="fnb"
            onClick={() => onChangeParams("tab", "fnb")}
          >
            F&B
          </TabsTrigger>
          <TabsTrigger
            value="order"
            onClick={() => onChangeParams("tab", "order")}
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
