import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, FlatList, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MatchCard from "./ShelterMatchCard";
import styles from "../Home/styles";
import GlobalStyles from "../../../GlobalStyles";
import { db } from "../../firebase/config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { UserContext } from "../../../App";

export default function ShelterMatches() {
  const shelter = useContext(UserContext);
  const [matches, setMatches] = useState([]);

  useEffect(async () => {
    const matchesCollectionRef = collection(
      db,
      "shelters",
      `${shelter.id}`,
      "matches"
    );

    const unsub = onSnapshot(matchesCollectionRef, async () => {
      const matchDocs = await getDocs(matchesCollectionRef);
      const matchData = matchDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMatches(matchData);
    });

    return unsub;
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Text style={styles.title}>My Matches</Text>
      {matches.length === 0 ? (
        <Text style={{ alignSelf: "center" }}>No matches to display!</Text>
      ) : (
        <FlatList
          data={matches}
          renderItem={({ item }) => <MatchCard match={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}
