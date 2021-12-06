import React, { useContext, useState, useEffect } from "react";
import { Text, FlatList, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AdopterMatchCard from "./AdopterMatchCard";
import styles from "../Home/styles";
import GlobalStyles from "../../../GlobalStyles";
import { db } from "../../firebase/config";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { UserContext } from "../../../App";

export default function AdopterMatches() {
  const adopter = useContext(UserContext);
  const [matches, setMatches] = useState([]);

  // const getMatches = async () => {
  //   const matchList = [];
  //   const docs = await getDocs(
  //     collection(db, "adopters", `${adopter.id}`, "matches")
  //   );
  //   docs.forEach((doc) => matchList.push(doc.data()));
  //   setMatches([...matchList]);
  // };

  // useEffect(() => {
  //   getMatches();
  // }, []);

  useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'adopters', `${adopter.id}`, 'matches')),
				(snapshot) =>
					setMatches(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					)
			),
		[]
	);

  return (
    <View style={GlobalStyles.droidSafeArea}>
      <Text style={styles.title}>Your Matches</Text>
      {matches.length === 0 ? (
        <Text style={{ alignSelf: "center" }}>No matches to display!</Text>
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
