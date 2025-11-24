import { Text } from "@/components/restyle";
import CodeInput from "@/components/theme/CodeInput";
import { Container } from "@/components/theme/Container";
import ProviderService from "@/services/ProviderService";
import { useCommunicationRequestStore } from "@/stores/communicationRequestStore";
import { useRouter } from "expo-router";

export default function Code() {
  const { push } = useRouter();

  const onFullfill = async (code: string) => {
    const provider = await ProviderService.findByCode(code.toUpperCase());
    if (!provider) return;

    const stateUpdated = useCommunicationRequestStore.setState({
      provider: provider as any,
      code,
    });

    if (!stateUpdated) return;

    push("/(communication-request)/(steps)/residence");
  };

  return (
    <Container variant="screen">
      <Text variant="header" mt="xxxl">
        Digite o código
      </Text>
      <Text variant="header2" mt="m" px="xl" mb="xxl">
        Insira aqui o código do Condomínio ou da Residência
      </Text>
      <CodeInput
        length={10}
        keyboardType="name-phone-pad"
        autoFocus
        onFullfill={onFullfill}
      />
    </Container>
  );
}
