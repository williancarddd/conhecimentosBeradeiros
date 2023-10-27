import React from 'react';

import Iniciar from '../screens/Iniciar';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Chat from '../screens/Chat';
import FormComunidade from '../screens/FormComunidade';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MidButton from '../components/MidButton';
import { View } from 'native-base';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigatorDrawerRoutes() {
  const navigation = useNavigation();

  function onPressLeftComunidadesScreen() {
    navigation.navigate('Iniciar')
  }

  return (
    <BottomTab.Navigator

      screenOptions={{
        title: '',
        tabBarStyle: {
          backgroundColor: '#D9D9D9',
        },
        tabBarShowLabel: false,
        headerShadowVisible: false,
        headerTintColor: 'transparent'
      }}

      initialRouteName='Iniciar'
    >

      <BottomTab.Screen
        name="Conhecer"
        component={Chat}
        options={{
          tabBarLabel: "Conhecer",
          headerShown: false,
          tabBarStyle: {
            display: 'none'
          },
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) return <Ionicons name="chatbox-sharp" size={24} color="black" />
            else return <Ionicons name="chatbox-sharp" size={24} color="black" />
          },
          tabBarHideOnKeyboard: true,
        }} />
      <BottomTab.Screen
        name="Iniciar"
        component={Iniciar}
        options={{
          tabBarLabel: "Iniciar",
          headerTintColor: '#030C1A',

          tabBarIcon: ({ color, size, focused }) => {
            if (focused) return <MidButton color="black" size={size} />
            else return <MidButton color="white" size={size} />
          }
        }} />
      <BottomTab.Screen
        name="Comunidades"
        component={FormComunidade}
        options={{
          tabBarLabel: "Comunidades",
          headerStyle: {
            backgroundColor: '#1A1717',
          },
          headerTitle: 'Comunidades',
          headerTitleStyle: {
            color: 'white',
            fontSize: 34,
            fontWeight: "900",
            justifyContent: 'center',
            alignItems: 'center'
          }
          ,
          headerLeft: () => {
            return (
              <View flex={1} justifyContent={'center'} justifyItems={'center'} flexDirection={'row'}>
                <FontAwesome name='chevron-left' size={26} color="white" style={{ paddingLeft: 22 }} onPress={onPressLeftComunidadesScreen} />
                <Ionicons name="md-people" size={36} color="white" style={{ paddingLeft: 16 }} />
              </View>
            )
          },
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) return <Ionicons name="md-people" size={26} color="gray" />
            else return <Ionicons name="md-people" size={26} color="black" />
          }
        }} />

    </BottomTab.Navigator>
  )
}

