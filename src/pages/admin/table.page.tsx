import { Spinner } from "@/components";
import { TableTable } from "@/components/admin";
import DataTable from "@/components/data-table";
import { useToast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { Table } from "@/types";
import React from "react";

export default function TablePage() {
  const { toast } = useToast();
  const [tables, setTables] = React.useState<Table[] | null>(null);

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

  React.useEffect(() => {
    fetchTables();
  }, []);

  if (!tables) return <Spinner />;

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={TableTable.tableColumns}
        data={tables}
        filter="name"
        filterPlaceHolder="nama meja..."
      />
    </div>
  );
}
