import { Box, RestylePressable, Text } from "@/components/restyle";

export const CommunicationRequestListEmpty = () => {
  return (
    <Box>
      <Text textAlign="center">
        Você ainda não possui um gerenciador e uma residência cadastrada, que
        tal criar uma?
      </Text>
      <RestylePressable marginTop="l">
        <Text variant="button">Clique aqui</Text>
      </RestylePressable>
    </Box>
  );
};
