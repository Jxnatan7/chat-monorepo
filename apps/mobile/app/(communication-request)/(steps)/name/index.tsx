import { Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Container } from "@/components/theme/Container";
import { TextInput } from "@/components/theme/TextInput";
import useCreateCommunicationRequest from "@/hooks/useCreateCommunicationRequest";
import { useCommunicationRequestStore } from "@/stores/communicationRequestStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform } from "react-native";

export default function Name() {
  const { push } = useRouter();
  const [name, setName] = useState<string>();
  console.log("🚀 ~ Name ~ name:", name);
  const { mutateAsync } = useCreateCommunicationRequest();

  const handleSubmit = () => {
    if (!name) return;
    useCommunicationRequestStore.getState().setVisitorName(name);

    const payload = useCommunicationRequestStore.getState().getPayload();

    mutateAsync(payload).then((response) => {
      useCommunicationRequestStore.getState().setResponse(response);
      push("/awaiting-validation");
    });
  };

  return (
    <Container variant="screen">
      <Text variant="header" px="xl" mb="m" mt="xxxl">
        Insira o seu nome
      </Text>
      <Text variant="header2" px="xxxl" mb="xxl">
        O seu nome é essencial para que o residente aceite a sua solicitação
      </Text>
      <TextInput
        autoFocus
        placeholder="O seu nome..."
        onEndEditing={({ nativeEvent }) => setName(nativeEvent.text)}
        onChangeText={(text) => Platform.OS === "web" && setName(text)}
      />
      <Button
        onPress={() => handleSubmit()}
        text="Continuar"
        marginTop="xxxl"
        disabled={!name}
        style={{
          justifyContent: "center",
          alignItems: "center",
          opacity: name ? 1 : 0.5,
        }}
      />
    </Container>
  );
}
