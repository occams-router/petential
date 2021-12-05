import ShelterChatList from "./ShelterChatList";
import React, {useState, useContext, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, FlatList} from "react-native";
import styles from "../Home/styles";
import { db } from '../../firebase/config';
import { doc, getDocs, collection, getDoc } from 'firebase/firestore';
import { UserContext } from '../../../App';
import Header from '../Sidebar/Header';

export default function ShelterChat() {
  const shelter = useContext(UserContext);
  const [matches, setMatches] = useState([]);

  const getMatches = async () => {
    const matchList = [];
    const docs = await getDocs(
      collection(db, 'shelters', `${shelter.id}`, 'matches')
    );
    docs.forEach((doc) => matchList.push(doc.data()));
    setMatches([...matchList]);
  };

  useEffect(() => {
    getMatches();
  }, []);

  console.log(matches);
    return (
<SafeAreaView>
        <Header/>
      <Text style={styles.title}></Text>
      {matches.length === 0 ? (
        <Text>No chats to display!</Text>
      ) : (
          <>
        <FlatList
          data={matches}
          renderItem={({ item }) => <ShelterChatList match={item} />}
        />
        <Text style={styles.title}></Text>
        </>
      )}
    </SafeAreaView>
    );
}