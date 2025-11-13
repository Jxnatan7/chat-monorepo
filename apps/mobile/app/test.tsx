import { Text } from "@/components/restyle";
import CodeInput from "@/components/theme/CodeInput";
import Container from "@/components/theme/Container";
import { TextInput } from "@/components/theme/TextInput";

export default function Test() {
  return (
    <Container variant="screen">
      <Text variant="header" mb="xl">
        Test
      </Text>
      <TextInput variant="default" placeholder="Nome" marginBottom="xl" />
      <CodeInput length={6} onFullfill={() => {}} />
    </Container>
  );
}
