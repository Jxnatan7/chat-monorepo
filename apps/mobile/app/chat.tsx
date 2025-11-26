import React, { useCallback, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

import { Container } from "@/components/theme/Container";
import { Message } from "@/components/theme/Message";
import { MessageInput } from "@/components/theme/MessageInput";
import { MessageList } from "@/components/theme/MessageList";
import { IconButton } from "@/components/theme/IconButton";
import theme from "@/theme";

import { useChatController } from "@/hooks/useChatController";
import { usePreventGoBack } from "@/hooks/usePreventGoBack";
import { BottomSheet } from "@/components/theme/BottomSheet";
import { Box, Text } from "@/components/restyle";
import Button from "@/components/theme/Button";

export default function ChatScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const { chatId, blockBack } = useLocalSearchParams<{
    chatId: string;
    blockBack: string;
  }>();
  const isBackBlocked = blockBack === "true";

  usePreventGoBack(isBackBlocked);

  const { messages, sendMessage, connectionStatus, currentUserId } =
    useChatController(chatId);

  const renderMessageItem = useCallback(
    ({ item }: { item: any }) => (
      <Message
        content={item.content}
        isMyMessage={item.sender.userId === currentUserId}
        timestamp={item.timestamp}
      />
    ),
    [currentUserId]
  );

  const handleSend = (content: string) => {
    sendMessage({ chatId, content });
  };

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
            onPress={() => setIsOpen(true)}
          />
        ),
      }}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        contentContainerStyle={styles.contentContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? -60 : 0}
      >
        <MessageList
          data={messages}
          keyExtractor={(item: any) => item.id || Math.random().toString()}
          contentContainerStyle={styles.listContent}
          renderItem={renderMessageItem}
        />

        <MessageInput
          onSend={handleSend}
          editable={connectionStatus === "connected"}
        />
        <BottomSheet
          isVisible={isOpen}
          onClose={() => setIsOpen(false)}
          height="80%"
        >
          <Box style={styles.sheetContent}>
            <Text style={styles.title}>Configurações</Text>
            <Text>Aqui você coloca qualquer conteúdo.</Text>
            <Button text="Confirmar" onPress={() => setIsOpen(false)} />
          </Box>
        </BottomSheet>
      </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  keyboardView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.m,
    paddingBottom: theme.spacing.m,
  },
});
