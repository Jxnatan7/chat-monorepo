import React, { useState, useEffect } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
} from "react-native";
import {
  Box,
  RestyleTextInputProps,
  RestyleTouchableOpacity,
} from "@/components/restyle";
import { TextInput } from "../TextInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import theme from "@/theme";
import { useKeyboard } from "@/contexts/KeyboardContext";

import { runOnJS } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export type MessageInputProps = RestyleTextInputProps & {
  onSend: (content: string) => void;
};

export const MessageInput = ({ onSend, ...props }: MessageInputProps) => {
  const [value, setValue] = useState("");
  const { setChatMode } = useKeyboard();

  useEffect(() => {
    setChatMode(true);
    return () => {
      setChatMode(false);
    };
  }, [setChatMode]);

  const handleSend = async () => {
    const text = value.trim();
    if (!text) return;
    try {
      await Promise.resolve(onSend(text));
      setValue("");
    } catch (err) {
      console.error("send failed", err);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const panGesture = Gesture.Pan()
    .activeOffsetY(10)
    .onEnd((event) => {
      if (event.translationY > 20) {
        runOnJS(dismissKeyboard)();
      }
    });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      style={{ width: Dimensions.get("window").width }}
    >
      <GestureDetector gesture={panGesture}>
        <Box
          width="100%"
          minHeight={80}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          backgroundColor="backgroundLight"
          borderTopColor="borderGray"
          borderTopWidth={1}
          px="xl"
          py="s"
        >
          <TextInput
            value={value}
            onChange={(e) => setValue(e.nativeEvent.text)}
            placeholder="Digite uma mensagem..."
            height={40}
            style={{ flex: 1 }}
            {...props}
          />
          <RestyleTouchableOpacity
            width={40}
            height={40}
            variant="transparent"
            justifyContent="center"
            alignItems="center"
            marginLeft="s"
            activeOpacity={0.7}
            disabled={!props.editable}
            onPress={handleSend}
          >
            <FontAwesome name="send" size={20} color={theme.colors.textBlue} />
          </RestyleTouchableOpacity>
        </Box>
      </GestureDetector>
    </KeyboardAvoidingView>
  );
};
