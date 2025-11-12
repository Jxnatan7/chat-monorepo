import { useEffect } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { ThemeProvider } from "@shopify/restyle";
import theme from "@/theme";
import useImages from "@/hooks/useImages";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
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
    <ThemeProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
