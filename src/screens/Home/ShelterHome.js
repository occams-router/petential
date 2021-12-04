import React, { useState, useEffect, useContext } from 'react';
import { Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { auth, db } from '../../firebase/config';
import styles from './styles';
import { signOut } from '@firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import PetCard from '../PetCards/ShelterPetCard';
import { UserContext } from '../../../App';
import { NavigationActions } from 'react-navigation';
import GlobalStyles from '../../../GlobalStyles';

import { Card, Title, Button } from 'react-native-paper';
import { CardContainer, Container } from '../PetCards/cardstyles';

export default function ShelterHome({ navigation }) {
  const shelter = useContext(UserContext);
  const [petData, setPetData] = useState([]);
  const logout = async () => {
    try {
      await signOut(auth);
      alert('You are logged out.');
    } catch (error) {
      alert('Log-out was unsuccessful.');
      console.log(error.message);
    }
  };

  const getPets = async () => {
    try {
      const list = [];
      const docsSnap = await getDocs(
        collection(db, `shelters/${shelter.id}/shelterPets`)
      );
      docsSnap.forEach((doc) => {
        list.push(doc.data());
      });
      setPetData([...list]);
    } catch (e) {
      console.log('No pets in shelter');
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Text style={styles.title}></Text>
      <Text style={styles.title}>Current Pets</Text>
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonTitle}
          onPress={navigation.navigate('PetProfile', { pet: '' })}
        >
          Add a Pet
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.buttonTitle}>Log out</Text>
      </TouchableOpacity>

      <FlatList
        data={petData}
        keyextractor={(item, index) => item.key}
        renderItem={({ item }) => (
          <Container>
            <CardContainer>
              <Card>
                <Card.Cover source={{ uri: item.imageUrl }}></Card.Cover>
                <Title>{item.name}</Title>
                <Text>Breed: {item.breed}</Text>
                <Text>Age: {item.age}</Text>
                <Card.Actions>
                  <Button
                    mode="contained"
                    style={{ backgroundColor: '#788eec' }}
                    onPress={navigation.navigate('PetProfile', { pet: item })}
                  >
                    Edit Pet
                  </Button>
                </Card.Actions>
              </Card>
            </CardContainer>
          </Container>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      />
    </SafeAreaView>
  );
}

{
  /* <PetCard navigation={props.navigation} pets={item} />; */
}
