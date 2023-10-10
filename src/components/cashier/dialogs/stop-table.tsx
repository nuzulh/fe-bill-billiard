import { DialogContainer, Spinner } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { Table } from "@/types";
import { TimerOff } from "lucide-react";
import React from "react";

type StopTableDialogProps = {
  table: Table;
  nextAction: () => void;
};

export default function StopTableDialog({
  table,
  nextAction,
}: StopTableDialogProps) {
  const [loading, setLoading] = React.useState(false);

  async function onStopTable() {
    setLoading(true);
    const result = await Services.tableService.stop(table.id, "stop");
    setLoading(false);
    toast({
      title: result.error ? "Gagal" : "Berhasil",
      description: result.message ?? "Berhasil stop meja",
      variant: result.error ? "destructive" : "default",
    });
    if (!result.error) nextAction();
  }

  return (
    <DialogContainer onClick={onStopTable}>
      <div className="flex gap-1 items-center">
        {loading ? <Spinner /> : (
          <>
            <TimerOff className="mr-2 h-4 w-4" />
            <span>Stop Waktu</span>
          </>
        )}
      </div>
    </DialogContainer>
  );
}
