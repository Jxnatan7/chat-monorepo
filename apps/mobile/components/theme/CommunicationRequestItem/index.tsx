import {
  RestyleTouchableOpacity,
  RestyleTouchableOpacityProps,
} from "@/components/restyle";
import { ListItemIcon } from "../ListItemIcon";
import { ListItemInfo } from "../ListItemInfo";
import { Ionicons } from "@expo/vector-icons";
import theme from "@/theme";
export type ListItemProps = RestyleTouchableOpacityProps & {
  title: string;
  subtitle: string;
  hideIcon?: boolean;
  hideBorder?: boolean;
  status: string;
};

export const CommunicationRequestItem = ({
  title,
  hideIcon = false,
  hideBorder = false,
  subtitle,
  status,
  ...props
}: ListItemProps) => {
  return (
    <RestyleTouchableOpacity
      width="100%"
      height={90}
      backgroundColor="backgroundLight"
      padding="m"
      borderBottomColor="borderGray"
      borderBottomWidth={hideBorder ? 0 : 1}
      flexDirection="row"
      alignItems="center"
      justifyContent="flex-start"
      gap="m"
      {...props}
    >
      {!hideIcon && (
        <ListItemIcon
          icon={
            <Ionicons
              name="chatbox-ellipses"
              size={35}
              color={
                status === "PENDING"
                  ? theme.colors.pending
                  : status === "ACCEPTED"
                    ? theme.colors.accepted
                    : theme.colors.rejected
              }
            />
          }
        />
      )}
      <ListItemInfo title={title} subtitle={subtitle} />
    </RestyleTouchableOpacity>
  );
};
