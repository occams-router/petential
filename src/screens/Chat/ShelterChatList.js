import React, {useState, useContext, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, Image, View } from "react-native";
import GlobalStyles from '../../../GlobalStyles.js';
import styled from "styled-components/native";
import styles from './styles'
import { db } from '../../firebase/config';
import { doc, getDocs, collection, getDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { UserContext } from '../../../App';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
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


export default function ShelterChatList({match}) {
    const navigation = useNavigation();
    console.log(match)
    const shelter = useContext(UserContext);
  const [adopter, setAdopter] = useState([]);
  const [pet, setPet] = useState([]);
  const [latestMessage, setLatestMessage] = useState('');
  const [lastMessageStatus, setLastMessageStatus] = useState('');
  const [lastMessageSender, setLastMessageSender] = useState('')

  const getAdopter = async () => {
    const adopterDocRef = doc(db, 'adopters', `${match.adopterRefId}`);
    const adopterDoc = await getDoc(adopterDocRef);
    setAdopter(adopterDoc.data());
    console.log('adopterDoc', adopterDoc.data())
  };

  const getPet = async () => {
    const petDocRef = doc(db, 'pets', `${match.petRefId}`);
    const petDoc = await getDoc(petDocRef);
    setPet(petDoc.data());
    console.log('PetDoc', petDoc.data())
  };

  useEffect(() => {
    getAdopter();
    getPet();
  }, []);

  useEffect(() => 
  onSnapshot(query(collection(db, 'messages'), orderBy('timestamp', 'desc'), where('petRefId', '==', `${match.petRefId}`), where('adopterRefId', '==', `${match.adopterRefId}`)),
  (snapshot)=> setLatestMessage(snapshot.docs[0]?.data()?.message),)
  , []);

  useEffect(() => 
  onSnapshot(query(collection(db, 'messages'), orderBy('timestamp', 'desc'), where('petRefId', '==', `${match.petRefId}`), where('adopterRefId', '==', `${match.adopterRefId}`)),
  (snapshot)=> setLastMessageStatus(snapshot.docs[0]?.data()?.unread),)
  , []);

  useEffect(() => 
  onSnapshot(query(collection(db, 'messages'), orderBy('timestamp', 'desc'), where('petRefId', '==', `${match.petRefId}`), where('adopterRefId', '==', `${match.adopterRefId}`)),
  (snapshot)=> setLastMessageSender(snapshot.docs[0]?.data()?.sender),)
  , []);

    return (
<SafeAreaView style={GlobalStyles.droidSafeArea}>
          <TouchableOpacity onPress={()=> navigation.navigate('ShelterMessages', {match, pet, adopter})} style={[tailwind('flex-row items-center py-3 bg-white mx-3 my-3 rounded-lg'), styles.cardShadow,]}>
              <Image style={tailwind('rounded-full h-16 w-16 mr-10  mx-3 my-3')}source={{ uri: adopter?.imageUrl }}/>
              <View>
<Text style={tailwind('text-sm font-semibold')}>
{adopter.name} inquiring about {pet.name}
</Text>
<Text>
    {latestMessage || 'Say hi...'}
</Text>
{lastMessageStatus && lastMessageSender !== shelter.id ? (
<Text style={tailwind('text-xs font-semibold text-blue-400')}>
   New
</Text>): null}
              </View>
          </TouchableOpacity>
       </SafeAreaView>
    );
}