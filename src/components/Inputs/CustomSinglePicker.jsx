import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLOR, rh } from '../../theme/Theme'
import { MaterialIcons } from '@expo/vector-icons'
import Text from '../Text/Text'
const genderData = [
  {
    id: 1,
    title: 'Male',
  },
  {
    id: 2,
    title: 'Female',
  },
]
const durationData = [
  {
    id: 1,
    title: 1,
  },
  {
    id: 2,
    title: 2,
  },
  {
    id: 3,
    title: 3,
  },
  {
    id: 4,
    title: 4,
  },
  {
    id: 5,
    title: 5,
  },
  {
    id: 6,
    title: 6,
  },
  {
    id: 7,
    title: 7,
  },
  {
    id: 8,
    title: 8,
  },
  {
    id: 9,
    title: 9,
  },
  {
    id: 10,
    title: 10,
  },
  {
    id: 11,
    title: 11,
  },
  {
    id: 12,
    title: 12,
  },
  {
    id: 13,
    title: 13,
  },
  {
    id: 14,
    title: 14,
  },
  {
    id: 15,
    title: 15,
  },
  {
    id: 16,
    title: 16,
  },
  {
    id: 17,
    title: 17,
  },
  {
    id: 18,
    title: 18,
  },
  {
    id: 19,
    title: 19,
  },
  {
    id: 20,
    title: 20,
  },
  {
    id: 20,
    title: 20,
  },
  {
    id: 21,
    title: 21,
  },
  {
    id: 22,
    title: 22,
  },
  {
    id: 23,
    title: 23,
  },
]
const insurerList = [
  {
    id: 1,
    title: 'Guardian Life Insurance',
  },
  {
    id: 2,
    title: 'Mobile/Tab Coverage',
  },
]
const paymentM = [
  {
    id: 1,
    title: 'Monthly',
  },
  {
    id: 2,
    title: 'Quarterly',
  },
  {
    id: 3,
    title: 'Half-Yearly',
  },
  {
    id: 4,
    title: 'Yearly',
  },
]

export default function CustomSinglePicker({
  label,
  required,
  valueProps,
  error,
  placeholder,
  styleInput,
  data,
  pickerData,
  customStyle,
}) {
  // open list
  const [openList, setOpenList] = useState(false)
  const [selectItem, setSelectItem] = useState(data ? data?.title : null)
  //  filed validate
  const [filedError, setFiledError] = useState(false)
  const categoryName =
    placeholder === 'Select Policy Category' ? data?.category : null
  // const pickerData = data
  //   ? data
  //   : placeholder === 'Gender'
  //   ? genderData
  //   : placeholder === 'Duration'
  //   ? durationData
  //   : placeholder === 'Premium Payment Mode'
  //   ? paymentM
  //   : placeholder === 'Select Insurer' && insurerList

  //  handel select
  const handelSelectItem = item => {
    setSelectItem(item?.title)
    valueProps(item?.title)
    setOpenList(prv => !prv)
  }

  useEffect(() => {
    if (error && selectItem == null) {
      setFiledError(true)
    } else {
      setFiledError(false)
    }
  }, [error, selectItem])
  return (
    <View style={[styles.container, customStyle]}>
      {label == undefined ? (
        ''
      ) : (
        <View style={styles.labelContainerStyle}>
          <Text preset="h5" style={[styles.label]}>
            {label}
          </Text>
          <View style={styles.startIcon}>
            {required ? <SvgStarIcon /> : ''}
          </View>
        </View>
      )}
      <>
        <TouchableOpacity
          activeOpacity={1}
          disabled={data && selectItem ? true : false}
          onPress={() => setOpenList(prv => !prv)}
          style={[styles.searchInputContainer]}
        >
          <View
            style={[
              styles.labelContainer,
              filedError && {
                borderColor: 'red',
              },
              styleInput,
            ]}
          >
            {selectItem == null ? (
              <Text style={[styles.inputLabelStyle]} color={'#979797'}>
                {placeholder}
              </Text>
            ) : (
              <Text style={[styles.inputLabelStyle]}>
                {categoryName ? categoryName : selectItem}
              </Text>
            )}

            <TouchableOpacity
              disabled={data && selectItem ? true : false}
              onPress={() => setOpenList(prv => !prv)}
              style={[styles.searchArrIcon]}
            >
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color="#333d4464"
                style={
                  openList && {
                    transform: [
                      {
                        rotate: '180deg',
                      },
                    ],
                  }
                }
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {/* {error && (
          <Text style={[styles.errorLabel]}>This field can't be empty.</Text>
        )} */}
      </>
      {/*  List container ----- */}
      {openList && (
        <ScrollView nestedScrollEnabled={true} style={styles.listContainer}>
          <>
            {pickerData?.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.2}
                onPress={() => handelSelectItem(item)}
              >
                <Text style={styles.listItem}>{item?.title}</Text>
              </TouchableOpacity>
            ))}
          </>
        </ScrollView>
      )}
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
    marginBottom: 7,
    // fontSize: 13,
    // fontWeight: "500",
    // fontWeight: "Roboto-Bold",
  },
  inputLabelStyle: {
    color: COLOR.gray400,
    fontSize: 13,
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
    paddingHorizontal: 10,
    color: COLOR.gray400,
    height: 50,
    borderRadius: 10,
  },
  searchArrIcon: {
    position: 'absolute',
    right: 15,
  },
  // list
  listContainer: {
    // position: 'absolute',
    backgroundColor: '#fff',
    padding: rh(1.5),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 11,
    // marginTop: rh(5),
    width: '100%',
    marginBottom: rh(1),
    minHeight: rh(4),
  },
  listItem: {
    paddingVertical: 6,
    color: COLOR.gray400,
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
  errorLabel: {
    color: 'red',
    marginBottom: 4,
    fontSize: 12,
  },
})
