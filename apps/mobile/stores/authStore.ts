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
  token: string;
  houseId: string | null;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  houseId: string | null;
  isAuthenticated: boolean;

  isLoading: boolean;
  error: string | null;

  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;

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
      _hasHydrated: false,
      setHasHydrated: (state: boolean) => set({ _hasHydrated: state }),

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
          AuthService.register(name, email, password).then(({ user: data }) => {
            set({
              token: data.token,
              user: data,
              isAuthenticated: true,
              isLoading: false,
            });
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
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
