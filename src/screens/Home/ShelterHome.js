import React, { useState, useEffect, useContext } from 'react';
import { Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { db } from '../../firebase/config';
import styles from './styles';
import { collection, getDocs } from 'firebase/firestore';
import PetCard from '../PetCards/ShelterPetCard';
import { UserContext } from '../../../App';
import { NavigationActions } from 'react-navigation';
import GlobalStyles from '../../../GlobalStyles';

export default function ShelterHome({ navigation }) {
  const shelter = useContext(UserContext);
  const [petData, setPetData] = useState([]);

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
        {/* {change screen name place holder} */}
        <Text
          style={styles.buttonTitle}
          // oPress={navigation.navigate("ScreenNameHere")}
        >
          Add a Pet
        </Text>
      </TouchableOpacity>

      <FlatList
        data={petData}
        keyextractor={(item, index) => item.key}
        renderItem={({ item }) => <PetCard pets={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
