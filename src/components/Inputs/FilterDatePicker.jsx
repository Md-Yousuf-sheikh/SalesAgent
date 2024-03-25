import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useState } from "react";
import Text from "../Text/Text";
import { COLOR, rf, rh, rw } from "../../theme/Theme";
import { Path, Svg } from "react-native-svg";
import { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  DateTimePicker,
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import moment from "moment";

export default function FilterDatePicker({
  placeholder,
  valueProps,
  error,
  styleInput,
  label,
  defaultValue,
  required,
  setPersonalInfo,
  inputIndex,
  inputText,
  maxDate,
}) {
  const [selectedNewDate, setSelectedNewDate] = useState(new Date());
  //
  const [filedError, setFiledError] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [changed, setChanged] = useState(false);
  useEffect(() => {
    //
    if (error && !selectedNewDate && required === "1") {
      setFiledError(true);
    } else {
      setFiledError(false);
    }
  }, [error, selectedNewDate]);

  const onChange = (event, selectedDate) => {
    const currentDate = new Date(selectedDate);
    setChanged(true);
    setDate(currentDate);
    if (valueProps) {
      valueProps(currentDate?.toISOString().substring(0, 10));
      setChanged(true);
    }
    setShow(false);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      // maximumDate: new Date(), // Set maximum date to today
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View style={styles.container}>
      {label == undefined ? (
        ""
      ) : (
        <View style={styles.labelContainerStyle}>
          <Text style={[styles.label]}>{label}</Text>
          {required === "1" && (
            <FontAwesome
              name="asterisk"
              size={rh(1)}
              color="red"
              style={{ marginLeft: rh(1), marginTop: rh(0.5) }}
            />
          )}
        </View>
      )}
      <TouchableOpacity
        onPress={showDatepicker}
        style={[
          styles.labelContainer,
          filedError && {
            borderColor: "red",
          },
          styleInput,
        ]}
      >
        {date && changed ? (
          <Text>{date?.toISOString().substring(0, 10)}</Text>
        ) : (
          <Text>{placeholder}</Text>
        )}
        <View>
          <Svg width={12} height={11} fill="none">
            <Path
              d="M11.25 1.54H8.247v-.6c0-.165-.167-.3-.375-.3-.207 0-.375.135-.375.3v.6h-3v-.6c0-.165-.167-.3-.375-.3-.207 0-.375.135-.375.3v.6H.75c-.414 0-.75.268-.75.6v7.513c0 .332.336.6.75.6h10.5c.414 0 .75-.268.75-.6V2.14c0-.331-.336-.6-.75-.6Zm0 8.113H.75V2.14h2.997v.303c0 .166.168.3.375.3.208 0 .375-.134.375-.3v-.302h3v.302c0 .166.168.3.375.3.208 0 .375-.134.375-.3v-.302h3.003v7.512ZM8.625 5.446h.75c.207 0 .375-.135.375-.3v-.602c0-.165-.168-.3-.375-.3h-.75c-.207 0-.375.135-.375.3v.601c0 .166.168.3.375.3Zm0 2.404h.75c.207 0 .375-.135.375-.3v-.602c0-.166-.168-.3-.375-.3h-.75c-.207 0-.375.134-.375.3v.601c0 .166.168.3.375.3Zm-2.25-1.202h-.75c-.207 0-.375.134-.375.3v.601c0 .166.168.3.375.3h.75c.207 0 .375-.134.375-.3v-.6c0-.166-.168-.301-.375-.301Zm0-2.404h-.75c-.207 0-.375.135-.375.3v.601c0 .166.168.3.375.3h.75c.207 0 .375-.134.375-.3v-.6c0-.167-.168-.301-.375-.301Zm-3 0h-.75c-.207 0-.375.135-.375.3v.601c0 .166.168.3.375.3h.75c.207 0 .375-.134.375-.3v-.6c0-.167-.168-.301-.375-.301Zm0 2.404h-.75c-.207 0-.375.134-.375.3v.601c0 .166.168.3.375.3h.75c.207 0 .375-.134.375-.3v-.6c0-.166-.168-.301-.375-.301Z"
              fill="#8A8A8A"
            />
          </Svg>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardModal: {
    backgroundColor: "#19191930",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardDate: {
    width: rw(85),
    backgroundColor: "#ffff",
    borderRadius: 5,
    paddingTop: 15,
  },
  cardFooter: {
    paddingHorizontal: 10,
    paddingBottom: 18,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cardHeader: {
    backgroundColor: "#3455A3",
    height: 70,
    justifyContent: "center",
  },
  buttonBottom: {
    paddingHorizontal: 10,
  },
  //
  container: {
    marginVertical: rh(1),
  },
  labelContainerStyle: {
    flexDirection: "row",
  },
  startIcon: {},
  label: {
    color: COLOR.gray400,
    marginBottom: 7,
    fontSize: 13,
    fontWeight: "500",
    fontWeight: "Roboto-Bold",
  },
  inputLabelStyle: {
    color: COLOR.gray400,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: COLOR.blue200,
    // paddingHorizontal: 10,
    color: COLOR.gray400,
    height: rh(6.5),
    borderRadius: 10,
    paddingHorizontal: rh(1.8),
    maxWidth: "100%",
  },
});
