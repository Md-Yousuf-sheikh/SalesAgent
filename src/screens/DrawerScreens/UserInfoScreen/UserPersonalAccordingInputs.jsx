import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLOR, rf, rh, ROW, RSBC, rw } from "../../../theme/Theme";
import Text from "../../../components/Text/Text";
import { MaterialIcons } from "@expo/vector-icons";
import { ToggleAnimation } from "../../../Animation/ToggleAnimation";
import InputText from "../../../components/Inputs/InputText";
import CustomSinglPicker from "../../../components/Inputs/CustomSinglPicker";
import DatePicker from "../../../components/Inputs/DatePicker";
import { useDispatch, useSelector } from "react-redux";
import MediumButton from "../../../components/Buttons/MediumButton";
import FormInputText from "../../../components/Inputs/FormInputText";
import ModernDatePicker from "../../../components/Inputs/ModernDatePicker";
import Checkbox from "expo-checkbox";
import CustomGenderSelector from "../../../components/Inputs/CustomGenderSelector";
import { setPersonalInformation } from "../../../redux/features/purchase/purchaseSlice";
import Toast from "react-native-root-toast";
import CustomCalenderPicker from "../../../components/Inputs/CustomCalender/CustomCalenderPicker";

let initialInputs = {
  policy_holder_name: "",
  father_name: "",
  mother_name: "",
  gender: "",
  mobile_number: "",
  educational_qualification: "",
  dob: "",
  nationality: "",
  marital_status: "",
  profession: "",
};

let postalCodeData = [
  {
    value: "1206",
    label: "1206",
  },
  {
    value: "1306",
    label: "1306",
  },
  {
    value: "3806",
    label: "3806",
  },
];

export default function UserPersonalAccordingInputs({
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
  category,
}) {
  const dispatch = useDispatch();
  const [showContent, setShowContent] = useState(true);
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
  const [Gender, setGender] = useState("");
  useEffect(() => {
    if (sameAsCheck) {
      handleSameAs();
    } else {
      const data = {
        ...personalInfo,
        permanent_district: "",
        permanent_postal_code: "",
        permanent_thana: "",
        permanent_country: "",
        permanent_address: "",
        same_as_present_address: false,
      };
      dispatch(setPersonalInformation([data]));
      setTermAndConditionTow(false);
    }
  }, [sameAsCheck]);
  //
  const handleSameAs = () => {
    // if (TermAndConditionTow) {
    if (
      personalInfo["present_postal_code"] &&
      personalInfo["present_postal_code"] !== undefined &&
      personalInfo["present_district"] &&
      personalInfo["present_district"] !== undefined &&
      personalInfo["present_thana"] &&
      personalInfo["present_thana"] !== undefined &&
      personalInfo["present_country"] &&
      personalInfo["present_country"] !== undefined &&
      personalInfo["present_address"] &&
      personalInfo["present_address"] !== undefined
    ) {
      const data = {
        ...personalInfo,
        permanent_district: personalInfo["present_district"],
        permanent_postal_code: personalInfo["present_postal_code"],
        permanent_thana: personalInfo["present_thana"],
        permanent_country: personalInfo["present_country"],
        permanent_address: personalInfo["present_address"],
        same_as_present_address: true,
      };
      console.log("nowData", data);
      dispatch(setPersonalInformation([data]));

      setTermAndConditionTow(true);
    }
  };

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
            {languageState.policyHolderInfo}
          </Text>
        </View>
        {showContent ? (
          <MaterialIcons name="keyboard-arrow-up" size={32} color="#2196F3" />
        ) : (
          <MaterialIcons name="keyboard-arrow-down" size={32} color="#2196F3" />
        )}
        {/* </Animated.View> */}
      </TouchableOpacity>
      {/* List open */}
      {showContent && (
        <View style={styles.container}>
          {/* inputs */}
          {purchaseFormDetails?.Personal_Information?.map((item, index) => {
            return (item?.field_type === "text" ||
              item?.field_type === "email" ||
              item?.field_type === "number") &&
              item?.field_name !== "identity_number" ? (
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
              item?.field_name !== "identity_type" &&
              item?.field_name !== "gender" ? (
              <CustomSinglPicker
                key={index}
                label={item?.field_title}
                placeholder={item?.field_placeholder}
                data={item?.field_options}
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
                dropTop={item?.rank - 1 === index ? true : false}
                item={item}
                index={index}
                category={category?.slug}
                disabled={
                  TermAndConditionTow &&
                  item?.field_name === "permanent_postal_code"
                    ? true
                    : false
                }
              />
            ) : item?.field_type === "date" ? (
              <ModernDatePicker
                key={index}
                label={item.field_title}
                placeholder={item.field_placeholder}
                defaultValue={personalInfo[item?.field_name]}
                required={item?.field_required}
                error={errorCheck}
                setValue={(value) => {
                  handelOnChange(value, item.field_name);
                }}
                userInfo={userInfo}
                setPersonalInfo={setPersonalInfo}
                inputIndex={inputIndex}
                inputText={item?.field_name}
                filedError={errorCheck}
                // disable={item.field_name === 'dob' ? true : false}
              />
            ) : item?.field_type === "checkbox" ? (
              <>
                {item?.field_name === "same_as_present_address" &&
                  category?.slug === "health-insurance" && (
                    <View
                      style={{
                        backgroundColor: COLOR.white,
                        height: rh(4),
                        borderBottomWidth: 1,
                        // borderBottomColor: 'red',
                        marginBottom: rh(1),
                        marginTop: rh(1),
                        borderRadius: 1,
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>
                        {" "}
                        Permanent Address{" "}
                      </Text>
                    </View>
                  )}
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
              </>
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

          {/* {nameInfo && nameInfo?.field_type === 'text' && (
            <FormInputText
              label={nameInfo?.field_title}
              placeholder={nameInfo?.field_placeholder}
              markHide={true}
              value={personalInfo[nameInfo?.field_name]}
              // value={personalInfo?.policy_holder_name}
              onChangeText={text => handelOnChange(text, nameInfo?.field_name)}
              filedError={filedError}
              setFiledError={setFiledError}
              required={nameInfo?.field_required}
              errorCheck={errorCheck}
            />
          )}
          {fatherInfo && fatherInfo?.field_type === 'text' && (
            <FormInputText
              label={fatherInfo?.field_title}
              placeholder={fatherInfo?.field_placeholder}
              markHide={true}
              value={personalInfo[fatherInfo?.field_name]}
              // value={personalInfo?.policy_holder_name}
              onChangeText={text =>
                handelOnChange(text, fatherInfo?.field_name)
              }
              filedError={filedError}
              setFiledError={setFiledError}
              required={nameInfo?.field_required}
              errorCheck={errorCheck}
            />
          )}
          {motherInfo && motherInfo?.field_type === 'text' && (
            <FormInputText
              label={motherInfo?.field_title}
              placeholder={motherInfo?.field_placeholder}
              markHide={true}
              value={personalInfo[motherInfo?.field_name]}
              // value={personalInfo?.policy_holder_name}
              onChangeText={text =>
                handelOnChange(text, motherInfo?.field_name)
              }
              filedError={filedError}
              setFiledError={setFiledError}
              required={nameInfo?.field_required}
              errorCheck={errorCheck}
            />
          )}
          
          {genderInfo && genderInfo?.field_type === 'select' && (
            <CustomSinglPicker
              label={genderInfo?.field_title}
              placeholder={genderInfo?.field_placeholder}
              data={genderInfo?.field_options}
              valueProps={setGender}
              filedError={filedError}
              setFiledError={setFiledError}
              required={nameInfo?.field_required}
              errorCheck={errorCheck}
              setPersonalInfo={setPersonalInfo}
              personalInfo={personalInfo}
              inputText={genderInfo?.field_name}
            />
          )}
          
          {mobileInfo && mobileInfo?.field_type === 'text' && (
            <FormInputText
              label={mobileInfo?.field_title}
              placeholder={mobileInfo?.field_placeholder}
              markHide={true}
              value={personalInfo[mobileInfo?.field_name]}
              // value={personalInfo?.policy_holder_name}
              onChangeText={text =>
                handelOnChange(text, mobileInfo?.field_name)
              }
              filedError={filedError}
              setFiledError={setFiledError}
              required={nameInfo?.field_required}
              errorCheck={errorCheck}
            />
          )}
          
          {educationalInfo && educationalInfo?.field_type === 'select' && (
            <CustomSinglPicker
              label={educationalInfo?.field_title}
              placeholder={educationalInfo?.field_placeholder}
              data={educationalInfo?.field_options}
              filedError={filedError}
              setFiledError={setFiledError}
              required={nameInfo?.field_required}
              errorCheck={errorCheck}
              valueProps={setEducationalQualification}
              setPersonalInfo={setPersonalInfo}
              personalInfo={personalInfo}
              inputText={educationalInfo?.field_name}
            />
          )}

          <View
            style={[
              RSBC,
              {
                // backgroundColor: 'red',
                // alignItems: 'flex-start',
              },
            ]}
          >
            {dateInfo && dateInfo?.field_type === 'date' && (
              <DatePicker
                label={dateInfo?.field_title}
                placeholder={dateInfo?.field_placeholder}
                filedError={filedError}
                setFiledError={setFiledError}
                required={nameInfo?.field_required}
                errorCheck={errorCheck}
                valueProps={setDateOfBirth}
                styleInput={{
                  width: rw(42),
                }}
                setPersonalInfo={setPersonalInfo}
                personalInfo={personalInfo}
                inputText={dateInfo?.field_name}
              />
            )}
            {nationalityInfo && nationalityInfo?.field_type === 'text' && (
              <FormInputText
                label={nationalityInfo?.field_title}
                placeholder={nationalityInfo?.field_placeholder}
                markHide={true}
                value={personalInfo[nationalityInfo?.field_name]}
                styleInput={{
                  width: rw(42),
                }}
                onChangeText={text =>
                  handelOnChange(text, nationalityInfo?.field_name)
                }
                filedError={filedError}
                setFiledError={setFiledError}
                required={nameInfo?.field_required}
                errorCheck={errorCheck}
              />
            )}
          </View>
          <View
            style={[
              RSBC,
              {
                alignItems: 'flex-start',
                marginBottom: rh(6),
              },
            ]}
          >
            {maritalInfo && maritalInfo?.field_type === 'select' && (
              <CustomSinglPicker
                label={maritalInfo?.field_title}
                placeholder={maritalInfo?.field_placeholder}
                data={maritalInfo?.field_options}
                filedError={filedError}
                setFiledError={setFiledError}
                required={nameInfo?.field_required}
                errorCheck={errorCheck}
                valueProps={setMaritalStatus}
                styleInput={{
                  width: rw(42),
                }}
                dropTop={true}
                setPersonalInfo={setPersonalInfo}
                personalInfo={personalInfo}
                inputText={maritalInfo?.field_name}
              />
            )}
            {professionInfo && professionInfo?.field_type === 'select' && (
              <CustomSinglPicker
                label={professionInfo?.field_title}
                placeholder={professionInfo?.field_placeholder}
                data={professionInfo?.field_options}
                filedError={filedError}
                setFiledError={setFiledError}
                required={nameInfo?.field_required}
                errorCheck={errorCheck}
                valueProps={setProfession}
                styleInput={{
                  width: rw(42),
                }}
                dropTop={true}
                setPersonalInfo={setPersonalInfo}
                personalInfo={personalInfo}
                inputText={professionInfo?.field_name}
              />
            )}
          </View> */}
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
