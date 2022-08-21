import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>One</Text>
  </TouchableOpacity>
);

const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Two</Text>
  </TouchableOpacity>
);

const ScreenThree = ({ navigation: { setOptions } }) => (
  <TouchableOpacity onPress={() => setOptions({ title: "Hello" })}>
    <Text>Three</Text>
  </TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stacks = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="One" component={ScreenOne}></NativeStack.Screen>
    <NativeStack.Screen name="Two" component={ScreenTwo}></NativeStack.Screen>
    <NativeStack.Screen
      name="Three"
      component={ScreenThree}
    ></NativeStack.Screen>
  </NativeStack.Navigator>
);

export default Stacks;
