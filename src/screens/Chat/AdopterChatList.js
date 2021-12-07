import React, { useState, useContext, useEffect } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import GlobalStyles from '../../../GlobalStyles.js';
import styled from 'styled-components/native';
import styles from './styles';
import { db } from '../../firebase/config';
import {
  doc,
  collection,
  getDoc,
  onSnapshot,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { UserContext } from '../../../App';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import tailwind from 'tailwind-rn';

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

export default function AdopterChatList({ match }) {
  const navigation = useNavigation();
  const adopter = useContext(UserContext);

  const [shelter, setShelter] = useState([]);
  const [pet, setPet] = useState([]);
  const [latestMessage, setLatestMessage] = useState('');
  const [lastMessageStatus, setLastMessageStatus] = useState('');
  const [lastMessageSender, setLastMessageSender] = useState('');

  const getShelter = async () => {
    const shelterDocRef = doc(db, 'shelters', `${match.shelterRefId}`);
    const shelterDoc = await getDoc(shelterDocRef);
    setShelter(shelterDoc.data());
  };

  const getPet = async () => {
    const petDocRef = doc(db, 'pets', `${match.petRefId}`);
    const petDoc = await getDoc(petDocRef);
    setPet(petDoc.data());
  };

  useEffect(() => {
    getShelter();
    getPet();
  }, []);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'messages'),
          orderBy('timestamp', 'desc'),
          where('petRefId', '==', `${match.petRefId}`),
          where('adopterRefId', '==', `${adopter.id}`)
        ),
        (snapshot) => setLatestMessage(snapshot.docs[0]?.data()?.message)
      ),
    []
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'messages'),
          orderBy('timestamp', 'desc'),
          where('petRefId', '==', `${match.petRefId}`),
          where('adopterRefId', '==', `${match.adopterRefId}`)
        ),
        (snapshot) => setLastMessageStatus(snapshot.docs[0]?.data()?.unread)
      ),
    []
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'messages'),
          orderBy('timestamp', 'desc'),
          where('petRefId', '==', `${match.petRefId}`),
          where('adopterRefId', '==', `${match.adopterRefId}`)
        ),
        (snapshot) => setLastMessageSender(snapshot.docs[0]?.data()?.sender)
      ),
    []
  );

  return (
    <View style={GlobalStyles.droidSafeArea}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AdopterMessages', { match, pet, shelter })
        }
        style={[
          tailwind('flex-row items-center py-3 bg-white mx-3 my-3 rounded-lg'),
          styles.cardShadow,
        ]}
      >
        <Image
          style={tailwind('rounded-full h-16 w-16 mr-10  mx-3 my-3')}
          source={{ uri: pet?.imageUrl }}
        />
        <View>
          <Text style={tailwind('text-sm font-semibold')}>
            {pet.name} at {shelter.name}
          </Text>
          <Text>{latestMessage || 'Say hi...'}</Text>
          {lastMessageStatus && lastMessageSender !== adopter.id ? (
            <Text style={tailwind('text-xs font-semibold text-blue-400')}>
              New
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
}
