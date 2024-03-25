import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import { COLOR, rf, rh } from '../../theme/Theme'
import moment from 'moment/moment'
import { Path, Svg } from 'react-native-svg'

export default function DatePicker({
  placeholder,
  setValue,
  error,
  styleInput,
  label,
  setPersonalInfo,
  inputText = 'dob',
  personalInfo = [],
  filedError,
  setFiledError,
  errorCheck,
  required,
  inputIndex,
}) {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [selectedNewDate, setSelectedNewDate] = useState(null)
  const [borderColor, setBorderColor] = useState(COLOR.blue200)

  //
  // on Change
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate
    if (setPersonalInfo && inputText) {
      setPersonalInfo(prevState => {
        return prevState.map((prevInput, prevInputIndex) =>
          prevInputIndex === inputIndex
            ? {
                ...prevInput,
                [inputText]: moment(selectedDate).format('MMM D, YYYY'),
              }
            : { ...prevInput }
        )
      })
      // setPersonalInfo(prevState => ({
      //   ...prevState,
      //   [inputText]: moment(selectedDate).format('MMM D, YYYY'),
      // }))
    }
    setShow(false)
    setDate(currentDate)
    setSelectedNewDate(moment(selectedDate).format('MMM D, YYYY'))
    setValue(moment(selectedDate).format('MMM D, YYYY'))
  }
  //  show Mode
  const showMode = currentMode => {
    if (Platform.OS === 'android') {
      setShow(false)
      // for iOS, add a button that closes the picker
    }
    setMode(currentMode)
  }
  // show Date Picker
  const showDatePicker = () => {
    showMode('date')
    setShow(true)
  }
  //

  useEffect(() => {
    if (required === '1' && errorCheck) {
      if (selectedNewDate === null || selectedNewDate === undefined) {
        if (personalInfo[inputText] && personalInfo[inputText] !== undefined) {
          setBorderColor(COLOR.blue200)
        } else {
          setBorderColor('red')
        }
      } else {
        setBorderColor(COLOR.blue200)
      }
    }
  }, [errorCheck, selectedNewDate])
  return (
    <View>
      {label == undefined ? (
        ''
      ) : (
        <View style={styles.labelContainerStyle}>
          <Text style={[styles.label]}>{label}</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={showDatePicker}
        style={[
          styles.labelContainer,
          {
            borderColor: borderColor,
          },
          styleInput,
        ]}
      >
        <Text>
          {selectedNewDate ||
          (personalInfo[inputText] && personalInfo[inputText] !== undefined) ? (
            <Text>
              {selectedNewDate ? selectedNewDate : personalInfo[inputText]}
            </Text>
          ) : (
            <Text
              style={{
                color: '#979797',
              }}
            >
              {placeholder}
            </Text>
          )}
        </Text>
        <View>
          <Svg width={12} height={11} fill="none">
            <Path
              d="M11.25 1.54H8.247v-.6c0-.165-.167-.3-.375-.3-.207 0-.375.135-.375.3v.6h-3v-.6c0-.165-.167-.3-.375-.3-.207 0-.375.135-.375.3v.6H.75c-.414 0-.75.268-.75.6v7.513c0 .332.336.6.75.6h10.5c.414 0 .75-.268.75-.6V2.14c0-.331-.336-.6-.75-.6Zm0 8.113H.75V2.14h2.997v.303c0 .166.168.3.375.3.208 0 .375-.134.375-.3v-.302h3v.302c0 .166.168.3.375.3.208 0 .375-.134.375-.3v-.302h3.003v7.512ZM8.625 5.446h.75c.207 0 .375-.135.375-.3v-.602c0-.165-.168-.3-.375-.3h-.75c-.207 0-.375.135-.375.3v.601c0 .166.168.3.375.3Zm0 2.404h.75c.207 0 .375-.135.375-.3v-.602c0-.166-.168-.3-.375-.3h-.75c-.207 0-.375.134-.375.3v.601c0 .166.168.3.375.3Zm-2.25-1.202h-.75c-.207 0-.375.134-.375.3v.601c0 .166.168.3.375.3h.75c.207 0 .375-.134.375-.3v-.6c0-.166-.168-.301-.375-.301Zm0-2.404h-.75c-.207 0-.375.135-.375.3v.601c0 .166.168.3.375.3h.75c.207 0 .375-.134.375-.3v-.6c0-.167-.168-.301-.375-.301Zm-3 0h-.75c-.207 0-.375.135-.375.3v.601c0 .166.168.3.375.3h.75c.207 0 .375-.134.375-.3v-.6c0-.167-.168-.301-.375-.301Zm0 2.404h-.75c-.207 0-.375.134-.375.3v.601c0 .166.168.3.375.3h.75c.207 0 .375-.134.375-.3v-.6c0-.166-.168-.301-.375-.301Z"
              fill="#8A8A8A"
            />
          </Svg>
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          backgroundColor={COLOR.black}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          onChange={onChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: rh(1),
  },
  labelContainerStyle: {
    flexDirection: 'row',
  },
  startIcon: {},
  label: {
    color: COLOR.gray400,
    marginBottom: rh(0.9),
    fontSize: rf(1.75),
    fontWeight: '500',
    fontWeight: 'Roboto-Bold',
  },
  inputLabelStyle: {
    color: COLOR.gray400,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLOR.blue200,
    // paddingHorizontal: rh(1.2),
    color: COLOR.gray400,
    height: rh(6.5),
    borderRadius: rh(1.2),
    paddingHorizontal: rh(1.4),
    maxWidth: '100%',
  },
})
