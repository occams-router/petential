import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
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
    const requestsData = requestsDocs.docs.map((doc) => ({ ...doc.data() }));
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
          status: request.status,
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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}>Requests for {nameOfShelter}</Text>
        <View>
          {adoptersAndPets.map((adopter) => (
            <Card key={adopter.userId}>
              <Text>user name from adopters/pets: {adopter.userName}</Text>
              <Divider />
              <Text>pet name from adopters/pets: {adopter.petName}</Text>
            </Card>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
