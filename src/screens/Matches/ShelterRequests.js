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
    const data = requestsData.map(async (request, index) => {
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
          requestId: index,
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

  const onButtonPress = (choice) => {
    if (choice === "accept") {
      console.log("accepted!");
      // update status in requests subcollection
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}>Requests for {nameOfShelter}</Text>
        <View style={styles.requestContainer}>
          {adoptersAndPets.map((request) => (
            <View style={styles.requestCardContainer}>
              <Card key={request.requestId}>
                <Card.Cover source={{ uri: request.userImageUrl }} />
                <Card.Content>
                  <Text>Name: {request.userName}</Text>
                  <Divider />
                  <Text>
                    Pet: {request.petName} the {request.petSpecies}
                  </Text>
                </Card.Content>
                <Card.Actions style={styles.requestButtonContainer}>
                  <Button
                    icon="check-circle"
                    onPress={() => onButtonPress("accept")}
                  >
                    Accept
                  </Button>
                  <Button
                    icon="block-helper"
                    onPress={() => onButtonPress("reject")}
                  >
                    Reject
                  </Button>
                </Card.Actions>
              </Card>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
