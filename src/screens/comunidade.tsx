import React from "react";
import { Center, FormControl, View, Button, ScrollView } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import { InputBase } from "../components/InputBase";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRoute } from "@react-navigation/native";
import { IComunidade } from "../interfaces/IComunidades";
import { TextAreaBase } from "../components/TextAreaBase";
import TableListDadosColetados from "../components/TableListDadosColetados";
import { FormBasicComunidade } from "../components/FormBasicComunidade";


export function Comunidade() {
  const comunidade: Readonly<IComunidade | undefined > = useRoute()?.params;
  
  return (
    <Center w={'100%'}>
      <TableListDadosColetados 
      Header={<FormBasicComunidade />}
      handleModal={() => {}}
      />
    </Center>
  )
}
