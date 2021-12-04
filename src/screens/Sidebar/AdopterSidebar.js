import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AdopterHome, AdopterProfile, Header, AdopterMatches, AdopterChat} from '../index.js';
import { SafeAreaView} from 'react-native';
import GlobalStyles from '../../../GlobalStyles.js';

const Drawer = createDrawerNavigator();

export default function AdopterSidebar() {
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
      <Drawer.Screen
        name="Chat"
        style={{position: 'absolute'}}
        options={{ headerShown: true, headerMode: 'screen', header: () => <Header style={{position: 'absolute'}}/> }}
        component={AdopterChat}
      />
    </Drawer.Navigator>
    </SafeAreaView>
  );
}
