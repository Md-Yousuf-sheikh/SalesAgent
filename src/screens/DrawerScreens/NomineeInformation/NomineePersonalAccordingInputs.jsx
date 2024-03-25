import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useRef, useState } from "react";
import { rf, rh, ROW, RSBC, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { MaterialIcons } from "@expo/vector-icons";
import { ToggleAnimation } from "../../../Animation/ToggleAnimation";
import CustomSinglPicker from "../../../components/Inputs/CustomSinglPicker";
import { useDispatch, useSelector } from "react-redux";
import FormInputText from "../../../components/Inputs/FormInputText";
import ModernDatePicker from "../../../components/Inputs/ModernDatePicker";
import CustomGenderSelector from "../../../components/Inputs/CustomGenderSelector";
import { languageSelector } from "../../../redux/features/language/languageSlice";

export default function NomineePersonalAccordingInputs({
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
  nomineeSize,
  contPercentage,
}) {
  const [showContent, setShowContent] = useState(false);
  const language = useSelector(languageSelector);
  const purchaseFormDetails = useSelector(
    (state) => state?.purchase?.purchaseFormInfo
  );
  const dispatch = useDispatch();
  const nomineeCount = useSelector((state) => state?.purchase?.nomineeCount);

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
  const [Name, setName] = useState("");
  const [IdentityType, setIdentityType] = useState("");
  const [NidNumber, setNidNumber] = useState("");
  const [FatherName, setFatherName] = useState("");
  const [MotherName, setMotherName] = useState("");
  const [SpouseName, setSpouseName] = useState("");
  const [BloodGroup, setBloodGroup] = useState("");
  const [MobileNumber, setMobileNumber] = useState("");
  const [AltMobileNumber, setAltMobileNumber] = useState("");
  const [Email, setEmail] = useState("");
  const [Gender, setGender] = useState("");
  const [EducationalQualification, setEducationalQualification] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [Nationality, setNationality] = useState("");
  const [MaritalStatus, setMaritalStatus] = useState("");
  const [Profession, setProfession] = useState("");
  // error
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
  const arr = useRef();
  const handelOnChange = (text, input) => {
    // setPersonalInfo(prevState => ({ ...prevState, [input]: text }))
    console.log("memberAsNominee", input, text);

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
  console.log("identity", nomineeSize);
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
            {title} {"("}
            {inputIndex + 1}
            {")"}
          </Text>
        </View>

        {/* <TouchableOpacity onPress={addMember} style={styles.AddNominee}>
          <Text color={'#2253A5'} preset="h2" style={styles.nextText}>
            {'Add Nominee'}
          </Text>
        </TouchableOpacity> */}
        {/* {nomineeSize > 1 && inputIndex > 0 && !memberCheck ? (
          <TouchableOpacity onPress={handleDelete}>
            <AntDesign
              name="minuscircleo"
              size={24}
              color="red"
              style={{ marginLeft: rh(2) }}
            />
          </TouchableOpacity>
        ) : (
          memberCheck && (
            <TouchableOpacity onPress={handleDelete}>
              <AntDesign
                name="minuscircleo"
                size={24}
                color="red"
                style={{ marginLeft: rh(2) }}
              />
            </TouchableOpacity>
          )
        )} */}
        {/* <Animated.View
          style={{
            transform: [
              {
                rotateZ: arrowTransform,
              },
            ],
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={32} color="#2196F3" />
        </Animated.View> */}
        {showContent ? (
          <MaterialIcons name="keyboard-arrow-up" size={32} color="#2196F3" />
        ) : (
          <MaterialIcons name="keyboard-arrow-down" size={32} color="#2196F3" />
        )}
      </TouchableOpacity>
      {showContent && (
        <View style={styles.container}>
          {/* <NomineeTypeOrNID
            identity={identity}
            title={language.selectNomineeIden}
            personalInfo={personalInfo}
            setPersonalInfo={setPersonalInfo}
            errorCheck={errorCheck}
            identityNumber={identityNumber}
            inputIndex={inputIndex}
          /> */}
          {!memberCheck
            ? purchaseFormDetails?.Nominee_Information?.map((item) => {
                return (item && item?.field_type === "text") ||
                  item?.field_type === "number" ? (
                  <FormInputText
                    label={item?.field_title}
                    placeholder={item?.field_placeholder}
                    markHide={true}
                    // setValue={setName}
                    // error={filedError}
                    value={personalInfo[item?.field_name]}
                    onChangeText={(text) =>
                      handelOnChange(text, item?.field_name)
                    }
                    // setPersonalInfo={setPersonalInfo}
                    inputText={item?.field_name}
                    filedError={filedError}
                    setFiledError={setFiledError}
                    required={item?.field_required}
                    errorCheck={errorCheck}
                    keyboardType={item?.field_type}
                    contPercentage={contPercentage}
                    item={item}
                  />
                ) : item &&
                  item?.field_type === "select" &&
                  item?.field_name !== "gender" ? (
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
                    nomineeSize={nomineeSize}
                    dropTop={
                      item?.field_name === "guardian_identity_type"
                        ? true
                        : false
                    }
                  />
                ) : item && item?.field_type === "date" ? (
                  // <DatePicker
                  //   label={item?.field_placeholder}
                  //   valueProps={setDateOfBirth}
                  //   // styleInput={{
                  //   //   width: rw(42),
                  //   // }}
                  //   placeholder={'12-28-2000'}
                  //   setPersonalInfo={setPersonalInfo}
                  //   personalInfo={personalInfo}
                  //   inputText={item?.field_name}
                  //   filedError={filedError}
                  //   setFiledError={setFiledError}
                  //   required={item?.field_required}
                  //   errorCheck={errorCheck}
                  //   inputIndex={inputIndex}
                  // />

                  <ModernDatePicker
                    // key={index}
                    label={item.field_title}
                    placeholder={item.field_placeholder}
                    defaultValue={personalInfo[item?.field_name]}
                    required={item?.field_required}
                    error={errorCheck}
                    setValue={(value) => {
                      handelOnChange(value, item.field_name);
                    }}
                    // userInfo={userInfo}
                    setPersonalInfo={setPersonalInfo}
                    inputIndex={inputIndex}
                    inputText={item?.field_name}
                    filedError={errorCheck}
                  />
                ) : (
                  item?.field_name === "gender" && (
                    <CustomGenderSelector
                      inputText={item?.field_name}
                      inputIndex={inputIndex}
                      personalInfo={personalInfo}
                      setPersonalInfo={setPersonalInfo}
                      buttonStyle={{ marginTop: 0 }}
                    />
                  )
                );
              })
            : purchaseFormDetails?.Member_Information?.map((item) => {
                return (item && item?.field_type === "text") ||
                  (item?.field_type === "number" &&
                    item?.field_name !== "contribution_percentage") ? (
                  <FormInputText
                    label={item?.field_title}
                    placeholder={item?.field_placeholder}
                    markHide={true}
                    // setValue={setName}
                    // error={filedError}
                    value={personalInfo[item?.field_name]}
                    onChangeText={(text) =>
                      handelOnChange(text, item?.field_name)
                    }
                    // setPersonalInfo={setPersonalInfo}
                    inputText={item?.field_name}
                    filedError={filedError}
                    setFiledError={setFiledError}
                    required={item?.field_required}
                    errorCheck={errorCheck}
                    keyboardType={item?.field_type}
                  />
                ) : (item &&
                    item?.field_type === "select" &&
                    item?.field_name !== "gender") ||
                  item?.field_type === "checkbox" ? (
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
                    item={item}
                    nomineeSize={nomineeSize}
                  />
                ) : item && item?.field_type === "date" ? (
                  // <DatePicker
                  //   label={item?.field_placeholder}
                  //   valueProps={setDateOfBirth}
                  //   placeholder={'12-28-2000'}
                  //   setPersonalInfo={setPersonalInfo}
                  //   personalInfo={personalInfo}
                  //   inputText={item?.field_name}
                  //   filedError={filedError}
                  //   setFiledError={setFiledError}
                  //   required={item?.field_required}
                  //   errorCheck={errorCheck}
                  //   inputIndex={inputIndex}
                  // />
                  <ModernDatePicker
                    label={item?.field_title}
                    placeholder={item?.field_placeholder}
                    defaultValue={personalInfo[item?.field_name]}
                    // valueProps={value => {
                    //   handelOnChange(value, item.field_name)
                    // }}
                    error={errorCheck}
                    setPersonalInfo={setPersonalInfo}
                    inputIndex={inputIndex}
                    inputText={item?.field_name}
                    filedError={errorCheck}
                  />
                ) : (
                  item?.field_name === "gender" && (
                    <CustomGenderSelector
                      inputText={item?.field_name}
                      inputIndex={inputIndex}
                      personalInfo={personalInfo}
                      setPersonalInfo={setPersonalInfo}
                      buttonStyle={{ marginTop: 0 }}
                    />
                  )
                );
              })}
          {purchaseFormDetails?.Member_Information?.map((item) => {
            return (
              personalInfo?.member_as_nominee === "Yes" &&
              item?.field_name === "contribution_percentage" && (
                <FormInputText
                  label={item?.field_title}
                  placeholder={item?.field_placeholder}
                  markHide={true}
                  value={personalInfo[item?.field_name]}
                  onChangeText={(text) =>
                    handelOnChange(text, item?.field_name)
                  }
                  // setPersonalInfo={setPersonalInfo}
                  inputText={item?.field_name}
                  filedError={filedError}
                  setFiledError={setFiledError}
                  required={"1"}
                  errorCheck={errorCheck}
                  contPercentage={contPercentage}
                  item={item}
                  // keyboardType={item?.field_type}
                />
              )
            );
          })}
          {nomineeSize > 1 && inputIndex > 0 && !memberCheck ? (
            <TouchableOpacity
              onPress={handleDelete}
              style={styles.removeNominee}
            >
              <Text color={"#2253A5"} preset="h2" style={styles.nextText}>
                {"Remove"}
              </Text>
            </TouchableOpacity>
          ) : (
            memberCheck && (
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.removeNominee}
              >
                <Text color={"#2253A5"} preset="h2" style={styles.nextText}>
                  {"Remove"}
                </Text>
              </TouchableOpacity>
            )
          )}
          {/* <TouchableOpacity onPress={handleDelete} style={styles.removeNominee}>
            <Text color={'#2253A5'} preset="h2" style={styles.nextText}>
              {'Remove'}
            </Text>
          </TouchableOpacity> */}
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
