import { Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Container } from "@/components/theme/Container";
import { TextInput } from "@/components/theme/TextInput";
import { useRouter } from "expo-router";

export default function Name() {
  const { push } = useRouter();
  return (
    <Container variant="screen">
      <Text variant="header" px="xl" mb="m" mt="xxxl">
        Insira o seu nome
      </Text>
      <Text variant="header2" px="xxxl" mb="xxl">
        O seu nome é essencial para que o residente aceite a sua solicitação
      </Text>
      <TextInput autoFocus placeholder="O seu nome..." />
      <Button text="Continuar" marginTop="xxxl" />
    </Container>
  );
}
