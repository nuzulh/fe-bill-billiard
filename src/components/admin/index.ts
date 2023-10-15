import { fnbColumns } from "./columns/fnb-columns";
import { orderColumns } from "./columns/order-columns";
import { tableColumns } from "./columns/table-columns";
import AddTableDialog from "./dialogs/add-table-dialog";
import EditTableDialog from "./dialogs/edit-table-dialog";
import DeleteTableDialog from "./dialogs/delete-table-dialog";
import AddFnbDialog from "./dialogs/add-fnb-dialog";
import EditFnbDialog from "./dialogs/edit-fnb-dialog";
import DeleteFnbDialog from "./dialogs/delete-fnb-dialog";

export const AdminColumns = {
  fnbColumns,
  tableColumns,
  orderColumns,
};

export const AdminDialogs = {
  AddTableDialog,
  EditTableDialog,
  DeleteTableDialog,
  AddFnbDialog,
  EditFnbDialog,
  DeleteFnbDialog,
};
