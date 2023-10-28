import "react-native-gesture-handler";

import React from "react";
import Routes from "./src/routes";
import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import * as Font from "expo-font";
export default function App() {
  const [fontsLoaded] = Font.useFonts({
    "lilita-one": require("./assets/fonts/lilita-one.ttf"),
    Oswald: require("./assets/fonts/Oswald-VariableFont_wght.ttf"),
  });
  if (!fontsLoaded) return <></>;
  return (
    <NativeBaseProvider>
      <StatusBar backgroundColor="#030C1A" barStyle="light-content" />
      <Routes />
    </NativeBaseProvider>
  );
}
