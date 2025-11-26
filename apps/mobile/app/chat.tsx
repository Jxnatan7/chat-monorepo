import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

import { Container } from "@/components/theme/Container";
import { Message } from "@/components/theme/Message";
import { MessageInput } from "@/components/theme/MessageInput";
import { MessageList } from "@/components/theme/MessageList";
import { IconButton } from "@/components/theme/IconButton";

import { useChatController } from "@/hooks/useChatController";
import { usePreventGoBack } from "@/hooks/usePreventGoBack";
import { BottomSheet } from "@/components/theme/BottomSheet";
import { Text } from "@/components/restyle";
import { FlashListRef } from "@shopify/flash-list";

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

  const listRef = useRef<FlashListRef<any>>(null);

  const scrollToBottom = () => {
    const id = setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 50);

    return () => clearTimeout(id);
  };

  const handleSend = (content: string) => {
    sendMessage({ chatId, content }).then(() => {
      scrollToBottom();
    });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <Container
      variant="chat"
      containerHeaderProps={{
        title: "Chat",
        backgroundColor: "backgroundGrayLight",
        hideBackButton: isBackBlocked,
        children: (
          <IconButton
            icon={<FontAwesome5 name="ellipsis-v" size={24} color="black" />}
            onPress={() => setIsOpen(true)}
          />
        ),
      }}
    >
      <MessageList
        ref={listRef}
        data={messages}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderMessageItem}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
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
        <Text>Aqui você coloca qualquer conteúdo.</Text>
      </BottomSheet>
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
    // flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  listContent: {
    flexGrow: 1,
  },
});
