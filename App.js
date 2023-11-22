import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions, Switch, TextInput, FlatList } from 'react-native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Voice from 'react-native-voice';
import * as Speech from 'expo-speech'; // Use Expo's speech module

const { width, height } = Dimensions.get('window');

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chat, setChat] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  const buttonWidth = Math.min(width, height) * 0.2;
  const buttonHeight = 40;
  const buttonBorderRadius = 10;

  const handleChangeText = (inputText) => {
    setText(inputText);
  };

  const handleSubmit = () => {
    if (text.trim() !== '') {
      const newChat = [...chat, { id: chat.length, text, isUser: true }];
      setChat(newChat);
      setText('');

      // Text-to-speech using Expo's Speech module
      Speech.speak(text, { language: 'en' })
        .then(() => console.log('Text-to-speech successful'))
        .catch((error) => console.error('Error in text-to-speech:', error));
    }
  };

  // Voice
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
      Voice.onSpeechStart = () => {
        setIsRecording(true);
      };
      Voice.onSpeechResults = (e) => {
        setRecognizedText(e.value[0]);
      };
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    Voice.onSpeechEnd = () => {
      setIsRecording(false);
      if (recognizedText.trim() !== '') {
        const newChat = [
          ...chat,
          { id: chat.length, text: recognizedText, isUser: false },
        ];
        setChat(newChat);

        // Text-to-speech using Expo's Speech module
        Speech.speak(recognizedText, { language: 'en' })
          .then(() => console.log('Text-to-speech successful'))
          .catch((error) => console.error('Error in text-to-speech:', error));
      }
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [recognizedText, chat]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#B8B8B8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sirenText: {
      color: '#000000',
      fontSize: 32,
      fontWeight: 'bold',
    },
    senseText: {
      color: '#6666FF',
      fontSize: 32,
      fontWeight: 'bold',
    },
    text: {
      color: isDarkMode ? 'white' : '#000000',
      fontSize: 32,
      fontWeight: 'bold',
    },
    toggleContainer: {
      position: 'absolute',
      top: 20,
      right: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    toggleIcon: {
      marginRight: 5,
      color: isDarkMode ? '#FFD700' : '#6666FF',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between', // Updated to space-between for even spacing
      alignItems: 'center',
      marginTop: 10,
      paddingHorizontal: 20, // Added paddingHorizontal for space on both sides
    },
    button: {
      flex: 1,
      height: buttonHeight,
      borderRadius: buttonBorderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#9999FF',
      backgroundColor: '#9999FF',
    },
    microphoneIcon: {
      fontSize: buttonHeight * 0.6, // Adjusted size
      color: 'white',
    },
    buttonLabel: {
      color: 'white',
      fontSize: 12,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center', // Updated to align items in the center
      marginTop: 10,
      paddingHorizontal: 20, // Added paddingHorizontal for space on both sides
    },
    input: {
      flex: 1,
      height: buttonHeight, // Set the height to match the button
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      marginRight: 10, // Added margin to separate TextInput and Submit button
    },
    submitbutton: {
      height: buttonHeight,
      width: buttonWidth, // Set a fixed width for uniformity
      backgroundColor: '#9999FF',
      borderRadius: buttonBorderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    submitbuttonText: {
      color: 'white',
      fontSize: 12,
    },
    chatBubble: {
      padding: 10,
      margin: 5,
      borderRadius: 10,
      maxWidth: '80%',
    },
    userBubble: {
      backgroundColor: '#9999FF',
      alignSelf: 'flex-end',
    },
    botBubble: {
      backgroundColor: '#6666FF',
      alignSelf: 'flex-start',
    },
    bubbleText: {
      color: 'white',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <FontAwesome5
          name={isDarkMode ? 'moon' : 'sun'}
          size={20}
          style={styles.toggleIcon}
        />
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? '#6666FF' : 'white'}
          trackColor={{ false: '#9999FF', true: '#6666FF' }}
        />
      </View>
      {loading ? (
        <Text>
          <Text style={styles.sirenText}>Speech2</Text>
          <Text style={styles.senseText}>TEXT</Text>
        </Text>
      ) : (
        <View>
          <FlatList
            data={chat}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.chatBubble,
                  item.isUser ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text style={styles.bubbleText}>{item.text}</Text>
              </View>
            )}
          />
          <View style={styles.buttonContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleChangeText}
              value={text}
              placeholder="Enter text here..."
            />
            <TouchableOpacity style={styles.submitbutton} onPress={handleSubmit}>
              <Text style={styles.submitbuttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={[styles.button]} onPress={startRecording}>
              <FontAwesome5 name="microphone" style={styles.microphoneIcon} />
              <Text style={styles.buttonLabel}>
                {isRecording ? 'Stop Recording' : 'Microphone'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </View>
  );
}
