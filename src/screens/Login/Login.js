import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import { auth, db } from '../../firebase/config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { Button } from 'react-native-paper';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const usersCollectionRef = collection(db, 'users');
  const adoptersCollectionRef = collection(db, 'adopters');
  const sheltersCollectionRef = collection(db, 'shelters');

  const onFooterLinkPress = () => {
    navigation.navigate('ProfileOptions');
  };

  const onLoginPress = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const data = await getDocs(usersCollectionRef);
      const usersArr = data.docs.map((doc) => ({ ...doc.data() }));
      const correctUser = usersArr.find(
        (element) => element.uid === user.user.uid
      );
      if (correctUser.type === 'adopter') {
        const data = await getDocs(adoptersCollectionRef);
        const adoptersArr = data.docs.map((doc) => ({ ...doc.data() }));
        const correctAdopter = adoptersArr.find(
          (element) => element.uid === user.user.uid
        );
        navigation.navigate('AdopterSidebar', { user: correctAdopter });
      } else if (correctUser.type === 'shelter') {
        const data = await getDocs(sheltersCollectionRef);
        const sheltersArr = data.docs.map((doc) => ({ ...doc.data() }));
        const correctShelter = sheltersArr.find(
          (element) => element.uid === user.user.uid
        );
        navigation.navigate('ShelterSidebar', { user: correctShelter });
      }
    } catch (error) {
      alert('Invalid email or password');
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <KeyboardAwareScrollView
        style={{ paddingLeft: 40, paddingRight: 40 }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require('../../../assets/corgi-logo.png')}
        />
        <Text style={styles.title}>Petential</Text>
        <Text style={styles.subtitle}>Find your furever friend</Text>
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
        <Button
          mode="contained"
          style={{ marginTop: 10 }}
          onPress={() => onLoginPress()}
        >
          Log in
        </Button>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
