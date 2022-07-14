import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movie";
import Search from "../screens/Search";
import Tv from "../screens/Tv";
import { Text, View, Image } from "react-native";
const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    initialRouteName="Movies"
    screenOptions={{
      tabBarActiveTintColor: "red",
      tabBarInactiveTintColor: "purple",
      tabBarStyle: { backgroundColor: "tomato" },
    }}
  >
    <Tab.Screen
      name="Movies"
      component={Movies}
      options={{
        headerTitleStyle: { color: "tomato" },
        headerRight: () => (
          <View>
            <Text>hello</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen name="Tv" component={Tv} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;
