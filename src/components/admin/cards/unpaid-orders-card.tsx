import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatTime, parseInitial } from "@/lib";
import { OverviewOrder } from "@/types";

type UnpaidOrdersCardProps = {
  unPaidOrders: OverviewOrder[];
};

export default function UnpaidOrdersCard({
  unPaidOrders,
}: UnpaidOrdersCardProps) {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle>Order yang belum dibayar</CardTitle>
        <CardDescription>
          Orderan dibawah ini adalah orderan yang belum diklik bayar oleh
          kasir.
        </CardDescription>
      </CardHeader>
      <CardContent className=" max-h-96 overflow-y-auto">
        <div className="space-y-8">
          {unPaidOrders.map((order, i) => (
            <div className="flex items-center" key={i}>
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {parseInitial(order.costumer_name)}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {order.costumer_name}
                </p>
                <div className="flex gap-2">
                  <p className="text-sm text-muted-foreground">
                    {formatTime(order.created_at)}
                  </p>
                  {order.table_order ? (
                    <p className="text-sm text-muted-foreground font-bold">
                      [{order.table_order.used_table.name}]
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="ml-auto font-medium">
                {formatCurrency(order.price)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
