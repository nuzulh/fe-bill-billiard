import { appStorage } from ".";

export const baseUrl = "/api";

export const defaultHeaders = {
  "Content-Type": "application/json",
};

export function applyAuthHeader(headers: any = defaultHeaders, token?: string) {
  const storageToken = appStorage.get("token");
  return {
    ...headers,
    Authorization: `Bearer ${token ?? storageToken}`,
  };
}

export const API = {
  get: async (path: string, init?: RequestInit) =>
    await fetch(baseUrl + path, {
      method: "GET",
      headers: { ...applyAuthHeader() },
      ...init,
    }).then(res => res.json()),

  post: async (path: string, body: any, init?: RequestInit) =>
    await fetch(baseUrl + path, {
      method: "POST",
      body: body ? JSON.stringify(body) : null,
      headers: { ...applyAuthHeader() },
      ...init,
    }).then(res => res.json()),

  put: async (path: string, body: any, init?: RequestInit) =>
    await fetch(baseUrl + path, {
      method: "PUT",
      body: body ? JSON.stringify(body) : null,
      headers: { ...applyAuthHeader() },
      ...init,
    }).then(res => res.json()),

  patch: async (path: string, body: any, init?: RequestInit) =>
    await fetch(baseUrl + path, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : null,
      headers: { ...applyAuthHeader() },
      ...init,
    }).then(res => res.json()),

  delete: async (path: string, init?: RequestInit) =>
    await fetch(baseUrl + path, {
      method: "DELETE",
      headers: { ...applyAuthHeader() },
      ...init,
    }).then(res => res.json()),
};
