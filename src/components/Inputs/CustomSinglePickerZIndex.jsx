import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  LayoutAnimation,
} from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLOR, rf, rh, ROW } from '../../theme/Theme'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import Text from '../Text/Text'
import { ToggleAnimation } from '../../Animation/ToggleAnimation'
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
export default function CustomSinglePickerZIndex({
  label,
  required,
  valueProps,
  error,
  placeholder,
  styleInput,
  dropTop,
  labelStyle,
  data,
  NotZIndex,
  icon,
}) {
  // open list
  const [openList, setOpenList] = useState(false)
  const [selectItem, setSelectItem] = useState(null)
  const [selectedData, setSelectedData] = useState()
  //
  const [setData, setSetData] = useState(defaultData)
  //  filed validate
  const [filedError, setFiledError] = useState(false)
  useEffect(() => {
    if (data) {
      setSetData(data)
    } else {
      setSetData(defaultData)
    }
  }, [showContent])

  //  handel select
  const handelSelectItem = item => {
    setSelectItem(item?.value)
    valueProps(item?.value)
    setOpenList(prv => !prv)
    setSelectedData(item)
    toggleListItem()
  }

  useEffect(() => {
    if (error && selectItem == null) {
      setFiledError(true)
    } else {
      setFiledError(false)
    }
  }, [error, selectItem])
  //
  const [showContent, setShowContent] = useState(false)
  //  animation
  const animationController = useRef(new Animated.Value(0)).current
  const toggleListItem = () => {
    //
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    }
    //
    Animated.timing(animationController, config).start()
    LayoutAnimation.configureNext(ToggleAnimation)
    setShowContent(!showContent)
  }
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  })
  return (
    <View style={styles.container}>
      {label == undefined ? (
        ''
      ) : (
        <View style={styles.labelContainerStyle}>
          <Text preset="h5" style={[styles.label, labelStyle]}>
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
          onPress={() => toggleListItem()}
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
              <Text style={[styles.inputLabelStyle]}>{selectItem}</Text>
            )}

            <TouchableOpacity
              onPress={() => setOpenList(prv => !prv)}
              style={[styles.searchArrIcon]}
            >
              <Animated.View
                style={
                  showContent && {
                    transform: [
                      {
                        rotate: arrowTransform,
                      },
                    ],
                  }
                }
              >
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={20}
                  color="#333d4464"
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        {/* {error && (
          <Text style={[styles.errorLabel]}>This field can't be empty.</Text>
        )} */}
      </>
      {/*  List container ----- */}
      <View
        style={{
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          zIndex: 2,
        }}
      >
        {showContent && (
          <ScrollView
            nestedScrollEnabled={true}
            style={[
              styles.listContainer,
              label && {
                marginTop: rh(9),
              },
              dropTop && {
                bottom: 0,
                marginBottom: rh(6),
              },
              NotZIndex && {
                position: 'relative',
                marginTop: 0,
              },
            ]}
          >
            <>
              {defaultData?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.2}
                  onPress={() => handelSelectItem(item)}
                  style={ROW}
                >
                  {icon && (
                    <Ionicons
                      name="ios-checkbox-sharp"
                      size={15}
                      color={
                        selectedData?.id === item?.id ? '#2253A5' : '#646464'
                      }
                      style={{ marginRight: rh(0.7) }}
                    />
                  )}
                  <Text color={'#646464'} preset="h6" style={styles.listItem}>
                    {item?.value}
                  </Text>
                </TouchableOpacity>
              ))}
            </>
          </ScrollView>
        )}
        {/* <ScrollView
          nestedScrollEnabled={true}
          style={[
            styles.listContainer,
            label && {
              marginTop: rh(9),
            },
            dropTop && {
              bottom: 0,
              marginBottom: rh(6),
            },
            NotZIndex && {
              position: 'relative',
              marginTop: 0,
            },
          ]}
        >
          <>
            {defaultData?.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.2}
                onPress={() => handelSelectItem(item)}
                style={ROW}
              >
                {icon && (
                  <Ionicons
                    name="ios-checkbox-sharp"
                    size={15}
                    color={
                      selectedData?.id === item?.id ? '#2253A5' : '#646464'
                    }
                    style={{ marginRight: rh(0.7) }}
                  />
                )}
                <Text color={'#646464'} preset="h6" style={styles.listItem}>
                  {item?.value}
                </Text>
              </TouchableOpacity>
            ))}
          </>
        </ScrollView> */}
      </View>
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
    paddingHorizontal: rh(1.5),
    color: COLOR.gray400,
    height: rh(6.5),
    borderRadius: rh(1.2),
  },
  searchArrIcon: {
    position: 'absolute',
    right: rh(1.7),
  },
  // list
  listContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    padding: rh(1.2),
    borderRadius: rh(0.7),
    borderWidth: 1,
    borderColor: '#ddd',
    zIndex: 11,
    marginTop: rh(6),
    width: '100%',
    overflow: 'hidden',
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
