import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import AdopterPetCard from '../PetCards/AdopterPetCard';

export default function AdopterHome() {
  return (
    <View>
      <Text style={styles.title}>My Feed</Text>
      <AdopterPetCard />
    </View>
  );
}
