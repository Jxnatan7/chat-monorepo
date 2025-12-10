import { useCallback, useEffect } from "react";
import { useAppStore } from "@/stores/appStore";
import useCommunicationRequests from "@/hooks/useCommunicationRequests";
import { PaginatedResult } from "@/components/theme/PaginatedFlashList";

type RequestItem = any;

export function useCommunicationRequestList() {
  const house = useAppStore((state) => state.house);
  const fetchUserResidence = useAppStore((state) => state.fetchUserResidence);

  const { mutateAsync } = useCommunicationRequests();

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

      const response = await mutateAsync({
        houseId: house.id,
        payload: {
          page,
          pageSize,
        },
      });

      return response;
    },
    [house?.id, mutateAsync]
  );

  return {
    house,
    fetchRequests,
  };
}
