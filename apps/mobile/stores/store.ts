import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import Cookies from "js-cookie";
import { StateStorage } from "zustand/middleware";

const webStorage: StateStorage = {
  getItem: (name: string): string | null => {
    if (typeof window !== "undefined") {
      return Cookies.get(name) || null;
    }
    return null;
  },
  setItem: (name: string, value: string): void => {
    if (typeof window !== "undefined") {
      Cookies.set(name, value, {
        expires: 7,
        secure: false, // DEV, in PROD use: true
        sameSite: "strict",
      });
    }
  },
  removeItem: (name: string): void => {
    if (typeof window !== "undefined") {
      Cookies.remove(name);
    }
  },
};

const mobileStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await SecureStore.getItemAsync(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const storage: StateStorage =
  Platform.OS === "web" ? webStorage : mobileStorage;
