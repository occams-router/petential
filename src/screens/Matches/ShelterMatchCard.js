import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { UserContext } from '../../../App';

export default function ShelterMatchCard({ match }) {
  const shelter = useContext(UserContext);
  const [adopter, setAdopter] = useState({});
  const [pet, setPet] = useState({});

  const getAdopter = async () => {
    const adopterDocRef = doc(db, 'adopters', `${match.adopterRefId}`);
    const adopterDoc = await getDoc(adopterDocRef);
    setAdopter(adopterDoc);
  };

  const getPet = async () => {
    const petDocRef = doc(db, 'pets', `${match.petRefId}`);
    const petDoc = await getDoc(petDocRef);
    setPet(petDoc);
  };

  useEffect(() => {
    getAdopter();
    getPet();
  }, []);

  return (
    <SafeAreaView>
      <Text>Cute Pet Here</Text>
    </SafeAreaView>
  );
}
