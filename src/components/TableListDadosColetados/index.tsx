import { Box, FlatList, HStack, Spacer, VStack, Text, View } from "native-base";
import { ListRenderItemInfo, TouchableNativeFeedback } from 'react-native';
import React, { useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { CommunityData } from "../../interfaces/IDadosColetados";
import { coletaAPI } from "../../api/coletaAPI";
import { format } from "date-fns";
import Separator from "../Separator";
import { useRoute } from "@react-navigation/native";
import { IComunidade } from "../../interfaces/IComunidades";
import { IDataHandler } from "../../interfaces/IDataHandle";

interface IProps {
  handleModal: (item: CommunityData) => void
  Header: JSX.Element
};



export default function TableListDadosColetados({ handleModal, Header }: IProps) {
  const comunidade = useRoute()?.params as unknown as Readonly<IDataHandler<IComunidade> | undefined> ;

  const [historyDataColetado, setHistoryDataColetado] = useState<CommunityData[]>()
  async function populateComunidadeHistory() {
    try {
      const resp_get_comunidade = await coletaAPI.get<CommunityData[]>(`/textos-coletados/${comunidade?.data.id}`);

      setHistoryDataColetado(resp_get_comunidade.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    populateComunidadeHistory();
  }, []);

  function renderITem({ item }: ListRenderItemInfo<CommunityData>) {

    return (
      <Box pl={["0.5", "4"]} pr={["1", "5"]} py="4" >
        <TouchableNativeFeedback >
          <HStack space={[3, 3]} justifyContent="space-between" alignItems={'center'}>

            <VStack>

              <View flex={1} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                <Text color="black" textBreakStrategy="balanced" maxWidth={"72"}>
                  {item.descricao?.slice(0, 150)} {""} {". . ."}
                </Text>
                <FontAwesome name='chevron-right' size={26} color="black" style={{ paddingLeft: 36 }} onPress={() => handleModal(item)} />
              </View>
              <Text color="black" fontSize={'sm'} bold fontFamily={'lilita-one'}>
                Data de coleta:  {format(new Date(item.data_coletado), 'dd/MM/yyyy')}
              </Text>
            </VStack>

            <Spacer />
          </HStack>
        </TouchableNativeFeedback>
      </Box>
    )
  }
  return (
    <Box>
      
      <FlatList
        data={historyDataColetado}
        renderItem={renderITem}
        keyExtractor={item => String(item.id)}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={Header}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};