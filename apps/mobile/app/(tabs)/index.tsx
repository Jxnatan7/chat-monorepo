import { CommunicationRequestList } from "@/components/theme/CommunicationRequestList";
import { Container } from "@/components/theme/Container";
import { ListItem } from "@/components/theme/ListItem";
import { SearchInput } from "@/components/theme/SearchInput";
import { useRouter } from "expo-router";

export default function Home() {
  const { push } = useRouter();

  return (
    <Container
      variant="screen"
      containerHeaderProps={{ title: "Conversas", hideBackButton: true }}
    >
      <SearchInput containerProps={{ mb: "m", mt: "l" }} />

      <CommunicationRequestList
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
