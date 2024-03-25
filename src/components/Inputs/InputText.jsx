import { StyleSheet, Switch, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLOR, rh } from "../../theme/Theme";
import SvgMarkIcon from "../../svg/SvgMarkIcon";
import Text from "../Text/Text";

export default function InputText({
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
  emailValidity,
  passValidity,
  customStyle,
}) {
  const [InputValue, setInputValue] = useState("");
  const [pattenCheck, setPattenCheck] = useState(false);
  const [filedError, setFiledError] = useState(false);
  //
  let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/;
  useEffect(() => {
    if (type === "email") {
      if (email.test(value)) {
        setValue(value);
        setPattenCheck(true);
      } else {
        // setValue(null)
        setPattenCheck(false);
      }
    } else if (type === "password") {
      if (value?.length > 5) {
        setValue(value);
        setPattenCheck(true);
      } else {
        setPattenCheck(false);
        // setValue(null)
      }
    } else if (type === "number") {
      let re = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/;
      if (re.test(value)) {
        setValue(value);
        setPattenCheck(true);
      } else {
        setPattenCheck(false);
        // setValue(null)
      }
    } else {
      if (value?.length > 1) {
        setValue(value);
        setPattenCheck(true);
      } else {
        setPattenCheck(false);
        // setValue(null)
      }
    }
  }, [value, error]);
  //  Input error check
  useEffect(() => {
    if (error && (value === "" || !pattenCheck)) {
      setFiledError(true);
    } else {
      setFiledError(false);
    }
  }, [error, value, pattenCheck]);

  return (
    <View style={[customStyle]}>
      {label && (
        <Text preset="h5" style={styles.label}>
          {label}
        </Text>
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
            filedError && {
              borderColor: "red",
            },
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={(data) => {
            setValue(data);
          }}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          keyboardType={keyboardType}
          multiline={description ? true : false}
          numberOfLines={description ? 8 : 1}
        />
        {!markHide && (
          <View style={styles.markIcon}>
            <SvgMarkIcon
              fill={
                !filedError
                  ? pattenCheck === true
                    ? "#009718"
                    : COLOR.buttonDisable
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
