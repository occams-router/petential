import React from "react";
import {View, Text} from 'react-native';
import tailwind from "tailwind-rn";

export default function ReceiverMessage({message}) {
    return (
        <View style={[tailwind('bg-pink-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2'), 
        {alignSelf: "flex-start", marginLeft: 'auto}'},]}>
            <Text style={tailwind('text-white')}>
                {message.message}
            </Text>
        </View>
    )
}