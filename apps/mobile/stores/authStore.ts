import axiosClient from "@/api/axiosClient";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  houseId: string | null;

  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setHouseId: (houseId: string | null) => void;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      houseId: null,

      setToken: (token) => {
        set({ token });
        if (token) {
          axiosClient.defaults.headers.common = {
            ...(axiosClient.defaults.headers.common || {}),
            Authorization: `Bearer ${token}`,
          };
        } else {
          if (
            axiosClient.defaults.headers &&
            axiosClient.defaults.headers.common
          ) {
            delete axiosClient.defaults.headers.common.Authorization;
          }
        }
      },

      setUser: (user) => set({ user }),

      setHouseId: (houseId) => set({ houseId }),

      login: async (email: string, password: string) => {
        try {
          const response = await axiosClient.post("/auth/login", {
            email,
            password,
          });
          const { token: authToken, user: authUser, houseId } = response.data;

          set({
            token: authToken,
            user: authUser,
            houseId: houseId ?? null,
          });

          axiosClient.defaults.headers.common = {
            ...(axiosClient.defaults.headers.common || {}),
            Authorization: `Bearer ${authToken}`,
          };
        } catch (error) {
          console.error("Auth login error:", error);
          throw error;
        }
      },

      logout: () => {
        set({ token: null, user: null, houseId: null });
        if (
          axiosClient.defaults.headers &&
          axiosClient.defaults.headers.common
        ) {
          delete axiosClient.defaults.headers.common.Authorization;
        }
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        try {
          if (state && state.token) {
            axiosClient.defaults.headers.common = {
              ...(axiosClient.defaults.headers.common || {}),
              Authorization: `Bearer ${state.token}`,
            };
          }
        } catch {}
      },
    }
  )
);
