import { Loading } from "@/components";
import { AdminColumns } from "@/components/admin";
import DataTable from "@/components/data-table";
import { toast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { Fnb } from "@/types";
import React from "react";

export default function FnbPage() {
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

  if (!fnbs) return <Loading />;

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={AdminColumns.fnbColumns(fetchFnbs)}
        data={fnbs}
        filter="name"
        filterPlaceHolder="nama produk..."
      />
    </div>
  );
}
