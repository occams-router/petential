import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';

const ProfileOptions = ({ navigation }) => {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <View>
        <Text style={styles.title}></Text>
        <Text style={styles.title}>Are you a shelter or an adopter?</Text>
      </View>
      <View>
        <Text style={styles.title}></Text>
        <Image
          style={{ width: 100, height: 100, alignSelf: 'center' }}
          source={{
            uri: 'https://tinyurl.com/2w8xx583',
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ShelterSignup')}
        >
          <Text style={styles.buttonTitle}>I represent a shelter!</Text>
        </TouchableOpacity>
        <Text style={styles.title}></Text>
        <Image
          style={{ height: 100, width: 100, alignSelf: 'center' }}
          source={{
            uri: 'http://www.aspca.org/sites/default/files/nyc-adoption-center-facebook.jpg',
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdopterSignup')}
        >
          <Text style={styles.buttonTitle}>I want to adopt!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileOptions;
