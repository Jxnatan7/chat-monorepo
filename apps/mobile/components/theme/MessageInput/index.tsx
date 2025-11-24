import React from "react";
import {
  Box,
  RestylePressable,
  RestyleTextInputProps,
} from "@/components/restyle";
import { TextInput } from "../TextInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import theme from "@/theme";

export type MessageInputProps = RestyleTextInputProps;

export const MessageInput = ({ ...props }: MessageInputProps) => {
  return (
    <Box
      width="100%"
      height={100}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      p="l"
      pr="none"
      backgroundColor="backgroundLight"
      borderTopColor="borderGray"
      borderTopWidth={1}
    >
      <Box
        width="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="l"
        px="l"
        pr="xl"
      >
        <TextInput {...props} />
        <RestylePressable
          width={50}
          height={50}
          variant="transparent"
          justifyContent="center"
          alignItems="center"
        >
          <FontAwesome name="send" size={24} color={theme.colors.textBlue} />
        </RestylePressable>
      </Box>
    </Box>
  );
};
