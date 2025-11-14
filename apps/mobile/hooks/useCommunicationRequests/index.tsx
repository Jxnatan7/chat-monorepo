import CommunicationRequestService from "@/services/CommunicationRequestService";
import { useQuery } from "@tanstack/react-query";

const useCommunicationRequests = function (houseId: string) {
  const { isPending, error, data } = useQuery({
    queryKey: ["communication-requests", houseId],
    queryFn: () => CommunicationRequestService.listByHouseId(houseId),
  });

  return { isPending, error, data };
};

export default useCommunicationRequests;
