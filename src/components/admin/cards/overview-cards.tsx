import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib";
import { GroupOrder, OverviewUser } from "@/types";
import { Coins, Users, UtensilsCrossed } from "lucide-react";

type OverviewCardsProps = {
  groupOrder?: GroupOrder;
  users: OverviewUser[];
};

export default function OverviewCards({
  groupOrder,
  users,
}: OverviewCardsProps) {
  return (

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pendapatan Meja
          </CardTitle>
          <Coins className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(groupOrder?.total_paid_order_table || 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            Belum dibayar{" "}
            {formatCurrency(groupOrder?.total_unpaid_order_table || 0)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Penjualan F&B
          </CardTitle>
          <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(groupOrder?.total_paid_order_item || 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            Belum dibayar{" "}
            {formatCurrency(groupOrder?.total_unpaid_order_item || 0)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Jumlah Pengguna
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{users.length}</div>
          {users.map((user, index) => (
            <p key={index} className="text-xs text-muted-foreground">
              {user.role} {user.count}
            </p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
