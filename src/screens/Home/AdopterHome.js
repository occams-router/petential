import React from "react";
import { Text, SafeAreaView, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase/config";
import styles from "./styles";
import AdopterPetCard from "../PetCards/AdopterPetCard";
import { signOut } from "@firebase/auth";

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
    <SafeAreaView>
      <Text style={styles.title}>Adopter Feed</Text>

      <AdopterPetCard />

      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.buttonTitle}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
