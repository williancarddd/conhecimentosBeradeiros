import React from "react";
import { Center } from "native-base";
import TableListDadosColetados from "../components/TableListDadosColetados";
import { FormBasicComunidade } from "../components/FormBasicComunidade";

export function Comunidade() {
  return (
    <Center w={"100%"}>
      <TableListDadosColetados
        Header={<FormBasicComunidade />}
        handleModal={() => { }}
      />
    </Center>
  );
}
