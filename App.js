import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = 2000;

    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>
          <Text style={styles.sirenText}>Siren</Text>
          <Text style={styles.senseText}>SENSE</Text>
        </Text>
      ) : (
        <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { marginRight: 10 }]}>
              <FontAwesome5 name="satellite-dish" size={30} color="white" />
              <Text style={styles.buttonLabel}>Satellite Dish</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <FontAwesome5 name="map" size={30} color="white" />
              <Text style={styles.buttonLabel}>Map</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, { marginRight: 10 }]}>
              <FontAwesome5 name="clipboard" size={30} color="white" />
              <Text style={styles.buttonLabel}>Clipboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <FontAwesome5 name="map" size={30} color="white" />
              <Text style={styles.buttonLabel}>Map</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8B8B8',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    height: 100,
  },
  button: {
    position: 'relative',
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
    fontWeight: 'medium'
  },
});
