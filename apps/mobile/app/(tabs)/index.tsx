import { Container } from "@/components/theme/Container";
import { FlashList } from "@/components/theme/FlashList";
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
      <FlashList
        data={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ]}
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
