import React, { useState, useEffect, useContext } from "react";
import { Text, TouchableOpacity, SafeAreaView, FlatList } from "react-native";

import { auth, db } from "../../firebase/config";
import styles from "./styles";
import { signOut } from "@firebase/auth";
import { render } from "react-dom";
import {
  snapshotEqual,
  doc,
  collection,
  getDocs,
  query,
  collectionGroup,
} from "firebase/firestore";
import PetCard from "../PetCards/ShelterPetCard";
import { UserContext } from "../../../App";
// const pets = [
//   {
//     id: 1,
//     name: "Oliver",
//     species: "dog",
//     age: 9,
//     petImage:
//       "https://www.k9web.com/wp-content/uploads/2021/01/teddy-bear-cut-poodle-780x975.jpg",
//   },
//   {
//     id: 2,
//     name: "Oliver",
//     species: "dog",
//     age: 9,
//     petImage:
//       "https://www.k9web.com/wp-content/uploads/2021/01/teddy-bear-cut-poodle-780x975.jpg",
//   },
//   {
//     id: 3,
//     name: "Oliver",
//     species: "dog",
//     age: 9,
//     petImage:
//       "https://www.k9web.com/wp-content/uploads/2021/01/teddy-bear-cut-poodle-780x975.jpg",
//   },
//   {
//     id: 4,
//     name: "Oliver",
//     species: "dog",
//     age: 9,
//     petImage:
//       "https://www.k9web.com/wp-content/uploads/2021/01/teddy-bear-cut-poodle-780x975.jpg",
//   },
//   {
//     id: 5,
//     name: "Oliver",
//     species: "dog",
//     age: 9,
//     petImage:
//       "https://www.k9web.com/wp-content/uploads/2021/01/teddy-bear-cut-poodle-780x975.jpg",
//   },
// ];

export default function ShelterHome() {
  const shelter = useContext(UserContext);
  console.log(shelter, "i am shelter");
  const [petData, setPetData] = useState([]);
  const logout = async () => {
    try {
      await signOut(auth);
      alert("You are logged out.");
    } catch (error) {
      alert("Log-out was unsuccesful.");
      console.log(error.message);
    }
  };

  const getPets = async () => {
    try {
      const list = [];
      const docsSnap = await getDocs(
        collection(db, `shelters/${shelter.id}/shelterPets`)
      );
      console.log(docsSnap, "i am doc snap");
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
        {/* add onPress to link to add pet form screen */}
        <Text style={styles.buttonTitle}>Add a Pet</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.buttonTitle}>Log out</Text>
      </TouchableOpacity>

      {/* <FlatList
        data={pets}
        keyextractor={(item) => item.id}
        renderItem={({ item }) => <PetCard pets={item} />}
        showsVerticalScrollIndicator={false}
      /> */}
    </SafeAreaView>
  );
}

// const getPets = async () => {
//   try {
//     const list = [];
//     const ShelterRef = await doc(db, "shelters", id);
//     console.log(ShelterRef);
//     //for each pet in shelterpets collection push it into petData state
//     // shelterRef.forEach((doc) => {
//     //   console.log(ShelterRef);
//     //   list.push(doc.data());
//     // });
//     // setPetData([...list]);
//   } catch (e) {
//     console.error(e, "No Pets in DB");
//   }
// };
