import { Box, RestylePressable, Text } from "@/components/restyle";
import { useRouter } from "expo-router";

export type CommunicationRequestListEmptyProps = {
  text?: string;
  showRedirect?: boolean;
};

export const CommunicationRequestListEmpty = ({
  text = "Você ainda não possui um gerenciador e uma residência cadastrada, que tal criar uma?",
  showRedirect = true,
}: CommunicationRequestListEmptyProps) => {
  const { push } = useRouter();

  return (
    <Box>
      <Text textAlign="center">{text}</Text>
      {showRedirect && (
        <RestylePressable
          variant="transparent"
          marginTop="l"
          onPress={() => push("/(tabs)/house")}
        >
          <Text variant="containerHeader" textAlign="center" color="textBlue">
            Clique aqui
          </Text>
        </RestylePressable>
      )}
    </Box>
  );
};
