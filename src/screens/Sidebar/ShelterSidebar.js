import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  ShelterHome,
  ShelterProfile,
  Header,
  ShelterRequests,
} from "../index.js";

const Drawer = createDrawerNavigator();

export default function ShelterSidebar() {
  return (
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

      {/* <Drawer.Screen
        name="Requests"
        options={{ headerShown: true, header: <Header /> }}
      />
      {<Drawer.Screen
        name="Matches"
        options={{ headerShown: true, header: <Header /> }}
      /> */}
    </Drawer.Navigator>
  );
}
