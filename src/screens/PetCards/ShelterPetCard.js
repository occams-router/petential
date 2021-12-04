import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function PetCard({ pets }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: pets.imageUrl,
            }}
          />
          <View style={styles.infoStyle}>
            <Text style={styles.titleStyle}>{pets.name}</Text>
            <Text style={styles.categoryStyle}>Species: {pets.breed}</Text>
            <Text style={styles.categoryStyle}>Age: {pets.age}</Text>
            <TouchableOpacity>
              <Text>Edit Pet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const offset = 40;
const radius = 20;
const styles = StyleSheet.create({
  container: {
    width: deviceWidth - 20,
    alignItems: 'center',
    marginTop: 25,
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: '#788eec',
    height: 220,
    borderRadius: radius,

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
  imageStyle: {
    height: 130,
    width: deviceWidth - offset,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    opacity: 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '800',
  },
  categoryStyle: {
    fontWeight: '200',
  },
  infoStyle: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconLabelStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
