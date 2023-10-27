import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TextInput, Dimensions, SafeAreaView, StatusBar, View, Image, Text, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
const botIcon = require('../../assets/favicon.png')
import { Ionicons } from '@expo/vector-icons';
import { messageListData } from '../api/fakeApi';
import { groupBy } from 'lodash';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { IMessage } from '../interfaces/IMessage';
import uuid from 'react-native-uuid'
import { colors } from '../utils/colors';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const { width } = Dimensions.get('window');
interface IniciarProps {
  navigation: BottomTabNavigationProp<Record<string, object | undefined>, string>;
}

export function Chat({ navigation }: IniciarProps) {
  const sectionListRef = useRef(null);
  const [messages, setMessages] = useState<{ title: string; data: IMessage[]; }[]>([]);
  const [messageList, setMessageList] = useState<IMessage[]>(messageListData);
  const [sections, setSections] = useState<IMessage[][]>([]);
  const [msg, setMsg] = useState("");

  function backScreen() {
    navigation.navigate('Iniciar')
  }

  useEffect(() => {
    const groupedList = Object.values(groupBy(messageList, (message) => {
      return message.createdAt.toISOString().substring(0, 10);
    }));
    var data:{ title: string; data: IMessage[]; }[] = [];
    groupedList.map((date) => {
      let sec =  {
        title: format(new Date(date[0].createdAt), 'PPP', { locale: pt }),
        data: [...date],
      };
      data.push(sec);
    });
    setMessages(data);
    setSections(groupedList);
  }, [messageList]);
  
  function renderMsg(item: IMessage) {
    const isFromUser = item.from === 1;
    const messageTime = format(item.createdAt, 'HH:mm', { locale: pt });
  
    return (
      <View style={isFromUser ? styles.formMe : styles.fromMe}>
        <Text style={styles.msgTxt}>{item.message}</Text>
        <View>
          <Text style={styles.hour}>{messageTime}</Text>
        </View>
      </View>
    );
  }
  
  

  function sendMessage() {
    const dateSent = new Date();
    const messageSent = msg;
  
    if (messageSent.trim() !== '') {
      const formatMessage: IMessage = {
        id: uuid.v4() as string,
        createdAt: dateSent, // Set the message's creation time as a Date
        message: messageSent,
        status: 1,
        from: 2,
        to: 1
      };
      setMessageList(prev => [...prev, formatMessage]);
      setMsg("");
      //@ts-ignore
    }
  }

 

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar barStyle='light-content' />
      <View style={styles.header} >
        <FontAwesome name='chevron-left' size={24} color="white" onPress={backScreen} />
        <Image source={botIcon} style={styles.avatar} />
        <View>
          <Text style={styles.name}> Roberinho </Text>
          <Text style={styles.status}>Digitando... </Text>
        </View>
      </View>

      <View style={styles.content}>
        <SectionList
          sections={messages}
          ref={sectionListRef}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => renderMsg(item)}
          scrollsToTop={false}
          onContentSizeChange={(w, h) => {
            // @ts-ignore
            try {
              sectionListRef?.current?.scrollToLocation({itemIndex: messageList?.length , sectionIndex: sections[sections?.length]?.length, viewOffset:  -h})
            } catch {
              console.error('error ao scrollar')
            }
          }}
          renderSectionHeader={({ section: { title } }) =>
            <View style={styles.titleContainer}>
              <Text style={styles.sText}>{title}</Text>
            </View>}
        
        />
      </View>
      <KeyboardAvoidingView
        behavior='padding'
        enabled={Platform.OS == 'ios'}
        style={styles.footer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
          <TextInput style={styles.input}  value={msg} onChangeText={setMsg} />
          <TouchableOpacity>
            <Ionicons name="send" size={26} color='#ffff' onPress={sendMessage}/>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors['deep-fir'][500],
    borderColor: 'red',
    flex: 1, 
  },
  footer: {
    borderTopColor: '#4444447f',
    borderTopWidth: 1
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 22,
    marginHorizontal: 15
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 10
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  status: {
    color: 'white',
    fontSize: 13,
    padding: 4
  },
  content: {
    backgroundColor: colors['deep-fir'][500],
    flex: 1
  },
  input: {
    height: 40,
    borderColor: '#4444447f',
    backgroundColor: colors['deep-fir'][400],
    color: '#ffff',
    borderWidth: 1,
    borderRadius: 40,
    marginHorizontal: 20,
    marginVertical: 7,
    paddingLeft: 12,
    flex: 1,
    fontSize: 16,
    padding: 2
  },
  titleContainer: {
    alignSelf: 'center',
    marginTop: 12,
    paddingVertical: 3,
    paddingHorizontal: 12,
    borderRadius: 12
  },
  sText: {
    fontSize: 13,
    color: 'white',
    textAlign: 'center'
  },
  formMe: {
    backgroundColor: colors['great-blue'][600],
    padding: 10,
    maxWidth: width * 0.64,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    margin: 10
  },
  fromMe: {
    backgroundColor: colors['great-blue'][700],
    padding: 10,
    maxWidth: width * 0.8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    marginTop:  width * 0.20 - 50,
    marginBottom:  width * 0.20 - 50,
    marginLeft:  width * 0.20 + 60,
  },
  msgTxt: {
    fontSize: 16,
    color: 'white'
  },
  hour: {
    fontSize: 11,
    color: '#ffffff9e',
    textAlign: 'right'
  }
})
export default Chat;