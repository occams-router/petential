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
import { Card, Title, Paragraph, Button, Divider } from "react-native-paper";
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

const pets = [
  {
    name: "Kitty",
    age: 1,
    city: "New York",
    description: "A beautiful fluffy kitten!",
    imageUrl:
      "https://www.masterpieceragdolls.com/wp-content/uploads/2021/02/Chocolate-sepia-scaled.jpg",
    shelterName: "New York Animal Shelter",
    species: "cat",
    breed: "ragdoll",
  },
  {
    name: "Carrot",
    age: 1,
    city: "New York",
    description: "A frisky little kitten!",
    imageUrl:
      "https://imgc.artprintimages.com/img/print/domestic-cat-6-week-tabby-chinchilla-crossed-with-british-shorthair-kitten_u-l-q10o13r0.jpg?artPerspective=n",
    shelterName: "New York Animal Shelter",
    species: "cat",
    breed: "tabby",
  },
  {
    name: "Gloria",
    age: 1,
    city: "New York",
    description: "A shy and curious kitten!",
    imageUrl:
      "http://knowledgebase.lookseek.com/images/animals/cats/Scottish-Fold.jpg",
    shelterName: "New York Animal Shelter",
    species: "cat",
    breed: "Scottish fold",
  },
  {
    name: "Einstein",
    age: 1,
    city: "New York",
    description: "A smart and hyper kitten!",
    imageUrl:
      "https://excitedcats.com/wp-content/uploads/2021/10/siamese-kitten_Esin-Deniz-Shutterstock.jpg",
    shelterName: "New York Animal Shelter",
    species: "cat",
    breed: "Siamese",
  },
];

export default function AdopterPetCard(props) {
  const [lastDirection, setLastDirection] = useState();
  const [petsList, setPetsList] = useState(pets);
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
        petName: pet.name,
        petDocRef: pet.id,
        petImage: pet.imageUrl,
        petSpecies: pet.species,
        petBreed: pet.breed,
        userName: user.name,
        userCity: user.city,
        userState: user.state,
        userEmail: user.email,
        userPhone: user.phone,
        userImage: user.imageUrl,
        userLifestyle: user.lifestyle,
        userHousing: user.housing,
        userPetHistory: user.petHistory,
        userDescription: user.description,
        userDocRef: user.id,
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
