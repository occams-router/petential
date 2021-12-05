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
} from 'react-native-paper';
import styles from '../Home/styles';

const Container = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  align-content: space-around;
  margin: 10px;
`;

const CardContainer = styled.View`
  width: 90%;
  max-width: 750px;
  align-items: center;
  height: auto;
  justify-content: space-between;
  align-content: space-around;
  margin: 10px;
`;

export default function AdopterMatchCard({ match }) {
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
          <Card>
            <Card.Content>
              <Title>
                You have matched with {pet.name}, a {pet.species}, at{' '}
                {shelter.name}!
              </Title>
            </Card.Content>
            <Card.Actions>
              <Button icon="chat" onPress={() => console.log('Not yet!')}>
                Send a message!
              </Button>
            </Card.Actions>
          </Card>
        </CardContainer>
      </Container>
    </SafeAreaView>
  );
}
