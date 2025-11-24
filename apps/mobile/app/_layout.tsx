import { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { ThemeProvider } from "@shopify/restyle";
import theme from "@/theme";
import useImages from "@/hooks/useImages";
import { StatusBar } from "expo-status-bar";
import KeyboardProvider from "@/contexts/KeyboardContext";
import { AuthProvider } from "@/contexts/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export { ErrorBoundary } from "expo-router";
const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsIsLoaded, error] = useFonts({
    MulishFont: require("../assets/fonts/Mulish-Font.ttf"),
    ...FontAwesome.font,
  });

  const imagesIsLoaded = useImages();

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (fontsIsLoaded && imagesIsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsIsLoaded && imagesIsLoaded]);

  if (!fontsIsLoaded && imagesIsLoaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <StatusBar style="inverted" />
            <Stack
              screenOptions={{
                headerShown: false,
                animation: "flip",
                animationDuration: 300,
              }}
            >
              <Stack.Screen name="init" />
              <Stack.Screen name="login" />
              <Stack.Screen name="register" />
              <Stack.Screen name="chat" />
              <Stack.Screen name="awaiting-validation" />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(communication-request)" />
            </Stack>
          </ThemeProvider>
        </AuthProvider>
      </KeyboardProvider>
    </QueryClientProvider>
  );
}
