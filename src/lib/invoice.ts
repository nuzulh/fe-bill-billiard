import { Order } from "@/types";

export function onPrint(order: Order) {
  console.log(order);
  window.print();
}

export function onDownload(order: Order) {
  console.log(order);
  console.log("download");
}
