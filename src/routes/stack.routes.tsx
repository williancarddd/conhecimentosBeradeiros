import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Comunidade } from "../screens/comunidade";
import { View } from "native-base";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AreaComunidade from "../screens/AreaComunidade";
import useHandleComunidade from "../hooks/HandleComunidade";
import FormBasicColetaDados from "../components/FormBasicColetaDados";
import { TouchableOpacity } from "react-native";

const Stack = createStackNavigator();

export function StackRoute() {
  const navigation = useNavigation();
  const { createComunidade } = useHandleComunidade();
  function onPressLeftComunidadesScreen() {
    //@ts-ignore
    navigation.navigate("Iniciar");
  }
  function onPressRigthPlusComunidadesScreen() {
    //@ts-ignore
    navigation.navigate("ComunidadeDetails", {
      trigger: createComunidade,
      mode: "create",
    });
  }
  return (
    <Stack.Navigator
      screenOptions={{
        title: "",
        headerStyle: {
          backgroundColor: "#1A1717",
        },
        headerShadowVisible: false,
        headerTintColor: "transparent",
      }}
    >
      <Stack.Screen
        name="AreaComunidade"
        component={AreaComunidade}
        options={{
          headerStyle: {
            backgroundColor: "#1A1717",
          },
          headerTitle: "Comunidades",
          headerTitleStyle: {
            color: "white",
            fontSize: 32,
            fontWeight: "900",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 10,
            paddingTop: 5,
          },
          headerLeft: () => {
            return (
              <View
                flex={1}
                justifyContent={"center"}
                justifyItems={"center"}
                flexDirection={"row"}
              >
                <TouchableOpacity
                  onPress={onPressLeftComunidadesScreen}
                  hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
                >
                  <FontAwesome
                    name="chevron-left"
                    size={24}
                    color="#ffff"
                    style={{
                      padding: 15,
                      paddingHorizontal: 25,
                    }}
                  ></FontAwesome>
                </TouchableOpacity>
                <Ionicons
                  name="md-people"
                  size={32}
                  color="white"
                  style={{ paddingVertical: 10 }}
                />
              </View>
            );
          },
          headerRight: () => {
            return (
              <View
                flex={1}
                justifyContent={"center"}
                justifyItems={"center"}
                flexDirection={"row"}
              >
                <TouchableOpacity
                  onPress={onPressLeftComunidadesScreen}
                  hitSlop={{ top: 25, bottom: 25, left: 15, right: 15 }}
                >
                  <FontAwesome
                    name="plus"
                    size={24}
                    color="white"
                    style={{ paddingTop: 18, paddingRight: 35 }}
                    onPress={onPressRigthPlusComunidadesScreen}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="ComunidadeDetails"
        component={Comunidade}
        options={{
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="ColetaDadosDetails"
        component={FormBasicColetaDados}
        options={{
          headerTintColor: "white",
          title: "Coleta de Dados",
          headerBackTitle: "Voltar",
        }}
      />
    </Stack.Navigator>
  );
}
