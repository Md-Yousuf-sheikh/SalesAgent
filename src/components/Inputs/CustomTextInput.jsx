import { View, Text, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { COLOR } from "../../theme/Theme";
import SvgStarIcon from "../../svg/SvgStarIcon";
import SvgMarkIcon from "../../svg/SvgMarkIcon";

export default function CustomTextInput({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  label,
  numberOfLines,
  inputStyle,
  containerStyle,
  multiline,
  defValue,
  number,
  labelStyle,
  required,
  mark,
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          {label == undefined ? (
            ""
          ) : (
            <View style={styles.labelContainer}>
              <Text style={[styles.label, labelStyle]}>{label}</Text>
              <View style={styles.startIcon}>
                {required ? <SvgStarIcon /> : ""}
              </View>
            </View>
          )}
          <View style={[styles.container, containerStyle]}>
            {number && (
              <View style={styles.number}>
                <Text style={styles.numberText}>+91</Text>
              </View>
            )}

            <TextInput
              defaultValue={defValue}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              multiline={multiline}
              numberOfLines={numberOfLines}
              placeholderTextColor={"#dad4d4"}
              placeholder={placeholder} // placeholder input
              secureTextEntry={secureTextEntry} // password  ***
              style={[
                styles.input,
                inputStyle,
                { borderColor: error ? "#EF7466" : COLOR.blue200 },
                number && {
                  width: "90%",
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              ]}
            />
            {/* Mark */}
            {mark && (
              <View style={styles.markIcon}>
                <SvgMarkIcon />
              </View>
            )}
          </View>
          {error && (
            <Text
              style={{
                color: "#EF7466",
                alignSelf: "stretch",
                fontSize: 12,
                marginBottom: 15,
                marginTop: -8,
              }}
            >
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
  },
  label: {
    color: COLOR.gray400,
    marginBottom: 7,
    fontSize: 13,
    fontWeight: "500",
    fontWeight: "Roboto-Bold",
  },
  startIcon: {},
  container: {
    marginBottom: 15,
    flexDirection: "row",
    width: "100%",
  },
  input: {
    backgroundColor: COLOR.white,
    borderWidth: 1,
    paddingHorizontal: 10,

    borderRadius: 12,
    fontSize: 13,
    color: COLOR.gray400,
    width: "100%",
    height: 50,
  },
  number: {
    backgroundColor: COLOR.white,
    borderWidth: 1,
    borderColor: COLOR.blue100,
    paddingHorizontal: 10,
    justifyContent: "center",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  numberText: {
    fontSize: 13,
    color: COLOR.gray400,
  },
  //   markIcon
  markIcon: {
    position: "absolute",
    right: 15,
    zIndex: 5,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
