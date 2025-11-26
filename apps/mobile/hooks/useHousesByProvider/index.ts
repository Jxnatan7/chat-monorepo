import HouseService from "@/services/HouseService";
import { useQuery } from "@tanstack/react-query";

const useHousesByProvider = function (providerId: string) {
  const { isPending, error, data } = useQuery({
    queryKey: ["chat-messages", providerId],
    queryFn: () => HouseService.findByProviderId(providerId),
  });

  return { isPending, error, data };
};

export default useHousesByProvider;
