import { Container } from "@/components/theme/Container";
import { Message } from "@/components/theme/Message";
import { MessageInput } from "@/components/theme/MessageInput";
import { MessageList } from "@/components/theme/MessageList";
import useChatMessages from "@/hooks/useChatMessages";
import useChatSocket from "@/hooks/useChatSocket";
import { useAuthStore } from "@/stores/authStore";
import { useCommunicationRequestStore } from "@/stores/communicationRequestStore";
import theme from "@/theme";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, KeyboardAvoidingView, Platform } from "react-native";
import { useMemo } from "react";

export default function Chat() {
  const { chatId }: { chatId: string } = useLocalSearchParams();
  const oldMessages = useChatMessages(chatId);

  const token = useAuthStore((s) => s.token);
  const visitorToken = useCommunicationRequestStore((s) => s.visitorToken);

  const { messages, sendMessage, status, participants } = useChatSocket({
    chatId: chatId,
    token: token || visitorToken || "",
  });

  const messagesToRender = useMemo(() => {
    const rawList = oldMessages.data
      ? [...oldMessages.data.items, ...messages]
      : [...messages];

    return rawList;
  }, [oldMessages.data, messages]);

  return (
    <Container
      variant="chat"
      containerHeaderProps={{
        title: "Chat",
        backgroundColor: "backgroundGrayLight",
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? -60 : 0}
      >
        <MessageList
          data={messagesToRender}
          keyExtractor={(item: any) => item.id}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: theme.spacing.m,
            paddingBottom: theme.spacing.m,
          }}
          renderItem={({ item }: any) => (
            <Message
              content={item.content}
              isMyMessage={item.isMyMessage}
              timestamp={item.timestamp}
            />
          )}
        />
        <MessageInput
          onSend={(content: string) => sendMessage({ chatId: chatId, content })}
          editable={status === "connected"}
        />
      </KeyboardAvoidingView>
    </Container>
  );
}
