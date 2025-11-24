import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { storage } from "./store";
import { House, Provider } from "./appStore";

export type CommunicationRequestState = {
  code: string | null;
  provider: Provider | null;
  house: House | null;
  initialMessage: string | null;
  visitorId: string | null;
  visitorName: string | null;
  visitorToken: string | null;
  isLoading: boolean;
  error: string | null;
  communicationRequestId: string | null;
  getPayload: () => {
    providerId: string;
    houseId: string;
    initialMessage: string;
    visitorName: string;
  };
  setResponse: (response: any) => void;
  setVisitorName: (name: string) => void;
  setCode: (code: string) => void;
  setProvider: (provider: Provider) => void;
  setHouse: (house: House) => void;
  setInitialMessage: (message: string) => void;
  clearAppData: () => void;
};

export const useCommunicationRequestStore = create<CommunicationRequestState>()(
  persist(
    (set, get) => ({
      code: null,
      provider: null,
      house: null,
      communicationRequestId: null,
      initialMessage: null,
      visitorId: null,
      visitorName: null,
      visitorToken: null,
      isLoading: false,
      error: null,
      getPayload: () => ({
        providerId: get().provider?.id ?? "",
        houseId: get().house?.id ?? "",
        initialMessage: get().initialMessage ?? "",
        visitorName: get().visitorName ?? "",
      }),
      setResponse: (response: any) => {
        set({
          visitorId: response.visitorId,
          visitorToken: response.visitorToken,
          communicationRequestId: response.id,
        });
      },
      setCode: (code: string) => set({ code }),
      setProvider: (provider: Provider) => set({ provider }),
      setHouse: (house: House) => set({ house }),
      setInitialMessage: (message: string) => set({ initialMessage: message }),
      setVisitorName: (name: string) => set({ visitorName: name }),
      clearAppData: () =>
        set({ code: null, provider: null, error: null, isLoading: false }),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => storage),
    }
  )
);
