import ShelterChatList from './ShelterChatList';
import React, { useState, useContext, useEffect } from 'react';
import { Text, FlatList, View } from 'react-native';
import { db } from '../../firebase/config';
import { getDocs, collection, onSnapshot } from 'firebase/firestore';
import { UserContext } from '../../../App';
import GlobalStyles from '../../../GlobalStyles';
import Loading from '../Loading';

export default function ShelterChat() {
  const shelter = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setLoading(true);
    const matchesCollectionRef = collection(
      db,
      'shelters',
      `${shelter.id}`,
      'matches'
    );

    const unsub = onSnapshot(matchesCollectionRef, async () => {
      const matchDocs = await getDocs(matchesCollectionRef);
      const matchData = matchDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMatches(matchData);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <View style={GlobalStyles.droidSafeArea}>
      {loading ? (
        <Loading />
      ) : matches.length === 0 ? (
        <Text style={{ alignSelf: 'center', paddingTop: 50 }}>
          No messages to display!
        </Text>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ShelterChatList match={item} />}
        />
      )}
    </View>
  );
}
