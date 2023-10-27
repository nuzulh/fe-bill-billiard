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

export function formatCurrency(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  }).format(new Date(date));
}

export function formatTime(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(new Date(date));
}

export function formatDuration(num: number) {
  if (`${num}`.startsWith("0"))
    return `${num * 60} Menit`;
  return `${num} Jam`;
}

export function parseInitial(name: string) {
  return name.split(" ")[1] === undefined
    ? name[0] +
    name[name.length - 1]
    : name.split(" ")[0][0] +
    name.split(" ")[1][0];
}
