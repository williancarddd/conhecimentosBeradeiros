import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  TextInput,
  Dimensions,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StyleSheet,
  SectionList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const botIcon = require("../../assets/favicon.png");
import { Ionicons } from "@expo/vector-icons";
import { messageListData } from "../api/fakeApi";
import { groupBy } from "lodash";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { IMessage } from "../interfaces/IMessage";
import uuid from "react-native-uuid";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { iaAPI } from "../api/ia/ia";

const { width } = Dimensions.get("window");

interface IniciarProps {
  navigation: BottomTabNavigationProp<
    Record<string, object | undefined>,
    string
  >;
}

export function Chat({ navigation }: IniciarProps) {
  const sectionListRef = useRef(null);
  const [messages, setMessages] = useState<
    { title: string; data: IMessage[] }[]
  >([]);
  const [messageList, setMessageList] = useState<IMessage[]>(messageListData);
  const [sections, setSections] = useState<IMessage[][]>([]);
  const [msg, setMsg] = useState("");

  function backScreen() {
    navigation.navigate("Iniciar");
  }

  useEffect(() => {
    const groupedList = Object.values(
      groupBy(messageList, (message) => {
        return message.createdAt.toISOString().substring(0, 10);
      }),
    );
    var data: { title: string; data: IMessage[] }[] = [];
    groupedList.map((date) => {
      let sec = {
        title: format(new Date(date[0].createdAt), "PPP", { locale: pt }),
        data: [...date],
      };
      data.push(sec);
    });
    setMessages(data);
    setSections(groupedList);
  }, [messageList]);

  function renderMsg(item: IMessage) {
    const isFromUser = item.from === 1;
    const messageTime = format(item.createdAt, "HH:mm", { locale: pt });

    return (
      <View
        style={[isFromUser ? styles.forMeContainer : styles.fromMeContainer]}
      >
        <View style={[isFromUser ? styles.forMe : styles.fromMe]}>
          <Text style={styles.msgTxt}>{item.message} </Text>
          <Text style={styles.hour}>{messageTime}</Text>
        </View>
      </View>
    );
  }

  async function getAnswerFromAPI(
    question: string,
    comunidade: string,
  ): Promise<any> {
    try {
      const response = await iaAPI.post("/perguntar", {
        question: question,
        comunidade: comunidade,
      });
      console.log(response);
      const json = await response.data;
      console.log(json);
      return json;
    } catch (error) {
      console.error(error);
    }
  }

  async function sendMessage() {
    const dateSent = new Date();
    const messageSent = msg;
    const comunidade = "Comunidade de Nazaré";

    if (messageSent.trim() !== "") {
      const formatMessage: IMessage = {
        id: uuid.v4() as string,
        createdAt: dateSent, // Set the message's creation time as a Date
        message: messageSent,
        status: 1,
        from: 2,
        to: 1,
      };
      setMessageList((prev) => [...prev, formatMessage]);
      setMsg("");
    }

    if (messageSent.trim() !== "") {
      const response = await getAnswerFromAPI(messageSent, comunidade);

      const responseMessage: IMessage = {
        id: uuid.v4() as string,
        createdAt: dateSent, // Set the message's creation time as a Date
        message:
          response.sentence,
        status: 2,
        from: 1,
        to: 2,
      };
      setMessageList((prev) => [...prev, responseMessage]);
      setMsg("");
    }

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <FontAwesome
          name="chevron-left"
          size={24}
          color="white"
          onPress={backScreen}
        />
        <Image source={botIcon} style={styles.avatar} />
        <View>
          <Text style={styles.name}> Roberinho </Text>
        </View>
      </View>

      <View style={styles.content}>
        <SectionList
          sections={messages}
          ref={sectionListRef}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => renderMsg(item)}
          scrollsToTop={false}
          onContentSizeChange={(_, h) => {
            // @ts-ignore
            try {
              sectionListRef?.current?.scrollToLocation({
                itemIndex: messageList?.length,
                sectionIndex: sections[sections?.length]?.length,
                viewOffset: -h,
              });
            } catch {
              console.error("error ao scrollar");
            }
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.titleContainer}>
              <Text style={styles.sText}>{title}</Text>
            </View>
          )}
        />
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        enabled={Platform.OS == "ios"}
        style={styles.footer}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 20,
          }}
        >
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            value={msg}
            onChangeText={setMsg}
            multiline={true}
          />
          <TouchableOpacity>
            <Ionicons
              name="send"
              size={26}
              color="#ffff"
              onPress={sendMessage}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#262626",
    flex: 1,
  },
  footer: {
    borderTopColor: "#4444447f",
    borderTopWidth: 1,
  },
  avatar: {
    height: 48,
    width: 48,
    borderRadius: 22,
    marginHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: "#1A1717",
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    color: "white",
    fontSize: 13,
    padding: 4,
  },
  input: {
    height: 44,
    borderColor: "#4444447f",
    backgroundColor: "#525252",
    color: "#ffff",
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 7,
    paddingLeft: 12,
    flex: 1,
    fontSize: 16,
    padding: 2,
  },
  titleContainer: {
    alignSelf: "center",
    marginTop: 12,
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  sText: {
    fontSize: 13,
    color: "white",
    textAlign: "center",
  },
  content: {
    flex: 1,
    backgroundColor: "#262626",
    marginRight: width * 0.03,
    marginLeft: width * 0.03,
  },
  forMeContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  forMe: {
    backgroundColor: "#d9d9d9e4",
    paddingTop: 10,
    paddingLeft: 10,
    maxWidth: width * 0.64,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    marginBottom: width * 0.1,
  },
  fromMeContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  fromMe: {
    backgroundColor: "#D9D9D9",
    paddingTop: 10,
    paddingLeft: 10,
    maxWidth: width * 0.64,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginBottom: width * 0.1,
  },
  msgTxt: {
    fontSize: 16,
    fontFamily: "Oswald",
    fontWeight: "normal",
    color: "black",
    marginRight: 40,
  },
  hour: {
    fontSize: 11,
    color: "#5e5e5e",
    textAlign: "right",
    paddingRight: 13,
  },
});
export default Chat;
