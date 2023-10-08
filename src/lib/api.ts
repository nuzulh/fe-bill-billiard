import { appStorage } from ".";

export const baseUrl = "https://be-bill-billiard-production.up.railway.app/api";

export const defaultHeaders = {
  "Content-Type": "application/json",
};

export function applyAuthHeader(
  headers: any = defaultHeaders,
  token?: string
) {
  const storageToken = appStorage.get("token");
  return {
    ...headers,
    Authorization: token ?? storageToken,
  };
}

export const API = {
  get: async (path: string, init?: RequestInit) =>
    await fetch(
      baseUrl + path,
      {
        method: "GET",
        headers: { ...applyAuthHeader() },
        ...init,
      },
    ).then((res) => res.json()),

  post: async (path: string, body: any, init?: RequestInit) =>
    await fetch(
      baseUrl + path,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { ...applyAuthHeader() },
        ...init,
      },
    ).then((res) => res.json()),

  put: async (path: string, body: any, init?: RequestInit) =>
    await fetch(
      baseUrl + path,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { ...applyAuthHeader() },
        ...init,
      },
    ).then((res) => res.json()),

  delete: async (path: string, init?: RequestInit) =>
    await fetch(
      baseUrl + path,
      {
        method: "DELETE",
        headers: { ...applyAuthHeader() },
        ...init,
      },
    ).then((res) => res.json()),
};
