import jwtDecode from "jwt-decode";
import { appStorage } from "@/lib";
import { UserRole } from "@/types";

export type DecodedToken = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
};

export function useAuthUser(): DecodedToken | null {
  const token = appStorage.get("token");
  if (!token) return null;

  const decodedToken: DecodedToken = jwtDecode(token);
  const isValid = decodedToken.exp * 1000 > Date.now();

  return isValid ? decodedToken : null;
}
