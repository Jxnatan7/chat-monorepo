import React from "react";
import { View } from "react-native";
import { RestyleFlashListProps } from "@/components/restyle";
import { CommunicationRequestListEmpty } from "../CommunicationRequestListEmpty";
import { PaginatedFlashList } from "../PaginatedFlashList";
import { useCommunicationRequestController } from "@/hooks/useCommunicationRequestController";

type RequestItem = any;

export type CommunicationRequestListProps = Omit<
  RestyleFlashListProps,
  "data"
> & {
  renderItem: any;
};

export const CommunicationRequestList = ({
  renderItem,
  ...props
}: CommunicationRequestListProps) => {
  const { house, fetchRequests, newRequests } =
    useCommunicationRequestController();

  const renderNewRequestsHeader = () => {
    if (newRequests.length === 0) return null;

    return (
      <View>
        {newRequests.map((item, index) => (
          <View key={`new-${item.id || index}`}>
            {renderItem({
              item,
              index,
              target: "Cell",
              extraData: props.extraData,
            })}
          </View>
        ))}
      </View>
    );
  };

  if (!house?.id) {
    return <CommunicationRequestListEmpty />;
  }

  return (
    <PaginatedFlashList<RequestItem>
      {...props}
      renderItem={renderItem}
      fetchData={fetchRequests}
      pageSize={10}
      ListHeaderComponent={renderNewRequestsHeader}
      ListEmptyComponent={
        newRequests.length > 0 ? undefined : (
          <CommunicationRequestListEmpty
            showRedirect={false}
            text="Você não possui solicitações de comunicação no momento."
          />
        )
      }
    />
  );
};
