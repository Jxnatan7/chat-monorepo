import React from "react";
import { ViewStyle } from "react-native";
import {
  Box,
  BoxProps,
  RestyleTextInput,
  RestyleTextInputProps,
} from "@/components/restyle";
import theme from "@/theme";

export type IconDirection = "left" | "right";

export type TextInputProps = RestyleTextInputProps & {
  icon?: React.ReactNode;
  iconDirection?: IconDirection;
  iconContainerStyle?: ViewStyle;
  containerProps?: BoxProps;
};

export const TextInput = ({
  icon,
  iconDirection = "left",
  iconContainerStyle,
  containerProps,
  ...props
}: TextInputProps) => {
  const isRight = iconDirection === "right";

  return (
    <Box
      flexDirection={isRight ? "row-reverse" : "row"}
      alignItems="center"
      height="auto"
      {...containerProps}
    >
      {icon && (
        <Box
          backgroundColor="inputBackgroundLight"
          height={40}
          padding="s"
          borderTopLeftRadius={isRight ? 0 : 6}
          borderBottomLeftRadius={isRight ? 0 : 6}
          borderBottomRightRadius={isRight ? 6 : 0}
          borderTopRightRadius={isRight ? 6 : 0}
          justifyContent="center"
          alignItems="center"
          style={iconContainerStyle}
        >
          {icon}
        </Box>
      )}

      <RestyleTextInput
        variant={isRight ? "iconRigth" : "iconLeft"}
        placeholderTextColor={theme.colors.inputPlaceholderLight}
        {...props}
      />
    </Box>
  );
};
