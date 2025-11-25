import React, { useState, useEffect, useRef } from "react";
import { Text } from "@/components/restyle";
import { Container } from "@/components/theme/Container";
import LottieView from "lottie-react-native";
import useCommunicationAccepted from "@/hooks/useCommunicationAccepted";
import { useCommunicationRequestStore } from "@/stores/communicationRequestStore";
import { useRouter } from "expo-router";
import { useAppStore } from "@/stores/appStore";

const loadingAnimation = require("@/assets/animations/loading.json");
const approveAnimation = require("@/assets/animations/approve.json");

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function AwaitingValidation() {
  const token = useCommunicationRequestStore((s) => s.visitorToken);
  const { replace } = useRouter();
  const [accepted, setAccepted] = useState(false);
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (animationRef.current) {
      if (accepted) {
        animationRef.current.reset();
        animationRef.current.play();
        wait(5000).then(() => {
          replace({
            pathname: "/chat",
            params: {
              chatId: useAppStore.getState().chatId,
              blockBack: "true",
            },
          });
        });
      } else {
        animationRef.current.play();
      }
    }
  }, [accepted]);

  useCommunicationAccepted({
    token: token,
    onAccepted: ({ communicationRequestId, chatId }) => {
      setAccepted(true);
    },
  });

  return (
    <Container variant="screen">
      <Text variant="header" px="xl" mb="m" mt="xxxl">
        {accepted ? "Comunicação aceita!" : "Aguardando validação"}
      </Text>

      <LottieView
        ref={animationRef}
        source={accepted ? approveAnimation : loadingAnimation}
        loop={!accepted}
        autoPlay
        speed={0.5}
        style={{
          width: 200,
          height: 200,
          alignSelf: "center",
        }}
        onAnimationFinish={(isCancelled) => {
          if (accepted && !isCancelled) {
          }
        }}
      />
    </Container>
  );
}
