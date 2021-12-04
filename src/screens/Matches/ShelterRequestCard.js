import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { db } from "../../firebase/config";
import {
  doc,
  updateDoc,
  getDocs,
  getDoc,
  collection,
} from "firebase/firestore";
import { UserContext } from "../../../App";
import styled from "styled-components/native";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Divider,
  Subheading,
} from "react-native-paper";
import styles from "./styles";

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

export default function ShelterRequestCard({ request }) {
  const shelter = useContext(UserContext);

  const onButtonPress = async (choice, request) => {
    const requestDocRef = doc(
      db,
      "shelters",
      `${shelter.id}`,
      "requests",
      request.requestId
    );

    if (choice === "accept") {
      // update status in requests subcollection
      await updateDoc(requestDocRef, { status: "accepted" });

      // create a new document in shelters/matches & adopters/matches
    } else {
      await updateDoc(requestDocRef, { status: "rejected" });
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <CardContainer>
          <Card styles={{ marginBottom: 50 }}>
            <Card.Cover source={{ uri: request.userImageUrl }} />
            <Card.Content>
              <Title>
                {request.userName} wants to meet {request.petName}!
              </Title>
              <Divider />
              <Paragraph>{request.userDescription}</Paragraph>
              <Paragraph>
                Location: {request.userCity}, {request.userState}
              </Paragraph>
              <Paragraph>Housing: {request.userHousing}</Paragraph>
              <Paragraph>Lifestyle: {request.userLifestyle}</Paragraph>
              <Paragraph>Pet History: {request.userPetHistory}</Paragraph>
            </Card.Content>
            <Card.Actions style={styles.requestButtonContainer}>
              <Button
                icon="check-circle"
                onPress={() => onButtonPress("accept", request)}
              >
                Accept
              </Button>
              <Button
                icon="block-helper"
                onPress={() => onButtonPress("reject", request)}
              >
                Reject
              </Button>
            </Card.Actions>
          </Card>
        </CardContainer>
      </Container>
    </SafeAreaView>
  );
}
