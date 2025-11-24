import { RestyleFlashListProps } from "@/components/restyle";
import { FlashList } from "../FlashList";
import { useCommunicationRequestStore } from "@/stores/communicationRequestStore";
import { EmptyList } from "../EmptyList";
import useHousesByProvider from "@/hooks/useHousesByProvider";

export type ResidenceListProps = Omit<RestyleFlashListProps, "data">;

export const ResidenceList = ({ ...props }: ResidenceListProps) => {
  const provider = useCommunicationRequestStore((state) => state.provider);

  if (!provider) {
    return <EmptyList text="Nenhuma residência encontrada." />;
  }

  const residences = useHousesByProvider(provider.id);

  if (!residences.data || residences.data?.length === 0) {
    return <EmptyList text="Nenhuma residência encontrada." />;
  }

  return <FlashList {...props} data={residences.data.items || []} />;
};
