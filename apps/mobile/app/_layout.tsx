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

export { ErrorBoundary } from "expo-router";

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
    <KeyboardProvider>
      <ThemeProvider theme={theme}>
        <StatusBar style="inverted" />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ headerShown: false }} />
          <Stack.Screen name="chat" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(communication-request)"
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </KeyboardProvider>
  );
}
