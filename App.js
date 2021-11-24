import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import ShelterSignup from './src/screens/Signup/ShelterSignup';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World! We are Occam's Router!</Text>
      <ShelterSignup />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 10,
  },
});
