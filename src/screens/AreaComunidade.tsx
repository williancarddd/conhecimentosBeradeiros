import { Center, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import TableList from "../components/TableListComunidades";
import { IComunidade } from "../interfaces/IComunidades";
import { coletaAPI } from "../api/coletaAPI";
import ModalComunidade from "../components/ModalComunidade";
import { StackNavigationProp } from "@react-navigation/stack";
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import { useNavigation } from "@react-navigation/native";
import { RootStackParamsList } from "../routes/stack.routes";

type Props = NativeStackNavigationProp<RootStackParamsList, 'ComunidadeDetails'>;

export default function AreaComunidade() {
  const { navigate } = useNavigation<Props>();
  const [dataComunidades, setDataComunidades] = useState<IComunidade[]>([]);
  const [modalComunidadeS, setModalComunidadeS] = useState<boolean>(false);

  async function populateComunidade() {
    try {
      const resp_get_comunidade = await coletaAPI.get<IComunidade[]>("/comunidades");

      setDataComunidades(resp_get_comunidade.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    populateComunidade();
  }, []);


  return (
    <VStack bgColor={"#262626"} flex={1} paddingX={4}>
      <Center>
        <TableList data={dataComunidades} handleModal={(item) => {
          navigate('ComunidadeDetails', item);
        }} />
      </Center>
      <ModalComunidade setShowModal={setModalComunidadeS} showModal={modalComunidadeS} />
    </VStack>
  )
}
