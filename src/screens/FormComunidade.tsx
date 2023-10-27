import { Center, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import TableList from "../components/TableList";
import { IComunidade } from "../interfaces/IComunidades";
import { coletaAPI } from "../api/coletaAPI";
import ModalComunidade from "../components/ModalComunidade";



export default function FormComunidade() {

    const [dataComunidades, setDataComunidades] = useState<IComunidade[]>([]);
    const [modalComunidadeS, setModalComunidadeS] = useState<boolean>(false);
    const [comunidadeSelected, setComunidadeSelected] = useState<IComunidade | null>(null);

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
                <TableList data={dataComunidades}  handleModal={(item) => {
                    setModalComunidadeS(true);
                    setComunidadeSelected(item);
                }}/>
            </Center>
            <ModalComunidade setShowModal={setModalComunidadeS} showModal={modalComunidadeS}/>
        </VStack>
    )
}