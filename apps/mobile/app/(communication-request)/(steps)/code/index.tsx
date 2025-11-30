import CodeInput from "@/components/theme/CodeInput";
import { Container } from "@/components/theme/Container";
import { StepHeader } from "@/components/theme/StepHeader";
import ProviderService from "@/services/ProviderService";
import { useCommunicationRequestStore } from "@/stores/communicationRequestStore";
import { useRouter } from "expo-router";

export default function Code() {
  const { push } = useRouter();

  const onFullfill = async (code: string) => {
    const provider = await ProviderService.findByCode(code.toUpperCase());
    if (!provider) return;

    useCommunicationRequestStore.setState({
      provider: provider as any,
      code,
    });

    push("/(communication-request)/(steps)/residence");
  };

  return (
    <Container variant="screen">
      <StepHeader
        title="Insira o código"
        subtitle="O código do condomínio ou da residência"
      />

      <CodeInput
        length={10}
        keyboardType="name-phone-pad"
        autoFocus
        onFullfill={onFullfill}
      />
    </Container>
  );
}
