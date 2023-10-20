import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StatusBar, View, Image, Text, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, SectionList, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
const botIcon = require('../../assets/favicon.png')
import { Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { messageListData } from '../api/fakeApi';
import { groupBy } from 'lodash';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { IMessage } from '../interfaces/IMessage';
import uuid from 'react-native-uuid'

const { width } = Dimensions.get('window');
interface IniciarProps {
  navigation: DrawerNavigationProp<Record<string, object | undefined>, string>;
}

export function Chat({ navigation }: IniciarProps) {
  const flatListRef = useRef(null);
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
    setSections(groupedList);
  }, [messageList]);
  
  function renderMsg({ item }: { item: IMessage }) {
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
      // Scroll to the last message
      flatListRef.current?.scrollToEnd({
        animated: true,
       
      });
    }
  }

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar barStyle='light-content' />
      <View style={styles.header} >
        <FontAwesome name='chevron-left' size={24} color="white" onPress={backScreen} />
        <Image source={botIcon} style={styles.avatar} />
        <View>
          <Text style={styles.name}> Nome do BOt </Text>
          <Text style={styles.status}>Digitando... </Text>
        </View>
      </View>

      <View style={styles.content}>
        <FlatList
          data={sections[0]}
          ref={flatListRef}
          keyExtractor={(item, index) => `section-${index}`}
          renderItem={renderMsg}
          ListHeaderComponent={<View style={styles.titleContainer}>
            <Text style={styles.sText}>
              {sections[sections?.length - 1]?.length > 0
                ? format(sections[sections.length - 1][0].createdAt, 'PPP', { locale: pt })
                : ''}
            </Text>
          </View>}
        />
      </View>
      <KeyboardAvoidingView
        behavior='padding'
        enabled={Platform.OS == 'ios'}
        keyboardVerticalOffset={100}
        style={styles.footer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
          <TextInput style={styles.input} value={msg} onChangeText={setMsg} />
          <TouchableOpacity>
            <Ionicons name="boat-outline" size={26} color='#ffff' onPress={sendMessage} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#030C1A',
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
    borderBottomWidth: 1,
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
    backgroundColor: '#030C1A',
    flex: 1
  },
  input: {
    height: 40,
    borderColor: '#4444447f',
    backgroundColor: '#121F33',
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
    backgroundColor: '#121F33',
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
    backgroundColor: '#1D74F5',
    padding: 10,
    maxWidth: width * 0.8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    margin: 10
  },
  fromMe: {
    backgroundColor: '#121F33',
    padding: 10,
    maxWidth: width * 0.8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    margin: width * 0.20 - 50
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