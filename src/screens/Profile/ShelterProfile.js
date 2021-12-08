import React, { useState, useContext, useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import GlobalStyles from "../../../GlobalStyles";
import { db } from "../../firebase/config";
import { doc, updateDoc, onSnapshot, query } from "firebase/firestore";
import { UserContext } from "../../../App";
import { TextInput as PaperInput } from "react-native-paper";
import { selectImage, retrieveImage } from "../../ImageUpload";

export default function ShelterProfile() {
  const shelter = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const [nameOfShelter, setNameOfShelter] = useState(shelter.name || "");
  const [city, setCity] = useState(shelter.city || "");
  const [state, setState] = useState(shelter.state || "");
  const [phone, setPhone] = useState(shelter.phone || "");
  const [imageUrl, setImageUrl] = useState(
    shelter.imageUrl ||
      "https://blog.greendot.org/wp-content/uploads/sites/13/2021/09/placeholder-image.png"
  );
  const [description, setDescription] = useState(shelter.description || "");

  useEffect(() => {
    setLoading(false);
  }, []);

  const onSavePress = async () => {
    try {
      const data = {
        name: nameOfShelter,
        city,
        state,
        phone,
        imageUrl,
        description,
      };
      const shelterRef = doc(db, "shelters", shelter.id);
      await updateDoc(shelterRef, data);
      alert("Update was successful!");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  useEffect(
    async () =>
      onSnapshot(query(doc(db, "shelters", shelter.id)), (snapshot) => {
        setNameOfShelter(snapshot.data().name);
        setCity(snapshot.data().city);
        setState(snapshot.data().state);
        setPhone(snapshot.data().phone);
        setImageUrl(snapshot.data().imageUrl);
        setDescription(snapshot.data().description);
      }),
    []
  );

  return loading ? (
    <View style={GlobalStyles.droidSafeArea}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={GlobalStyles.droidSafeArea}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.title}>Welcome, {nameOfShelter}!</Text>
        <Image
          style={styles.logo}
          source={{
            uri: imageUrl,
          }}
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
        <PaperInput
          style={[styles.input, { paddingLeft: 0, fontSize: 14 }]}
          placeholderTextColor="#aaaaaa"
          placeholder="Image URL"
          onChangeText={(text) => setImageUrl(text)}
          value={imageUrl}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          right={
            <PaperInput.Icon
              name="camera"
              onPress={async () => {
                const imageResult = await selectImage();
                if (imageResult) {
                  // retrieve image url from cloud
                  const retrieved = await retrieveImage(imageResult);
                  // update in local state to be saved in db
                  setImageUrl(retrieved);
                }
              }}
            />
          }
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
        <TouchableOpacity style={styles.button} onPress={() => onSavePress()}>
          <Text style={styles.buttonTitle}>Update Profile</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
