import { useState, React } from 'react';
import { SafeAreaView, Text, Image } from 'react-native';
import { auth, db } from '../../firebase/config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function AdopterProfile(props) {
	const [name, setName] = useState(props.user.name || '');
	const [city, setCity] = useState(props.user.city || '');
	const [state, setState] = useState(props.user.state || '');
	const [phone, setPhone] = useState(props.user.phone || '');
	const [description, setDescription] = useState(props.user.description || '');
	const [imageUrl, setImageUrl] = useState(props.user.imageUrl || '');
	const [housing, setHousing] = useState(props.user.housing || '');
	const [lifestyle, setLifestyle] = useState(props.user.lifestyle || '');
	const [petHistory, setPetHistory] = useState(props.user.petHistory || '');
    const updateName = async (id, newName) => {
        const userDoc = doc(db, "adopters", name);
        const newFields = { name: newName };
        await updateDoc(userDoc, newFields);
      };

      const updateCity = async (id, newCity) => {
        const userDoc = doc(db, "adopters", city);
        const newFields = { city: newCity };
        await updateDoc(userDoc, newFields);
      };

      const updateState = async (id, newState) => {
        const userDoc = doc(db, "adopters", state);
        const newFields = { state: newState };
        await updateDoc(userDoc, newFields);
      };

      const updatePhone = async (id, newPhone) => {
        const userDoc = doc(db, "adopters", phone);
        const newFields = { phone: newPhone };
        await updateDoc(userDoc, newFields);
      };

      const updateDescription = async (id, newDescription) => {
        const userDoc = doc(db, "adopters", description);
        const newFields = { description: newDescription };
        await updateDoc(userDoc, newFields);
      };

      const updateHousing = async (id, newHousing) => {
        const userDoc = doc(db, "adopters", housing);
        const newFields = { housing: newHousing };
        await updateDoc(userDoc, newFields);
      };

      const updateImage = async (id, newImage) => {
        const userDoc = doc(db, "adopters", image);
        const newFields = { imageUrl: newImage };
        await updateDoc(userDoc, newFields);
      };

      const updateLifestyle = async (id, newLifestyle) => {
        const userDoc = doc(db, "adopters", lifestyle);
        const newFields = { lifestyle: newLifestyle };
        await updateDoc(userDoc, newFields);
      };

	return (
		<SafeAreaView>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: '100%' }}
				keyboardShouldPersistTaps="always">
				<Text style={styles.title}>Welcome!</Text>

				<TextInput
					style={styles.input}
					placeholder="Name"
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => setName(text)}
					value={name}
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
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					placeholder="Description"
					onChangeText={(text) => setDescription(text)}
					value={description}
					underlineColorAndroid="transparent"
					autoCapitalize="sentences"
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
					placeholder="Housing"
					onChangeText={(text) => setHousing(text)}
					value={housing}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					placeholder="Lifestyle"
					onChangeText={(text) => setLifestyle(text)}
					value={lifestyle}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					placeholder="Pet History"
					onChangeText={(text) => setPetHistory(text)}
					value={petHistory}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
                <TouchableOpacity style={styles.button} onPress={() => updatePress()}>
					<Text style={styles.buttonTitle}>Update Profile</Text>
				</TouchableOpacity>
   </KeyboardAwareScrollView>
		</SafeAreaView>
	);
}
