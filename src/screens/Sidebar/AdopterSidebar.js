import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AdopterHome, AdopterProfile, Header } from '../index.js';

const Drawer = createDrawerNavigator();

export default function ShelterSidebar() {
  return (
    <NavigationContainer>
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
          options={{ headerShown: true, header: () => <Header /> }}
          component={AdopterHome}
        />
        <Drawer.Screen
          name="Profile"
          options={{ headerShown: true, header: () => <Header /> }}
          component={AdopterProfile}
        />
        {/* <Drawer.Screen
        name="Matches"
        options={{ headerShown: true, header: <Header /> }}
      /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
