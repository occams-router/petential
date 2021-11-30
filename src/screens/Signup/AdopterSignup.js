import {
	Text,
	TextInput,
	SafeAreaView,
	TouchableOpacity,
	View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { createUserWithEmailAndPassword } from '@firebase/auth';

export default function AdopterSignup({ navigation }) {
	const adoptersCollectionRef = collection(db, 'adopters');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [phone, setPhone] = useState('');
	const [description, setDescription] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [housing, setHousing] = useState('');
	const [lifestyle, setLifestyle] = useState('');
	const [petHistory, setPetHistory] = useState('');

	const onFooterLinkPress = () => {
		navigation.navigate('Login');
	};

	const onSignupPress = async () => {
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

			const uid = response.user.uid;

			const adopterData = {
				uid,
				name,
				email,
				password,
				city,
				state,
				phone,
				description,
				imageUrl,
				housing,
				lifestyle,
				petHistory,
			};

			const docRef = await addDoc(collection(db, 'adopters'), adopterData);
			console.log('Successfully added to adopters collection.');

			const userData = {
				uid,
				docId: `adopters/${docRef.id}`,
				type: 'adopter',
			};

			await addDoc(collection(db, 'users'), userData);
			console.log('Successfully added to users collection.');
			navigation.navigate('AdopterProfile', { user: adopterData });
		} catch (error) {
			console.error('Error adding user: ', error);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
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
					placeholder="Email"
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
				<TouchableOpacity style={styles.button} onPress={() => onSignupPress()}>
					<Text style={styles.buttonTitle}>Sign Up</Text>
				</TouchableOpacity>
				<View style={styles.footerView}>
					<Text style={styles.footerText}>
						Already have an account?{' '}
						<Text onPress={onFooterLinkPress} style={styles.footerLink}>
							Log in
						</Text>
					</Text>
				</View>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}
