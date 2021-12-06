import React, { useContext, useState, useEffect } from 'react';
import { Text, Image, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { db } from '../../firebase/config';
import { doc, updateDoc, onSnapshot, query } from 'firebase/firestore';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import { UserContext } from '../../../App';

export default function AdopterProfile() {
  const adopter = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState(adopter.name || '');
  const [city, setCity] = useState(adopter.city || '');
  const [state, setState] = useState(adopter.state || '');
  const [phone, setPhone] = useState(adopter.phone || '');
  const [imageUrl, setImageUrl] = useState(adopter.imageUrl || '');
  const [description, setDescription] = useState(adopter.description || '');
  const [housing, setHousing] = useState(adopter.housing || '');
  const [lifestyle, setLifestyle] = useState(adopter.lifestyle || '');
  const [petHistory, setPetHistory] = useState(adopter.petHistory || '');

  useEffect(() => {
    setLoading(false);
  }, []);

  const updateAdopter = async () => {
    try {
      const adopterRef = doc(db, 'adopters', adopter.id);
      const updates = {
        name,
        city,
        state,
        phone,
        imageUrl,
        description,
        housing,
        lifestyle,
        petHistory,
      };
      await updateDoc(adopterRef, updates);
      alert('Update was successful!');
    } catch (error) {
      alert('Update failed.');
      console.log('Update adopter', error);
    }
  };

  useEffect(
    async () =>
      onSnapshot(query(doc(db, 'shelters', adopter.id)), (snapshot) => {
        setName(snapshot.data().name);
        setCity(snapshot.data().city);
        setState(snapshot.data().state);
        setPhone(snapshot.data().phone);
        setImageUrl(snapshot.data().imageUrl);
        setDescription(snapshot.data().description);
        setHousing(snapshot.data().housing);
        setLifestyle(snapshot.data().lifestyle);
        setPetHistory(snapshot.data().petHistory);
      }),
    []
  );

  return loading ? (
    <View style={GlobalStyles.droidSafeArea}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={GlobalStyles.droidSafeArea}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}> Welcome, {adopter.name}!</Text>
        {adopter.imageUrl ? (
          <Image
            style={styles.logo}
            source={{
              uri: adopter.imageUrl,
            }}
          />
        ) : null}
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
    </View>
  );
}
