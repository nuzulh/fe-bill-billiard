type AppStorage = {
  token: string;
};

type AppStorageKeys = keyof AppStorage;

export const appStorage = {
  get: (key: AppStorageKeys) => localStorage.getItem(key),
  set: (
    key: AppStorageKeys,
    value: AppStorage
  ) => localStorage.setItem(key, value[key]),
  remove: (key: AppStorageKeys) => localStorage.removeItem(key),
};
