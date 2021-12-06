import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

export default function HeaderBack() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={headerStyles.container}>
      <Button
        icon="arrow-left"
        onPress={() => navigation.goBack()}
        color="#fff"
      >
        Back
      </Button>
    </SafeAreaView>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 50,
    backgroundColor: '#24a6a8',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
