import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5, Fontisto, Ionicons } from "@expo/vector-icons";
import { rh, rw } from "../../theme/Theme";
import Text from "../Text/Text";
import { useSelector } from "react-redux";

export default function CustomGenderSelector({
  inputText,
  inputIndex,
  personalInfo,
  setPersonalInfo,
  buttonStyle,
}) {
  // let firstGen
  // if (personalInfo && personalInfo !== undefined) {
  //   if (personalInfo['gender'] && personalInfo['gender'] !== undefined) {
  //     firstGen = personalInfo['gender']
  //   }
  // }
  const languageState = useSelector(
    (state) => state.language.language.finalLanguage?.data
  );
  const [switchButton, setSwitchButton] = useState("");
  useEffect(() => {
    if (setPersonalInfo) {
      setPersonalInfo((prevState) => {
        return prevState.map((prevInput, prevInputIndex) =>
          prevInputIndex === inputIndex
            ? {
                ...prevInput,
                [inputText]: switchButton,
              }
            : { ...prevInput }
        );
      });
    }
  }, [switchButton]);
  if (personalInfo) {
    useEffect(() => {
      if (personalInfo["gender"]) {
        setSwitchButton(personalInfo["gender"]);
      }
    }, [personalInfo]);
  }

  return (
    <View>
      {/* Switch button */}
      <View style={[styles.switchContainer, buttonStyle]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setSwitchButton("Male");
          }}
          style={[
            styles.switchButton,
            switchButton === "Male" && { borderColor: "#2253A5" },
          ]}
        >
          <Fontisto
            name="male"
            size={rh(2.2)}
            color={switchButton === "Male" ? "#2253A5" : "#595959"}
            style={{
              paddingRight: rh(0.7),
            }}
          />

          <Text
            preset="h6"
            color={switchButton === "Male" ? "#2253A5" : "#595959"}
          >
            {" "}
            {languageState?.male}
          </Text>
        </TouchableOpacity>
        {/* F */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setSwitchButton("Female");
          }}
          style={[
            styles.switchButton,
            switchButton === "Female" && { borderColor: "#2253A5" },
          ]}
        >
          <Fontisto
            name="female"
            size={18}
            color={switchButton === "Female" ? "#2253A5" : "#595959"}
            style={{
              paddingRight: rh(0.7),
            }}
          />
          <Text
            preset="h6"
            color={!switchButton === "Female" ? "#2253A5" : "#595959"}
          >
            {languageState?.female}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setSwitchButton('Other')
        }}
        style={[
          styles.switchButton,
          switchButton === 'Other' && { borderColor: '#2253A5' },
          {
            width: '100%',
          },
        ]}
      >
        <Ionicons
          name="ios-male-female-sharp"
          size={18}
          color={switchButton === 'Other' ? '#2253A5' : '#595959'}
          style={{
            paddingRight: 5,
          }}
        />

        <Text
          preset="h6"
          color={switchButton === 'Other' ? '#2253A5' : '#595959'}
        >
          {languageState?.otherTitle}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // switchButton
  switchContainer: {
    flexDirection: "row",
    marginTop: rh(1),
    // marginBottom: rh(1),
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchButton: {
    borderWidth: 1,
    paddingVertical: rh(1.4),
    borderRadius: rh(1),
    borderColor: "#E5EAFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    // marginBottom: rh(1.5),
    marginVertical: rh(1),
  },
});
