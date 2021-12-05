import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, FlatList, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MatchCard from './AdopterMatchCard';
import styles from '../Home/styles';
import GlobalStyles from '../../../GlobalStyles';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { UserContext } from '../../../App';

export default function AdopterMatches() {
  const adopter = useContext(UserContext);
  const [matches, setMatches] = useState([]);

  const getMatches = async () => {
    const matchList = [];
    const docs = await getDocs(
      collection(db, 'adopters', `${adopter.id}`, 'matches')
    );
    docs.forEach((doc) => matchList.push(doc.data()));
    setMatches([...matchList]);
  };

  useEffect(() => {
    getMatches();
  }, []);

  return (
    <SafeAreaView>
      {/* <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      > */}
      <Text style={styles.title}></Text>
      <Text style={styles.title}>Your Matches</Text>
      {matches.length === 0 ? (
        <Text>No matches to display!</Text>
      ) : (
        <FlatList
          data={matches}
          renderItem={({ item }) => <MatchCard match={item} />}
        />
      )}
      {/* </KeyboardAwareScrollView> */}
    </SafeAreaView>
  );
}
