import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  ShelterHome,
  ShelterProfile,
  ShelterRequests,
  ShelterMatches,
  Header,
  ShelterChat,
} from '../index.js';
import GlobalStyles from '../../../GlobalStyles.js';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

export default function ShelterSidebar() {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Drawer.Navigator
        drawerType="front"
        initialRouteName="Home"
        drawerContentOptions={{
          activeTintColor: "#e91e63",
          itemStyle: { marginVertical: 10 },
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{ headerShown: true, header: () => <Header /> }}
          component={ShelterHome}
        />
        <Drawer.Screen
          name="Profile"
          options={{ headerShown: true, header: () => <Header /> }}
          component={ShelterProfile}
        />
        <Drawer.Screen
          name="Requests"
          options={{ headerShown: true, header: () => <Header /> }}
          component={ShelterRequests}
        />
        <Drawer.Screen
          name="Matches"
          options={{ headerShown: true, header: () => <Header /> }}
          component={ShelterMatches}
        />
        <Drawer.Screen
        name="Chat"
        style={{position: 'absolute'}}
        options={{ headerShown: true, headerMode: 'screen', header: () => <Header style={{position: 'absolute'}}/> }}
        component={ShelterChat}
      />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}
