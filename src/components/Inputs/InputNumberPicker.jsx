import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Text from "../Text/Text";
import { COLOR, ROW, rw, SPACING, rh, rf } from "../../theme/Theme";
import SvgMarkIcon from "../../svg/SvgMarkIcon";
import { useSelector } from "react-redux";
import PhoneInput from "react-native-phone-number-input";
export default function InputNumberPicker({
  containerMain,
  label,
  setValue,
  value,
  setFormattedValue,
  filedError,
  formattedValue,
  valid,
  setValid,
}) {
  const languageState = useSelector(
    (state) => state.language.language.finalLanguage?.data
  );

  const phoneInput = useRef(null);

  // const [getNumber, setGetNumber] = useState(null)
  //
  // const [filedError, setFiledError] = useState(false)

  //
  // useEffect(() => {
  //   switch (selected.country) {
  //     case 'Bangladesh':
  //       let re = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/
  //       if (re.test(0 + getNumber)) {
  //         return (
  //           setNumberLength(10),
  //           setNumber(selected.number.slice(1) + getNumber),
  //           setCountry(selected),
  //           setGetNumber(getNumber),
  //           setNumberPhone(true)
  //         )
  //       } else {
  //         setNumberPhone(false)
  //         setNumber(null)
  //       }

  //     case 'India':
  //     // console.log(selected.country)
  //     // return;
  //     case 'Pakistan':
  //     // return 0;
  //     case 'Nepal':
  //     // return console.log(selected.country);
  //     case 'Saudi Arabia':
  //     // return console.log(selected.country);

  //     default:
  //       break
  //   }
  // }, [getNumber, selected])

  //  Input error check
  // useEffect(() => {
  //   if (error === true && numberPhone === false) {
  //     setFiledError(true)
  //     // console.log("Error ok");
  //   } else {
  //     setFiledError(false)
  //     // console.log("Error false");
  //   }
  // }, [error, numberPhone, selected])

  useEffect(() => {
    if (value && phoneInput.current.isValidNumber(value)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [value]);

  return (
    <View style={[styles.mainContainer, containerMain]}>
      {label && (
        <Text
          preset="h5"
          style={{
            color: "#646464",
            // lineHeight: 17,
            marginBottom: rh(0.7),
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: "row",
          borderWidth: rh(0.1),
          borderColor: filedError && !valid ? "#EB4849" : COLOR.blue200,
          borderRadius: rh(1.1),
          // height: rh(6),
        }}
      >
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="BD"
          layout="first"
          onChangeText={(text) => {
            setValue(text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
          }}
          containerStyle={{
            borderRadius: rh(1.1),
            backgroundColor: COLOR.blue100,
          }}
          textContainerStyle={{
            paddingTop: rh(1.4),
            fontSize: rf(1.9),
            backgroundColor: COLOR.white,
            alignSelf: "center",
          }}
          textInputProps={{ maxLength: 10 }}
          // withDarkTheme
          // withShadow
          // autoFocus
        />
        <View style={styles.markIcon}>
          <SvgMarkIcon
            fill={
              filedError
                ? valid
                  ? COLOR.green800
                  : "#EB4849"
                : valid
                ? COLOR.green800
                : COLOR.buttonDisable
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    // height: rh(6),
    zIndex: 10,
  },
  inputContainer: {
    borderWidth: rh(0.11),
    borderColor: COLOR.blue200,
    borderRadius: rh(1.1),
    flexDirection: "row",
    alignItems: "center",
    height: rh(6),
    overflow: "hidden",
  },
  inputImageContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.blue100,
    height: "100%",
    paddingHorizontal: rh(0.6),
    paddingLeft: rh(1.1),
  },
  input: {
    padding: rh(1.2),
    minWidth: "65%",
    backgroundColor: COLOR.white,
  },
  //   list select style
  listContainer: {
    position: "absolute",
    borderRadius: rh(1.1),
    backgroundColor: COLOR.white,
    width: rw(70),
    // minHeight: rh(5),
    paddingVertical: rh(1.2),
    zIndex: 5,
    marginTop: rh(7),
    //shadow
    shadowColor: COLOR.blue400,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 2.5,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: rw(13),
  },
  flag: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    borderRadius: 10,
  },
  title: {
    marginLeft: rh(1.8),
  },
  number: {
    marginLeft: rh(1.1),
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: rh(0.5),
    paddingHorizontal: rh(1.3),
  },
  //   markIcon
  markIcon: {
    position: "absolute",
    alignSelf: "center",
    right: rh(1),
    zIndex: 5,
  },
  inPress: {
    backgroundColor: COLOR.lightGray200,
  },
});

// country
const country = [
  {
    id: 1,
    country: "Bangladesh",
    number: "+880",
    flag: require("../../../assets/icons/Flag/bd.png"),
    digits: 11,
  },
  {
    id: 2,
    country: "India",
    number: "+91",
    flag: require("../../../assets/icons/Flag/in.png"),
    digits: 10,
  },
  {
    id: 3,
    country: "United Kingdom",
    number: "+44",
    flag: require("../../../assets/icons/Flag/usa.png"),
    digits: 11,
  },
  {
    id: 4,
    country: "Nepal",
    number: "+997",
    flag: require("../../../assets/icons/Flag/np.png"),
    digits: 13,
  },
];
