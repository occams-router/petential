import React from "react";
import { View, Text, Button, Image } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Are you a shelter or an adopter?</Text>
      <View>
        <Image
          source={{
            uri: "https://tinyurl.com/2w8xx583",
          }}
        />
        <Button
          title="I represent a shelter!"
          onPress={() => navigation.navigate("ShelterSignup")}
        />
        <Image
          source={{
            uri: "http://www.aspca.org/sites/default/files/nyc-adoption-center-facebook.jpg",
          }}
        />
        <Button
          title="I want to adopt!"
          onPress={() => navigation.navigate("AdopterSignup")}
        />
      </View>
    </View>
  );
};

export default Home;
