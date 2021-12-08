import React, { useState, useContext, useEffect } from 'react';
import { Image, Text, TouchableOpacity, FlatList, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import { db } from '../../firebase/config';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { UserContext } from '../../../App';
import ShelterRequestCard from './ShelterRequestCard';
import Loading from '../Loading';

export default function ShelterRequests() {
  const shelter = useContext(UserContext);
  const [adoptersAndPets, setAdoptersAndPets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const requestsSubRef = collection(
      db,
      'shelters',
      `${shelter.id}`,
      'requests'
    );

    // retrieve only pending requests for this shelter
    const q = query(requestsSubRef, where('status', '==', 'pending'));
    const unsub = onSnapshot(q, async (querySnapshot) => {
      const requestsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // retrieve request adopter/pet info
      const data = requestsData.map(async (request) => {
        try {
          // retrieve adopter info
          const adopterDocRef = doc(db, 'adopters', `${request.adopterRefId}`);
          const adopterDoc = await getDoc(adopterDocRef);
          const adopterData = adopterDoc.data();

          // retrieve pet info
          const petDocRef = doc(db, 'pets', `${request.petRefId}`);
          const petDoc = await getDoc(petDocRef);
          const petData = petDoc.data();

          // create an object for current user and associated pet
          const adopterAndPet = {
            userName: adopterData.name,
            userId: adopterData.id,
            userEmail: adopterData.email,
            userPhone: adopterData.phone,
            userCity: adopterData.city,
            userState: adopterData.state,
            userImageUrl: adopterData.imageUrl,
            userLifestyle: adopterData.lifestyle,
            userHousing: adopterData.housing,
            userPetHistory: adopterData.petHistory,
            userDescription: adopterData.description,
            petName: petData.name,
            petId: petData.id,
            petImageUrl: petData.imageUrl,
            petSpecies: petData.species,
            petBreed: petData.breed,
            petAge: petData.age,
            status: request.status,
            requestId: request.id,
          };

          return adopterAndPet;
        } catch (e) {
          console.log('There was an error:', e);
        }
      });

      // resolve promises returned from mapping over requestsData
      const results = await Promise.all(data);

      // set results in local state
      setAdoptersAndPets(results);
      setLoading(false);
    });

    // unsubscribe from listener before unmounting
    return unsub;
  }, []);

  return (
    <View style={GlobalStyles.droidSafeArea}>
      <Text style={styles.title}>My Requests</Text>
      {loading ? (
        <Loading />
      ) : adoptersAndPets.length === 0 ? (
        <Text style={{ alignSelf: 'center' }}>No matches to display!</Text>
      ) : (
        <FlatList
          data={adoptersAndPets}
          renderItem={({ item }) => <ShelterRequestCard request={item} />}
          keyExtractor={(item) => item.requestId}
        />
      )}
    </View>
  );
}
