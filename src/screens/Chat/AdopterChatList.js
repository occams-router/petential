import React, {useState, useContext, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../GlobalStyles.js';
import styles from "../Home/styles";
import { db } from '../../firebase/config';
import { doc, getDocs, collection } from 'firebase/firestore';
import { UserContext } from '../../../App';


export default function AdopterChatList() {
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
          <Text style={styles.title}>Your List</Text>
        </KeyboardAwareScrollView>
       </SafeAreaView>
    );
}