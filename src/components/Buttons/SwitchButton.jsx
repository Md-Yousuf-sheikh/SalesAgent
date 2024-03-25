import React, { useState, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { rf, rw } from "../../theme/Theme";

export default function SwitchButton({
  title1,
  title2,
  bgA1,
  bgA2,
  bg,
  titleColor,
  titleActColor,
  onPress,
  borderCol,
  isBorder = false,
}) {
  const [switchButton, setSwitchButton] = useState(false);

  const handleSwitchPress = useCallback(
    (value) => {
      setSwitchButton(value);
      onPress(value);
    },
    [onPress]
  );

  const button1Style = {
    backgroundColor: switchButton ? bg : bgA1,
    elevation: switchButton ? 0 : 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: borderCol ? borderCol : bgA1,
    zIndex: switchButton ? 0 : 1,
    borderWidth: isBorder ? 1 : 0,
  };

  const button2Style = {
    backgroundColor: switchButton ? bgA2 : bg,
    elevation: switchButton ? 5 : 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: borderCol ? borderCol : bgA2,
    zIndex: switchButton ? 1 : 0,
    borderWidth: isBorder ? 1 : 0,
  };

  return (
    <View style={styles.switchContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleSwitchPress(false)}
        style={[styles.switchButton, button1Style]}
      >
        <Text
          style={[
            styles.switchButtonText,
            {
              color: switchButton ? titleColor : titleActColor,
              fontWeight: switchButton ? "normal" : "700",
            },
          ]}
        >
          {title1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleSwitchPress(true)}
        style={[styles.switchButton, button2Style]}
      >
        <Text
          style={[
            styles.switchButtonText,
            {
              color: switchButton ? titleActColor : titleColor,
              fontWeight: switchButton ? "700" : "normal",
            },
          ]}
        >
          {title2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    // width: "90%",
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  switchButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 13,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderColor: "#E5EAFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.13,
    shadowRadius: 2.62,
  },
  switchButtonText: {
    textTransform: "capitalize",
    fontSize: rf(1.8),
  },
});
