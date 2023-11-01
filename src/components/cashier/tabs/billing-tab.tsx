import { Loading } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { useMqttClient } from "@/hooks";
import { Services } from "@/services";
import { Fnb, Table } from "@/types";
import React from "react";
import { CashierCards } from "..";

export default function BillingTab() {
  const [tables, setTables] = React.useState<Table[] | null>(null);
  const [fnbs, setFnbs] = React.useState<Fnb[] | null>(null);
  const [mqttHost, setMqttHost] = React.useState<string | null>(null);

  async function fetchTables() {
    const result = await Services.tableService.getAll();
    if (result.error)
      toast({
        title: "Gagal",
        description: result.message,
        variant: "destructive",
      });
    else setTables(result.data);
  }

  async function fetchFnbs() {
    const result = await Services.fnbService.getAll();
    if (result.error)
      toast({
        title: "Gagal",
        description: result.message,
        variant: "destructive",
      });
    else setFnbs(result.data);
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
        fetchTables();
        fetchFnbs();
        client?.publish("refresh", "false");
      }
    }
  }, [payload, client]);

  function nextAction() {
    fetchTables();
    fetchFnbs();
  }

  React.useEffect(() => {
    fetchTables();
    fetchFnbs();
    fetchMqttHost();
  }, []);

  if (!tables || !fnbs) return <Loading />;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {tables.map(table => (
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
