import { Text, TextProps } from "@/components/restyle";
import RestyleTouchableOpacity, {
  RestyleTouchableOpacityProps,
} from "@/components/restyle/Button";
import { Theme } from "@/theme";
import { useTheme } from "@shopify/restyle";
import React from "react";

export type ButtonProps = RestyleTouchableOpacityProps & {
  text: string;
  textProps?: TextProps;
};

export default function Button({
  text,
  textProps,
  variant = "default",
  ...props
}: ButtonProps) {
  const theme = useTheme<Theme>();

  const btnVariant =
    theme.buttonVariants?.[variant] ?? theme.buttonVariants.default;
  const textColorToken = btnVariant?.color ?? "buttonTextLight";

  return (
    <RestyleTouchableOpacity
      activeOpacity={0.7}
      borderRadius={30}
      width="85%"
      height={60}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      variant={variant}
      {...props}
    >
      <Text
        variant="button"
        {...textProps}
        color={(textProps?.color ?? textColorToken) as any}
      >
        {text}
      </Text>
    </RestyleTouchableOpacity>
  );
}
