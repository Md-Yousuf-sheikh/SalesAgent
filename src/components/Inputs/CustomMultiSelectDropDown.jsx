import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { COLOR, rf, rh } from "../../theme/Theme";
import Text from "../Text/Text";
import { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function CustomMultiSelectDropDown({
  data,
  placeholder,
  label,
  required,
  labelStyle,
  valueProps,
  error,
  defaultValue,
}) {
  const [filedError, setFiledError] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue || []);
  const [items, setItems] = useState(data);

  //    use effect
  useEffect(() => {
    valueProps(value);
    return () => {};
  }, [value]);
  //
  useEffect(() => {
    if (error && value.length === 0) {
      setFiledError(true);
    } else {
      setFiledError(false);
    }
  }, [error, value]);
  return (
    <View>
      <View
        style={{
          zIndex: 10,
        }}
      >
        {label == undefined ? (
          ""
        ) : (
          <View style={styles.labelContainerStyle}>
            <Text preset="h5" style={[styles.label, labelStyle]}>
              {label} {required && <Text color={"red"}>*</Text>}
            </Text>
          </View>
        )}
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          placeholder={placeholder}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          theme="LIGHT"
          multiple={true}
          mode="BADGE"
          hideTags={true}
          badgeDotStyle={{
            display: "none",
          }}
          style={{
            borderColor: filedError ? "red" : COLOR.blue200,
          }}
          ArrowDownIconComponent={() => {
            return (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#00000064"
              />
            );
          }}
          ArrowUpIconComponent={() => {
            return (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#00000064"
                style={{
                  transform: [
                    {
                      rotate: "180deg",
                    },
                  ],
                }}
              />
            );
          }}
          dropDownContainerStyle={{
            borderColor: COLOR.blue200,
          }}
          //   selectedItemLabelStyle={{
          //     backgroundColor:'red'
          //   }}
          //   customItemContainerStyle={{
          //     backgroundColor: 'red',
          //   }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelContainerStyle: {
    flexDirection: "row",
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
    fontSize: rf(1.8),
  },
  container: {
    marginVertical: rh(1),
  },
  labelContainer: {
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: COLOR.blue200,
    paddingHorizontal: rh(1.8),
    color: COLOR.gray400,
    height: 50,
    borderRadius: 10,
  },
  searchArrIcon: {
    position: "absolute",
    right: rh(1.7),
  },
  // list
  listContainer: {
    position: "absolute",
    backgroundColor: "#ffffff",
    padding: rh(1.2),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    zIndex: 10,
    marginTop: 53,
    width: "100%",
    maxHeight: rh(20),
  },
  listContainerTop: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    zIndex: 10,
    marginTop: -130,
    width: "100%",
    top: 0,
    // maxHeight: 100,
    height: 150,
  },
  listItem: {
    paddingVertical: rh(0.8),
    color: COLOR.gray400,
  },
  errorLabel: {
    color: "red",
    marginBottom: 4,
    fontSize: 12,
  },
});
