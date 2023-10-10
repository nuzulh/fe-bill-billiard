import { Spinner } from "@/components";
import { FnbTable } from "@/components/admin";
import { useToast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { Fnb } from "@/types";
import React from "react";

export default function FnbPage() {
  const { toast } = useToast();
  const [fnbs, setFnbs] = React.useState<Fnb[] | null>(null);

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

  React.useEffect(() => {
    fetchFnbs();
  }, []);

  if (!fnbs) return <Spinner />;

  return (
    <div className="container mx-auto py-10">
      <FnbTable.FnbDataTable columns={FnbTable.fnbColumns} data={fnbs} />
    </div>
  );
}