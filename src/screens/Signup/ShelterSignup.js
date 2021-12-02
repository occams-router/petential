import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { auth, db } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";

export default function ShelterSignup({ navigation }) {
  const [nameOfShelter, setNameOfShelter] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Login");
  };

  const onRegisterPress = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords don't match.");
        return;
      }
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const data = {
        uid: response.user.uid,
        name: nameOfShelter,
        email,
        password,
        imageUrl,
        city,
        state,
        phone,
        description,
      };
      const docRef = await addDoc(collection(db, "shelters"), data);
      const shelterRef = doc(db, "shelters", docRef.id);
      await updateDoc(shelterRef, { id: shelterRef.id });

      await addDoc(collection(db, "users"), {
        uid: response.user.uid,
        docId: docRef.id,
        type: "shelter",
      });
      data["id"] = docRef.id;
      navigation.navigate("ShelterSidebar");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icon.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="Name of Shelter"
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setNameOfShelter(text)}
          value={nameOfShelter}
          underlineColorAndroid="transparent"
          autoCapitalize="words"
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
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Image URL"
          onChangeText={(text) => setImageUrl(text)}
          value={imageUrl}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="City"
          onChangeText={(text) => setCity(text)}
          value={city}
          underlineColorAndroid="transparent"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="State"
          onChangeText={(text) => setState(text)}
          value={state}
          underlineColorAndroid="transparent"
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Phone No."
          onChangeText={(text) => setPhone(text)}
          value={phone}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={5}
          placeholderTextColor="#aaaaaa"
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
          underlineColorAndroid="transparent"
          autoCapitalize="sentences"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => onRegisterPress()}
        >
          <Text style={styles.buttonTitle}>Sign Up</Text>
        </TouchableOpacity>
        <SafeAreaView style={styles.footerView}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
