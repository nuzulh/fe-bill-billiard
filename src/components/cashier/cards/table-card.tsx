/* eslint-disable react-hooks/exhaustive-deps */
import { Countdown } from "@/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { useCountdown } from "@/hooks";
import { formatCurrency } from "@/lib";
import { Services } from "@/services";
import { Fnb, Table } from "@/types";
import { ChevronDown } from "lucide-react";
import React from "react";
import { CashierDialogs } from "..";

type TableCardProps = {
  table: Table;
  fnbs: Fnb[];
  nextAction: () => void;
};

export default function TableCard({ table, fnbs, nextAction }: TableCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { hours, minutes, seconds, status } = useCountdown(
    table.order?.created_at || new Date(),
    table.order?.duration || 0,
  );

  async function stopTable() {
    const result = await Services.tableService.stop(table.id, "done");
    if (result.error)
      toast({
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
    if (table.order) {
      if (!table.order.life_time && status === "inactive") stopTable();
      if (!table.order.life_time && status === "emergency")
        Services.tableService.reminder(table.id);
    }
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
                <CashierDialogs.EditFnbOrderDialog
                  table={table}
                  fnbs={fnbs}
                  nextAction={() => {
                    setIsOpen(false);
                    nextAction();
                  }}
                />
                {table.order?.life_time ? null : (
                  <CashierDialogs.AddDurationDialog
                    table={table}
                    nextAction={() => {
                      setIsOpen(false);
                      nextAction();
                    }}
                  />
                )}
                <CashierDialogs.StopTableDialog
                  table={table}
                  nextAction={() => {
                    setIsOpen(false);
                    nextAction();
                  }}
                />
              </>
            ) : (
              <CashierDialogs.FillTableDialog
                table={table}
                fnbs={fnbs}
                nextAction={() => {
                  setIsOpen(false);
                  nextAction();
                }}
              />
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">
          {/* {status === "active" || table.order?.life_time ? (
            table.order?.life_time
              ? "Sepuasnya"
              : (
                <Countdown
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                />
              )
          ) : "Kosong"} */}
          {table.order?.life_time ? (
            "Sepuasnya"
          ) : status !== "inactive" ? (
            <Countdown hours={hours} minutes={minutes} seconds={seconds} />
          ) : (
            "Kosong"
          )}
        </div>
        <p className="text-xs">Harga Per-Jam {formatCurrency(table.price)}</p>
      </CardContent>
    </Card>
  );
}
