import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AdopterHome, AdopterProfile, Header, AdopterMatches} from '../index.js';
import { SafeAreaView} from 'react-native';
import GlobalStyles from '../../../GlobalStyles.js';



const Drawer = createDrawerNavigator();

export default function AdopterSidebar() {
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
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
    <Drawer.Navigator
      drawerType="front"
      initialRouteName="Home"
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 10 },
      }}
    >
      <Drawer.Screen
        name="Home"
        style={{position: 'absolute'}}
        options={{ headerShown: true, headerMode: 'screen', header: () => <Header style={{position: 'absolute'}}/> }}
        component={AdopterHome}
      />
      <Drawer.Screen
        name="Profile"
        style={{position: 'absolute'}}
        options={{ headerShown: true, headerMode: 'screen', header: () => <Header style={{position: 'absolute'}}/> }}
        component={AdopterProfile}
      />
      <Drawer.Screen
        name="Matches"
        style={{position: 'absolute'}}
        options={{ headerShown: true, headerMode: 'screen', header: () => <Header style={{position: 'absolute'}}/> }}
        component={AdopterMatches}
      />
    </Drawer.Navigator>
    </SafeAreaView>
  );
}
