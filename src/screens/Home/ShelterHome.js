<<<<<<< HEAD
import React, { useState, useEffect, useContext } from 'react';
import { Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import GlobalStyles from '../../../GlobalStyles';
import { db } from '../../firebase/config';
import { collection, getDocs, onSnapshot, query } from 'firebase/firestore';
import { UserContext } from '../../../App';
import styles from './styles';
import { Card, Title, Button } from 'react-native-paper';
import { CardContainer, Container } from '../PetCards/cardstyles';
=======
import React, { useState, useEffect, useContext } from "react";
import { Text, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { NavigationActions } from "react-navigation";
import GlobalStyles from "../../../GlobalStyles";
import { db } from "../../firebase/config";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
// import PetCard from '../PetCards/ShelterPetCard';
import { UserContext } from "../../../App";
import styles from "./styles";
import { Card, Title, Button } from "react-native-paper";
import { CardContainer, Container } from "../PetCards/cardstyles";
import { Loading } from "..";
>>>>>>> main

export default function ShelterHome({ navigation }) {
  const shelter = useContext(UserContext);
  const [petData, setPetData] = useState([]);
  const [loading, setLoading] = useState(false);

    useEffect(async () => {
      setLoading(true);
      const petsCollectionRef = collection(
        db,
        "shelters",
        `${shelter.id}`,
        "shelterPets"
      );
  
      const unsub = onSnapshot(petsCollectionRef, async () => {
        const petDocs = await getDocs(petsCollectionRef);
        const petData = petDocs.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPetData(petData);
        setLoading(false);
      });
      return unsub;
    }, []);

<<<<<<< HEAD
  // useEffect(() => {
  //   getPets();
  // }, []);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'shelters', `${shelter.id}`, 'shelterPets')),
        (snapshot) =>
          setPetData(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    []
  );
=======
>>>>>>> main

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Text style={styles.title}>Current Pets</Text>
      <Button
        mode="contained"
        style={{ marginLeft: 80, marginRight: 80, marginBottom: 20 }}
        onPress={() => navigation.navigate('PetProfile', { pet: '' })}
      >
        Add a Pet
      </Button>
      {loading ? (<Loading/>) : petData.length === 0 ? (
         <Text style={{ alignSelf: 'center' }}>Currently not pets to display!</Text>
      ) : (
      <FlatList
        data={petData}
        keyextractor={(item, index) => item.key}
        renderItem={({ item }) => (
          <Container>
            <CardContainer>
              <Card style={{ padding: 10 }}>
                <Card.Cover source={{ uri: `${item.imageUrl}` }}></Card.Cover>
                <Title>{item.name}</Title>
                <Text>Breed: {item.breed}</Text>
                <Text>Age: {item.age}</Text>
                <Card.Actions
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Button
                    mode="contained"
                    icon="account-edit-outline"
                    style={{ backgroundColor: '#24a6a8' }}
                    onPress={() =>
                      navigation.navigate('PetProfile', { pet: item })
                    }
                  >
                    Edit Pet
                  </Button>
                </Card.Actions>
              </Card>
            </CardContainer>
          </Container>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
  )}
    </SafeAreaView>
  );
}
