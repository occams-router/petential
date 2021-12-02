import React, { useState, useEffect, useContext } from "react";
import { Text, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { auth, db } from "../../firebase/config";
import styles from "./styles";
import { signOut } from "@firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import PetCard from "../PetCards/ShelterPetCard";
import { UserContext } from "../../../App";
import { NavigationActions } from "react-navigation";

export default function ShelterHome({ navigation }) {
  const shelter = useContext(UserContext);
  const [petData, setPetData] = useState([]);
  const logout = async () => {
    try {
      await signOut(auth);
      alert("You are logged out.");
    } catch (error) {
      alert("Log-out was unsuccessful.");
      console.log(error.message);
    }
  };

  const getPets = async () => {
    try {
      const list = [];
      const docsSnap = await getDocs(
        collection(db, `shelters/${shelter.id}/shelterPets`)
      );
      docsSnap.forEach((doc) => {
        console.log("i am data", doc.data());
        list.push(doc.data());
      });
      setPetData([...list]);
    } catch (e) {
      console.log("No pets in shelter");
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.title}>Current Pets</Text>
      <TouchableOpacity style={styles.button}>
        {/* {change screen name place holder} */}
        <Text
          style={styles.buttonTitle}
          oPress={navigation.navigate("ScreenNameHere")}
        >
          Add a Pet
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.buttonTitle}>Log out</Text>
      </TouchableOpacity>

      <FlatList
        data={petData}
        keyextractor={(item, index) => item.key}
        renderItem={({ item }) => <PetCard pets={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
