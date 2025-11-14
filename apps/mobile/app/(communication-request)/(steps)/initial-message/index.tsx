import { Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Container } from "@/components/theme/Container";
import { MessageOptions } from "@/components/theme/MessageOptions";
import { TextInput } from "@/components/theme/TextInput";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function InitialMessage() {
  const { push } = useRouter();
  const [messageSelected, setMessageSelected] = useState<string>();

  return (
    <Container variant="screen">
      <Text variant="header" px="xl" mb="m" mt="xxxl">
        Escreva a sua mensagem inicial
      </Text>
      <Text variant="header2" px="xl" mb="xxl">
        Informe aqui o motivo do seu contato com o residente
      </Text>
      <MessageOptions
        messageSelected={messageSelected}
        setMessageSelected={setMessageSelected}
      />
      <TextInput
        value={messageSelected}
        autoFocus
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
