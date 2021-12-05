import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import { Card, Title, Button } from 'react-native-paper';

export default function ProfileOptions({ navigation }) {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <View style={{ alignItems: 'center', margin: 30 }}>
        <Title style={styles.title}>Are you an Adopter or a Shelter?</Title>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: 10,
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: 'https://tinyurl.com/2w8xx583',
          }}
        />
        <Image
          style={styles.image}
          source={{
            uri: 'http://www.aspca.org/sites/default/files/nyc-adoption-center-facebook.jpg',
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('ShelterSignup')}
        >
          I am a Shelter!
        </Button>
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => navigation.navigate('AdopterSignup')}
        >
          I am an Adopter!
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  titleContainer: {
    alignItems: 'center',
    margin: 30,
  },
  title: {
    fontWeight: 'bold',
    // marginTop: 50,
    marginBottom: 70,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 35,
    borderRadius: 5,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
  },
});
