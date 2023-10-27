import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigatorDrawerRoutes from "./bottomTabs.routes";
import React from "react";

export default function Routes() {
  return (
    <NavigationContainer>
      <BottomTabNavigatorDrawerRoutes />
    </NavigationContainer>
  );
}
