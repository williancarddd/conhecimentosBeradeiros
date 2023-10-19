import React, { useEffect, useCallback, useState } from 'react';
import { Bubble, GiftedChat, IMessage, InputToolbar } from 'react-native-gifted-chat';

const customInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        bottom: 12,
        padding: 4,
      }}

    />
  );
};

const customBubble = props => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#121F33', // Cor de fundo da mensagem de entrada
          paddingVertical:8,
          paddingHorizontal:12
        },
        right: {
          backgroundColor: '#1D74F5', // Cor de fundo da mensagem de saída,
          paddingVertical:8,
          paddingHorizontal:12
        },
      }}
      textStyle={{
        left: {
          color: 'white', // Cor do texto da mensagem de entrada
        },
        right: {
          color: 'white', // Cor do texto da mensagem de saída
        },
      }}
    />
  );
};

const Chat = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);
    const onSend: (message:IMessage[]) => void = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);
    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            messagesContainerStyle={{
              backgroundColor: '#030C1A',
              paddingVertical: 20,
            }}
            showUserAvatar={false}
            renderAvatar={() => null}
            onSend={messages => onSend(messages)}
            renderInputToolbar={props => customInputToolbar(props)}
            renderBubble={props => customBubble(props)}
            alignTop={true}
            user={{
                _id: 1
            }}
        />
    );
}

export default Chat;