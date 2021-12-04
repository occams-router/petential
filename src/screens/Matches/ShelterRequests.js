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

  const [nameOfShelter, setNameOfShelter] = useState(shelter.name || "");
  const [imageUrl, setImageUrl] = useState(
    shelter.imageUrl ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2gT4BUTqAaMh6kIvJdw8Wf6pQQGbm6HI0Yg&usqp=CAU"
  );
  const [requests, setRequests] = useState([]);
  const [adoptersAndPets, setAdoptersAndPets] = useState([]);

  useEffect(async () => {
    // retrieve all requests for this shelter
    const requestsSubRef = collection(
      db,
      "shelters",
      `${shelter.id}`,
      "requests"
    );
    const requestsDocs = await getDocs(requestsSubRef);
    const requestsData = requestsDocs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setRequests(requestsData);

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
          petImageUrl: petData.imageUrl,
          petSpecies: petData.species,
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

    // filter out requests which have already been reviewed
    const pendingRequests = results.filter(
      (request) => request.status === "pending"
    );

    // set results in local state
    setAdoptersAndPets(pendingRequests);
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Text style={styles.title}>Requests for {nameOfShelter}</Text>
      {adoptersAndPets.length === 0 ? (
        <Text>No requests to display!</Text>
      ) : (
        <FlatList
          data={adoptersAndPets}
          renderItem={({ item }) => <ShelterRequestCard request={item} />}
        />
      )}
    </SafeAreaView>
  );
}
