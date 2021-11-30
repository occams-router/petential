import React from 'react';
import { useState } from 'react';
import {
	SafeAreaView,
	Text,
	Image,
	TextInput,
	TouchableOpacity,
	Button,
} from 'react-native';
import { auth, db } from '../../firebase/config';
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
} from 'firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function AdopterProfile(props) {
	const user = props.route.params.user;
	const id = user.id;
	const [name, setName] = useState(user.name || '');
	const [city, setCity] = useState(user.city || '');
	const [state, setState] = useState(user.state || '');
	const [phone, setPhone] = useState(user.phone || '');
	const [description, setDescription] = useState(user.description || '');
	const [imageUrl, setImageUrl] = useState(user.imageUrl || '');
	const [housing, setHousing] = useState(user.housing || '');
	const [lifestyle, setLifestyle] = useState(user.lifestyle || '');
	const [petHistory, setPetHistory] = useState(user.petHistory || '');

	const updateAdopter = async () => {
		const adopterRef = doc(db, 'adopters', id);
		const updates = {
			lifestyle,
			name,
			city,
			state,
			phone,
			description,
			imageUrl,
			housing,
			petHistory,
		};
		await updateDoc(adopterRef, updates);
	};

	return (
		<SafeAreaView>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: '100%' }}
				keyboardShouldPersistTaps="always">
				<Text style={styles.title}>Welcome, {user.name}!</Text>
				<Text style={styles.title}> Your Profile</Text>
				<TextInput
					style={styles.input}
					label="Name"
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
					label="City"
					placeholder="City"
					onChangeText={(text) => setCity(text)}
					value={city}
					underlineColorAndroid="transparent"
					autoCapitalize="words"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					label="State"
					placeholder="State"
					onChangeText={(text) => setState(text)}
					value={state}
					underlineColorAndroid="transparent"
					autoCapitalize="words"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					label="Phone No."
					placeholder="Phone No."
					onChangeText={(text) => setPhone(text)}
					value={phone}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					label="Description"
					placeholder="Description"
					onChangeText={(text) => setDescription(text)}
					value={description}
					underlineColorAndroid="transparent"
					autoCapitalize="sentences"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					label="Image URL"
					placeholder="Image URL"
					onChangeText={(text) => setImageUrl(text)}
					value={imageUrl}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					label="Housing"
					placeholder="Housing"
					onChangeText={(text) => setHousing(text)}
					value={housing}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					label="Lifestyle"
					placeholder="Lifestyle"
					onChangeText={(text) => setLifestyle(text)}
					value={lifestyle}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholderTextColor="#aaaaaa"
					label="Pet History"
					placeholder="Pet History"
					onChangeText={(text) => setPetHistory(text)}
					value={petHistory}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
				/>
				<Button style={styles.button} onPress={() => updateAdopter()}>
					<Text style={styles.buttonTitle}>Update Profile</Text>
				</Button>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}
