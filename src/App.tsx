import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthPages } from "./pages/auth";
import { AdminPages } from "./pages/admin";
import { useAuthUser } from "./hooks";
import { appStorage } from "./lib";
import { useToast } from "./components/ui/use-toast";
import { CashierPages } from "./pages/cashier";
import { ChefPages } from "./pages/chef";
import { UserPages } from "./pages/user";

export default function App() {
  const user = useAuthUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  React.useEffect(() => {
    if (!user && !appStorage.get("token")) {
      toast({
        title: "Token telah kedaluwarsa",
        description: "Silahkan login kembali",
        variant: "destructive",
      });
      navigate("/auth/login", { replace: true });
    }
  }, []);

  return (
    <Routes>
      <Route index element={<Navigate to={!user ? "/auth" : `/${user.role}`} />} />

      <Route path="/auth">
        <Route index element={<Navigate to="/auth/login" />} />
        <Route path="login" element={<AuthPages.LoginPage />} />
        <Route path="register" element={<AuthPages.RegisterPage />} />
      </Route>

      <Route path="/admin">
        <Route index element={<AdminPages.DashboardPage />} />
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

    </Routes>
  );
}
