import { Asset } from "expo-asset";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";

const localImages = [require("../assets/images/init-image.svg")];

export default function useImages() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        const localPromises = localImages.map((img) =>
          Asset.fromModule(img).downloadAsync()
        );

        await Promise.all([...localPromises]);
        setAppIsReady(true);
      } catch (e) {}
    }

    prepare();
  }, []);

  return appIsReady;
}
