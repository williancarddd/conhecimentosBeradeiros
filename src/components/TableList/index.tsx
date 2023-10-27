import { Avatar, Box, FlatList, HStack, Spacer, VStack, Text } from "native-base";
import {  ListRenderItemInfo, TouchableNativeFeedback } from 'react-native';
import React from "react";
import { IComunidade } from "../../interfaces/IComunidades";

interface IProps {
  data?: IComunidade[];
  handleModal: (item: IComunidade) => void

}

export default function TableList({ data, handleModal }: IProps) {
  function renderITem({ item }: ListRenderItemInfo<IComunidade>) {
  
    return (
      <Box borderBottomWidth="1" borderColor="muted.800" pl={["0.5", "4"]} pr={["1", "5"]} py="4">
        <TouchableNativeFeedback onPress={() => handleModal(item)}>
          <HStack space={[3, 3]} justifyContent="space-between">
            <Avatar size="48px" source={{
              uri: item.url
            }} />
            <VStack>
              <Text color="white" bold>
                {item.nome}
              </Text>
              <Text color="coolGray.400" padding={2} textBreakStrategy="balanced" maxWidth={"xs"}>
                {item.descricao}
              </Text>
            </VStack>
            <Spacer />
          </HStack>
        </TouchableNativeFeedback>
      </Box>
    )
  }
  return <Box>
    <FlatList data={data} renderItem={renderITem} keyExtractor={item => String(item.id)} />
  </Box>;
};