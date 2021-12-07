import React, { useContext, useState, useEffect } from 'react';
import { Text, FlatList, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../Home/styles';
import GlobalStyles from '../../../GlobalStyles';
import { db } from '../../firebase/config';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { UserContext } from '../../../App';
import AdopterMatchCard from './AdopterMatchCard';
import Loading from '../Loading';

export default function AdopterMatches() {
  const adopter = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    const matchesCollectionRef = collection(
      db,
      'adopters',
      `${adopter.id}`,
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
      <Text style={styles.title}>Your Matches</Text>
      {loading ? (
        <Loading />
      ) : matches.length === 0 ? (
        <Text style={{ alignSelf: 'center' }}>No matches to display!</Text>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AdopterMatchCard match={item} />}
        />
      )}
    </View>
  );
}
