import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useRef, useState } from "react";
import { rf, rh, ROW, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { MaterialIcons } from "@expo/vector-icons";
import { ToggleAnimation } from "../../../Animation/ToggleAnimation";
import CustomSinglPicker from "../../../components/Inputs/CustomSinglPicker";
import { useSelector } from "react-redux";
import FormInputText from "../../../components/Inputs/FormInputText";
import ModernDatePicker from "../../../components/Inputs/ModernDatePicker";
import FileUploader from "./FileUploader";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function DeviceInfo({
  title,
  content,
  setPersonalInfo,
  personalInfo,
  identity,
  memberCheck,
  errorCheck,
  setErrorCheck,
  filedError,
  setFiledError,
  identityNumber,
  handleDelete,
  inputIndex,
  addMember,
  fileData,
  setFileData,
}) {
  const [showContent, setShowContent] = useState(true);
  const language = useSelector(languageSelector);
  const purchaseFormDetails = useSelector(
    (state) => state?.purchase?.purchaseFormInfo
  );
  //  animation
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
  // const [filedError, setFiledError] = useState(false)

  let nameInfo;
  let relationshipInfo;
  let nomineeContributionInfo;
  let genderInfo;
  let mobileInfo;
  let educationalInfo;
  let dateInfo;
  let nationalityInfo;
  let maritalInfo;
  let professionInfo;
  let presentAddressInfo;
  if (purchaseFormDetails) {
    presentAddressInfo = memberCheck
      ? purchaseFormDetails?.Member_Information?.filter(
          (datas) => datas?.field_name === "member_address"
        )?.[0]
      : purchaseFormDetails?.Nominee_Information?.filter(
          (datas) => datas?.field_name === "nominee_address"
        )?.[0];

    nameInfo = memberCheck
      ? purchaseFormDetails?.Member_Information?.filter(
          (datas) => datas?.field_name === "member_name"
        )?.[0]
      : purchaseFormDetails?.Nominee_Information?.filter(
          (datas) => datas?.field_name === "nominee_name"
        )?.[0];

    relationshipInfo = memberCheck
      ? purchaseFormDetails?.Member_Information?.filter(
          (datas) => datas?.field_name === "member_relationship"
        )?.[0]
      : purchaseFormDetails?.Nominee_Information?.filter(
          (datas) => datas?.field_name === "nominee_relationship"
        )?.[0];

    nomineeContributionInfo = memberCheck
      ? purchaseFormDetails?.Member_Information?.filter(
          (datas) => datas?.field_name === "member_contribution_percentage"
        )?.[0]
      : purchaseFormDetails?.Nominee_Information?.filter(
          (datas) => datas?.field_name === "nominee_contribution_percentage"
        )?.[0];

    genderInfo = memberCheck
      ? purchaseFormDetails?.Member_Information?.filter(
          (datas) => datas?.field_name === "member_gender"
        )?.[0]
      : purchaseFormDetails?.Nominee_Information?.filter(
          (datas) => datas?.field_name === "nominee_gender"
        )?.[0];
    mobileInfo = memberCheck
      ? purchaseFormDetails?.Member_Information?.filter(
          (datas) => datas?.field_name === "member_mobile"
        )?.[0]
      : purchaseFormDetails?.Nominee_Information?.filter(
          (datas) => datas?.field_name === "nominee_mobile"
        )?.[0];
    educationalInfo = purchaseFormDetails?.Nominee_Information?.filter(
      (datas) => datas?.field_name === "educational_qualification"
    )?.[0];
    dateInfo = memberCheck
      ? purchaseFormDetails?.Member_Information?.filter(
          (datas) => datas?.field_name === "member_dob"
        )?.[0]
      : purchaseFormDetails?.Nominee_Information?.filter(
          (datas) => datas?.field_name === "nominee_dob"
        )?.[0];
    nationalityInfo = purchaseFormDetails?.Nominee_Information?.filter(
      (datas) => datas?.field_name === "nationality"
    )?.[0];
    maritalInfo = purchaseFormDetails?.Nominee_Information?.filter(
      (datas) => datas?.field_name === "marital_status"
    )?.[0];
    professionInfo = purchaseFormDetails?.Nominee_Information?.filter(
      (datas) => datas?.field_name === "profession"
    )?.[0];
  }

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
            {title}
          </Text>
        </View>

        {showContent ? (
          <MaterialIcons name="keyboard-arrow-up" size={32} color="#2196F3" />
        ) : (
          <MaterialIcons name="keyboard-arrow-down" size={32} color="#2196F3" />
        )}
      </TouchableOpacity>
      {showContent && (
        <View style={styles.container}>
          {purchaseFormDetails?.Device_Information?.map((item) => {
            return (item && item?.field_type === "text") ||
              item?.field_type === "number" ? (
              <FormInputText
                label={item?.field_title}
                placeholder={item?.field_placeholder}
                markHide={true}
                value={personalInfo[item?.field_name]}
                onChangeText={(text) => handelOnChange(text, item?.field_name)}
                inputText={item?.field_name}
                filedError={filedError}
                setFiledError={setFiledError}
                required={item?.field_required}
                errorCheck={errorCheck}
                keyboardType={item?.field_type}
              />
            ) : item && item?.field_type === "select" ? (
              <CustomSinglPicker
                label={item?.field_title}
                placeholder={item?.field_placeholder}
                data={item?.field_options}
                valueProps={setGender}
                setPersonalInfo={setPersonalInfo}
                personalInfo={personalInfo}
                inputText={item?.field_name}
                filedError={filedError}
                setFiledError={setFiledError}
                required={item?.field_required}
                errorCheck={errorCheck}
                inputIndex={inputIndex}
              />
            ) : item && item?.field_type === "date" ? (
              <ModernDatePicker
                label={item.field_title}
                placeholder={item.field_placeholder}
                defaultValue={personalInfo[item?.field_name]}
                required={item?.field_required}
                error={errorCheck}
                setValue={(value) => {
                  handelOnChange(value, item.field_name);
                }}
                setPersonalInfo={setPersonalInfo}
                inputIndex={inputIndex}
                inputText={item?.field_name}
              />
            ) : (
              item &&
              item?.field_type === "file" && (
                <FileUploader
                  identity={identity}
                  title={language.personalOrBasic}
                  personalInfo={personalInfo[0]}
                  setPersonalInfo={setPersonalInfo}
                  errorCheck={errorCheck}
                  identityNumber={identityNumber}
                  inputIndex={0}
                  fileData={fileData}
                  setFileData={setFileData}
                  inputText={item?.field_name}
                  label={item?.field_title}
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
  }, //
  //
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
    paddingVertical: 10,
    paddingHorizontal: rw(2),
  },
  AddNominee: {
    borderWidth: 2,
    paddingHorizontal: rh(1),
    paddingVertical: rh(0.8),
    borderColor: "#2253A5",
    borderRadius: 5,
    alignSelf: "center",
    // position: "absolute",
    // right: rh(2),
  },
  removeNominee: {
    borderWidth: 2,
    paddingHorizontal: rh(1),
    paddingVertical: rh(0.8),
    borderColor: "#2253A5",
    borderRadius: 5,
    alignSelf: "flex-end",
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
