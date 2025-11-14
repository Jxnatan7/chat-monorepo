import { Stack } from "expo-router";

export default function CommunicationRequestLayout() {
  return (
    <Stack>
      <Stack.Screen name="(steps)" options={{ headerShown: false }} />
    </Stack>
  );
}
