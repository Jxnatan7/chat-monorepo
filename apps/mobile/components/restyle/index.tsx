import { Theme } from "@/theme";
import {
  createBox,
  createRestyleComponent,
  createText,
  createVariant,
  VariantProps,
  BoxProps as RestyleBoxProps,
} from "@shopify/restyle";

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export type BoxProps = React.ComponentProps<typeof Box>;
export type TextProps = React.ComponentProps<typeof Text>;

const variant = createVariant<Theme, "containerVariants">({
  themeKey: "containerVariants",
  defaults: {
    flex: 1,
    backgroundColor: "backgroundLight",
  },
});

export const Container = createRestyleComponent<
  VariantProps<Theme, "containerVariants"> &
    RestyleBoxProps<Theme> & { children?: React.ReactNode },
  Theme
>([variant], Box);
