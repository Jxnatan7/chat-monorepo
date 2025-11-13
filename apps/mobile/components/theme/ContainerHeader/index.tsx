import { Box, Text } from "@/components/restyle";
import { BackButton } from "../BackButton";

export type ContainerHeaderProps = {
  title?: string;
  children?: React.ReactNode;
  hideBackButton?: boolean;
};

export const ContainerHeader = ({
  title,
  hideBackButton = false,
  children,
}: ContainerHeaderProps) => {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      width="100%"
      backgroundColor="backgroundLight"
      height={60}
      gap="m"
      justifyContent="space-between"
    >
      {!hideBackButton && <BackButton />}
      {title && (
        <Text variant="containerHeader" flex={1}>
          {title}
        </Text>
      )}
      {children}
    </Box>
  );
};
