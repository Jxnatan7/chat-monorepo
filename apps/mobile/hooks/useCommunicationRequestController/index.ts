import { useCallback, useEffect } from "react";
import { useAppStore } from "@/stores/appStore";
import { useAuthStore } from "@/stores/authStore";
import useCommunicationRequests from "@/hooks/useCommunicationRequests";
import useCommunicationRequestsSocket from "@/hooks/useCommunicationRequestsSocket";
import { PaginatedResult } from "@/components/theme/PaginatedFlashList";

type RequestItem = any;

export function useCommunicationRequestController() {
  const house = useAppStore((state) => state.house);
  const fetchUserResidence = useAppStore((state) => state.fetchUserResidence);
  const userToken = useAuthStore((s) => s.token);

  const { mutateAsync } = useCommunicationRequests();

  const {
    newRequests,
    status: connectionStatus,
    clearNewRequests,
  } = useCommunicationRequestsSocket({
    token: userToken,
  });

  useEffect(() => {
    if (!house?.id) {
      fetchUserResidence();
    }
  }, [house, fetchUserResidence]);

  const fetchRequests = useCallback(
    async (
      page: number,
      pageSize: number
    ): Promise<PaginatedResult<RequestItem> | undefined> => {
      if (!house?.id) return undefined;

      if (page === 1) {
        clearNewRequests();
      }

      const response = await mutateAsync({
        houseId: house.id,
        payload: {
          page,
          pageSize,
        },
      });

      return response;
    },
    [house?.id, mutateAsync, clearNewRequests]
  );

  return {
    house,
    fetchRequests,
    newRequests,
    connectionStatus,
  };
}
