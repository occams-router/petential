import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { auth, db } from '../../firebase/config';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { collection, getDocs, doc } from 'firebase/firestore';

export default function Login({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const usersCollectionRef = collection(db, 'users');
	const [adopter, setAdopters] = useState([]);
	const [shelter, setShelter] = useState([]);

	const onFooterLinkPress = () => {
		navigation.navigate('Home');
	};

	const onLoginPress = async () => {
		try {
			const user = await signInWithEmailAndPassword(auth, email, password);
			// console.log(user);
			const data = await getDocs(usersCollectionRef);
			console.log('User', user.user.uid);
			const usersArr = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
			const correctUser = usersArr.find(
				(element) => element.uid === user.user.uid
			);
			console.log(correctUser.type);
			if (correctUser.type === 'adopter') {
				navigation.navigate('FillerHome');
			} else if (correctUser.type === 'shelter') {
				navigation.navigate('FillerHome');
			}
		} catch (error) {
			alert('Invalid email or password');
			console.log(error.message);
		}
	};

	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: '100%' }}
				keyboardShouldPersistTaps="always">
				<Text style={styles.title}>Pet-ential</Text>
				<Image
					style={styles.logo}
					source={{
						uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2gT4BUTqAaMh6kIvJdw8Wf6pQQGbm6HI0Yg&usqp=CAU',
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
						Don't have an account?{' '}
						<Text onPress={onFooterLinkPress} style={styles.footerLink}>
							Sign up
						</Text>
					</Text>
				</View>
			</KeyboardAwareScrollView>
		</View>
	);
}
