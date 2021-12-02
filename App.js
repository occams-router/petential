import "react-native-gesture-handler";
import React, { createContext, useEffect, useState } from "react";
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
  ShelterSidebar,
  AdopterSidebar,
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
  doc,
  getDoc,
} from "@firebase/firestore";
import { Provider as PaperProvider } from "react-native-paper";

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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(undefined);
  const [userType, setUserType] = useState(null);

  useEffect(async () => {
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
  }, []);

  console.log("user:", user);
  console.log("userType:", userType);
  console.log("specific user:", specificUser);

  UserContext = createContext(specificUser);

  let screen;
  if (user) {
    screen =
      userType === "shelter" && specificUser !== {} ? (
        <>
          <Stack.Screen name="ShelterSidebar" component={ShelterSidebar} />
          <Stack.Screen name="ShelterHome" component={ShelterHome} />
          <Stack.Screen name="ShelterProfile" component={ShelterProfile} />
        </>
      ) : userType === "adopter" && specificUser !== {} ? (
        <>
          <Stack.Screen name="AdopterSidebar" component={AdopterSidebar} />
          <Stack.Screen name="AdopterHome" component={AdopterHome} />
          <Stack.Screen name="AdopterProfile" component={AdopterProfile} />
        </>
      ) : (
        (screen = (
          <Stack.Screen
            name="Loading"
            component={() => (
              <View>
                <Text>Loading...</Text>
              </View>
            )}
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
      <UserContext.Provider value={specificUser}>
        <PaperProvider>
          <Stack.Navigator>{screen}</Stack.Navigator>
        </PaperProvider>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

export { UserContext };
