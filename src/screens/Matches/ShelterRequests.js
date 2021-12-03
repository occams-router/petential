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

  console.log("name of shelter:", nameOfShelter);

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

    console.log("requests:", requestsData);

    // retrieve request adopter/pet info
    const data = requestsData.map(async (request, index) => {
      try {
        // retrieve adopter info
        const adopterDocRef = await doc(
          db,
          "adopters",
          `${request.adopterRefId}`
        );
        const adopterDoc = await getDoc(adopterDocRef);
        const adopterData = adopterDoc.data();

        // retrieve pet info
        const petDocRef = await doc(db, "pets", `${request.petRefId}`);
        const petDoc = await getDoc(petDocRef);
        const petData = petDoc.data();

        // console.log("adopterData:", adopterData);

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

        console.log("adopterPet inside of map:", adopterAndPet);

        return adopterAndPet;

        // return { ...adopterData, ...petData };
      } catch (e) {
        console.log("There was an error:", e);
      }
    });

    console.log("data which came back from mapping:", data);

    let adopterInfo = [];

    const promisestuff = Promise.all(data).then((info) => {
      console.log("info inside then method:", info);
      adopterInfo = info;
      setAdoptersAndPets(info);
    });
    console.log("adopterInfo:", adopterInfo);
    console.log("promisestuff:", promisestuff);

    // setAdoptersAndPets(adopterInfo);
    console.log("adoptersAndPets:", adoptersAndPets);
  }, []);

  console.log("adoptersAndPets outside of use effect:", adoptersAndPets);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}>Requests for {nameOfShelter}</Text>

        <View>
          {requests.map((request) => (
            <Text key={request.id}>status from requests: {request.status}</Text>
          ))}
        </View>
        <View>
          {adoptersAndPets.map((adopter) => (
            <Text key={adopter.userId}>
              name from adopters/pets: {adopter.userName}
            </Text>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
