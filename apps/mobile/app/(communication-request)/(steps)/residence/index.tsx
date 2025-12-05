import { Container } from "@/components/theme/Container";
import { ListItem } from "@/components/theme/ListItem";
import { ResidenceList } from "@/components/theme/ResidenceList";
import { SearchInput } from "@/components/theme/SearchInput";
import { useCommunicationRequestStore } from "@/stores/communicationRequestStore";
import { useRouter } from "expo-router";

export default function Residence() {
  const { push } = useRouter();

  const handleSelect = (house: any) => {
    if (!house) return;

    useCommunicationRequestStore.getState().setHouse({
      ...house,
      id: house._id,
    });

    push("/(communication-request)/(steps)/initial-message");
  };

  return (
    <Container variant="screen" containerHeaderProps={{ title: "Residentes" }}>
      <SearchInput containerProps={{ my: "m" }} />
      <ResidenceList
        keyExtractor={(item: any) => item._id}
        renderItem={({ item }: any) => (
          <ListItem
            title={item.name}
            subtitle={item.description}
            onPress={() => handleSelect(item)}
          />
        )}
      />
    </Container>
  );
}
