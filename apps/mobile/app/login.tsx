import { Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Container } from "@/components/theme/Container";
import { TextInput } from "@/components/theme/TextInput";
import { useRouter } from "expo-router";

export default function Login() {
  const { push } = useRouter();
  return (
    <Container variant="screen">
      <Text variant="header" mt="xxxl">
        Faça o seu Login
      </Text>
      <TextInput marginTop="xl" placeholder="E-mail" />
      <TextInput marginTop="m" placeholder="Senha" secureTextEntry />
      <Button
        text="Continuar"
        marginTop="xxxl"
        onPress={() => push("/(tabs)")}
      />
    </Container>
  );
}
