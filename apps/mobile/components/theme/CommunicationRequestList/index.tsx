import { RestyleFlashListProps } from "@/components/restyle";
import { FlashList } from "../FlashList";
import useCommunicationRequests from "@/hooks/useCommunicationRequests";
import { useAppStore } from "@/stores/appStore";
import { CommunicationRequestListEmpty } from "../CommunicationRequestListEmpty";

export type CommunicationRequestList = RestyleFlashListProps;

export const CommunicationRequestList = ({
  ...props
}: CommunicationRequestList) => {
  const house = useAppStore((state) => state.house);

  if (!house?.id) {
    return <CommunicationRequestListEmpty />;
  }

  const communicationRequests = useCommunicationRequests(house?.id);

  return <FlashList {...props} data={communicationRequests.data} />;
};
