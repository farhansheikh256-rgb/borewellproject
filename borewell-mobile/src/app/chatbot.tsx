import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ragApiURL } from '../utils/api';

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me anything about the borewell manuals.", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${ragApiURL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMsg }) 
      });

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      
      setMessages(prev => [...prev, { text: data.answer || "I don't know the answer to that.", isBot: true }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { text: "Error connecting to the RAG server.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        style={styles.messagesContainer}
      >
        {messages.map((msg, idx) => (
          <View key={idx} style={[styles.bubble, msg.isBot ? styles.botBubble : styles.userBubble]}>
            <Text style={[styles.msgText, msg.isBot ? styles.botText : styles.userText]}>{msg.text}</Text>
          </View>
        ))}
        {isLoading && (
          <View style={[styles.bubble, styles.botBubble]}>
            <ActivityIndicator size="small" color="#fff" />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={input} 
          onChangeText={setInput} 
          placeholder="Ask a question..."
          placeholderTextColor="#94a3b8"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage} disabled={isLoading || !input.trim()}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  messagesContainer: { flex: 1, padding: 15 },
  bubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 10 },
  botBubble: { backgroundColor: '#1e293b', alignSelf: 'flex-start', borderBottomLeftRadius: 4 },
  userBubble: { backgroundColor: '#0ea5e9', alignSelf: 'flex-end', borderBottomRightRadius: 4 },
  msgText: { fontSize: 16, lineHeight: 22 },
  botText: { color: '#f8fafc' },
  userText: { color: '#ffffff' },
  inputContainer: { flexDirection: 'row', padding: 15, backgroundColor: '#1e293b', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#334155', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, color: 'white', fontSize: 16 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#0ea5e9', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }
});
