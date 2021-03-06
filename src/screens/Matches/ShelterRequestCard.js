import React, { useContext, useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { db } from '../../firebase/config';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { UserContext } from '../../../App';
import {
  Card,
  Title,
  Paragraph,
  Button,
  Divider,
  Subheading,
  Avatar,
} from 'react-native-paper';
import styled from 'styled-components/native';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';

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

const AvatarContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const InfoContainer = styled.View`
  margin-bottom: 20px;
`;

export default function ShelterRequestCard({ request }) {
  const shelter = useContext(UserContext);

  const onButtonPress = async (choice, request) => {
    const requestDocRef = doc(
      db,
      'shelters',
      `${shelter.id}`,
      'requests',
      request.requestId
    );

    if (choice === 'accept') {
      // update status in requests subcollection
      await updateDoc(requestDocRef, { status: 'accepted' });

      // create a new document in shelters/matches & adopters/matches
      await addDoc(collection(db, 'shelters', `${shelter.id}`, 'matches'), {
        shelterRefId: shelter.id,
        adopterRefId: request.userId,
        petRefId: request.petId,
      });

      await addDoc(collection(db, 'adopters', `${request.userId}`, 'matches'), {
        shelterRefId: shelter.id,
        adopterRefId: request.userId,
        petRefId: request.petId,
      });
    } else {
      await updateDoc(requestDocRef, { status: 'rejected' });
    }
  };

  return (
    <View style={GlobalStyles.droidSafeArea}>
      <Container>
        <CardContainer>
          <Card style={{ marginBottom: 10, padding: 10 }}>
            <Card.Content>
              <Title>
                {request.userName} wants to meet {request.petName}!
              </Title>
              <AvatarContainer>
                <Avatar.Image
                  size={120}
                  source={{ uri: request.userImageUrl }}
                />
                <Avatar.Image
                  size={120}
                  source={{ uri: request.petImageUrl }}
                />
              </AvatarContainer>

              <InfoContainer>
                <Subheading>About {request.userName}</Subheading>
                <Divider />
                <Paragraph>{request.userDescription}</Paragraph>
                <Paragraph>
                  Location: {request.userCity}, {request.userState}
                </Paragraph>
                <Paragraph>Housing: {request.userHousing}</Paragraph>
                <Paragraph>Lifestyle: {request.userLifestyle}</Paragraph>
                <Paragraph>Pet History: {request.userPetHistory}</Paragraph>
              </InfoContainer>

              <InfoContainer>
                <Subheading>About {request.petName}</Subheading>
                <Divider />
                <Paragraph>Species: {request.petSpecies}</Paragraph>
                <Paragraph>Breed: {request.petBreed}</Paragraph>
                <Paragraph>Age: {request.petAge}</Paragraph>
              </InfoContainer>
            </Card.Content>
            <Card.Actions style={styles.requestButtonContainer}>
              <Button
                icon="block-helper"
                onPress={() => onButtonPress('reject', request)}
              >
                Reject
              </Button>
              <Button
                icon="check-circle"
                onPress={() => onButtonPress('accept', request)}
              >
                Accept
              </Button>
            </Card.Actions>
          </Card>
        </CardContainer>
      </Container>
    </View>
  );
}
