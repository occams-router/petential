import React, {useState, useContext, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, Image } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../GlobalStyles.js';
import styled from "styled-components/native";
import styles from './styles'
import { db } from '../../firebase/config';
import { doc, getDocs, collection, getDoc } from 'firebase/firestore';
import { UserContext } from '../../../App';
import {
    Card,
    Title,
    Paragraph,
    Button,
    Divider,
    Subheading,
  } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import tailwind from "tailwind-rn";

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


export default function AdopterChatList({match}) {
    console.log(match)
    const adopter = useContext(UserContext);
  const [shelter, setShelter] = useState([]);
  const [pet, setPet] = useState([]);

  const getShelter = async () => {
    const shelterDocRef = doc(db, 'shelters', `${match.shelterRefId}`);
    const shelterDoc = await getDoc(shelterDocRef);
    setShelter(shelterDoc.data());
    console.log('shelterDoc', shelterDoc.data())
  };

  const getPet = async () => {
    const petDocRef = doc(db, 'pets', `${match.petRefId}`);
    const petDoc = await getDoc(petDocRef);
    setPet(petDoc.data());
    console.log('PetDoc', petDoc.data())
  };

  useEffect(() => {
    getShelter();
    getPet();
  }, []);

    return (
<SafeAreaView style={GlobalStyles.droidSafeArea}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
          <TouchableOpacity style={[tailwind('flex-row items-center py-3 bg-white mx-3 my-1 rounded-lg'), styles.cardShadow,]}>
              <Image style={tailwind('rounded-full h-16 w-16 mr-10')}source={{ uri: pet?.imageUrl }}/>
          </TouchableOpacity>
         {/* <Container>
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
                      onPress={() => navigation.navigate('AdopterSidebar', { screen: 'AdopterChat' })}
                    >
                      Send a message!
                    </Button>
                  </Card.Actions>
                    </Card>
                    </CardContainer>
    </Container> */}
        </KeyboardAwareScrollView>
       </SafeAreaView>
    );
}