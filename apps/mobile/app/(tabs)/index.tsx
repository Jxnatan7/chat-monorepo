import { Box, Container, Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Image } from "expo-image";

export default function TabOneScreen() {
  return (
    <Container variant="screen">
      <Image
        source={require("@/assets/images/init-image.svg")}
        style={{ width: 262, height: 271, marginTop: 200 }}
        contentFit="cover"
        cachePolicy="memory"
      />
      <Box
        width="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        px="xl"
        mt="xl"
        mb="xl"
      >
        <Text variant="header" textAlign="center">
          Conecte-se de forma simples e rápida com qualquer pessoa.
        </Text>
      </Box>

      <Box width="100%" flex={1} alignItems="center" justifyContent="flex-end">
        <Text variant="body" textAlign="center">
          Termos e Política de Privacidade
        </Text>
        <Button text="Começar a conversar" marginVertical="s" />
        <Button text="Fazer Login" variant="secondary" />
      </Box>
    </Container>
  );
}
