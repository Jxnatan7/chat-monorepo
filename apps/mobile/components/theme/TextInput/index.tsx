import { RestyleTextInput, RestyleTextInputProps } from "@/components/restyle";
import theme from "@/theme";

export const TextInput = ({ ...props }: RestyleTextInputProps) => {
  return (
    <RestyleTextInput
      variant="default"
      placeholderTextColor={theme.colors.inputPlaceholderLight}
      {...props}
    />
  );
};
