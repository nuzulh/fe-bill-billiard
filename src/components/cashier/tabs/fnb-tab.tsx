import { CashierCards, Spinner } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { Fnb } from "@/types";
import React from "react";

export default function FnbTab() {
  const [fnbs, setFnbs] = React.useState<Fnb[] | null>(null);

  async function fetchFnbs() {
    const result = await Services.fnbService.getAll();
    if (result.error) toast({
      title: "Gagal",
      description: result.message,
      variant: "destructive",
    });
    else setFnbs(result.data);
  }

  React.useEffect(() => { fetchFnbs(); }, []);

  if (!fnbs) return <Spinner />;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      {fnbs.map((fnb) => (
        <CashierCards.FnbCard key={fnb.id} fnb={fnb} />
      ))}
    </div>
  );
}
