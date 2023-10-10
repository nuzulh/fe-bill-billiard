import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import logoDark from "../assets/logo-dark.png";
import { ModeToggle } from "./mode-toggle";
import { DecodedToken } from "@/hooks";
import { Button } from "./ui/button";
import { CandlestickChart, ChevronDown, ConciergeBell, ListOrdered, LogOut, Tablets, Users, UtensilsCrossed } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { UserRole } from "@/types";
import { Services } from "@/services";
import { validateRole } from "@/lib";

type AppLayoutProps = {
  authUser: DecodedToken | null;
};

export function AppLayout({ authUser }: AppLayoutProps) {
  const navigate = useNavigate();

  React.useEffect(() => {
    validateRole(authUser, navigate);
  }, []);

  return (
    <>
      <div className="bg-secondary h-16 border-b border-s-zinc-200 sticky w-full z-10 top-0 flex">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <img
              className="block dark:hidden"
              src={logo}
              alt="logo"
              height={45}
              width={130}
            />
            <img
              className="hidden dark:block"
              src={logoDark}
              alt="logo"
              height={45}
              width={130}
            />
          </Link>
          <div className="flex gap-2">
            <ModeToggle />
            {authUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default" className="flex justify-center gap-3">
                    <p>{authUser.name ?? authUser.email.split("@")[0]}</p>
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-primary text-primary-foreground">
                  {authUser.role === UserRole.admin ? (
                    <>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onClick={() => navigate("/")}
                      >
                        <CandlestickChart className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onClick={() => {}}
                      >
                        <Tablets className="mr-2 h-4 w-4" />
                        <span>Data Meja</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onClick={() => navigate("/admin/fnb")}
                      >
                        <UtensilsCrossed className="mr-2 h-4 w-4" />
                        <span>Data F&B</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onClick={() => {}}
                      >
                        <ListOrdered className="mr-2 h-4 w-4" />
                        <span>Data Orderan</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onClick={() => {}}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        <span>Data Pengguna</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onClick={() => navigate("/cashier")}
                      >
                        <ConciergeBell className="mr-2 h-4 w-4" />
                        <span>Kasir</span>
                      </DropdownMenuItem>
                    </>
                  ) : null}
                  <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onClick={() => Services.userService.logout(navigate)}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </div>
      </div>
      {!authUser ? (
        <div className="h-[90vh] w-screen flex flex-col justify-center items-center">
          <div className="bg-secondary p-10 rounded-md">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="h-[90vh] w-screen flex flex-col p-4">
          <Outlet />
        </div>
      )}
    </>
  );
}
