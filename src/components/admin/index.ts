import { fnbColumns } from "./columns/fnb-columns";
import { orderColumns } from "./columns/order-columns";
import { tableColumns } from "./columns/table-columns";
import { userColumns } from "./columns/user-columns";
import AddTableDialog from "./dialogs/add-table-dialog";
import EditTableDialog from "./dialogs/edit-table-dialog";
import DeleteTableDialog from "./dialogs/delete-table-dialog";
import AddFnbDialog from "./dialogs/add-fnb-dialog";
import EditFnbDialog from "./dialogs/edit-fnb-dialog";
import DeleteFnbDialog from "./dialogs/delete-fnb-dialog";
import AddUserDialog from "./dialogs/add-user-dialog";
import EditUserDialog from "./dialogs/edit-user-dialog";
import DeleteUserDialog from "./dialogs/delete-user-dialog";

export const AdminColumns = {
  fnbColumns,
  tableColumns,
  orderColumns,
  userColumns,
};

export const AdminDialogs = {
  AddTableDialog,
  EditTableDialog,
  DeleteTableDialog,
  AddFnbDialog,
  EditFnbDialog,
  DeleteFnbDialog,
  AddUserDialog,
  EditUserDialog,
  DeleteUserDialog,
};
