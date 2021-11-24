import { firebase } from "../../firebase/config";
import {
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useState } from "react";

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "sans-serif",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    width: 250,
  },
});

export const AdopterSignup = () => {
  return (
    <SafeAreaView>
      <Text style={styles.baseText}>
        <Text style={styles.titleText}>Welcome, adopter!</Text>
      </Text>

      <Text style={styles.baseText}>Name</Text>
      <TextInput style={styles.input}></TextInput>

      <Text style={styles.baseText}>Email</Text>
      <TextInput style={styles.input}></TextInput>

      <Text style={styles.baseText}>Password</Text>
      <TextInput style={styles.input}></TextInput>

      <Button title="Next"></Button>
    </SafeAreaView>
  );
};
