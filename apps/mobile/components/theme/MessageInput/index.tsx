import React from "react";
import {
  Box,
  RestyleTextInputProps,
  RestyleTouchableOpacity,
} from "@/components/restyle";
import { TextInput } from "../TextInput";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import theme from "@/theme";
import { Dimensions } from "react-native";

export type MessageInputProps = RestyleTextInputProps;

export const MessageInput = ({ ...props }: MessageInputProps) => {
  return (
    <Box
      width={Dimensions.get("window").width}
      minHeight={120}
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="center"
      p="l"
      gap="s"
      backgroundColor="backgroundLight"
      borderTopColor="borderGray"
      borderTopWidth={1}
    >
      <Box
        width="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="s"
      >
        <TextInput maxWidth="90%" {...props} />
        <RestyleTouchableOpacity
          variant="icon"
          justifyContent="center"
          alignItems="center"
          flex={1}
        >
          <FontAwesome name="send" size={24} color={theme.colors.textBlue} />
        </RestyleTouchableOpacity>
      </Box>
    </Box>
  );
};
