import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { YELLOW_COLOR, BLACK_COLOR, DARK_GREY, LIGHT_GREY } from "../colors";
import Detail from "../screens/Detail";
import { isWeb } from "../webCheck";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDark = isWeb || useColorScheme() === "dark";
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? BLACK_COLOR : "white",
        },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
        headerTitleAlign: "center",
        headerBackTitleVisible: false,
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
