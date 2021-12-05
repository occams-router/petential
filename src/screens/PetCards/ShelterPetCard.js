import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Image,
//   SafeAreaView,
//   TouchableOpacity,
// } from "react-native";
import { Card, Title, Button } from "react-native-paper";
import { CardContainer, Container } from "./cardstyles";

export default function PetCard(props) {
  const { navigation } = props;
  return (
    <Container>
      <CardContainer>
        <Card>
          <Card.Cover source={{ uri: pets.imageUrl }}></Card.Cover>
          <Title>{pets.name}</Title>
          <Text>Breed: {pets.breed}</Text>
          <Text>Age: {pets.age}</Text>
          <Card.Actions>
            <Button
              mode="contained"
              style={{ backgroundColor: "#24a6a8" }}
              onPress={() => navigation.navigate("PetProfile", { pet: pets })}
            >
              Edit Pet
            </Button>
          </Card.Actions>
        </Card>
      </CardContainer>
    </Container>
  );
}
