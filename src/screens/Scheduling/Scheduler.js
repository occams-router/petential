import React, {useState} from 'react';
import {View, Button, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import HeaderBack from '../Sidebar/HeaderBack';
import { SafeAreaView } from 'react-native-safe-area-context';

const Scheduler = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    alert(`You chose ${currentDate}`)
  };

  const onSave = () => {
    alert(`Your appointment is confirmed for ${date}`)
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView>
      <View>
      <HeaderBack/>
        <Button onPress={showDatepicker} title="Pick the date!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Pick the time!" />
      </View>
      <View>
        <Text>Selected appointment: {date.toDateString()}</Text>
      </View>
      <View>
        <Button onPress={onSave} title="Confirm your appointment" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

export default Scheduler