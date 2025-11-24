import { RestyleFlashListProps } from "@/components/restyle";
import { FlashList } from "../FlashList";
import useCommunicationRequests from "@/hooks/useCommunicationRequests";
import { useAppStore } from "@/stores/appStore";
import { CommunicationRequestListEmpty } from "../CommunicationRequestListEmpty";

export type CommunicationRequestList = Omit<RestyleFlashListProps, "data">;

export const CommunicationRequestList = ({
  ...props
}: CommunicationRequestList) => {
  const house = useAppStore((state) => state.house);

  if (!house?.id) {
    return <CommunicationRequestListEmpty />;
  }

  const communicationRequests = useCommunicationRequests(house?.id);

  if (!communicationRequests.data || communicationRequests.data?.length === 0) {
    return (
      <CommunicationRequestListEmpty
        showRedirect={false}
        text="Você não possui solicitações de comunicação no momento."
      />
    );
  }

  return <FlashList {...props} data={communicationRequests.data || []} />;
};
