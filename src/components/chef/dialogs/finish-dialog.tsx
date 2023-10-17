import { DialogContainer, Spinner } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { OrderItem } from "@/types";
import { CheckCircle } from "lucide-react";
import React from "react";

type FinishDialogProps = {
  orderItem: OrderItem;
  nextAction: () => void;
};

export default function FinishDialog({
  orderItem,
  nextAction,
}: FinishDialogProps) {
  const [loading, setLoading] = React.useState(false);

  async function onStopOrderItem() {
    setLoading(true);
    const result = await Services.chefService.finish(orderItem.id);
    setLoading(false);
    toast({
      title: result.error ? "Gagal" : "Berhasil",
      description: result.message ?? "Berhasil menyelesaikan pesanan",
      variant: result.error ? "destructive" : "default",
    });
    if (!result.error) nextAction();
  }

  return (
    <DialogContainer onClick={onStopOrderItem}>
      <div className="flex gap-1 items-center">
        {loading ? <Spinner /> : (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            <span>Selesai</span>
          </>
        )}
      </div>
    </DialogContainer>
  );
}
