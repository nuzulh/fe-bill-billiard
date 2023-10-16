import BillingTab from "./tabs/billing-tab";
import FnbTab from "./tabs/fnb-tab";
import OrderTab from "./tabs/order-tab";
import TableCard from "./cards/table-card";
import FnbCard from "./cards/fnb-card";
import FillTableDialog from "./dialogs/fill-table";
import EditFnbOrderDialog from "./dialogs/edit-fnb-order";
import StopTableDialog from "./dialogs/stop-table";
import AddDurationDialog from "./dialogs/add-duration";
import OrderFnbDialog from "./dialogs/order-fnb";
import PayOrderDialog from "./dialogs/pay-order";
import InvoiceDialog from "./dialogs/invoice";
import { orderColumns } from "./columns/order-columns";

export const CashierTabs = {
  BillingTab,
  FnbTab,
  OrderTab,
};

export const CashierCards = {
  TableCard,
  FnbCard,
};

export const CashierDialogs = {
  FillTableDialog,
  EditFnbOrderDialog,
  StopTableDialog,
  AddDurationDialog,
  OrderFnbDialog,
  PayOrderDialog,
  InvoiceDialog,
};

export const CashierColumns = {
  orderColumns,
};
