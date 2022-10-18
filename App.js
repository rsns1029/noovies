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

import Root from "./navigation/Root";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";
import { isDark } from "./themeSelector";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await startLoading();
        console.log("ok");
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("ok2");
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        console.log("ok3");
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
  console.log("Ready ? : " + ready);

  if (!ready) {
    console.log("returning");
    return null;
  }
  console.log("now return this");
  return (
    //theme={isDark ? DarkTheme : DefaultTheme}

    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </View>
  );
}
