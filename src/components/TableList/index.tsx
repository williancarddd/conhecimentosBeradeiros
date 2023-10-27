import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Spacer,
  VStack,
  Text,
  View,
} from "native-base";
import { ListRenderItemInfo, TouchableNativeFeedback } from "react-native";
import React from "react";
import { IComunidade } from "../../interfaces/IComunidades";
import { FontAwesome } from "@expo/vector-icons";

interface IProps {
  data?: IComunidade[];
  handleModal: (item: IComunidade) => void;
}

export default function TableList({ data, handleModal }: IProps) {
  function renderITem({ item }: ListRenderItemInfo<IComunidade>) {
    return (
      <Box
        borderBottomWidth="1"
        borderColor="muted.800"
        pl={["0.5", "4"]}
        pr={["1", "5"]}
        py="4"
      >
        <TouchableNativeFeedback>
          <HStack
            space={[3, 3]}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Avatar
              size="54px"
              source={{
                uri: item.url,
              }}
            />
            <VStack>
              <Text
                color="white"
                fontSize={"xl"}
                bold
                fontFamily={"lilita-one"}
              >
                {item.nome}
              </Text>
              <View
                flex={1}
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text
                  color="gray.200"
                  textBreakStrategy="balanced"
                  maxWidth={"72"}
                >
                  {item.descricao?.slice(0, 150)} {""} {". . ."}
                </Text>
                <FontAwesome
                  name="chevron-right"
                  size={26}
                  color="white"
                  style={{ paddingLeft: 8 }}
                  onPress={() => handleModal(item)}
                />
              </View>
            </VStack>

            <Spacer />
          </HStack>
        </TouchableNativeFeedback>
      </Box>
    );
  }
  return (
    <Box>
      <FlatList
        data={data}
        renderItem={renderITem}
        keyExtractor={(item) => String(item.id)}
      />
    </Box>
  );
}
