import React, { useCallback } from "react";
import { RestyleFlashListProps } from "@/components/restyle";
import useCommunicationRequests from "@/hooks/useCommunicationRequests";
import { useAppStore } from "@/stores/appStore";
import { CommunicationRequestListEmpty } from "../CommunicationRequestListEmpty";
import { PaginatedFlashList, PaginatedResult } from "../PaginatedFlashList";

type RequestItem = any;

export type CommunicationRequestListProps = Omit<RestyleFlashListProps, "data">;

export const CommunicationRequestList = ({
  ...props
}: CommunicationRequestListProps) => {
  const house = useAppStore((state) => state.house);
  const { mutateAsync } = useCommunicationRequests();

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

  if (!house?.id) {
    return <CommunicationRequestListEmpty />;
  }

  return (
    <PaginatedFlashList<RequestItem>
      {...props}
      fetchData={fetchRequests}
      pageSize={10}
      ListEmptyComponent={
        <CommunicationRequestListEmpty
          showRedirect={false}
          text="Você não possui solicitações de comunicação no momento."
        />
      }
    />
  );
};
