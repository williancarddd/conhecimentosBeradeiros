import React from "react";

import Iniciar from "../screens/Iniciar";

import { Ionicons } from "@expo/vector-icons";
import Chat from "../screens/Chat";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MidButton from "../components/MidButton";
import { StackRoute } from "./stack.routes";

type RootBottomTabParamList = {
  Iniciar: undefined;
  Conhecer: undefined;
  Comunidades: undefined;
};

const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();

export default function BottomTabNavigatorDrawerRoutes() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        title: "",
        tabBarStyle: {
          backgroundColor: "#D9D9D9",
        },
        tabBarShowLabel: false,
        headerShadowVisible: false,
        headerTintColor: "transparent",
        headerShown: false,
      }}
      initialRouteName="Iniciar"
    >
      <BottomTab.Screen
        name="Conhecer"
        component={Chat}
        options={{
          tabBarLabel: "Conhecer",
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
          tabBarIcon: ({ color, size, focused }) => {
            if (focused)
              return <Ionicons name="chatbox-sharp" size={24} color="black" />;
            else
              return <Ionicons name="chatbox-sharp" size={24} color="black" />;
          },
          tabBarHideOnKeyboard: true,
        }}
      />
      <BottomTab.Screen
        name="Iniciar"
        component={Iniciar}
        options={{
          tabBarLabel: "Iniciar",
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) return <MidButton color="black" size={size} />;
            else return <MidButton color="white" size={size} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Comunidades"
        component={StackRoute}
        options={{
          tabBarLabel: "Comunidades",
          tabBarIcon: ({ color, size, focused }) => {
            if (focused)
              return <Ionicons name="md-people" size={26} color="gray" />;
            else return <Ionicons name="md-people" size={26} color="black" />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
