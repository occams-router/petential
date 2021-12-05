import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import { NavigationActions } from 'react-navigation';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import PetCard from '../PetCards/ShelterPetCard';
import { UserContext } from '../../../App';

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
      <Text style={styles.title}>Current Pets</Text>
      <TouchableOpacity style={styles.button}>
        {/* {change screen name place holder} */}
        <Text
          style={styles.buttonTitle}
          // onPress={navigation.navigate("ScreenNameHere")}
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
