import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import HouseService from "@/services/HouseService";
import ProviderService from "@/services/ProviderService";
import { storage } from "./store";
import UserService from "@/services/UserService";
import { useAuthStore } from "./authStore";

export type Provider = { id: string; name: string; description: string };
export type House = {
  id: string;
  providerId: string;
  name: string;
  address: string;
  description: string;
};

export type SaveResidencePayload = {
  provider: Omit<Provider, "id">;
  house: Omit<House, "id" | "providerId">;
};

type AppState = {
  provider: Provider | null;
  house: House | null;
  isLoading: boolean;
  error: string | null;

  setupResidence: (payload: SaveResidencePayload) => Promise<void>;
  setupUser: (payload: any) => Promise<void>;
  clearAppData: () => void;
};

const upsertProvider = async (
  current: Provider | null,
  data: SaveResidencePayload["provider"]
) => {
  return current?.id
    ? ProviderService.update(current.id, data)
    : ProviderService.create(data);
};

const upsertHouse = async (
  current: House | null,
  providerId: string,
  data: SaveResidencePayload["house"]
) => {
  const payload = { ...data, providerId };
  return current?.id
    ? HouseService.update(current.id, payload)
    : HouseService.create(payload);
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      provider: null,
      house: null,
      isLoading: false,
      error: null,

      setupResidence: async (payload) => {
        set({ isLoading: true, error: null });
        const { provider: currentProvider, house: currentHouse } = get();

        try {
          const providerResponse = await upsertProvider(
            currentProvider,
            payload.provider
          );

          if (!providerResponse?.id)
            throw new Error("ID do Gerenciador inválido.");

          const houseResponse = await upsertHouse(
            currentHouse,
            providerResponse.id,
            payload.house
          );

          set({
            provider: providerResponse,
            house: houseResponse,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || "Falha ao salvar dados.",
            isLoading: false,
          });
          throw error;
        }
      },
      setupUser: async (payload) => {
        set({ isLoading: true, error: null });
        const { user } = useAuthStore.getState();

        if (!user) {
          throw new Error("Usuário não encontrado.");
        }

        try {
          const data = await UserService.update(user.id, payload);

          if (!data) {
            set({
              isLoading: false,
            });
            return;
          }

          useAuthStore.setState({
            user: data,
          });

          set({
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

      clearAppData: () => set({ provider: null, house: null, error: null }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
