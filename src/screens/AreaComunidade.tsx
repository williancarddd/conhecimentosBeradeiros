import { Center, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import TableList from "../components/TableListComunidades";
import { IComunidade } from "../interfaces/IComunidades";
import { coletaAPI } from "../api/coletaAPI";
import ModalComunidade from "../components/FormBasicColetaDados";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import useHandleComunidade from "../hooks/HandleComunidade";
import { StackType } from "../interfaces/TStack";

export default function AreaComunidade() {
  const isFocused = useIsFocused();

  const { editComunidade } = useHandleComunidade();
  const { navigate } = useNavigation<StackType>();
  const [dataComunidades, setDataComunidades] = useState<IComunidade[]>([]);
  const [modalComunidadeS, setModalComunidadeS] = useState<boolean>(false);

  async function populateComunidade() {
    try {
      const resp_get_comunidade =
        await coletaAPI.get<IComunidade[]>("/comunidades");

      setDataComunidades(resp_get_comunidade.data);
    } catch (error) {
      // __AUTO_GENERATED_PRINT_VAR_START__
      console.log("AreaComunidade#populateComunidade error: %s", error); // __AUTO_GENERATED_PRINT_VAR_END__
    }
  }
  useEffect(() => {
    // __AUTO_GENERATED_PRINT_VAR_START__
    console.log("AreaComunidade#(anon) useEffect: de novo"); // __AUTO_GENERATED_PRINT_VAR_END__
    if (isFocused) {
      populateComunidade();
    }
  }, [isFocused]);

  return (
    <VStack bgColor={"#262626"} flex={1} paddingX={4}>
      <Center>
        <TableList
          data={dataComunidades}
          handleModal={(item) => {
            navigate("ComunidadeDetails", {
              data: item,
              trigger: editComunidade,
              mode: "edit",
            });
          }}
        />
      </Center>
      <ModalComunidade
        setShowModal={setModalComunidadeS}
        showModal={modalComunidadeS}
      />
    </VStack>
  );
}
