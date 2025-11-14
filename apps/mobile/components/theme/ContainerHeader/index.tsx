import { Box, BoxProps, Text } from "@/components/restyle";
import { BackButton } from "../BackButton";

export type ContainerHeaderProps = {
  title?: string;
  children?: React.ReactNode;
  hideBackButton?: boolean;
} & BoxProps;

export const ContainerHeader = ({
  title,
  hideBackButton = false,
  children,
  ...props
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
      {...props}
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
