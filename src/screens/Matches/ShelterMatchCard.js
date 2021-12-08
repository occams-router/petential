import React, { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { Card, Title, Paragraph, Button, Divider } from 'react-native-paper';
import styled from 'styled-components/native';
import GlobalStyles from '../../../GlobalStyles';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../../../App';

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

export default function ShelterMatchCard({ match }) {
  const navigation = useNavigation();
  const shelter = useContext(UserContext);
  const [adopter, setAdopter] = useState([]);
  const [pet, setPet] = useState([]);

  const getAdopter = async () => {
    const adopterDocRef = doc(db, 'adopters', `${match.adopterRefId}`);
    const adopterDoc = await getDoc(adopterDocRef);
    setAdopter(adopterDoc.data());
  };

  const getPet = async () => {
    const petDocRef = doc(db, 'pets', `${match.petRefId}`);
    const petDoc = await getDoc(petDocRef);
    setPet(petDoc.data());
  };

  useEffect(() => {
    getAdopter();
    getPet();
  }, []);

  return (
    <View style={GlobalStyles.droidSafeArea}>
      <Container>
        <CardContainer>
          <Card style={{ marginBottom: 10, padding: 10 }}>
            <Card.Cover source={{ uri: adopter?.imageUrl }} />
            <Card.Content>
              <Title>
                {adopter.name} matched with {pet.name}!
              </Title>
              <Divider />
              <Paragraph>{adopter.description}</Paragraph>
              <Paragraph>
                Location: {adopter.city}, {adopter.state}
              </Paragraph>
              <Paragraph>Housing: {adopter.housing}</Paragraph>
              <Paragraph>Lifestyle: {adopter.lifestyle}</Paragraph>
              <Paragraph>Pet History: {adopter.petHistory}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                icon="chat"
                onPress={() =>
                  navigation.navigate('ShelterMessages', {
                    match,
                    pet,
                    adopter,
                  })
                }
              >
                See Messages
              </Button>
            </Card.Actions>
          </Card>
        </CardContainer>
      </Container>
    </View>
  );
}
