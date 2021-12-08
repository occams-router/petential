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
import HeaderBack from '../Sidebar/HeaderBack';
import styles from '../Profile/styles.js';
import SenderMessage from './SenderMessage.js';
import ReceiverMessage from './ReceiverMessage.js';
import {
  addDoc,
  onSnapshot,
  orderBy,
  serverTimestamp,
  doc,
  query,
  collection,
  where,
  updateDoc,
} from '@firebase/firestore';
import { db } from '../../firebase/config.js';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GlobalStyles from '../../../GlobalStyles.js';
import { ScrollView } from 'react-native';
export default function AdopterMessages(props) {
  const pet = props.route.params.pet;
  const shelter = props.route.params.shelter;
  const match = props.route.params.match;
  const adopter = useContext(UserContext);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollViewRef = useRef();
  let messageDoc;
  let docRefId;

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'messages'),
          where('petRefId', '==', `${pet.id}`),
          where('adopterRefId', '==', `${adopter.id}`),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    []
  );

  useEffect(
    async () =>
      onSnapshot(
        query(
          collection(db, 'messages'),
          where('petRefId', '==', `${match.petRefId}`),
          where('adopterRefId', '==', `${match.adopterRefId}`),
          where('sender', '==', `${shelter.id}`)
        ),
        (snapshot) =>
          snapshot.docs.map(
            (dac) => (
              (messageDoc = doc(db, 'messages', dac.id)),
              updateDoc(messageDoc, { unread: false })
            )
          )
      ),
    []
  );

  const sendMessage = async () => {
    const docRef = await addDoc(collection(db, 'messages'), {
      timestamp: serverTimestamp(),
      adopterRefId: adopter.id,
      adopterName: adopter.name,
      petRefId: pet.id,
      shelterName: shelter.name,
      shelterRefId: shelter.id,
      message: input,
      sender: adopter.id,
      unread: true,
    });
    await updateDoc(docRef, { id: docRef.id });
    docRefId = docRef.id;
    setInput('');
  };
  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tailwind('flex-1')}
        keyboardVerticalOffset={10}
      >
        <HeaderBack />
        <Text style={GlobalStyles.droidSafeArea} style={styles.title}>
          {pet.name} at {shelter.name}
        </Text>
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
              data={messages}
              style={tailwind('pl-4')}
              inverted={-1}
              keyExtractor={(item) => item.id}
              renderItem={({ item: message }) =>
                message.sender === adopter.id ? (
                  <SenderMessage key={message.id} message={message} />
                ) : (
                  <ReceiverMessage key={message.id} message={message} />
                )
              }
            />
          </TouchableWithoutFeedback>
        </ScrollView>
        <View
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#EE5407',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
          }}
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
