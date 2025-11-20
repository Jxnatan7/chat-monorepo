import { AuthService } from "@/services/AuthService";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "./store";
import { useAppStore } from "./appStore";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  houseId: string | null;
  isAuthenticated: boolean;

  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  setHouseId: (houseId: string | null) => void;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      houseId: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await AuthService.login(email, password);
          set({
            token: data.token,
            user: data.user,
            houseId: data.houseId ?? null,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Falha no login",
            isLoading: false,
          });
          throw error;
        }
      },

      register: async ({ name, email, password }) => {
        set({ isLoading: true, error: null });
        try {
          const data = await AuthService.register(name, email, password);
          set({
            token: data.token,
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Falha no cadastro",
            isLoading: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          houseId: null,
          isAuthenticated: false,
          error: null,
        });
        useAppStore.getState().clearAppData();
      },

      setHouseId: (houseId) => set({ houseId }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
