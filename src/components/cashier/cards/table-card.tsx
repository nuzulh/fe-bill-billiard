import { Fnb, Table } from "@/types";
import React from "react";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CashierDialogs } from "..";
import { Countdown } from "@/components";
import { useCountdown } from "@/hooks";
import { Services } from "@/services";
import { toast } from "@/components/ui/use-toast";

type TableCardProps = {
  table: Table;
  fnbs: Fnb[];
  nextAction: () => void;
};

export default function TableCard({
  table,
  fnbs,
  nextAction,
}: TableCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    hours,
    minutes,
    seconds,
    status,
  } = useCountdown(
    table.order?.created_at || new Date(),
    table.order?.duration || 0
  );

  async function stopTable() {
    const result = await Services.tableService.stop(table.id, "done");
    if (result.error) toast({
      title: "Gagal",
      description: result.message,
      variant: "destructive",
    });
    else {
      setIsOpen(false);
      nextAction();
    }
  }

  React.useEffect(() => {
    if (
      table.order &&
      !table.order.life_time &&
      status === "inactive"
    ) stopTable();
  }, [status]);

  return (
    <Card
      className={
        status === "active" || table.order?.life_time
          ? "bg-red-500"
          : status === "emergency"
            ? "bg-amber-500"
            : "bg-green-500"
      }
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <p className="text-xl font-bold">{table.name}</p>
        </CardTitle>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="flex justify-center gap-3 h-8">
              <p>Aksi</p>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-primary text-primary-foreground">
            {status === "active" || table.order?.life_time ? (
              <>
                <CashierDialogs.EditFnbDialog
                  table={table}
                  fnbs={fnbs}
                  nextAction={nextAction}
                />
                {table.order?.life_time ? null : (
                  <CashierDialogs.AddDurationDialog
                    table={table}
                    nextAction={nextAction}
                  />
                )}
                <CashierDialogs.StopTableDialog
                  table={table}
                  nextAction={nextAction}
                />
              </>
            ) : (
              <CashierDialogs.FillTableDialog
                table={table}
                fnbs={fnbs}
                nextAction={nextAction}
              />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">
          {status === "active" || table.order?.life_time ? (
            table.order?.life_time
              ? "Sepuasnya"
              : (
                <Countdown
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                />
              )
          ) : "Kosong"}
        </div>
        <p className="text-xs">
          Harga Per-Jam{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(table.price)}
        </p>
      </CardContent>
    </Card>
  );
}
