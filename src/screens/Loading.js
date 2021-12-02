import React from "react";
import { ActivityIndicator, StyleSheet, Text, SafeAreaView } from "react-native";

export default function Loading () {
    return(
  <SafeAreaView style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#FFC0CB" />
  </SafeAreaView>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

