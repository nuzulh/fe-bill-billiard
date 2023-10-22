import { Loading } from "@/components";
import { AdminColumns, AdminDialogs } from "@/components/admin";
import DataTable from "@/components/data-table";
import { toast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { User } from "@/types";
import React from "react";

export default function UserPage() {
  const [users, setUsers] = React.useState<User[] | null>(null);

  async function fetchUsers() {
    const result = await Services.userService.getAll();
    if (result.error) toast({
      title: "Gagal",
      description: result.message,
      variant: "destructive",
    });
    else setUsers(result.data);
  }

  React.useEffect(() => {
    fetchUsers();
  }, []);

  if (!users) return <Loading />;

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={AdminColumns.userColumns(fetchUsers)}
        data={users}
        filter="name"
        filterPlaceHolder="nama user..."
        actionElement={
          <AdminDialogs.AddUserDialog nextAction={fetchUsers} />
        }
      />
    </div>
  );
}
