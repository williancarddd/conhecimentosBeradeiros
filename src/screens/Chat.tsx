import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

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
            showUserAvatar={false}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1
            }}
        />
    );
}

export default Chat;