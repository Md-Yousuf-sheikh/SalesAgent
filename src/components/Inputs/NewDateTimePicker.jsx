import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  Platform,
  Text,
} from 'react-native'
import React, { useState } from 'react'
import {
  DateTimePicker,
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker'
// import { Platform } from 'react-native-web'

export const NewDateTimePicker = ({ onDateInputPress }) => {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    setShow(false)
    setDate(currentDate)
  }

  const showMode = currentMode => {
    // if (Platform.OS === 'android') {
    //   setShow(false)
    //   // for iOS, add a button that closes the picker
    // }
    // setMode(currentMode)
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    })
  }

  const showDatepicker = () => {
    showMode('date')
  }

  const showTimepicker = () => {
    showMode('time')
  }

  return (
    <View>
      <Button onPress={showDatepicker} title="Show date picker!" />
      {/* <Button onPress={showTimepicker} title="Show time picker!" /> */}
      <Text>selected: {date.toLocaleString()}</Text>
      {/* {show && (
        <DateTimePickerAndroid
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )} */}
    </View>
  )
}
