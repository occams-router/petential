import React, { useEffect, useState, useContext } from "react";
import { Text, SafeAreaView, View, Image } from "react-native";
import styled from "styled-components/native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import TinderCard from "../../react-tinder-card/reactTinderCard";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Divider,
  Subheading,
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
  max-width: 260px;
  height: auto;
`;

const InfoText = styled.Text`
  height: 28px;
  justify-content: center;
  display: flex;
  z-index: -100;
`;

export default function AdopterPetCard(props) {
  const [lastDirection, setLastDirection] = useState();
  const [petsList, setPetsList] = useState([]);
  const user = useContext(UserContext);

  const petsCollectionRef = collection(db, "pets");

  const swiped = async (direction, pet) => {
    console.log("removing:", pet.name);

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
        petDocRef: pet.id,
        userDocRef: user.id,
        shelterRefId: pet.shelterRefId,
        status: "pending",
      };

      await addDoc(requestsSubRef, requestData);
    }

    setPetsList(petsList.slice(1));
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  useEffect(async () => {
    const allPets = await getDocs(petsCollectionRef);
    let petsData = allPets.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setPetsList(petsData);
  }, []);

  const onButtonPress = (choice) => {
    alert(`You choose to ${choice}.`);
  };

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
              >
                <Card>
                  <Card.Cover source={{ uri: pet.imageUrl }}></Card.Cover>

                  <Card.Content>
                    <Title>
                      {pet.name} ({pet.age} {pet.age > 1 ? "years" : "year"}{" "}
                      old)
                    </Title>
                    <Divider />
                    <Title>{pet.shelterName}</Title>
                    <Divider />
                    <Paragraph>
                      Location: {pet.city}, {pet.state}
                    </Paragraph>
                    <Divider />
                    <Paragraph>Species: {pet.species}</Paragraph>
                    <Divider />
                    <Paragraph>Breed: {pet.breed}</Paragraph>
                    <Divider />
                    <Paragraph>About: {pet.description}</Paragraph>
                  </Card.Content>

                  <Card.Actions>
                    <Button icon="thumb-down-outline">Pass</Button>
                    <Button
                      icon="heart"
                      onPress={() => console.log("You choose to pass.")}
                    >
                      Like
                    </Button>
                  </Card.Actions>
                </Card>
              </TinderCard>
            </>
          ))(petsList[0])
        ) : (
          <InfoText>No pets to display!</InfoText>
        )}
      </CardContainer>
    </Container>
  );
}
