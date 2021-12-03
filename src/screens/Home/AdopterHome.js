import React from "react";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase/config";
import styles from "./styles";
import AdopterPetCard from "../PetCards/AdopterPetCard";
import { signOut } from "@firebase/auth";
import GlobalStyles from "../../../GlobalStyles";

export default function AdopterHome(props) {
  const logout = async () => {
    try {
      await signOut(auth);
      alert("You are logged out.");
    } catch (error) {
      alert("Log-out was unsuccessful.");
      console.log(error.message);
    }
  };
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Text style={styles.title}></Text>
      <Text style={styles.title}>Adopter Feed</Text>

      <AdopterPetCard />

      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.buttonTitle}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
