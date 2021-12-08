import 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React, { createContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ShelterSignup,
  ShelterSignup2,
  AdopterSignup,
  AdopterSignup2,
  ProfileOptions,
  ShelterSidebar,
  AdopterSidebar,
  PetProfile,
  Login,
  Loading,
  AdopterChat,
  AdopterMessages,
  ShelterChat,
  ShelterMessages,
} from './src/screens';
import { decode, encode } from 'base-64';
import { auth, db } from './src/firebase/config';
import { onAuthStateChanged } from '@firebase/auth';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
  limit,
  doc,
  getDoc,
} from '@firebase/firestore';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './src/PaperTheme';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs();

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
const Stack = createStackNavigator();

let UserContext;

export default function App() {
  const [specificUser, setSpecificUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(undefined);
  const [userType, setUserType] = useState(null);

  useEffect(async () => {
    setLoading(true);
    let userData;
    onSnapshot(collection(db, 'users'), (snapshot) => {
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
    setLoading(false);
  }, []);

  UserContext = createContext(specificUser);

  let screen;
  if (loading) {
    screen = <Stack.Screen name="Loading" component={Loading} />;
  } else {
    if (user) {
      screen =
        userType === 'shelter' && specificUser !== {} && loading === false ? (
          <>
            <Stack.Screen name="ShelterSidebar" component={ShelterSidebar} />
            <Stack.Screen name="ShelterSignup2" component={ShelterSignup2} />
            <Stack.Screen name="PetProfile" component={PetProfile} />
            <Stack.Screen name="ShelterChat" component={ShelterChat} />
            <Stack.Screen name="ShelterMessages" component={ShelterMessages} />
          </>
        ) : userType === 'adopter' &&
          specificUser !== {} &&
          loading === false ? (
          <>
            <Stack.Screen name="AdopterSidebar" component={AdopterSidebar} />
            <Stack.Screen name="AdopterSignup2" component={AdopterSignup2} />
            <Stack.Screen name="AdopterChat" component={AdopterChat} />
            <Stack.Screen name="AdopterMessages" component={AdopterMessages} />
          </>
        ) : (
          (screen = <Stack.Screen name="Loading" component={Loading} />)
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
      screen = <Stack.Screen name="Loading" component={Loading} />;
    }
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <UserContext.Provider value={specificUser}>
          <PaperProvider theme={theme}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              {screen}
            </Stack.Navigator>
          </PaperProvider>
        </UserContext.Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export { UserContext };
