import { useColorScheme } from "react-native";

export const isDark = () => {
  return useColorScheme() === "dark";
};
