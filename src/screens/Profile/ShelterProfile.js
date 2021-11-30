import React, { useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { auth, db } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

export default function ShelterProfile(props) {
  //   const uid = auth.currentUser.uid;
  //   const sheltersCollectionRef = collection(db, 'shelters');

  //   const getShelter = async () => {
  //     const data = await getDocs(sheltersCollectionRef);
  //     const sheltersArr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //     const correctShelter = sheltersArr.find((shelter) => shelter.uid === uid);
  //     return correctShelter;
  //   };

  //   const shelter = await getShelter();
  const shelter = props.route.params.user;

  const [nameOfShelter, setNameOfShelter] = useState(shelter.name || '');
  const [imageUrl, setImageUrl] = useState(shelter.imageUrl || '');
  const [city, setCity] = useState(shelter.city || '');
  const [state, setState] = useState(shelter.state || '');
  const [phone, setPhone] = useState(shelter.phone || '');
  const [description, setDescription] = useState(shelter.description || '');

  const onSavePress = async () => {
    try {
      const data = {
        name: nameOfShelter,
        imageUrl,
        city,
        state,
        phone,
        description,
      };
      const shelterRef = doc(db, 'shelters', shelter.id);
      await setDoc(shelterRef, data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}>Welcome, {shelter.name}!</Text>
        <Image style={styles.logo} source={imageUrl} />
        <TextInput
          style={styles.input}
          placeholder="Name of Shelter"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setNameOfShelter(text)}
          value={nameOfShelter}
          underlineColorAndroid="transparent"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Image URL"
          onChangeText={(text) => setImageUrl(text)}
          value={imageUrl}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="City"
          onChangeText={(text) => setCity(text)}
          value={city}
          underlineColorAndroid="transparent"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="State"
          onChangeText={(text) => setState(text)}
          value={state}
          underlineColorAndroid="transparent"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Phone No."
          onChangeText={(text) => setPhone(text)}
          value={phone}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={5}
          placeholderTextColor="#aaaaaa"
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
          underlineColorAndroid="transparent"
          autoCapitalize="sentences"
        />
        <TouchableOpacity style={styles.button} onPress={() => onSavePress()}>
          <Text style={styles.buttonTitle}>Save</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
