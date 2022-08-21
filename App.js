import React, { useState } from "react";
import { Text, View, Image, useColorScheme } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset, useAssets } from "expo-asset";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stacks from "./navigation/Stacks";

export default function App() {
  const [ready, setReady] = useState(false);

  // --------------Instead of writing all loading assets------------------
  // const [assets2] = useAssets([require("./splash2.png")]);
  // const [loaded] = Font.useFonts(Ionicons.font);
  // if (!assets2 || !loaded) {
  //   return <AppLoading />;
  // }
  // ---------------------------------------------------------------------
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

  const onFinish = () => {
    console.log("finished");
    setReady(true);
  };

  const isDark = useColorScheme() === "dark";

  if (!ready) {
    return (
      <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
      />
    );
  }

  return (
    //theme={isDark ? DarkTheme : DefaultTheme}
    <NavigationContainer>
      {/* <Tabs /> */}
      <Stacks />
    </NavigationContainer>
  );
}
