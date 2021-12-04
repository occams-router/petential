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
import tailwind from 'tailwind-rn';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../../App.js';
import Header from '../Sidebar/Header';
import styles from '../Login/styles.js';
import SenderMessage from './SenderMessage.js';
import ReceiverMessage from './ReceiverMessage.js';
import { addDoc, onSnapshot, orderBy, serverTimestamp, doc, query, collection, where } from '@firebase/firestore';
import { db } from '../../firebase/config.js';

export default function ShelterMessages(props) {
	const pet = props.route.params.pet;
	const adopter = props.route.params.adopter;
    const match = props.route.params.match;
	const shelter = useContext(UserContext);
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);

    useEffect(() => 
onSnapshot(query(collection(db, 'messages'), where('petRefId', '==', `${pet.id}`), where('adopterRefId', '==', `${adopter.id}`), orderBy('timestamp', 'desc'),
),  snapshot => setMessages(snapshot.docs.map(doc => ({
id: doc.id,
...doc.data(),
})))
), [])

	const sendMessage = () => {
        addDoc(collection(db, 'messages'), {
            timestamp: serverTimestamp(),
            adopterRefId: adopter.id,
            // adopterUId: adopter.uid,
            // shelterUId: shelter.uid,
            adopterName: adopter.name,
            petRefId: pet.id,
            shelterName: shelter.name,
            shelterRefId: shelter.id,
            message: input,
        })
        setInput('');
    };
	return (
		<SafeAreaView style={tailwind('flex-1')}>
			{/* <KeyboardAwareScrollView
				style={{ flex: 1, width: '100%' }}
				keyboardShouldPersistTaps="always"> */}
				<Header title="chat" />
				<Text style={styles.title}>Your Chat with {adopter.name} regarding {pet.name}</Text>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={tailwind('flex-1')}
					keyboardVerticalOffset={10}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<FlatList
							data={messages}
							style={tailwind('pl-4')}
                            inverted={-1}
							keyExtractor={(item) => item.id}
							renderItem={({ item: message }) =>
								messages.userId === shelter.uid ? (
									<SenderMessage key={message.id} message={message} />
								) : (
									<ReceiverMessage key={message.id} message={message} />
								)
							}
						/>
					</TouchableWithoutFeedback>
					<View
                   stele={{width: '100%',
                    height: 50,
                    backgroundColor: '#EE5407',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute', 
                    bottom: 0}}
						style={tailwind(
							'flex-row justify-between border-t border-gray-200 px-5 py-2'
						)}
                        >
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
			{/* </KeyboardAwareScrollView> */}
		</SafeAreaView>
	);
}
