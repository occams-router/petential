import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
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

export default function ShelterRequestCard({ request }) {
  const shelter = useContext(UserContext);

  const onButtonPress = (choice) => {
    if (choice === "accept") {
      console.log("accepted!");
      // update status in requests subcollection
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
                onPress={() => onButtonPress("accept")}
              >
                Accept
              </Button>
              <Button
                icon="block-helper"
                onPress={() => onButtonPress("reject")}
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
