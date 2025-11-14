import { RestyleTouchableOpacity } from "@/components/restyle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

export const BackButton = () => {
  const { canGoBack, back } = useRouter();
  return (
    <RestyleTouchableOpacity
      variant="icon"
      onPress={() => canGoBack() && back()}
    >
      <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
    </RestyleTouchableOpacity>
  );
};
