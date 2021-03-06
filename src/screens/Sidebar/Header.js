import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

export default function Header() {
  const navigation = useNavigation();

  const logout = async () => {
    try {
      await signOut(auth);
      alert('You are logged out.');
    } catch (error) {
      alert('Log-out was unsuccessful.');
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={headerStyles.container}>
      <Button
        icon="menu"
        onPress={() => navigation.toggleDrawer()}
        color="#fff"
      >
        Menu
      </Button>
      <Button icon="logout" onPress={() => logout()} color="#fff">
        Log Out
      </Button>
    </SafeAreaView>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 50,
    backgroundColor: '#24a6a8',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
