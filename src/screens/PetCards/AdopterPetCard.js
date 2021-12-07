import React, { useEffect, useState, useContext } from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import TinderCard from "react-tinder-card";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Divider,
  Subheading,
  Text,
} from "react-native-paper";
import { UserContext } from "../../../App";

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CardContainer = styled.View`
  width: 90%;
  height: auto;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const deviceWidth = Dimensions.get("window").width;

export default function AdopterPetCard(props) {
  const [petsList, setPetsList] = useState([]);
  const user = useContext(UserContext);

  const swiped = async (direction, pet) => {
    // check if the pet already exists in the user's 'seen' subcollection
    const seenSubRef = collection(db, "adopters", `${user.id}`, "seen");
    const seenPetsDocs = await getDocs(seenSubRef);
    const seenPetsArr = seenPetsDocs.docs.map((doc) => ({ ...doc.data() }));
    const petExists = seenPetsArr.find((element) => element.id === pet.id);

    if (!petExists) {
      // add pet to current user's 'seen' subcollection
      await addDoc(seenSubRef, pet);
    }

    // if right swipe, add pet to its shelter's 'requests' subcollection
    if (direction === "right") {
      const requestsSubRef = collection(
        db,
        "shelters",
        `${pet.shelterRefId}`,
        "requests"
      );

      const requestData = {
        petRefId: pet.id,
        adopterRefId: user.id,
        shelterRefId: pet.shelterRefId,
        status: "pending",
      };

      await addDoc(requestsSubRef, requestData);

      // add pet to user's 'requests' subcollection
      const userRequestsSubRef = collection(
        db,
        "adopters",
        `${user.id}`,
        "requests"
      );

      const userRequestData = {
        petRefId: pet.id,
        adopterRefId: user.id,
        shelterRefId: pet.shelterRefId,
      };

      await addDoc(userRequestsSubRef, userRequestData);
    }

    setPetsList(petsList.slice(1));
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  useEffect(async () => {
    const petsCollectionRef = collection(db, "pets");
    // retrieve all pets
    const allPets = await getDocs(petsCollectionRef);
    let petsData = allPets.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const userRequestsSubRef = collection(
      db,
      "adopters",
      `${user.id}`,
      "requests"
    );
    // retrieve all of this user's sent requests
    const adopterRequests = await getDocs(userRequestsSubRef);
    const requestsData = adopterRequests.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // store pet ids
    const petIds = requestsData.map((data) => data.petRefId);

    // filter out pets which exist in this user's requests subcollection
    petsData = petsData.filter((pet) => !petIds.includes(pet.id));

    setPetsList(petsData);
  }, []);

  return (
    <Container>
      <CardContainer>
        {petsList.length ? (
          ((pet) => (
            <>
              <TinderCard
                key={pet.id}
                onSwipe={(dir) => swiped(dir, pet)}
                onCardLeftScreen={() => outOfFrame(pet.name)}
                preventSwipe={["up", "down"]}
                swipeRequirementType="position"
                swipeThreshold={deviceWidth / 1.5}
              >
                <Card style={{ padding: 10, marginBottom: 20 }}>
                  <Card.Cover source={{ uri: pet.imageUrl }}></Card.Cover>

                  <Card.Content>
                    <Title>
                      {pet.name} • Age {pet.age}
                    </Title>
                    <Subheading style={{ fontWeight: "bold" }}>
                      {pet.shelterName}
                    </Subheading>
                    <Divider />
                    <Paragraph>{pet.description}</Paragraph>
                    <Paragraph>
                      Location: {pet.city}, {pet.state}
                    </Paragraph>
                    <Paragraph>Breed: {pet.breed}</Paragraph>
                  </Card.Content>
                </Card>
              </TinderCard>
              <ButtonContainer>
                <Button
                  icon="thumb-down-outline"
                  mode="contained"
                  onPress={() => swiped("left", pet)}
                >
                  Pass
                </Button>
                <Button
                  mode="contained"
                  icon="heart"
                  onPress={() => swiped("right", pet)}
                >
                  Like
                </Button>
              </ButtonContainer>
              <Text style={{ alignSelf: "center", marginTop: 25 }}>
                Swipe or press pass/like!
              </Text>
            </>
          ))(petsList[0])
        ) : (
          <Text style={{ alignSelf: "center" }}>No pets to display!</Text>
        )}
      </CardContainer>
    </Container>
  );
}
