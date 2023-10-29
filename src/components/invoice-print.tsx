import { Order } from "@/types";
import { formatCurrency, formatDuration, formatTime } from "@/lib";
import arcadiaLogo from "@/assets/images/logo.png";
// import "@/assets/styles/print.css";

type InvoicePrintProps = {
  order: Order;
};

export function InvoicePrint({
  order,
}: InvoicePrintProps) {
  return (
    <div
      id="order-print-area"
      className="flex flex-col p-8 items-center justify-center w-96 gap-2 bg-white text-black font-mono"
    >
      <img
        alt="arcadia-logo"
        src={arcadiaLogo}
        width="65%"
      />
      <p className="pb-4">{formatTime(order.created_at ?? new Date())}</p>
      <div className="flex w-full justify-between">
        <p>Kostumer</p>
        <p>{order.costumer_name}</p>
      </div>
      <div className="flex w-full justify-between">
        <p>Meja</p>
        <p>{order.table}</p>
      </div>
      <div className="flex w-full justify-between">
        <p>Durasi</p>
        <p>{formatDuration(order.duration ?? 0)}</p>
      </div>
      {order.order_items.length ?? 0 > 0 ? (
        <>
          <p>----------F&B----------</p>
          {order.order_items.map((x, i) => (
            <div key={i} className="flex w-full justify-between">
              <p>{`${x.fnb}`}</p>
              <p>{x.quantity}x</p>
            </div>
          ))}
          <p>-----------------------</p>
        </>
      ) : null}
      <p className="self-start">Catatan:</p>
      <p className="self-start text-sm">{order.note ?? "-"}</p>
      <div className="flex w-full justify-between font-bold">
        <p>Harga</p>
        <p>{formatCurrency(order.price ?? 0)}</p>
      </div>
      <p className="text-sm pt-4">Terima kasih telah berkunjung {":)"}</p>
    </div>
  );
}
