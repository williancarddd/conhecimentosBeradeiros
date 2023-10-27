import React from 'react';

import Iniciar from '../screens/Iniciar';
import { Feather } from '@expo/vector-icons'
import Chat from '../screens/Chat';
import FormComunidade from '../screens/FormComunidade';
import { colors } from '../utils/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

export default function  BottomTabNavigatorDrawerRoutes() {
  return (
    <BottomTab.Navigator

      screenOptions={{
        title: '',
        tabBarStyle: {
          backgroundColor: colors['deep-fir'][500],
        },
        tabBarLabelStyle: {
          color: '#ffffff'
        },
        headerShadowVisible: false,
      }}
    >
      <BottomTab.Screen
        name="Iniciar"
        component={Iniciar}
        options={{
          tabBarLabel: "Iniciar",
          headerTintColor: '#030C1A',
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) return <Feather name="home" color={colors['blue-dianne']['100']} size={size} />
            else return <Feather name="home" color={"#ffffff"} size={size} />
          }
        }} />
      <BottomTab.Screen
        name="Conhecer"
        component={Chat}
        options={{
          tabBarLabel: "Conhecer",
          headerShown: false,
          tabBarStyle: {
            display: 'none'
          },
          headerStyle: {
            backgroundColor: colors['deep-fir'][500],
          },
          headerTintColor: colors['alto'][500],
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) return <Feather name="box" color={colors['blue-dianne']['100']} size={size} />
            else return <Feather name="box" color={"#ffffff"} size={size} />
          },
          tabBarHideOnKeyboard: true,
        }} />
        <BottomTab.Screen
        name="Comunidades"
        component={FormComunidade}
        options={{
          tabBarLabel: "Comunidades",
          headerStyle: {
            backgroundColor: colors['deep-fir'][500]
          },
          headerTintColor: '#ffff',
         
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) return <Feather name="users" color={colors['blue-dianne']['100']} size={size} />
            else return <Feather name="users" color={"#ffffff"} size={size} />
          }
        }} />
        
    </BottomTab.Navigator>
  )
}