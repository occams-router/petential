import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { createUserWithEmailAndPassword } from '@firebase/auth';

export default function AdopterSignup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  const onSignupPress = async () => {
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

      const uid = response.user.uid;

      const adopterData = {
        uid,
        name,
        email,
        password,
      };

      const docRef = await addDoc(collection(db, 'adopters'), adopterData);
      const adopterRef = doc(db, 'adopters', docRef.id);
      await updateDoc(adopterRef, { id: adopterRef.id });
      console.log('Successfully added to adopters collection.');

      const userData = {
        uid,
        docId: docRef.id,
        type: 'adopter',
      };

      await addDoc(collection(db, 'users'), userData);
      console.log('Successfully added to users collection.');
      navigation.navigate('AdopterSignup2');
    } catch (error) {
      console.error('Error adding user: ', error);
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
          placeholder="Email"
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
        <TouchableOpacity style={styles.button} onPress={() => onSignupPress()}>
          <Text style={styles.buttonTitle}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
