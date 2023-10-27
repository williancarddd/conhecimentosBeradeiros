import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Iniciar from '../screens/Iniciar';
import { Feather } from '@expo/vector-icons'
import Chat from '../screens/Chat';
import FormComunidade from '../screens/FormComunidade';
import { colors } from '../utils/colors';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator

      screenOptions={{
        title: '',
        drawerStyle: {
          backgroundColor: colors['deep-fir'][500],
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
            if (focused) return <Feather name="home" color={colors['blue-dianne']['100']} size={size} />
            else return <Feather name="home" color={"#ffffff"} size={size} />
          }
        }} />
      <Drawer.Screen
        name="Conhecer"
        component={Chat}
        options={{
          drawerLabel: "Conhecer",
          headerStyle: {
            backgroundColor: colors['deep-fir'][500],
          },
          headerTintColor: colors['alto'][500],
         
          drawerIcon: ({ color, size, focused }) => {
            if (focused) return <Feather name="box" color={colors['blue-dianne']['100']} size={size} />
            else return <Feather name="box" color={"#ffffff"} size={size} />
          }
        }} />
        <Drawer.Screen
        name="Comunidades"
        component={FormComunidade}
        options={{
          drawerLabel: "Comunidades",
          headerStyle: {
            backgroundColor: colors['deep-fir'][500]
          },
          headerTintColor: '#ffff',
         
          drawerIcon: ({ color, size, focused }) => {
            if (focused) return <Feather name="users" color={colors['blue-dianne']['100']} size={size} />
            else return <Feather name="users" color={"#ffffff"} size={size} />
          }
        }} />
        
    </Drawer.Navigator>
  )
}