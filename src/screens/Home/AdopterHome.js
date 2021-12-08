import React, {useState} from 'react';
import { Text, View, Picker, StyleSheet} from 'react-native';
import styles from './styles';
import AdopterPetCard from '../PetCards/AdopterPetCard';


export default function AdopterHome() {
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <View>
      <Text style={styles.title}>My Feed</Text>
      <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="All Pets" value="all" />
        <Picker.Item label="Dogs" value="dogs" />
        <Picker.Item label="Cats" value="cats" />
      </Picker>
      </View>
      <View>
      <AdopterPetCard value={selectedValue}/>
      </View>
    </View>
  );
}
