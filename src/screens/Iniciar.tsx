import React, { useEffect, useState } from "react";
import {
  Text,
  Alert,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

interface IniciarProps {
  navigation: BottomTabNavigationProp<
    Record<string, object | undefined>,
    string
  >;
}

export default function Iniciar({ navigation }: IniciarProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onHandleLogin = () => {
    if (email === "" && password === "") {
      console.log("logado");
      navigation.navigate("Conhecer");
    } else {
      Alert.alert("Erro ao logar");
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: "lilita-one",
          fontSize: 56,
          lineHeight: 76,
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Conhecimentos Beradeiros
      </Text>
      <View />
      <SafeAreaView style={styles.form}>
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Image
            source={require("../../assets/boat.png")}
            style={{
              width: 150,
              height: 150,
            }}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
  form: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
