import React, { useState, useEffect } from 'react';
import { StatusBar, Dimensions, Switch } from 'react-native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

  const buttonSize = Math.min(width, height) * 0.2;

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
      justifyContent: 'space-around',
      marginTop: 20,
      height: buttonSize + 40,
    },
    button: {
      width: buttonSize,
      height: buttonSize,
      padding: 20,
      borderRadius: 5,
      borderWidth: 7,
      borderColor: '#9999FF',
      backgroundColor: '#9999FF',
    },
    buttonLabel: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      textAlign: 'left',
      color: 'white',
      fontSize: 10,
      fontWeight: 'medium',
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
          <Text style={styles.sirenText}>Siren</Text>
          <Text style={styles.senseText}>SENSE</Text>
        </Text>
      ) : (
        <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { marginRight: 10 }]}>
              <FontAwesome5 name="satellite-dish" size={buttonSize * 0.6} color="white" />
              <Text style={[styles.buttonLabel, { fontSize: buttonSize * 0.1 }]}>Satellite Dish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <FontAwesome5 name="map" size={buttonSize * 0.6} color="white" />
              <Text style={[styles.buttonLabel, { fontSize: buttonSize * 0.1 }]}>Map</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { marginRight: 10 }]}>
              <FontAwesome5 name="clipboard" size={buttonSize * 0.6} color="white" />
              <Text style={[styles.buttonLabel, { fontSize: buttonSize * 0.1 }]}>Clipboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <FontAwesome5 name="map" size={buttonSize * 0.6} color="white" />
              <Text style={[styles.buttonLabel, { fontSize: buttonSize * 0.1 }]}>Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </View>
  );
}
