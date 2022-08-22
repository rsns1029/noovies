import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { Text, View, Image, useColorScheme } from "react-native";
import { YELLOW_COLOR, BLACK_COLOR, DARK_GREY, LIGHT_GREY } from "../colors";
import { Ionicons } from "@expo/vector-icons";
import Stack from "./Stack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
        tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
        headerStyle: { backgroundColor: isDark ? BLACK_COLOR : "white" },
        headerTitleStyle: {
          color: isDark ? "white" : BLACK_COLOR,
        },
        headerTitleAlign: "center",
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600", marginTop: -10 },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="film-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="tv-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="search-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
