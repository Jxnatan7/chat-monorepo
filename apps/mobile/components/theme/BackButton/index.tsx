import { RestyleTouchableOpacity } from "@/components/restyle";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export const BackButton = () => {
  return (
    <RestyleTouchableOpacity variant="icon">
      <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
    </RestyleTouchableOpacity>
  );
};
