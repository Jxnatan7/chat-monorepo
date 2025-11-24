import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";
import { CommunicationRequestItem } from "@/components/theme/CommunicationRequestItem";
import { CommunicationRequestList } from "@/components/theme/CommunicationRequestList";
import { Container } from "@/components/theme/Container";
import { SearchInput } from "@/components/theme/SearchInput";
import { Text } from "@/components/restyle";
import useValidateCommunication from "@/hooks/useValidateCommunication";

const { width } = Dimensions.get("window");

export default function Home() {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );

  const { mutateAsync, isPending } = useValidateCommunication(() => {
    setSelectedRequestId(null);
    queryClient.invalidateQueries({ queryKey: ["communication-requests"] });
  });

  const handleValidation = async (status: "ACCEPTED" | "REJECTED") => {
    if (!selectedRequestId) return;

    await mutateAsync({
      communicationId: selectedRequestId,
      status: status,
    });
  };

  return (
    <Container
      variant="screen"
      containerHeaderProps={{ title: "Conversas", hideBackButton: true }}
    >
      <SearchInput containerProps={{ mb: "m", mt: "l" }} />

      <CommunicationRequestList
        renderItem={({ item }: any) => (
          <CommunicationRequestItem
            title={item.visitorName}
            subtitle={item.initialMessage}
            status={item.status}
            onPress={() =>
              item.status === "PENDING"
                ? setSelectedRequestId(item._id)
                : item.status === "ACCEPTED" &&
                  push({
                    pathname: "/chat",
                    params: {
                      chatId: item.chatId,
                    },
                  })
            }
          />
        )}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={!!selectedRequestId}
        onRequestClose={() => setSelectedRequestId(null)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text
              variant="containerHeader"
              style={{ width: "100%", marginBottom: 12, textAlign: "center" }}
            >
              Responder Solicitação
            </Text>

            <Text
              variant="body"
              style={{ marginBottom: 24, textAlign: "center", color: "#666" }}
            >
              Deseja permitir ou rejeitar a conversa deste visitante?
            </Text>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                onPress={() => handleValidation("REJECTED")}
                disabled={isPending}
              >
                {isPending ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.buttonText}>Rejeitar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => handleValidation("ACCEPTED")}
                disabled={isPending}
              >
                {isPending ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.buttonText}>Confirmar</Text>
                )}
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setSelectedRequestId(null)}
              disabled={isPending}
            >
              <Text style={styles.cancelButtonText}>Cancelar e fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
    marginBottom: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  rejectButton: {
    backgroundColor: "#EF4444",
  },
  confirmButton: {
    backgroundColor: "#000",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  cancelButton: {
    paddingVertical: 8,
    width: "100%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#6B7280",
    fontWeight: "500",
  },
});
