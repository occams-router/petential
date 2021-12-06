import AdopterChatList from "./AdopterChatList";
import React, { useState, useContext, useEffect } from "react";
import { Text, FlatList, View } from "react-native";
import styles from "../Home/styles";
import { db } from "../../firebase/config";
import { doc, getDocs, collection, getDoc } from "firebase/firestore";
import { UserContext } from "../../../App";
import Header from "../Sidebar/Header";
import GlobalStyles from "../../../GlobalStyles";

export default function AdopterChat() {
  const adopter = useContext(UserContext);
  const [matches, setMatches] = useState([]);

  const getMatches = async () => {
    const matchList = [];
    const docs = await getDocs(
      collection(db, "adopters", `${adopter.id}`, "matches")
    );
    docs.forEach((doc) => matchList.push(doc.data()));
    setMatches([...matchList]);
  };

  useEffect(() => {
    getMatches();
  }, []);

  console.log(matches);
  return (
    <View style={GlobalStyles.droidSafeArea}>
      {matches.length === 0 ? (
        <Text>No chats to display!</Text>
      ) : (
        <>
          <FlatList
            data={matches}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <AdopterChatList match={item} />}
          />
        </>
      )}
    </View>
  );
}
