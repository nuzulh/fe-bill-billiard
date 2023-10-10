import { Loading } from "@/components";
import { Services } from "@/services";
import { Fnb, Table } from "@/types";
import { CashierCards } from "..";
import React from "react";
import { toast } from "@/components/ui/use-toast";

export default function BillingTab() {
  const [tables, setTables] = React.useState<Table[] | null>(null);
  const [fnbs, setFnbs] = React.useState<Fnb[] | null>(null);

  async function fetchTables() {
    const result = await Services.tableService.getAll();
    if (result.error) toast({
      title: "Gagal",
      description: result.message,
      variant: "destructive",
    });
    else setTables(result.data);
  }

  async function fetchFnbs() {
    const result = await Services.fnbService.getAll();
    if (result.error) toast({
      title: "Gagal",
      description: result.message,
      variant: "destructive",
    });
    else setFnbs(result.data);
  }

  function nextAction() {
    fetchTables();
    fetchFnbs();
  }

  React.useEffect(() => {
    fetchTables();
    fetchFnbs();
  }, []);

  if (!tables || !fnbs) return <Loading />;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {tables.map((table) => (
        <CashierCards.TableCard
          key={table.id}
          table={table}
          fnbs={fnbs}
          nextAction={nextAction}
        />
      ))}
    </div>
  );
}
