import { SafeAreaView } from 'react-native-safe-area-context';
import {
	Text,
	TouchableOpacity,
	Image,
	View,
	TextInput,
	Button,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	FlatList,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../GlobalStyles.js';
import tailwind from 'tailwind-rn';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../App.js';
import Header from '../Sidebar/Header';
import styles from '../Login/styles.js';
import PetCard from '../PetCards/ShelterPetCard.js';
export default function AdopterMessages(props) {
	const pet = props.route.params.pet;
	const shelter = props.route.params.shelter;
	const adopter = useContext(UserContext);
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);

	const sendMessage = () => {};
	return (
		<SafeAreaView>
			<KeyboardAwareScrollView
				style={{ flex: 1, width: '100%' }}
				keyboardShouldPersistTaps="always">
				<Header title="chat" />
				<Text style={styles.title}></Text>
				<Text style={styles.title}>Your Chat regarding {pet.name}</Text>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={tailwind('flex-1')}
					keyboardVerticalOffset={10}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<FlatList
							date={messages}
							style={tailwind('pl-4')}
							keyExtractor={(item) => item.id}
							renderItem={({ item: message }) =>
								messages.userId === adopter.uid ? (
									<SenderMessage key={message.id} message={message} />
								) : (
									<ReceiverMessage key={message.id} message={message} />
								)
							}
						/>
					</TouchableWithoutFeedback>
					<View
						style={tailwind(
							'flex-row bg-white justify-between border-t border-gray-200 px-5 py-2'
						)}>
						<TextInput
							style={tailwind('h-10 text-lg')}
							placeholder="Send message..."
							onChangeText={setInput}
							onSubmitEditing={sendMessage}
							value={input}
						/>
						<Button onPress={sendMessage} title="Send" color="#56d9db" />
					</View>
				</KeyboardAvoidingView>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	);
}
