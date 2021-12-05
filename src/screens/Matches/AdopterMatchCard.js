import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../../../App';
import styled from 'styled-components/native';
import {
    Card,
    Title,
    Paragraph,
    Button,
    Divider,
    Subheading,
  } from "react-native-paper";
  import styles from "../Home/styles";
import { useNavigation } from '@react-navigation/native';

const Container = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const CardContainer = styled.View`
  width: 90%;
  max-width: 750px;
  height: auto;
  margin-bottom: 20px;
`;

export default function AdopterMatchCard({ match }) {
    const navigation = useNavigation();
  const adopter = useContext(UserContext);
  const [shelter, setShelter] = useState([]);
  const [pet, setPet] = useState([]);

  const getShelter = async () => {
    const shelterDocRef = doc(db, 'shelters', `${match.shelterRefId}`);
    const shelterDoc = await getDoc(shelterDocRef);
    setShelter(shelterDoc.data());
    console.log('shelterDoc', shelterDoc.data());
  };

  const getPet = async () => {
    const petDocRef = doc(db, 'pets', `${match.petRefId}`);
    const petDoc = await getDoc(petDocRef);
    setPet(petDoc.data());
    console.log('PetDoc', petDoc.data());
  };

  useEffect(() => {
    getShelter();
    getPet();
  }, []);

  return (
    <SafeAreaView>
      <Container>
          <CardContainer>
                    <Card styles={{ marginBottom: 50 }}>
            <Card.Cover source={{ uri: pet.imageUrl }} />
            <Card.Content>
              <Title>
                You matched with {pet.name} at {shelter.name}!
              </Title>
              <Divider />
              <Paragraph>{pet.description}</Paragraph>
              <Paragraph>
                Location: {pet.city}, {pet.state}
              </Paragraph>
              <Paragraph>Species: {pet.species}</Paragraph>
              <Paragraph>Breed: {pet.breed}</Paragraph>
              <Paragraph>Age: {pet.age}</Paragraph>
            </Card.Content>
                    <Card.Actions>
                    <Button
                      icon="chat"
                      onPress={()=> navigation.navigate('AdopterMessages', {match, pet, shelter})}
                    >
                      Send a message!
                    </Button>
                  </Card.Actions>
                    </Card>
                    </CardContainer>
    </Container>
    </SafeAreaView>
  );
}
