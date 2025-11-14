import { Text } from "@/components/restyle";
import CodeInput from "@/components/theme/CodeInput";
import { Container } from "@/components/theme/Container";
import { useRouter } from "expo-router";

export default function Code() {
  const { push } = useRouter();
  return (
    <Container variant="screen">
      <Text variant="header" mt="xxxl">
        Digite o código
      </Text>
      <Text variant="header2" mt="m" px="xl" mb="xxl">
        Insira aqui o código do Condomínio ou da Residência
      </Text>
      <CodeInput
        autoFocus
        onFullfill={() => push("/(communication-request)/(steps)/residence")}
      />
    </Container>
  );
}
