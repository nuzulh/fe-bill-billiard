import { DialogContainer, Spinner } from "@/components";
import { toast } from "@/components/ui/use-toast";
import { Services } from "@/services";
import { OrderItem } from "@/types";
import { Soup } from "lucide-react";
import React from "react";

type ProcessDialogProps = {
  orderItem: OrderItem;
  nextAction: () => void;
};

export default function ProcessDialog({
  orderItem,
  nextAction,
}: ProcessDialogProps) {
  const [loading, setLoading] = React.useState(false);

  async function onStopOrderItem() {
    setLoading(true);
    const result = await Services.chefService.process(orderItem.id);
    setLoading(false);
    toast({
      title: result.error ? "Gagal" : "Berhasil",
      description: result.message ?? "Berhasil proses pesanan",
      variant: result.error ? "destructive" : "default",
    });
    if (!result.error) nextAction();
  }

  return (
    <DialogContainer onClick={onStopOrderItem}>
      <div className="flex gap-1 items-center">
        {loading ? <Spinner /> : (
          <>
            <Soup className="mr-2 h-4 w-4" />
            <span>Proses pesanan</span>
          </>
        )}
      </div>
    </DialogContainer>
  );
}
