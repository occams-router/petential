import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import HeaderBack from '../Sidebar/HeaderBack';
import { db } from '../../firebase/config';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import { UserContext } from '../../../App';

export default function PetProfile(props) {
  const pet = props.route.params.pet;
  const shelter = useContext(UserContext);

  const [name, setName] = pet ? useState(pet.name || '') : useState('');
  const [age, setAge] = pet ? useState(pet.age || '') : useState('');
  const [species, setSpecies] = pet
    ? useState(pet.species || '')
    : useState('');
  const [breed, setBreed] = pet ? useState(pet.breed || '') : useState('');
  const [imageUrl, setImageUrl] = pet
    ? useState(
        pet.imageUrl ||
          'https://blog.greendot.org/wp-content/uploads/sites/13/2021/09/placeholder-image.png'
      )
    : useState(
        'https://blog.greendot.org/wp-content/uploads/sites/13/2021/09/placeholder-image.png'
      );
  const [shelterName, setShelterName] = pet
    ? useState(pet.shelter || shelter.name)
    : useState(shelter.name);
  const [city, setCity] = pet ? useState(pet.city || '') : useState('');
  const [state, setState] = pet ? useState(pet.state || '') : useState('');
  const [description, setDescription] = pet
    ? useState(pet.description || '')
    : useState('');

  const onSavePress = async () => {
    try {
      const data = {
        name,
        age,
        species,
        breed,
        imageUrl,
        shelterName,
        shelterRefId: shelter.id,
        city,
        state,
        description,
      };
      if (pet) {
        // Update doc in main pet collection using refId from pet
        const petRef = doc(db, 'pets', pet.refId);
        await updateDoc(petRef, data);
        // Update doc in subcollection
        const subPetRef = doc(
          db,
          'shelters',
          `${shelter.id}`,
          'shelterPets',
          `${pet.id}`
        );
        await updateDoc(subPetRef, data);
      } else {
        // Create docs in main pet collection and subcollection
        const petRef = await addDoc(collection(db, 'pets'), data);
        const subPetRef = await addDoc(
          collection(db, 'shelters', `${shelter.id}`, 'shelterPets'),
          data
        );
        // Update both docs with references to themselves and each other
        await updateDoc(petRef, { id: petRef.id, refId: subPetRef.id });
        await updateDoc(subPetRef, { id: subPetRef.id, refId: petRef.id });
      }
      alert('Successfully updated!');
    } catch (error) {
      console.log(error);
      alert('Could not update pet');
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <HeaderBack />
        <Text style={styles.title}>{name}</Text>
        <Image style={styles.logo} source={{ uri: imageUrl }} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setName(text)}
          value={name}
          underlineColorAndroid="transparent"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setAge(text)}
          value={age}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Species"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setSpecies(text)}
          value={species}
          underlineColorAndroid="transparent"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Breed"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setBreed(text)}
          value={breed}
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
          placeholder="Shelter Name"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setShelterName(text)}
          value={shelterName}
          underlineColorAndroid="transparent"
          autoCapitalize="words"
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
