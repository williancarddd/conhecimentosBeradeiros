import React from "react";
import {
  Center,
  FormControl,
  Input,
  Text,
  View,
  Button,
  TextArea,
  IconButton,
} from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import { InputBase } from "../components/InputBase";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  navigation: StackNavigationProp<Record<string, object | undefined>, string>;
}

export function Comunidade() {
  return (
    <Center w={"100%"} padding={4}>
      <View w={"100%"} mb={4}>
        <Text
          bold
          fontSize="xl"
          textAlign={"center"}
          borderBottomColor={"gray.200"}
          borderBottomWidth={1}
          paddingBottom={2}
        >
          Informações Básicas
        </Text>
        <FormControl>
          <InputBase label="Nome da Comunidade" inputMode="text" />
          <FormControl.Label>Descrição da Comunidade</FormControl.Label>
          <TextArea
            h={16}
            numberOfLines={3}
            placeholder="Digite uma breve descrição da comunidade"
            autoCompleteType={""}
          />
        </FormControl>
      </View>
      <View w={"100%"} mt={4}>
        <Text bold fontSize="xl" mb={4} textAlign={"center"}>
          Localização da Comunidade
        </Text>
        <FormControl paddingBottom={2}>
          <InputBase label="Latitude" inputMode="decimal" />
          <InputBase label="Longitude" inputMode="decimal" />
        </FormControl>
      </View>
      <View
        borderBottomWidth={1}
        borderBottomColor={"gray.200"}
        mt={2}
        padding={4}
        width={"100%"}
      >
        <TouchableOpacity>
          <Button
            size="lg"
            backgroundColor={"dark.300"}
            fontSize={18}
            padding={4}
            borderRadius={32}
            mt={4}
          >
            Criar Comunidade
          </Button>
        </TouchableOpacity>
      </View>
      <View mt={2} padding={4} width={"100%"}>
        <IconButton
          size={16}
          borderRadius={32}
          variant="solid"
          alignSelf={"flex-end"}
          justifyContent={"center"}
          alignContent={"center"}
          icon={<Ionicons name="add" size={36} color="white" />}
        />
      </View>
    </Center>
  );
}
