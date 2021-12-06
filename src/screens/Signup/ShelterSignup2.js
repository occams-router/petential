import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { UserContext } from '../../../App';

const ShelterSignup2 = ({ navigation }) => {
  const shelter = useContext(UserContext);

  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [phone, setPhone] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const onSavePress = async () => {
    try {
      const shelterData = {
        city,
        state,
        phone,
        imageUrl,
        description,
      };
      const shelterRef = doc(db, 'shelters', shelter.id);
      await updateDoc(shelterRef, shelterData);
      alert('Profile updated!');
      navigation.navigate('ShelterSidebar');
    } catch (error) {
      alert('Profile not updated');
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.text}>Help us get to know you better!</Text>
        <Text style={styles.text}>
          The more you fill out, the better your changes of getting a match!
        </Text>
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
          placeholderTextColor="#aaaaaa"
          placeholder="Image URL"
          onChangeText={(text) => setImageUrl(text)}
          value={imageUrl}
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
          <Text style={styles.buttonTitle}>Save Profile</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ShelterSignup2;
