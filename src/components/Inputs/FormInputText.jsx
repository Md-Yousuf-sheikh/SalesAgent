import { StyleSheet, Switch, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR, rf, rh } from "../../theme/Theme";
import SvgMarkIcon from "../../svg/SvgMarkIcon";
import Text from "../Text/Text";
import { FontAwesome } from "@expo/vector-icons";

export default function FormInputText({
  secureTextEntry,
  placeholder,
  type,
  setValue,
  maxLength,
  keyboardType,
  markHide,
  description,
  styleInput,
  label,
  error,
  style,
  value,
  onChangeText,
  filedError,
  setFiledError,
  required,
  errorCheck,
  editable = true,
  item,
  inputIndex,
  setPersonalInfo,
  contPercentage,
  setErrorType,
  TermAndConditionTow,
  userInfo,
}) {
  if (
    item?.field_name === "mobile" ||
    item?.field_name === "contact_number" ||
    item?.field_name === "postal_code" ||
    item?.field_name === "mobile_number" ||
    item?.field_type === "number"
  ) {
    type = "numeric";
  } else if (item?.field_name === "email") {
    type = "email";
  }
  const [pattenCheck, setPattenCheck] = useState(false);
  const [borderColor, setBorderColor] = useState(COLOR.blue200);
  const [editableCheck, setEditableCheck] = useState(true);
  //
  let email =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  useEffect(() => {
    if (type === "email") {
      if (email.test(value)) {
        setPattenCheck(true);
      } else {
        setPattenCheck(false);
      }
    } else if (type === "password") {
      if (value?.length > 5) {
        setPattenCheck(true);
      } else {
        setPattenCheck(false);
      }
    } else if (type === "number") {
      let re = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/;
      if (re.test(value)) {
        setPattenCheck(true);
      } else {
        setPattenCheck(false);
      }
    } else {
      if (value?.length > 1) {
        setPattenCheck(true);
      } else {
        setPattenCheck(false);
      }
    }
  }, [value]);
  //   //  Input error check
  useEffect(() => {
    if (required === "1" && errorCheck) {
      // console.log("entering", value);
      if (value === "" || value === undefined) {
        setBorderColor("red");
      } else {
        setBorderColor(COLOR.blue200);
      }
    }
  }, [errorCheck, value]);

  useEffect(() => {
    if (item?.field_type === "hidden") {
      setPersonalInfo((prevState) => {
        return prevState.map((prevInput, prevInputIndex) =>
          prevInputIndex === inputIndex
            ? {
                ...prevInput,
                [item?.field_name]: item?.field_value,
              }
            : { ...prevInput }
        );
      });
    }
  }, [item]);

  const handleTextChange = (inputText) => {
    onChangeText(inputText);

    if (inputText === "") {
      setBorderColor("red");
    } else {
      setBorderColor(COLOR.blue200);
    }
  };
  const fieldToUserInfoMap = {
    full_name: userInfo?.full_name,
    gender: userInfo?.gender,
    father_name: userInfo?.father_name,
    mother_name: userInfo?.mother_name,
    nationality: userInfo?.nationality,
    email: userInfo?.email,
    contact_number: userInfo?.contact_number,
  };
  const fieldName = item?.field_name;

  useEffect(() => {
    if (
      TermAndConditionTow &&
      (item?.field_name === "permanent_address" ||
        item?.field_name === "permanent_country" ||
        item?.field_name === "permanent_postal_code" ||
        item?.field_name === "permanent_thana" ||
        item?.field_name === "permanent_district" ||
        item?.field_name !== "present_country" ||
        item?.field_name !== "present_thana" ||
        item?.field_name !== "present_district")
    ) {
      // setEditableCheck(false);
    } else {
      if (
        item?.field_name !== "present_country" ||
        item?.field_name !== "present_thana" ||
        item?.field_name !== "present_district" ||
        item?.field_name !== "permanent_country" ||
        item?.field_name !== "permanent_thana" ||
        item?.field_name !== "permanent_district"
      ) {
        setEditableCheck(true);
      }
    }
    //
    // if (fieldName && fieldToUserInfoMap[fieldName]) {
    //   setEditableCheck(false);
    //   console.log("check active->", fieldName);
    // }
  }, [TermAndConditionTow, userInfo]);

  useEffect(() => {
    if (
      item?.field_name === "present_country" ||
      item?.field_name === "present_thana" ||
      item?.field_name === "present_district" ||
      item?.field_name === "permanent_country" ||
      item?.field_name === "permanent_thana" ||
      item?.field_name === "permanent_district"
    ) {
      if (setPersonalInfo) {
        setPersonalInfo((prevState) => {
          return prevState.map((prevInput, prevInputIndex) =>
            prevInputIndex === inputIndex
              ? {
                  ...prevInput,
                  [item?.field_name]: value,
                }
              : { ...prevInput }
          );
        });
      }
      setEditableCheck(false);
    }
  }, [value]);

  useEffect(() => {
    if (
      item?.field_name === "present_country" ||
      item?.field_name === "present_thana" ||
      item?.field_name === "present_district" ||
      item?.field_name === "permanent_country" ||
      item?.field_name === "permanent_thana" ||
      item?.field_name === "permanent_district"
    ) {
      setEditableCheck(false);
    }
  }, []);
  //
  return (
    <View>
      {label && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text preset="h5" style={styles.label}>
            {label}
          </Text>
          {required === "1" && (
            <FontAwesome
              name="asterisk"
              size={rh(1)}
              color="red"
              style={{ marginTop: rh(1), marginLeft: rh(1) }}
            />
          )}
        </View>
      )}
      <View
        style={[
          styles.container,
          description && {
            height: rh(11),
          },
          style,
        ]}
      >
        <TextInput
          style={[
            styles.inputStyle,
            description && {
              height: rh(10),
              textAlignVertical: "top",
              paddingTop: rh(1),
            },
            styleInput,

            { borderColor: borderColor },
          ]}
          editable={editableCheck}
          placeholder={placeholder}
          value={value}
          onChangeText={handleTextChange}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          keyboardType={type}
        />
        {!markHide && (
          <View style={styles.markIcon}>
            <SvgMarkIcon
              fill={
                !filedError
                  ? pattenCheck === true
                    ? "#009718"
                    : "#898A8D"
                  : "#EB4849"
              }
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: rh(6.5),
    marginVertical: rh(1.1),
  },
  inputStyle: {
    borderWidth: rh(0.1),
    borderColor: COLOR.blue200,
    borderRadius: rh(1),
    flexDirection: "row",
    alignItems: "center",
    height: rh(6.2),
    paddingHorizontal: rh(1.6),
    position: "relative",
    backgroundColor: COLOR.white,
    fontSize: rf(1.9),
  },
  markIcon: {
    position: "absolute",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    right: rh(1.2),
  },
  label: {
    color: "#646464",
    // fontWeight: "800",
    // lineHeight: 17,
    marginTop: rh(1.3),
  },
});
