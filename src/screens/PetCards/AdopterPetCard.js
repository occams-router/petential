import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, View, Image } from "react-native";
import styled from "styled-components/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import TinderCard from "../../react-tinder-card/reactTinderCard";
import { Card, Title, Paragraph, Button } from "react-native-paper";

const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Header = styled.Text`
  color: #000;
  font-size: 26px;
`;

const CardContainer = styled.View`
  width: 90%;
  max-width: 260px;
  height: auto;
`;

const xCard = styled.View`
  position: relative;
  background-color: #fff;
  width: 100%;
  max-width: 260px;
  height: 300px;
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-radius: 20px;
  border-radius: 20px;
  resize-mode: cover;
`;

const CardImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 20px;
`;

const CardTitle = styled.Text`
  position: absolute;
  bottom: 0;
  margin: 10px;
  color: #fff;
`;

const InfoText = styled.Text`
  height: 28px;
  justify-content: center;
  display: flex;
  z-index: -100;
`;

const ProfileInfo = styled.View`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20px;
`;

const NameAndAge = styled.Text`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

  const petsCollectionRef = collection(db, "pets");

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
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
    }));

    setPetsList(petsData);
  }, []);

  const onButtonPress = (choice) => {
    alert(`You choose to ${choice}.`);
  };

  return (
    <Container>
      <CardContainer>
        {((pet) => (
          <>
            <TinderCard
              key={pet.name}
              onSwipe={(dir) => swiped(dir, pet.name)}
              onCardLeftScreen={() => outOfFrame(pet.name)}
            >
              <Card>
                <Card.Cover source={{ uri: pet.imageUrl }}></Card.Cover>

                <Card.Content>
                  <Title>
                    {pet.name} ({pet.age} {pet.age > 0 ? "years" : "year"} old)
                  </Title>
                  <Paragraph>{pet.description}</Paragraph>
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
        ))(petsList[0])}
      </CardContainer>
      {lastDirection ? (
        <InfoText>You swiped {lastDirection}</InfoText>
      ) : (
        <InfoText />
      )}
    </Container>
  );
}

/*

<Container>
      <CardContainer>
        {((pet) => (
          <>
            <TinderCard
              key={pet.name}
              onSwipe={(dir) => swiped(dir, pet.name)}
              onCardLeftScreen={() => outOfFrame(pet.name)}
            >
              <Card>
                <CardImage source={{ uri: pet.imageUrl }}></CardImage>
              </Card>
            </TinderCard>

            <ProfileInfo>
              <Header>{pet.name}</Header>

              <Header>
                {pet.age} {pet.age > 1 ? "years old" : "year old"}
              </Header>

              <InfoText>{pet.description}</InfoText>
            </ProfileInfo>
          </>
        ))(petsList[0])}
      </CardContainer>
      {lastDirection ? (
        <InfoText>You swiped {lastDirection}</InfoText>
      ) : (
        <InfoText />
      )}
    </Container>

*/
