import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useRef, useState } from "react";
import { COLOR, rf, rh, ROW, RSBC, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { MaterialIcons } from "@expo/vector-icons";
import { ToggleAnimation } from "../../../Animation/ToggleAnimation";
import CustomSinglPicker from "../../../components/Inputs/CustomSinglPicker";
import { useDispatch, useSelector } from "react-redux";
import FormInputText from "../../../components/Inputs/FormInputText";
import ModernDatePicker from "../../../components/Inputs/ModernDatePicker";
import Checkbox from "expo-checkbox";
import CustomGenderSelector from "../../../components/Inputs/CustomGenderSelector";
import Toast from "react-native-root-toast";

let postalCodeData = [
  {
    label: "code",
    value: "1206",
  },
  {
    label: "code",
    value: "1306",
  },
  {
    label: "code",
    value: "3806",
  },
];

export default function MotorPolicy({
  title,
  content,
  personalInfo,
  setPersonalInfo,
  errorCheck,
  setErrorCheck,
  filedError,
  setFiledError,
  inputIndex,
  userInfo,
  sameAsCheck,
  setsameAsCheck,
  TermAndConditionTow,
  setTermAndConditionTow,
}) {
  const dispatch = useDispatch();
  const [showContent, setShowContent] = useState(true);
  // const [TermAndConditionTow, setTermAndConditionTow] = useState(false)

  // const [personalInfo, setPersonalInfo] = useState(initialInputs)

  //  animation
  const languageState = useSelector(
    (state) => state.language.language.finalLanguage?.data
  );
  const purchaseFormDetails = useSelector(
    (state) => state?.purchase?.purchaseFormInfo
  );
  const personalInformation = useSelector(
    (state) => state?.purchase?.personalInformation
  );

  const animationController = useRef(new Animated.Value(0)).current;
  const toggleListItem = () => {
    // config  animdton
    const config = {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    };
    // Animated timing
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(ToggleAnimation);
    setShowContent(!showContent);
  };
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-90deg"],
  });
  //  input  filed get value
  const [Gender, setGender] = useState("");

  const handelOnChange = (text, input) => {
    setPersonalInfo((prevState) => {
      return prevState.map((prevInput, prevInputIndex) =>
        prevInputIndex === inputIndex
          ? {
              ...prevInput,
              [input]: text,
            }
          : { ...prevInput }
      );
    });
  };
  let sizeOfAr = purchaseFormDetails[""]?.length;
  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          toggleListItem();
        }}
        style={styles.cardButton}
      >
        <View style={ROW}>
          <Text preset="h2" style={styles.cardTitle}>
            {"Vehicle Information"}
          </Text>
        </View>

        <Animated.View
          style={{
            transform: [
              {
                rotateZ: arrowTransform,
              },
            ],
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={32} color="#2196F3" />
        </Animated.View>
      </TouchableOpacity>
      {/* List open */}
      {showContent && (
        <View style={styles.container}>
          {/* inputs */}

          {purchaseFormDetails[""]?.map((item, index) => {
            return item?.field_type === "text" ||
              item?.field_type === "email" ||
              item?.field_type === "number" ? (
              <FormInputText
                key={index}
                label={item?.field_title}
                placeholder={item?.field_placeholder}
                markHide={true}
                value={
                  item?.field_type === "hidden"
                    ? item?.field_value
                    : personalInfo[item?.field_name]
                }
                // value={personalInfo?.policy_holder_name}
                onChangeText={(text) => handelOnChange(text, item?.field_name)}
                filedError={filedError}
                setFiledError={setFiledError}
                required={item?.field_required}
                errorCheck={errorCheck}
                item={item}
                setPersonalInfo={setPersonalInfo}
                inputIndex={inputIndex}
                TermAndConditionTow={TermAndConditionTow}
                userInfo={userInfo}
              />
            ) : item?.field_type === "select" &&
              item?.field_name !== "gender" ? (
              <CustomSinglPicker
                key={index}
                label={item?.field_title}
                placeholder={item?.field_placeholder}
                data={
                  item?.field_name === "present_postal_code" ||
                  item?.field_name === "permanent_postal_code"
                    ? postalCodeData
                    : item?.field_options
                }
                valueProps={setGender}
                filedError={filedError}
                setFiledError={setFiledError}
                required={item?.field_required}
                errorCheck={errorCheck}
                setPersonalInfo={setPersonalInfo}
                personalInfo={personalInfo}
                inputText={item?.field_name}
                inputIndex={inputIndex}
                userInfo={userInfo}
                dropTop={parseInt(item?.rank) === sizeOfAr ? true : false}
                item={item}
                index={index}
              />
            ) : item?.field_type === "date" ? (
              <ModernDatePicker
                key={index}
                label={item.field_title}
                placeholder={item.field_placeholder}
                defaultValue={personalInfo[item?.field_name]}
                required={item?.field_required}
                error={errorCheck}
                valueProps={(value) => {
                  handelOnChange(value, item.field_name);
                }}
                userInfo={userInfo}
              />
            ) : item?.field_type === "checkbox" ? (
              <TouchableOpacity
                // key={index}
                onPress={() => {
                  if (Object.keys(userInfo)?.length > 0) {
                    setsameAsCheck(!sameAsCheck);
                  } else {
                    Toast.show("Please select an user", {
                      duration: 1000,
                      backgroundColor: "rgba(51, 105, 179, 1)",
                      shadow: true,
                      position: rh(80),
                      textColor: COLOR.white,
                      opacity: 2,
                      animation: true,
                    });
                  }
                }}
                style={styles.section}
              >
                {/* <Text>{JSON.stringify(TermAndConditionTow)}</Text> */}
                <Checkbox
                  style={styles.checkbox}
                  value={TermAndConditionTow}
                  onValueChange={() => {
                    if (Object.keys(userInfo)?.length > 0) {
                      setsameAsCheck(!sameAsCheck);
                    } else {
                      Toast.show("Please select an user", {
                        duration: 1000,
                        backgroundColor: "rgba(51, 105, 179, 1)",
                        shadow: true,
                        position: rh(80),
                        textColor: COLOR.white,
                        opacity: 2,
                        animation: true,
                      });
                    }
                  }}
                  color={TermAndConditionTow ? "#3182CE" : undefined}
                />
                <Text preset="h5" color={"#4A4A4A"} style={styles.smallText}>
                  {item?.field_title}
                </Text>
              </TouchableOpacity>
            ) : (
              item?.field_name === "gender" && (
                <CustomGenderSelector
                  key={index}
                  inputText={item?.field_name}
                  inputIndex={inputIndex}
                  personalInfo={personalInfo}
                  setPersonalInfo={setPersonalInfo}
                  buttonStyle={{ marginTop: 0 }}
                  userInfo={userInfo}
                />
              )
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: rw(2),
    paddingTop: 10,
    backgroundColor: "#ffffff",
  }, //
  //
  section: {
    flexDirection: "row",
    marginVertical: rh(1),
  },
  smallText: {
    // width: rw(82),
    // textAlign: 'justify',
    marginLeft: rh(1),
  },
  cardTitle: {
    fontSize: rf(2.1),
    color: "#4F4F4F",
  },
  card: {
    marginVertical: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#F5F7FF",
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F7FF",
    paddingVertical: rh(1.2),
    paddingHorizontal: rw(4),
  },
  // Table
  table: {
    marginVertical: 15,
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  tableText: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  tableTextRight: {
    fontSize: 14,
    color: "#4F4F4F",
    width: rw(40),
    textAlign: "right",
  },
  tableTextLeft: {
    fontSize: 14,
    color: "#4F4F4F",
    width: rw(40),
    textAlign: "left",
  },
});
