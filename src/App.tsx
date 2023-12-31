import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AppLayout } from "./components";
import { useAuthUser } from "./hooks";
import { appStorage } from "./lib";
import { AdminPages, AuthPages, CashierPages, ChefPages, CommonPages, UserPages } from "./pages";
import { toast } from "./components/ui/use-toast";

export default function App() {
  const authUser = useAuthUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authUser && appStorage.get("token")) {
      toast({
        title: "Token telah kedaluwarsa",
        description: "Silahkan login kembali",
        variant: "destructive",
      });
      appStorage.remove("token");
      navigate("/auth/login", { replace: true });
    }
  }, [authUser, navigate]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout authUser={authUser} />}>
        <Route
          index
          element={<Navigate to={!authUser ? "/auth" : `/${authUser.role}`} />}
        />

        <Route path="/auth">
          <Route index element={<Navigate to="/auth/login" />} />
          <Route path="login" element={<AuthPages.LoginPage />} />
          <Route path="register" element={<AuthPages.RegisterPage />} />
        </Route>

        <Route path="/admin">
          <Route index element={<AdminPages.DashboardPage />} />
          <Route path="fnb" element={<AdminPages.FnbPage />} />
          <Route path="table" element={<AdminPages.TablePage />} />
          <Route path="order" element={<AdminPages.OrderPage />} />
          <Route path="user" element={<AdminPages.UserPage />} />
        </Route>

        <Route path="/cashier">
          <Route index element={<CashierPages.DashboardPage />} />
        </Route>

        <Route path="/chef">
          <Route index element={<ChefPages.DashboardPage />} />
        </Route>

        <Route path="/user">
          <Route index element={<UserPages.DashboardPage />} />
        </Route>
      </Route>

      <Route path="*" element={<CommonPages.NotFoundPage />} />
    </Routes>
  );
}
