import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  Header,
  ShelterHome,
  ShelterProfile,
  ShelterRequests,
  ShelterMatches,
  ShelterChat,
} from '../index.js';
import GlobalStyles from '../../../GlobalStyles.js';

const Drawer = createDrawerNavigator();

export default function ShelterSidebar() {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Drawer.Navigator
        drawerType="front"
        initialRouteName="Home"
        drawerContentOptions={{
          activeTintColor: '#24a6a8',
          itemStyle: { marginVertical: 10 },
        }}
      >
        <Drawer.Screen
          name="Home"
          style={{ position: 'absolute' }}
          options={{
            headerShown: true,
            drawerActiveTintColor: '#24a6a8',
            headerMode: 'screen',
            header: () => <Header style={{ position: 'absolute' }} />,
          }}
          component={ShelterHome}
        />
        <Drawer.Screen
          name="Profile"
          style={{ position: 'absolute' }}
          options={{
            headerShown: true,
            drawerActiveTintColor: '#24a6a8',
            headerMode: 'screen',
            header: () => <Header style={{ position: 'absolute' }} />,
          }}
          component={ShelterProfile}
        />
        <Drawer.Screen
          name="Requests"
          style={{ position: 'absolute' }}
          options={{
            headerShown: true,
            drawerActiveTintColor: '#24a6a8',
            headerMode: 'screen',
            header: () => <Header style={{ position: 'absolute' }} />,
          }}
          component={ShelterRequests}
        />
        <Drawer.Screen
          name="Matches"
          style={{ position: 'absolute' }}
          options={{
            headerShown: true,
            drawerActiveTintColor: '#24a6a8',
            headerMode: 'screen',
            header: () => <Header style={{ position: 'absolute' }} />,
          }}
          component={ShelterMatches}
        />
        <Drawer.Screen
          name="Chat"
          style={{ position: 'absolute' }}
          options={{
            headerShown: true,
            drawerActiveTintColor: '#24a6a8',
            headerMode: 'screen',
            header: () => <Header style={{ position: 'absolute' }} />,
          }}
          component={ShelterChat}
        />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}
