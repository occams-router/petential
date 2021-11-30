import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  View,
  Image,
} from "react-native";

import { auth, db } from "../../firebase/config";
import styles from "./styles";
import { signOut } from "@firebase/auth";
import { render } from "react-dom";
import { snapshotEqual } from "firebase/firestore";
// import { useEffect } from "react/cjs/react.development";
import PetCard from "./PetCard";

const pets = [
  {
    id: 1,
    name: "Oliver",
    species: "dog",
    age: 9,
    petImage:
      "https://www.k9web.com/wp-content/uploads/2021/01/teddy-bear-cut-poodle-780x975.jpg",
  },
  {
    id: 2,
    name: "Oliver",
    species: "dog",
    age: 9,
    petImage:
      "https://www.k9web.com/wp-content/uploads/2021/01/teddy-bear-cut-poodle-780x975.jpg",
  },
  {
    id: 3,
    name: "Oliver",
    species: "dog",
    age: 9,
    petImage:
      "https://www.k9web.com/wp-content/uploads/2021/01/teddy-bear-cut-poodle-780x975.jpg",
  },
  {
    id: 4,
    name: "Oliver",
    species: "dog",
    age: 9,
    petImage:
      "https://www.k9web.com/wp-content/uploads/2021/01/teddy-bear-cut-poodle-780x975.jpg",
  },
  {
    id: 4,
    name: "Oliver",
    species: "dog",
    age: 9,
    petImage:
      "https://www.k9web.com/wp-content/uploads/2021/01/teddy-bear-cut-poodle-780x975.jpg",
  },
];

export default function ShelterHome(props) {
  // const [petData, setPetData] = useState([])
  const logout = async () => {
    try {
      await signOut(auth);
      alert("You are logged out.");
    } catch (error) {
      alert("Log-out was unsuccesful.");
      console.log(error.message);
    }
  };

  // const getPets = async () => {
  //   try {
  //     const list = [];
  //     const shelterPets = await db.collection("shelters").get();
  //     //for each pet in shelterpets collection push it into petData state
  //     shelterPets.forEach((doc) => {
  //       list.push(doc.data());
  //     });
  //     setPetData([...list]);
  //   } catch (e) {
  //     console.error(e, "No Pets in DB");
  //   }
  // };

  //component did mount
  // useEffect(() => {
  //   getPets();
  // }, []);

  return (
    <SafeAreaView>
      <Text style={styles.title}>Current Pets</Text>
      <TouchableOpacity style={styles.button}>
        {/* add onPress to link to add pet form screen */}
        <Text style={styles.buttonTitle}>Add a Pet</Text>
      </TouchableOpacity>

      <FlatList
        data={pets}
        keyextractor={(item) => item.id}
        renderItem={({ item }) => <PetCard pets={item} />}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.buttonTitle}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
