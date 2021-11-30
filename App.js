import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  ShelterHome,
  AdopterHome,
  ShelterSignup,
  AdopterSignup,
  ProfileOptions,
  Login,
} from "./src/screens";
import { decode, encode } from "base-64";
import { auth, db } from "./src/firebase/config";
import { onAuthStateChanged } from "@firebase/auth";
import { collection, getDocs } from "@firebase/firestore";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  const usersCollectionRef = collection(db, "users");

  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      const data = await getDocs(usersCollectionRef);

      const usersArr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const correctUser = usersArr.find(
        (element) => element.uid === currentUser.uid
      );

      console.log("user type:", correctUser.type);
      console.log("currentUser:", currentUser);

      setUserType(correctUser.type);
      setUser(currentUser);
    } else {
      setUser(null);
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          userType === "shelter" ? (
            <>
              <Stack.Screen name="ShelterHome" component={ShelterHome} />
            </>
          ) : (
            <>
              <Stack.Screen name="AdopterHome" component={AdopterHome} />
            </>
          )
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ProfileOptions" component={ProfileOptions} />
            <Stack.Screen name="AdopterSignup" component={AdopterSignup} />
            <Stack.Screen name="ShelterSignup" component={ShelterSignup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: 'white',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		padding: 10,
// 		margin: 10,
// 	},
// });

/*

{user ? (
          userType === "shelter" ? (
            <>
              <Stack.Screen name="ShelterHome" component={ShelterHome} />
            </>
          ) : (
            <>
              <Stack.Screen name="AdopterHome" component={AdopterHome} />
            </>
          )
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ProfileOptions" component={ProfileOptions} />
            <Stack.Screen name="AdopterSignup" component={AdopterSignup} />
            <Stack.Screen name="ShelterSignup" component={ShelterSignup} />
          </>
        )}

*/
