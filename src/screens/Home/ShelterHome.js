import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { auth } from "../../firebase/config";
import styles from "./styles";
import { signOut } from "@firebase/auth";

export default function FillerHome(props) {
  const logout = async () => {
    try {
      await signOut(auth);
      alert("You are logged out.");
    } catch (error) {
      alert("Log-out was unsuccesful.");
      console.log(error.message);
    }
  };
  return (
    <View>
      <Text style={styles.title}>Shelter Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.buttonTitle}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}
