import { Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Container } from "@/components/theme/Container";
import { TextInput } from "@/components/theme/TextInput";
import { useRouter } from "expo-router";

export default function InitialMessage() {
  const { push } = useRouter();
  return (
    <Container variant="screen">
      <Text variant="header" px="xl" mb="m" mt="xxxl">
        Escreva a sua mensagem inicial
      </Text>
      <Text variant="header2" px="xl" mb="xxl">
        Informe aqui o motivo do seu contato com o residente
      </Text>
      <TextInput
        placeholder="Ex.: Entrega de comida"
        minHeight={120}
        multiline
      />
      <Button
        text="Continuar"
        marginTop="xl"
        onPress={() => push("/(communication-request)/(steps)/name")}
      />
    </Container>
  );
}
