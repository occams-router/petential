import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { auth, db } from "../../firebase/config";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const usersCollectionRef = collection(db, "users");
  const adoptersCollectionRef = collection(db, "adopters");
  const sheltersCollectionRef = collection(db, "shelters");
  const [adopter, setAdopters] = useState([]);
  const [shelter, setShelter] = useState([]);

  const onFooterLinkPress = () => {
    navigation.navigate("ProfileOptions");
  };

  const onLoginPress = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const data = await getDocs(usersCollectionRef);
      const usersArr = data.docs.map((doc) => ({ ...doc.data() }));
      const correctUser = usersArr.find(
        (element) => element.uid === user.user.uid
      );
      if (correctUser.type === "adopter") {
        const data = await getDocs(adoptersCollectionRef);
        const adoptersArr = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const correctAdopter = adoptersArr.find(
          (element) => element.uid === user.user.uid
        );
        navigation.navigate("AdopterSidebar", { user: correctAdopter });
      } else if (correctUser.type === "shelter") {
        const data = await getDocs(sheltersCollectionRef);
        const sheltersArr = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const correctShelter = sheltersArr.find(
          (element) => element.uid === user.user.uid
        );
        console.log(correctShelter);
        navigation.navigate("ShelterSidebar", { user: correctShelter });
      }
    } catch (error) {
      alert("Invalid email or password");
      console.log(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}>Pet-ential</Text>
        <Image
          style={styles.logo}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2gT4BUTqAaMh6kIvJdw8Wf6pQQGbm6HI0Yg&usqp=CAU",
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => onLoginPress()}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
