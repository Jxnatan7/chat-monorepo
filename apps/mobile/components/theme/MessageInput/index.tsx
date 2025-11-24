import React, { useState } from "react";
import {
  Box,
  RestyleTextInputProps,
  RestyleTouchableOpacity,
} from "@/components/restyle";
import { TextInput } from "../TextInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import theme from "@/theme";

export type MessageInputProps = RestyleTextInputProps & {
  onSend: (content: string) => void;
};

export const MessageInput = ({ onSend, ...props }: MessageInputProps) => {
  const [value, setValue] = useState("");

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

  return (
    <Box
      width="100%"
      height={80}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      backgroundColor="backgroundLight"
      borderTopColor="borderGray"
      borderTopWidth={1}
      px="xl"
    >
      <TextInput
        value={value}
        onChange={(e) => setValue(e.nativeEvent.text)}
        height={30}
        {...props}
      />
      <RestyleTouchableOpacity
        width={30}
        height={30}
        variant="transparent"
        justifyContent="center"
        alignItems="center"
        marginLeft="m"
        activeOpacity={0.7}
        disabled={!props.editable}
        onPress={handleSend}
      >
        <FontAwesome name="send" size={20} color={theme.colors.textBlue} />
      </RestyleTouchableOpacity>
    </Box>
  );
};
