import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import { auth, db } from '../../firebase/config';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';

export default function ShelterSignup({ navigation }) {
  const [nameOfShelter, setNameOfShelter] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  const onRegisterPress = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords don't match.");
        return;
      }
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const data = {
        uid: response.user.uid,
        name: nameOfShelter,
        email,
        password,
      };
      const docRef = await addDoc(collection(db, 'shelters'), data);
      const shelterRef = doc(db, 'shelters', docRef.id);
      await updateDoc(shelterRef, { id: shelterRef.id });

      await addDoc(collection(db, 'users'), {
        uid: response.user.uid,
        docId: docRef.id,
        type: 'shelter',
      });
      navigation.navigate('ShelterSignup2');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}>Welcome!</Text>
        <Image
          style={styles.logo}
          source={require('../../../assets/corgi-logo.png')}
        />
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
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Sign Up</Text>
        </TouchableOpacity>
        <SafeAreaView style={styles.footerView}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
