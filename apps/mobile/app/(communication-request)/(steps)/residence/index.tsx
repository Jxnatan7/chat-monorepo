import { Container } from "@/components/theme/Container";
import { ListItem } from "@/components/theme/ListItem";
import { ResidenceList } from "@/components/theme/ResidenceList";
import { SearchInput } from "@/components/theme/SearchInput";
import { useRouter } from "expo-router";

export default function Residence() {
  const { push } = useRouter();
  return (
    <Container variant="screen" containerHeaderProps={{ title: "Residentes" }}>
      <SearchInput containerProps={{ my: "m" }} />
      <ResidenceList
        renderItem={() => (
          <ListItem
            title="Residente 1"
            subtitle="Residente 1"
            onPress={() => push("/chat")}
          />
        )}
      />
    </Container>
  );
}
