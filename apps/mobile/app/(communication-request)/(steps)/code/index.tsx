import Button from "@/components/theme/Button";
import { CodeCamera } from "@/components/theme/CodeCamera";
import CodeInput from "@/components/theme/CodeInput";
import { Container } from "@/components/theme/Container";
import { StepHeader } from "@/components/theme/StepHeader";
import ProviderService from "@/services/ProviderService";
import { useCommunicationRequestStore } from "@/stores/communicationRequestStore";
import { usePathname, useRouter } from "expo-router";
import { useState } from "react";

export default function Code() {
  const { push } = useRouter();
  const [codeInput, setCodeInput] = useState("CAMERA");
  const pathName = usePathname();

  const onFullfill = (code: string) => {
    ProviderService.findByCode(code.toUpperCase())
      .then((provider) => {
        if (!provider) {
          alert("Código inválido ou não encontrado.");
          const id = setTimeout(() => {}, 500);
          return () => clearTimeout(id);
        }

        useCommunicationRequestStore.setState({
          provider: provider as any,
          code,
        });

        push("/(communication-request)/(steps)/residence");
      })
      .catch(() => {
        alert("Erro ao validar código");
      });
  };

  return (
    <Container variant="screen">
      <StepHeader
        title="Insira o código"
        subtitle="O código do condomínio ou da residência"
      />

      {codeInput === "CAMERA" && (
        <CodeCamera onCodeScanned={onFullfill} pathName={pathName} />
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
