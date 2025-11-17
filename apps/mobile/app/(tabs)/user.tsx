import { Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Container } from "@/components/theme/Container";
import { TextInput } from "@/components/theme/TextInput";
import { useAuth } from "@/contexts/AuthProvider";

export default function User() {
  const { user } = useAuth();

  return (
    <Container
      variant="screen"
      containerHeaderProps={{ title: "Seu Perfil", hideBackButton: true }}
    >
      <Text width="100%" textAlign="left" variant="infoTitle" my="l">
        Usuário
      </Text>
      <TextInput value={user?.name} label="Nome" placeholder="Seu Nome" />
      <TextInput
        value={user?.email}
        containerProps={{ marginTop: "s" }}
        label="Email"
        placeholder="Seu Email"
      />
      <TextInput
        // value={user?.phone}
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
