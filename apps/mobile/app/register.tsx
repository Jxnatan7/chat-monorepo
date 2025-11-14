import { Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Container } from "@/components/theme/Container";
import { TextInput } from "@/components/theme/TextInput";
import { useRouter } from "expo-router";

export default function Register() {
  const { push } = useRouter();
  return (
    <Container variant="screen">
      <Text variant="header" mt="xxxl">
        Crie a sua conta
      </Text>
      <TextInput autoFocus marginTop="xl" placeholder="Nome" />
      <TextInput marginTop="m" placeholder="E-mail" />
      <TextInput marginTop="m" placeholder="Senha" secureTextEntry />
      <Button
        text="Continuar"
        marginTop="xxxl"
        onPress={() => push("/(tabs)")}
      />
      <Button
        variant="secondary"
        text="Criar Conta"
        marginTop="s"
        onPress={() => push("/register")}
      />
    </Container>
  );
}
