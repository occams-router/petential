import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ShelterHome,
  AdopterHome,
  ShelterProfile,
  AdopterProfile,
  ShelterSignup,
  AdopterSignup,
  ProfileOptions,
  Login,
} from "./src/screens";
import { decode, encode } from "base-64";
import { auth, db } from "./src/firebase/config";
import { onAuthStateChanged } from "@firebase/auth";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "@firebase/firestore";

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
import { Text, SafeAreaView, View, Image } from "react-native";

const Stack = createStackNavigator();

const usersCollectionRef = collection(db, "users");

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    let userData;
    onSnapshot(collection(db, "users"), (snapshot) => {
      userData = snapshot.docs.map((doc) => doc.data());
      console.log("userData from useEffect:", userData);

      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const correctUser = userData.find(
            (element) => element.uid === currentUser.uid
          );

          console.log("correctUser:", correctUser);
          if (correctUser) {
            setUserType(correctUser.type);
            setUser(currentUser);
          }
        } else {
          setUser(null);
        }
      });
    });
  });

  /*
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      const data = await getDocs(usersCollectionRef);

      const usersArr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const correctUser = usersArr.find(
        (element) => element.uid === currentUser.uid
      );

      setUserType(correctUser.type);
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });
*/

  let screen;
  if (user) {
    screen =
      userType === "shelter" ? (
        <>
          <Stack.Screen name="ShelterProfile" component={ShelterProfile} />
          <Stack.Screen name="ShelterHome" component={ShelterHome} />
        </>
      ) : (
        <>
          <Stack.Screen name="AdopterProfile" component={AdopterProfile} />
          <Stack.Screen name="AdopterHome" component={AdopterHome} />
        </>
      );
  } else if (user === null) {
    screen = (
      <>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ProfileOptions" component={ProfileOptions} />
        <Stack.Screen name="AdopterSignup" component={AdopterSignup} />
        <Stack.Screen name="ShelterSignup" component={ShelterSignup} />
      </>
    );
  } else {
    screen = (
      <Stack.Screen
        name="Loading"
        component={() => (
          <View>
            <Text>Loading...</Text>
          </View>
        )}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>{screen}</Stack.Navigator>
    </NavigationContainer>
  );
}
