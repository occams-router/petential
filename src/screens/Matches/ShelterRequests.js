import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, TouchableOpacity, FlatList } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { db } from "../../firebase/config";
import {
  doc,
  updateDoc,
  getDocs,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { UserContext } from "../../../App";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Divider,
  Subheading,
} from "react-native-paper";
import ShelterRequestCard from "./ShelterRequestCard";
import GlobalStyles from "../../../GlobalStyles";

export default function ShelterRequests() {
  const shelter = useContext(UserContext);
  const [adoptersAndPets, setAdoptersAndPets] = useState([]);

  useEffect(() => {
    const requestsSubRef = collection(
      db,
      "shelters",
      `${shelter.id}`,
      "requests"
    );

    // retrieve only pending requests for this shelter
    const q = query(requestsSubRef, where("status", "==", "pending"));
    const unsub = onSnapshot(q, async (querySnapshot) => {
      const requestsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // retrieve request adopter/pet info
      const data = requestsData.map(async (request) => {
        try {
          // retrieve adopter info
          const adopterDocRef = doc(db, "adopters", `${request.adopterRefId}`);
          const adopterDoc = await getDoc(adopterDocRef);
          const adopterData = adopterDoc.data();

          // retrieve pet info
          const petDocRef = doc(db, "pets", `${request.petRefId}`);
          const petDoc = await getDoc(petDocRef);
          const petData = petDoc.data();

          // create an object for current user and associated pet
          const adopterAndPet = {
            userName: adopterData.name,
            userId: adopterData.id,
            userEmail: adopterData.email,
            userPhone: adopterData.phone,
            userCity: adopterData.city,
            userState: adopterData.state,
            userImageUrl: adopterData.imageUrl,
            userLifestyle: adopterData.lifestyle,
            userHousing: adopterData.housing,
            userPetHistory: adopterData.petHistory,
            userDescription: adopterData.description,
            petName: petData.name,
            petId: petData.id,
            petImageUrl: petData.imageUrl,
            petSpecies: petData.species,
            petBreed: petData.breed,
            petAge: petData.age,
            status: request.status,
            requestId: request.id,
          };

          return adopterAndPet;
        } catch (e) {
          console.log("There was an error:", e);
        }
      });

      // resolve promises returned from mapping over requestsData
      const results = await Promise.all(data);

      // set results in local state
      setAdoptersAndPets(results);
    });

    // unsubscribe from listener before unmounting
    return unsub;
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Text style={styles.title}>My Requests</Text>
      {adoptersAndPets.length === 0 ? (
        <Text style={{ alignSelf: "center" }}>No requests to display!</Text>
      ) : (
        <FlatList
          data={adoptersAndPets}
          renderItem={({ item }) => <ShelterRequestCard request={item} />}
          keyExtractor={(item) => item.requestId}
        />
      )}
    </SafeAreaView>
  );
}
