import { Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Container } from "@/components/theme/Container";
import { TextInput } from "@/components/theme/TextInput";
import { useRouter } from "expo-router";

export default function User() {
  const { push } = useRouter();

  return (
    <Container
      variant="screen"
      containerHeaderProps={{ title: "Seu Perfil", hideBackButton: true }}
    >
      <Text width="100%" textAlign="left" variant="infoTitle" my="l">
        Usuário
      </Text>
      <TextInput label="Nome" placeholder="Seu Nome" />
      <TextInput
        containerProps={{ marginTop: "s" }}
        label="Email"
        placeholder="Seu Email"
      />
      <TextInput
        containerProps={{ marginTop: "s" }}
        label="Telefone"
        placeholder="Seu Telefone"
      />

      <Button
        text="Salvar"
        variant="primary"
        alignSelf="center"
        marginTop="xxl"
      />
    </Container>
  );
}
