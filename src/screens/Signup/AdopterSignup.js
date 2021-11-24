import {
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
// import { db } from "../../firebase/config";
import { auth } from "../../firebase/config";
import { getFirestore } from "@firebase/firestore";
import { createUserWithEmailAndPassword } from "@firebase/auth";

const db = getFirestore();

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
  const onClick = () => {
    let email = "testuser4@gmail.com";
    let password = "123456";

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const uid = response.user.uid;
        console.log("uid:", uid);
        const data = {
          id: uid,
          email,
          password,
          name: "Test",
        };

        try {
          const docRef = await addDoc(collection(db, "adopters"), data);
          console.log("Document written with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

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

      <Button title="Sign Up" onPress={() => onClick()}></Button>
    </SafeAreaView>
  );
};
