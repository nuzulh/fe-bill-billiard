import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatTime } from "@/lib";
import { OrderItem } from "@/types";
import { ChevronDown } from "lucide-react";
import React from "react";
import { ChefDialogs } from "..";

type ChefCardProps = {
  orderItem: OrderItem;
  nextAction: () => void;
};

export default function ChefCard({ orderItem, nextAction }: ChefCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className={orderItem.status === "pending" ? "bg-red-500" : "bg-amber-500"}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <p className="text-xl font-bold">
            {orderItem.fnb.name} ({orderItem.quantity} pcs)
          </p>
        </CardTitle>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="flex justify-center gap-3 h-8">
              <p>Aksi</p>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-primary text-primary-foreground">
            {orderItem.status === "pending" ? (
              <ChefDialogs.ProcessDialog orderItem={orderItem} nextAction={nextAction} />
            ) : (
              <ChefDialogs.FinishDialog orderItem={orderItem} nextAction={nextAction} />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">
          {orderItem.status === "pending" ? "Pending" : "Proses"}
        </div>
        <p className="text-xs">
          Dipesan oleh: <strong>{orderItem.order?.costumer_name ?? "-"}</strong>
          <br />
          Dipesan pada: <strong>{formatTime(orderItem.order?.created_at!) ?? "-"}</strong>
        </p>
      </CardContent>
    </Card>
  );
}
