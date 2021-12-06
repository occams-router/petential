import React, { useState, useEffect, useContext } from "react";
import { Text, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { NavigationActions } from "react-navigation";
import GlobalStyles from "../../../GlobalStyles";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
// import PetCard from '../PetCards/ShelterPetCard';
import { UserContext } from "../../../App";
import styles from "./styles";
import { Card, Title, Button } from "react-native-paper";
import { CardContainer, Container } from "../PetCards/cardstyles";

export default function ShelterHome({ navigation }) {
  const shelter = useContext(UserContext);
  const [petData, setPetData] = useState([]);

  const getPets = async () => {
    try {
      const list = [];
      const docsSnap = await getDocs(
        collection(db, `shelters/${shelter.id}/shelterPets`)
      );
      docsSnap.forEach((doc) => {
        list.push(doc.data());
      });
      setPetData([...list]);
    } catch (e) {
      console.log("No pets in shelter");
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Text style={styles.title}>Current Pets</Text>

      <Button
        mode="contained"
        style={{ marginLeft: 80, marginRight: 80, marginBottom: 20 }}
        onPress={() => navigation.navigate("PetProfile", { pet: "" })}
      >
        Add a Pet
      </Button>

      <FlatList
        data={petData}
        keyextractor={(item, index) => item.key}
        renderItem={({ item }) => (
          <Container>
            <CardContainer>
              <Card style={{ padding: 10 }}>
                <Card.Cover source={{ uri: `${item.imageUrl}` }}></Card.Cover>
                <Title>{item.name}</Title>
                <Text>Breed: {item.breed}</Text>
                <Text>Age: {item.age}</Text>
                <Card.Actions
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    mode="contained"
                    icon="account-edit-outline"
                    style={{ backgroundColor: "#24a6a8" }}
                    onPress={() =>
                      navigation.navigate("PetProfile", { pet: item })
                    }
                  >
                    Edit Pet
                  </Button>
                </Card.Actions>
              </Card>
            </CardContainer>
          </Container>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </SafeAreaView>
  );
}
