import { Box, Text } from "@/components/restyle";

export const ListItemInfo = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <Box flex={1} flexDirection="column" gap="s">
      <Text variant="infoTitle">{title}</Text>
      <Text variant="infoSubtitle">{subtitle}</Text>
    </Box>
  );
};
