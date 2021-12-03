import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import styles from './styles';
import { UserContext } from '../../../App';
import { useEffect } from 'react/cjs/react.development';
import GlobalStyles from '../../../GlobalStyles';

export default function AdopterProfile() {
  const user = useContext(UserContext);
  const id = user.id;
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(user.name || '');
  const [city, setCity] = useState(user.city || '');
  const [state, setState] = useState(user.state || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [description, setDescription] = useState(user.description || '');
  const [imageUrl, setImageUrl] = useState(user.imageUrl || '');
  const [housing, setHousing] = useState(user.housing || '');
  const [lifestyle, setLifestyle] = useState(user.lifestyle || '');
  const [petHistory, setPetHistory] = useState(user.petHistory || '');

  useEffect(() => {
setLoading(false)
  }, [])
  const updateAdopter = async () => {
    try {
      const adopterRef = doc(db, 'adopters', id);
      const updates = {
        lifestyle,
        name,
        city,
        state,
        phone,
        description,
        imageUrl,
        housing,
        petHistory,
      };
      await updateDoc(adopterRef, updates);
      alert('Update was successful!');
    } catch (error) {
      alert('Update failed.');
      console.log('Update adopter', error);
    }
  };

  return (
      loading ? (
        <SafeAreaView style={styles.container}>
<Text>Loading...</Text>
</SafeAreaView>
      ) :
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}></Text>
        <Text style={styles.title}> Welcome, {user.name}!</Text>
        <TextInput
          style={styles.input}
          label="Name"
          placeholder="Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setName(text)}
          value={name}
          underlineColorAndroid="transparent"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          label="City"
          placeholder="City"
          onChangeText={(text) => setCity(text)}
          value={city}
          underlineColorAndroid="transparent"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          label="State"
          placeholder="State"
          onChangeText={(text) => setState(text)}
          value={state}
          underlineColorAndroid="transparent"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          label="Phone No."
          placeholder="Phone No."
          onChangeText={(text) => setPhone(text)}
          value={phone}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          label="Description"
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
          underlineColorAndroid="transparent"
          autoCapitalize="sentences"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          label="Image URL"
          placeholder="Image URL"
          onChangeText={(text) => setImageUrl(text)}
          value={imageUrl}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          label="Housing"
          placeholder="Housing"
          onChangeText={(text) => setHousing(text)}
          value={housing}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          label="Lifestyle"
          placeholder="Lifestyle"
          onChangeText={(text) => setLifestyle(text)}
          value={lifestyle}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          label="Pet History"
          placeholder="Pet History"
          onChangeText={(text) => setPetHistory(text)}
          value={petHistory}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => updateAdopter()}>
          <Text style={styles.buttonTitle}>Update Profile</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
