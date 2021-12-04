import React, {useState, useContext, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../GlobalStyles.js';
import styled from "styled-components/native";
import styles from './styles'
import { db } from '../../firebase/config';
import { doc, getDocs, collection, getDoc } from 'firebase/firestore';
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

    return (
<SafeAreaView style={GlobalStyles.droidSafeArea}>
      {/* <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      > */}
          <TouchableOpacity onPress={()=> navigation.navigate('ShelterMessages', {match, pet, adopter})} style={[tailwind('flex-row items-center py-3 bg-white mx-3 my-3 rounded-lg'), styles.cardShadow,]}>
              <Image style={tailwind('rounded-full h-16 w-16 mr-10  mx-3 my-3')}source={{ uri: adopter?.imageUrl }}/>
              <View>
<Text style={tailwind('text-lg font-semibold')}>
{adopter.name}
</Text>
<Text>
    Say hi...
</Text>
              </View>
          </TouchableOpacity>
        {/* </KeyboardAwareScrollView> */}
       </SafeAreaView>
    );
}