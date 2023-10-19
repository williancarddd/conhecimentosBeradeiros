import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Iniciar from '../screens/Iniciar';
import { Feather, AntDesign } from '@expo/vector-icons'
import Chat from '../screens/Chat';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator

      screenOptions={{
        title: '',
        drawerStyle: {
          backgroundColor: '#030C1A',
        },
        drawerLabelStyle: {
          color: '#ffffff'
        },
        headerShadowVisible: false,
      }}
    >
      <Drawer.Screen
        name="Iniciar"
        component={Iniciar}
        options={{
          drawerLabel: "Iniciar",
          headerTintColor: '#030C1A',
          drawerIcon: ({ color, size, focused }) => {
            if (focused) return <Feather name="home" color={color} size={size} />
            else return <Feather name="home" color={"#ffffff"} size={size} />
          }
        }} />
      <Drawer.Screen
        name="Conhecer"
        component={Chat}
        options={{
          drawerLabel: "Conhecer",
          headerStyle: {
            backgroundColor: "#030C1A"
          },
          headerTintColor: '#ffff',
         
          drawerIcon: ({ color, size, focused }) => {
            if (focused) return <Feather name="box" color={color} size={size} />
            else return <Feather name="box" color={"#ffffff"} size={size} />
          }
        }} />
    </Drawer.Navigator>
  )
}