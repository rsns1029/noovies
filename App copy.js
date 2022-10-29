import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, useColorScheme } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Root from "./navigation/Root";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await startLoading();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setReady(true);
      }
    }

    prepare();
  }, []);

  const loadFonts = (fonts) => {
    return fonts.map((font) => Font.loadAsync(font));
  };

  const loadAssets = (images) =>
    images.map((asset) => {
      if (typeof asset === "string") {
        return Image.prefetch(asset);
      } else {
        return Asset.loadAsync(asset);
      }
    });

  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    const images = loadAssets([
      require("./splash2.png"),
      "https://images.velog.io/images/jha0402/post/f0fb03e2-852d-4a05-8e7a-a6c7195504aa/react.jpeg",
    ]);
    // await Font.loadAsync(Ionicons.font);
    // await Asset.loadAsync(require("./splash2.png"));
    // await Image.prefetch("https://url")

    await Promise.all([...fonts, ...images]);
  };

  const onLayoutRootView = useCallback(async () => {
    if (ready) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    //theme={isDark ? DarkTheme : DefaultTheme}
    <NavigationContainer onLayout={onLayoutRootView}>
      <Root />
    </NavigationContainer>
  );
}
