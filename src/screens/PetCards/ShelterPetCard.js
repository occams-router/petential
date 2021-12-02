import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import { Card, Title, Button } from "react-native-paper";

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
  margin: 20px;
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

export default function PetCard({ pets }) {
  return (
    <Container>
      <CardContainer>
        <Card>
          <Card.Cover source={{ uri: pets.imageUrl }}></Card.Cover>
          <Title>{pets.name}</Title>
          <Text>Breed: {pets.breed}</Text>
          <Text>Age: {pets.age}</Text>
          <Card.Actions>
            <Button mode="contained" style={{ backgroundColor: "#788eec" }}>
              Edit Pet
            </Button>
          </Card.Actions>
        </Card>
      </CardContainer>
    </Container>
  );
}
