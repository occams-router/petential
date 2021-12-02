import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Header() {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await signOut(auth);
      alert('You are logged out.');
    } catch (error) {
      alert('Log-out was unsuccesful.');
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={headerStyles.container}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Text>Menu</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => logout()}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#56d9db',
    elevation: 5,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
