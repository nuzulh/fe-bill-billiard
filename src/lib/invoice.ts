import { Order } from "@/types";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { formatCurrency, formatDuration, formatTime } from ".";
import logo from "../assets/images/logo.png";

function getPageHeight(order: Order) {
  const baseHeight = 68;
  if (order.order_items.length === 0) return baseHeight;
  return baseHeight + (order.order_items.length + 1) * 9;
}

function createInvoicePdf(order: Order) {
  const height = getPageHeight(order);
  console.log(height);
  const doc = new jsPDF("p", "mm", [58, height]);
  const width = doc.internal.pageSize.getWidth();
  // const height = doc.internal.pageSize.getHeight();
  const logoWidth = 30;
  const logoHeight = 10;

  let posY = 20;
  const textVerticalSpacing = 5;
  const nextLine = (n?: number) => (n ? (posY += n) : (posY += textVerticalSpacing));
  const fontSizes = { xs: 7, s: 8, m: 9, l: 10 };

  doc.addImage(
    logo,
    "PNG",
    width / 2 - logoWidth / 2,
    textVerticalSpacing,
    logoWidth,
    logoHeight,
  );

  doc.setFont("courier", "bold");
  doc.setFontSize(fontSizes.s);
  doc.text(
    formatTime(order.created_at),
    width / 2 - doc.getTextWidth(formatTime(order.created_at)) / 2,
    posY,
  );

  nextLine(textVerticalSpacing * 2);
  doc.setFontSize(fontSizes.m);
  doc.text("Kostumer", 5, posY);
  doc.text(order.costumer_name, width - 5, posY, { align: "right" });

  if (order.table) {
    nextLine();
    doc.text("Meja", 5, posY);
    doc.text(order.table, width - 5, posY, { align: "right" });
    nextLine();
    doc.text("Durasi", 5, posY);
    doc.text(formatDuration(order.duration), width - 5, posY, { align: "right" });
  }

  if (order.order_items.length > 0) {
    nextLine();
    doc.text(
      "----------F&B----------",
      width / 2 - doc.getTextWidth("----------F&B----------") / 2,
      posY,
    );
    order.order_items.forEach(x => {
      nextLine();
      doc.text(`${x.fnb}`, 5, posY);
      doc.text(`${x.quantity}x`, width - 5, posY, { align: "right" });
    });
    nextLine();
    doc.text(
      "-----------------------",
      width / 2 - doc.getTextWidth("-----------------------") / 2,
      posY,
    );
  }

  nextLine();
  doc.setFontSize(fontSizes.s);
  doc.text("Catatan:", 5, posY);
  nextLine();
  doc.text(order.note ?? "-", 5, posY);

  nextLine();
  doc.setFont("courier", "bold");
  doc.setFontSize(fontSizes.m);
  doc.text("Harga", 5, posY);
  doc.text(formatCurrency(order.price), width - 5, posY, { align: "right" });

  nextLine(textVerticalSpacing + 3);
  doc.setFont("courier", "bold");
  doc.setFontSize(fontSizes.xs);
  doc.text("Terima kasih telah berkunjung :)", 5, posY);

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

export function onPrintElement(elementId: string) {
  const doc = new jsPDF();
  const el = document.getElementById(elementId) as HTMLElement;
  doc.html(el);
  window.open(doc.output("bloburl"));
}

export function onPrintPng(filename: string) {
  const el = document.getElementById("order-print-area") as HTMLElement;
  toPng(el).then(url => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
  });
}
