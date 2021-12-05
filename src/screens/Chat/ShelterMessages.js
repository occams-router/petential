import { SafeAreaView } from 'react-native-safe-area-context';
import {
	Text,
	View,
	TextInput,
	Button,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	FlatList,
} from 'react-native';
import tailwind from 'tailwind-rn';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../../../App.js';
import Header from '../Sidebar/Header';
import styles from '../Login/styles.js';
import SenderMessage from './SenderMessage.js';
import ReceiverMessage from './ReceiverMessage.js';
import { addDoc, onSnapshot, orderBy, serverTimestamp, doc, query, collection, where, updateDoc, updateDocs } from '@firebase/firestore';
import { db } from '../../firebase/config.js';
import { ScrollView } from 'react-native';

export default function ShelterMessages(props) {
	const pet = props.route.params.pet;
	const adopter = props.route.params.adopter;
    const match = props.route.params.match;
	const shelter = useContext(UserContext);
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef();
    let docRefId;
    let messageDoc;

    useEffect(() => 
onSnapshot(query(collection(db, 'messages'), where('petRefId', '==', `${pet.id}`), where('adopterRefId', '==', `${adopter.id}`), orderBy('timestamp', 'desc'),
),  snapshot => setMessages(snapshot.docs.map(doc => ({
id: doc.id,
...doc.data(),
})))
),
[])

useEffect( async () => 
onSnapshot(query(collection(db, 'messages'), where('petRefId', '==', `${match.petRefId}`), where('adopterRefId', '==', `${match.adopterRefId}`), where('sender', '==', `${adopter.id}`)),
  (snapshot)=> snapshot.docs.map(dac => (
    messageDoc = doc(db, 'messages', dac.id),
   updateDoc(messageDoc, {unread: false})))),
[])


	const sendMessage = async () => {
       let docRef = await addDoc(collection(db, 'messages'), {
            timestamp: serverTimestamp(),
            adopterRefId: adopter.id,
            adopterName: adopter.name,
            petRefId: pet.id,
            shelterName: shelter.name,
            shelterRefId: shelter.id,
            message: input,
            sender: shelter.id,
            unread: true,
        })
        await updateDoc(docRef, {id: docRef.id})
        docRefId = docRef.id
        setInput('');  
    };
	return (
		<SafeAreaView style={tailwind('flex-1')}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={tailwind('flex-1')}
					keyboardVerticalOffset={10}>
                        <Header title="chat" />
				<Text style={styles.title}>{adopter.name} regarding {pet.name}</Text>
                <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<FlatList
							data={messages}
							style={tailwind('pl-4')}
                            inverted={-1}
							keyExtractor={(item) => item.id}
							renderItem={({ item: message }) =>
								message.sender === shelter.id ? (
									<SenderMessage key={message.id} message={message} />
								) : (
									<ReceiverMessage key={message.id} message={message} />
								)
							}
						/>
					</TouchableWithoutFeedback>
                    </ScrollView>
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
		</SafeAreaView>
	);
}
