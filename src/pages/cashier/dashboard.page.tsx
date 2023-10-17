import { CashierTabs } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabMenu = searchParams.get("tab") ?? "billing";

  return (
    <main className="container flex flex-col">
      <Tabs
        className="space-y-4"
        defaultValue={tabMenu}
        onValueChange={(val) => setSearchParams((prev) => {
          prev.set("tab", val);
          return prev;
        })}
      >
        <TabsList className="gap-2">
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="fnb">F&B</TabsTrigger>
          <TabsTrigger value="order">Order</TabsTrigger>
        </TabsList>
        <TabsContent value="billing" className="space-y-4">
          <CashierTabs.BillingTab />
        </TabsContent>
        <TabsContent value="fnb" className="space-y-4">
          <CashierTabs.FnbTab />
        </TabsContent>
        <TabsContent value="order" className="pb-10">
          <CashierTabs.OrderTab />
        </TabsContent>
      </Tabs>
    </main>
  );
}
