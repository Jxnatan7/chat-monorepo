import { Container } from "@/components/theme/Container";
import { Message } from "@/components/theme/Message";
import { MessageInput } from "@/components/theme/MessageInput";
import { MessageList } from "@/components/theme/MessageList";
import useChatMessages from "@/hooks/useChatMessages";
import useChatSocket from "@/hooks/useChatSocket";
import { useAuthStore } from "@/stores/authStore";
import { useCommunicationRequestStore } from "@/stores/communicationRequestStore";
import theme from "@/theme";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useEffect, useMemo } from "react";
import { IconButton } from "@/components/theme/IconButton";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Chat() {
  const {
    chatId,
    blockBack: isBackBlocked,
  }: { chatId: string; blockBack: string } = useLocalSearchParams();
  const oldMessages = useChatMessages(chatId);

  const token = useAuthStore((s) => s.token);
  const visitorToken = useCommunicationRequestStore((s) => s.visitorToken);
  const userId = useAuthStore((s) => s.user?.id);
  const visitorId = useCommunicationRequestStore((s) => s.visitorId);
  const id = userId || visitorId;

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

  useEffect(() => {
    if (!isBackBlocked) return;

    const onBackPress = () => {
      return true;
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => subscription.remove();
  }, [isBackBlocked]);

  return (
    <Container
      variant="chat"
      containerHeaderProps={{
        title: "Chat",
        backgroundColor: "backgroundGrayLight",
        hideBackButton: true,
        children: (
          <IconButton
            icon={<FontAwesome5 name="ellipsis-v" size={24} color="black" />}
          />
        ),
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
        <Stack.Screen
          options={{
            gestureEnabled: !isBackBlocked,
            headerLeft: isBackBlocked ? () => null : undefined,
            headerBackVisible: !isBackBlocked,
            title: "Tela Bloqueada",
          }}
        />
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
              isMyMessage={item.sender.userId === id}
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
