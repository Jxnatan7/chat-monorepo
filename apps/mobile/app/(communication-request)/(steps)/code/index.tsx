import Button from "@/components/theme/Button";
import { CodeCamera, CodeCameraHandle } from "@/components/theme/CodeCamera";
import CodeInput from "@/components/theme/CodeInput";
import { Container } from "@/components/theme/Container";
import { StepHeader } from "@/components/theme/StepHeader";
import ProviderService from "@/services/ProviderService";
import { useCommunicationRequestStore } from "@/stores/communicationRequestStore";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";

export default function Code() {
  const { push } = useRouter();
  const [codeInput, setCodeInput] = useState("CAMERA");
  const cameraRef = useRef<CodeCameraHandle>(null);

  const onFullfill = async (code: string) => {
    try {
      const provider = await ProviderService.findByCode(code.toUpperCase());

      if (!provider) {
        alert("Código inválido ou não encontrado.");
        const id = setTimeout(() => {
          cameraRef.current?.reset();
        }, 500);
        return () => clearTimeout(id);
      }

      useCommunicationRequestStore.setState({
        provider: provider as any,
        code,
      });

      push("/(communication-request)/(steps)/residence");
    } catch (error) {
      alert("Erro ao validar código");
      cameraRef.current?.reset();
    }
  };

  return (
    <Container variant="screen">
      <StepHeader
        title="Insira o código"
        subtitle="O código do condomínio ou da residência"
      />

      {codeInput === "CAMERA" && (
        <CodeCamera ref={cameraRef} onCodeScanned={onFullfill} />
      )}

      {codeInput === "TEXT" && (
        <CodeInput
          length={10}
          keyboardType="name-phone-pad"
          autoFocus
          onFullfill={onFullfill}
        />
      )}

      <Button
        variant="primary"
        marginTop="xxl"
        text={codeInput === "CAMERA" ? "Digitar código" : "Ler QR Code"}
        onPress={() => {
          setCodeInput((prev) => (prev === "CAMERA" ? "TEXT" : "CAMERA"));
        }}
      />
    </Container>
  );
}
