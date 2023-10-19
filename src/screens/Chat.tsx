import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from "react-native";

export default function Chat() {
  const chatData = [
    { id: 1, message: "Hello", sender: "user" },
    { id: 2, message: "Hi there!", sender: "other" },

  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={item.sender === "user" ? styles.userMessage : styles.otherMessage}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          // Add your onChangeText and value handlers here
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030C1A',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1D74F5',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '70%',
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'lightgray',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 10,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
