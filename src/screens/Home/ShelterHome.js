import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, SafeAreaView, FlatList } from "react-native";

import { auth, db } from "../../firebase/config";
import styles from "./styles";
import { signOut } from "@firebase/auth";
import { render } from "react-dom";
import { snapshotEqual, doc, collection } from "firebase/firestore";
import PetCard from "../PetCards/ShelterPetCard";

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

export default function ShelterHome(props) {
  // const [petData, setPetData] = useState(null);
  // const { user } = props.route.params;
  // console.log(user, "User");
  // const { id } = user;
  // console.log(id, "id");
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
  //     await db
  //       .collection("shelters")
  //       .get()
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           console.log("total shelter", querySnapshot.size);
  //           //   const { city, description, id } = doc.data();
  //           //   list.push({
  //           //     id: doc.id,
  //           //     city: doc.city,
  //           //     description: doc.description,
  //           //   });
  //         });
  //       });
  //     setPetData();
  //   } catch (e) {
  //     console.error;
  //   }
  // };

  // useEffect(() => {
  //   getPets();
  // }, []);

  console.log("i am props", props);
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
