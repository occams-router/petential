import {
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
} from "react-native";
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState({});

  const onClick = (name, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const uid = response.user.uid;

        const data = {
          id: uid,
          email,
          password,
          name,
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
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
      ></TextInput>

      <Text style={styles.baseText}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      ></TextInput>

      <Text style={styles.baseText}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
      ></TextInput>

      <Button
        title="Sign Up"
        onPress={() => onClick(name, email, password)}
      ></Button>
    </SafeAreaView>
  );
};
