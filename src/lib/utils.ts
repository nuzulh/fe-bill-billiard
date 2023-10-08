import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NavigateFunction } from "react-router-dom";
import { DecodedToken } from "@/hooks";
import { UserRole } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateRole(
  authUser: DecodedToken | null,
  navigate: NavigateFunction
) {
  const location = window.location.pathname.split("/");
  if (!authUser) return;
  if (
    authUser.role !== UserRole.admin &&
    !location.includes(authUser.role)
  ) navigate("/", { replace: true });
}
