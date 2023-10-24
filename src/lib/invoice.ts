import { Order } from "@/types";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";
import { formatCurrency, formatDuration, formatTime } from ".";

function createInvoicePdf(order: Order) {
  const doc = new jsPDF("p", "mm", [58, 60 + order.order_items.length * 2]);
  const width = doc.internal.pageSize.getWidth();
  // const height = doc.internal.pageSize.getHeight();
  const logoWidth = 30;
  const logoHeight = 10;

  doc.addImage(logo, "PNG", width / 2 - (logoWidth / 2), 0, logoWidth, logoHeight);
  doc.setFont("courier");
  doc.setFontSize(5);
  doc.text(formatTime(order.created_at), width / 2 - (doc.getTextWidth(formatTime(order.created_at)) / 2), 13);

  doc.setFontSize(6);
  doc.text("Kostumer", 5, 20);
  doc.text(order.costumer_name, width - 5, 20, { align: "right" });

  let posY = 20;

  if (order.table) {
    doc.text("Meja", 5, 23);
    doc.text(order.table, width - 5, 23, { align: "right" });
    doc.text("Durasi", 5, 26);
    doc.text(formatDuration(order.duration), width - 5, 26, { align: "right" });
    posY = 26;
  }
  posY += 3;

  if (order.order_items.length > 0) {
    doc.text("----------F&B----------", width / 2 - (doc.getTextWidth("----------F&B----------") / 2), posY);
    order.order_items.forEach((x) => {
      doc.text(`${x.fnb}`, 5, posY + 3);
      doc.text(`${x.quantity}x`, width - 5, posY + 3, { align: "right" });
      posY += 3;
    });
    doc.text("-----------------------", width / 2 - (doc.getTextWidth("-----------------------") / 2), posY + 3);
    posY += 6;
  }

  doc.setFontSize(5);
  doc.text("Catatan:", 5, posY);
  doc.text(order.note ?? "-", 5, posY + 3);

  doc.setFont("courier", "bold");
  doc.setFontSize(6);
  doc.text("Harga", 5, posY + 6);
  doc.text(formatCurrency(order.price), width - 5, posY + 6, { align: "right" });

  doc.setFont("courier", "normal");
  doc.setFontSize(5);
  doc.text("Terima kasih telah berkunjung :)", 5, posY + 12);

  return doc;
}

export function onPrint(order: Order) {
  const pdf = createInvoicePdf(order);
  // pdf.autoPrint();
  window.open(pdf.output("bloburl"));
}

export function onDownload(order: Order) {
  const pdf = createInvoicePdf(order);
  pdf.save(`INVOICE_${order.costumer_name}_${order.id}.pdf`);
}
