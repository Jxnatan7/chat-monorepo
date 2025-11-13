import { Box } from "@/components/restyle";
import theme from "@/theme";
import { FontAwesome5 } from "@expo/vector-icons";

export const ListItemIcon = () => {
  return (
    <Box
      width={60}
      height={60}
      borderRadius={20}
      backgroundColor="backgroundGrayLight"
      alignItems="center"
      justifyContent="center"
    >
      <FontAwesome5
        name="house-user"
        size={35}
        color={theme.colors.backgroundGray}
      />
    </Box>
  );
};
