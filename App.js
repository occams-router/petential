import "react-native-gesture-handler";
import React, { createContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ShelterSignup,
  AdopterSignup,
  ProfileOptions,
  ShelterSidebar,
  AdopterSidebar,
  Login,
<<<<<<< HEAD
} from "./src/screens";
import { decode, encode } from "base-64";
import { auth, db } from "./src/firebase/config";
import { onAuthStateChanged } from "@firebase/auth";
=======
  Loading,
} from './src/screens';
import { decode, encode } from 'base-64';
import { auth, db } from './src/firebase/config';
import { onAuthStateChanged } from '@firebase/auth';
>>>>>>> main
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
} from "@firebase/firestore";
<<<<<<< HEAD
=======
import { Provider as PaperProvider } from "react-native-paper";

>>>>>>> main
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
import { Text, SafeAreaView, View, Image } from "react-native";
const Stack = createStackNavigator();

let UserContext;

export default function App() {
  const [specificUser, setSpecificUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const [userType, setUserType] = useState(null);

  useEffect(async () => {
    setLoading(true)
    let userData;
    onSnapshot(collection(db, "users"), (snapshot) => {
      userData = snapshot.docs.map((doc) => doc.data());
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const correctUser = userData.find(
            (element) => element.uid === currentUser.uid
          );

          if (correctUser) {
            setUserType(correctUser.type);
            setUser(currentUser);

            const userRef = await getDoc(
              doc(db, `${correctUser.type}s`, correctUser.docId)
            );

            const userData = userRef.data();

            setSpecificUser(userData);
          }
        } else {
          setUser(null);
        }
      });
    });
    setLoading(false)
  }, []);
  // console.log('user:', user);
  // console.log('userType:', userType);
  // console.log('specific user:', specificUser);

<<<<<<< HEAD
  // console.log('user:', user);
  // console.log('userType:', userType);
  // console.log('specific user:', specificUser);
=======
>>>>>>> main

  UserContext = createContext(specificUser);

  let screen;
  if(loading){
    screen = (
      <Stack.Screen
        name="Loading"
        component={Loading}
      />
    );
  } else{
  if (user) {
    screen =
<<<<<<< HEAD
      userType === "shelter" && specificUser !== {} ? (
=======
      userType === 'shelter' && specificUser !== {} && loading === false ? (
>>>>>>> main
        <>
          <Stack.Screen name="ShelterSidebar" component={ShelterSidebar} />
        </>
<<<<<<< HEAD
      ) : userType === "adopter" && specificUser !== {} ? (
=======
      ) : userType === 'adopter' && specificUser !== {} && loading === false ? (
>>>>>>> main
        <>
          <Stack.Screen name="AdopterSidebar" component={AdopterSidebar} />
        </>
      ) : (
        (screen = (
          <Stack.Screen
            name="Loading"
            component={Loading}
          />
        ))
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
        component={Loading}
      />
    );
  }
}
  return (
    <NavigationContainer>
      <UserContext.Provider value={specificUser}>
      <PaperProvider>
        <Stack.Navigator screenOptions={{
    headerShown: false
  }}>{screen}</Stack.Navigator>
    </PaperProvider>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

export { UserContext };
