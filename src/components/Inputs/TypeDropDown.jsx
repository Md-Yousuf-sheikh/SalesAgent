import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLOR, rf, rh } from '../../theme/Theme'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import Text from '../Text/Text'
import { useSelector } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown'
const defaultData = [
  {
    value: 'Health Insurance',
    label: 'Health Insurance',
  },
  {
    value: 'Passport',
    label: 'Passport',
  },
  {
    value: 'Smart Card',
    label: 'Smart Card',
  },
]
export default function TypeDropDown({
  label,
  type,
  setType,
  required,
  data,
  placeholder,
  errorCheck,
  labelStyle,
  disable = false,
}) {
  // open list

  const languageState = useSelector(
    state => state.language.language.finalLanguage?.data
  )

  const [isFocus, setIsFocus] = useState(false)

  const [openList, setOpenList] = useState(false)

  //  filed validate
  // const [filedError, setFiledError] = useState(false)
  const [borderColor, setBorderColor] = useState(COLOR.blue200)
  // console.log('data', selectItem)
  // console.log('d', personalInfo[inputText])
  //  handel select
  const handelSelectItem = item => {
    // const itemData = item
    setType(item)
    // valueProps(item)

    setOpenList(prv => !prv)
  }

  useEffect(() => {
    if (required === '1' && errorCheck) {
      // console.log('enter', selectItem)
      if (
        type === null ||
        type === undefined ||
        type === '' ||
        Object.keys(type)?.length < 1
      ) {
        if (Object.keys(type)?.length < 1) {
          setBorderColor('red')
        } else {
          setBorderColor(COLOR.blue200)
        }
      } else {
        setBorderColor(COLOR.blue200)
      }
    }
  }, [errorCheck])

  return (
    <View style={styles.container}>
      {label === undefined ? (
        ''
      ) : (
        <View style={styles.labelContainerStyle}>
          <Text preset="h5" style={[styles.label, labelStyle]}>
            {label}
          </Text>
          {required === '1' && (
            <FontAwesome
              name="asterisk"
              size={rh(1)}
              color="red"
              style={{ marginTop: rh(0.7), marginLeft: rh(1) }}
            />
          )}
        </View>
      )}

      <Dropdown
        style={[
          {
            borderColor: borderColor,
            borderWidth: 0.8,
            paddingHorizontal: rh(1.7),
            paddingVertical: rh(1),
            borderRadius: rh(1),
            backgroundColor: COLOR.white,
            maxHeight: rh(20),
          },
        ]}
        placeholderStyle={{ color: '#979797', fontSize: rf(1.8) }}
        selectedTextStyle={{ fontSize: rf(2) }}
        mode="default"
        data={data}
        disable={disable}
        // search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder="Search..."
        value={type}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          // setValue(item.value)
          handelSelectItem(item)
          setIsFocus(false)
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  labelContainerStyle: {
    flexDirection: 'row',
  },
  startIcon: {},
  label: {
    color: COLOR.gray400,
    marginBottom: rh(0.9),
    // fontSize: 13,
    // fontWeight: "500",
    // fontWeight: "Roboto-Bold",
  },
  inputLabelStyle: {
    color: COLOR.gray400,
    fontSize: rf(1.7),
  },
  container: {
    marginVertical: rh(1),
  },
  labelContainer: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: COLOR.blue200,
    paddingHorizontal: rh(1.2),
    color: COLOR.gray400,
    height: rh(6.5),
    borderRadius: rh(1.2),
  },
  searchArrIcon: {
    position: 'absolute',
    right: 15,
  },
  // list
  listContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 10,
    marginTop: rh(9),
    width: '100%',
    // flex: 1,
    maxHeight: rh(20),
  },
  listContainerTop: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 10,
    marginTop: -130,
    width: '100%',
    top: 0,
    // maxHeight: 100,
    height: 150,
  },
  listItem: {
    paddingVertical: rh(0.8),
    color: COLOR.gray400,
  },
  errorLabel: {
    color: 'red',
    marginBottom: 4,
    fontSize: 12,
  },
})
