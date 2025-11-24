import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { storage } from "./store";
import { Provider } from "./appStore";

export type CommunicationRequestState = {
  code: string | null;
  provider: Provider | null;
  isLoading: boolean;
  error: string | null;
  clearAppData: () => void;
};

export const useCommunicationRequestStore = create<CommunicationRequestState>()(
  persist(
    (set, get) => ({
      code: null,
      provider: null,
      isLoading: false,
      error: null,
      clearAppData: () =>
        set({ code: null, provider: null, error: null, isLoading: false }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
