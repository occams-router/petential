import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../GlobalStyles.js';
import tailwind from "tailwind-rn";
import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "../../../App.js";
import Header from '../Sidebar/Header';
import styles from "../Login/styles.js";
export default function AdopterMessages() {
    const adopter = useContext(UserContext);
    return (
        <SafeAreaView>
            <Header title='chat'/>
              <KeyboardAwareScrollView
                style={{ flex: 1, width: "100%" }}
                keyboardShouldPersistTaps="always"
              >
              <Text style={styles.title}></Text>
              <Text style={styles.title}>Messages</Text>
              </KeyboardAwareScrollView>
              </SafeAreaView>
              )
              }