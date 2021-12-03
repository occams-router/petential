import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../Home/styles';
import GlobalStyles from '../../../GlobalStyles';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../../../App';

export default function ShelterRequests() {
  const shelter = useContext(UserContext);

  const [nameOfShelter, setNameOfShelter] = useState(shelter.name || '');
  const [imageUrl, setImageUrl] = useState(
    shelter.imageUrl ||
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2gT4BUTqAaMh6kIvJdw8Wf6pQQGbm6HI0Yg&usqp=CAU'
  );
  const [city, setCity] = useState(shelter.city || '');
  const [state, setState] = useState(shelter.state || '');
  const [phone, setPhone] = useState(shelter.phone || '');
  const [description, setDescription] = useState(shelter.description || '');

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}>Requests Page</Text>
        <Image style={styles.logo} source={imageUrl} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
