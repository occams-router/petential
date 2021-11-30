import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AdopterHome, AdopterProfile } from '../index.js';
import {
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from '@expo/vector-icons';

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
        <Drawer.Screen name="Home" component={AdopterHome} />
        <Drawer.Screen name="Profile" component={AdopterProfile} />
        <Drawer.Screen name="Matches" />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
